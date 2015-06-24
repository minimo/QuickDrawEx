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

    //行動パターン
    pattern: 0,

    //フロア座標
    floorY: -1,

    //重力加速度
    vy: 0,

    //行動パターンインターバル
    interval: 0,

    init: function(num, pattern) {
        var sp = tmapp.SpriteSheet.Target[num];
        if (!sp) {
            sp = tmapp.SpriteSheet.Target[0];
        }
        this.superInit(sp);

        this.setScale(3);
        this.bx = this.by = 0;
        this.dir = this.beforeDir = 0;   //0:左 1:右

        this.pattern = pattern;
        this.speed = 0;
        this.boundingType = "circle";
        this.radius = 24;

        switch (pattern) {
            case 0:
                this.gotoAndPlay("wait");
                break;
            case 1:
                this.gotoAndPlay("walk");
                this.speed = rand(3, 8);
                if (rand(0, 2)==0)this.speed *= -1;
                break;
            case 2:
                this.gotoAndPlay("walk");
                this.speed = rand(5, 10);
                if (rand(0, 2)==0)this.speed *= -1;
                break;
            default:
                this.gotoAndPlay("wait");
                break;
        }
    },

    update: function() {
        this.algorithm();

        if (this.floorY > 0) {
            this.vy += 0.98*4;
            this.y += this.vy;
            if (this.y > this.floorY) {
                this.y = this.floorY;
                this.vy = 0;
            }
        }

        if (this.bx > this.x) {
            this.dir = 0;
        } else {
            this.dir = 1;
        }
        if (this.dir !== this.beforeDir) this.scaleX *= -1;

        this.bx = this.x;
        this.by = this.y;
        this.beforeDir = this.dir;

        if (this.vy == 0 ) {
            if (this.speed != 0 && this.currentAnimationName != "walk") this.gotoAndPlay("walk");
        } else {
            if (this.currentAnimationName != "fly") this.gotoAndPlay("fly");
        }
    },

    algorithm: function() {
        if (this.pattern == 0) {
        }
        if (this.pattern == 1) {
            this.x += this.speed;
            if (this.speed < 0) {
                if (this.x < 48) this.speed *= -1;
            } else {
                if (this.x > SC_W-48)  this.speed *= -1;
            }
            this.interval--;
            if (this.interval < 0) {
                var dice = rand(0, 100);
                if (dice < 20) {
                    this.speed *= -1;
                    this.interval = 120;
                }
            }
        }
        if (this.pattern == 2) {
            this.x += this.speed;
            if (this.speed < 0) {
                if (this.x < 48) this.speed *= -1;
            } else {
                if (this.x > SC_W-48)  this.speed *= -1;
            }
            this.interval--;
            if (this.interval < 0) {
                var dice = rand(0, 100);
                if (dice < 30) {
                    this.vy = -40;
                    this.interval = 120;
                } else if (dice < 40) {
                    this.speed *= -1;
                    this.interval = 120;
                }
            }
        }
    },

    damage: function(x, y) {
        if (this.isDead || !this.isCollision)return;
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

    setFloor: function(y) {
        this.floorY = y;
        return this;
    },
});

tm.define("tmapp.Bomb", {
    superClass: "tm.display.Sprite",

    //設定フラグ
    isCollision: true,
    isDead: false,

    //耐久力
    def: 1,

    //フロア座標
    floorY: -1,

    //重力加速度
    vy: 0,

    init: function() {
        this.superInit("bakudan", 128, 128);
        this.boundingType = "circle";
        this.radius = 64;
    },
    
    update: function() {
        if (this.floorY > 0) {
            this.vy += 0.98*4;
            this.y += this.vy;
            if (this.y > this.floorY) {
                this.y = this.floorY;
                this.vy = 0;
            }
        }

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

    damage: function(x, y) {
        if (this.isDead || !this.isCollision)return;
        this.def--;
        if (this.def < 1) {
            this.dead(x, y);
            return true;
        }
        return false;
    },

    dead: function(x, y) {
        var p = tm.display.AnimationSprite(tmapp.SpriteSheet.Effect)
            .addChildTo(this.parent)
            .setPosition(x, y)
            .setScale(10)
            .setOrigin(0.5, 0.8)
            .gotoAndPlay("explode");
        p.onanimationend = function() {
            this.remove();
        }

        this.isCollision = false;
        this.isDead = true;
        this.remove();
    },

    setFloor: function(y) {
        this.floorY = y;
        return this;
    },
});

/*
tm.define("tmapp.Bomb", {
    superClass: "tmapp.Target",

    init: function() {
        this.superInit(2, 0);
        this.gotoAndPlay("wait");
    },
    dead: function(x, y) {
        var p = tm.display.AnimationSprite(tmapp.SpriteSheet.Effect)
            .addChildTo(this.parent)
            .setPosition(x, y-128)
            .setScale(10)
            .gotoAndPlay("explode");
        p.onanimationend = function() {
            this.remove();
        }

        this.isCollision = false;
        this.isDead = true;
        this.remove();
    },
});
*/

})();
