/*
 *  Target.js
 *  2015/06/09
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

tm.define("tmapp.Target", {
    superClass: "tm.display.AnimationSprite",

    //設定フラグ
    isCollision: true,
    isDead: false,

    //行動パターン番号
    pattern: 0,

    init: function(num) {
        var sp = tmapp.SpriteSheet.Target[num];
        if (!sp) {
            sp = tmapp.SpriteSheet.Target[0];
        }
        this.superInit(sp);

        this.setScale(3);
        this.bx = this.by = 0;
        this.dir = this.beforeDir = 0;   //0:左 1:右
        
        this.gotoAndPlay("walk");
    },

    update: function() {
        this.x += -1;
        if (this.bx > this.x) {
            this.dir = 0;
        } else {
            this.dir = 1;
        }
        if (this.dir !== this.beforeDir) this.scaleX *= -1;

        this.bx = this.x;
        this.by = this.y;
        this.beforeDir = this.dir;
    },

    algorithm: function() {
    },

    damage: function() {
        return false;
    },

    dead: function() {
        this.isCollision = false;
        this.isDead = true;
        this.remove();

        var sp = tm.display.Sprite(this.ss.image, 32, 32)
            .addChildTo(this.parentScene)
            .setPosition(this.x, this.y)
            .setScale(2)
            .setFrameIndex(4);
        sp.vy = -10;
        sp.update = function() {
            this.rotation+=10;
            this.x += 1;
            this.y += this.vy;
            this.vy += 0.98*0.5;
            if (this.y > SC_H+64) {
                this.remove();
            }
        };
    },
});

})();
