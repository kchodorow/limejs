goog.provide('broccoli.Forest');

goog.require('lime.Scene');

goog.require('broccoli.Camera');
goog.require('broccoli.Map');
goog.require('broccoli.Player');
goog.require('broccoli.TokenRegistry');
goog.require('broccoli.Tree');

broccoli.Forest = function() {
    goog.base(this);

    this.map_ = new broccoli.Map(goog.bind(this.generateAcre_, this));
    this.token_registry_ = new broccoli.TokenRegistry();
    this.token_registry_.register(new broccoli.Player());

    this.camera_ = new broccoli.Camera(this.map_, this.token_registry_);
    this.camera_.snapshot(0, 0);
    this.appendChild(this.camera_);
};

goog.inherits(broccoli.Forest, lime.Scene);

broccoli.Forest.prototype.generateAcre_ = function(acre, x, y) {
    for (var i = 0; i < broccoli.Acre.WIDTH; ++i) {
        for (var j = 0; j < broccoli.Acre.HEIGHT; ++j) {
            if (this.shouldCreateTree_()) {
                var tree = new broccoli.Tree();
                this.token_registry_.register(tree);
                tree.set_position(new goog.math.Coordinate(x + i, y + j));
            }
        }
    }
};

broccoli.Forest.prototype.shouldCreateTree_ = function() {
    return goog.math.randomInt(3) == 0;
};
