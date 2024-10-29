import {
  listenImage
} from "./chunk-63P252AH.js";
import {
  IconAnchorUnits_default
} from "./chunk-MNGUBNU3.js";
import {
  asArray,
  asString,
  shared,
  toString
} from "./chunk-M73HJ6UG.js";
import {
  toSize
} from "./chunk-OKB4YAGZ.js";
import {
  ImageState_default
} from "./chunk-O4WNZANO.js";
import {
  defaultFillStyle,
  defaultLineCap,
  defaultLineJoin,
  defaultLineWidth,
  defaultMiterLimit,
  defaultStrokeStyle
} from "./chunk-67PVPDW7.js";
import {
  createCanvasContext2D
} from "./chunk-NUKIIKKO.js";
import {
  GeometryType_default
} from "./chunk-5JPMEZLO.js";
import {
  EventType_default,
  Target_default
} from "./chunk-5ORQIOU2.js";
import {
  abstract,
  assert,
  getUid
} from "./chunk-MN23FWKY.js";

// node_modules/ol/style/Image.js
var ImageStyle = (
  /** @class */
  function() {
    function ImageStyle2(options) {
      this.opacity_ = options.opacity;
      this.rotateWithView_ = options.rotateWithView;
      this.rotation_ = options.rotation;
      this.scale_ = options.scale;
      this.scaleArray_ = toSize(options.scale);
      this.displacement_ = options.displacement;
    }
    ImageStyle2.prototype.clone = function() {
      var scale = this.getScale();
      return new ImageStyle2({
        opacity: this.getOpacity(),
        scale: Array.isArray(scale) ? scale.slice() : scale,
        rotation: this.getRotation(),
        rotateWithView: this.getRotateWithView(),
        displacement: this.getDisplacement().slice()
      });
    };
    ImageStyle2.prototype.getOpacity = function() {
      return this.opacity_;
    };
    ImageStyle2.prototype.getRotateWithView = function() {
      return this.rotateWithView_;
    };
    ImageStyle2.prototype.getRotation = function() {
      return this.rotation_;
    };
    ImageStyle2.prototype.getScale = function() {
      return this.scale_;
    };
    ImageStyle2.prototype.getScaleArray = function() {
      return this.scaleArray_;
    };
    ImageStyle2.prototype.getDisplacement = function() {
      return this.displacement_;
    };
    ImageStyle2.prototype.getAnchor = function() {
      return abstract();
    };
    ImageStyle2.prototype.getImage = function(pixelRatio) {
      return abstract();
    };
    ImageStyle2.prototype.getHitDetectionImage = function() {
      return abstract();
    };
    ImageStyle2.prototype.getPixelRatio = function(pixelRatio) {
      return 1;
    };
    ImageStyle2.prototype.getImageState = function() {
      return abstract();
    };
    ImageStyle2.prototype.getImageSize = function() {
      return abstract();
    };
    ImageStyle2.prototype.getHitDetectionImageSize = function() {
      return abstract();
    };
    ImageStyle2.prototype.getOrigin = function() {
      return abstract();
    };
    ImageStyle2.prototype.getSize = function() {
      return abstract();
    };
    ImageStyle2.prototype.setOpacity = function(opacity) {
      this.opacity_ = opacity;
    };
    ImageStyle2.prototype.setRotateWithView = function(rotateWithView) {
      this.rotateWithView_ = rotateWithView;
    };
    ImageStyle2.prototype.setRotation = function(rotation) {
      this.rotation_ = rotation;
    };
    ImageStyle2.prototype.setScale = function(scale) {
      this.scale_ = scale;
      this.scaleArray_ = toSize(scale);
    };
    ImageStyle2.prototype.listenImageChange = function(listener) {
      abstract();
    };
    ImageStyle2.prototype.load = function() {
      abstract();
    };
    ImageStyle2.prototype.unlistenImageChange = function(listener) {
      abstract();
    };
    return ImageStyle2;
  }()
);
var Image_default = ImageStyle;

// node_modules/ol/colorlike.js
function asColorLike(color) {
  if (Array.isArray(color)) {
    return toString(color);
  } else {
    return color;
  }
}

