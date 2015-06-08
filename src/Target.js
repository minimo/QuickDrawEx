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
    },

    update: function() {
    },

    damage: function() {
        return false;
    },

});

})();
