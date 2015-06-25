/*
 *  MainScene.js
 *  2014/06/19
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("tmapp.MainScene", {
    superClass: tm.app.Scene,

    //フラグ類
    numStage: 1,
    maxStage: 5,

    //遷移情報
    startGame: false,
    exitGame: false,
    retryStart: false,
    clearStage: false,
    stopTimer: false,
    gameover: false,
    timeup: false,

    //残弾数
    leftBullet: 20,

    //最終ステージエクストラターゲット
    bomb: null,

    //ヒット数
    numHit: 0,

    //タッチ情報
    startX: 0,
    startY: 0,
    touchTime: 0,
    moveX: 0,
    moveY: 0,
    beforeX: 0,
    beforeY: 0,

    //経過時間
    time: 1,

    //ゲーム内時計(ms)
    gameTime: 0,
    stageTime: 0,
    clearTime: [],
    stageResult: [],

    //ラベル用パラメータ
    labelParamBasic: {fontFamily: "UbuntuMono", align: "left", baseline: "middle",outlineWidth: 3, fontWeight:700},
    labelParamCenter: {fontFamily: "UbuntuMono", align: "center", baseline: "middle",outlineWidth: 3, fontWeight:700},
    digitalCenterParam: {fontFamily: "Digital", align: "center", baseline: "middle",outlineWidth: 3, fontWeight:700},

    init: function(retry) {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";

        //バックグラウンド
        this.bg = tm.display.RectangleShape({width: SC_W, height: SC_H, fillStyle: appMain.bgColor, strokeStyle: appMain.bgColor})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)

        this.wall = tm.display.Sprite("wall", SC_W, SC_H)
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)

        //レイヤー準備
        this.lowerLayer = tm.app.Object2D().addChildTo(this);
        this.mainLayer = tm.app.Object2D().addChildTo(this);
        this.blockLayer = tm.app.Object2D().addChildTo(this);
        this.upperLayer = tm.app.Object2D().addChildTo(this);
        this.infoLayer = tm.app.Object2D().addChildTo(this);

        //床
        this.floor = [];
        for (var y = 0; y < 4; y++) {
            for (var x = 0; x < 10; x++) {
                tm.display.Sprite("block", 64, 64)
                    .addChildTo(this.lowerLayer)
                    .setPosition(x*64, SC_H*0.3+SC_H*y*0.15)
                    .setOrigin(0,0);
            }
            this.floor[y] = SC_H*0.3+SC_H*y*0.15-48;
        }

        //タイム表示
        var that = this;
        this.timeLabel = tm.display.OutlineLabel("00.00", 100)
            .addChildTo(this.infoLayer)
            .setParam({fontFamily: "Digital", align: "center", baseline: "middle",outlineWidth: 3, fontWeight:700})
            .setPosition(SC_W*0.5, SC_H*0.1);
        this.timeLabel.score = 0;
        this.timeLabel.update = function() {
            var time = (that.gameTime/10).floor();
            this.text = ""+(time/100);
            if (time%100 === 0 ) this.text += ".0";
            if (time%10 === 0 ) this.text += "0";
            if (time < 1000) this.text = "0"+this.text;
        }

        //残弾数表示
        this.bulletLabel = tm.display.OutlineLabel("15", 80)
            .addChildTo(this.infoLayer)
            .setParam({fontFamily: "Digital", align: "center", baseline: "middle",outlineWidth: 3, fontWeight:700})
            .setPosition(SC_W*0.5, SC_H*0.85);
        this.bulletLabel.update = function() {
            this.text = ""+that.leftBullet;
        }

        //ポーズボタン
        this.pause = tm.extension.Button(200, 60, "PAUSE", {flat: true, fontSize:40})
            .addChildTo(this.infoLayer)
            .setPosition(SC_W*0.84, 30)
            .addEventListener("pushed", function() {
                appMain.pushScene(tmapp.PauseScene(this));
            }.bind(this));

        //初期化
        this.startup();

        //目隠し
        this.mask = tm.display.RectangleShape({width: SC_W, height: SC_H, fillStyle: "rgba(0, 0, 0, 1.0)", strokeStyle: "rgba(0, 0, 0, 1.0)"})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5);
        this.mask.tweener.clear().fadeOut(200);

        //目隠し（白）
        this.maskW = tm.display.RectangleShape({width: SC_W, height: SC_H, fillStyle: "rgba(255, 255, 255, 1.0)", strokeStyle: "rgba(255, 255, 255, 1.0)"})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)
            .setAlpha(0);
    },
    
    update: function(app) {
        if (!this.startGame) return;

        if (!this.stopTimer) {
            this.gameTime += app.deltaTime;
            this.stageTime += app.deltaTime;
            if (this.gameTime < 0) this.gameTime = 0;
            if (this.gameTime > 60000) {
                this.gameTime = 60000;
                this.timeup = true;
            }
        }

        //最終ステージエクストラターゲット
        if (this.numStage == 5) {
            if (this.numHit == 4 && !this.bomb) {
                //ラストステージイベント用
                this.bomb = tmapp.Bomb()
                    .addChildTo(this.mainLayer)
                    .setPosition(SC_W*0.5, -50)
                    .setFloor(this.floor[2]);
            }
        }

        //ステージクリア条件チェック
        if (this.checkStageClear()) {
            if (!this.clearStage) {
                //小数点３位以下を切り捨て
                this.gameTime = (this.gameTime/10).floor()*10;
                this.stageTime = (this.stageTime/10).floor()*10;

                var that = this;
                this.stopTimer = true;
                this.clearTime[this.numStage] = this.gameTime;
                this.stageResult[this.numStage] = this.stageTime;
                this.clearStage = true;

                var st = tm.display.Label("STAGE CLEAR", 80)
                    .addChildTo(this)
                    .setParam(this.labelParamCenter)
                    .setPosition(SC_W*0.5, SC_H*-0.5);
                st.tweener.clear()
                    .wait(2000)
                    .move(SC_W*0.5, SC_H*0.45, 200, "easeOutSine")
                    .wait(3000)
                    .fadeOut(10);

                //ステージクリアタイム表示
                var t = tm.display.Label("TIME: "+convertTimeFormat(this.stageTime), 80)
                    .addChildTo(this)
                    .setParam(this.labelParamCenter)
                    .setPosition(SC_W*0.5, SC_H*1.5);
                t.tweener.clear()
                    .wait(2100)
                    .move(SC_W*0.5, SC_H*0.55, 200, "easeOutSine")
                    .wait(2900)
                    .fadeOut(10);

                //オールクリア判定
                var that = this;
                if (this.numStage == this.maxStage) {
                    //リザルト表示
                    st.tweener.call(function() {
                        appMain.pushScene(tmapp.GameoverScene(true, that.gameTime, that.clearTime, that.stageResult));
                        st.remove();
                        t.remove();
                    });
                } else {
                    //次のステージへ
                    st.tweener.call(function() {
                        that.numStage++;
                        that.startup();
                        st.remove();
                        t.remove();
                    });
                }
            }
        }

        //ゲームオーバー条件チェック
        if(!this.stopTimer && !this.clearStage && !this.gameover) {
            if (this.leftBullet == 0 || this.timeup) {
                this.gameover = true;
                var that = this;
                var text = "BULLET EMPTY!!"
                if (this.timeup) text = "TIME UP!!"
                var st = tm.display.Label(text, 80)
                    .addChildTo(this)
                    .setParam(this.labelParamCenter)
                    .setPosition(SC_W*0.5, SC_H*0.5)
                    .setAlpha(0);
                st.tweener.clear()
                    .wait(2000)
                    .fadeIn(10)
                    .call(function() {
                        that.stopTimer = true;
                    })
                    .wait(2000)
                    .fadeOut(10)
                    .call(function() {
                        st.remove();
                        var param = {
                            maxStage: that.maxStage,
                            clearTime: that.clearTime,
                        };
                        appMain.pushScene(tmapp.GameoverScene(true, that.gameTime, that.clearTime, that.stageResult));
                    });
            }
        }
    },

    //ゲーム開始表示
    startup: function() {
        var that = this;

        this.clearStage = false;
        this.numHit = 0;
        this.stageTime = 0;
 
        var st = tm.display.Label("STAGE "+this.numStage, 100)
            .addChildTo(this)
            .setParam(this.labelParamCenter)
            .setPosition(SC_W*0.5, SC_H*-1.0);
        st.tweener.clear()
            .move(SC_W*0.5, SC_H*0.5, 600, "easeOutSine")
            .wait(1000)
            .call(function() {
                st.fontSize = 200;
                st.text = "3";
            })
            .fadeOut(1000)
            .call(function() {
                st.text = "2";
            })
            .fadeIn(1).fadeOut(1000)
            .call(function() {
                st.text = "1";
            })
            .fadeIn(1).fadeOut(1000)
            .call(function() {
                that.startGame = true;
                that.stopTimer = false;
                that.setupStage();
                st.fontSize = 100;
                st.text = "START"
            })
            .fadeIn(1).wait(500).fadeOut(200)
            .call(function() {
                st.remove();
            });
    },

    //ステージ構築
    setupStage: function() {
        if (this.numStage == 1) {
            var x = SC_W*(rand(1,9)*0.1);
            var y = rand(0,4);
            tmapp.Target(1, 0)
                .addChildTo(this.mainLayer)
                .setPosition(x, this.floor[y])
                .setFloor(this.floor[y]);
        }
        if (this.numStage == 2) {
            for (var i = 0; i < 3; i++) {
                var x = SC_W*(rand(1,9)*0.1);
                var y = rand(0,4);
                tmapp.Target(1, 0)
                    .addChildTo(this.mainLayer)
                    .setPosition(x, this.floor[y])
                    .setFloor(this.floor[y]);
            }
        }
        if (this.numStage == 3) {
            var x = SC_W*(rand(1,9)*0.1);
            var y = rand(0,4);
            tmapp.Target(1, 0)
                .addChildTo(this.mainLayer)
                .setPosition(x, this.floor[y])
                .setFloor(this.floor[y]);

            for (var i = 0; i < 2; i++) {
                var x = SC_W*(rand(1,9)*0.1);
                var y = rand(0,4);
                tmapp.Target(1, 1)
                    .addChildTo(this.mainLayer)
                    .setPosition(x, this.floor[y])
                    .setFloor(this.floor[y]);
            }
        }
        if (this.numStage == 4) {
            var x = SC_W*(rand(1,9)*0.1);
            var y = rand(0,4);
            tmapp.Target(1, 1)
                .addChildTo(this.mainLayer)
                .setPosition(x, this.floor[y])
                .setFloor(this.floor[y]);

            for (var i = 0; i < 2; i++) {
                var x = SC_W*(rand(1,9)*0.1);
                var y = rand(0,4);
                tmapp.Target(1, 2)
                    .addChildTo(this.mainLayer)
                    .setPosition(x, this.floor[y])
                    .setFloor(this.floor[y]);
            }
        }
        if (this.numStage == 5) {
            for (var i = 0; i < 4; i++) {
                var x = SC_W*(rand(1,9)*0.1);
                var y = rand(0,4);
                tmapp.Target(1, (i%2)+1)
                    .addChildTo(this.mainLayer)
                    .setPosition(x, this.floor[y])
                    .setFloor(this.floor[y]);
            }
        }
    },

    //ステージクリア条件達成チェック
    checkStageClear: function() {
        if (this.numStage == 1) {
            if (this.numHit > 0) return true;
        }
        if (this.numStage == 2) {
            if (this.numHit > 2) return true;
        }
        if (this.numStage == 3) {
            if (this.numHit > 2) return true;
        }
        if (this.numStage == 4) {
            if (this.numHit > 2) return true;
        }
        if (this.numStage == 5) {
            if (this.numHit > 4) return true;
        }
        return false;
    },

    //着弾エフェクト
    addImpact: function(x, y) {
        var p = tm.display.AnimationSprite(tmapp.SpriteSheet.Impact)
            .addChildTo(this)
            .setPosition(x, y)
            .setScale(2)
            .gotoAndPlay("impact");
        p.onanimationend = function() {
            this.remove();
        }
    },

    //ターゲット当り判定
    checkCollision: function(x, y) {
        var list = this.mainLayer.children;
        var hit = false;
        list.forEach(function(e, i, a) {
            if (!hit && e.isHitPoint(x, y)) {
                if (e.damage(x, y)) this.numHit++;
            }
        }.bind(this));
    },

    ontouchstart: function(e) {
        if (this.startGame && !this.stopTimer) {
            if (this.leftBullet > 0) {
                this.leftBullet--;
                appMain.playSE("bang");
                this.addImpact(e.pointing.x, e.pointing.y);
                this.checkCollision(e.pointing.x, e.pointing.y);
            } else {
                appMain.playSE("empty");
            }
        }
    },

    ontouchmove: function(e) {
    },

    ontouchend: function(e) {
    },
});

