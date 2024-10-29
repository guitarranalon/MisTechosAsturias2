import {
  RBush
} from "./chunk-5KKL43HL.js";
import {
  Icon_default,
  TextPlacement_default,
  asColorLike,
  createDefaultStyle,
  toFunction
} from "./chunk-MMBLHBTF.js";
import {
  IconAnchorUnits_default
} from "./chunk-MNGUBNU3.js";
import {
  ViewHint_default,
  inflateCoordinates,
  inflateCoordinatesArray,
  inflateMultiCoordinatesArray,
  snap
} from "./chunk-CSFTPNSM.js";
import {
  Layer_default as Layer_default2
} from "./chunk-2BYM4VZ2.js";
import {
  ImageState_default
} from "./chunk-O4WNZANO.js";
import {
  Layer_default
} from "./chunk-NYVFUT5G.js";
import {
  defaultFillStyle,
  defaultFont,
  defaultLineCap,
  defaultLineDash,
  defaultLineDashOffset,
  defaultLineJoin,
  defaultLineWidth,
  defaultMiterLimit,
  defaultPadding,
  defaultStrokeStyle,
  defaultTextAlign,
  defaultTextBaseline,
  drawImageOrLabel,
  measureAndCacheTextWidth,
  measureTextHeight,
  measureTextWidths,
  registerFont
} from "./chunk-67PVPDW7.js";
import {
  WORKER_OFFSCREEN_CANVAS,
  createCanvasContext2D
} from "./chunk-NUKIIKKO.js";
import {
  rotate,
  transform2D,
  transformGeom2D
} from "./chunk-DEWJO73N.js";
import {
  fromUserExtent,
  getTransformFromProjections,
  getUserProjection,
  toUserExtent,
  wrapX as wrapX2
} from "./chunk-7ZC75XQY.js";
import {
  apply,
  compose,
  create,
  makeInverse,
  makeScale,
  setFromArray,
  toString
} from "./chunk-GAGXBDJ6.js";
import {
  GeometryType_default,
  lerp
} from "./chunk-5JPMEZLO.js";
import {
  equals,
  numberSafeCompareFunction,
  reverseSubArray
} from "./chunk-5ORQIOU2.js";
import {
  Relationship_default,
  assign,
  buffer,
  clone,
  containsCoordinate,
  containsExtent,
  coordinateRelationship,
  createEmpty,
  createOrUpdate,
  extendCoordinate,
  getUid,
  getWidth,
  intersects,
  isEmpty2 as isEmpty,
  wrapX
} from "./chunk-MN23FWKY.js";

// node_modules/ol/layer/BaseVector.js
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
var Property = {
  RENDER_ORDER: "renderOrder"
};
var BaseVectorLayer = (
  /** @class */
  function(_super) {
    __extends(BaseVectorLayer2, _super);
    function BaseVectorLayer2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      var baseOptions = assign({}, options);
      delete baseOptions.style;
      delete baseOptions.renderBuffer;
      delete baseOptions.updateWhileAnimating;
      delete baseOptions.updateWhileInteracting;
      _this = _super.call(this, baseOptions) || this;
      _this.declutter_ = options.declutter !== void 0 ? options.declutter : false;
      _this.renderBuffer_ = options.renderBuffer !== void 0 ? options.renderBuffer : 100;
      _this.style_ = null;
      _this.styleFunction_ = void 0;
      _this.setStyle(options.style);
      _this.updateWhileAnimating_ = options.updateWhileAnimating !== void 0 ? options.updateWhileAnimating : false;
      _this.updateWhileInteracting_ = options.updateWhileInteracting !== void 0 ? options.updateWhileInteracting : false;
      return _this;
    }
    BaseVectorLayer2.prototype.getDeclutter = function() {
      return this.declutter_;
    };
    BaseVectorLayer2.prototype.getFeatures = function(pixel) {
      return _super.prototype.getFeatures.call(this, pixel);
    };
    BaseVectorLayer2.prototype.getRenderBuffer = function() {
      return this.renderBuffer_;
    };
    BaseVectorLayer2.prototype.getRenderOrder = function() {
      return (
        /** @type {import("../render.js").OrderFunction|null|undefined} */
        this.get(Property.RENDER_ORDER)
      );
    };
    BaseVectorLayer2.prototype.getStyle = function() {
      return this.style_;
    };
    BaseVectorLayer2.prototype.getStyleFunction = function() {
      return this.styleFunction_;
    };
    BaseVectorLayer2.prototype.getUpdateWhileAnimating = function() {
      return this.updateWhileAnimating_;
    };
    BaseVectorLayer2.prototype.getUpdateWhileInteracting = function() {
      return this.updateWhileInteracting_;
    };
    BaseVectorLayer2.prototype.renderDeclutter = function(frameState) {
      if (!frameState.declutterTree) {
        frameState.declutterTree = new RBush(9);
      }
      this.getRenderer().renderDeclutter(frameState);
    };
    BaseVectorLayer2.prototype.setRenderOrder = function(renderOrder) {
      this.set(Property.RENDER_ORDER, renderOrder);
    };
    BaseVectorLayer2.prototype.setStyle = function(opt_style) {
      this.style_ = opt_style !== void 0 ? opt_style : createDefaultStyle;
      this.styleFunction_ = opt_style === null ? void 0 : toFunction(this.style_);
      this.changed();
    };
    return BaseVectorLayer2;
  }(Layer_default)
);
var BaseVector_default = BaseVectorLayer;

// node_modules/ol/render/canvas/Instruction.js
var Instruction = {
  BEGIN_GEOMETRY: 0,
  BEGIN_PATH: 1,
  CIRCLE: 2,
  CLOSE_PATH: 3,
  CUSTOM: 4,
  DRAW_CHARS: 5,
  DRAW_IMAGE: 6,
  END_GEOMETRY: 7,
  FILL: 8,
  MOVE_TO_LINE_TO: 9,
  SET_FILL_STYLE: 10,
  SET_STROKE_STYLE: 11,
  STROKE: 12
};
var fillInstruction = [Instruction.FILL];
var strokeInstruction = [Instruction.STROKE];
var beginPathInstruction = [Instruction.BEGIN_PATH];
var closePathInstruction = [Instruction.CLOSE_PATH];
var Instruction_default = Instruction;

// node_modules/ol/render/VectorContext.js
var VectorContext = (
  /** @class */
  function() {
    function VectorContext2() {
    }
    VectorContext2.prototype.drawCustom = function(geometry, feature, renderer) {
    };
    VectorContext2.prototype.drawGeometry = function(geometry) {
    };
    VectorContext2.prototype.setStyle = function(style) {
    };
    VectorContext2.prototype.drawCircle = function(circleGeometry, feature) {
    };
    VectorContext2.prototype.drawFeature = function(feature, style) {
    };
    VectorContext2.prototype.drawGeometryCollection = function(geometryCollectionGeometry, feature) {
    };
    VectorContext2.prototype.drawLineString = function(lineStringGeometry, feature) {
    };
    VectorContext2.prototype.drawMultiLineString = function(multiLineStringGeometry, feature) {
    };
    VectorContext2.prototype.drawMultiPoint = function(multiPointGeometry, feature) {
    };
    VectorContext2.prototype.drawMultiPolygon = function(multiPolygonGeometry, feature) {
    };
    VectorContext2.prototype.drawPoint = function(pointGeometry, feature) {
    };
    VectorContext2.prototype.drawPolygon = function(polygonGeometry, feature) {
    };
    VectorContext2.prototype.drawText = function(geometry, feature) {
    };
    VectorContext2.prototype.setFillStrokeStyle = function(fillStyle, strokeStyle) {
    };
    VectorContext2.prototype.setImageStyle = function(imageStyle, opt_declutterImageWithText) {
    };
    VectorContext2.prototype.setTextStyle = function(textStyle, opt_declutterImageWithText) {
    };
    return VectorContext2;
  }()
);
var VectorContext_default = VectorContext;

// node_modules/ol/render/canvas/Builder.js
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
var CanvasBuilder = (
  /** @class */
  function(_super) {
    __extends2(CanvasBuilder2, _super);
    function CanvasBuilder2(tolerance, maxExtent, resolution, pixelRatio) {
      var _this = _super.call(this) || this;
      _this.tolerance = tolerance;
      _this.maxExtent = maxExtent;
      _this.pixelRatio = pixelRatio;
      _this.maxLineWidth = 0;
      _this.resolution = resolution;
      _this.beginGeometryInstruction1_ = null;
      _this.beginGeometryInstruction2_ = null;
      _this.bufferedMaxExtent_ = null;
      _this.instructions = [];
      _this.coordinates = [];
      _this.tmpCoordinate_ = [];
      _this.hitDetectionInstructions = [];
      _this.state = /** @type {import("../canvas.js").FillStrokeState} */
      {};
      return _this;
    }
    CanvasBuilder2.prototype.applyPixelRatio = function(dashArray) {
      var pixelRatio = this.pixelRatio;
      return pixelRatio == 1 ? dashArray : dashArray.map(function(dash) {
        return dash * pixelRatio;
      });
    };
    CanvasBuilder2.prototype.appendFlatPointCoordinates = function(flatCoordinates, stride) {
      var extent = this.getBufferedMaxExtent();
      var tmpCoord = this.tmpCoordinate_;
      var coordinates = this.coordinates;
      var myEnd = coordinates.length;
      for (var i = 0, ii = flatCoordinates.length; i < ii; i += stride) {
        tmpCoord[0] = flatCoordinates[i];
        tmpCoord[1] = flatCoordinates[i + 1];
        if (containsCoordinate(extent, tmpCoord)) {
          coordinates[myEnd++] = tmpCoord[0];
          coordinates[myEnd++] = tmpCoord[1];
        }
      }
      return myEnd;
    };
    CanvasBuilder2.prototype.appendFlatLineCoordinates = function(flatCoordinates, offset, end, stride, closed, skipFirst) {
      var coordinates = this.coordinates;
      var myEnd = coordinates.length;
      var extent = this.getBufferedMaxExtent();
      if (skipFirst) {
        offset += stride;
      }
      var lastXCoord = flatCoordinates[offset];
      var lastYCoord = flatCoordinates[offset + 1];
      var nextCoord = this.tmpCoordinate_;
      var skipped = true;
      var i, lastRel, nextRel;
      for (i = offset + stride; i < end; i += stride) {
        nextCoord[0] = flatCoordinates[i];
        nextCoord[1] = flatCoordinates[i + 1];
        nextRel = coordinateRelationship(extent, nextCoord);
        if (nextRel !== lastRel) {
          if (skipped) {
            coordinates[myEnd++] = lastXCoord;
            coordinates[myEnd++] = lastYCoord;
            skipped = false;
          }
          coordinates[myEnd++] = nextCoord[0];
          coordinates[myEnd++] = nextCoord[1];
        } else if (nextRel === Relationship_default.INTERSECTING) {
          coordinates[myEnd++] = nextCoord[0];
          coordinates[myEnd++] = nextCoord[1];
          skipped = false;
        } else {
          skipped = true;
        }
        lastXCoord = nextCoord[0];
        lastYCoord = nextCoord[1];
        lastRel = nextRel;
      }
      if (closed && skipped || i === offset + stride) {
        coordinates[myEnd++] = lastXCoord;
        coordinates[myEnd++] = lastYCoord;
      }
      return myEnd;
    };
    CanvasBuilder2.prototype.drawCustomCoordinates_ = function(flatCoordinates, offset, ends, stride, builderEnds) {
      for (var i = 0, ii = ends.length; i < ii; ++i) {
        var end = ends[i];
        var builderEnd = this.appendFlatLineCoordinates(flatCoordinates, offset, end, stride, false, false);
        builderEnds.push(builderEnd);
        offset = end;
      }
      return offset;
    };
    CanvasBuilder2.prototype.drawCustom = function(geometry, feature, renderer) {
      this.beginGeometry(geometry, feature);
      var type = geometry.getType();
      var stride = geometry.getStride();
      var builderBegin = this.coordinates.length;
      var flatCoordinates, builderEnd, builderEnds, builderEndss;
      var offset;
      if (type == GeometryType_default.MULTI_POLYGON) {
        flatCoordinates = /** @type {import("../../geom/MultiPolygon.js").default} */
        geometry.getOrientedFlatCoordinates();
        builderEndss = [];
        var endss = (
          /** @type {import("../../geom/MultiPolygon.js").default} */
          geometry.getEndss()
        );
        offset = 0;
        for (var i = 0, ii = endss.length; i < ii; ++i) {
          var myEnds = [];
          offset = this.drawCustomCoordinates_(flatCoordinates, offset, endss[i], stride, myEnds);
          builderEndss.push(myEnds);
        }
        this.instructions.push([Instruction_default.CUSTOM, builderBegin, builderEndss, geometry, renderer, inflateMultiCoordinatesArray]);
      } else if (type == GeometryType_default.POLYGON || type == GeometryType_default.MULTI_LINE_STRING) {
        builderEnds = [];
        flatCoordinates = type == GeometryType_default.POLYGON ? (
          /** @type {import("../../geom/Polygon.js").default} */
          geometry.getOrientedFlatCoordinates()
        ) : geometry.getFlatCoordinates();
        offset = this.drawCustomCoordinates_(
          flatCoordinates,
          0,
          /** @type {import("../../geom/Polygon.js").default|import("../../geom/MultiLineString.js").default} */
          geometry.getEnds(),
          stride,
          builderEnds
        );
        this.instructions.push([Instruction_default.CUSTOM, builderBegin, builderEnds, geometry, renderer, inflateCoordinatesArray]);
      } else if (type == GeometryType_default.LINE_STRING || type == GeometryType_default.CIRCLE) {
        flatCoordinates = geometry.getFlatCoordinates();
        builderEnd = this.appendFlatLineCoordinates(flatCoordinates, 0, flatCoordinates.length, stride, false, false);
        this.instructions.push([Instruction_default.CUSTOM, builderBegin, builderEnd, geometry, renderer, inflateCoordinates]);
      } else if (type == GeometryType_default.MULTI_POINT) {
        flatCoordinates = geometry.getFlatCoordinates();
        builderEnd = this.appendFlatPointCoordinates(flatCoordinates, stride);
        if (builderEnd > builderBegin) {
          this.instructions.push([Instruction_default.CUSTOM, builderBegin, builderEnd, geometry, renderer, inflateCoordinates]);
        }
      } else if (type == GeometryType_default.POINT) {
        flatCoordinates = geometry.getFlatCoordinates();
        this.coordinates.push(flatCoordinates[0], flatCoordinates[1]);
        builderEnd = this.coordinates.length;
        this.instructions.push([Instruction_default.CUSTOM, builderBegin, builderEnd, geometry, renderer]);
      }
      this.endGeometry(feature);
    };
    CanvasBuilder2.prototype.beginGeometry = function(geometry, feature) {
      this.beginGeometryInstruction1_ = [Instruction_default.BEGIN_GEOMETRY, feature, 0, geometry];
      this.instructions.push(this.beginGeometryInstruction1_);
      this.beginGeometryInstruction2_ = [Instruction_default.BEGIN_GEOMETRY, feature, 0, geometry];
      this.hitDetectionInstructions.push(this.beginGeometryInstruction2_);
    };
    CanvasBuilder2.prototype.finish = function() {
      return {
        instructions: this.instructions,
        hitDetectionInstructions: this.hitDetectionInstructions,
        coordinates: this.coordinates
      };
    };
    CanvasBuilder2.prototype.reverseHitDetectionInstructions = function() {
      var hitDetectionInstructions = this.hitDetectionInstructions;
      hitDetectionInstructions.reverse();
      var i;
      var n = hitDetectionInstructions.length;
      var instruction;
      var type;
      var begin = -1;
      for (i = 0; i < n; ++i) {
        instruction = hitDetectionInstructions[i];
        type = /** @type {import("./Instruction.js").default} */
        instruction[0];
        if (type == Instruction_default.END_GEOMETRY) {
          begin = i;
        } else if (type == Instruction_default.BEGIN_GEOMETRY) {
          instruction[2] = i;
          reverseSubArray(this.hitDetectionInstructions, begin, i);
          begin = -1;
        }
      }
    };
    CanvasBuilder2.prototype.setFillStrokeStyle = function(fillStyle, strokeStyle) {
      var state = this.state;
      if (fillStyle) {
        var fillStyleColor = fillStyle.getColor();
        state.fillStyle = asColorLike(fillStyleColor ? fillStyleColor : defaultFillStyle);
      } else {
        state.fillStyle = void 0;
      }
      if (strokeStyle) {
        var strokeStyleColor = strokeStyle.getColor();
        state.strokeStyle = asColorLike(strokeStyleColor ? strokeStyleColor : defaultStrokeStyle);
        var strokeStyleLineCap = strokeStyle.getLineCap();
        state.lineCap = strokeStyleLineCap !== void 0 ? strokeStyleLineCap : defaultLineCap;
        var strokeStyleLineDash = strokeStyle.getLineDash();
        state.lineDash = strokeStyleLineDash ? strokeStyleLineDash.slice() : defaultLineDash;
        var strokeStyleLineDashOffset = strokeStyle.getLineDashOffset();
        state.lineDashOffset = strokeStyleLineDashOffset ? strokeStyleLineDashOffset : defaultLineDashOffset;
        var strokeStyleLineJoin = strokeStyle.getLineJoin();
        state.lineJoin = strokeStyleLineJoin !== void 0 ? strokeStyleLineJoin : defaultLineJoin;
        var strokeStyleWidth = strokeStyle.getWidth();
        state.lineWidth = strokeStyleWidth !== void 0 ? strokeStyleWidth : defaultLineWidth;
        var strokeStyleMiterLimit = strokeStyle.getMiterLimit();
        state.miterLimit = strokeStyleMiterLimit !== void 0 ? strokeStyleMiterLimit : defaultMiterLimit;
        if (state.lineWidth > this.maxLineWidth) {
          this.maxLineWidth = state.lineWidth;
          this.bufferedMaxExtent_ = null;
        }
      } else {
        state.strokeStyle = void 0;
        state.lineCap = void 0;
        state.lineDash = null;
        state.lineDashOffset = void 0;
        state.lineJoin = void 0;
        state.lineWidth = void 0;
        state.miterLimit = void 0;
      }
    };
    CanvasBuilder2.prototype.createFill = function(state) {
      var fillStyle = state.fillStyle;
      var fillInstruction2 = [Instruction_default.SET_FILL_STYLE, fillStyle];
      if (typeof fillStyle !== "string") {
        fillInstruction2.push(true);
      }
      return fillInstruction2;
    };
    CanvasBuilder2.prototype.applyStroke = function(state) {
      this.instructions.push(this.createStroke(state));
    };
    CanvasBuilder2.prototype.createStroke = function(state) {
      return [Instruction_default.SET_STROKE_STYLE, state.strokeStyle, state.lineWidth * this.pixelRatio, state.lineCap, state.lineJoin, state.miterLimit, this.applyPixelRatio(state.lineDash), state.lineDashOffset * this.pixelRatio];
    };
    CanvasBuilder2.prototype.updateFillStyle = function(state, createFill) {
      var fillStyle = state.fillStyle;
      if (typeof fillStyle !== "string" || state.currentFillStyle != fillStyle) {
        if (fillStyle !== void 0) {
          this.instructions.push(createFill.call(this, state));
        }
        state.currentFillStyle = fillStyle;
      }
    };
    CanvasBuilder2.prototype.updateStrokeStyle = function(state, applyStroke) {
      var strokeStyle = state.strokeStyle;
      var lineCap = state.lineCap;
      var lineDash = state.lineDash;
      var lineDashOffset = state.lineDashOffset;
      var lineJoin = state.lineJoin;
      var lineWidth = state.lineWidth;
      var miterLimit = state.miterLimit;
      if (state.currentStrokeStyle != strokeStyle || state.currentLineCap != lineCap || lineDash != state.currentLineDash && !equals(state.currentLineDash, lineDash) || state.currentLineDashOffset != lineDashOffset || state.currentLineJoin != lineJoin || state.currentLineWidth != lineWidth || state.currentMiterLimit != miterLimit) {
        if (strokeStyle !== void 0) {
          applyStroke.call(this, state);
        }
        state.currentStrokeStyle = strokeStyle;
        state.currentLineCap = lineCap;
        state.currentLineDash = lineDash;
        state.currentLineDashOffset = lineDashOffset;
        state.currentLineJoin = lineJoin;
        state.currentLineWidth = lineWidth;
        state.currentMiterLimit = miterLimit;
      }
    };
    CanvasBuilder2.prototype.endGeometry = function(feature) {
      this.beginGeometryInstruction1_[2] = this.instructions.length;
      this.beginGeometryInstruction1_ = null;
      this.beginGeometryInstruction2_[2] = this.hitDetectionInstructions.length;
      this.beginGeometryInstruction2_ = null;
      var endGeometryInstruction = [Instruction_default.END_GEOMETRY, feature];
      this.instructions.push(endGeometryInstruction);
      this.hitDetectionInstructions.push(endGeometryInstruction);
    };
    CanvasBuilder2.prototype.getBufferedMaxExtent = function() {
      if (!this.bufferedMaxExtent_) {
        this.bufferedMaxExtent_ = clone(this.maxExtent);
        if (this.maxLineWidth > 0) {
          var width = this.resolution * (this.maxLineWidth + 1) / 2;
          buffer(this.bufferedMaxExtent_, width, this.bufferedMaxExtent_);
        }
      }
      return this.bufferedMaxExtent_;
    };
    return CanvasBuilder2;
  }(VectorContext_default)
);
var Builder_default = CanvasBuilder;

