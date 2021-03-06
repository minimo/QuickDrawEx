/*
 *  Benri.js
 *  2014/12/18
 *  @auther minimo  
 *  This Program is MIT license.
 */
 
var toRad = 3.14159/180;    //弧度法toラジアン変換
var toDeg = 180/3.14159;    //ラジアンto弧度法変換

//距離計算
var distance = function(from, to) {
    var x = from.x-to.x;
    var y = from.y-to.y;
    return Math.sqrt(x*x+y*y);
}

//距離計算（ルート無し版）
var distanceSq = function(from, to) {
    var x = from.x-to.x;
    var y = from.y - to.y;
    return x*x+y*y;
}

//数値の制限
var clamp = function(x, min, max) {
    return (x<min)?min:((x>max)?max:x);
};

//タイトル無しダイアログ
var AdvanceAlert = function(str) {
    var tmpFrame = document.createElement('iframe');
    tmpFrame.setAttribute('src', 'data:text/plain,');
    document.documentElement.appendChild(tmpFrame);

    window.frames[0].window.alert(str);
    tmpFrame.parentNode.removeChild(tmpFrame);
};
var AdvanceConfirm = function(str) {
    var tmpFrame = document.createElement('iframe');
    tmpFrame.setAttribute('src', 'data:text/plain,');
    document.documentElement.appendChild(tmpFrame);

    var result = window.frames[0].window.confirm(str);
    tmpFrame.parentNode.removeChild(tmpFrame);

    return result;
};

//小数点付き表記に変換
convertTimeFormat = function(time) {
    if (isNaN(time))return "--.--";
    time = (time/10).floor();
    var text = ""+(time/100);
    if (time%100 === 0 ) text += ".0";
    if (time%10 === 0 ) text += "0";
    if (time < 1000) text = "0"+text;
    return text;
}
