goog.provide('broccoli.Player');

goog.require('lime.Sprite');

goog.require('broccoli.Token');

broccoli.Player = function() {
    goog.base(this);
    this.sprite_ = new lime.Sprite().setSize(30, 30).setFill('#00f');
    this.set_position(new goog.math.Coordinate(5, 5));
};

goog.inherits(broccoli.Player, broccoli.Token);
