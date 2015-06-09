/*
 *  Target.js
 *  2015/06/09
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

tm.define("tmapp.Target", {
    superClass: "tm.display.AnimationSprite",

    init: function(num) {
        var sp = tmapp.SpriteSheet.Target[num];
        if (!sp) {
            sp = tmapp.SpriteSheet.Target[0];
        }
        this.superInit(sp);

        this.gotoAndPlay("walk");
    },

    update: function() {
        this.x += 1;
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
