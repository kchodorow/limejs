goog.provide('broccoli.TokenRegistry');
goog.provide('broccoli.Token');

goog.require('goog.structs.Set');

broccoli.TokenRegistry = function() {
    this.registry_ = new goog.structs.Set();
};

broccoli.TokenRegistry.prototype.register = function(token) {
    this.registry_.add(token);
};

broccoli.TokenRegistry.prototype.tokens = function() {
    return this.registry_.getValues();
};

broccoli.Token = function() {
    this.position_ = new goog.math.Coordinate(0, 0);
    this.dirty_ = true;
};

broccoli.Token.prototype.set_dirty = function(dirty) {
    this.dirty_ = dirty;
};

broccoli.Token.prototype.dirty = function() {
    return this.dirty_;
};

// Position is measured in world coordinates.
broccoli.Token.prototype.set_position = function(pos) {
    this.position_ = pos;
    this.dirty_ = true;
};

broccoli.Token.prototype.position = function() {
    return this.position_;
};

broccoli.Token.prototype.sprite = function() {
    return this.sprite_;
};
