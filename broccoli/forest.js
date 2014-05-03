goog.provide('broccoli.Forest');

goog.require('lime.Scene');

goog.require('broccoli.Camera');
goog.require('broccoli.Map');

broccoli.Forest = function() {
    lime.Scene.call(this);

    this.map_ = new broccoli.Map(goog.bind(this.generateAcre_, this));

    this.camera_ = new broccoli.Camera(this.map_);
    this.camera_.snapshot(0, 0);
    this.appendChild(this.camera_);
};

goog.inherits(broccoli.Forest, lime.Scene);

broccoli.Forest.prototype.generateAcre_ = function(acre) {
    for (var i = 0; i < broccoli.Acre.WIDTH; ++i) {
        for (var j = 0; j < broccoli.Acre.HEIGHT; ++j) {
            if (this.shouldCreateTree_()) {
                acre.square_[i][j].add_tag('tree');
            }
        }
    }
};

broccoli.Forest.prototype.shouldCreateTree_ = function() {
    return goog.math.randomInt(3) == 0;
};
