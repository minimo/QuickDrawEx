/*
 *  GameoverScene.js
 *  2014/06/23
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("tmapp.GameoverScene", {
    superClass: tm.app.Scene,

    parentScene: null,
    mode: 0,
    bonus: false,
    dispExtend: false,

    //遷移情報
    state: 0,

    //スコア情報
    gameTime: 0,
    clearTime: null,
    stageResult: null,

    //ラベル用パラメータ
    labelParamBasic: {fontFamily: "UbuntuMono", align: "left", baseline: "middle",outlineWidth: 3, fontWeight:700},
    labelParamCenter: {fontFamily: "UbuntuMono", align: "center", baseline: "middle",outlineWidth: 3, fontWeight:700},
    digitalCenterParam: {fontFamily: "Digital", align: "center", baseline: "middle",outlineWidth: 3, fontWeight:700},

    init: function(all, gameTime, clearTime, stageResult) {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";

        //バックグラウンド
        this.bg = tm.display.RectangleShape({width: SC_W, height: SC_H, fillStyle: appMain.bgColor, strokeStyle: appMain.bgColor})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)

        this.wall = tm.display.Sprite("wall", SC_W, SC_H)
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)

        //スコア情報
        this.gameTime = gameTime;
        this.clearTime = clearTime;
        this.stageResult = stageResult;

        this.dispResult(all);

        //目隠し（中間）
        this.middleMask = tm.display.RectangleShape({width: SC_W, height: SC_H, fillStyle: "rgba(0, 0, 0, 1.0)", strokeStyle: "rgba(0, 0, 0, 1.0)"})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)
            .setAlpha(0);

        this.b1 = tm.extension.Button(SC_W, 100, "RETRY")
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.35)
            .setAlpha(0)
            .setLock(true)
            .addEventListener("pushed", function() {
                appMain.pushScene(tmapp.MainScene());
            });
        this.b2 = tm.extension.Button(SC_W, 100, "TITLE")
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)
            .setAlpha(0)
            .setLock(true)
            .addEventListener("pushed", function() {
                appMain.pushScene(tmapp.TitleScene());
            });
        this.b3 = tm.extension.Button(SC_W, 100, "RANKING")
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.65)
            .setAlpha(0)
            .setLock(true)
            .addEventListener("pushed", function() {
            });

        //目隠し
        this.mask = tm.display.RectangleShape({width: SC_W, height: SC_H, fillStyle: "rgba(0, 0, 0, 1.0)", strokeStyle: "rgba(0, 0, 0, 1.0)"})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5);
        this.mask.tweener.clear().fadeOut(200);
    },

    update: function() {
    },

    //リザルト表示
    dispResult: function(all) {
        var st = tm.display.Label("RESULT", 80)
            .addChildTo(this)
            .setParam(this.labelParamCenter)
            .setPosition(SC_W*0.5, SC_H*0.1);

        for (var i = 0; i < 5; i++) {
            var r = tm.display.Label( (i+1)+": "+convertTimeFormat(this.stageResult[i+1]), 80)
                .addChildTo(this)
                .setParam(this.labelParamCenter)
                .setPosition(-SC_W+SC_W*(i%2)*2, SC_H*0.25+SC_H*0.1*i);
            r.tweener.clear()
                .wait(50*i)
                .move(SC_W*0.5, SC_H*0.25+SC_H*0.1*i, 200, "easeOutElastic");
        }
        if (all) {
            var r = tm.display.Label("TOTAL", 80)
                .addChildTo(this)
                .setParam(this.labelParamCenter)
                .setPosition(SC_W*0.5, SC_H*1.5);
            r.tweener.clear()
                .wait(500)
                .move(SC_W*0.5, SC_H*0.75, 200, "easeOutSine");
            var r = tm.display.Label(convertTimeFormat(this.gameTime), 80)
                .addChildTo(this)
                .setParam(this.labelParamCenter)
                .setPosition(SC_W*0.5, SC_H*1.5);
            r.tweener.clear()
                .wait(500)
                .move(SC_W*0.5, SC_H*0.85, 200, "easeOutSine");
        }
    },

    //タッチorクリック開始処理
    ontouchstart: function(e) {
    },

    //タッチorクリック移動処理
    ontouchmove: function(e) {
    },

    //タッチorクリック終了処理
    ontouchend: function(e) {
        if (this.state == 0) {
            this.state++;
            var that = this;
            this.middleMask.tweener.clear()
                .to({alpha: 0.7}, 200)
                .call(function() {
                    that.b1.setLock(false).tweener.fadeIn(200);
                    that.b2.setLock(false).tweener.fadeIn(200);
                    that.b3.setLock(false).tweener.fadeIn(200);
                });
        }
    },

});
