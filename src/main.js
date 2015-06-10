/*
 *  main.js
 *  2014/06/19
 *  @auther minimo  
 *  This Program is MIT license.
 */
 
//乱数発生器
mt = new MersenneTwister();
var rand = function(min, max) { return mt.nextInt(min, max); };    //乱数発生

//定数
//デバッグフラグ
var DEBUG = false;

//スクリーンサイズ
var SC_W = 640;
var SC_H = 1136;

//ゲームモード
var GAMEMODE_NORMAL = 0;

//フレームレート
fps = 30;
var sec = function(s) { return ~~(fps * s);}    //秒からフレーム数へ変換

//インスタンス
appMain = {};

//アプリケーションメイン
tm.main(function() {
    appMain = tmapp.CanvasApp("#world");
    appMain.run();
});
