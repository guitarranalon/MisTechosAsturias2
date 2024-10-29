import {
  easeIn
} from "./chunk-EQJ7DEGW.js";
import {
  TileState_default
} from "./chunk-D4CEI2RF.js";
import {
  listenImage
} from "./chunk-63P252AH.js";
import {
  createCanvasContext2D
} from "./chunk-NUKIIKKO.js";
import {
  EventType_default,
  Target_default
} from "./chunk-5ORQIOU2.js";
import {
  abstract,
  assert
} from "./chunk-MN23FWKY.js";

// node_modules/ol/Tile.js
var __extends = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var Tile = (
  /** @class */
  function(_super) {
    __extends(Tile2, _super);
    function Tile2(tileCoord, state, opt_options) {
      var _this = _super.call(this) || this;
      var options = opt_options ? opt_options : {};
      _this.tileCoord = tileCoord;
      _this.state = state;
      _this.interimTile = null;
      _this.hifi = true;
      _this.key = "";
      _this.transition_ = options.transition === void 0 ? 250 : options.transition;
      _this.transitionStarts_ = {};
      return _this;
    }
    Tile2.prototype.changed = function() {
      this.dispatchEvent(EventType_default.CHANGE);
    };
    Tile2.prototype.release = function() {
    };
    Tile2.prototype.getKey = function() {
      return this.key + "/" + this.tileCoord;
    };
    Tile2.prototype.getInterimTile = function() {
      if (!this.interimTile) {
        return this;
      }
      var tile = this.interimTile;
      do {
        if (tile.getState() == TileState_default.LOADED) {
          this.transition_ = 0;
          return tile;
        }
        tile = tile.interimTile;
      } while (tile);
      return this;
    };
    Tile2.prototype.refreshInterimChain = function() {
      if (!this.interimTile) {
        return;
      }
      var tile = this.interimTile;
      var prev = (
        /** @type {Tile} */
        this
      );
      do {
        if (tile.getState() == TileState_default.LOADED) {
          tile.interimTile = null;
          break;
        } else if (tile.getState() == TileState_default.LOADING) {
          prev = tile;
        } else if (tile.getState() == TileState_default.IDLE) {
          prev.interimTile = tile.interimTile;
        } else {
          prev = tile;
        }
        tile = prev.interimTile;
      } while (tile);
    };
    Tile2.prototype.getTileCoord = function() {
      return this.tileCoord;
    };
    Tile2.prototype.getState = function() {
      return this.state;
    };
    Tile2.prototype.setState = function(state) {
      if (this.state !== TileState_default.ERROR && this.state > state) {
        throw new Error("Tile load sequence violation");
      }
      this.state = state;
      this.changed();
    };
    Tile2.prototype.load = function() {
      abstract();
    };
    Tile2.prototype.getAlpha = function(id, time) {
      if (!this.transition_) {
        return 1;
      }
      var start = this.transitionStarts_[id];
      if (!start) {
        start = time;
        this.transitionStarts_[id] = start;
      } else if (start === -1) {
        return 1;
      }
      var delta = time - start + 1e3 / 60;
      if (delta >= this.transition_) {
        return 1;
      }
      return easeIn(delta / this.transition_);
    };
    Tile2.prototype.inTransition = function(id) {
      if (!this.transition_) {
        return false;
      }
      return this.transitionStarts_[id] !== -1;
    };
    Tile2.prototype.endTransition = function(id) {
      if (this.transition_) {
        this.transitionStarts_[id] = -1;
      }
    };
    return Tile2;
  }(Target_default)
);
var Tile_default = Tile;

