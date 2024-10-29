import {
  State_default
} from "./chunk-LNJCZJZQ.js";
import {
  get
} from "./chunk-7ZC75XQY.js";
import {
  Object_default
} from "./chunk-5ORQIOU2.js";
import {
  abstract
} from "./chunk-MN23FWKY.js";

// node_modules/ol/source/Source.js
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
var Source = (
  /** @class */
  function(_super) {
    __extends(Source2, _super);
    function Source2(options) {
      var _this = _super.call(this) || this;
      _this.projection_ = get(options.projection);
      _this.attributions_ = adaptAttributions(options.attributions);
      _this.attributionsCollapsible_ = options.attributionsCollapsible !== void 0 ? options.attributionsCollapsible : true;
      _this.loading = false;
      _this.state_ = options.state !== void 0 ? options.state : State_default.READY;
      _this.wrapX_ = options.wrapX !== void 0 ? options.wrapX : false;
      return _this;
    }
    Source2.prototype.getAttributions = function() {
      return this.attributions_;
    };
    Source2.prototype.getAttributionsCollapsible = function() {
      return this.attributionsCollapsible_;
    };
    Source2.prototype.getProjection = function() {
      return this.projection_;
    };
    Source2.prototype.getResolutions = function() {
      return abstract();
    };
    Source2.prototype.getState = function() {
      return this.state_;
    };
    Source2.prototype.getWrapX = function() {
      return this.wrapX_;
    };
    Source2.prototype.getContextOptions = function() {
      return void 0;
    };
    Source2.prototype.refresh = function() {
      this.changed();
    };
    Source2.prototype.setAttributions = function(attributions) {
      this.attributions_ = adaptAttributions(attributions);
      this.changed();
    };
    Source2.prototype.setState = function(state) {
      this.state_ = state;
      this.changed();
    };
    return Source2;
  }(Object_default)
);
function adaptAttributions(attributionLike) {
  if (!attributionLike) {
    return null;
  }
  if (Array.isArray(attributionLike)) {
    return function(frameState) {
      return attributionLike;
    };
  }
  if (typeof attributionLike === "function") {
    return attributionLike;
  }
  return function(frameState) {
    return [attributionLike];
  };
}
var Source_default = Source;

export {
  Source_default
};
//# sourceMappingURL=chunk-KB323GAH.js.map
