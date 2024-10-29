import {
  TileRange_default
} from "./chunk-UVRH6PWK.js";
import {
  TileState_default
} from "./chunk-D4CEI2RF.js";
import {
  Layer_default as Layer_default2
} from "./chunk-2BYM4VZ2.js";
import "./chunk-O4WNZANO.js";
import {
  Layer_default
} from "./chunk-NYVFUT5G.js";
import "./chunk-LNJCZJZQ.js";
import {
  createTransformString
} from "./chunk-67PVPDW7.js";
import "./chunk-5TINQ75E.js";
import "./chunk-NUKIIKKO.js";
import {
  fromUserExtent
} from "./chunk-7ZC75XQY.js";
import {
  apply,
  compose,
  makeInverse
} from "./chunk-GAGXBDJ6.js";
import "./chunk-5JPMEZLO.js";
import {
  numberSafeCompareFunction
} from "./chunk-5ORQIOU2.js";
import {
  assign,
  createEmpty,
  equals,
  getIntersection,
  getTopLeft,
  getUid
} from "./chunk-MN23FWKY.js";
import "./chunk-R2QGWZ7S.js";

// node_modules/ol/layer/TileProperty.js
var TileProperty_default = {
  PRELOAD: "preload",
  USE_INTERIM_TILES_ON_ERROR: "useInterimTilesOnError"
};

// node_modules/ol/layer/BaseTile.js
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
var BaseTileLayer = (
  /** @class */
  function(_super) {
    __extends(BaseTileLayer2, _super);
    function BaseTileLayer2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      var baseOptions = assign({}, options);
      delete baseOptions.preload;
      delete baseOptions.useInterimTilesOnError;
      _this = _super.call(this, baseOptions) || this;
      _this.setPreload(options.preload !== void 0 ? options.preload : 0);
      _this.setUseInterimTilesOnError(options.useInterimTilesOnError !== void 0 ? options.useInterimTilesOnError : true);
      return _this;
    }
    BaseTileLayer2.prototype.getPreload = function() {
      return (
        /** @type {number} */
        this.get(TileProperty_default.PRELOAD)
      );
    };
    BaseTileLayer2.prototype.setPreload = function(preload) {
      this.set(TileProperty_default.PRELOAD, preload);
    };
    BaseTileLayer2.prototype.getUseInterimTilesOnError = function() {
      return (
        /** @type {boolean} */
        this.get(TileProperty_default.USE_INTERIM_TILES_ON_ERROR)
      );
    };
    BaseTileLayer2.prototype.setUseInterimTilesOnError = function(useInterimTilesOnError) {
      this.set(TileProperty_default.USE_INTERIM_TILES_ON_ERROR, useInterimTilesOnError);
    };
    return BaseTileLayer2;
  }(Layer_default)
);
var BaseTile_default = BaseTileLayer;

