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
    gameMode: 0,
    stage: 0,

    //マルチタッチ補助クラス
    touches: null,
    touchID: -1,

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

    //遷移情報
    exitGame: false,
    retryStart: false,

    //ラベル用パラメータ
    labelParamBasic: {fontFamily: "UbuntuMono", align: "left", baseline: "middle",outlineWidth: 3, fontWeight:700},
    digitalCenterParam: {fontFamily: "Digital", align: "center", baseline: "middle",outlineWidth: 3, fontWeight:700},

    init: function(mode, retry) {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";

        //バックグラウンド
        this.bg = tm.display.RectangleShape({width: SC_W, height: SC_H, fillStyle: appMain.bgColor, strokeStyle: appMain.bgColor})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)

        //マルチタッチ初期化
        this.touches = tm.input.TouchesEx(this);

        //レイヤー準備
        this.lowerLayer = tm.app.Object2D().addChildTo(this);
        this.mainLayer = tm.app.Object2D().addChildTo(this);
        this.upperLayer = tm.app.Object2D().addChildTo(this);

        //タイム表示
        var that = this;
        this.timeLabel = tm.display.OutlineLabel("00.00", 100)
            .addChildTo(this)
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

        //ポーズボタン
        this.pause = tm.extension.Button(200, 60, "PAUSE", {flat: true, fontSize:40})
            .addChildTo(this)
            .setPosition(SC_W*0.84, 30)
            .addEventListener("pushed", function() {
                appMain.pushScene(tmapp.PauseScene(this));
            }.bind(this));

        //ステージ構築
        this.gameMode = mode;
        this.stageNumber = 1;
        this.setupStage();

        //目隠し
        this.mask = tm.display.RectangleShape({width: SC_W, height: SC_H, fillStyle: "rgba(0, 0, 0, 1.0)", strokeStyle: "rgba(0, 0, 0, 1.0)"})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5);
        this.mask.tweener.clear().fadeOut(200);
    },
    
    update: function(app) {
        this.gameTime += app.deltaTime;
        if (this.gameTime < 0) this.gameTime = 0;
        if (this.gameTime > 100000) this.gameTime = 100000;
    },

    //ステージ構築
    setupStage: function() {
        var that = this;
        var st = tm.display.OutlineLabel("STAGE "+this.stageNumber, 100)
            .addChildTo(this)
            .setParam(this.digitalCenterParam)
            .setPosition(SC_W*0.5, SC_H*-1.0);
        st.tweener.clear()
            .move(SC_W*0.5, SC_H*0.5, 600, "easeOutSine")
            .call(function() {
            });

        switch(this.gameMode) {
            case MODE_NORMAL:
                if (stageNumber == 1) {
                    var sp = tmapp.Target(1)
                        .addChildTo(this)
                        .setPosition(SC_W/2, SC_H/2);
                }
                break;
        }
    },

    //着弾エフェクト
    addImpact: function(x, y) {
        appMain.playSE("bang");
        var p = tm.display.AnimationSprite(tmapp.SpriteSheet.Impact)
            .addChildTo(this)
            .setPosition(x, y)
            .setScale(2)
            .gotoAndPlay("impact");
        p.onanimationend = function() {
            this.remove();
        }
    },

    //ゲームオーバー
    gameover: function() {
    },

    ontouchesstart: function(e) {
        this.addImpact(e.pointing.x, e.pointing.y);
    },

    ontouchesmove: function(e) {
    },

    ontouchesend: function(e) {
    },
});

