goog.provide('broccoli.TokenRegistry');
goog.provide('broccoli.Token');

goog.require('goog.structs.QuadTree');
goog.require('goog.structs.Set');

broccoli.TokenRegistry = function() {
    this.registry_ = new goog.structs.Set();
    this.pos_ = new goog.structs.QuadTree(-10000, -10000, 10000, 10000);
};

broccoli.TokenRegistry.prototype.register = function(token) {
    this.registry_.add(token);
    var pos = token.position();
    this.pos_.set(pos.x, pos.y, token);
    token.set_position_callback_(goog.bind(this.move_token_, this));
};

broccoli.TokenRegistry.prototype.getTokenAt = function(pos) {
    return this.pos_.get(pos.x, pos.y);
};

broccoli.TokenRegistry.prototype.tokens = function() {
    return this.registry_.getValues();
};

broccoli.TokenRegistry.prototype.move_token_ = function(
    token, old_pos, new_pos) {
    this.pos_.remove(old_pos.x, old_pos.y);
    this.pos_.set(new_pos.x, new_pos.y, token);
};

broccoli.Token = function() {
    this.position_ = new goog.math.Coordinate(0, 0);
    this.dirty_ = true;
    this.position_cb_ = this.doNothing;
};

broccoli.Token.prototype.doNothing = function() {};

broccoli.Token.prototype.set_dirty = function(dirty) {
    this.dirty_ = dirty;
};

broccoli.Token.prototype.dirty = function() {
    return this.dirty_;
};

// Position is measured in world coordinates.
broccoli.Token.prototype.set_position = function(pos) {
    this.position_cb_.call(null, this, this.position_, pos);
    this.position_ = pos;
    this.dirty_ = true;
};

broccoli.Token.prototype.position = function() {
    return this.position_;
};

// Position is measured in world coordinates.
broccoli.Token.prototype.set_position_callback_ = function(cb) {
    this.position_cb_ = cb;
    this.position_cb_.call(null, this, this.position_, this.position_);
};

broccoli.Token.prototype.sprite = function() {
    return this.sprite_;
};
