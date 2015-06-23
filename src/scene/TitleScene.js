/*
 *  TitleScene.js
 *  2014/06/19
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("tmapp.TitleScene", {
    superClass: tm.app.Scene,

    //フォントパラメータ
    labelParam: {fontFamily:"Orbitron", align: "center", baseline:"middle", outlineWidth:2, fontWeight:700 },
    scoreParam: {fontFamily:"Orbitron", align: "left", baseline:"middle", outlineWidth:2 },
    leftParam: {fontFamily:"Orbitron", align: "left", baseline:"middle", outlineWidth:2 },
    rightParam: {fontFamily:"Orbitron", align: "right", baseline:"middle", outlineWidth:2 },

    bgColor: 'rgba(50, 150, 50, 1)',

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";

        //バックグラウンド
        this.bg = tm.display.RectangleShape({width: SC_W, height: SC_H, fillStyle: appMain.bgColor, strokeStyle: appMain.bgColor})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)

        this.wall = tm.display.Sprite("wall", SC_W, SC_H)
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)

        this.t1 = tm.display.OutlineLabel("QUICK", 80)
            .addChildTo(this)
            .setParam(this.leftParam)
            .setPosition(SC_W*2, SC_H*0.3);
        this.t2 = tm.display.OutlineLabel("DRAW", 80)
            .addChildTo(this)
            .setParam(this.rightParam)
            .setPosition(SC_W*-1.0, SC_H*0.4);
        this.t1.tweener.clear().move(SC_W*0.2, SC_H*0.3, 500);
        this.t2.tweener.clear().move(SC_W*0.8, SC_H*0.4, 500);

        var lb = tm.display.Label("touch start", 50)
            .addChildTo(this)
            .setParam(this.labelParam)
            .setPosition(SC_W*0.5, SC_H*0.8);
        lb.tweener.clear().wait(300).to({alpha:0}, 1000, "easeInSine").wait(100).to({alpha:1}, 1000, "easeOutSine").setLoop(true);
            
        //目隠し
        this.mask = tm.display.RectangleShape({width: SC_W, height: SC_H, fillStyle: "rgba(0, 0, 0, 1.0)", strokeStyle: "rgba(0, 0, 0, 1.0)"})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5);
        this.mask.tweener.clear().fadeOut(300);
        
        this.time = 0;
    },

    onresume: function() {
    },

    update: function() {
        //スクリーンショット保存
        var kb = appMain.keyboard;
        if (kb.getKeyDown("s")) appMain.canvas.saveAsImage();

        this.time++;
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

    //タッチorクリック開始処理
    ontouchstart: function(e) {
        this.addImpact(e.pointing.x, e.pointing.y);
    },

    //タッチorクリック移動処理
    ontouchmove: function(e) {
    },

    //タッチorクリック終了処理
    ontouchend: function(e) {
        tm.sound.WebAudio.unlock();
        appMain.pushScene(tmapp.MainScene(GAMEMODE_NORMAL, 1));
    },
});
