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

    //耐久力
    def: 1,

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

    damage: function(x, y) {
        if (this.isDead)return;
        this.def--;
        if (this.def < 1) {
            this.dead(x, y);
            return true;
        }
        return false;
    },

    dead: function(x, y) {
        this.isCollision = false;
        this.isDead = true;

        this.gotoAndPlay("damage");
        this.vx = (this.x - x)/4;
        this.vy = -30;
        this.rot = this.vx;
        this.update = function() {
            this.rotation += this.rot;
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.98*4;
            if (this.y > SC_H+64) this.remove();
        };
    },
});

})();
