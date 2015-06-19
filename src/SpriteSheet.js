/*
 *  SpriteSheet.js
 *  2015/05/22
 *  @auther minimo  
 *  This Program is MIT license.
 */
(function() {

tmapp.SpriteSheet = {};

//スプライトシート作成
tmapp.createSpriteSheet = function() {

    //着弾エフェクト用
    tmapp.SpriteSheet.Impact = tm.asset.SpriteSheet({
        image: "impact",
        frame: {
            width: 64,
            height: 64,
            count: 8,
        },
        animations: {
            "impact": {
                frames:[0,1,2,3,4,5,6,7],
                frequency: 1,
            },
        },
    });

    //ターゲット用
    tmapp.SpriteSheet.Target = [];
    tmapp.SpriteSheet.Target[1] = tm.asset.SpriteSheet({
        image: "target_waru",
        frame: {
            width: 32,
            height: 32,
            count: 18,
        },
        animations: {
            "wait": {
                frames:[7],
                next: "wait",
                frequency: 30,
            },
            "fly": {
                frames:[1,2,3,2],
                next: "fly",
                frequency: 7,
            },
            "walk": {
                frames:[12,13,14,13],
                next: "walk",
                frequency: 10,
            },
            "damage": {
                frames:[4],
                next: "damage",
                frequency: 1,
            },
            "dawn": {
                frames:[5],
                next: "dawn",
                frequency: 1,
            },
        },
    });
    tmapp.SpriteSheet.Target[2] = tm.asset.SpriteSheet({
        image: "target_mecha",
        frame: {
            width: 32,
            height: 32,
            count: 18,
        },
        animations: {
            "wait": {
                frames:[7],
                next: "wait",
                frequency: 30,
            },
            "fly": {
                frames:[1,2,3,2],
                next: "fly",
                frequency: 7,
            },
            "walk": {
                frames:[12,13,14,13],
                next: "walk",
                frequency: 10,
            },
            "damage": {
                frames:[4],
                next: "damage",
                frequency: 1,
            },
            "dawn": {
                frames:[5],
                next: "dawn",
                frequency: 1,
            },
        },
    });
    tmapp.SpriteSheet.Target[3] = tm.asset.SpriteSheet({
        image: "target_normal",
        frame: {
            width: 32,
            height: 32,
            count: 18,
        },
        animations: {
            "wait": {
                frames:[7],
                next: "wait",
                frequency: 30,
            },
            "fly": {
                frames:[1,2,3,2],
                next: "fly",
                frequency: 7,
            },
            "walk": {
                frames:[12,13,14,13],
                next: "walk",
                frequency: 10,
            },
            "damage": {
                frames:[4],
                next: "damage",
                frequency: 1,
            },
            "dawn": {
                frames:[5],
                next: "dawn",
                frequency: 1,
            },
        },
    });
};


})();