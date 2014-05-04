goog.provide('broccoli.Tree');

goog.require('lime.Sprite');

goog.require('broccoli.Token');

broccoli.Tree = function() {
    goog.base(this);
    this.sprite_ = new lime.Sprite().setSize(30, 30).setFill('#0f0');
};

goog.inherits(broccoli.Tree, broccoli.Token);
