import {
  ImageState_default
} from "./chunk-O4WNZANO.js";
import {
  EventType_default as EventType_default2,
  Event_default
} from "./chunk-NYVFUT5G.js";
import {
  State_default
} from "./chunk-LNJCZJZQ.js";
import {
  rotateAtOffset
} from "./chunk-67PVPDW7.js";
import {
  createCanvasContext2D
} from "./chunk-NUKIIKKO.js";
import {
  apply,
  compose,
  create
} from "./chunk-GAGXBDJ6.js";
import {
  EventType_default,
  Observable_default
} from "./chunk-5ORQIOU2.js";
import {
  abstract,
  containsCoordinate,
  getBottomLeft,
  getBottomRight,
  getTopLeft,
  getTopRight
} from "./chunk-MN23FWKY.js";

// node_modules/ol/renderer/Layer.js
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
var LayerRenderer = (
  /** @class */
  function(_super) {
    __extends(LayerRenderer2, _super);
    function LayerRenderer2(layer) {
      var _this = _super.call(this) || this;
      _this.boundHandleImageChange_ = _this.handleImageChange_.bind(_this);
      _this.layer_ = layer;
      _this.declutterExecutorGroup = null;
      return _this;
    }
    LayerRenderer2.prototype.getFeatures = function(pixel) {
      return abstract();
    };
    LayerRenderer2.prototype.prepareFrame = function(frameState) {
      return abstract();
    };
    LayerRenderer2.prototype.renderFrame = function(frameState, target) {
      return abstract();
    };
    LayerRenderer2.prototype.loadedTileCallback = function(tiles, zoom, tile) {
      if (!tiles[zoom]) {
        tiles[zoom] = {};
      }
      tiles[zoom][tile.tileCoord.toString()] = tile;
      return void 0;
    };
    LayerRenderer2.prototype.createLoadedTileFinder = function(source, projection, tiles) {
      return (
        /**
         * @param {number} zoom Zoom level.
         * @param {import("../TileRange.js").default} tileRange Tile range.
         * @return {boolean} The tile range is fully loaded.
         * @this {LayerRenderer}
         */
        function(zoom, tileRange) {
          var callback = this.loadedTileCallback.bind(this, tiles, zoom);
          return source.forEachLoadedTile(projection, zoom, tileRange, callback);
        }.bind(this)
      );
    };
    LayerRenderer2.prototype.forEachFeatureAtCoordinate = function(coordinate, frameState, hitTolerance, callback, matches) {
      return void 0;
    };
    LayerRenderer2.prototype.getDataAtPixel = function(pixel, frameState, hitTolerance) {
      return abstract();
    };
    LayerRenderer2.prototype.getLayer = function() {
      return this.layer_;
    };
    LayerRenderer2.prototype.handleFontsChanged = function() {
    };
    LayerRenderer2.prototype.handleImageChange_ = function(event) {
      var image = (
        /** @type {import("../Image.js").default} */
        event.target
      );
      if (image.getState() === ImageState_default.LOADED) {
        this.renderIfReadyAndVisible();
      }
    };
    LayerRenderer2.prototype.loadImage = function(image) {
      var imageState = image.getState();
      if (imageState != ImageState_default.LOADED && imageState != ImageState_default.ERROR) {
        image.addEventListener(EventType_default.CHANGE, this.boundHandleImageChange_);
      }
      if (imageState == ImageState_default.IDLE) {
        image.load();
        imageState = image.getState();
      }
      return imageState == ImageState_default.LOADED;
    };
    LayerRenderer2.prototype.renderIfReadyAndVisible = function() {
      var layer = this.getLayer();
      if (layer.getVisible() && layer.getSourceState() == State_default.READY) {
        layer.changed();
      }
    };
    return LayerRenderer2;
  }(Observable_default)
);
var Layer_default = LayerRenderer;