// node_modules/ol/style/RegularShape.js
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
var RegularShape = (
  /** @class */
  function(_super) {
    __extends(RegularShape2, _super);
    function RegularShape2(options) {
      var _this = this;
      var rotateWithView = options.rotateWithView !== void 0 ? options.rotateWithView : false;
      _this = _super.call(this, {
        opacity: 1,
        rotateWithView,
        rotation: options.rotation !== void 0 ? options.rotation : 0,
        scale: options.scale !== void 0 ? options.scale : 1,
        displacement: options.displacement !== void 0 ? options.displacement : [0, 0]
      }) || this;
      _this.canvas_ = {};
      _this.hitDetectionCanvas_ = null;
      _this.fill_ = options.fill !== void 0 ? options.fill : null;
      _this.origin_ = [0, 0];
      _this.points_ = options.points;
      _this.radius_ = options.radius !== void 0 ? options.radius : options.radius1;
      _this.radius2_ = options.radius2;
      _this.angle_ = options.angle !== void 0 ? options.angle : 0;
      _this.stroke_ = options.stroke !== void 0 ? options.stroke : null;
      _this.anchor_ = null;
      _this.size_ = null;
      _this.imageSize_ = null;
      _this.hitDetectionImageSize_ = null;
      _this.render();
      return _this;
    }
    RegularShape2.prototype.clone = function() {
      var scale = this.getScale();
      var style = new RegularShape2({
        fill: this.getFill() ? this.getFill().clone() : void 0,
        points: this.getPoints(),
        radius: this.getRadius(),
        radius2: this.getRadius2(),
        angle: this.getAngle(),
        stroke: this.getStroke() ? this.getStroke().clone() : void 0,
        rotation: this.getRotation(),
        rotateWithView: this.getRotateWithView(),
        scale: Array.isArray(scale) ? scale.slice() : scale,
        displacement: this.getDisplacement().slice()
      });
      style.setOpacity(this.getOpacity());
      return style;
    };
    RegularShape2.prototype.getAnchor = function() {
      return this.anchor_;
    };
    RegularShape2.prototype.getAngle = function() {
      return this.angle_;
    };
    RegularShape2.prototype.getFill = function() {
      return this.fill_;
    };
    RegularShape2.prototype.getHitDetectionImage = function() {
      if (!this.hitDetectionCanvas_) {
        var renderOptions = this.createRenderOptions();
        this.createHitDetectionCanvas_(renderOptions);
      }
      return this.hitDetectionCanvas_;
    };
    RegularShape2.prototype.getImage = function(pixelRatio) {
      if (!this.canvas_[pixelRatio || 1]) {
        var renderOptions = this.createRenderOptions();
        var context = createCanvasContext2D(renderOptions.size * pixelRatio || 1, renderOptions.size * pixelRatio || 1);
        this.draw_(renderOptions, context, 0, 0, pixelRatio || 1);
        this.canvas_[pixelRatio || 1] = context.canvas;
      }
      return this.canvas_[pixelRatio || 1];
    };
    RegularShape2.prototype.getPixelRatio = function(pixelRatio) {
      return pixelRatio;
    };
    RegularShape2.prototype.getImageSize = function() {
      return this.imageSize_;
    };
    RegularShape2.prototype.getHitDetectionImageSize = function() {
      return this.hitDetectionImageSize_;
    };
    RegularShape2.prototype.getImageState = function() {
      return ImageState_default.LOADED;
    };
    RegularShape2.prototype.getOrigin = function() {
      return this.origin_;
    };
    RegularShape2.prototype.getPoints = function() {
      return this.points_;
    };
    RegularShape2.prototype.getRadius = function() {
      return this.radius_;
    };
    RegularShape2.prototype.getRadius2 = function() {
      return this.radius2_;
    };
    RegularShape2.prototype.getSize = function() {
      return this.size_;
    };
    RegularShape2.prototype.getStroke = function() {
      return this.stroke_;
    };
    RegularShape2.prototype.listenImageChange = function(listener) {
    };
    RegularShape2.prototype.load = function() {
    };
    RegularShape2.prototype.unlistenImageChange = function(listener) {
    };
    RegularShape2.prototype.createRenderOptions = function() {
      var lineCap = defaultLineCap;
      var lineJoin = defaultLineJoin;
      var miterLimit = 0;
      var lineDash = null;
      var lineDashOffset = 0;
      var strokeStyle;
      var strokeWidth = 0;
      if (this.stroke_) {
        strokeStyle = this.stroke_.getColor();
        if (strokeStyle === null) {
          strokeStyle = defaultStrokeStyle;
        }
        strokeStyle = asColorLike(strokeStyle);
        strokeWidth = this.stroke_.getWidth();
        if (strokeWidth === void 0) {
          strokeWidth = defaultLineWidth;
        }
        lineDash = this.stroke_.getLineDash();
        lineDashOffset = this.stroke_.getLineDashOffset();
        lineJoin = this.stroke_.getLineJoin();
        if (lineJoin === void 0) {
          lineJoin = defaultLineJoin;
        }
        lineCap = this.stroke_.getLineCap();
        if (lineCap === void 0) {
          lineCap = defaultLineCap;
        }
        miterLimit = this.stroke_.getMiterLimit();
        if (miterLimit === void 0) {
          miterLimit = defaultMiterLimit;
        }
      }
      var size = 2 * (this.radius_ + strokeWidth) + 1;
      return {
        strokeStyle,
        strokeWidth,
        size,
        lineCap,
        lineDash,
        lineDashOffset,
        lineJoin,
        miterLimit
      };
    };
    RegularShape2.prototype.render = function() {
      var renderOptions = this.createRenderOptions();
      var context = createCanvasContext2D(renderOptions.size, renderOptions.size);
      this.draw_(renderOptions, context, 0, 0, 1);
      this.canvas_ = {};
      this.canvas_[1] = context.canvas;
      var size = context.canvas.width;
      var imageSize = size;
      var displacement = this.getDisplacement();
      this.hitDetectionImageSize_ = [renderOptions.size, renderOptions.size];
      this.createHitDetectionCanvas_(renderOptions);
      this.anchor_ = [size / 2 - displacement[0], size / 2 + displacement[1]];
      this.size_ = [size, size];
      this.imageSize_ = [imageSize, imageSize];
    };
    RegularShape2.prototype.draw_ = function(renderOptions, context, x, y, pixelRatio) {
      var i, angle0, radiusC;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.translate(x, y);
      context.beginPath();
      var points = this.points_;
      if (points === Infinity) {
        context.arc(renderOptions.size / 2, renderOptions.size / 2, this.radius_, 0, 2 * Math.PI, true);
      } else {
        var radius2 = this.radius2_ !== void 0 ? this.radius2_ : this.radius_;
        if (radius2 !== this.radius_) {
          points = 2 * points;
        }
        for (i = 0; i <= points; i++) {
          angle0 = i * 2 * Math.PI / points - Math.PI / 2 + this.angle_;
          radiusC = i % 2 === 0 ? this.radius_ : radius2;
          context.lineTo(renderOptions.size / 2 + radiusC * Math.cos(angle0), renderOptions.size / 2 + radiusC * Math.sin(angle0));
        }
      }
      if (this.fill_) {
        var color = this.fill_.getColor();
        if (color === null) {
          color = defaultFillStyle;
        }
        context.fillStyle = asColorLike(color);
        context.fill();
      }
      if (this.stroke_) {
        context.strokeStyle = renderOptions.strokeStyle;
        context.lineWidth = renderOptions.strokeWidth;
        if (context.setLineDash && renderOptions.lineDash) {
          context.setLineDash(renderOptions.lineDash);
          context.lineDashOffset = renderOptions.lineDashOffset;
        }
        context.lineCap = renderOptions.lineCap;
        context.lineJoin = renderOptions.lineJoin;
        context.miterLimit = renderOptions.miterLimit;
        context.stroke();
      }
      context.closePath();
    };
    RegularShape2.prototype.createHitDetectionCanvas_ = function(renderOptions) {
      this.hitDetectionCanvas_ = this.getImage(1);
      if (this.fill_) {
        var color = this.fill_.getColor();
        var opacity = 0;
        if (typeof color === "string") {
          color = asArray(color);
        }
        if (color === null) {
          opacity = 1;
        } else if (Array.isArray(color)) {
          opacity = color.length === 4 ? color[3] : 1;
        }
        if (opacity === 0) {
          var context = createCanvasContext2D(renderOptions.size, renderOptions.size);
          this.hitDetectionCanvas_ = context.canvas;
          this.drawHitDetectionCanvas_(renderOptions, context, 0, 0);
        }
      }
    };
    RegularShape2.prototype.drawHitDetectionCanvas_ = function(renderOptions, context, x, y) {
      context.translate(x, y);
      context.beginPath();
      var points = this.points_;
      if (points === Infinity) {
        context.arc(renderOptions.size / 2, renderOptions.size / 2, this.radius_, 0, 2 * Math.PI, true);
      } else {
        var radius2 = this.radius2_ !== void 0 ? this.radius2_ : this.radius_;
        if (radius2 !== this.radius_) {
          points = 2 * points;
        }
        var i = void 0, radiusC = void 0, angle0 = void 0;
        for (i = 0; i <= points; i++) {
          angle0 = i * 2 * Math.PI / points - Math.PI / 2 + this.angle_;
          radiusC = i % 2 === 0 ? this.radius_ : radius2;
          context.lineTo(renderOptions.size / 2 + radiusC * Math.cos(angle0), renderOptions.size / 2 + radiusC * Math.sin(angle0));
        }
      }
      context.fillStyle = defaultFillStyle;
      context.fill();
      if (this.stroke_) {
        context.strokeStyle = renderOptions.strokeStyle;
        context.lineWidth = renderOptions.strokeWidth;
        if (renderOptions.lineDash) {
          context.setLineDash(renderOptions.lineDash);
          context.lineDashOffset = renderOptions.lineDashOffset;
        }
        context.stroke();
      }
      context.closePath();
    };
    return RegularShape2;
  }(Image_default)
);
var RegularShape_default = RegularShape;

