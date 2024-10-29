import {
  clamp
} from "./chunk-5JPMEZLO.js";
import {
  assert
} from "./chunk-MN23FWKY.js";

// node_modules/ol/color.js
var HEX_COLOR_RE_ = /^#([a-f0-9]{3}|[a-f0-9]{4}(?:[a-f0-9]{2}){0,2})$/i;
var NAMED_COLOR_RE_ = /^([a-z]*)$|^hsla?\(.*\)$/i;
function asString(color) {
  if (typeof color === "string") {
    return color;
  } else {
    return toString(color);
  }
}
function fromNamed(color) {
  var el = document.createElement("div");
  el.style.color = color;
  if (el.style.color !== "") {
    document.body.appendChild(el);
    var rgb = getComputedStyle(el).color;
    document.body.removeChild(el);
    return rgb;
  } else {
    return "";
  }
}
var fromString = /* @__PURE__ */ function() {
  var MAX_CACHE_SIZE = 1024;
  var cache = {};
  var cacheSize = 0;
  return (
    /**
     * @param {string} s String.
     * @return {Color} Color.
     */
    function(s) {
      var color;
      if (cache.hasOwnProperty(s)) {
        color = cache[s];
      } else {
        if (cacheSize >= MAX_CACHE_SIZE) {
          var i = 0;
          for (var key in cache) {
            if ((i++ & 3) === 0) {
              delete cache[key];
              --cacheSize;
            }
          }
        }
        color = fromStringInternal_(s);
        cache[s] = color;
        ++cacheSize;
      }
      return color;
    }
  );
}();
function asArray(color) {
  if (Array.isArray(color)) {
    return color;
  } else {
    return fromString(color);
  }
}
function fromStringInternal_(s) {
  var r, g, b, a, color;
  if (NAMED_COLOR_RE_.exec(s)) {
    s = fromNamed(s);
  }
  if (HEX_COLOR_RE_.exec(s)) {
    var n = s.length - 1;
    var d = (
      // number of digits per channel
      void 0
    );
    if (n <= 4) {
      d = 1;
    } else {
      d = 2;
    }
    var hasAlpha = n === 4 || n === 8;
    r = parseInt(s.substr(1 + 0 * d, d), 16);
    g = parseInt(s.substr(1 + 1 * d, d), 16);
    b = parseInt(s.substr(1 + 2 * d, d), 16);
    if (hasAlpha) {
      a = parseInt(s.substr(1 + 3 * d, d), 16);
    } else {
      a = 255;
    }
    if (d == 1) {
      r = (r << 4) + r;
      g = (g << 4) + g;
      b = (b << 4) + b;
      if (hasAlpha) {
        a = (a << 4) + a;
      }
    }
    color = [r, g, b, a / 255];
  } else if (s.indexOf("rgba(") == 0) {
    color = s.slice(5, -1).split(",").map(Number);
    normalize(color);
  } else if (s.indexOf("rgb(") == 0) {
    color = s.slice(4, -1).split(",").map(Number);
    color.push(1);
    normalize(color);
  } else {
    assert(false, 14);
  }
  return color;
}
function normalize(color) {
  color[0] = clamp(color[0] + 0.5 | 0, 0, 255);
  color[1] = clamp(color[1] + 0.5 | 0, 0, 255);
  color[2] = clamp(color[2] + 0.5 | 0, 0, 255);
  color[3] = clamp(color[3], 0, 1);
  return color;
}
function toString(color) {
  var r = color[0];
  if (r != (r | 0)) {
    r = r + 0.5 | 0;
  }
  var g = color[1];
  if (g != (g | 0)) {
    g = g + 0.5 | 0;
  }
  var b = color[2];
  if (b != (b | 0)) {
    b = b + 0.5 | 0;
  }
  var a = color[3] === void 0 ? 1 : color[3];
  return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

// node_modules/ol/style/IconImageCache.js
var IconImageCache = (
  /** @class */
  function() {
    function IconImageCache2() {
      this.cache_ = {};
      this.cacheSize_ = 0;
      this.maxCacheSize_ = 32;
    }
    IconImageCache2.prototype.clear = function() {
      this.cache_ = {};
      this.cacheSize_ = 0;
    };
    IconImageCache2.prototype.canExpireCache = function() {
      return this.cacheSize_ > this.maxCacheSize_;
    };
    IconImageCache2.prototype.expire = function() {
      if (this.canExpireCache()) {
        var i = 0;
        for (var key in this.cache_) {
          var iconImage = this.cache_[key];
          if ((i++ & 3) === 0 && !iconImage.hasListener()) {
            delete this.cache_[key];
            --this.cacheSize_;
          }
        }
      }
    };
    IconImageCache2.prototype.get = function(src, crossOrigin, color) {
      var key = getKey(src, crossOrigin, color);
      return key in this.cache_ ? this.cache_[key] : null;
    };
    IconImageCache2.prototype.set = function(src, crossOrigin, color, iconImage) {
      var key = getKey(src, crossOrigin, color);
      this.cache_[key] = iconImage;
      ++this.cacheSize_;
    };
    IconImageCache2.prototype.setSize = function(maxCacheSize) {
      this.maxCacheSize_ = maxCacheSize;
      this.expire();
    };
    return IconImageCache2;
  }()
);
function getKey(src, crossOrigin, color) {
  var colorString = color ? asString(color) : "null";
  return crossOrigin + ":" + src + ":" + colorString;
}
var shared = new IconImageCache();

export {
  asString,
  asArray,
  toString,
  shared
};
//# sourceMappingURL=chunk-M73HJ6UG.js.map
