goog.provide('broccoli.ForestRanger');

goog.require('broccoli.Tree');

// Plants trees.
broccoli.ForestRanger = function(token_registry) {
    this.token_registry_ = token_registry;
};

broccoli.ForestRanger.prototype.generate = function(x, y) {
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

broccoli.ForestRanger.prototype.shouldCreateTree_ = function() {
    return goog.math.randomInt(3) == 0;
};