// node_modules/ol/style/Circle.js
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
var CircleStyle = (
  /** @class */
  function(_super) {
    __extends2(CircleStyle2, _super);
    function CircleStyle2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      _this = _super.call(this, {
        points: Infinity,
        fill: options.fill,
        radius: options.radius,
        stroke: options.stroke,
        scale: options.scale !== void 0 ? options.scale : 1,
        rotation: options.rotation !== void 0 ? options.rotation : 0,
        rotateWithView: options.rotateWithView !== void 0 ? options.rotateWithView : false,
        displacement: options.displacement !== void 0 ? options.displacement : [0, 0]
      }) || this;
      return _this;
    }
    CircleStyle2.prototype.clone = function() {
      var scale = this.getScale();
      var style = new CircleStyle2({
        fill: this.getFill() ? this.getFill().clone() : void 0,
        stroke: this.getStroke() ? this.getStroke().clone() : void 0,
        radius: this.getRadius(),
        scale: Array.isArray(scale) ? scale.slice() : scale,
        rotation: this.getRotation(),
        rotateWithView: this.getRotateWithView(),
        displacement: this.getDisplacement().slice()
      });
      style.setOpacity(this.getOpacity());
      return style;
    };
    CircleStyle2.prototype.setRadius = function(radius) {
      this.radius_ = radius;
      this.render();
    };
    return CircleStyle2;
  }(RegularShape_default)
);
var Circle_default = CircleStyle;

// node_modules/ol/style/Fill.js
var Fill = (
  /** @class */
  function() {
    function Fill2(opt_options) {
      var options = opt_options || {};
      this.color_ = options.color !== void 0 ? options.color : null;
    }
    Fill2.prototype.clone = function() {
      var color = this.getColor();
      return new Fill2({
        color: Array.isArray(color) ? color.slice() : color || void 0
      });
    };
    Fill2.prototype.getColor = function() {
      return this.color_;
    };
    Fill2.prototype.setColor = function(color) {
      this.color_ = color;
    };
    return Fill2;
  }()
);
var Fill_default = Fill;

// node_modules/ol/style/IconOrigin.js
var IconOrigin_default = {
  /**
   * Origin is at bottom left
   * @api
   */
  BOTTOM_LEFT: "bottom-left",
  /**
   * Origin is at bottom right
   * @api
   */
  BOTTOM_RIGHT: "bottom-right",
  /**
   * Origin is at top left
   * @api
   */
  TOP_LEFT: "top-left",
  /**
   * Origin is at top right
   * @api
   */
  TOP_RIGHT: "top-right"
};

