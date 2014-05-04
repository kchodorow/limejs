goog.provide('broccoli.Map');

goog.require('goog.structs.QuadTree');
goog.require('goog.structs.Set');

goog.require('broccoli.ForestRanger');

// Infinite map.
broccoli.Map = function(forest_ranger) {
    this.acre_ = new goog.structs.QuadTree(
        -broccoli.Map.WIDTH, -broccoli.Map.HEIGHT,
        broccoli.Map.WIDTH, broccoli.Map.HEIGHT);
    this.forest_ranger_ = forest_ranger;
};

broccoli.Map.WIDTH = 10;
broccoli.Map.HEIGHT = 10;

broccoli.Map.prototype.has_acre = function(acre_x, acre_y) {
    return this.acre_.contains(acre_x, acre_y);
};

broccoli.Map.prototype.acre = function(acre_x, acre_y) {
    var acre = this.acre_.get(acre_x, acre_y);
    if (!acre) {
        this.forest_ranger_.generate(
            acre_x * broccoli.Acre.WIDTH, acre_y * broccoli.Acre.HEIGHT);
        this.acre_.set(acre_x, acre_y, true);
    }
    return acre;
};

// Map sections: allocated in 20x10 arrays of squares.
broccoli.Acre = {};
broccoli.Acre.WIDTH = 20;
broccoli.Acre.HEIGHT = 10;