// node_modules/ol/render/canvas/ImageBuilder.js
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
var CanvasImageBuilder = (
  /** @class */
  function(_super) {
    __extends3(CanvasImageBuilder2, _super);
    function CanvasImageBuilder2(tolerance, maxExtent, resolution, pixelRatio) {
      var _this = _super.call(this, tolerance, maxExtent, resolution, pixelRatio) || this;
      _this.hitDetectionImage_ = null;
      _this.image_ = null;
      _this.imagePixelRatio_ = void 0;
      _this.anchorX_ = void 0;
      _this.anchorY_ = void 0;
      _this.height_ = void 0;
      _this.opacity_ = void 0;
      _this.originX_ = void 0;
      _this.originY_ = void 0;
      _this.rotateWithView_ = void 0;
      _this.rotation_ = void 0;
      _this.scale_ = void 0;
      _this.width_ = void 0;
      _this.declutterImageWithText_ = void 0;
      return _this;
    }
    CanvasImageBuilder2.prototype.drawPoint = function(pointGeometry, feature) {
      if (!this.image_) {
        return;
      }
      this.beginGeometry(pointGeometry, feature);
      var flatCoordinates = pointGeometry.getFlatCoordinates();
      var stride = pointGeometry.getStride();
      var myBegin = this.coordinates.length;
      var myEnd = this.appendFlatPointCoordinates(flatCoordinates, stride);
      this.instructions.push([
        Instruction_default.DRAW_IMAGE,
        myBegin,
        myEnd,
        this.image_,
        // Remaining arguments to DRAW_IMAGE are in alphabetical order
        this.anchorX_ * this.imagePixelRatio_,
        this.anchorY_ * this.imagePixelRatio_,
        Math.ceil(this.height_ * this.imagePixelRatio_),
        this.opacity_,
        this.originX_,
        this.originY_,
        this.rotateWithView_,
        this.rotation_,
        [this.scale_[0] * this.pixelRatio / this.imagePixelRatio_, this.scale_[1] * this.pixelRatio / this.imagePixelRatio_],
        Math.ceil(this.width_ * this.imagePixelRatio_),
        this.declutterImageWithText_
      ]);
      this.hitDetectionInstructions.push([
        Instruction_default.DRAW_IMAGE,
        myBegin,
        myEnd,
        this.hitDetectionImage_,
        // Remaining arguments to DRAW_IMAGE are in alphabetical order
        this.anchorX_,
        this.anchorY_,
        this.height_,
        this.opacity_,
        this.originX_,
        this.originY_,
        this.rotateWithView_,
        this.rotation_,
        this.scale_,
        this.width_,
        this.declutterImageWithText_
      ]);
      this.endGeometry(feature);
    };
    CanvasImageBuilder2.prototype.drawMultiPoint = function(multiPointGeometry, feature) {
      if (!this.image_) {
        return;
      }
      this.beginGeometry(multiPointGeometry, feature);
      var flatCoordinates = multiPointGeometry.getFlatCoordinates();
      var stride = multiPointGeometry.getStride();
      var myBegin = this.coordinates.length;
      var myEnd = this.appendFlatPointCoordinates(flatCoordinates, stride);
      this.instructions.push([
        Instruction_default.DRAW_IMAGE,
        myBegin,
        myEnd,
        this.image_,
        // Remaining arguments to DRAW_IMAGE are in alphabetical order
        this.anchorX_ * this.imagePixelRatio_,
        this.anchorY_ * this.imagePixelRatio_,
        Math.ceil(this.height_ * this.imagePixelRatio_),
        this.opacity_,
        this.originX_,
        this.originY_,
        this.rotateWithView_,
        this.rotation_,
        [this.scale_[0] * this.pixelRatio / this.imagePixelRatio_, this.scale_[1] * this.pixelRatio / this.imagePixelRatio_],
        Math.ceil(this.width_ * this.imagePixelRatio_),
        this.declutterImageWithText_
      ]);
      this.hitDetectionInstructions.push([
        Instruction_default.DRAW_IMAGE,
        myBegin,
        myEnd,
        this.hitDetectionImage_,
        // Remaining arguments to DRAW_IMAGE are in alphabetical order
        this.anchorX_,
        this.anchorY_,
        this.height_,
        this.opacity_,
        this.originX_,
        this.originY_,
        this.rotateWithView_,
        this.rotation_,
        this.scale_,
        this.width_,
        this.declutterImageWithText_
      ]);
      this.endGeometry(feature);
    };
    CanvasImageBuilder2.prototype.finish = function() {
      this.reverseHitDetectionInstructions();
      this.anchorX_ = void 0;
      this.anchorY_ = void 0;
      this.hitDetectionImage_ = null;
      this.image_ = null;
      this.imagePixelRatio_ = void 0;
      this.height_ = void 0;
      this.scale_ = void 0;
      this.opacity_ = void 0;
      this.originX_ = void 0;
      this.originY_ = void 0;
      this.rotateWithView_ = void 0;
      this.rotation_ = void 0;
      this.width_ = void 0;
      return _super.prototype.finish.call(this);
    };
    CanvasImageBuilder2.prototype.setImageStyle = function(imageStyle, opt_sharedData) {
      var anchor = imageStyle.getAnchor();
      var size = imageStyle.getSize();
      var hitDetectionImage = imageStyle.getHitDetectionImage();
      var image = imageStyle.getImage(this.pixelRatio);
      var origin = imageStyle.getOrigin();
      this.imagePixelRatio_ = imageStyle.getPixelRatio(this.pixelRatio);
      this.anchorX_ = anchor[0];
      this.anchorY_ = anchor[1];
      this.hitDetectionImage_ = hitDetectionImage;
      this.image_ = image;
      this.height_ = size[1];
      this.opacity_ = imageStyle.getOpacity();
      this.originX_ = origin[0];
      this.originY_ = origin[1];
      this.rotateWithView_ = imageStyle.getRotateWithView();
      this.rotation_ = imageStyle.getRotation();
      this.scale_ = imageStyle.getScaleArray();
      this.width_ = size[0];
      this.declutterImageWithText_ = opt_sharedData;
    };
    return CanvasImageBuilder2;
  }(Builder_default)
);
var ImageBuilder_default = CanvasImageBuilder;

// node_modules/ol/render/canvas/LineStringBuilder.js
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
var CanvasLineStringBuilder = (
  /** @class */
  function(_super) {
    __extends4(CanvasLineStringBuilder2, _super);
    function CanvasLineStringBuilder2(tolerance, maxExtent, resolution, pixelRatio) {
      return _super.call(this, tolerance, maxExtent, resolution, pixelRatio) || this;
    }
    CanvasLineStringBuilder2.prototype.drawFlatCoordinates_ = function(flatCoordinates, offset, end, stride) {
      var myBegin = this.coordinates.length;
      var myEnd = this.appendFlatLineCoordinates(flatCoordinates, offset, end, stride, false, false);
      var moveToLineToInstruction = [Instruction_default.MOVE_TO_LINE_TO, myBegin, myEnd];
      this.instructions.push(moveToLineToInstruction);
      this.hitDetectionInstructions.push(moveToLineToInstruction);
      return end;
    };
    CanvasLineStringBuilder2.prototype.drawLineString = function(lineStringGeometry, feature) {
      var state = this.state;
      var strokeStyle = state.strokeStyle;
      var lineWidth = state.lineWidth;
      if (strokeStyle === void 0 || lineWidth === void 0) {
        return;
      }
      this.updateStrokeStyle(state, this.applyStroke);
      this.beginGeometry(lineStringGeometry, feature);
      this.hitDetectionInstructions.push([Instruction_default.SET_STROKE_STYLE, state.strokeStyle, state.lineWidth, state.lineCap, state.lineJoin, state.miterLimit, state.lineDash, state.lineDashOffset], beginPathInstruction);
      var flatCoordinates = lineStringGeometry.getFlatCoordinates();
      var stride = lineStringGeometry.getStride();
      this.drawFlatCoordinates_(flatCoordinates, 0, flatCoordinates.length, stride);
      this.hitDetectionInstructions.push(strokeInstruction);
      this.endGeometry(feature);
    };
    CanvasLineStringBuilder2.prototype.drawMultiLineString = function(multiLineStringGeometry, feature) {
      var state = this.state;
      var strokeStyle = state.strokeStyle;
      var lineWidth = state.lineWidth;
      if (strokeStyle === void 0 || lineWidth === void 0) {
        return;
      }
      this.updateStrokeStyle(state, this.applyStroke);
      this.beginGeometry(multiLineStringGeometry, feature);
      this.hitDetectionInstructions.push([Instruction_default.SET_STROKE_STYLE, state.strokeStyle, state.lineWidth, state.lineCap, state.lineJoin, state.miterLimit, state.lineDash, state.lineDashOffset], beginPathInstruction);
      var ends = multiLineStringGeometry.getEnds();
      var flatCoordinates = multiLineStringGeometry.getFlatCoordinates();
      var stride = multiLineStringGeometry.getStride();
      var offset = 0;
      for (var i = 0, ii = ends.length; i < ii; ++i) {
        offset = this.drawFlatCoordinates_(
          flatCoordinates,
          offset,
          /** @type {number} */
          ends[i],
          stride
        );
      }
      this.hitDetectionInstructions.push(strokeInstruction);
      this.endGeometry(feature);
    };
    CanvasLineStringBuilder2.prototype.finish = function() {
      var state = this.state;
      if (state.lastStroke != void 0 && state.lastStroke != this.coordinates.length) {
        this.instructions.push(strokeInstruction);
      }
      this.reverseHitDetectionInstructions();
      this.state = null;
      return _super.prototype.finish.call(this);
    };
    CanvasLineStringBuilder2.prototype.applyStroke = function(state) {
      if (state.lastStroke != void 0 && state.lastStroke != this.coordinates.length) {
        this.instructions.push(strokeInstruction);
        state.lastStroke = this.coordinates.length;
      }
      state.lastStroke = 0;
      _super.prototype.applyStroke.call(this, state);
      this.instructions.push(beginPathInstruction);
    };
    return CanvasLineStringBuilder2;
  }(Builder_default)
);
var LineStringBuilder_default = CanvasLineStringBuilder;

