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
        image: "target1",
        frame: {
            width: 32,
            height: 32,
            count: 18,
        },
        animations: {
            "stop": {
                frames:[0],
                next: "stop",
                frequency: 1,
            },
            "startup": {
                frames:[1,2,3,1,2,3,1,2,3,1,2,3,1,2,3],
                next: "stop",
                frequency: 5,
            },
            "miss": {
                frames:[4,5],
                frequency: 23,
            },
            "move": {
                frames:[1,2,3],
                next: "move",
                frequency: 5,
            },
            "moveL": {
                frames:[12,13,14,13],
                next: "moveL",
                frequency: 5,
            },
            "moveR": {
                frames:[15,16,17,16],
                next: "moveR",
                frequency: 5,
            },
            "moveD": {
                frames:[6,7,8,7],
                next: "moveD",
                frequency: 5,
            },
            "moveU": {
                frames:[9,10,11,10],
                next: "moveU",
                frequency: 5,
            },
        },
    });
    tmapp.SpriteSheet.Target[2] = tm.asset.SpriteSheet({
        image: "target2",
        frame: {
            width: 32,
            height: 32,
            count: 18,
        },
        animations: {
            "stop": {
                frames:[0],
                next: "stop",
                frequency: 1,
            },
            "startup": {
                frames:[1,2,3,1,2,3,1,2,3,1,2,3,1,2,3],
                next: "stop",
                frequency: 5,
            },
            "miss": {
                frames:[4,5],
                frequency: 23,
            },
            "move": {
                frames:[1,2,3],
                next: "move",
                frequency: 5,
            },
            "moveL": {
                frames:[12,13,14,13],
                next: "moveL",
                frequency: 5,
            },
            "moveR": {
                frames:[15,16,17,16],
                next: "moveR",
                frequency: 5,
            },
            "moveD": {
                frames:[6,7,8,7],
                next: "moveD",
                frequency: 5,
            },
            "moveU": {
                frames:[9,10,11,10],
                next: "moveU",
                frequency: 5,
            },
        },
    });
    tmapp.SpriteSheet.Target[3] = tm.asset.SpriteSheet({
        image: "target3",
        frame: {
            width: 32,
            height: 32,
            count: 18,
        },
        animations: {
            "stop": {
                frames:[0],
                next: "stop",
                frequency: 1,
            },
            "startup": {
                frames:[1,2,3,1,2,3,1,2,3,1,2,3,1,2,3],
                next: "stop",
                frequency: 5,
            },
            "miss": {
                frames:[4,5],
                frequency: 23,
            },
            "move": {
                frames:[1,2,3],
                next: "move",
                frequency: 5,
            },
            "moveL": {
                frames:[12,13,14,13],
                next: "moveL",
                frequency: 5,
            },
            "moveR": {
                frames:[15,16,17,16],
                next: "moveR",
                frequency: 5,
            },
            "moveD": {
                frames:[6,7,8,7],
                next: "moveD",
                frequency: 5,
            },
            "moveU": {
                frames:[9,10,11,10],
                next: "moveU",
                frequency: 5,
            },
        },
    });
};


})();