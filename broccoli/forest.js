goog.provide('broccoli.Forest');

goog.require('lib.Keyboard');
goog.require('lime.Scene');

goog.require('broccoli.Camera');
goog.require('broccoli.Enemy');
goog.require('broccoli.Map');
goog.require('broccoli.Player');
goog.require('broccoli.TokenRegistry');

broccoli.Forest = function() {
    goog.base(this);

    this.token_registry_ = new broccoli.TokenRegistry();
    var forest_ranger = new broccoli.ForestRanger(this.token_registry_);
    this.map_ = new broccoli.Map(forest_ranger);

    this.player_ = new broccoli.Player();
    this.token_registry_.register(this.player_);
    var kInitialEnemies = 10;
    this.enemy_ = new Array(kInitialEnemies);
    for (var i = 0; i < kInitialEnemies; ++i) {
        this.enemy_[i] = new broccoli.Enemy();
        this.token_registry_.register(this.enemy_[i]);
    }

    this.camera_ = new broccoli.Camera(this.map_, this.token_registry_);
    this.camera_.snapshot(0, 0);
    this.appendChild(this.camera_);

    // Handle input.
    this.keyboard_ = new lib.Keyboard(this);
    this.keyboard_.bindWasd(goog.bind(this.wasd, this));
};

goog.inherits(broccoli.Forest, lime.Scene);

broccoli.Forest.prototype.wasd = function(dir, event) {
    var pos = this.player_.position();
    var desired_pos = new goog.math.Coordinate(pos.x + dir.x, pos.y + dir.y);
    if (!this.canMoveTo_(desired_pos)) {
        // Trying to run into a tree or something.
        return;
    }

    this.player_.set_position(desired_pos);
    for (var i = 0; i < this.enemy_.length; ++i) {
        this.enemy_[i].step();
    }
    this.camera_.snapshot(0, 0);
};

broccoli.Forest.prototype.canMoveTo_ = function(pos) {
    return this.token_registry_.getTokenAt(pos) == null;
};