// node_modules/ol/render/canvas/PolygonBuilder.js
var __extends5 = /* @__PURE__ */ function() {
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
var CanvasPolygonBuilder = (
  /** @class */
  function(_super) {
    __extends5(CanvasPolygonBuilder2, _super);
    function CanvasPolygonBuilder2(tolerance, maxExtent, resolution, pixelRatio) {
      return _super.call(this, tolerance, maxExtent, resolution, pixelRatio) || this;
    }
    CanvasPolygonBuilder2.prototype.drawFlatCoordinatess_ = function(flatCoordinates, offset, ends, stride) {
      var state = this.state;
      var fill = state.fillStyle !== void 0;
      var stroke = state.strokeStyle !== void 0;
      var numEnds = ends.length;
      this.instructions.push(beginPathInstruction);
      this.hitDetectionInstructions.push(beginPathInstruction);
      for (var i = 0; i < numEnds; ++i) {
        var end = ends[i];
        var myBegin = this.coordinates.length;
        var myEnd = this.appendFlatLineCoordinates(flatCoordinates, offset, end, stride, true, !stroke);
        var moveToLineToInstruction = [Instruction_default.MOVE_TO_LINE_TO, myBegin, myEnd];
        this.instructions.push(moveToLineToInstruction);
        this.hitDetectionInstructions.push(moveToLineToInstruction);
        if (stroke) {
          this.instructions.push(closePathInstruction);
          this.hitDetectionInstructions.push(closePathInstruction);
        }
        offset = end;
      }
      if (fill) {
        this.instructions.push(fillInstruction);
        this.hitDetectionInstructions.push(fillInstruction);
      }
      if (stroke) {
        this.instructions.push(strokeInstruction);
        this.hitDetectionInstructions.push(strokeInstruction);
      }
      return offset;
    };
    CanvasPolygonBuilder2.prototype.drawCircle = function(circleGeometry, feature) {
      var state = this.state;
      var fillStyle = state.fillStyle;
      var strokeStyle = state.strokeStyle;
      if (fillStyle === void 0 && strokeStyle === void 0) {
        return;
      }
      this.setFillStrokeStyles_();
      this.beginGeometry(circleGeometry, feature);
      if (state.fillStyle !== void 0) {
        this.hitDetectionInstructions.push([Instruction_default.SET_FILL_STYLE, defaultFillStyle]);
      }
      if (state.strokeStyle !== void 0) {
        this.hitDetectionInstructions.push([Instruction_default.SET_STROKE_STYLE, state.strokeStyle, state.lineWidth, state.lineCap, state.lineJoin, state.miterLimit, state.lineDash, state.lineDashOffset]);
      }
      var flatCoordinates = circleGeometry.getFlatCoordinates();
      var stride = circleGeometry.getStride();
      var myBegin = this.coordinates.length;
      this.appendFlatLineCoordinates(flatCoordinates, 0, flatCoordinates.length, stride, false, false);
      var circleInstruction = [Instruction_default.CIRCLE, myBegin];
      this.instructions.push(beginPathInstruction, circleInstruction);
      this.hitDetectionInstructions.push(beginPathInstruction, circleInstruction);
      if (state.fillStyle !== void 0) {
        this.instructions.push(fillInstruction);
        this.hitDetectionInstructions.push(fillInstruction);
      }
      if (state.strokeStyle !== void 0) {
        this.instructions.push(strokeInstruction);
        this.hitDetectionInstructions.push(strokeInstruction);
      }
      this.endGeometry(feature);
    };
    CanvasPolygonBuilder2.prototype.drawPolygon = function(polygonGeometry, feature) {
      var state = this.state;
      var fillStyle = state.fillStyle;
      var strokeStyle = state.strokeStyle;
      if (fillStyle === void 0 && strokeStyle === void 0) {
        return;
      }
      this.setFillStrokeStyles_();
      this.beginGeometry(polygonGeometry, feature);
      if (state.fillStyle !== void 0) {
        this.hitDetectionInstructions.push([Instruction_default.SET_FILL_STYLE, defaultFillStyle]);
      }
      if (state.strokeStyle !== void 0) {
        this.hitDetectionInstructions.push([Instruction_default.SET_STROKE_STYLE, state.strokeStyle, state.lineWidth, state.lineCap, state.lineJoin, state.miterLimit, state.lineDash, state.lineDashOffset]);
      }
      var ends = polygonGeometry.getEnds();
      var flatCoordinates = polygonGeometry.getOrientedFlatCoordinates();
      var stride = polygonGeometry.getStride();
      this.drawFlatCoordinatess_(
        flatCoordinates,
        0,
        /** @type {Array<number>} */
        ends,
        stride
      );
      this.endGeometry(feature);
    };
    CanvasPolygonBuilder2.prototype.drawMultiPolygon = function(multiPolygonGeometry, feature) {
      var state = this.state;
      var fillStyle = state.fillStyle;
      var strokeStyle = state.strokeStyle;
      if (fillStyle === void 0 && strokeStyle === void 0) {
        return;
      }
      this.setFillStrokeStyles_();
      this.beginGeometry(multiPolygonGeometry, feature);
      if (state.fillStyle !== void 0) {
        this.hitDetectionInstructions.push([Instruction_default.SET_FILL_STYLE, defaultFillStyle]);
      }
      if (state.strokeStyle !== void 0) {
        this.hitDetectionInstructions.push([Instruction_default.SET_STROKE_STYLE, state.strokeStyle, state.lineWidth, state.lineCap, state.lineJoin, state.miterLimit, state.lineDash, state.lineDashOffset]);
      }
      var endss = multiPolygonGeometry.getEndss();
      var flatCoordinates = multiPolygonGeometry.getOrientedFlatCoordinates();
      var stride = multiPolygonGeometry.getStride();
      var offset = 0;
      for (var i = 0, ii = endss.length; i < ii; ++i) {
        offset = this.drawFlatCoordinatess_(flatCoordinates, offset, endss[i], stride);
      }
      this.endGeometry(feature);
    };
    CanvasPolygonBuilder2.prototype.finish = function() {
      this.reverseHitDetectionInstructions();
      this.state = null;
      var tolerance = this.tolerance;
      if (tolerance !== 0) {
        var coordinates = this.coordinates;
        for (var i = 0, ii = coordinates.length; i < ii; ++i) {
          coordinates[i] = snap(coordinates[i], tolerance);
        }
      }
      return _super.prototype.finish.call(this);
    };
    CanvasPolygonBuilder2.prototype.setFillStrokeStyles_ = function() {
      var state = this.state;
      var fillStyle = state.fillStyle;
      if (fillStyle !== void 0) {
        this.updateFillStyle(state, this.createFill);
      }
      if (state.strokeStyle !== void 0) {
        this.updateStrokeStyle(state, this.applyStroke);
      }
    };
    return CanvasPolygonBuilder2;
  }(Builder_default)
);
var PolygonBuilder_default = CanvasPolygonBuilder;

// node_modules/ol/geom/flat/straightchunk.js
function matchingChunk(maxAngle, flatCoordinates, offset, end, stride) {
  var chunkStart = offset;
  var chunkEnd = offset;
  var chunkM = 0;
  var m = 0;
  var start = offset;
  var acos, i, m12, m23, x1, y1, x12, y12, x23, y23;
  for (i = offset; i < end; i += stride) {
    var x2 = flatCoordinates[i];
    var y2 = flatCoordinates[i + 1];
    if (x1 !== void 0) {
      x23 = x2 - x1;
      y23 = y2 - y1;
      m23 = Math.sqrt(x23 * x23 + y23 * y23);
      if (x12 !== void 0) {
        m += m12;
        acos = Math.acos((x12 * x23 + y12 * y23) / (m12 * m23));
        if (acos > maxAngle) {
          if (m > chunkM) {
            chunkM = m;
            chunkStart = start;
            chunkEnd = i;
          }
          m = 0;
          start = i - stride;
        }
      }
      m12 = m23;
      x12 = x23;
      y12 = y23;
    }
    x1 = x2;
    y1 = y2;
  }
  m += m23;
  return m > chunkM ? [start, i] : [chunkStart, chunkEnd];
}

// node_modules/ol/render/canvas/TextBuilder.js
var __extends6 = /* @__PURE__ */ function() {
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
var TEXT_ALIGN = {
  "left": 0,
  "end": 0,
  "center": 0.5,
  "right": 1,
  "start": 1,
  "top": 0,
  "middle": 0.5,
  "hanging": 0.2,
  "alphabetic": 0.8,
  "ideographic": 0.8,
  "bottom": 1
};
var CanvasTextBuilder = (
  /** @class */
  function(_super) {
    __extends6(CanvasTextBuilder2, _super);
    function CanvasTextBuilder2(tolerance, maxExtent, resolution, pixelRatio) {
      var _this = _super.call(this, tolerance, maxExtent, resolution, pixelRatio) || this;
      _this.labels_ = null;
      _this.text_ = "";
      _this.textOffsetX_ = 0;
      _this.textOffsetY_ = 0;
      _this.textRotateWithView_ = void 0;
      _this.textRotation_ = 0;
      _this.textFillState_ = null;
      _this.fillStates = {};
      _this.textStrokeState_ = null;
      _this.strokeStates = {};
      _this.textState_ = /** @type {import("../canvas.js").TextState} */
      {};
      _this.textStates = {};
      _this.textKey_ = "";
      _this.fillKey_ = "";
      _this.strokeKey_ = "";
      _this.declutterImageWithText_ = void 0;
      return _this;
    }
    CanvasTextBuilder2.prototype.finish = function() {
      var instructions = _super.prototype.finish.call(this);
      instructions.textStates = this.textStates;
      instructions.fillStates = this.fillStates;
      instructions.strokeStates = this.strokeStates;
      return instructions;
    };
    CanvasTextBuilder2.prototype.drawText = function(geometry, feature) {
      var fillState = this.textFillState_;
      var strokeState = this.textStrokeState_;
      var textState = this.textState_;
      if (this.text_ === "" || !textState || !fillState && !strokeState) {
        return;
      }
      var coordinates = this.coordinates;
      var begin = coordinates.length;
      var geometryType = geometry.getType();
      var flatCoordinates = null;
      var stride = geometry.getStride();
      if (textState.placement === TextPlacement_default.LINE && (geometryType == GeometryType_default.LINE_STRING || geometryType == GeometryType_default.MULTI_LINE_STRING || geometryType == GeometryType_default.POLYGON || geometryType == GeometryType_default.MULTI_POLYGON)) {
        if (!intersects(this.getBufferedMaxExtent(), geometry.getExtent())) {
          return;
        }
        var ends = void 0;
        flatCoordinates = geometry.getFlatCoordinates();
        if (geometryType == GeometryType_default.LINE_STRING) {
          ends = [flatCoordinates.length];
        } else if (geometryType == GeometryType_default.MULTI_LINE_STRING) {
          ends = /** @type {import("../../geom/MultiLineString.js").default} */
          geometry.getEnds();
        } else if (geometryType == GeometryType_default.POLYGON) {
          ends = /** @type {import("../../geom/Polygon.js").default} */
          geometry.getEnds().slice(0, 1);
        } else if (geometryType == GeometryType_default.MULTI_POLYGON) {
          var endss = (
            /** @type {import("../../geom/MultiPolygon.js").default} */
            geometry.getEndss()
          );
          ends = [];
          for (var i = 0, ii = endss.length; i < ii; ++i) {
            ends.push(endss[i][0]);
          }
        }
        this.beginGeometry(geometry, feature);
        var textAlign = textState.textAlign;
        var flatOffset = 0;
        var flatEnd = void 0;
        for (var o = 0, oo = ends.length; o < oo; ++o) {
          if (textAlign == void 0) {
            var range = matchingChunk(textState.maxAngle, flatCoordinates, flatOffset, ends[o], stride);
            flatOffset = range[0];
            flatEnd = range[1];
          } else {
            flatEnd = ends[o];
          }
          for (var i = flatOffset; i < flatEnd; i += stride) {
            coordinates.push(flatCoordinates[i], flatCoordinates[i + 1]);
          }
          var end = coordinates.length;
          flatOffset = ends[o];
          this.drawChars_(begin, end);
          begin = end;
        }
        this.endGeometry(feature);
      } else {
        var geometryWidths = textState.overflow ? null : [];
        switch (geometryType) {
          case GeometryType_default.POINT:
          case GeometryType_default.MULTI_POINT:
            flatCoordinates = /** @type {import("../../geom/MultiPoint.js").default} */
            geometry.getFlatCoordinates();
            break;
          case GeometryType_default.LINE_STRING:
            flatCoordinates = /** @type {import("../../geom/LineString.js").default} */
            geometry.getFlatMidpoint();
            break;
          case GeometryType_default.CIRCLE:
            flatCoordinates = /** @type {import("../../geom/Circle.js").default} */
            geometry.getCenter();
            break;
          case GeometryType_default.MULTI_LINE_STRING:
            flatCoordinates = /** @type {import("../../geom/MultiLineString.js").default} */
            geometry.getFlatMidpoints();
            stride = 2;
            break;
          case GeometryType_default.POLYGON:
            flatCoordinates = /** @type {import("../../geom/Polygon.js").default} */
            geometry.getFlatInteriorPoint();
            if (!textState.overflow) {
              geometryWidths.push(flatCoordinates[2] / this.resolution);
            }
            stride = 3;
            break;
          case GeometryType_default.MULTI_POLYGON:
            var interiorPoints = (
              /** @type {import("../../geom/MultiPolygon.js").default} */
              geometry.getFlatInteriorPoints()
            );
            flatCoordinates = [];
            for (var i = 0, ii = interiorPoints.length; i < ii; i += 3) {
              if (!textState.overflow) {
                geometryWidths.push(interiorPoints[i + 2] / this.resolution);
              }
              flatCoordinates.push(interiorPoints[i], interiorPoints[i + 1]);
            }
            if (flatCoordinates.length === 0) {
              return;
            }
            stride = 2;
            break;
          default:
        }
        var end = this.appendFlatPointCoordinates(flatCoordinates, stride);
        if (end === begin) {
          return;
        }
        this.saveTextStates_();
        if (textState.backgroundFill || textState.backgroundStroke) {
          this.setFillStrokeStyle(textState.backgroundFill, textState.backgroundStroke);
          if (textState.backgroundFill) {
            this.updateFillStyle(this.state, this.createFill);
            this.hitDetectionInstructions.push(this.createFill(this.state));
          }
          if (textState.backgroundStroke) {
            this.updateStrokeStyle(this.state, this.applyStroke);
            this.hitDetectionInstructions.push(this.createStroke(this.state));
          }
        }
        this.beginGeometry(geometry, feature);
        var padding = textState.padding;
        if (padding != defaultPadding && (textState.scale[0] < 0 || textState.scale[1] < 0)) {
          var p0 = textState.padding[0];
          var p12 = textState.padding[1];
          var p22 = textState.padding[2];
          var p32 = textState.padding[3];
          if (textState.scale[0] < 0) {
            p12 = -p12;
            p32 = -p32;
          }
          if (textState.scale[1] < 0) {
            p0 = -p0;
            p22 = -p22;
          }
          padding = [p0, p12, p22, p32];
        }
        var pixelRatio_1 = this.pixelRatio;
        this.instructions.push([Instruction_default.DRAW_IMAGE, begin, end, null, NaN, NaN, NaN, 1, 0, 0, this.textRotateWithView_, this.textRotation_, [1, 1], NaN, this.declutterImageWithText_, padding == defaultPadding ? defaultPadding : padding.map(function(p) {
          return p * pixelRatio_1;
        }), !!textState.backgroundFill, !!textState.backgroundStroke, this.text_, this.textKey_, this.strokeKey_, this.fillKey_, this.textOffsetX_, this.textOffsetY_, geometryWidths]);
        var scale = 1 / pixelRatio_1;
        this.hitDetectionInstructions.push([Instruction_default.DRAW_IMAGE, begin, end, null, NaN, NaN, NaN, 1, 0, 0, this.textRotateWithView_, this.textRotation_, [scale, scale], NaN, this.declutterImageWithText_, padding, !!textState.backgroundFill, !!textState.backgroundStroke, this.text_, this.textKey_, this.strokeKey_, this.fillKey_, this.textOffsetX_, this.textOffsetY_, geometryWidths]);
        this.endGeometry(feature);
      }
    };
    CanvasTextBuilder2.prototype.saveTextStates_ = function() {
      var strokeState = this.textStrokeState_;
      var textState = this.textState_;
      var fillState = this.textFillState_;
      var strokeKey = this.strokeKey_;
      if (strokeState) {
        if (!(strokeKey in this.strokeStates)) {
          this.strokeStates[strokeKey] = {
            strokeStyle: strokeState.strokeStyle,
            lineCap: strokeState.lineCap,
            lineDashOffset: strokeState.lineDashOffset,
            lineWidth: strokeState.lineWidth,
            lineJoin: strokeState.lineJoin,
            miterLimit: strokeState.miterLimit,
            lineDash: strokeState.lineDash
          };
        }
      }
      var textKey = this.textKey_;
      if (!(textKey in this.textStates)) {
        this.textStates[textKey] = {
          font: textState.font,
          textAlign: textState.textAlign || defaultTextAlign,
          textBaseline: textState.textBaseline || defaultTextBaseline,
          scale: textState.scale
        };
      }
      var fillKey = this.fillKey_;
      if (fillState) {
        if (!(fillKey in this.fillStates)) {
          this.fillStates[fillKey] = {
            fillStyle: fillState.fillStyle
          };
        }
      }
    };
    CanvasTextBuilder2.prototype.drawChars_ = function(begin, end) {
      var strokeState = this.textStrokeState_;
      var textState = this.textState_;
      var strokeKey = this.strokeKey_;
      var textKey = this.textKey_;
      var fillKey = this.fillKey_;
      this.saveTextStates_();
      var pixelRatio = this.pixelRatio;
      var baseline = TEXT_ALIGN[textState.textBaseline];
      var offsetY = this.textOffsetY_ * pixelRatio;
      var text = this.text_;
      var strokeWidth = strokeState ? strokeState.lineWidth * Math.abs(textState.scale[0]) / 2 : 0;
      this.instructions.push([Instruction_default.DRAW_CHARS, begin, end, baseline, textState.overflow, fillKey, textState.maxAngle, pixelRatio, offsetY, strokeKey, strokeWidth * pixelRatio, text, textKey, 1]);
      this.hitDetectionInstructions.push([Instruction_default.DRAW_CHARS, begin, end, baseline, textState.overflow, fillKey, textState.maxAngle, 1, offsetY, strokeKey, strokeWidth, text, textKey, 1 / pixelRatio]);
    };
    CanvasTextBuilder2.prototype.setTextStyle = function(textStyle, opt_sharedData) {
      var textState, fillState, strokeState;
      if (!textStyle) {
        this.text_ = "";
      } else {
        var textFillStyle = textStyle.getFill();
        if (!textFillStyle) {
          fillState = null;
          this.textFillState_ = fillState;
        } else {
          fillState = this.textFillState_;
          if (!fillState) {
            fillState = /** @type {import("../canvas.js").FillState} */
            {};
            this.textFillState_ = fillState;
          }
          fillState.fillStyle = asColorLike(textFillStyle.getColor() || defaultFillStyle);
        }
        var textStrokeStyle = textStyle.getStroke();
        if (!textStrokeStyle) {
          strokeState = null;
          this.textStrokeState_ = strokeState;
        } else {
          strokeState = this.textStrokeState_;
          if (!strokeState) {
            strokeState = /** @type {import("../canvas.js").StrokeState} */
            {};
            this.textStrokeState_ = strokeState;
          }
          var lineDash = textStrokeStyle.getLineDash();
          var lineDashOffset = textStrokeStyle.getLineDashOffset();
          var lineWidth = textStrokeStyle.getWidth();
          var miterLimit = textStrokeStyle.getMiterLimit();
          strokeState.lineCap = textStrokeStyle.getLineCap() || defaultLineCap;
          strokeState.lineDash = lineDash ? lineDash.slice() : defaultLineDash;
          strokeState.lineDashOffset = lineDashOffset === void 0 ? defaultLineDashOffset : lineDashOffset;
          strokeState.lineJoin = textStrokeStyle.getLineJoin() || defaultLineJoin;
          strokeState.lineWidth = lineWidth === void 0 ? defaultLineWidth : lineWidth;
          strokeState.miterLimit = miterLimit === void 0 ? defaultMiterLimit : miterLimit;
          strokeState.strokeStyle = asColorLike(textStrokeStyle.getColor() || defaultStrokeStyle);
        }
        textState = this.textState_;
        var font = textStyle.getFont() || defaultFont;
        registerFont(font);
        var textScale = textStyle.getScaleArray();
        textState.overflow = textStyle.getOverflow();
        textState.font = font;
        textState.maxAngle = textStyle.getMaxAngle();
        textState.placement = textStyle.getPlacement();
        textState.textAlign = textStyle.getTextAlign();
        textState.textBaseline = textStyle.getTextBaseline() || defaultTextBaseline;
        textState.backgroundFill = textStyle.getBackgroundFill();
        textState.backgroundStroke = textStyle.getBackgroundStroke();
        textState.padding = textStyle.getPadding() || defaultPadding;
        textState.scale = textScale === void 0 ? [1, 1] : textScale;
        var textOffsetX = textStyle.getOffsetX();
        var textOffsetY = textStyle.getOffsetY();
        var textRotateWithView = textStyle.getRotateWithView();
        var textRotation = textStyle.getRotation();
        this.text_ = textStyle.getText() || "";
        this.textOffsetX_ = textOffsetX === void 0 ? 0 : textOffsetX;
        this.textOffsetY_ = textOffsetY === void 0 ? 0 : textOffsetY;
        this.textRotateWithView_ = textRotateWithView === void 0 ? false : textRotateWithView;
        this.textRotation_ = textRotation === void 0 ? 0 : textRotation;
        this.strokeKey_ = strokeState ? (typeof strokeState.strokeStyle == "string" ? strokeState.strokeStyle : getUid(strokeState.strokeStyle)) + strokeState.lineCap + strokeState.lineDashOffset + "|" + strokeState.lineWidth + strokeState.lineJoin + strokeState.miterLimit + "[" + strokeState.lineDash.join() + "]" : "";
        this.textKey_ = textState.font + textState.scale + (textState.textAlign || "?") + (textState.textBaseline || "?");
        this.fillKey_ = fillState ? typeof fillState.fillStyle == "string" ? fillState.fillStyle : "|" + getUid(fillState.fillStyle) : "";
      }
      this.declutterImageWithText_ = opt_sharedData;
    };
    return CanvasTextBuilder2;
  }(Builder_default)
);
var TextBuilder_default = CanvasTextBuilder;

// node_modules/ol/render/canvas/BuilderGroup.js
var BATCH_CONSTRUCTORS = {
  "Circle": PolygonBuilder_default,
  "Default": Builder_default,
  "Image": ImageBuilder_default,
  "LineString": LineStringBuilder_default,
  "Polygon": PolygonBuilder_default,
  "Text": TextBuilder_default
};
var BuilderGroup = (
  /** @class */
  function() {
    function BuilderGroup2(tolerance, maxExtent, resolution, pixelRatio) {
      this.tolerance_ = tolerance;
      this.maxExtent_ = maxExtent;
      this.pixelRatio_ = pixelRatio;
      this.resolution_ = resolution;
      this.buildersByZIndex_ = {};
    }
    BuilderGroup2.prototype.finish = function() {
      var builderInstructions = {};
      for (var zKey in this.buildersByZIndex_) {
        builderInstructions[zKey] = builderInstructions[zKey] || {};
        var builders = this.buildersByZIndex_[zKey];
        for (var builderKey in builders) {
          var builderInstruction = builders[builderKey].finish();
          builderInstructions[zKey][builderKey] = builderInstruction;
        }
      }
      return builderInstructions;
    };
    BuilderGroup2.prototype.getBuilder = function(zIndex, builderType) {
      var zIndexKey = zIndex !== void 0 ? zIndex.toString() : "0";
      var replays = this.buildersByZIndex_[zIndexKey];
      if (replays === void 0) {
        replays = {};
        this.buildersByZIndex_[zIndexKey] = replays;
      }
      var replay = replays[builderType];
      if (replay === void 0) {
        var Constructor = BATCH_CONSTRUCTORS[builderType];
        replay = new Constructor(this.tolerance_, this.maxExtent_, this.resolution_, this.pixelRatio_);
        replays[builderType] = replay;
      }
      return replay;
    };
    return BuilderGroup2;
  }()
);
var BuilderGroup_default = BuilderGroup;

// node_modules/ol/render/canvas/BuilderType.js
var BuilderType_default = {
  CIRCLE: "Circle",
  DEFAULT: "Default",
  IMAGE: "Image",
  LINE_STRING: "LineString",
  POLYGON: "Polygon",
  TEXT: "Text"
};

// node_modules/ol/geom/flat/textpath.js
function drawTextOnPath(flatCoordinates, offset, end, stride, text, startM, maxAngle, scale, measureAndCacheTextWidth2, font, cache, rotation) {
  var x2 = flatCoordinates[offset];
  var y2 = flatCoordinates[offset + 1];
  var x1 = 0;
  var y1 = 0;
  var segmentLength = 0;
  var segmentM = 0;
  function advance() {
    x1 = x2;
    y1 = y2;
    offset += stride;
    x2 = flatCoordinates[offset];
    y2 = flatCoordinates[offset + 1];
    segmentM += segmentLength;
    segmentLength = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  }
  do {
    advance();
  } while (offset < end - stride && segmentM + segmentLength < startM);
  var interpolate = (startM - segmentM) / segmentLength;
  var beginX = lerp(x1, x2, interpolate);
  var beginY = lerp(y1, y2, interpolate);
  var startOffset = offset - stride;
  var startLength = segmentM;
  var endM = startM + scale * measureAndCacheTextWidth2(font, text, cache);
  while (offset < end - stride && segmentM + segmentLength < endM) {
    advance();
  }
  interpolate = (endM - segmentM) / segmentLength;
  var endX = lerp(x1, x2, interpolate);
  var endY = lerp(y1, y2, interpolate);
  var reverse;
  if (rotation) {
    var flat = [beginX, beginY, endX, endY];
    rotate(flat, 0, 4, 2, rotation, flat, flat);
    reverse = flat[0] > flat[2];
  } else {
    reverse = beginX > endX;
  }
  var PI = Math.PI;
  var result = [];
  var singleSegment = startOffset + stride === offset;
  offset = startOffset;
  segmentLength = 0;
  segmentM = startLength;
  x2 = flatCoordinates[offset];
  y2 = flatCoordinates[offset + 1];
  if (singleSegment) {
    advance();
    var previousAngle_1 = Math.atan2(y2 - y1, x2 - x1);
    if (reverse) {
      previousAngle_1 += previousAngle_1 > 0 ? -PI : PI;
    }
    var x = (endX + beginX) / 2;
    var y = (endY + beginY) / 2;
    result[0] = [x, y, (endM - startM) / 2, previousAngle_1, text];
    return result;
  }
  var previousAngle;
  for (var i = 0, ii = text.length; i < ii; ) {
    advance();
    var angle = Math.atan2(y2 - y1, x2 - x1);
    if (reverse) {
      angle += angle > 0 ? -PI : PI;
    }
    if (previousAngle !== void 0) {
      var delta = angle - previousAngle;
      delta += delta > PI ? -2 * PI : delta < -PI ? 2 * PI : 0;
      if (Math.abs(delta) > maxAngle) {
        return null;
      }
    }
    previousAngle = angle;
    var iStart = i;
    var charLength = 0;
    for (; i < ii; ++i) {
      var index = reverse ? ii - i - 1 : i;
      var len = scale * measureAndCacheTextWidth2(font, text[index], cache);
      if (offset + stride < end && segmentM + segmentLength < startM + charLength + len / 2) {
        break;
      }
      charLength += len;
    }
    if (i === iStart) {
      continue;
    }
    var chars = reverse ? text.substring(ii - iStart, ii - i) : text.substring(iStart, i);
    interpolate = (startM + charLength / 2 - segmentM) / segmentLength;
    var x = lerp(x1, x2, interpolate);
    var y = lerp(y1, y2, interpolate);
    result.push([x, y, charLength / 2, angle, chars]);
    startM += charLength;
  }
  return result;
}

// node_modules/ol/geom/flat/length.js
function lineStringLength(flatCoordinates, offset, end, stride) {
  var x1 = flatCoordinates[offset];
  var y1 = flatCoordinates[offset + 1];
  var length = 0;
  for (var i = offset + stride; i < end; i += stride) {
    var x2 = flatCoordinates[i];
    var y2 = flatCoordinates[i + 1];
    length += Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    x1 = x2;
    y1 = y2;
  }
  return length;
}

// node_modules/ol/render/canvas/Executor.js
var tmpExtent = createEmpty();
var p1 = [];
var p2 = [];
var p3 = [];
var p4 = [];
function getDeclutterBox(replayImageOrLabelArgs) {
  return replayImageOrLabelArgs[3].declutterBox;
}
var rtlRegEx = new RegExp(
  /* eslint-disable prettier/prettier */
  "[" + String.fromCharCode(1425) + "-" + String.fromCharCode(2303) + String.fromCharCode(64285) + "-" + String.fromCharCode(65023) + String.fromCharCode(65136) + "-" + String.fromCharCode(65276) + String.fromCharCode(67584) + "-" + String.fromCharCode(69631) + String.fromCharCode(124928) + "-" + String.fromCharCode(126975) + "]"
  /* eslint-enable prettier/prettier */
);
function horizontalTextAlign(text, align) {
  if ((align === "start" || align === "end") && !rtlRegEx.test(text)) {
    align = align === "start" ? "left" : "right";
  }
  return TEXT_ALIGN[align];
}
var Executor = (
  /** @class */
  function() {
    function Executor2(resolution, pixelRatio, overlaps, instructions, renderBuffer) {
      this.overlaps = overlaps;
      this.pixelRatio = pixelRatio;
      this.resolution = resolution;
      this.alignFill_;
      this.instructions = instructions.instructions;
      this.coordinates = instructions.coordinates;
      this.coordinateCache_ = {};
      this.renderBuffer_ = renderBuffer;
      this.renderedTransform_ = create();
      this.hitDetectionInstructions = instructions.hitDetectionInstructions;
      this.pixelCoordinates_ = null;
      this.viewRotation_ = 0;
      this.fillStates = instructions.fillStates || {};
      this.strokeStates = instructions.strokeStates || {};
      this.textStates = instructions.textStates || {};
      this.widths_ = {};
      this.labels_ = {};
    }
    Executor2.prototype.createLabel = function(text, textKey, fillKey, strokeKey) {
      var key = text + textKey + fillKey + strokeKey;
      if (this.labels_[key]) {
        return this.labels_[key];
      }
      var strokeState = strokeKey ? this.strokeStates[strokeKey] : null;
      var fillState = fillKey ? this.fillStates[fillKey] : null;
      var textState = this.textStates[textKey];
      var pixelRatio = this.pixelRatio;
      var scale = [textState.scale[0] * pixelRatio, textState.scale[1] * pixelRatio];
      var align = horizontalTextAlign(text, textState.textAlign || defaultTextAlign);
      var strokeWidth = strokeKey && strokeState.lineWidth ? strokeState.lineWidth : 0;
      var lines = text.split("\n");
      var numLines = lines.length;
      var widths = [];
      var width = measureTextWidths(textState.font, lines, widths);
      var lineHeight = measureTextHeight(textState.font);
      var height = lineHeight * numLines;
      var renderWidth = width + strokeWidth;
      var contextInstructions = [];
      var w = (renderWidth + 2) * scale[0];
      var h = (height + strokeWidth) * scale[1];
      var label = {
        width: w < 0 ? Math.floor(w) : Math.ceil(w),
        height: h < 0 ? Math.floor(h) : Math.ceil(h),
        contextInstructions
      };
      if (scale[0] != 1 || scale[1] != 1) {
        contextInstructions.push("scale", scale);
      }
      contextInstructions.push("font", textState.font);
      if (strokeKey) {
        contextInstructions.push("strokeStyle", strokeState.strokeStyle);
        contextInstructions.push("lineWidth", strokeWidth);
        contextInstructions.push("lineCap", strokeState.lineCap);
        contextInstructions.push("lineJoin", strokeState.lineJoin);
        contextInstructions.push("miterLimit", strokeState.miterLimit);
        var Context = WORKER_OFFSCREEN_CANVAS ? OffscreenCanvasRenderingContext2D : CanvasRenderingContext2D;
        if (Context.prototype.setLineDash) {
          contextInstructions.push("setLineDash", [strokeState.lineDash]);
          contextInstructions.push("lineDashOffset", strokeState.lineDashOffset);
        }
      }
      if (fillKey) {
        contextInstructions.push("fillStyle", fillState.fillStyle);
      }
      contextInstructions.push("textBaseline", "middle");
      contextInstructions.push("textAlign", "center");
      var leftRight = 0.5 - align;
      var x = align * renderWidth + leftRight * strokeWidth;
      var i;
      if (strokeKey) {
        for (i = 0; i < numLines; ++i) {
          contextInstructions.push("strokeText", [lines[i], x + leftRight * widths[i], 0.5 * (strokeWidth + lineHeight) + i * lineHeight]);
        }
      }
      if (fillKey) {
        for (i = 0; i < numLines; ++i) {
          contextInstructions.push("fillText", [lines[i], x + leftRight * widths[i], 0.5 * (strokeWidth + lineHeight) + i * lineHeight]);
        }
      }
      this.labels_[key] = label;
      return label;
    };
    Executor2.prototype.replayTextBackground_ = function(context, p12, p22, p32, p42, fillInstruction2, strokeInstruction2) {
      context.beginPath();
      context.moveTo.apply(context, p12);
      context.lineTo.apply(context, p22);
      context.lineTo.apply(context, p32);
      context.lineTo.apply(context, p42);
      context.lineTo.apply(context, p12);
      if (fillInstruction2) {
        this.alignFill_ = /** @type {boolean} */
        fillInstruction2[2];
        this.fill_(context);
      }
      if (strokeInstruction2) {
        this.setStrokeStyle_(
          context,
          /** @type {Array<*>} */
          strokeInstruction2
        );
        context.stroke();
      }
    };
    Executor2.prototype.calculateImageOrLabelDimensions_ = function(sheetWidth, sheetHeight, centerX, centerY, width, height, anchorX, anchorY, originX, originY, rotation, scale, snapToPixel, padding, fillStroke, feature) {
      anchorX *= scale[0];
      anchorY *= scale[1];
      var x = centerX - anchorX;
      var y = centerY - anchorY;
      var w = width + originX > sheetWidth ? sheetWidth - originX : width;
      var h = height + originY > sheetHeight ? sheetHeight - originY : height;
      var boxW = padding[3] + w * scale[0] + padding[1];
      var boxH = padding[0] + h * scale[1] + padding[2];
      var boxX = x - padding[3];
      var boxY = y - padding[0];
      if (fillStroke || rotation !== 0) {
        p1[0] = boxX;
        p4[0] = boxX;
        p1[1] = boxY;
        p2[1] = boxY;
        p2[0] = boxX + boxW;
        p3[0] = p2[0];
        p3[1] = boxY + boxH;
        p4[1] = p3[1];
      }
      var transform;
      if (rotation !== 0) {
        transform = compose(create(), centerX, centerY, 1, 1, rotation, -centerX, -centerY);
        apply(transform, p1);
        apply(transform, p2);
        apply(transform, p3);
        apply(transform, p4);
        createOrUpdate(Math.min(p1[0], p2[0], p3[0], p4[0]), Math.min(p1[1], p2[1], p3[1], p4[1]), Math.max(p1[0], p2[0], p3[0], p4[0]), Math.max(p1[1], p2[1], p3[1], p4[1]), tmpExtent);
      } else {
        createOrUpdate(Math.min(boxX, boxX + boxW), Math.min(boxY, boxY + boxH), Math.max(boxX, boxX + boxW), Math.max(boxY, boxY + boxH), tmpExtent);
      }
      if (snapToPixel) {
        x = Math.round(x);
        y = Math.round(y);
      }
      return {
        drawImageX: x,
        drawImageY: y,
        drawImageW: w,
        drawImageH: h,
        originX,
        originY,
        declutterBox: {
          minX: tmpExtent[0],
          minY: tmpExtent[1],
          maxX: tmpExtent[2],
          maxY: tmpExtent[3],
          value: feature
        },
        canvasTransform: transform,
        scale
      };
    };
    Executor2.prototype.replayImageOrLabel_ = function(context, contextScale, imageOrLabel, dimensions, opacity, fillInstruction2, strokeInstruction2) {
      var fillStroke = !!(fillInstruction2 || strokeInstruction2);
      var box = dimensions.declutterBox;
      var canvas = context.canvas;
      var strokePadding = strokeInstruction2 ? strokeInstruction2[2] * dimensions.scale[0] / 2 : 0;
      var intersects2 = box.minX - strokePadding <= canvas.width / contextScale && box.maxX + strokePadding >= 0 && box.minY - strokePadding <= canvas.height / contextScale && box.maxY + strokePadding >= 0;
      if (intersects2) {
        if (fillStroke) {
          this.replayTextBackground_(
            context,
            p1,
            p2,
            p3,
            p4,
            /** @type {Array<*>} */
            fillInstruction2,
            /** @type {Array<*>} */
            strokeInstruction2
          );
        }
        drawImageOrLabel(context, dimensions.canvasTransform, opacity, imageOrLabel, dimensions.originX, dimensions.originY, dimensions.drawImageW, dimensions.drawImageH, dimensions.drawImageX, dimensions.drawImageY, dimensions.scale);
      }
      return true;
    };
    Executor2.prototype.fill_ = function(context) {
      if (this.alignFill_) {
        var origin_1 = apply(this.renderedTransform_, [0, 0]);
        var repeatSize = 512 * this.pixelRatio;
        context.save();
        context.translate(origin_1[0] % repeatSize, origin_1[1] % repeatSize);
        context.rotate(this.viewRotation_);
      }
      context.fill();
      if (this.alignFill_) {
        context.restore();
      }
    };
    Executor2.prototype.setStrokeStyle_ = function(context, instruction) {
      context["strokeStyle"] = /** @type {import("../../colorlike.js").ColorLike} */
      instruction[1];
      context.lineWidth = /** @type {number} */
      instruction[2];
      context.lineCap = /** @type {CanvasLineCap} */
      instruction[3];
      context.lineJoin = /** @type {CanvasLineJoin} */
      instruction[4];
      context.miterLimit = /** @type {number} */
      instruction[5];
      if (context.setLineDash) {
        context.lineDashOffset = /** @type {number} */
        instruction[7];
        context.setLineDash(
          /** @type {Array<number>} */
          instruction[6]
        );
      }
    };
    Executor2.prototype.drawLabelWithPointPlacement_ = function(text, textKey, strokeKey, fillKey) {
      var textState = this.textStates[textKey];
      var label = this.createLabel(text, textKey, fillKey, strokeKey);
      var strokeState = this.strokeStates[strokeKey];
      var pixelRatio = this.pixelRatio;
      var align = horizontalTextAlign(text, textState.textAlign || defaultTextAlign);
      var baseline = TEXT_ALIGN[textState.textBaseline || defaultTextBaseline];
      var strokeWidth = strokeState && strokeState.lineWidth ? strokeState.lineWidth : 0;
      var width = label.width / pixelRatio - 2 * textState.scale[0];
      var anchorX = align * width + 2 * (0.5 - align) * strokeWidth;
      var anchorY = baseline * label.height / pixelRatio + 2 * (0.5 - baseline) * strokeWidth;
      return {
        label,
        anchorX,
        anchorY
      };
    };
    Executor2.prototype.execute_ = function(context, contextScale, transform, instructions, snapToPixel, opt_featureCallback, opt_hitExtent, opt_declutterTree) {
      var pixelCoordinates;
      if (this.pixelCoordinates_ && equals(transform, this.renderedTransform_)) {
        pixelCoordinates = this.pixelCoordinates_;
      } else {
        if (!this.pixelCoordinates_) {
          this.pixelCoordinates_ = [];
        }
        pixelCoordinates = transform2D(this.coordinates, 0, this.coordinates.length, 2, transform, this.pixelCoordinates_);
        setFromArray(this.renderedTransform_, transform);
      }
      var i = 0;
      var ii = instructions.length;
      var d = 0;
      var dd;
      var anchorX, anchorY, prevX, prevY, roundX, roundY, image, text, textKey, strokeKey, fillKey;
      var pendingFill = 0;
      var pendingStroke = 0;
      var lastFillInstruction = null;
      var lastStrokeInstruction = null;
      var coordinateCache = this.coordinateCache_;
      var viewRotation = this.viewRotation_;
      var viewRotationFromTransform = Math.round(Math.atan2(-transform[1], transform[0]) * 1e12) / 1e12;
      var state = (
        /** @type {import("../../render.js").State} */
        {
          context,
          pixelRatio: this.pixelRatio,
          resolution: this.resolution,
          rotation: viewRotation
        }
      );
      var batchSize = this.instructions != instructions || this.overlaps ? 0 : 200;
      var feature;
      var x, y, currentGeometry;
      while (i < ii) {
        var instruction = instructions[i];
        var type = (
          /** @type {import("./Instruction.js").default} */
          instruction[0]
        );
        switch (type) {
          case Instruction_default.BEGIN_GEOMETRY:
            feature = /** @type {import("../../Feature.js").FeatureLike} */
            instruction[1];
            currentGeometry = instruction[3];
            if (!feature.getGeometry()) {
              i = /** @type {number} */
              instruction[2];
            } else if (opt_hitExtent !== void 0 && !intersects(opt_hitExtent, currentGeometry.getExtent())) {
              i = /** @type {number} */
              instruction[2] + 1;
            } else {
              ++i;
            }
            break;
          case Instruction_default.BEGIN_PATH:
            if (pendingFill > batchSize) {
              this.fill_(context);
              pendingFill = 0;
            }
            if (pendingStroke > batchSize) {
              context.stroke();
              pendingStroke = 0;
            }
            if (!pendingFill && !pendingStroke) {
              context.beginPath();
              prevX = NaN;
              prevY = NaN;
            }
            ++i;
            break;
          case Instruction_default.CIRCLE:
            d = /** @type {number} */
            instruction[1];
            var x1 = pixelCoordinates[d];
            var y1 = pixelCoordinates[d + 1];
            var x2 = pixelCoordinates[d + 2];
            var y2 = pixelCoordinates[d + 3];
            var dx = x2 - x1;
            var dy = y2 - y1;
            var r = Math.sqrt(dx * dx + dy * dy);
            context.moveTo(x1 + r, y1);
            context.arc(x1, y1, r, 0, 2 * Math.PI, true);
            ++i;
            break;
          case Instruction_default.CLOSE_PATH:
            context.closePath();
            ++i;
            break;
          case Instruction_default.CUSTOM:
            d = /** @type {number} */
            instruction[1];
            dd = instruction[2];
            var geometry = (
              /** @type {import("../../geom/SimpleGeometry.js").default} */
              instruction[3]
            );
            var renderer = instruction[4];
            var fn = instruction.length == 6 ? instruction[5] : void 0;
            state.geometry = geometry;
            state.feature = feature;
            if (!(i in coordinateCache)) {
              coordinateCache[i] = [];
            }
            var coords = coordinateCache[i];
            if (fn) {
              fn(pixelCoordinates, d, dd, 2, coords);
            } else {
              coords[0] = pixelCoordinates[d];
              coords[1] = pixelCoordinates[d + 1];
              coords.length = 2;
            }
            renderer(coords, state);
            ++i;
            break;
          case Instruction_default.DRAW_IMAGE:
            d = /** @type {number} */
            instruction[1];
            dd = /** @type {number} */
            instruction[2];
            image = /** @type {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement} */
            instruction[3];
            anchorX = /** @type {number} */
            instruction[4];
            anchorY = /** @type {number} */
            instruction[5];
            var height = (
              /** @type {number} */
              instruction[6]
            );
            var opacity = (
              /** @type {number} */
              instruction[7]
            );
            var originX = (
              /** @type {number} */
              instruction[8]
            );
            var originY = (
              /** @type {number} */
              instruction[9]
            );
            var rotateWithView = (
              /** @type {boolean} */
              instruction[10]
            );
            var rotation = (
              /** @type {number} */
              instruction[11]
            );
            var scale = (
              /** @type {import("../../size.js").Size} */
              instruction[12]
            );
            var width = (
              /** @type {number} */
              instruction[13]
            );
            var declutterImageWithText = (
              /** @type {import("../canvas.js").DeclutterImageWithText} */
              instruction[14]
            );
            if (!image && instruction.length >= 19) {
              text = /** @type {string} */
              instruction[18];
              textKey = /** @type {string} */
              instruction[19];
              strokeKey = /** @type {string} */
              instruction[20];
              fillKey = /** @type {string} */
              instruction[21];
              var labelWithAnchor = this.drawLabelWithPointPlacement_(text, textKey, strokeKey, fillKey);
              image = labelWithAnchor.label;
              instruction[3] = image;
              var textOffsetX = (
                /** @type {number} */
                instruction[22]
              );
              anchorX = (labelWithAnchor.anchorX - textOffsetX) * this.pixelRatio;
              instruction[4] = anchorX;
              var textOffsetY = (
                /** @type {number} */
                instruction[23]
              );
              anchorY = (labelWithAnchor.anchorY - textOffsetY) * this.pixelRatio;
              instruction[5] = anchorY;
              height = image.height;
              instruction[6] = height;
              width = image.width;
              instruction[13] = width;
            }
            var geometryWidths = void 0;
            if (instruction.length > 24) {
              geometryWidths = /** @type {number} */
              instruction[24];
            }
            var padding = void 0, backgroundFill = void 0, backgroundStroke = void 0;
            if (instruction.length > 16) {
              padding = /** @type {Array<number>} */
              instruction[15];
              backgroundFill = /** @type {boolean} */
              instruction[16];
              backgroundStroke = /** @type {boolean} */
              instruction[17];
            } else {
              padding = defaultPadding;
              backgroundFill = false;
              backgroundStroke = false;
            }
            if (rotateWithView && viewRotationFromTransform) {
              rotation += viewRotation;
            } else if (!rotateWithView && !viewRotationFromTransform) {
              rotation -= viewRotation;
            }
            var widthIndex = 0;
            for (; d < dd; d += 2) {
              if (geometryWidths && geometryWidths[widthIndex++] < width / this.pixelRatio) {
                continue;
              }
              var dimensions = this.calculateImageOrLabelDimensions_(image.width, image.height, pixelCoordinates[d], pixelCoordinates[d + 1], width, height, anchorX, anchorY, originX, originY, rotation, scale, snapToPixel, padding, backgroundFill || backgroundStroke, feature);
              var args = [context, contextScale, image, dimensions, opacity, backgroundFill ? (
                /** @type {Array<*>} */
                lastFillInstruction
              ) : null, backgroundStroke ? (
                /** @type {Array<*>} */
                lastStrokeInstruction
              ) : null];
              var imageArgs = void 0;
              var imageDeclutterBox = void 0;
              if (opt_declutterTree && declutterImageWithText) {
                if (!declutterImageWithText[d]) {
                  declutterImageWithText[d] = args;
                  continue;
                }
                imageArgs = declutterImageWithText[d];
                delete declutterImageWithText[d];
                imageDeclutterBox = getDeclutterBox(imageArgs);
                if (opt_declutterTree.collides(imageDeclutterBox)) {
                  continue;
                }
              }
              if (opt_declutterTree && opt_declutterTree.collides(dimensions.declutterBox)) {
                continue;
              }
              if (imageArgs) {
                if (opt_declutterTree) {
                  opt_declutterTree.insert(imageDeclutterBox);
                }
                this.replayImageOrLabel_.apply(this, imageArgs);
              }
              if (opt_declutterTree) {
                opt_declutterTree.insert(dimensions.declutterBox);
              }
              this.replayImageOrLabel_.apply(this, args);
            }
            ++i;
            break;
          case Instruction_default.DRAW_CHARS:
            var begin = (
              /** @type {number} */
              instruction[1]
            );
            var end = (
              /** @type {number} */
              instruction[2]
            );
            var baseline = (
              /** @type {number} */
              instruction[3]
            );
            var overflow = (
              /** @type {number} */
              instruction[4]
            );
            fillKey = /** @type {string} */
            instruction[5];
            var maxAngle = (
              /** @type {number} */
              instruction[6]
            );
            var measurePixelRatio = (
              /** @type {number} */
              instruction[7]
            );
            var offsetY = (
              /** @type {number} */
              instruction[8]
            );
            strokeKey = /** @type {string} */
            instruction[9];
            var strokeWidth = (
              /** @type {number} */
              instruction[10]
            );
            text = /** @type {string} */
            instruction[11];
            textKey = /** @type {string} */
            instruction[12];
            var pixelRatioScale = [
              /** @type {number} */
              instruction[13],
              /** @type {number} */
              instruction[13]
            ];
            var textState = this.textStates[textKey];
            var font = textState.font;
            var textScale = [textState.scale[0] * measurePixelRatio, textState.scale[1] * measurePixelRatio];
            var cachedWidths = void 0;
            if (font in this.widths_) {
              cachedWidths = this.widths_[font];
            } else {
              cachedWidths = {};
              this.widths_[font] = cachedWidths;
            }
            var pathLength = lineStringLength(pixelCoordinates, begin, end, 2);
            var textLength = Math.abs(textScale[0]) * measureAndCacheTextWidth(font, text, cachedWidths);
            if (overflow || textLength <= pathLength) {
              var textAlign = this.textStates[textKey].textAlign;
              var startM = (pathLength - textLength) * TEXT_ALIGN[textAlign];
              var parts = drawTextOnPath(pixelCoordinates, begin, end, 2, text, startM, maxAngle, Math.abs(textScale[0]), measureAndCacheTextWidth, font, cachedWidths, viewRotationFromTransform ? 0 : this.viewRotation_);
              drawChars: if (parts) {
                var replayImageOrLabelArgs = [];
                var c = void 0, cc = void 0, chars = void 0, label = void 0, part = void 0;
                if (strokeKey) {
                  for (c = 0, cc = parts.length; c < cc; ++c) {
                    part = parts[c];
                    chars = /** @type {string} */
                    part[4];
                    label = this.createLabel(chars, textKey, "", strokeKey);
                    anchorX = /** @type {number} */
                    part[2] + (textScale[0] < 0 ? -strokeWidth : strokeWidth);
                    anchorY = baseline * label.height + (0.5 - baseline) * 2 * strokeWidth * textScale[1] / textScale[0] - offsetY;
                    var dimensions = this.calculateImageOrLabelDimensions_(label.width, label.height, part[0], part[1], label.width, label.height, anchorX, anchorY, 0, 0, part[3], pixelRatioScale, false, defaultPadding, false, feature);
                    if (opt_declutterTree && opt_declutterTree.collides(dimensions.declutterBox)) {
                      break drawChars;
                    }
                    replayImageOrLabelArgs.push([context, contextScale, label, dimensions, 1, null, null]);
                  }
                }
                if (fillKey) {
                  for (c = 0, cc = parts.length; c < cc; ++c) {
                    part = parts[c];
                    chars = /** @type {string} */
                    part[4];
                    label = this.createLabel(chars, textKey, fillKey, "");
                    anchorX = /** @type {number} */
                    part[2];
                    anchorY = baseline * label.height - offsetY;
                    var dimensions = this.calculateImageOrLabelDimensions_(label.width, label.height, part[0], part[1], label.width, label.height, anchorX, anchorY, 0, 0, part[3], pixelRatioScale, false, defaultPadding, false, feature);
                    if (opt_declutterTree && opt_declutterTree.collides(dimensions.declutterBox)) {
                      break drawChars;
                    }
                    replayImageOrLabelArgs.push([context, contextScale, label, dimensions, 1, null, null]);
                  }
                }
                if (opt_declutterTree) {
                  opt_declutterTree.load(replayImageOrLabelArgs.map(getDeclutterBox));
                }
                for (var i_1 = 0, ii_1 = replayImageOrLabelArgs.length; i_1 < ii_1; ++i_1) {
                  this.replayImageOrLabel_.apply(this, replayImageOrLabelArgs[i_1]);
                }
              }
            }
            ++i;
            break;
          case Instruction_default.END_GEOMETRY:
            if (opt_featureCallback !== void 0) {
              feature = /** @type {import("../../Feature.js").FeatureLike} */
              instruction[1];
              var result = opt_featureCallback(feature, currentGeometry);
              if (result) {
                return result;
              }
            }
            ++i;
            break;
          case Instruction_default.FILL:
            if (batchSize) {
              pendingFill++;
            } else {
              this.fill_(context);
            }
            ++i;
            break;
          case Instruction_default.MOVE_TO_LINE_TO:
            d = /** @type {number} */
            instruction[1];
            dd = /** @type {number} */
            instruction[2];
            x = pixelCoordinates[d];
            y = pixelCoordinates[d + 1];
            roundX = x + 0.5 | 0;
            roundY = y + 0.5 | 0;
            if (roundX !== prevX || roundY !== prevY) {
              context.moveTo(x, y);
              prevX = roundX;
              prevY = roundY;
            }
            for (d += 2; d < dd; d += 2) {
              x = pixelCoordinates[d];
              y = pixelCoordinates[d + 1];
              roundX = x + 0.5 | 0;
              roundY = y + 0.5 | 0;
              if (d == dd - 2 || roundX !== prevX || roundY !== prevY) {
                context.lineTo(x, y);
                prevX = roundX;
                prevY = roundY;
              }
            }
            ++i;
            break;
          case Instruction_default.SET_FILL_STYLE:
            lastFillInstruction = instruction;
            this.alignFill_ = instruction[2];
            if (pendingFill) {
              this.fill_(context);
              pendingFill = 0;
              if (pendingStroke) {
                context.stroke();
                pendingStroke = 0;
              }
            }
            context.fillStyle = /** @type {import("../../colorlike.js").ColorLike} */
            instruction[1];
            ++i;
            break;
          case Instruction_default.SET_STROKE_STYLE:
            lastStrokeInstruction = instruction;
            if (pendingStroke) {
              context.stroke();
              pendingStroke = 0;
            }
            this.setStrokeStyle_(
              context,
              /** @type {Array<*>} */
              instruction
            );
            ++i;
            break;
          case Instruction_default.STROKE:
            if (batchSize) {
              pendingStroke++;
            } else {
              context.stroke();
            }
            ++i;
            break;
          default:
            ++i;
            break;
        }
      }
      if (pendingFill) {
        this.fill_(context);
      }
      if (pendingStroke) {
        context.stroke();
      }
      return void 0;
    };
    Executor2.prototype.execute = function(context, contextScale, transform, viewRotation, snapToPixel, opt_declutterTree) {
      this.viewRotation_ = viewRotation;
      this.execute_(context, contextScale, transform, this.instructions, snapToPixel, void 0, void 0, opt_declutterTree);
    };
    Executor2.prototype.executeHitDetection = function(context, transform, viewRotation, opt_featureCallback, opt_hitExtent) {
      this.viewRotation_ = viewRotation;
      return this.execute_(context, 1, transform, this.hitDetectionInstructions, true, opt_featureCallback, opt_hitExtent);
    };
    return Executor2;
  }()
);
var Executor_default = Executor;

// node_modules/ol/render/canvas/ExecutorGroup.js
var ORDER = [BuilderType_default.POLYGON, BuilderType_default.CIRCLE, BuilderType_default.LINE_STRING, BuilderType_default.IMAGE, BuilderType_default.TEXT, BuilderType_default.DEFAULT];
var ExecutorGroup = (
  /** @class */
  function() {
    function ExecutorGroup2(maxExtent, resolution, pixelRatio, overlaps, allInstructions, opt_renderBuffer) {
      this.maxExtent_ = maxExtent;
      this.overlaps_ = overlaps;
      this.pixelRatio_ = pixelRatio;
      this.resolution_ = resolution;
      this.renderBuffer_ = opt_renderBuffer;
      this.executorsByZIndex_ = {};
      this.hitDetectionContext_ = null;
      this.hitDetectionTransform_ = create();
      this.createExecutors_(allInstructions);
    }
    ExecutorGroup2.prototype.clip = function(context, transform) {
      var flatClipCoords = this.getClipCoords(transform);
      context.beginPath();
      context.moveTo(flatClipCoords[0], flatClipCoords[1]);
      context.lineTo(flatClipCoords[2], flatClipCoords[3]);
      context.lineTo(flatClipCoords[4], flatClipCoords[5]);
      context.lineTo(flatClipCoords[6], flatClipCoords[7]);
      context.clip();
    };
    ExecutorGroup2.prototype.createExecutors_ = function(allInstructions) {
      for (var zIndex in allInstructions) {
        var executors = this.executorsByZIndex_[zIndex];
        if (executors === void 0) {
          executors = {};
          this.executorsByZIndex_[zIndex] = executors;
        }
        var instructionByZindex = allInstructions[zIndex];
        var renderBuffer = [this.renderBuffer_ || 0, this.renderBuffer_ || 0];
        for (var builderType in instructionByZindex) {
          var instructions = instructionByZindex[builderType];
          executors[builderType] = new Executor_default(this.resolution_, this.pixelRatio_, this.overlaps_, instructions, renderBuffer);
        }
      }
    };
    ExecutorGroup2.prototype.hasExecutors = function(executors) {
      for (var zIndex in this.executorsByZIndex_) {
        var candidates = this.executorsByZIndex_[zIndex];
        for (var i = 0, ii = executors.length; i < ii; ++i) {
          if (executors[i] in candidates) {
            return true;
          }
        }
      }
      return false;
    };
    ExecutorGroup2.prototype.forEachFeatureAtCoordinate = function(coordinate, resolution, rotation, hitTolerance, callback, declutteredFeatures) {
      hitTolerance = Math.round(hitTolerance);
      var contextSize = hitTolerance * 2 + 1;
      var transform = compose(this.hitDetectionTransform_, hitTolerance + 0.5, hitTolerance + 0.5, 1 / resolution, -1 / resolution, -rotation, -coordinate[0], -coordinate[1]);
      var newContext = !this.hitDetectionContext_;
      if (newContext) {
        this.hitDetectionContext_ = createCanvasContext2D(contextSize, contextSize);
      }
      var context = this.hitDetectionContext_;
      if (context.canvas.width !== contextSize || context.canvas.height !== contextSize) {
        context.canvas.width = contextSize;
        context.canvas.height = contextSize;
      } else if (!newContext) {
        context.clearRect(0, 0, contextSize, contextSize);
      }
      var hitExtent;
      if (this.renderBuffer_ !== void 0) {
        hitExtent = createEmpty();
        extendCoordinate(hitExtent, coordinate);
        buffer(hitExtent, resolution * (this.renderBuffer_ + hitTolerance), hitExtent);
      }
      var indexes = getPixelIndexArray(hitTolerance);
      var builderType;
      function featureCallback(feature, geometry) {
        var imageData = context.getImageData(0, 0, contextSize, contextSize).data;
        for (var i_1 = 0, ii = indexes.length; i_1 < ii; i_1++) {
          if (imageData[indexes[i_1]] > 0) {
            if (!declutteredFeatures || builderType !== BuilderType_default.IMAGE && builderType !== BuilderType_default.TEXT || declutteredFeatures.indexOf(feature) !== -1) {
              var idx = (indexes[i_1] - 3) / 4;
              var x = hitTolerance - idx % contextSize;
              var y = hitTolerance - (idx / contextSize | 0);
              var result_1 = callback(feature, geometry, x * x + y * y);
              if (result_1) {
                return result_1;
              }
            }
            context.clearRect(0, 0, contextSize, contextSize);
            break;
          }
        }
        return void 0;
      }
      var zs = Object.keys(this.executorsByZIndex_).map(Number);
      zs.sort(numberSafeCompareFunction);
      var i, j, executors, executor, result;
      for (i = zs.length - 1; i >= 0; --i) {
        var zIndexKey = zs[i].toString();
        executors = this.executorsByZIndex_[zIndexKey];
        for (j = ORDER.length - 1; j >= 0; --j) {
          builderType = ORDER[j];
          executor = executors[builderType];
          if (executor !== void 0) {
            result = executor.executeHitDetection(context, transform, rotation, featureCallback, hitExtent);
            if (result) {
              return result;
            }
          }
        }
      }
      return void 0;
    };
    ExecutorGroup2.prototype.getClipCoords = function(transform) {
      var maxExtent = this.maxExtent_;
      if (!maxExtent) {
        return null;
      }
      var minX = maxExtent[0];
      var minY = maxExtent[1];
      var maxX = maxExtent[2];
      var maxY = maxExtent[3];
      var flatClipCoords = [minX, minY, minX, maxY, maxX, maxY, maxX, minY];
      transform2D(flatClipCoords, 0, 8, 2, transform, flatClipCoords);
      return flatClipCoords;
    };
    ExecutorGroup2.prototype.isEmpty = function() {
      return isEmpty(this.executorsByZIndex_);
    };
    ExecutorGroup2.prototype.execute = function(context, contextScale, transform, viewRotation, snapToPixel, opt_builderTypes, opt_declutterTree) {
      var zs = Object.keys(this.executorsByZIndex_).map(Number);
      zs.sort(numberSafeCompareFunction);
      if (this.maxExtent_) {
        context.save();
        this.clip(context, transform);
      }
      var builderTypes = opt_builderTypes ? opt_builderTypes : ORDER;
      var i, ii, j, jj, replays, replay;
      if (opt_declutterTree) {
        zs.reverse();
      }
      for (i = 0, ii = zs.length; i < ii; ++i) {
        var zIndexKey = zs[i].toString();
        replays = this.executorsByZIndex_[zIndexKey];
        for (j = 0, jj = builderTypes.length; j < jj; ++j) {
          var builderType = builderTypes[j];
          replay = replays[builderType];
          if (replay !== void 0) {
            replay.execute(context, contextScale, transform, viewRotation, snapToPixel, opt_declutterTree);
          }
        }
      }
      if (this.maxExtent_) {
        context.restore();
      }
    };
    return ExecutorGroup2;
  }()
);
var circlePixelIndexArrayCache = {};
function getPixelIndexArray(radius) {
  if (circlePixelIndexArrayCache[radius] !== void 0) {
    return circlePixelIndexArrayCache[radius];
  }
  var size = radius * 2 + 1;
  var maxDistanceSq = radius * radius;
  var distances = new Array(maxDistanceSq + 1);
  for (var i = 0; i <= radius; ++i) {
    for (var j = 0; j <= radius; ++j) {
      var distanceSq = i * i + j * j;
      if (distanceSq > maxDistanceSq) {
        break;
      }
      var distance = distances[distanceSq];
      if (!distance) {
        distance = [];
        distances[distanceSq] = distance;
      }
      distance.push(((radius + i) * size + (radius + j)) * 4 + 3);
      if (i > 0) {
        distance.push(((radius - i) * size + (radius + j)) * 4 + 3);
      }
      if (j > 0) {
        distance.push(((radius + i) * size + (radius - j)) * 4 + 3);
        if (i > 0) {
          distance.push(((radius - i) * size + (radius - j)) * 4 + 3);
        }
      }
    }
  }
  var pixelIndex = [];
  for (var i = 0, ii = distances.length; i < ii; ++i) {
    if (distances[i]) {
      pixelIndex.push.apply(pixelIndex, distances[i]);
    }
  }
  circlePixelIndexArrayCache[radius] = pixelIndex;
  return pixelIndex;
}
var ExecutorGroup_default = ExecutorGroup;

// node_modules/ol/render/canvas/Immediate.js
var __extends7 = /* @__PURE__ */ function() {
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
var CanvasImmediateRenderer = (
  /** @class */
  function(_super) {
    __extends7(CanvasImmediateRenderer2, _super);
    function CanvasImmediateRenderer2(context, pixelRatio, extent, transform, viewRotation, opt_squaredTolerance, opt_userTransform) {
      var _this = _super.call(this) || this;
      _this.context_ = context;
      _this.pixelRatio_ = pixelRatio;
      _this.extent_ = extent;
      _this.transform_ = transform;
      _this.viewRotation_ = viewRotation;
      _this.squaredTolerance_ = opt_squaredTolerance;
      _this.userTransform_ = opt_userTransform;
      _this.contextFillState_ = null;
      _this.contextStrokeState_ = null;
      _this.contextTextState_ = null;
      _this.fillState_ = null;
      _this.strokeState_ = null;
      _this.image_ = null;
      _this.imageAnchorX_ = 0;
      _this.imageAnchorY_ = 0;
      _this.imageHeight_ = 0;
      _this.imageOpacity_ = 0;
      _this.imageOriginX_ = 0;
      _this.imageOriginY_ = 0;
      _this.imageRotateWithView_ = false;
      _this.imageRotation_ = 0;
      _this.imageScale_ = [0, 0];
      _this.imageWidth_ = 0;
      _this.text_ = "";
      _this.textOffsetX_ = 0;
      _this.textOffsetY_ = 0;
      _this.textRotateWithView_ = false;
      _this.textRotation_ = 0;
      _this.textScale_ = [0, 0];
      _this.textFillState_ = null;
      _this.textStrokeState_ = null;
      _this.textState_ = null;
      _this.pixelCoordinates_ = [];
      _this.tmpLocalTransform_ = create();
      return _this;
    }
    CanvasImmediateRenderer2.prototype.drawImages_ = function(flatCoordinates, offset, end, stride) {
      if (!this.image_) {
        return;
      }
      var pixelCoordinates = transform2D(flatCoordinates, offset, end, 2, this.transform_, this.pixelCoordinates_);
      var context = this.context_;
      var localTransform = this.tmpLocalTransform_;
      var alpha = context.globalAlpha;
      if (this.imageOpacity_ != 1) {
        context.globalAlpha = alpha * this.imageOpacity_;
      }
      var rotation = this.imageRotation_;
      if (this.imageRotateWithView_) {
        rotation += this.viewRotation_;
      }
      for (var i = 0, ii = pixelCoordinates.length; i < ii; i += 2) {
        var x = pixelCoordinates[i] - this.imageAnchorX_;
        var y = pixelCoordinates[i + 1] - this.imageAnchorY_;
        if (rotation !== 0 || this.imageScale_[0] != 1 || this.imageScale_[1] != 1) {
          var centerX = x + this.imageAnchorX_;
          var centerY = y + this.imageAnchorY_;
          compose(localTransform, centerX, centerY, 1, 1, rotation, -centerX, -centerY);
          context.setTransform.apply(context, localTransform);
          context.translate(centerX, centerY);
          context.scale(this.imageScale_[0], this.imageScale_[1]);
          context.drawImage(this.image_, this.imageOriginX_, this.imageOriginY_, this.imageWidth_, this.imageHeight_, -this.imageAnchorX_, -this.imageAnchorY_, this.imageWidth_, this.imageHeight_);
          context.setTransform(1, 0, 0, 1, 0, 0);
        } else {
          context.drawImage(this.image_, this.imageOriginX_, this.imageOriginY_, this.imageWidth_, this.imageHeight_, x, y, this.imageWidth_, this.imageHeight_);
        }
      }
      if (this.imageOpacity_ != 1) {
        context.globalAlpha = alpha;
      }
    };
    CanvasImmediateRenderer2.prototype.drawText_ = function(flatCoordinates, offset, end, stride) {
      if (!this.textState_ || this.text_ === "") {
        return;
      }
      if (this.textFillState_) {
        this.setContextFillState_(this.textFillState_);
      }
      if (this.textStrokeState_) {
        this.setContextStrokeState_(this.textStrokeState_);
      }
      this.setContextTextState_(this.textState_);
      var pixelCoordinates = transform2D(flatCoordinates, offset, end, stride, this.transform_, this.pixelCoordinates_);
      var context = this.context_;
      var rotation = this.textRotation_;
      if (this.textRotateWithView_) {
        rotation += this.viewRotation_;
      }
      for (; offset < end; offset += stride) {
        var x = pixelCoordinates[offset] + this.textOffsetX_;
        var y = pixelCoordinates[offset + 1] + this.textOffsetY_;
        if (rotation !== 0 || this.textScale_[0] != 1 || this.textScale_[1] != 1) {
          var localTransform = compose(this.tmpLocalTransform_, x, y, 1, 1, rotation, -x, -y);
          context.setTransform.apply(context, localTransform);
          context.translate(x, y);
          context.scale(this.textScale_[0], this.textScale_[1]);
          if (this.textStrokeState_) {
            context.strokeText(this.text_, 0, 0);
          }
          if (this.textFillState_) {
            context.fillText(this.text_, 0, 0);
          }
          context.setTransform(1, 0, 0, 1, 0, 0);
        } else {
          if (this.textStrokeState_) {
            context.strokeText(this.text_, x, y);
          }
          if (this.textFillState_) {
            context.fillText(this.text_, x, y);
          }
        }
      }
    };
    CanvasImmediateRenderer2.prototype.moveToLineTo_ = function(flatCoordinates, offset, end, stride, close) {
      var context = this.context_;
      var pixelCoordinates = transform2D(flatCoordinates, offset, end, stride, this.transform_, this.pixelCoordinates_);
      context.moveTo(pixelCoordinates[0], pixelCoordinates[1]);
      var length = pixelCoordinates.length;
      if (close) {
        length -= 2;
      }
      for (var i = 2; i < length; i += 2) {
        context.lineTo(pixelCoordinates[i], pixelCoordinates[i + 1]);
      }
      if (close) {
        context.closePath();
      }
      return end;
    };
    CanvasImmediateRenderer2.prototype.drawRings_ = function(flatCoordinates, offset, ends, stride) {
      for (var i = 0, ii = ends.length; i < ii; ++i) {
        offset = this.moveToLineTo_(flatCoordinates, offset, ends[i], stride, true);
      }
      return offset;
    };
    CanvasImmediateRenderer2.prototype.drawCircle = function(geometry) {
      if (!intersects(this.extent_, geometry.getExtent())) {
        return;
      }
      if (this.fillState_ || this.strokeState_) {
        if (this.fillState_) {
          this.setContextFillState_(this.fillState_);
        }
        if (this.strokeState_) {
          this.setContextStrokeState_(this.strokeState_);
        }
        var pixelCoordinates = transformGeom2D(geometry, this.transform_, this.pixelCoordinates_);
        var dx = pixelCoordinates[2] - pixelCoordinates[0];
        var dy = pixelCoordinates[3] - pixelCoordinates[1];
        var radius = Math.sqrt(dx * dx + dy * dy);
        var context = this.context_;
        context.beginPath();
        context.arc(pixelCoordinates[0], pixelCoordinates[1], radius, 0, 2 * Math.PI);
        if (this.fillState_) {
          context.fill();
        }
        if (this.strokeState_) {
          context.stroke();
        }
      }
      if (this.text_ !== "") {
        this.drawText_(geometry.getCenter(), 0, 2, 2);
      }
    };
    CanvasImmediateRenderer2.prototype.setStyle = function(style) {
      this.setFillStrokeStyle(style.getFill(), style.getStroke());
      this.setImageStyle(style.getImage());
      this.setTextStyle(style.getText());
    };
    CanvasImmediateRenderer2.prototype.setTransform = function(transform) {
      this.transform_ = transform;
    };
    CanvasImmediateRenderer2.prototype.drawGeometry = function(geometry) {
      var type = geometry.getType();
      switch (type) {
        case GeometryType_default.POINT:
          this.drawPoint(
            /** @type {import("../../geom/Point.js").default} */
            geometry
          );
          break;
        case GeometryType_default.LINE_STRING:
          this.drawLineString(
            /** @type {import("../../geom/LineString.js").default} */
            geometry
          );
          break;
        case GeometryType_default.POLYGON:
          this.drawPolygon(
            /** @type {import("../../geom/Polygon.js").default} */
            geometry
          );
          break;
        case GeometryType_default.MULTI_POINT:
          this.drawMultiPoint(
            /** @type {import("../../geom/MultiPoint.js").default} */
            geometry
          );
          break;
        case GeometryType_default.MULTI_LINE_STRING:
          this.drawMultiLineString(
            /** @type {import("../../geom/MultiLineString.js").default} */
            geometry
          );
          break;
        case GeometryType_default.MULTI_POLYGON:
          this.drawMultiPolygon(
            /** @type {import("../../geom/MultiPolygon.js").default} */
            geometry
          );
          break;
        case GeometryType_default.GEOMETRY_COLLECTION:
          this.drawGeometryCollection(
            /** @type {import("../../geom/GeometryCollection.js").default} */
            geometry
          );
          break;
        case GeometryType_default.CIRCLE:
          this.drawCircle(
            /** @type {import("../../geom/Circle.js").default} */
            geometry
          );
          break;
        default:
      }
    };
    CanvasImmediateRenderer2.prototype.drawFeature = function(feature, style) {
      var geometry = style.getGeometryFunction()(feature);
      if (!geometry || !intersects(this.extent_, geometry.getExtent())) {
        return;
      }
      this.setStyle(style);
      this.drawGeometry(geometry);
    };
    CanvasImmediateRenderer2.prototype.drawGeometryCollection = function(geometry) {
      var geometries = geometry.getGeometriesArray();
      for (var i = 0, ii = geometries.length; i < ii; ++i) {
        this.drawGeometry(geometries[i]);
      }
    };
    CanvasImmediateRenderer2.prototype.drawPoint = function(geometry) {
      if (this.squaredTolerance_) {
        geometry = /** @type {import("../../geom/Point.js").default} */
        geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
      }
      var flatCoordinates = geometry.getFlatCoordinates();
      var stride = geometry.getStride();
      if (this.image_) {
        this.drawImages_(flatCoordinates, 0, flatCoordinates.length, stride);
      }
      if (this.text_ !== "") {
        this.drawText_(flatCoordinates, 0, flatCoordinates.length, stride);
      }
    };
    CanvasImmediateRenderer2.prototype.drawMultiPoint = function(geometry) {
      if (this.squaredTolerance_) {
        geometry = /** @type {import("../../geom/MultiPoint.js").default} */
        geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
      }
      var flatCoordinates = geometry.getFlatCoordinates();
      var stride = geometry.getStride();
      if (this.image_) {
        this.drawImages_(flatCoordinates, 0, flatCoordinates.length, stride);
      }
      if (this.text_ !== "") {
        this.drawText_(flatCoordinates, 0, flatCoordinates.length, stride);
      }
    };
    CanvasImmediateRenderer2.prototype.drawLineString = function(geometry) {
      if (this.squaredTolerance_) {
        geometry = /** @type {import("../../geom/LineString.js").default} */
        geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
      }
      if (!intersects(this.extent_, geometry.getExtent())) {
        return;
      }
      if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
        var context = this.context_;
        var flatCoordinates = geometry.getFlatCoordinates();
        context.beginPath();
        this.moveToLineTo_(flatCoordinates, 0, flatCoordinates.length, geometry.getStride(), false);
        context.stroke();
      }
      if (this.text_ !== "") {
        var flatMidpoint = geometry.getFlatMidpoint();
        this.drawText_(flatMidpoint, 0, 2, 2);
      }
    };
    CanvasImmediateRenderer2.prototype.drawMultiLineString = function(geometry) {
      if (this.squaredTolerance_) {
        geometry = /** @type {import("../../geom/MultiLineString.js").default} */
        geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
      }
      var geometryExtent = geometry.getExtent();
      if (!intersects(this.extent_, geometryExtent)) {
        return;
      }
      if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
        var context = this.context_;
        var flatCoordinates = geometry.getFlatCoordinates();
        var offset = 0;
        var ends = (
          /** @type {Array<number>} */
          geometry.getEnds()
        );
        var stride = geometry.getStride();
        context.beginPath();
        for (var i = 0, ii = ends.length; i < ii; ++i) {
          offset = this.moveToLineTo_(flatCoordinates, offset, ends[i], stride, false);
        }
        context.stroke();
      }
      if (this.text_ !== "") {
        var flatMidpoints = geometry.getFlatMidpoints();
        this.drawText_(flatMidpoints, 0, flatMidpoints.length, 2);
      }
    };
    CanvasImmediateRenderer2.prototype.drawPolygon = function(geometry) {
      if (this.squaredTolerance_) {
        geometry = /** @type {import("../../geom/Polygon.js").default} */
        geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
      }
      if (!intersects(this.extent_, geometry.getExtent())) {
        return;
      }
      if (this.strokeState_ || this.fillState_) {
        if (this.fillState_) {
          this.setContextFillState_(this.fillState_);
        }
        if (this.strokeState_) {
          this.setContextStrokeState_(this.strokeState_);
        }
        var context = this.context_;
        context.beginPath();
        this.drawRings_(
          geometry.getOrientedFlatCoordinates(),
          0,
          /** @type {Array<number>} */
          geometry.getEnds(),
          geometry.getStride()
        );
        if (this.fillState_) {
          context.fill();
        }
        if (this.strokeState_) {
          context.stroke();
        }
      }
      if (this.text_ !== "") {
        var flatInteriorPoint = geometry.getFlatInteriorPoint();
        this.drawText_(flatInteriorPoint, 0, 2, 2);
      }
    };
    CanvasImmediateRenderer2.prototype.drawMultiPolygon = function(geometry) {
      if (this.squaredTolerance_) {
        geometry = /** @type {import("../../geom/MultiPolygon.js").default} */
        geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
      }
      if (!intersects(this.extent_, geometry.getExtent())) {
        return;
      }
      if (this.strokeState_ || this.fillState_) {
        if (this.fillState_) {
          this.setContextFillState_(this.fillState_);
        }
        if (this.strokeState_) {
          this.setContextStrokeState_(this.strokeState_);
        }
        var context = this.context_;
        var flatCoordinates = geometry.getOrientedFlatCoordinates();
        var offset = 0;
        var endss = geometry.getEndss();
        var stride = geometry.getStride();
        context.beginPath();
        for (var i = 0, ii = endss.length; i < ii; ++i) {
          var ends = endss[i];
          offset = this.drawRings_(flatCoordinates, offset, ends, stride);
        }
        if (this.fillState_) {
          context.fill();
        }
        if (this.strokeState_) {
          context.stroke();
        }
      }
      if (this.text_ !== "") {
        var flatInteriorPoints = geometry.getFlatInteriorPoints();
        this.drawText_(flatInteriorPoints, 0, flatInteriorPoints.length, 2);
      }
    };
    CanvasImmediateRenderer2.prototype.setContextFillState_ = function(fillState) {
      var context = this.context_;
      var contextFillState = this.contextFillState_;
      if (!contextFillState) {
        context.fillStyle = fillState.fillStyle;
        this.contextFillState_ = {
          fillStyle: fillState.fillStyle
        };
      } else {
        if (contextFillState.fillStyle != fillState.fillStyle) {
          contextFillState.fillStyle = fillState.fillStyle;
          context.fillStyle = fillState.fillStyle;
        }
      }
    };
    CanvasImmediateRenderer2.prototype.setContextStrokeState_ = function(strokeState) {
      var context = this.context_;
      var contextStrokeState = this.contextStrokeState_;
      if (!contextStrokeState) {
        context.lineCap = strokeState.lineCap;
        if (context.setLineDash) {
          context.setLineDash(strokeState.lineDash);
          context.lineDashOffset = strokeState.lineDashOffset;
        }
        context.lineJoin = strokeState.lineJoin;
        context.lineWidth = strokeState.lineWidth;
        context.miterLimit = strokeState.miterLimit;
        context.strokeStyle = strokeState.strokeStyle;
        this.contextStrokeState_ = {
          lineCap: strokeState.lineCap,
          lineDash: strokeState.lineDash,
          lineDashOffset: strokeState.lineDashOffset,
          lineJoin: strokeState.lineJoin,
          lineWidth: strokeState.lineWidth,
          miterLimit: strokeState.miterLimit,
          strokeStyle: strokeState.strokeStyle
        };
      } else {
        if (contextStrokeState.lineCap != strokeState.lineCap) {
          contextStrokeState.lineCap = strokeState.lineCap;
          context.lineCap = strokeState.lineCap;
        }
        if (context.setLineDash) {
          if (!equals(contextStrokeState.lineDash, strokeState.lineDash)) {
            context.setLineDash(contextStrokeState.lineDash = strokeState.lineDash);
          }
          if (contextStrokeState.lineDashOffset != strokeState.lineDashOffset) {
            contextStrokeState.lineDashOffset = strokeState.lineDashOffset;
            context.lineDashOffset = strokeState.lineDashOffset;
          }
        }
        if (contextStrokeState.lineJoin != strokeState.lineJoin) {
          contextStrokeState.lineJoin = strokeState.lineJoin;
          context.lineJoin = strokeState.lineJoin;
        }
        if (contextStrokeState.lineWidth != strokeState.lineWidth) {
          contextStrokeState.lineWidth = strokeState.lineWidth;
          context.lineWidth = strokeState.lineWidth;
        }
        if (contextStrokeState.miterLimit != strokeState.miterLimit) {
          contextStrokeState.miterLimit = strokeState.miterLimit;
          context.miterLimit = strokeState.miterLimit;
        }
        if (contextStrokeState.strokeStyle != strokeState.strokeStyle) {
          contextStrokeState.strokeStyle = strokeState.strokeStyle;
          context.strokeStyle = strokeState.strokeStyle;
        }
      }
    };
    CanvasImmediateRenderer2.prototype.setContextTextState_ = function(textState) {
      var context = this.context_;
      var contextTextState = this.contextTextState_;
      var textAlign = textState.textAlign ? textState.textAlign : defaultTextAlign;
      if (!contextTextState) {
        context.font = textState.font;
        context.textAlign = /** @type {CanvasTextAlign} */
        textAlign;
        context.textBaseline = /** @type {CanvasTextBaseline} */
        textState.textBaseline;
        this.contextTextState_ = {
          font: textState.font,
          textAlign,
          textBaseline: textState.textBaseline
        };
      } else {
        if (contextTextState.font != textState.font) {
          contextTextState.font = textState.font;
          context.font = textState.font;
        }
        if (contextTextState.textAlign != textAlign) {
          contextTextState.textAlign = /** @type {CanvasTextAlign} */
          textAlign;
          context.textAlign = /** @type {CanvasTextAlign} */
          textAlign;
        }
        if (contextTextState.textBaseline != textState.textBaseline) {
          contextTextState.textBaseline = /** @type {CanvasTextBaseline} */
          textState.textBaseline;
          context.textBaseline = /** @type {CanvasTextBaseline} */
          textState.textBaseline;
        }
      }
    };
    CanvasImmediateRenderer2.prototype.setFillStrokeStyle = function(fillStyle, strokeStyle) {
      if (!fillStyle) {
        this.fillState_ = null;
      } else {
        var fillStyleColor = fillStyle.getColor();
        this.fillState_ = {
          fillStyle: asColorLike(fillStyleColor ? fillStyleColor : defaultFillStyle)
        };
      }
      if (!strokeStyle) {
        this.strokeState_ = null;
      } else {
        var strokeStyleColor = strokeStyle.getColor();
        var strokeStyleLineCap = strokeStyle.getLineCap();
        var strokeStyleLineDash = strokeStyle.getLineDash();
        var strokeStyleLineDashOffset = strokeStyle.getLineDashOffset();
        var strokeStyleLineJoin = strokeStyle.getLineJoin();
        var strokeStyleWidth = strokeStyle.getWidth();
        var strokeStyleMiterLimit = strokeStyle.getMiterLimit();
        this.strokeState_ = {
          lineCap: strokeStyleLineCap !== void 0 ? strokeStyleLineCap : defaultLineCap,
          lineDash: strokeStyleLineDash ? strokeStyleLineDash : defaultLineDash,
          lineDashOffset: strokeStyleLineDashOffset ? strokeStyleLineDashOffset : defaultLineDashOffset,
          lineJoin: strokeStyleLineJoin !== void 0 ? strokeStyleLineJoin : defaultLineJoin,
          lineWidth: this.pixelRatio_ * (strokeStyleWidth !== void 0 ? strokeStyleWidth : defaultLineWidth),
          miterLimit: strokeStyleMiterLimit !== void 0 ? strokeStyleMiterLimit : defaultMiterLimit,
          strokeStyle: asColorLike(strokeStyleColor ? strokeStyleColor : defaultStrokeStyle)
        };
      }
    };
    CanvasImmediateRenderer2.prototype.setImageStyle = function(imageStyle) {
      if (!imageStyle) {
        this.image_ = null;
      } else {
        var imageSize = imageStyle.getSize();
        if (!imageSize) {
          this.image_ = null;
        } else {
          var imageAnchor = imageStyle.getAnchor();
          var imageImage = imageStyle.getImage(1);
          var imageOrigin = imageStyle.getOrigin();
          var imageScale = imageStyle.getScaleArray();
          this.imageAnchorX_ = imageAnchor[0];
          this.imageAnchorY_ = imageAnchor[1];
          this.imageHeight_ = imageSize[1];
          this.image_ = imageImage;
          this.imageOpacity_ = imageStyle.getOpacity();
          this.imageOriginX_ = imageOrigin[0];
          this.imageOriginY_ = imageOrigin[1];
          this.imageRotateWithView_ = imageStyle.getRotateWithView();
          this.imageRotation_ = imageStyle.getRotation();
          this.imageScale_ = [this.pixelRatio_ * imageScale[0], this.pixelRatio_ * imageScale[1]];
          this.imageWidth_ = imageSize[0];
        }
      }
    };
    CanvasImmediateRenderer2.prototype.setTextStyle = function(textStyle) {
      if (!textStyle) {
        this.text_ = "";
      } else {
        var textFillStyle = textStyle.getFill();
        if (!textFillStyle) {
          this.textFillState_ = null;
        } else {
          var textFillStyleColor = textFillStyle.getColor();
          this.textFillState_ = {
            fillStyle: asColorLike(textFillStyleColor ? textFillStyleColor : defaultFillStyle)
          };
        }
        var textStrokeStyle = textStyle.getStroke();
        if (!textStrokeStyle) {
          this.textStrokeState_ = null;
        } else {
          var textStrokeStyleColor = textStrokeStyle.getColor();
          var textStrokeStyleLineCap = textStrokeStyle.getLineCap();
          var textStrokeStyleLineDash = textStrokeStyle.getLineDash();
          var textStrokeStyleLineDashOffset = textStrokeStyle.getLineDashOffset();
          var textStrokeStyleLineJoin = textStrokeStyle.getLineJoin();
          var textStrokeStyleWidth = textStrokeStyle.getWidth();
          var textStrokeStyleMiterLimit = textStrokeStyle.getMiterLimit();
          this.textStrokeState_ = {
            lineCap: textStrokeStyleLineCap !== void 0 ? textStrokeStyleLineCap : defaultLineCap,
            lineDash: textStrokeStyleLineDash ? textStrokeStyleLineDash : defaultLineDash,
            lineDashOffset: textStrokeStyleLineDashOffset ? textStrokeStyleLineDashOffset : defaultLineDashOffset,
            lineJoin: textStrokeStyleLineJoin !== void 0 ? textStrokeStyleLineJoin : defaultLineJoin,
            lineWidth: textStrokeStyleWidth !== void 0 ? textStrokeStyleWidth : defaultLineWidth,
            miterLimit: textStrokeStyleMiterLimit !== void 0 ? textStrokeStyleMiterLimit : defaultMiterLimit,
            strokeStyle: asColorLike(textStrokeStyleColor ? textStrokeStyleColor : defaultStrokeStyle)
          };
        }
        var textFont = textStyle.getFont();
        var textOffsetX = textStyle.getOffsetX();
        var textOffsetY = textStyle.getOffsetY();
        var textRotateWithView = textStyle.getRotateWithView();
        var textRotation = textStyle.getRotation();
        var textScale = textStyle.getScaleArray();
        var textText = textStyle.getText();
        var textTextAlign = textStyle.getTextAlign();
        var textTextBaseline = textStyle.getTextBaseline();
        this.textState_ = {
          font: textFont !== void 0 ? textFont : defaultFont,
          textAlign: textTextAlign !== void 0 ? textTextAlign : defaultTextAlign,
          textBaseline: textTextBaseline !== void 0 ? textTextBaseline : defaultTextBaseline
        };
        this.text_ = textText !== void 0 ? textText : "";
        this.textOffsetX_ = textOffsetX !== void 0 ? this.pixelRatio_ * textOffsetX : 0;
        this.textOffsetY_ = textOffsetY !== void 0 ? this.pixelRatio_ * textOffsetY : 0;
        this.textRotateWithView_ = textRotateWithView !== void 0 ? textRotateWithView : false;
        this.textRotation_ = textRotation !== void 0 ? textRotation : 0;
        this.textScale_ = [this.pixelRatio_ * textScale[0], this.pixelRatio_ * textScale[1]];
      }
    };
    return CanvasImmediateRenderer2;
  }(VectorContext_default)
);
var Immediate_default = CanvasImmediateRenderer;

// node_modules/ol/render/canvas/hitdetect.js
function createHitDetectionImageData(size, transforms, features, styleFunction, extent, resolution, rotation) {
  var width = size[0] / 2;
  var height = size[1] / 2;
  var context = createCanvasContext2D(width, height);
  context.imageSmoothingEnabled = false;
  var canvas = context.canvas;
  var renderer = new Immediate_default(context, 0.5, extent, null, rotation);
  var featureCount = features.length;
  var indexFactor = Math.floor((256 * 256 * 256 - 1) / featureCount);
  var featuresByZIndex = {};
  for (var i = 1; i <= featureCount; ++i) {
    var feature = features[i - 1];
    var featureStyleFunction = feature.getStyleFunction() || styleFunction;
    if (!styleFunction) {
      continue;
    }
    var styles = featureStyleFunction(feature, resolution);
    if (!styles) {
      continue;
    }
    if (!Array.isArray(styles)) {
      styles = [styles];
    }
    var index = i * indexFactor;
    var color = "#" + ("000000" + index.toString(16)).slice(-6);
    for (var j = 0, jj = styles.length; j < jj; ++j) {
      var originalStyle = styles[j];
      var style = originalStyle.clone();
      var fill = style.getFill();
      if (fill) {
        fill.setColor(color);
      }
      var stroke = style.getStroke();
      if (stroke) {
        stroke.setColor(color);
      }
      style.setText(void 0);
      var image = originalStyle.getImage();
      if (image) {
        var imgSize = image.getImageSize();
        if (!imgSize) {
          continue;
        }
        var canvas_1 = document.createElement("canvas");
        canvas_1.width = imgSize[0];
        canvas_1.height = imgSize[1];
        var imgContext = canvas_1.getContext("2d", {
          alpha: false
        });
        imgContext.fillStyle = color;
        var img = imgContext.canvas;
        imgContext.fillRect(0, 0, img.width, img.height);
        var width_1 = imgSize ? imgSize[0] : img.width;
        var height_1 = imgSize ? imgSize[1] : img.height;
        var iconContext = createCanvasContext2D(width_1, height_1);
        iconContext.drawImage(img, 0, 0);
        style.setImage(new Icon_default({
          img,
          imgSize,
          anchor: image.getAnchor(),
          anchorXUnits: IconAnchorUnits_default.PIXELS,
          anchorYUnits: IconAnchorUnits_default.PIXELS,
          offset: image.getOrigin(),
          size: image.getSize(),
          opacity: image.getOpacity(),
          scale: image.getScale(),
          rotation: image.getRotation(),
          rotateWithView: image.getRotateWithView()
        }));
      }
      var zIndex = Number(style.getZIndex());
      var byGeometryType = featuresByZIndex[zIndex];
      if (!byGeometryType) {
        byGeometryType = {};
        featuresByZIndex[zIndex] = byGeometryType;
        byGeometryType[GeometryType_default.POLYGON] = [];
        byGeometryType[GeometryType_default.CIRCLE] = [];
        byGeometryType[GeometryType_default.LINE_STRING] = [];
        byGeometryType[GeometryType_default.POINT] = [];
      }
      var geometry = style.getGeometryFunction()(feature);
      if (geometry && intersects(extent, geometry.getExtent())) {
        byGeometryType[geometry.getType().replace("Multi", "")].push(geometry, style);
      }
    }
  }
  var zIndexKeys = Object.keys(featuresByZIndex).map(Number).sort(numberSafeCompareFunction);
  for (var i = 0, ii = zIndexKeys.length; i < ii; ++i) {
    var byGeometryType = featuresByZIndex[zIndexKeys[i]];
    for (var type in byGeometryType) {
      var geomAndStyle = byGeometryType[type];
      for (var j = 0, jj = geomAndStyle.length; j < jj; j += 2) {
        renderer.setStyle(geomAndStyle[j + 1]);
        for (var k = 0, kk = transforms.length; k < kk; ++k) {
          renderer.setTransform(transforms[k]);
          renderer.drawGeometry(geomAndStyle[j]);
        }
      }
    }
  }
  return context.getImageData(0, 0, canvas.width, canvas.height);
}
function hitDetect(pixel, features, imageData) {
  var resultFeatures = [];
  if (imageData) {
    var index = (Math.round(pixel[0] / 2) + Math.round(pixel[1] / 2) * imageData.width) * 4;
    var r = imageData.data[index];
    var g = imageData.data[index + 1];
    var b = imageData.data[index + 2];
    var i = b + 256 * (g + 256 * r);
    var indexFactor = Math.floor((256 * 256 * 256 - 1) / features.length);
    if (i && i % indexFactor === 0) {
      resultFeatures.push(features[i / indexFactor - 1]);
    }
  }
  return resultFeatures;
}

// node_modules/ol/renderer/vector.js
var SIMPLIFY_TOLERANCE = 0.5;
var GEOMETRY_RENDERERS = {
  "Point": renderPointGeometry,
  "LineString": renderLineStringGeometry,
  "Polygon": renderPolygonGeometry,
  "MultiPoint": renderMultiPointGeometry,
  "MultiLineString": renderMultiLineStringGeometry,
  "MultiPolygon": renderMultiPolygonGeometry,
  "GeometryCollection": renderGeometryCollectionGeometry,
  "Circle": renderCircleGeometry
};
function defaultOrder(feature1, feature2) {
  return parseInt(getUid(feature1), 10) - parseInt(getUid(feature2), 10);
}
function getSquaredTolerance(resolution, pixelRatio) {
  var tolerance = getTolerance(resolution, pixelRatio);
  return tolerance * tolerance;
}
function getTolerance(resolution, pixelRatio) {
  return SIMPLIFY_TOLERANCE * resolution / pixelRatio;
}
function renderCircleGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
  var fillStyle = style.getFill();
  var strokeStyle = style.getStroke();
  if (fillStyle || strokeStyle) {
    var circleReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType_default.CIRCLE);
    circleReplay.setFillStrokeStyle(fillStyle, strokeStyle);
    circleReplay.drawCircle(geometry, feature);
  }
  var textStyle = style.getText();
  if (textStyle && textStyle.getText()) {
    var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), BuilderType_default.TEXT);
    textReplay.setTextStyle(textStyle);
    textReplay.drawText(geometry, feature);
  }
}
function renderFeature(replayGroup, feature, style, squaredTolerance, listener, opt_transform, opt_declutterBuilderGroup) {
  var loading = false;
  var imageStyle = style.getImage();
  if (imageStyle) {
    var imageState = imageStyle.getImageState();
    if (imageState == ImageState_default.LOADED || imageState == ImageState_default.ERROR) {
      imageStyle.unlistenImageChange(listener);
    } else {
      if (imageState == ImageState_default.IDLE) {
        imageStyle.load();
      }
      imageState = imageStyle.getImageState();
      imageStyle.listenImageChange(listener);
      loading = true;
    }
  }
  renderFeatureInternal(replayGroup, feature, style, squaredTolerance, opt_transform, opt_declutterBuilderGroup);
  return loading;
}
function renderFeatureInternal(replayGroup, feature, style, squaredTolerance, opt_transform, opt_declutterBuilderGroup) {
  var geometry = style.getGeometryFunction()(feature);
  if (!geometry) {
    return;
  }
  var simplifiedGeometry = geometry.simplifyTransformed(squaredTolerance, opt_transform);
  var renderer = style.getRenderer();
  if (renderer) {
    renderGeometry(replayGroup, simplifiedGeometry, style, feature);
  } else {
    var geometryRenderer = GEOMETRY_RENDERERS[simplifiedGeometry.getType()];
    geometryRenderer(replayGroup, simplifiedGeometry, style, feature, opt_declutterBuilderGroup);
  }
}
function renderGeometry(replayGroup, geometry, style, feature) {
  if (geometry.getType() == GeometryType_default.GEOMETRY_COLLECTION) {
    var geometries = (
      /** @type {import("../geom/GeometryCollection.js").default} */
      geometry.getGeometries()
    );
    for (var i = 0, ii = geometries.length; i < ii; ++i) {
      renderGeometry(replayGroup, geometries[i], style, feature);
    }
    return;
  }
  var replay = replayGroup.getBuilder(style.getZIndex(), BuilderType_default.DEFAULT);
  replay.drawCustom(
    /** @type {import("../geom/SimpleGeometry.js").default} */
    geometry,
    feature,
    style.getRenderer()
  );
}
function renderGeometryCollectionGeometry(replayGroup, geometry, style, feature, opt_declutterBuilderGroup) {
  var geometries = geometry.getGeometriesArray();
  var i, ii;
  for (i = 0, ii = geometries.length; i < ii; ++i) {
    var geometryRenderer = GEOMETRY_RENDERERS[geometries[i].getType()];
    geometryRenderer(replayGroup, geometries[i], style, feature, opt_declutterBuilderGroup);
  }
}
function renderLineStringGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
  var strokeStyle = style.getStroke();
  if (strokeStyle) {
    var lineStringReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType_default.LINE_STRING);
    lineStringReplay.setFillStrokeStyle(null, strokeStyle);
    lineStringReplay.drawLineString(geometry, feature);
  }
  var textStyle = style.getText();
  if (textStyle && textStyle.getText()) {
    var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), BuilderType_default.TEXT);
    textReplay.setTextStyle(textStyle);
    textReplay.drawText(geometry, feature);
  }
}
function renderMultiLineStringGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
  var strokeStyle = style.getStroke();
  if (strokeStyle) {
    var lineStringReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType_default.LINE_STRING);
    lineStringReplay.setFillStrokeStyle(null, strokeStyle);
    lineStringReplay.drawMultiLineString(geometry, feature);
  }
  var textStyle = style.getText();
  if (textStyle && textStyle.getText()) {
    var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), BuilderType_default.TEXT);
    textReplay.setTextStyle(textStyle);
    textReplay.drawText(geometry, feature);
  }
}
function renderMultiPolygonGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
  var fillStyle = style.getFill();
  var strokeStyle = style.getStroke();
  if (strokeStyle || fillStyle) {
    var polygonReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType_default.POLYGON);
    polygonReplay.setFillStrokeStyle(fillStyle, strokeStyle);
    polygonReplay.drawMultiPolygon(geometry, feature);
  }
  var textStyle = style.getText();
  if (textStyle && textStyle.getText()) {
    var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), BuilderType_default.TEXT);
    textReplay.setTextStyle(textStyle);
    textReplay.drawText(geometry, feature);
  }
}
function renderPointGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
  var imageStyle = style.getImage();
  var textStyle = style.getText();
  var declutterImageWithText;
  if (opt_declutterBuilderGroup) {
    builderGroup = opt_declutterBuilderGroup;
    declutterImageWithText = imageStyle && textStyle && textStyle.getText() ? {} : void 0;
  }
  if (imageStyle) {
    if (imageStyle.getImageState() != ImageState_default.LOADED) {
      return;
    }
    var imageReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType_default.IMAGE);
    imageReplay.setImageStyle(imageStyle, declutterImageWithText);
    imageReplay.drawPoint(geometry, feature);
  }
  if (textStyle && textStyle.getText()) {
    var textReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType_default.TEXT);
    textReplay.setTextStyle(textStyle, declutterImageWithText);
    textReplay.drawText(geometry, feature);
  }
}
function renderMultiPointGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
  var imageStyle = style.getImage();
  var textStyle = style.getText();
  var declutterImageWithText;
  if (opt_declutterBuilderGroup) {
    builderGroup = opt_declutterBuilderGroup;
    declutterImageWithText = imageStyle && textStyle && textStyle.getText() ? {} : void 0;
  }
  if (imageStyle) {
    if (imageStyle.getImageState() != ImageState_default.LOADED) {
      return;
    }
    var imageReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType_default.IMAGE);
    imageReplay.setImageStyle(imageStyle, declutterImageWithText);
    imageReplay.drawMultiPoint(geometry, feature);
  }
  if (textStyle && textStyle.getText()) {
    var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), BuilderType_default.TEXT);
    textReplay.setTextStyle(textStyle, declutterImageWithText);
    textReplay.drawText(geometry, feature);
  }
}
function renderPolygonGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
  var fillStyle = style.getFill();
  var strokeStyle = style.getStroke();
  if (fillStyle || strokeStyle) {
    var polygonReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType_default.POLYGON);
    polygonReplay.setFillStrokeStyle(fillStyle, strokeStyle);
    polygonReplay.drawPolygon(geometry, feature);
  }
  var textStyle = style.getText();
  if (textStyle && textStyle.getText()) {
    var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), BuilderType_default.TEXT);
    textReplay.setTextStyle(textStyle);
    textReplay.drawText(geometry, feature);
  }
}

