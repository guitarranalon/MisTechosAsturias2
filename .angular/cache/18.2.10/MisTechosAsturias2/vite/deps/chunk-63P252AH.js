import {
  ImageState_default
} from "./chunk-O4WNZANO.js";
import {
  IMAGE_DECODE
} from "./chunk-NUKIIKKO.js";
import {
  EventType_default,
  Target_default,
  listenOnce,
  unlistenByKey
} from "./chunk-5ORQIOU2.js";
import {
  abstract,
  getHeight
} from "./chunk-MN23FWKY.js";

// node_modules/ol/ImageBase.js
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
var ImageBase = (
  /** @class */
  function(_super) {
    __extends(ImageBase2, _super);
    function ImageBase2(extent, resolution, pixelRatio, state) {
      var _this = _super.call(this) || this;
      _this.extent = extent;
      _this.pixelRatio_ = pixelRatio;
      _this.resolution = resolution;
      _this.state = state;
      return _this;
    }
    ImageBase2.prototype.changed = function() {
      this.dispatchEvent(EventType_default.CHANGE);
    };
    ImageBase2.prototype.getExtent = function() {
      return this.extent;
    };
    ImageBase2.prototype.getImage = function() {
      return abstract();
    };
    ImageBase2.prototype.getPixelRatio = function() {
      return this.pixelRatio_;
    };
    ImageBase2.prototype.getResolution = function() {
      return (
        /** @type {number} */
        this.resolution
      );
    };
    ImageBase2.prototype.getState = function() {
      return this.state;
    };
    ImageBase2.prototype.load = function() {
      abstract();
    };
    return ImageBase2;
  }(Target_default)
);
var ImageBase_default = ImageBase;

// node_modules/ol/Image.js
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
var ImageWrapper = (
  /** @class */
  function(_super) {
    __extends2(ImageWrapper2, _super);
    function ImageWrapper2(extent, resolution, pixelRatio, src, crossOrigin, imageLoadFunction) {
      var _this = _super.call(this, extent, resolution, pixelRatio, ImageState_default.IDLE) || this;
      _this.src_ = src;
      _this.image_ = new Image();
      if (crossOrigin !== null) {
        _this.image_.crossOrigin = crossOrigin;
      }
      _this.unlisten_ = null;
      _this.state = ImageState_default.IDLE;
      _this.imageLoadFunction_ = imageLoadFunction;
      return _this;
    }
    ImageWrapper2.prototype.getImage = function() {
      return this.image_;
    };
    ImageWrapper2.prototype.handleImageError_ = function() {
      this.state = ImageState_default.ERROR;
      this.unlistenImage_();
      this.changed();
    };
    ImageWrapper2.prototype.handleImageLoad_ = function() {
      if (this.resolution === void 0) {
        this.resolution = getHeight(this.extent) / this.image_.height;
      }
      this.state = ImageState_default.LOADED;
      this.unlistenImage_();
      this.changed();
    };
    ImageWrapper2.prototype.load = function() {
      if (this.state == ImageState_default.IDLE || this.state == ImageState_default.ERROR) {
        this.state = ImageState_default.LOADING;
        this.changed();
        this.imageLoadFunction_(this, this.src_);
        this.unlisten_ = listenImage(this.image_, this.handleImageLoad_.bind(this), this.handleImageError_.bind(this));
      }
    };
    ImageWrapper2.prototype.setImage = function(image) {
      this.image_ = image;
    };
    ImageWrapper2.prototype.unlistenImage_ = function() {
      if (this.unlisten_) {
        this.unlisten_();
        this.unlisten_ = null;
      }
    };
    return ImageWrapper2;
  }(ImageBase_default)
);
function listenImage(image, loadHandler, errorHandler) {
  var img = (
    /** @type {HTMLImageElement} */
    image
  );
  if (img.src && IMAGE_DECODE) {
    var promise = img.decode();
    var listening_1 = true;
    var unlisten = function() {
      listening_1 = false;
    };
    promise.then(function() {
      if (listening_1) {
        loadHandler();
      }
    }).catch(function(error) {
      if (listening_1) {
        if (error.name === "EncodingError" && error.message === "Invalid image type.") {
          loadHandler();
        } else {
          errorHandler();
        }
      }
    });
    return unlisten;
  }
  var listenerKeys = [listenOnce(img, EventType_default.LOAD, loadHandler), listenOnce(img, EventType_default.ERROR, errorHandler)];
  return function unlisten2() {
    listenerKeys.forEach(unlistenByKey);
  };
}
var Image_default = ImageWrapper;

export {
  ImageBase_default,
  listenImage,
  Image_default
};
//# sourceMappingURL=chunk-63P252AH.js.map
