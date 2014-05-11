goog.provide('broccoli.ForestRanger');

goog.require('broccoli.Tree');

// Plants trees.
broccoli.ForestRanger = function(token_registry) {
    this.token_registry_ = token_registry;
};

broccoli.ForestRanger.prototype.generate = function(x, y) {
    for (var i = 0; i < broccoli.Acre.WIDTH; ++i) {
        for (var j = 0; j < broccoli.Acre.HEIGHT; ++j) {
            var builder = goog.bind(this.maybeCreate_, this, x+i, y+j);
            builder(broccoli.Tree.create, 5);
            builder(broccoli.Enemy.create, 20);
        }
    }
};

broccoli.ForestRanger.prototype.maybeCreate_ = function(
    x, y, builder, probability) {
    if (goog.math.randomInt(probability) != 0) {
        return;
    }
    var thing = builder.call();
    this.token_registry_.register(thing);
    thing.set_position(new goog.math.Coordinate(x, y));
};