// node_modules/ol/renderer/canvas/VectorLayer.js
var __extends8 = /* @__PURE__ */ function() {
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
var CanvasVectorLayerRenderer = (
  /** @class */
  function(_super) {
    __extends8(CanvasVectorLayerRenderer2, _super);
    function CanvasVectorLayerRenderer2(vectorLayer) {
      var _this = _super.call(this, vectorLayer) || this;
      _this.boundHandleStyleImageChange_ = _this.handleStyleImageChange_.bind(_this);
      _this.animatingOrInteracting_;
      _this.dirty_ = false;
      _this.hitDetectionImageData_ = null;
      _this.renderedFeatures_ = null;
      _this.renderedRevision_ = -1;
      _this.renderedResolution_ = NaN;
      _this.renderedExtent_ = createEmpty();
      _this.renderedRotation_;
      _this.renderedCenter_ = null;
      _this.renderedProjection_ = null;
      _this.renderedRenderOrder_ = null;
      _this.replayGroup_ = null;
      _this.replayGroupChanged = true;
      _this.declutterExecutorGroup = null;
      _this.clipping = true;
      return _this;
    }
    CanvasVectorLayerRenderer2.prototype.useContainer = function(target, transform, opacity) {
      if (opacity < 1) {
        target = null;
      }
      _super.prototype.useContainer.call(this, target, transform, opacity);
    };
    CanvasVectorLayerRenderer2.prototype.renderWorlds = function(executorGroup, frameState, opt_declutterTree) {
      var extent = frameState.extent;
      var viewState = frameState.viewState;
      var center = viewState.center;
      var resolution = viewState.resolution;
      var projection = viewState.projection;
      var rotation = viewState.rotation;
      var projectionExtent = projection.getExtent();
      var vectorSource = this.getLayer().getSource();
      var pixelRatio = frameState.pixelRatio;
      var viewHints = frameState.viewHints;
      var snapToPixel = !(viewHints[ViewHint_default.ANIMATING] || viewHints[ViewHint_default.INTERACTING]);
      var context = this.context;
      var width = Math.round(frameState.size[0] * pixelRatio);
      var height = Math.round(frameState.size[1] * pixelRatio);
      var multiWorld = vectorSource.getWrapX() && projection.canWrapX();
      var worldWidth = multiWorld ? getWidth(projectionExtent) : null;
      var endWorld = multiWorld ? Math.ceil((extent[2] - projectionExtent[2]) / worldWidth) + 1 : 1;
      var world = multiWorld ? Math.floor((extent[0] - projectionExtent[0]) / worldWidth) : 0;
      do {
        var transform = this.getRenderTransform(center, resolution, rotation, pixelRatio, width, height, world * worldWidth);
        executorGroup.execute(context, 1, transform, rotation, snapToPixel, void 0, opt_declutterTree);
      } while (++world < endWorld);
    };
    CanvasVectorLayerRenderer2.prototype.renderDeclutter = function(frameState) {
      if (this.declutterExecutorGroup) {
        this.renderWorlds(this.declutterExecutorGroup, frameState, frameState.declutterTree);
      }
    };
    CanvasVectorLayerRenderer2.prototype.renderFrame = function(frameState, target) {
      var pixelRatio = frameState.pixelRatio;
      var layerState = frameState.layerStatesArray[frameState.layerIndex];
      makeScale(this.pixelTransform, 1 / pixelRatio, 1 / pixelRatio);
      makeInverse(this.inversePixelTransform, this.pixelTransform);
      var canvasTransform = toString(this.pixelTransform);
      this.useContainer(target, canvasTransform, layerState.opacity);
      var context = this.context;
      var canvas = context.canvas;
      var replayGroup = this.replayGroup_;
      var declutterExecutorGroup = this.declutterExecutorGroup;
      if ((!replayGroup || replayGroup.isEmpty()) && (!declutterExecutorGroup || declutterExecutorGroup.isEmpty())) {
        if (!this.containerReused && canvas.width > 0) {
          canvas.width = 0;
        }
        return this.container;
      }
      var width = Math.round(frameState.size[0] * pixelRatio);
      var height = Math.round(frameState.size[1] * pixelRatio);
      if (canvas.width != width || canvas.height != height) {
        canvas.width = width;
        canvas.height = height;
        if (canvas.style.transform !== canvasTransform) {
          canvas.style.transform = canvasTransform;
        }
      } else if (!this.containerReused) {
        context.clearRect(0, 0, width, height);
      }
      this.preRender(context, frameState);
      var viewState = frameState.viewState;
      var projection = viewState.projection;
      var clipped = false;
      if (layerState.extent && this.clipping) {
        var layerExtent = fromUserExtent(layerState.extent, projection);
        clipped = !containsExtent(layerExtent, frameState.extent) && intersects(layerExtent, frameState.extent);
        if (clipped) {
          this.clipUnrotated(context, frameState, layerExtent);
        }
      }
      this.renderWorlds(replayGroup, frameState);
      if (clipped) {
        context.restore();
      }
      this.postRender(context, frameState);
      var opacity = layerState.opacity;
      var container = this.container;
      if (opacity !== parseFloat(container.style.opacity)) {
        container.style.opacity = opacity === 1 ? "" : String(opacity);
      }
      if (this.renderedRotation_ !== viewState.rotation) {
        this.renderedRotation_ = viewState.rotation;
        this.hitDetectionImageData_ = null;
      }
      return this.container;
    };
    CanvasVectorLayerRenderer2.prototype.getFeatures = function(pixel) {
      return new Promise(
        /**
         * @param {function(Array<import("../../Feature").default|import("../../render/Feature").default>): void} resolve Resolver function.
         * @this {CanvasVectorLayerRenderer}
         */
        function(resolve) {
          if (!this.hitDetectionImageData_ && !this.animatingOrInteracting_) {
            var size = [this.context.canvas.width, this.context.canvas.height];
            apply(this.pixelTransform, size);
            var center = this.renderedCenter_;
            var resolution = this.renderedResolution_;
            var rotation = this.renderedRotation_;
            var projection = this.renderedProjection_;
            var extent = this.renderedExtent_;
            var layer = this.getLayer();
            var transforms = [];
            var width = size[0] / 2;
            var height = size[1] / 2;
            transforms.push(this.getRenderTransform(center, resolution, rotation, 0.5, width, height, 0).slice());
            var source = layer.getSource();
            var projectionExtent = projection.getExtent();
            if (source.getWrapX() && projection.canWrapX() && !containsExtent(projectionExtent, extent)) {
              var startX = extent[0];
              var worldWidth = getWidth(projectionExtent);
              var world = 0;
              var offsetX = void 0;
              while (startX < projectionExtent[0]) {
                --world;
                offsetX = worldWidth * world;
                transforms.push(this.getRenderTransform(center, resolution, rotation, 0.5, width, height, offsetX).slice());
                startX += worldWidth;
              }
              world = 0;
              startX = extent[2];
              while (startX > projectionExtent[2]) {
                ++world;
                offsetX = worldWidth * world;
                transforms.push(this.getRenderTransform(center, resolution, rotation, 0.5, width, height, offsetX).slice());
                startX -= worldWidth;
              }
            }
            this.hitDetectionImageData_ = createHitDetectionImageData(size, transforms, this.renderedFeatures_, layer.getStyleFunction(), extent, resolution, rotation);
          }
          resolve(hitDetect(pixel, this.renderedFeatures_, this.hitDetectionImageData_));
        }.bind(this)
      );
    };
    CanvasVectorLayerRenderer2.prototype.forEachFeatureAtCoordinate = function(coordinate, frameState, hitTolerance, callback, matches) {
      var _this = this;
      if (!this.replayGroup_) {
        return void 0;
      }
      var resolution = frameState.viewState.resolution;
      var rotation = frameState.viewState.rotation;
      var layer = this.getLayer();
      var features = {};
      var featureCallback = function(feature, geometry, distanceSq) {
        var key = getUid(feature);
        var match = features[key];
        if (!match) {
          if (distanceSq === 0) {
            features[key] = true;
            return callback(feature, layer, geometry);
          }
          matches.push(features[key] = {
            feature,
            layer,
            geometry,
            distanceSq,
            callback
          });
        } else if (match !== true && distanceSq < match.distanceSq) {
          if (distanceSq === 0) {
            features[key] = true;
            matches.splice(matches.lastIndexOf(match), 1);
            return callback(feature, layer, geometry);
          }
          match.geometry = geometry;
          match.distanceSq = distanceSq;
        }
        return void 0;
      };
      var result;
      var executorGroups = [this.replayGroup_];
      if (this.declutterExecutorGroup) {
        executorGroups.push(this.declutterExecutorGroup);
      }
      executorGroups.some(function(executorGroup) {
        return result = executorGroup.forEachFeatureAtCoordinate(coordinate, resolution, rotation, hitTolerance, featureCallback, executorGroup === _this.declutterExecutorGroup ? frameState.declutterTree.all().map(function(item) {
          return item.value;
        }) : null);
      });
      return result;
    };
    CanvasVectorLayerRenderer2.prototype.handleFontsChanged = function() {
      var layer = this.getLayer();
      if (layer.getVisible() && this.replayGroup_) {
        layer.changed();
      }
    };
    CanvasVectorLayerRenderer2.prototype.handleStyleImageChange_ = function(event) {
      this.renderIfReadyAndVisible();
    };
    CanvasVectorLayerRenderer2.prototype.prepareFrame = function(frameState) {
      var vectorLayer = this.getLayer();
      var vectorSource = vectorLayer.getSource();
      if (!vectorSource) {
        return false;
      }
      var animating = frameState.viewHints[ViewHint_default.ANIMATING];
      var interacting = frameState.viewHints[ViewHint_default.INTERACTING];
      var updateWhileAnimating = vectorLayer.getUpdateWhileAnimating();
      var updateWhileInteracting = vectorLayer.getUpdateWhileInteracting();
      if (!this.dirty_ && !updateWhileAnimating && animating || !updateWhileInteracting && interacting) {
        this.animatingOrInteracting_ = true;
        return true;
      }
      this.animatingOrInteracting_ = false;
      var frameStateExtent = frameState.extent;
      var viewState = frameState.viewState;
      var projection = viewState.projection;
      var resolution = viewState.resolution;
      var pixelRatio = frameState.pixelRatio;
      var vectorLayerRevision = vectorLayer.getRevision();
      var vectorLayerRenderBuffer = vectorLayer.getRenderBuffer();
      var vectorLayerRenderOrder = vectorLayer.getRenderOrder();
      if (vectorLayerRenderOrder === void 0) {
        vectorLayerRenderOrder = defaultOrder;
      }
      var center = viewState.center.slice();
      var extent = buffer(frameStateExtent, vectorLayerRenderBuffer * resolution);
      var loadExtents = [extent.slice()];
      var projectionExtent = projection.getExtent();
      if (vectorSource.getWrapX() && projection.canWrapX() && !containsExtent(projectionExtent, frameState.extent)) {
        var worldWidth = getWidth(projectionExtent);
        var gutter = Math.max(getWidth(extent) / 2, worldWidth);
        extent[0] = projectionExtent[0] - gutter;
        extent[2] = projectionExtent[2] + gutter;
        wrapX2(center, projection);
        var loadExtent = wrapX(loadExtents[0], projection);
        if (loadExtent[0] < projectionExtent[0] && loadExtent[2] < projectionExtent[2]) {
          loadExtents.push([loadExtent[0] + worldWidth, loadExtent[1], loadExtent[2] + worldWidth, loadExtent[3]]);
        } else if (loadExtent[0] > projectionExtent[0] && loadExtent[2] > projectionExtent[2]) {
          loadExtents.push([loadExtent[0] - worldWidth, loadExtent[1], loadExtent[2] - worldWidth, loadExtent[3]]);
        }
      }
      if (!this.dirty_ && this.renderedResolution_ == resolution && this.renderedRevision_ == vectorLayerRevision && this.renderedRenderOrder_ == vectorLayerRenderOrder && containsExtent(this.renderedExtent_, extent)) {
        this.replayGroupChanged = false;
        return true;
      }
      this.replayGroup_ = null;
      this.dirty_ = false;
      var replayGroup = new BuilderGroup_default(getTolerance(resolution, pixelRatio), extent, resolution, pixelRatio);
      var declutterBuilderGroup;
      if (this.getLayer().getDeclutter()) {
        declutterBuilderGroup = new BuilderGroup_default(getTolerance(resolution, pixelRatio), extent, resolution, pixelRatio);
      }
      var userProjection = getUserProjection();
      var userTransform;
      if (userProjection) {
        for (var i = 0, ii = loadExtents.length; i < ii; ++i) {
          vectorSource.loadFeatures(toUserExtent(loadExtents[i], projection), resolution, userProjection);
        }
        userTransform = getTransformFromProjections(userProjection, projection);
      } else {
        for (var i = 0, ii = loadExtents.length; i < ii; ++i) {
          vectorSource.loadFeatures(loadExtents[i], resolution, projection);
        }
      }
      var squaredTolerance = getSquaredTolerance(resolution, pixelRatio);
      var render = (
        /**
         * @param {import("../../Feature.js").default} feature Feature.
         * @this {CanvasVectorLayerRenderer}
         */
        function(feature) {
          var styles;
          var styleFunction = feature.getStyleFunction() || vectorLayer.getStyleFunction();
          if (styleFunction) {
            styles = styleFunction(feature, resolution);
          }
          if (styles) {
            var dirty = this.renderFeature(feature, squaredTolerance, styles, replayGroup, userTransform, declutterBuilderGroup);
            this.dirty_ = this.dirty_ || dirty;
          }
        }.bind(this)
      );
      var userExtent = toUserExtent(extent, projection);
      var features = vectorSource.getFeaturesInExtent(userExtent);
      if (vectorLayerRenderOrder) {
        features.sort(vectorLayerRenderOrder);
      }
      for (var i = 0, ii = features.length; i < ii; ++i) {
        render(features[i]);
      }
      this.renderedFeatures_ = features;
      var replayGroupInstructions = replayGroup.finish();
      var executorGroup = new ExecutorGroup_default(extent, resolution, pixelRatio, vectorSource.getOverlaps(), replayGroupInstructions, vectorLayer.getRenderBuffer());
      if (declutterBuilderGroup) {
        this.declutterExecutorGroup = new ExecutorGroup_default(extent, resolution, pixelRatio, vectorSource.getOverlaps(), declutterBuilderGroup.finish(), vectorLayer.getRenderBuffer());
      }
      this.renderedResolution_ = resolution;
      this.renderedRevision_ = vectorLayerRevision;
      this.renderedRenderOrder_ = vectorLayerRenderOrder;
      this.renderedExtent_ = extent;
      this.renderedCenter_ = center;
      this.renderedProjection_ = projection;
      this.replayGroup_ = executorGroup;
      this.hitDetectionImageData_ = null;
      this.replayGroupChanged = true;
      return true;
    };
    CanvasVectorLayerRenderer2.prototype.renderFeature = function(feature, squaredTolerance, styles, builderGroup, opt_transform, opt_declutterBuilderGroup) {
      if (!styles) {
        return false;
      }
      var loading = false;
      if (Array.isArray(styles)) {
        for (var i = 0, ii = styles.length; i < ii; ++i) {
          loading = renderFeature(builderGroup, feature, styles[i], squaredTolerance, this.boundHandleStyleImageChange_, opt_transform, opt_declutterBuilderGroup) || loading;
        }
      } else {
        loading = renderFeature(builderGroup, feature, styles, squaredTolerance, this.boundHandleStyleImageChange_, opt_transform, opt_declutterBuilderGroup);
      }
      return loading;
    };
    return CanvasVectorLayerRenderer2;
  }(Layer_default2)
);
var VectorLayer_default = CanvasVectorLayerRenderer;

// node_modules/ol/layer/Vector.js
var __extends9 = /* @__PURE__ */ function() {
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
var VectorLayer = (
  /** @class */
  function(_super) {
    __extends9(VectorLayer2, _super);
    function VectorLayer2(opt_options) {
      return _super.call(this, opt_options) || this;
    }
    VectorLayer2.prototype.createRenderer = function() {
      return new VectorLayer_default(this);
    };
    return VectorLayer2;
  }(BaseVector_default)
);
var Vector_default = VectorLayer;

export {
  lineStringLength,
  Immediate_default,
  getSquaredTolerance,
  Vector_default
};
//# sourceMappingURL=chunk-UNLO6I66.js.map
