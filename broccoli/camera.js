goog.provide('broccoli.Camera');

goog.require('lime.Sprite');

goog.require('broccoli.Map');

broccoli.Camera = function(map, registry) {
    lime.Sprite.call(this);
    this.map_ = map;
    this.registry_ = registry;
};

goog.inherits(broccoli.Camera, lime.Sprite);

/**
 * @param{int} x World coordinate.
 * @param{int} y World coordinate.
 */
broccoli.Camera.prototype.snapshot = function(x, y) {
    var acre_x = x / broccoli.Acre.WIDTH;
    var acre_y = y / broccoli.Acre.HEIGHT;

    for (var i = -1; i <= 1; ++i) {
        for (var j = -1; j <= 1; ++j) {
            var acre = this.map_.acre(acre_x + i, acre_y + j);
            this.drawAcre_(acre_x + i, acre_y + j, acre);
        }
    }

    var tokens = this.registry_.tokens();
    for (i = 0; i < tokens.length; ++i) {
        if (tokens[i].dirty()) {
            var sprite = tokens[i].sprite();
            sprite.setPosition(this.worldToPx(tokens[i].position()));
            this.appendChild(sprite);
            tokens[i].set_dirty(false);
        }
    }
};

broccoli.Camera.prototype.drawAcre_ = function(acre_x, acre_y, acre) {
    for (var i = 0; i < broccoli.Acre.WIDTH; ++i) {
        for (var j = 0; j < broccoli.Acre.HEIGHT; ++j) {
            var x = acre_x * broccoli.Camera.ACRE_WIDTH_PX +
                    i * broccoli.Camera.SQUARE_WIDTH_PX;
            var y = acre_y * broccoli.Camera.ACRE_HEIGHT_PX +
                    j * broccoli.Camera.SQUARE_HEIGHT_PX;
            var sprite = new lime.Sprite()
                    .setSize(broccoli.Camera.SQUARE_WIDTH_PX,
                             broccoli.Camera.SQUARE_HEIGHT_PX)
                    .setFill('#eee').setPosition(x, y).setStroke(1, '#000');
            this.appendChild(sprite);
        }
    }
};

broccoli.Camera.prototype.worldToPx = function(coord) {
    return new goog.math.Coordinate(
        coord.x * broccoli.Camera.SQUARE_WIDTH_PX,
        coord.y * broccoli.Camera.SQUARE_HEIGHT_PX);
};

// Measurements in squares (not pixels).
broccoli.Camera.MIN_X = -10;
broccoli.Camera.MAX_X = 10;
broccoli.Camera.MIN_Y = -5;
broccoli.Camera.MAX_Y = 5;
broccoli.Camera.WIDTH = broccoli.Camera.MAX_X - broccoli.Camera.MIN_X;
broccoli.Camera.HEIGHT = broccoli.Camera.MAX_Y - broccoli.Camera.MIN_Y;

broccoli.Camera.SQUARE_WIDTH_PX = 44;
broccoli.Camera.SQUARE_HEIGHT_PX = 44;

broccoli.Camera.ACRE_WIDTH_PX =
    broccoli.Acre.WIDTH * broccoli.Camera.SQUARE_WIDTH_PX;
broccoli.Camera.ACRE_HEIGHT_PX =
    broccoli.Acre.HEIGHT * broccoli.Camera.SQUARE_HEIGHT_PX;