// node_modules/ol/renderer/canvas/TileLayer.js
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
var CanvasTileLayerRenderer = (
  /** @class */
  function(_super) {
    __extends2(CanvasTileLayerRenderer2, _super);
    function CanvasTileLayerRenderer2(tileLayer) {
      var _this = _super.call(this, tileLayer) || this;
      _this.extentChanged = true;
      _this.renderedExtent_ = null;
      _this.renderedPixelRatio;
      _this.renderedProjection = null;
      _this.renderedRevision;
      _this.renderedTiles = [];
      _this.newTiles_ = false;
      _this.tmpExtent = createEmpty();
      _this.tmpTileRange_ = new TileRange_default(0, 0, 0, 0);
      return _this;
    }
    CanvasTileLayerRenderer2.prototype.isDrawableTile = function(tile) {
      var tileLayer = this.getLayer();
      var tileState = tile.getState();
      var useInterimTilesOnError = tileLayer.getUseInterimTilesOnError();
      return tileState == TileState_default.LOADED || tileState == TileState_default.EMPTY || tileState == TileState_default.ERROR && !useInterimTilesOnError;
    };
    CanvasTileLayerRenderer2.prototype.getTile = function(z, x, y, frameState) {
      var pixelRatio = frameState.pixelRatio;
      var projection = frameState.viewState.projection;
      var tileLayer = this.getLayer();
      var tileSource = tileLayer.getSource();
      var tile = tileSource.getTile(z, x, y, pixelRatio, projection);
      if (tile.getState() == TileState_default.ERROR) {
        if (!tileLayer.getUseInterimTilesOnError()) {
          tile.setState(TileState_default.LOADED);
        } else if (tileLayer.getPreload() > 0) {
          this.newTiles_ = true;
        }
      }
      if (!this.isDrawableTile(tile)) {
        tile = tile.getInterimTile();
      }
      return tile;
    };
    CanvasTileLayerRenderer2.prototype.loadedTileCallback = function(tiles, zoom, tile) {
      if (this.isDrawableTile(tile)) {
        return _super.prototype.loadedTileCallback.call(this, tiles, zoom, tile);
      }
      return false;
    };
    CanvasTileLayerRenderer2.prototype.prepareFrame = function(frameState) {
      return !!this.getLayer().getSource();
    };
    CanvasTileLayerRenderer2.prototype.renderFrame = function(frameState, target) {
      var layerState = frameState.layerStatesArray[frameState.layerIndex];
      var viewState = frameState.viewState;
      var projection = viewState.projection;
      var viewResolution = viewState.resolution;
      var viewCenter = viewState.center;
      var rotation = viewState.rotation;
      var pixelRatio = frameState.pixelRatio;
      var tileLayer = this.getLayer();
      var tileSource = tileLayer.getSource();
      var sourceRevision = tileSource.getRevision();
      var tileGrid = tileSource.getTileGridForProjection(projection);
      var z = tileGrid.getZForResolution(viewResolution, tileSource.zDirection);
      var tileResolution = tileGrid.getResolution(z);
      var extent = frameState.extent;
      var layerExtent = layerState.extent && fromUserExtent(layerState.extent, projection);
      if (layerExtent) {
        extent = getIntersection(extent, fromUserExtent(layerState.extent, projection));
      }
      var tilePixelRatio = tileSource.getTilePixelRatio(pixelRatio);
      var width = Math.round(frameState.size[0] * tilePixelRatio);
      var height = Math.round(frameState.size[1] * tilePixelRatio);
      if (rotation) {
        var size = Math.round(Math.sqrt(width * width + height * height));
        width = size;
        height = size;
      }
      var dx = tileResolution * width / 2 / tilePixelRatio;
      var dy = tileResolution * height / 2 / tilePixelRatio;
      var canvasExtent = [viewCenter[0] - dx, viewCenter[1] - dy, viewCenter[0] + dx, viewCenter[1] + dy];
      var tileRange = tileGrid.getTileRangeForExtentAndZ(extent, z);
      var tilesToDrawByZ = {};
      tilesToDrawByZ[z] = {};
      var findLoadedTiles = this.createLoadedTileFinder(tileSource, projection, tilesToDrawByZ);
      var tmpExtent = this.tmpExtent;
      var tmpTileRange = this.tmpTileRange_;
      this.newTiles_ = false;
      for (var x = tileRange.minX; x <= tileRange.maxX; ++x) {
        for (var y = tileRange.minY; y <= tileRange.maxY; ++y) {
          var tile = this.getTile(z, x, y, frameState);
          if (this.isDrawableTile(tile)) {
            var uid = getUid(this);
            if (tile.getState() == TileState_default.LOADED) {
              tilesToDrawByZ[z][tile.tileCoord.toString()] = tile;
              var inTransition = tile.inTransition(uid);
              if (!this.newTiles_ && (inTransition || this.renderedTiles.indexOf(tile) === -1)) {
                this.newTiles_ = true;
              }
            }
            if (tile.getAlpha(uid, frameState.time) === 1) {
              continue;
            }
          }
          var childTileRange = tileGrid.getTileCoordChildTileRange(tile.tileCoord, tmpTileRange, tmpExtent);
          var covered = false;
          if (childTileRange) {
            covered = findLoadedTiles(z + 1, childTileRange);
          }
          if (!covered) {
            tileGrid.forEachTileCoordParentTileRange(tile.tileCoord, findLoadedTiles, tmpTileRange, tmpExtent);
          }
        }
      }
      var canvasScale = tileResolution / viewResolution;
      compose(this.pixelTransform, frameState.size[0] / 2, frameState.size[1] / 2, 1 / tilePixelRatio, 1 / tilePixelRatio, rotation, -width / 2, -height / 2);
      var canvasTransform = createTransformString(this.pixelTransform);
      this.useContainer(target, canvasTransform, layerState.opacity);
      var context = this.context;
      var canvas = context.canvas;
      makeInverse(this.inversePixelTransform, this.pixelTransform);
      compose(this.tempTransform, width / 2, height / 2, canvasScale, canvasScale, 0, -width / 2, -height / 2);
      if (canvas.width != width || canvas.height != height) {
        canvas.width = width;
        canvas.height = height;
      } else if (!this.containerReused) {
        context.clearRect(0, 0, width, height);
      }
      if (layerExtent) {
        this.clipUnrotated(context, frameState, layerExtent);
      }
      assign(context, tileSource.getContextOptions());
      this.preRender(context, frameState);
      this.renderedTiles.length = 0;
      var zs = Object.keys(tilesToDrawByZ).map(Number);
      zs.sort(numberSafeCompareFunction);
      var clips, clipZs, currentClip;
      if (layerState.opacity === 1 && (!this.containerReused || tileSource.getOpaque(frameState.viewState.projection))) {
        zs = zs.reverse();
      } else {
        clips = [];
        clipZs = [];
      }
      for (var i = zs.length - 1; i >= 0; --i) {
        var currentZ = zs[i];
        var currentTilePixelSize = tileSource.getTilePixelSize(currentZ, pixelRatio, projection);
        var currentResolution = tileGrid.getResolution(currentZ);
        var currentScale = currentResolution / tileResolution;
        var dx_1 = currentTilePixelSize[0] * currentScale * canvasScale;
        var dy_1 = currentTilePixelSize[1] * currentScale * canvasScale;
        var originTileCoord = tileGrid.getTileCoordForCoordAndZ(getTopLeft(canvasExtent), currentZ);
        var originTileExtent = tileGrid.getTileCoordExtent(originTileCoord);
        var origin_1 = apply(this.tempTransform, [tilePixelRatio * (originTileExtent[0] - canvasExtent[0]) / tileResolution, tilePixelRatio * (canvasExtent[3] - originTileExtent[3]) / tileResolution]);
        var tileGutter = tilePixelRatio * tileSource.getGutterForProjection(projection);
        var tilesToDraw = tilesToDrawByZ[currentZ];
        for (var tileCoordKey in tilesToDraw) {
          var tile = (
            /** @type {import("../../ImageTile.js").default} */
            tilesToDraw[tileCoordKey]
          );
          var tileCoord = tile.tileCoord;
          var floatX = origin_1[0] - (originTileCoord[1] - tileCoord[1]) * dx_1;
          var nextX = Math.round(floatX + dx_1);
          var floatY = origin_1[1] - (originTileCoord[2] - tileCoord[2]) * dy_1;
          var nextY = Math.round(floatY + dy_1);
          var x = Math.round(floatX);
          var y = Math.round(floatY);
          var w = nextX - x;
          var h = nextY - y;
          var transition = z === currentZ;
          var inTransition = transition && tile.getAlpha(getUid(this), frameState.time) !== 1;
          if (!inTransition) {
            if (clips) {
              context.save();
              currentClip = [x, y, x + w, y, x + w, y + h, x, y + h];
              for (var i_1 = 0, ii = clips.length; i_1 < ii; ++i_1) {
                if (z !== currentZ && currentZ < clipZs[i_1]) {
                  var clip = clips[i_1];
                  context.beginPath();
                  context.moveTo(currentClip[0], currentClip[1]);
                  context.lineTo(currentClip[2], currentClip[3]);
                  context.lineTo(currentClip[4], currentClip[5]);
                  context.lineTo(currentClip[6], currentClip[7]);
                  context.moveTo(clip[6], clip[7]);
                  context.lineTo(clip[4], clip[5]);
                  context.lineTo(clip[2], clip[3]);
                  context.lineTo(clip[0], clip[1]);
                  context.clip();
                }
              }
              clips.push(currentClip);
              clipZs.push(currentZ);
            } else {
              context.clearRect(x, y, w, h);
            }
          }
          this.drawTileImage(tile, frameState, x, y, w, h, tileGutter, transition, layerState.opacity);
          if (clips && !inTransition) {
            context.restore();
          }
          this.renderedTiles.push(tile);
          this.updateUsedTiles(frameState.usedTiles, tileSource, tile);
        }
      }
      this.renderedRevision = sourceRevision;
      this.renderedResolution = tileResolution;
      this.extentChanged = !this.renderedExtent_ || !equals(this.renderedExtent_, canvasExtent);
      this.renderedExtent_ = canvasExtent;
      this.renderedPixelRatio = pixelRatio;
      this.renderedProjection = projection;
      this.manageTilePyramid(frameState, tileSource, tileGrid, pixelRatio, projection, extent, z, tileLayer.getPreload());
      this.scheduleExpireCache(frameState, tileSource);
      this.postRender(context, frameState);
      if (layerState.extent) {
        context.restore();
      }
      if (canvasTransform !== canvas.style.transform) {
        canvas.style.transform = canvasTransform;
      }
      return this.container;
    };
    CanvasTileLayerRenderer2.prototype.drawTileImage = function(tile, frameState, x, y, w, h, gutter, transition, opacity) {
      var image = this.getTileImage(tile);
      if (!image) {
        return;
      }
      var uid = getUid(this);
      var tileAlpha = transition ? tile.getAlpha(uid, frameState.time) : 1;
      var alpha = opacity * tileAlpha;
      var alphaChanged = alpha !== this.context.globalAlpha;
      if (alphaChanged) {
        this.context.save();
        this.context.globalAlpha = alpha;
      }
      this.context.drawImage(image, gutter, gutter, image.width - 2 * gutter, image.height - 2 * gutter, x, y, w, h);
      if (alphaChanged) {
        this.context.restore();
      }
      if (tileAlpha !== 1) {
        frameState.animate = true;
      } else if (transition) {
        tile.endTransition(uid);
      }
    };
    CanvasTileLayerRenderer2.prototype.getImage = function() {
      var context = this.context;
      return context ? context.canvas : null;
    };
    CanvasTileLayerRenderer2.prototype.getTileImage = function(tile) {
      return tile.getImage();
    };
    CanvasTileLayerRenderer2.prototype.scheduleExpireCache = function(frameState, tileSource) {
      if (tileSource.canExpireCache()) {
        var postRenderFunction = function(tileSource2, map, frameState2) {
          var tileSourceKey = getUid(tileSource2);
          if (tileSourceKey in frameState2.usedTiles) {
            tileSource2.expireCache(frameState2.viewState.projection, frameState2.usedTiles[tileSourceKey]);
          }
        }.bind(null, tileSource);
        frameState.postRenderFunctions.push(
          /** @type {import("../../PluggableMap.js").PostRenderFunction} */
          postRenderFunction
        );
      }
    };
    CanvasTileLayerRenderer2.prototype.updateUsedTiles = function(usedTiles, tileSource, tile) {
      var tileSourceKey = getUid(tileSource);
      if (!(tileSourceKey in usedTiles)) {
        usedTiles[tileSourceKey] = {};
      }
      usedTiles[tileSourceKey][tile.getKey()] = true;
    };
    CanvasTileLayerRenderer2.prototype.manageTilePyramid = function(frameState, tileSource, tileGrid, pixelRatio, projection, extent, currentZ, preload, opt_tileCallback) {
      var tileSourceKey = getUid(tileSource);
      if (!(tileSourceKey in frameState.wantedTiles)) {
        frameState.wantedTiles[tileSourceKey] = {};
      }
      var wantedTiles = frameState.wantedTiles[tileSourceKey];
      var tileQueue = frameState.tileQueue;
      var minZoom = tileGrid.getMinZoom();
      var tileCount = 0;
      var tile, tileRange, tileResolution, x, y, z;
      for (z = minZoom; z <= currentZ; ++z) {
        tileRange = tileGrid.getTileRangeForExtentAndZ(extent, z, tileRange);
        tileResolution = tileGrid.getResolution(z);
        for (x = tileRange.minX; x <= tileRange.maxX; ++x) {
          for (y = tileRange.minY; y <= tileRange.maxY; ++y) {
            if (currentZ - z <= preload) {
              ++tileCount;
              tile = tileSource.getTile(z, x, y, pixelRatio, projection);
              if (tile.getState() == TileState_default.IDLE) {
                wantedTiles[tile.getKey()] = true;
                if (!tileQueue.isKeyQueued(tile.getKey())) {
                  tileQueue.enqueue([tile, tileSourceKey, tileGrid.getTileCoordCenter(tile.tileCoord), tileResolution]);
                }
              }
              if (opt_tileCallback !== void 0) {
                opt_tileCallback(tile);
              }
            } else {
              tileSource.useTile(z, x, y, projection);
            }
          }
        }
      }
      tileSource.updateCacheSize(tileCount, projection);
    };
    return CanvasTileLayerRenderer2;
  }(Layer_default2)
);
CanvasTileLayerRenderer.prototype.getLayer;
var TileLayer_default = CanvasTileLayerRenderer;

// node_modules/ol/layer/Tile.js
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
var TileLayer = (
  /** @class */
  function(_super) {
    __extends3(TileLayer2, _super);
    function TileLayer2(opt_options) {
      return _super.call(this, opt_options) || this;
    }
    TileLayer2.prototype.createRenderer = function() {
      return new TileLayer_default(this);
    };
    return TileLayer2;
  }(BaseTile_default)
);
var Tile_default = TileLayer;
export {
  Tile_default as default
};
//# sourceMappingURL=ol_layer_Tile.js.map
