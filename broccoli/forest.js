goog.provide('broccoli.Forest');

goog.require('lib.Keyboard');
goog.require('lime.Scene');

goog.require('broccoli.Camera');
goog.require('broccoli.Enemy');
goog.require('broccoli.Map');
goog.require('broccoli.Path');
goog.require('broccoli.Player');
goog.require('broccoli.TokenRegistry');

broccoli.Forest = function() {
    goog.base(this);

    this.token_registry_ = new broccoli.TokenRegistry();
    var forest_ranger = new broccoli.ForestRanger(this.token_registry_);
    this.map_ = new broccoli.Map(forest_ranger);

    this.camera_ = new broccoli.Camera(this.map_, this.token_registry_);
    this.camera_.snapshot(0, 0);
    this.appendChild(this.camera_);

    this.player_ = new broccoli.Player();
    this.token_registry_.register(this.player_);

    // Handle input.
    this.keyboard_ = new lib.Keyboard(this);
    this.keyboard_.bindWasd(goog.bind(this.wasd, this));
    this.keyboard_.bindKeyDown(
        goog.events.KeyCodes.SPACE, goog.bind(this.rest, this));
};

goog.inherits(broccoli.Forest, lime.Scene);

broccoli.Forest.prototype.wasd = function(dir, event) {
    var pos = this.player_.position();
    var desired_pos = new goog.math.Coordinate(pos.x + dir.x, pos.y + dir.y);
    var token = this.token_registry_.getTokensAt(desired_pos);
    if (!token.empty()) {
        // Trying to run into a tree or something.
        return;
    }
    this.player_.set_position(desired_pos);
    this.runStep_(pos);
};

broccoli.Forest.prototype.rest = function(event) {
    this.runStep_(this.player_.position());
};

broccoli.Forest.prototype.runStep_ = function(pos) {
    var active_tokens = this.token_registry_.activeTokens();
    for (var i = 0; i < active_tokens.length; ++i) {
        // Check if player is nearby.
        if (this.canSeePlayer_(active_tokens[i])) {
            active_tokens[i].set_target(pos);
        }
        active_tokens[i].step();
    }
    this.camera_.snapshot(0, 0);
};

broccoli.Forest.prototype.canSeePlayer_ = function(enemy) {
    var player_pos = this.player_.position();
    var enemy_pos = enemy.position();

    var path = new broccoli.Path(enemy_pos, player_pos);
    if (path.distanceBound() > broccoli.Forest.VISIBILITY) {
        return false;
    }

    while (!path.done()) {
        var token_set = this.token_registry_.getTokensAt(path.next());
        if (!token_set.isSeethrough()) {
            return false;
        }
    }
    return true;
};

broccoli.Forest.VISIBILITY = 5;
