goog.provide('broccoli.Path');

broccoli.Path = function(start, end) {
    this.start_ = start;
    this.end_ = end;
    this.init_done_ = false;
    this.count_ = 0;
};

broccoli.Path.prototype.init_ = function() {
    this.init_done_ = true;
    var delta_x = this.start_.x - this.end_.x;
    var delta_y = this.start_.y - this.end_.y;
    if (this.start_.x < this.end_.x) {
        this.dir_x_ = 1;
    } else if (this.start_.x > this.end_.x) {
        this.dir_x_ = -1;
    } else {
        this.dir_x_ = 0;
    }
    if (this.start_.y < this.end_.y) {
        this.dir_y_ = 1;
    } else if (this.start_.y > this.end_.y) {
        this.dir_y_ = -1;
    } else {
        this.dir_y_ = 0;
    }
    this.error_ = 0;
    if (delta_x == 0) {
        this.delta_err_ = 0;
    } else {
        this.delta_err_ = Math.abs(delta_y / delta_x);
    }
    this.next_y_ = this.start_.y;
    this.next_x_ = this.start_.x;
};

broccoli.Path.prototype.distanceBound = function() {
    return Math.max(Math.abs(this.start_.x - this.end_.x),
                    Math.abs(this.start_.y - this.end_.y));
};

broccoli.Path.prototype.next = function() {
    this.count_++;
    if (!this.init_done_) {
        this.init_();
    }
    if (this.delta_err_ > 1 || this.dir_x_ == 0) {
        // delta(y) > delta(x)
        this.next_y_ += this.dir_y_;
        this.error_ = this.error_ + 1/this.delta_err_;
        if (this.error_ >= 0.5) {
            this.next_x_ = this.next_x_ + this.dir_x_;
            this.error_ = this.error_ - 1.0;
        }
    } else {
        // delta(x) > delta(y)
        this.next_x_ += this.dir_x_;
        this.error_ = this.error_ + this.delta_err_;
        if (this.error_ >= 0.5) {
            this.next_y_ = this.next_y_ + this.dir_y_;
            this.error_ = this.error_ - 1.0;
        }
    }

    return new goog.math.Coordinate(this.next_x_, this.next_y_);
};

broccoli.Path.prototype.done = function() {
    if (this.count_ > this.distanceBound()) {
        throw "Error! Path too long.";
    }
    if (!this.init_done_) {
        this.init_();
    }

    return this.next_x_ == this.end_.x && this.next_y_ == this.end_.y;
};