// node_modules/ol/ImageTile.js
var __extends2 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var ImageTile = (
  /** @class */
  function(_super) {
    __extends2(ImageTile2, _super);
    function ImageTile2(tileCoord, state, src, crossOrigin, tileLoadFunction, opt_options) {
      var _this = _super.call(this, tileCoord, state, opt_options) || this;
      _this.crossOrigin_ = crossOrigin;
      _this.src_ = src;
      _this.key = src;
      _this.image_ = new Image();
      if (crossOrigin !== null) {
        _this.image_.crossOrigin = crossOrigin;
      }
      _this.unlisten_ = null;
      _this.tileLoadFunction_ = tileLoadFunction;
      return _this;
    }
    ImageTile2.prototype.getImage = function() {
      return this.image_;
    };
    ImageTile2.prototype.handleImageError_ = function() {
      this.state = TileState_default.ERROR;
      this.unlistenImage_();
      this.image_ = getBlankImage();
      this.changed();
    };
    ImageTile2.prototype.handleImageLoad_ = function() {
      var image = (
        /** @type {HTMLImageElement} */
        this.image_
      );
      if (image.naturalWidth && image.naturalHeight) {
        this.state = TileState_default.LOADED;
      } else {
        this.state = TileState_default.EMPTY;
      }
      this.unlistenImage_();
      this.changed();
    };
    ImageTile2.prototype.load = function() {
      if (this.state == TileState_default.ERROR) {
        this.state = TileState_default.IDLE;
        this.image_ = new Image();
        if (this.crossOrigin_ !== null) {
          this.image_.crossOrigin = this.crossOrigin_;
        }
      }
      if (this.state == TileState_default.IDLE) {
        this.state = TileState_default.LOADING;
        this.changed();
        this.tileLoadFunction_(this, this.src_);
        this.unlisten_ = listenImage(this.image_, this.handleImageLoad_.bind(this), this.handleImageError_.bind(this));
      }
    };
    ImageTile2.prototype.unlistenImage_ = function() {
      if (this.unlisten_) {
        this.unlisten_();
        this.unlisten_ = null;
      }
    };
    return ImageTile2;
  }(Tile_default)
);
function getBlankImage() {
  var ctx = createCanvasContext2D(1, 1);
  ctx.fillStyle = "rgba(0,0,0,0)";
  ctx.fillRect(0, 0, 1, 1);
  return ctx.canvas;
}
var ImageTile_default = ImageTile;

// node_modules/ol/structs/LRUCache.js
var LRUCache = (
  /** @class */
  function() {
    function LRUCache2(opt_highWaterMark) {
      this.highWaterMark = opt_highWaterMark !== void 0 ? opt_highWaterMark : 2048;
      this.count_ = 0;
      this.entries_ = {};
      this.oldest_ = null;
      this.newest_ = null;
    }
    LRUCache2.prototype.canExpireCache = function() {
      return this.highWaterMark > 0 && this.getCount() > this.highWaterMark;
    };
    LRUCache2.prototype.clear = function() {
      this.count_ = 0;
      this.entries_ = {};
      this.oldest_ = null;
      this.newest_ = null;
    };
    LRUCache2.prototype.containsKey = function(key) {
      return this.entries_.hasOwnProperty(key);
    };
    LRUCache2.prototype.forEach = function(f) {
      var entry = this.oldest_;
      while (entry) {
        f(entry.value_, entry.key_, this);
        entry = entry.newer;
      }
    };
    LRUCache2.prototype.get = function(key, opt_options) {
      var entry = this.entries_[key];
      assert(entry !== void 0, 15);
      if (entry === this.newest_) {
        return entry.value_;
      } else if (entry === this.oldest_) {
        this.oldest_ = /** @type {Entry} */
        this.oldest_.newer;
        this.oldest_.older = null;
      } else {
        entry.newer.older = entry.older;
        entry.older.newer = entry.newer;
      }
      entry.newer = null;
      entry.older = this.newest_;
      this.newest_.newer = entry;
      this.newest_ = entry;
      return entry.value_;
    };
    LRUCache2.prototype.remove = function(key) {
      var entry = this.entries_[key];
      assert(entry !== void 0, 15);
      if (entry === this.newest_) {
        this.newest_ = /** @type {Entry} */
        entry.older;
        if (this.newest_) {
          this.newest_.newer = null;
        }
      } else if (entry === this.oldest_) {
        this.oldest_ = /** @type {Entry} */
        entry.newer;
        if (this.oldest_) {
          this.oldest_.older = null;
        }
      } else {
        entry.newer.older = entry.older;
        entry.older.newer = entry.newer;
      }
      delete this.entries_[key];
      --this.count_;
      return entry.value_;
    };
    LRUCache2.prototype.getCount = function() {
      return this.count_;
    };
    LRUCache2.prototype.getKeys = function() {
      var keys = new Array(this.count_);
      var i = 0;
      var entry;
      for (entry = this.newest_; entry; entry = entry.older) {
        keys[i++] = entry.key_;
      }
      return keys;
    };
    LRUCache2.prototype.getValues = function() {
      var values = new Array(this.count_);
      var i = 0;
      var entry;
      for (entry = this.newest_; entry; entry = entry.older) {
        values[i++] = entry.value_;
      }
      return values;
    };
    LRUCache2.prototype.peekLast = function() {
      return this.oldest_.value_;
    };
    LRUCache2.prototype.peekLastKey = function() {
      return this.oldest_.key_;
    };
    LRUCache2.prototype.peekFirstKey = function() {
      return this.newest_.key_;
    };
    LRUCache2.prototype.pop = function() {
      var entry = this.oldest_;
      delete this.entries_[entry.key_];
      if (entry.newer) {
        entry.newer.older = null;
      }
      this.oldest_ = /** @type {Entry} */
      entry.newer;
      if (!this.oldest_) {
        this.newest_ = null;
      }
      --this.count_;
      return entry.value_;
    };
    LRUCache2.prototype.replace = function(key, value) {
      this.get(key);
      this.entries_[key].value_ = value;
    };
    LRUCache2.prototype.set = function(key, value) {
      assert(!(key in this.entries_), 16);
      var entry = {
        key_: key,
        newer: null,
        older: this.newest_,
        value_: value
      };
      if (!this.newest_) {
        this.oldest_ = entry;
      } else {
        this.newest_.newer = entry;
      }
      this.newest_ = entry;
      this.entries_[key] = entry;
      ++this.count_;
    };
    LRUCache2.prototype.setSize = function(size) {
      this.highWaterMark = size;
    };
    return LRUCache2;
  }()
);
var LRUCache_default = LRUCache;

