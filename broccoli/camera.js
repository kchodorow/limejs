goog.provide('broccoli.Camera');

goog.require('lime.Sprite');

goog.require('broccoli.Map');

broccoli.Camera = function() {
    lime.Sprite.call(this);

    this.map_ = new broccoli.Map();
    this.snapshot(0, 0);
};

goog.inherits(broccoli.Camera, lime.Sprite);

/**
 * @param{goog.math.Coordinate} coordinate
 */
broccoli.Camera.prototype.snapshot = function(x, y) {
    var acre_x = x / broccoli.Acre.WIDTH;
    var acre_y = y / broccoli.Acre.HEIGHT;

    for (var i = -1; i <= 1; ++i) {
        for (var j = -1; j <= 1; ++j) {
            var acre = this.map_.getAcre(acre_x + i, acre_y + j);
            this.drawAcre_(acre_x + i, acre_y + j, acre);
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
            this.appendChild(
                new lime.Sprite()
                    .setSize(broccoli.Camera.SQUARE_WIDTH_PX,
                             broccoli.Camera.SQUARE_HEIGHT_PX)
                    .setFill('#eee').setPosition(x, y).setStroke(1, '#000'));
        }
    }
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
