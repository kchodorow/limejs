goog.provide('broccoli.Forest');

goog.require('lime.Scene');

goog.require('broccoli.Camera');

broccoli.Forest = function() {
    lime.Scene.call(this);

    this.camera_ = new broccoli.Camera();
//    this.camera_.setPosition(100, 100);
    this.appendChild(this.camera_);
};

goog.inherits(broccoli.Forest, lime.Scene);
