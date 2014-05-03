goog.provide('broccoli.Map');

goog.require('goog.structs.QuadTree');

// Infinite map.
broccoli.Map = function() {
    this.acre_ = new goog.structs.QuadTree(
        -broccoli.Map.WIDTH, -broccoli.Map.HEIGHT,
        broccoli.Map.WIDTH, broccoli.Map.HEIGHT);
};

broccoli.Map.WIDTH = 10;
broccoli.Map.HEIGHT = 10;

broccoli.Map.prototype.getAcre = function(x, y) {
    var acre = this.acre_.get(x, y);
    if (!acre) {
        acre = new broccoli.Acre();
        this.acre_.set(x, y, acre);
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