// node_modules/ol/renderer/canvas/Layer.js
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
var CanvasLayerRenderer = (
  /** @class */
  function(_super) {
    __extends2(CanvasLayerRenderer2, _super);
    function CanvasLayerRenderer2(layer) {
      var _this = _super.call(this, layer) || this;
      _this.container = null;
      _this.renderedResolution;
      _this.tempTransform = create();
      _this.pixelTransform = create();
      _this.inversePixelTransform = create();
      _this.context = null;
      _this.containerReused = false;
      return _this;
    }
    CanvasLayerRenderer2.prototype.useContainer = function(target, transform, opacity) {
      var layerClassName = this.getLayer().getClassName();
      var container, context;
      if (target && target.style.opacity === "" && target.className === layerClassName) {
        var canvas = target.firstElementChild;
        if (canvas instanceof HTMLCanvasElement) {
          context = canvas.getContext("2d");
        }
      }
      if (context && (context.canvas.width === 0 || context.canvas.style.transform === transform)) {
        this.container = target;
        this.context = context;
        this.containerReused = true;
      } else if (this.containerReused) {
        this.container = null;
        this.context = null;
        this.containerReused = false;
      }
      if (!this.container) {
        container = document.createElement("div");
        container.className = layerClassName;
        var style = container.style;
        style.position = "absolute";
        style.width = "100%";
        style.height = "100%";
        context = createCanvasContext2D();
        var canvas = context.canvas;
        container.appendChild(canvas);
        style = canvas.style;
        style.position = "absolute";
        style.left = "0";
        style.transformOrigin = "top left";
        this.container = container;
        this.context = context;
      }
    };
    CanvasLayerRenderer2.prototype.clip = function(context, frameState, extent) {
      var pixelRatio = frameState.pixelRatio;
      var halfWidth = frameState.size[0] * pixelRatio / 2;
      var halfHeight = frameState.size[1] * pixelRatio / 2;
      var rotation = frameState.viewState.rotation;
      var topLeft = getTopLeft(extent);
      var topRight = getTopRight(extent);
      var bottomRight = getBottomRight(extent);
      var bottomLeft = getBottomLeft(extent);
      apply(frameState.coordinateToPixelTransform, topLeft);
      apply(frameState.coordinateToPixelTransform, topRight);
      apply(frameState.coordinateToPixelTransform, bottomRight);
      apply(frameState.coordinateToPixelTransform, bottomLeft);
      context.save();
      rotateAtOffset(context, -rotation, halfWidth, halfHeight);
      context.beginPath();
      context.moveTo(topLeft[0] * pixelRatio, topLeft[1] * pixelRatio);
      context.lineTo(topRight[0] * pixelRatio, topRight[1] * pixelRatio);
      context.lineTo(bottomRight[0] * pixelRatio, bottomRight[1] * pixelRatio);
      context.lineTo(bottomLeft[0] * pixelRatio, bottomLeft[1] * pixelRatio);
      context.clip();
      rotateAtOffset(context, rotation, halfWidth, halfHeight);
    };
    CanvasLayerRenderer2.prototype.clipUnrotated = function(context, frameState, extent) {
      var topLeft = getTopLeft(extent);
      var topRight = getTopRight(extent);
      var bottomRight = getBottomRight(extent);
      var bottomLeft = getBottomLeft(extent);
      apply(frameState.coordinateToPixelTransform, topLeft);
      apply(frameState.coordinateToPixelTransform, topRight);
      apply(frameState.coordinateToPixelTransform, bottomRight);
      apply(frameState.coordinateToPixelTransform, bottomLeft);
      var inverted = this.inversePixelTransform;
      apply(inverted, topLeft);
      apply(inverted, topRight);
      apply(inverted, bottomRight);
      apply(inverted, bottomLeft);
      context.save();
      context.beginPath();
      context.moveTo(Math.round(topLeft[0]), Math.round(topLeft[1]));
      context.lineTo(Math.round(topRight[0]), Math.round(topRight[1]));
      context.lineTo(Math.round(bottomRight[0]), Math.round(bottomRight[1]));
      context.lineTo(Math.round(bottomLeft[0]), Math.round(bottomLeft[1]));
      context.clip();
    };
    CanvasLayerRenderer2.prototype.dispatchRenderEvent_ = function(type, context, frameState) {
      var layer = this.getLayer();
      if (layer.hasListener(type)) {
        var event_1 = new Event_default(type, this.inversePixelTransform, frameState, context);
        layer.dispatchEvent(event_1);
      }
    };
    CanvasLayerRenderer2.prototype.preRender = function(context, frameState) {
      this.dispatchRenderEvent_(EventType_default2.PRERENDER, context, frameState);
    };
    CanvasLayerRenderer2.prototype.postRender = function(context, frameState) {
      this.dispatchRenderEvent_(EventType_default2.POSTRENDER, context, frameState);
    };
    CanvasLayerRenderer2.prototype.getRenderTransform = function(center, resolution, rotation, pixelRatio, width, height, offsetX) {
      var dx1 = width / 2;
      var dy1 = height / 2;
      var sx = pixelRatio / resolution;
      var sy = -sx;
      var dx2 = -center[0] + offsetX;
      var dy2 = -center[1];
      return compose(this.tempTransform, dx1, dy1, sx, sy, -rotation, dx2, dy2);
    };
    CanvasLayerRenderer2.prototype.getDataAtPixel = function(pixel, frameState, hitTolerance) {
      var renderPixel = apply(this.inversePixelTransform, pixel.slice());
      var context = this.context;
      var layer = this.getLayer();
      var layerExtent = layer.getExtent();
      if (layerExtent) {
        var renderCoordinate = apply(frameState.pixelToCoordinateTransform, pixel.slice());
        if (!containsCoordinate(layerExtent, renderCoordinate)) {
          return null;
        }
      }
      var data;
      try {
        var x = Math.round(renderPixel[0]);
        var y = Math.round(renderPixel[1]);
        var newCanvas = document.createElement("canvas");
        var newContext = newCanvas.getContext("2d");
        newCanvas.width = 1;
        newCanvas.height = 1;
        newContext.clearRect(0, 0, 1, 1);
        newContext.drawImage(context.canvas, x, y, 1, 1, 0, 0, 1, 1);
        data = newContext.getImageData(0, 0, 1, 1).data;
      } catch (err) {
        if (err.name === "SecurityError") {
          return new Uint8Array();
        }
        return data;
      }
      if (data[3] === 0) {
        return null;
      }
      return data;
    };
    return CanvasLayerRenderer2;
  }(Layer_default)
);
var Layer_default2 = CanvasLayerRenderer;

export {
  Layer_default2 as Layer_default
};
//# sourceMappingURL=chunk-2BYM4VZ2.js.map