// node_modules/ol/style/IconImage.js
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
var taintedTestContext = null;
var IconImage = (
  /** @class */
  function(_super) {
    __extends3(IconImage2, _super);
    function IconImage2(image, src, size, crossOrigin, imageState, color) {
      var _this = _super.call(this) || this;
      _this.hitDetectionImage_ = null;
      _this.image_ = !image ? new Image() : image;
      if (crossOrigin !== null) {
        _this.image_.crossOrigin = crossOrigin;
      }
      _this.canvas_ = {};
      _this.color_ = color;
      _this.unlisten_ = null;
      _this.imageState_ = imageState;
      _this.size_ = size;
      _this.src_ = src;
      _this.tainted_;
      return _this;
    }
    IconImage2.prototype.isTainted_ = function() {
      if (this.tainted_ === void 0 && this.imageState_ === ImageState_default.LOADED) {
        if (!taintedTestContext) {
          taintedTestContext = createCanvasContext2D(1, 1);
        }
        taintedTestContext.drawImage(this.image_, 0, 0);
        try {
          taintedTestContext.getImageData(0, 0, 1, 1);
          this.tainted_ = false;
        } catch (e) {
          taintedTestContext = null;
          this.tainted_ = true;
        }
      }
      return this.tainted_ === true;
    };
    IconImage2.prototype.dispatchChangeEvent_ = function() {
      this.dispatchEvent(EventType_default.CHANGE);
    };
    IconImage2.prototype.handleImageError_ = function() {
      this.imageState_ = ImageState_default.ERROR;
      this.unlistenImage_();
      this.dispatchChangeEvent_();
    };
    IconImage2.prototype.handleImageLoad_ = function() {
      this.imageState_ = ImageState_default.LOADED;
      if (this.size_) {
        this.image_.width = this.size_[0];
        this.image_.height = this.size_[1];
      } else {
        this.size_ = [this.image_.width, this.image_.height];
      }
      this.unlistenImage_();
      this.dispatchChangeEvent_();
    };
    IconImage2.prototype.getImage = function(pixelRatio) {
      this.replaceColor_(pixelRatio);
      return this.canvas_[pixelRatio] ? this.canvas_[pixelRatio] : this.image_;
    };
    IconImage2.prototype.getPixelRatio = function(pixelRatio) {
      this.replaceColor_(pixelRatio);
      return this.canvas_[pixelRatio] ? pixelRatio : 1;
    };
    IconImage2.prototype.getImageState = function() {
      return this.imageState_;
    };
    IconImage2.prototype.getHitDetectionImage = function() {
      if (!this.hitDetectionImage_) {
        if (this.isTainted_()) {
          var width = this.size_[0];
          var height = this.size_[1];
          var context = createCanvasContext2D(width, height);
          context.fillRect(0, 0, width, height);
          this.hitDetectionImage_ = context.canvas;
        } else {
          this.hitDetectionImage_ = this.image_;
        }
      }
      return this.hitDetectionImage_;
    };
    IconImage2.prototype.getSize = function() {
      return this.size_;
    };
    IconImage2.prototype.getSrc = function() {
      return this.src_;
    };
    IconImage2.prototype.load = function() {
      if (this.imageState_ == ImageState_default.IDLE) {
        this.imageState_ = ImageState_default.LOADING;
        try {
          this.image_.src = this.src_;
        } catch (e) {
          this.handleImageError_();
        }
        this.unlisten_ = listenImage(this.image_, this.handleImageLoad_.bind(this), this.handleImageError_.bind(this));
      }
    };
    IconImage2.prototype.replaceColor_ = function(pixelRatio) {
      if (!this.color_ || this.canvas_[pixelRatio]) {
        return;
      }
      var canvas = document.createElement("canvas");
      this.canvas_[pixelRatio] = canvas;
      canvas.width = Math.ceil(this.image_.width * pixelRatio);
      canvas.height = Math.ceil(this.image_.height * pixelRatio);
      var ctx = canvas.getContext("2d");
      ctx.scale(pixelRatio, pixelRatio);
      ctx.drawImage(this.image_, 0, 0);
      ctx.globalCompositeOperation = "multiply";
      if (ctx.globalCompositeOperation === "multiply" || this.isTainted_()) {
        ctx.fillStyle = asString(this.color_);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "destination-in";
        ctx.drawImage(this.image_, 0, 0);
      } else {
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imgData.data;
        var r = this.color_[0] / 255;
        var g = this.color_[1] / 255;
        var b = this.color_[2] / 255;
        var a = this.color_[3];
        for (var i = 0, ii = data.length; i < ii; i += 4) {
          data[i] *= r;
          data[i + 1] *= g;
          data[i + 2] *= b;
          data[i + 3] *= a;
        }
        ctx.putImageData(imgData, 0, 0);
      }
    };
    IconImage2.prototype.unlistenImage_ = function() {
      if (this.unlisten_) {
        this.unlisten_();
        this.unlisten_ = null;
      }
    };
    return IconImage2;
  }(Target_default)
);
function get(image, src, size, crossOrigin, imageState, color) {
  var iconImage = shared.get(src, crossOrigin, color);
  if (!iconImage) {
    iconImage = new IconImage(image, src, size, crossOrigin, imageState, color);
    shared.set(src, crossOrigin, color, iconImage);
  }
  return iconImage;
}
var IconImage_default = IconImage;

