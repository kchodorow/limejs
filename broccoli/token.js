goog.provide('broccoli.TokenRegistry');
goog.provide('broccoli.Token');

goog.require('goog.structs.QuadTree');
goog.require('goog.structs.Set');

broccoli.TokenRegistry = function() {
    this.registry_ = new goog.structs.Set();
    this.active_registry_ = new goog.structs.Set();
    this.pos_ = new goog.structs.QuadTree(-10000, -10000, 10000, 10000);
};

broccoli.TokenRegistry.prototype.register = function(token) {
    this.registry_.add(token);
    if ('step' in token) {
        this.active_registry_.add(token);
    }
    this.registerTokenAtPos_(token, token.position());
    token.set_position_callback_(goog.bind(this.move_token_, this));
};

broccoli.TokenRegistry.prototype.registerTokenAtPos_ = function(token, pos) {
    var set = this.pos_.get(pos.x, pos.y);
    if (set == null) {
        this.pos_.set(pos.x, pos.y, new broccoli.TokenSet([token]));
    } else {
        set.add(token);
    }
};

broccoli.TokenRegistry.prototype.getTokensAt = function(pos) {
    var tokens = this.pos_.get(pos.x, pos.y);
    if (tokens == null) {
        return new broccoli.TokenSet([]);
    }
    return tokens;
};

broccoli.TokenRegistry.prototype.tokens = function() {
    return this.registry_.getValues();
};

broccoli.TokenRegistry.prototype.activeTokens = function() {
    return this.active_registry_.getValues();
};

broccoli.TokenRegistry.prototype.move_token_ = function(
    token, old_pos, new_pos) {
    var old_set = this.pos_.get(old_pos.x, old_pos.y);
    old_set.remove(token);
    this.registerTokenAtPos_(token, new_pos);
};

broccoli.Token = function() {
    this.position_ = new goog.math.Coordinate(0, 0);
    this.dirty_ = true;
    this.position_cb_ = this.doNothing;
    this.seethrough_ = true;
};

broccoli.Token.prototype.doNothing = function() {};

broccoli.Token.prototype.id = function() {
    return this.id_;
};

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

broccoli.Token.prototype.isSeethrough = function() {
    return this.seethrough_;
};

broccoli.Token.prototype.sprite = function() {
    return this.sprite_;
};

broccoli.TokenSet = function(token_arr) {
    this.token_ = token_arr;
};

broccoli.TokenSet.prototype.isSeethrough = function() {
    for (var i = 0; i < this.token_.length; ++i) {
        if (!this.token_[i].isSeethrough()) {
            return false;
        }
    }
    return true;
};

broccoli.TokenSet.prototype.add = function(token) {
    this.token_.push(token);
};

broccoli.TokenSet.prototype.empty = function(token) {
    return this.token_.length == 0;
};

broccoli.TokenSet.prototype.remove = function(token) {
    goog.array.remove(this.token_, token);
};
