goog.provide('broccoli.Enemy');

goog.require('lime.Sprite');

goog.require('broccoli.Path');
goog.require('broccoli.Token');

broccoli.Enemy = function() {
    goog.base(this);
    this.id_ = "enemy";
    this.sprite_ = new lime.Sprite().setSize(30, 30).setFill('#f00');
    this.health_ = 10;
};

goog.inherits(broccoli.Enemy, broccoli.Token);

broccoli.Enemy.create = function() {
    return new broccoli.Enemy();
};

broccoli.Enemy.prototype.step = function() {
    if (this.target_) {
        if (!this.path_.done()) {
            var next = this.path_.next();
            this.set_position(next);
        }
    } else {
        // Random walk.
        var dir_x = goog.math.randomInt(3) - 1;
        var dir_y = goog.math.randomInt(3) - 1;
        var pos = this.position();
        this.set_position(
            new goog.math.Coordinate(pos.x + dir_x, pos.y + dir_y));
    }
};

broccoli.Enemy.prototype.set_target = function(pos) {
    this.target_ = pos;
    this.path_ = new broccoli.Path(this.position(), pos);
};

broccoli.Enemy.prototype.changeHealth = function(amount) {
    this.health += amount;
    this.sprite_.setSize(20, 20);
};