// node_modules/ol/style/Icon.js
var __extends4 = /* @__PURE__ */ function() {
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
var Icon = (
  /** @class */
  function(_super) {
    __extends4(Icon2, _super);
    function Icon2(opt_options) {
      var _this = this;
      var options = opt_options || {};
      var opacity = options.opacity !== void 0 ? options.opacity : 1;
      var rotation = options.rotation !== void 0 ? options.rotation : 0;
      var scale = options.scale !== void 0 ? options.scale : 1;
      var rotateWithView = options.rotateWithView !== void 0 ? options.rotateWithView : false;
      _this = _super.call(this, {
        opacity,
        rotation,
        scale,
        displacement: options.displacement !== void 0 ? options.displacement : [0, 0],
        rotateWithView
      }) || this;
      _this.anchor_ = options.anchor !== void 0 ? options.anchor : [0.5, 0.5];
      _this.normalizedAnchor_ = null;
      _this.anchorOrigin_ = options.anchorOrigin !== void 0 ? options.anchorOrigin : IconOrigin_default.TOP_LEFT;
      _this.anchorXUnits_ = options.anchorXUnits !== void 0 ? options.anchorXUnits : IconAnchorUnits_default.FRACTION;
      _this.anchorYUnits_ = options.anchorYUnits !== void 0 ? options.anchorYUnits : IconAnchorUnits_default.FRACTION;
      _this.crossOrigin_ = options.crossOrigin !== void 0 ? options.crossOrigin : null;
      var image = options.img !== void 0 ? options.img : null;
      var imgSize = options.imgSize !== void 0 ? options.imgSize : null;
      var src = options.src;
      assert(!(src !== void 0 && image), 4);
      assert(!image || image && imgSize, 5);
      if ((src === void 0 || src.length === 0) && image) {
        src = /** @type {HTMLImageElement} */
        image.src || getUid(image);
      }
      assert(src !== void 0 && src.length > 0, 6);
      var imageState = options.src !== void 0 ? ImageState_default.IDLE : ImageState_default.LOADED;
      _this.color_ = options.color !== void 0 ? asArray(options.color) : null;
      _this.iconImage_ = get(
        image,
        /** @type {string} */
        src,
        imgSize,
        _this.crossOrigin_,
        imageState,
        _this.color_
      );
      _this.offset_ = options.offset !== void 0 ? options.offset : [0, 0];
      _this.offsetOrigin_ = options.offsetOrigin !== void 0 ? options.offsetOrigin : IconOrigin_default.TOP_LEFT;
      _this.origin_ = null;
      _this.size_ = options.size !== void 0 ? options.size : null;
      return _this;
    }
    Icon2.prototype.clone = function() {
      var scale = this.getScale();
      return new Icon2({
        anchor: this.anchor_.slice(),
        anchorOrigin: this.anchorOrigin_,
        anchorXUnits: this.anchorXUnits_,
        anchorYUnits: this.anchorYUnits_,
        crossOrigin: this.crossOrigin_,
        color: this.color_ && this.color_.slice ? this.color_.slice() : this.color_ || void 0,
        src: this.getSrc(),
        offset: this.offset_.slice(),
        offsetOrigin: this.offsetOrigin_,
        size: this.size_ !== null ? this.size_.slice() : void 0,
        opacity: this.getOpacity(),
        scale: Array.isArray(scale) ? scale.slice() : scale,
        rotation: this.getRotation(),
        rotateWithView: this.getRotateWithView()
      });
    };
    Icon2.prototype.getAnchor = function() {
      if (this.normalizedAnchor_) {
        return this.normalizedAnchor_;
      }
      var anchor = this.anchor_;
      var size = this.getSize();
      if (this.anchorXUnits_ == IconAnchorUnits_default.FRACTION || this.anchorYUnits_ == IconAnchorUnits_default.FRACTION) {
        if (!size) {
          return null;
        }
        anchor = this.anchor_.slice();
        if (this.anchorXUnits_ == IconAnchorUnits_default.FRACTION) {
          anchor[0] *= size[0];
        }
        if (this.anchorYUnits_ == IconAnchorUnits_default.FRACTION) {
          anchor[1] *= size[1];
        }
      }
      if (this.anchorOrigin_ != IconOrigin_default.TOP_LEFT) {
        if (!size) {
          return null;
        }
        if (anchor === this.anchor_) {
          anchor = this.anchor_.slice();
        }
        if (this.anchorOrigin_ == IconOrigin_default.TOP_RIGHT || this.anchorOrigin_ == IconOrigin_default.BOTTOM_RIGHT) {
          anchor[0] = -anchor[0] + size[0];
        }
        if (this.anchorOrigin_ == IconOrigin_default.BOTTOM_LEFT || this.anchorOrigin_ == IconOrigin_default.BOTTOM_RIGHT) {
          anchor[1] = -anchor[1] + size[1];
        }
      }
      this.normalizedAnchor_ = anchor;
      return this.normalizedAnchor_;
    };
    Icon2.prototype.setAnchor = function(anchor) {
      this.anchor_ = anchor;
      this.normalizedAnchor_ = null;
    };
    Icon2.prototype.getColor = function() {
      return this.color_;
    };
    Icon2.prototype.getImage = function(pixelRatio) {
      return this.iconImage_.getImage(pixelRatio);
    };
    Icon2.prototype.getPixelRatio = function(pixelRatio) {
      return this.iconImage_.getPixelRatio(pixelRatio);
    };
    Icon2.prototype.getImageSize = function() {
      return this.iconImage_.getSize();
    };
    Icon2.prototype.getHitDetectionImageSize = function() {
      return this.getImageSize();
    };
    Icon2.prototype.getImageState = function() {
      return this.iconImage_.getImageState();
    };
    Icon2.prototype.getHitDetectionImage = function() {
      return this.iconImage_.getHitDetectionImage();
    };
    Icon2.prototype.getOrigin = function() {
      if (this.origin_) {
        return this.origin_;
      }
      var offset = this.offset_;
      var displacement = this.getDisplacement();
      if (this.offsetOrigin_ != IconOrigin_default.TOP_LEFT) {
        var size = this.getSize();
        var iconImageSize = this.iconImage_.getSize();
        if (!size || !iconImageSize) {
          return null;
        }
        offset = offset.slice();
        if (this.offsetOrigin_ == IconOrigin_default.TOP_RIGHT || this.offsetOrigin_ == IconOrigin_default.BOTTOM_RIGHT) {
          offset[0] = iconImageSize[0] - size[0] - offset[0];
        }
        if (this.offsetOrigin_ == IconOrigin_default.BOTTOM_LEFT || this.offsetOrigin_ == IconOrigin_default.BOTTOM_RIGHT) {
          offset[1] = iconImageSize[1] - size[1] - offset[1];
        }
      }
      offset[0] += displacement[0];
      offset[1] += displacement[1];
      this.origin_ = offset;
      return this.origin_;
    };
    Icon2.prototype.getSrc = function() {
      return this.iconImage_.getSrc();
    };
    Icon2.prototype.getSize = function() {
      return !this.size_ ? this.iconImage_.getSize() : this.size_;
    };
    Icon2.prototype.listenImageChange = function(listener) {
      this.iconImage_.addEventListener(EventType_default.CHANGE, listener);
    };
    Icon2.prototype.load = function() {
      this.iconImage_.load();
    };
    Icon2.prototype.unlistenImageChange = function(listener) {
      this.iconImage_.removeEventListener(EventType_default.CHANGE, listener);
    };
    return Icon2;
  }(Image_default)
);
var Icon_default = Icon;

// node_modules/ol/style/Stroke.js
var Stroke = (
  /** @class */
  function() {
    function Stroke2(opt_options) {
      var options = opt_options || {};
      this.color_ = options.color !== void 0 ? options.color : null;
      this.lineCap_ = options.lineCap;
      this.lineDash_ = options.lineDash !== void 0 ? options.lineDash : null;
      this.lineDashOffset_ = options.lineDashOffset;
      this.lineJoin_ = options.lineJoin;
      this.miterLimit_ = options.miterLimit;
      this.width_ = options.width;
    }
    Stroke2.prototype.clone = function() {
      var color = this.getColor();
      return new Stroke2({
        color: Array.isArray(color) ? color.slice() : color || void 0,
        lineCap: this.getLineCap(),
        lineDash: this.getLineDash() ? this.getLineDash().slice() : void 0,
        lineDashOffset: this.getLineDashOffset(),
        lineJoin: this.getLineJoin(),
        miterLimit: this.getMiterLimit(),
        width: this.getWidth()
      });
    };
    Stroke2.prototype.getColor = function() {
      return this.color_;
    };
    Stroke2.prototype.getLineCap = function() {
      return this.lineCap_;
    };
    Stroke2.prototype.getLineDash = function() {
      return this.lineDash_;
    };
    Stroke2.prototype.getLineDashOffset = function() {
      return this.lineDashOffset_;
    };
    Stroke2.prototype.getLineJoin = function() {
      return this.lineJoin_;
    };
    Stroke2.prototype.getMiterLimit = function() {
      return this.miterLimit_;
    };
    Stroke2.prototype.getWidth = function() {
      return this.width_;
    };
    Stroke2.prototype.setColor = function(color) {
      this.color_ = color;
    };
    Stroke2.prototype.setLineCap = function(lineCap) {
      this.lineCap_ = lineCap;
    };
    Stroke2.prototype.setLineDash = function(lineDash) {
      this.lineDash_ = lineDash;
    };
    Stroke2.prototype.setLineDashOffset = function(lineDashOffset) {
      this.lineDashOffset_ = lineDashOffset;
    };
    Stroke2.prototype.setLineJoin = function(lineJoin) {
      this.lineJoin_ = lineJoin;
    };
    Stroke2.prototype.setMiterLimit = function(miterLimit) {
      this.miterLimit_ = miterLimit;
    };
    Stroke2.prototype.setWidth = function(width) {
      this.width_ = width;
    };
    return Stroke2;
  }()
);
var Stroke_default = Stroke;

// node_modules/ol/style/Style.js
var Style = (
  /** @class */
  function() {
    function Style2(opt_options) {
      var options = opt_options || {};
      this.geometry_ = null;
      this.geometryFunction_ = defaultGeometryFunction;
      if (options.geometry !== void 0) {
        this.setGeometry(options.geometry);
      }
      this.fill_ = options.fill !== void 0 ? options.fill : null;
      this.image_ = options.image !== void 0 ? options.image : null;
      this.renderer_ = options.renderer !== void 0 ? options.renderer : null;
      this.stroke_ = options.stroke !== void 0 ? options.stroke : null;
      this.text_ = options.text !== void 0 ? options.text : null;
      this.zIndex_ = options.zIndex;
    }
    Style2.prototype.clone = function() {
      var geometry = this.getGeometry();
      if (geometry && typeof geometry === "object") {
        geometry = /** @type {import("../geom/Geometry.js").default} */
        geometry.clone();
      }
      return new Style2({
        geometry,
        fill: this.getFill() ? this.getFill().clone() : void 0,
        image: this.getImage() ? this.getImage().clone() : void 0,
        stroke: this.getStroke() ? this.getStroke().clone() : void 0,
        text: this.getText() ? this.getText().clone() : void 0,
        zIndex: this.getZIndex()
      });
    };
    Style2.prototype.getRenderer = function() {
      return this.renderer_;
    };
    Style2.prototype.setRenderer = function(renderer) {
      this.renderer_ = renderer;
    };
    Style2.prototype.getGeometry = function() {
      return this.geometry_;
    };
    Style2.prototype.getGeometryFunction = function() {
      return this.geometryFunction_;
    };
    Style2.prototype.getFill = function() {
      return this.fill_;
    };
    Style2.prototype.setFill = function(fill) {
      this.fill_ = fill;
    };
    Style2.prototype.getImage = function() {
      return this.image_;
    };
    Style2.prototype.setImage = function(image) {
      this.image_ = image;
    };
    Style2.prototype.getStroke = function() {
      return this.stroke_;
    };
    Style2.prototype.setStroke = function(stroke) {
      this.stroke_ = stroke;
    };
    Style2.prototype.getText = function() {
      return this.text_;
    };
    Style2.prototype.setText = function(text) {
      this.text_ = text;
    };
    Style2.prototype.getZIndex = function() {
      return this.zIndex_;
    };
    Style2.prototype.setGeometry = function(geometry) {
      if (typeof geometry === "function") {
        this.geometryFunction_ = geometry;
      } else if (typeof geometry === "string") {
        this.geometryFunction_ = function(feature) {
          return (
            /** @type {import("../geom/Geometry.js").default} */
            feature.get(geometry)
          );
        };
      } else if (!geometry) {
        this.geometryFunction_ = defaultGeometryFunction;
      } else if (geometry !== void 0) {
        this.geometryFunction_ = function() {
          return (
            /** @type {import("../geom/Geometry.js").default} */
            geometry
          );
        };
      }
      this.geometry_ = geometry;
    };
    Style2.prototype.setZIndex = function(zIndex) {
      this.zIndex_ = zIndex;
    };
    return Style2;
  }()
);
function toFunction(obj) {
  var styleFunction;
  if (typeof obj === "function") {
    styleFunction = obj;
  } else {
    var styles_1;
    if (Array.isArray(obj)) {
      styles_1 = obj;
    } else {
      assert(typeof /** @type {?} */
      obj.getZIndex === "function", 41);
      var style = (
        /** @type {Style} */
        obj
      );
      styles_1 = [style];
    }
    styleFunction = function() {
      return styles_1;
    };
  }
  return styleFunction;
}
var defaultStyles = null;
function createDefaultStyle(feature, resolution) {
  if (!defaultStyles) {
    var fill = new Fill_default({
      color: "rgba(255,255,255,0.4)"
    });
    var stroke = new Stroke_default({
      color: "#3399CC",
      width: 1.25
    });
    defaultStyles = [new Style({
      image: new Circle_default({
        fill,
        stroke,
        radius: 5
      }),
      fill,
      stroke
    })];
  }
  return defaultStyles;
}
function createEditingStyle() {
  var styles = {};
  var white = [255, 255, 255, 1];
  var blue = [0, 153, 255, 1];
  var width = 3;
  styles[GeometryType_default.POLYGON] = [new Style({
    fill: new Fill_default({
      color: [255, 255, 255, 0.5]
    })
  })];
  styles[GeometryType_default.MULTI_POLYGON] = styles[GeometryType_default.POLYGON];
  styles[GeometryType_default.LINE_STRING] = [new Style({
    stroke: new Stroke_default({
      color: white,
      width: width + 2
    })
  }), new Style({
    stroke: new Stroke_default({
      color: blue,
      width
    })
  })];
  styles[GeometryType_default.MULTI_LINE_STRING] = styles[GeometryType_default.LINE_STRING];
  styles[GeometryType_default.CIRCLE] = styles[GeometryType_default.POLYGON].concat(styles[GeometryType_default.LINE_STRING]);
  styles[GeometryType_default.POINT] = [new Style({
    image: new Circle_default({
      radius: width * 2,
      fill: new Fill_default({
        color: blue
      }),
      stroke: new Stroke_default({
        color: white,
        width: width / 2
      })
    }),
    zIndex: Infinity
  })];
  styles[GeometryType_default.MULTI_POINT] = styles[GeometryType_default.POINT];
  styles[GeometryType_default.GEOMETRY_COLLECTION] = styles[GeometryType_default.POLYGON].concat(styles[GeometryType_default.LINE_STRING], styles[GeometryType_default.POINT]);
  return styles;
}
function defaultGeometryFunction(feature) {
  return feature.getGeometry();
}
var Style_default = Style;

// node_modules/ol/style/TextPlacement.js
var TextPlacement_default = {
  POINT: "point",
  LINE: "line"
};

// node_modules/ol/style/Text.js
var DEFAULT_FILL_COLOR = "#333";
var Text = (
  /** @class */
  function() {
    function Text2(opt_options) {
      var options = opt_options || {};
      this.font_ = options.font;
      this.rotation_ = options.rotation;
      this.rotateWithView_ = options.rotateWithView;
      this.scale_ = options.scale;
      this.scaleArray_ = toSize(options.scale !== void 0 ? options.scale : 1);
      this.text_ = options.text;
      this.textAlign_ = options.textAlign;
      this.textBaseline_ = options.textBaseline;
      this.fill_ = options.fill !== void 0 ? options.fill : new Fill_default({
        color: DEFAULT_FILL_COLOR
      });
      this.maxAngle_ = options.maxAngle !== void 0 ? options.maxAngle : Math.PI / 4;
      this.placement_ = options.placement !== void 0 ? options.placement : TextPlacement_default.POINT;
      this.overflow_ = !!options.overflow;
      this.stroke_ = options.stroke !== void 0 ? options.stroke : null;
      this.offsetX_ = options.offsetX !== void 0 ? options.offsetX : 0;
      this.offsetY_ = options.offsetY !== void 0 ? options.offsetY : 0;
      this.backgroundFill_ = options.backgroundFill ? options.backgroundFill : null;
      this.backgroundStroke_ = options.backgroundStroke ? options.backgroundStroke : null;
      this.padding_ = options.padding === void 0 ? null : options.padding;
    }
    Text2.prototype.clone = function() {
      var scale = this.getScale();
      return new Text2({
        font: this.getFont(),
        placement: this.getPlacement(),
        maxAngle: this.getMaxAngle(),
        overflow: this.getOverflow(),
        rotation: this.getRotation(),
        rotateWithView: this.getRotateWithView(),
        scale: Array.isArray(scale) ? scale.slice() : scale,
        text: this.getText(),
        textAlign: this.getTextAlign(),
        textBaseline: this.getTextBaseline(),
        fill: this.getFill() ? this.getFill().clone() : void 0,
        stroke: this.getStroke() ? this.getStroke().clone() : void 0,
        offsetX: this.getOffsetX(),
        offsetY: this.getOffsetY(),
        backgroundFill: this.getBackgroundFill() ? this.getBackgroundFill().clone() : void 0,
        backgroundStroke: this.getBackgroundStroke() ? this.getBackgroundStroke().clone() : void 0,
        padding: this.getPadding()
      });
    };
    Text2.prototype.getOverflow = function() {
      return this.overflow_;
    };
    Text2.prototype.getFont = function() {
      return this.font_;
    };
    Text2.prototype.getMaxAngle = function() {
      return this.maxAngle_;
    };
    Text2.prototype.getPlacement = function() {
      return this.placement_;
    };
    Text2.prototype.getOffsetX = function() {
      return this.offsetX_;
    };
    Text2.prototype.getOffsetY = function() {
      return this.offsetY_;
    };
    Text2.prototype.getFill = function() {
      return this.fill_;
    };
    Text2.prototype.getRotateWithView = function() {
      return this.rotateWithView_;
    };
    Text2.prototype.getRotation = function() {
      return this.rotation_;
    };
    Text2.prototype.getScale = function() {
      return this.scale_;
    };
    Text2.prototype.getScaleArray = function() {
      return this.scaleArray_;
    };
    Text2.prototype.getStroke = function() {
      return this.stroke_;
    };
    Text2.prototype.getText = function() {
      return this.text_;
    };
    Text2.prototype.getTextAlign = function() {
      return this.textAlign_;
    };
    Text2.prototype.getTextBaseline = function() {
      return this.textBaseline_;
    };
    Text2.prototype.getBackgroundFill = function() {
      return this.backgroundFill_;
    };
    Text2.prototype.getBackgroundStroke = function() {
      return this.backgroundStroke_;
    };
    Text2.prototype.getPadding = function() {
      return this.padding_;
    };
    Text2.prototype.setOverflow = function(overflow) {
      this.overflow_ = overflow;
    };
    Text2.prototype.setFont = function(font) {
      this.font_ = font;
    };
    Text2.prototype.setMaxAngle = function(maxAngle) {
      this.maxAngle_ = maxAngle;
    };
    Text2.prototype.setOffsetX = function(offsetX) {
      this.offsetX_ = offsetX;
    };
    Text2.prototype.setOffsetY = function(offsetY) {
      this.offsetY_ = offsetY;
    };
    Text2.prototype.setPlacement = function(placement) {
      this.placement_ = placement;
    };
    Text2.prototype.setRotateWithView = function(rotateWithView) {
      this.rotateWithView_ = rotateWithView;
    };
    Text2.prototype.setFill = function(fill) {
      this.fill_ = fill;
    };
    Text2.prototype.setRotation = function(rotation) {
      this.rotation_ = rotation;
    };
    Text2.prototype.setScale = function(scale) {
      this.scale_ = scale;
      this.scaleArray_ = toSize(scale !== void 0 ? scale : 1);
    };
    Text2.prototype.setStroke = function(stroke) {
      this.stroke_ = stroke;
    };
    Text2.prototype.setText = function(text) {
      this.text_ = text;
    };
    Text2.prototype.setTextAlign = function(textAlign) {
      this.textAlign_ = textAlign;
    };
    Text2.prototype.setTextBaseline = function(textBaseline) {
      this.textBaseline_ = textBaseline;
    };
    Text2.prototype.setBackgroundFill = function(fill) {
      this.backgroundFill_ = fill;
    };
    Text2.prototype.setBackgroundStroke = function(stroke) {
      this.backgroundStroke_ = stroke;
    };
    Text2.prototype.setPadding = function(padding) {
      this.padding_ = padding;
    };
    return Text2;
  }()
);
var Text_default = Text;

export {
  Image_default,
  asColorLike,
  RegularShape_default,
  Circle_default,
  Fill_default,
  Stroke_default,
  toFunction,
  createDefaultStyle,
  createEditingStyle,
  Style_default,
  TextPlacement_default,
  IconImage_default,
  Icon_default,
  Text_default
};
//# sourceMappingURL=chunk-MMBLHBTF.js.map
