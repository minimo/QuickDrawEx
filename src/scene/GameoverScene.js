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

    //ラベル用フォントパラメータ
    labelParam: {fontFamily:"Orbitron", align: "center", baseline:"middle", outlineWidth:2, fontWeight:700 },

    init: function(param) {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";

        this.t1 = tm.display.OutlineLabel("GAME OVER", 80)
            .addChildTo(this)
            .setParam(this.labelParam)
            .setPosition(SC_W*0.5, SC_H*0.2);

        //目隠し
        this.mask = tm.display.RectangleShape({width: SC_W, height: SC_H, fillStyle: "rgba(0, 0, 0, 1.0)", strokeStyle: "rgba(0, 0, 0, 1.0)"})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5);
        this.mask.tweener.clear().fadeOut(200);
    },

    update: function() {
    },

    //タッチorクリック開始処理
    ontouchstart: function(e) {
    },

    //タッチorクリック移動処理
    ontouchmove: function(e) {
    },

    //タッチorクリック終了処理
    ontouchend: function(e) {
    },

});