// node_modules/ol/tilecoord.js
function createOrUpdate(z, x, y, opt_tileCoord) {
  if (opt_tileCoord !== void 0) {
    opt_tileCoord[0] = z;
    opt_tileCoord[1] = x;
    opt_tileCoord[2] = y;
    return opt_tileCoord;
  } else {
    return [z, x, y];
  }
}
function getKeyZXY(z, x, y) {
  return z + "/" + x + "/" + y;
}
function getKey(tileCoord) {
  return getKeyZXY(tileCoord[0], tileCoord[1], tileCoord[2]);
}
function fromKey(key) {
  return key.split("/").map(Number);
}
function hash(tileCoord) {
  return (tileCoord[1] << tileCoord[0]) + tileCoord[2];
}
function withinExtentAndZ(tileCoord, tileGrid) {
  var z = tileCoord[0];
  var x = tileCoord[1];
  var y = tileCoord[2];
  if (tileGrid.getMinZoom() > z || z > tileGrid.getMaxZoom()) {
    return false;
  }
  var tileRange = tileGrid.getFullTileRange(z);
  if (!tileRange) {
    return true;
  } else {
    return tileRange.containsXY(x, y);
  }
}

// node_modules/ol/TileCache.js
var __extends3 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var TileCache = (
  /** @class */
  function(_super) {
    __extends3(TileCache2, _super);
    function TileCache2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    TileCache2.prototype.expireCache = function(usedTiles) {
      while (this.canExpireCache()) {
        var tile = this.peekLast();
        if (tile.getKey() in usedTiles) {
          break;
        } else {
          this.pop().release();
        }
      }
    };
    TileCache2.prototype.pruneExceptNewestZ = function() {
      if (this.getCount() === 0) {
        return;
      }
      var key = this.peekFirstKey();
      var tileCoord = fromKey(key);
      var z = tileCoord[0];
      this.forEach(function(tile) {
        if (tile.tileCoord[0] !== z) {
          this.remove(getKey(tile.tileCoord));
          tile.release();
        }
      }.bind(this));
    };
    return TileCache2;
  }(LRUCache_default)
);
var TileCache_default = TileCache;

export {
  Tile_default,
  ImageTile_default,
  createOrUpdate,
  getKeyZXY,
  getKey,
  hash,
  withinExtentAndZ,
  TileCache_default
};
//# sourceMappingURL=chunk-ZNRTZ7YK.js.map
