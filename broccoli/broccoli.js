goog.provide('broccoli');

goog.require('lime.Director');

goog.require('broccoli.Forest');

broccoli.start = function(){
    var director = new lime.Director(document.body,1024,768);
    var scene = new broccoli.Forest();
    director.replaceScene(scene);
};

goog.exportSymbol('broccoli.start', broccoli.start);
