goog.provide('broccoli.Map');

goog.require('goog.structs.QuadTree');
goog.require('goog.structs.Set');

// Infinite map.
broccoli.Map = function(acre_generator) {
    this.acre_generator_ = acre_generator;
    this.acre_ = new goog.structs.QuadTree(
        -broccoli.Map.WIDTH, -broccoli.Map.HEIGHT,
        broccoli.Map.WIDTH, broccoli.Map.HEIGHT);
};

broccoli.Map.WIDTH = 10;
broccoli.Map.HEIGHT = 10;

broccoli.Map.prototype.has_acre = function(acre_x, acre_y) {
    return this.acre_.contains(acre_x, acre_y);
};

broccoli.Map.prototype.acre = function(acre_x, acre_y) {
    var acre = this.acre_.get(acre_x, acre_y);
    if (!acre) {
        acre = new broccoli.Acre();
        this.acre_generator_(
            this, acre_x * broccoli.Acre.WIDTH, acre_y * broccoli.Acre.HEIGHT);
        this.acre_.set(acre_x, acre_y, acre);
    }
    return acre;
};

// Map sections: allocated in 20x10 arrays of squares.
broccoli.Acre = function() {
    this.square_ = new Array(broccoli.Acre.WIDTH);
    for (var i = 0; i < broccoli.Acre.WIDTH; ++i) {
        this.square_[i] = new Array(broccoli.Acre.HEIGHT);
        for (var j = 0; j < broccoli.Acre.HEIGHT; ++j) {
            this.square_[i][j] = new broccoli.Square();
        }
    }
};

broccoli.Acre.WIDTH = 20;
broccoli.Acre.HEIGHT = 10;

broccoli.Square = function() {
};
