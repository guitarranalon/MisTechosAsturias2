import {
  ImageTile_default,
  TileCache_default,
  Tile_default,
  createOrUpdate as createOrUpdate2,
  getKey,
  getKeyZXY,
  hash,
  withinExtentAndZ
} from "./chunk-ZNRTZ7YK.js";
import {
  Source_default
} from "./chunk-KB323GAH.js";
import {
  DEFAULT_MAX_ZOOM,
  DEFAULT_TILE_SIZE
} from "./chunk-EQJ7DEGW.js";
import {
  TileRange_default,
  createOrUpdate as createOrUpdate3
} from "./chunk-UVRH6PWK.js";
import {
  TileState_default
} from "./chunk-D4CEI2RF.js";
import "./chunk-63P252AH.js";
import {
  scale,
  toSize
} from "./chunk-OKB4YAGZ.js";
import "./chunk-O4WNZANO.js";
import "./chunk-LNJCZJZQ.js";
import {
  createCanvasContext2D
} from "./chunk-NUKIIKKO.js";
import {
  METERS_PER_UNIT,
  Units_default,
  equivalent,
  get,
  getPointResolution,
  getTransform,
  transform
} from "./chunk-7ZC75XQY.js";
import {
  clamp,
  log2,
  modulo,
  solveLinearSystem
} from "./chunk-5JPMEZLO.js";
import {
  EventType_default,
  Event_default,
  isSorted,
  linearFindNearest,
  listen,
  unlistenByKey
} from "./chunk-5ORQIOU2.js";
import {
  Corner_default,
  abstract,
  assert,
  assign,
  boundingExtent,
  containsCoordinate,
  createEmpty,
  createOrUpdate,
  extend,
  extendCoordinate,
  forEachCorner,
  getArea,
  getBottomLeft,
  getBottomRight,
  getCenter,
  getCorner,
  getHeight,
  getIntersection,
  getTopLeft,
  getTopRight,
  getUid,
  getWidth,
  intersects
} from "./chunk-MN23FWKY.js";
import "./chunk-R2QGWZ7S.js";

// node_modules/ol/reproj/common.js
var ERROR_THRESHOLD = 0.5;
var ENABLE_RASTER_REPROJECTION = true;

// node_modules/ol/reproj/Triangulation.js
var MAX_SUBDIVISION = 10;
var MAX_TRIANGLE_WIDTH = 0.25;
var Triangulation = (
  /** @class */
  function() {
    function Triangulation2(sourceProj, targetProj, targetExtent, maxSourceExtent, errorThreshold, opt_destinationResolution) {
      this.sourceProj_ = sourceProj;
      this.targetProj_ = targetProj;
      var transformInvCache = {};
      var transformInv = getTransform(this.targetProj_, this.sourceProj_);
      this.transformInv_ = function(c) {
        var key = c[0] + "/" + c[1];
        if (!transformInvCache[key]) {
          transformInvCache[key] = transformInv(c);
        }
        return transformInvCache[key];
      };
      this.maxSourceExtent_ = maxSourceExtent;
      this.errorThresholdSquared_ = errorThreshold * errorThreshold;
      this.triangles_ = [];
      this.wrapsXInSource_ = false;
      this.canWrapXInSource_ = this.sourceProj_.canWrapX() && !!maxSourceExtent && !!this.sourceProj_.getExtent() && getWidth(maxSourceExtent) == getWidth(this.sourceProj_.getExtent());
      this.sourceWorldWidth_ = this.sourceProj_.getExtent() ? getWidth(this.sourceProj_.getExtent()) : null;
      this.targetWorldWidth_ = this.targetProj_.getExtent() ? getWidth(this.targetProj_.getExtent()) : null;
      var destinationTopLeft = getTopLeft(targetExtent);
      var destinationTopRight = getTopRight(targetExtent);
      var destinationBottomRight = getBottomRight(targetExtent);
      var destinationBottomLeft = getBottomLeft(targetExtent);
      var sourceTopLeft = this.transformInv_(destinationTopLeft);
      var sourceTopRight = this.transformInv_(destinationTopRight);
      var sourceBottomRight = this.transformInv_(destinationBottomRight);
      var sourceBottomLeft = this.transformInv_(destinationBottomLeft);
      var maxSubdivision = MAX_SUBDIVISION + (opt_destinationResolution ? Math.max(0, Math.ceil(log2(getArea(targetExtent) / (opt_destinationResolution * opt_destinationResolution * 256 * 256)))) : 0);
      this.addQuad_(destinationTopLeft, destinationTopRight, destinationBottomRight, destinationBottomLeft, sourceTopLeft, sourceTopRight, sourceBottomRight, sourceBottomLeft, maxSubdivision);
      if (this.wrapsXInSource_) {
        var leftBound_1 = Infinity;
        this.triangles_.forEach(function(triangle, i, arr) {
          leftBound_1 = Math.min(leftBound_1, triangle.source[0][0], triangle.source[1][0], triangle.source[2][0]);
        });
        this.triangles_.forEach(function(triangle) {
          if (Math.max(triangle.source[0][0], triangle.source[1][0], triangle.source[2][0]) - leftBound_1 > this.sourceWorldWidth_ / 2) {
            var newTriangle = [[triangle.source[0][0], triangle.source[0][1]], [triangle.source[1][0], triangle.source[1][1]], [triangle.source[2][0], triangle.source[2][1]]];
            if (newTriangle[0][0] - leftBound_1 > this.sourceWorldWidth_ / 2) {
              newTriangle[0][0] -= this.sourceWorldWidth_;
            }
            if (newTriangle[1][0] - leftBound_1 > this.sourceWorldWidth_ / 2) {
              newTriangle[1][0] -= this.sourceWorldWidth_;
            }
            if (newTriangle[2][0] - leftBound_1 > this.sourceWorldWidth_ / 2) {
              newTriangle[2][0] -= this.sourceWorldWidth_;
            }
            var minX = Math.min(newTriangle[0][0], newTriangle[1][0], newTriangle[2][0]);
            var maxX = Math.max(newTriangle[0][0], newTriangle[1][0], newTriangle[2][0]);
            if (maxX - minX < this.sourceWorldWidth_ / 2) {
              triangle.source = newTriangle;
            }
          }
        }.bind(this));
      }
      transformInvCache = {};
    }
    Triangulation2.prototype.addTriangle_ = function(a, b, c, aSrc, bSrc, cSrc) {
      this.triangles_.push({
        source: [aSrc, bSrc, cSrc],
        target: [a, b, c]
      });
    };
    Triangulation2.prototype.addQuad_ = function(a, b, c, d, aSrc, bSrc, cSrc, dSrc, maxSubdivision) {
      var sourceQuadExtent = boundingExtent([aSrc, bSrc, cSrc, dSrc]);
      var sourceCoverageX = this.sourceWorldWidth_ ? getWidth(sourceQuadExtent) / this.sourceWorldWidth_ : null;
      var sourceWorldWidth = (
        /** @type {number} */
        this.sourceWorldWidth_
      );
      var wrapsX = this.sourceProj_.canWrapX() && sourceCoverageX > 0.5 && sourceCoverageX < 1;
      var needsSubdivision = false;
      if (maxSubdivision > 0) {
        if (this.targetProj_.isGlobal() && this.targetWorldWidth_) {
          var targetQuadExtent = boundingExtent([a, b, c, d]);
          var targetCoverageX = getWidth(targetQuadExtent) / this.targetWorldWidth_;
          needsSubdivision = targetCoverageX > MAX_TRIANGLE_WIDTH || needsSubdivision;
        }
        if (!wrapsX && this.sourceProj_.isGlobal() && sourceCoverageX) {
          needsSubdivision = sourceCoverageX > MAX_TRIANGLE_WIDTH || needsSubdivision;
        }
      }
      if (!needsSubdivision && this.maxSourceExtent_) {
        if (isFinite(sourceQuadExtent[0]) && isFinite(sourceQuadExtent[1]) && isFinite(sourceQuadExtent[2]) && isFinite(sourceQuadExtent[3])) {
          if (!intersects(sourceQuadExtent, this.maxSourceExtent_)) {
            return;
          }
        }
      }
      var isNotFinite = 0;
      if (!needsSubdivision) {
        if (!isFinite(aSrc[0]) || !isFinite(aSrc[1]) || !isFinite(bSrc[0]) || !isFinite(bSrc[1]) || !isFinite(cSrc[0]) || !isFinite(cSrc[1]) || !isFinite(dSrc[0]) || !isFinite(dSrc[1])) {
          if (maxSubdivision > 0) {
            needsSubdivision = true;
          } else {
            isNotFinite = (!isFinite(aSrc[0]) || !isFinite(aSrc[1]) ? 8 : 0) + (!isFinite(bSrc[0]) || !isFinite(bSrc[1]) ? 4 : 0) + (!isFinite(cSrc[0]) || !isFinite(cSrc[1]) ? 2 : 0) + (!isFinite(dSrc[0]) || !isFinite(dSrc[1]) ? 1 : 0);
            if (isNotFinite != 1 && isNotFinite != 2 && isNotFinite != 4 && isNotFinite != 8) {
              return;
            }
          }
        }
      }
      if (maxSubdivision > 0) {
        if (!needsSubdivision) {
          var center = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2];
          var centerSrc = this.transformInv_(center);
          var dx = void 0;
          if (wrapsX) {
            var centerSrcEstimX = (modulo(aSrc[0], sourceWorldWidth) + modulo(cSrc[0], sourceWorldWidth)) / 2;
            dx = centerSrcEstimX - modulo(centerSrc[0], sourceWorldWidth);
          } else {
            dx = (aSrc[0] + cSrc[0]) / 2 - centerSrc[0];
          }
          var dy = (aSrc[1] + cSrc[1]) / 2 - centerSrc[1];
          var centerSrcErrorSquared = dx * dx + dy * dy;
          needsSubdivision = centerSrcErrorSquared > this.errorThresholdSquared_;
        }
        if (needsSubdivision) {
          if (Math.abs(a[0] - c[0]) <= Math.abs(a[1] - c[1])) {
            var bc = [(b[0] + c[0]) / 2, (b[1] + c[1]) / 2];
            var bcSrc = this.transformInv_(bc);
            var da = [(d[0] + a[0]) / 2, (d[1] + a[1]) / 2];
            var daSrc = this.transformInv_(da);
            this.addQuad_(a, b, bc, da, aSrc, bSrc, bcSrc, daSrc, maxSubdivision - 1);
            this.addQuad_(da, bc, c, d, daSrc, bcSrc, cSrc, dSrc, maxSubdivision - 1);
          } else {
            var ab = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
            var abSrc = this.transformInv_(ab);
            var cd = [(c[0] + d[0]) / 2, (c[1] + d[1]) / 2];
            var cdSrc = this.transformInv_(cd);
            this.addQuad_(a, ab, cd, d, aSrc, abSrc, cdSrc, dSrc, maxSubdivision - 1);
            this.addQuad_(ab, b, c, cd, abSrc, bSrc, cSrc, cdSrc, maxSubdivision - 1);
          }
          return;
        }
      }
      if (wrapsX) {
        if (!this.canWrapXInSource_) {
          return;
        }
        this.wrapsXInSource_ = true;
      }
      if ((isNotFinite & 11) == 0) {
        this.addTriangle_(a, c, d, aSrc, cSrc, dSrc);
      }
      if ((isNotFinite & 14) == 0) {
        this.addTriangle_(a, c, b, aSrc, cSrc, bSrc);
      }
      if (isNotFinite) {
        if ((isNotFinite & 13) == 0) {
          this.addTriangle_(b, d, a, bSrc, dSrc, aSrc);
        }
        if ((isNotFinite & 7) == 0) {
          this.addTriangle_(b, d, c, bSrc, dSrc, cSrc);
        }
      }
    };
    Triangulation2.prototype.calculateSourceExtent = function() {
      var extent = createEmpty();
      this.triangles_.forEach(function(triangle, i, arr) {
        var src = triangle.source;
        extendCoordinate(extent, src[0]);
        extendCoordinate(extent, src[1]);
        extendCoordinate(extent, src[2]);
      });
      return extent;
    };
    Triangulation2.prototype.getTriangles = function() {
      return this.triangles_;
    };
    return Triangulation2;
  }()
);
var Triangulation_default = Triangulation;

// node_modules/ol/source/common.js
var IMAGE_SMOOTHING_DISABLED = {
  imageSmoothingEnabled: false,
  msImageSmoothingEnabled: false
};

// node_modules/ol/reproj.js
var brokenDiagonalRendering_;
function drawTestTriangle(ctx, u1, v1, u2, v2) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(u1, v1);
  ctx.lineTo(u2, v2);
  ctx.closePath();
  ctx.save();
  ctx.clip();
  ctx.fillRect(0, 0, Math.max(u1, u2) + 1, Math.max(v1, v2));
  ctx.restore();
}
function verifyBrokenDiagonalRendering(data, offset) {
  return Math.abs(data[offset * 4] - 210) > 2 || Math.abs(data[offset * 4 + 3] - 0.75 * 255) > 2;
}
function isBrokenDiagonalRendering() {
  if (brokenDiagonalRendering_ === void 0) {
    var ctx = document.createElement("canvas").getContext("2d");
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = "rgba(210, 0, 0, 0.75)";
    drawTestTriangle(ctx, 4, 5, 4, 0);
    drawTestTriangle(ctx, 4, 5, 0, 5);
    var data = ctx.getImageData(0, 0, 3, 3).data;
    brokenDiagonalRendering_ = verifyBrokenDiagonalRendering(data, 0) || verifyBrokenDiagonalRendering(data, 4) || verifyBrokenDiagonalRendering(data, 8);
  }
  return brokenDiagonalRendering_;
}
function calculateSourceResolution(sourceProj, targetProj, targetCenter, targetResolution) {
  var sourceCenter = transform(targetCenter, targetProj, sourceProj);
  var sourceResolution = getPointResolution(targetProj, targetResolution, targetCenter);
  var targetMetersPerUnit = targetProj.getMetersPerUnit();
  if (targetMetersPerUnit !== void 0) {
    sourceResolution *= targetMetersPerUnit;
  }
  var sourceMetersPerUnit = sourceProj.getMetersPerUnit();
  if (sourceMetersPerUnit !== void 0) {
    sourceResolution /= sourceMetersPerUnit;
  }
  var sourceExtent = sourceProj.getExtent();
  if (!sourceExtent || containsCoordinate(sourceExtent, sourceCenter)) {
    var compensationFactor = getPointResolution(sourceProj, sourceResolution, sourceCenter) / sourceResolution;
    if (isFinite(compensationFactor) && compensationFactor > 0) {
      sourceResolution /= compensationFactor;
    }
  }
  return sourceResolution;
}
function calculateSourceExtentResolution(sourceProj, targetProj, targetExtent, targetResolution) {
  var targetCenter = getCenter(targetExtent);
  var sourceResolution = calculateSourceResolution(sourceProj, targetProj, targetCenter, targetResolution);
  if (!isFinite(sourceResolution) || sourceResolution <= 0) {
    forEachCorner(targetExtent, function(corner) {
      sourceResolution = calculateSourceResolution(sourceProj, targetProj, corner, targetResolution);
      return isFinite(sourceResolution) && sourceResolution > 0;
    });
  }
  return sourceResolution;
}
function render(width, height, pixelRatio, sourceResolution, sourceExtent, targetResolution, targetExtent, triangulation, sources, gutter, opt_renderEdges, opt_contextOptions) {
  var context = createCanvasContext2D(Math.round(pixelRatio * width), Math.round(pixelRatio * height));
  assign(context, opt_contextOptions);
  if (sources.length === 0) {
    return context.canvas;
  }
  context.scale(pixelRatio, pixelRatio);
  function pixelRound(value) {
    return Math.round(value * pixelRatio) / pixelRatio;
  }
  context.globalCompositeOperation = "lighter";
  var sourceDataExtent = createEmpty();
  sources.forEach(function(src, i, arr) {
    extend(sourceDataExtent, src.extent);
  });
  var canvasWidthInUnits = getWidth(sourceDataExtent);
  var canvasHeightInUnits = getHeight(sourceDataExtent);
  var stitchContext = createCanvasContext2D(Math.round(pixelRatio * canvasWidthInUnits / sourceResolution), Math.round(pixelRatio * canvasHeightInUnits / sourceResolution));
  assign(stitchContext, opt_contextOptions);
  var stitchScale = pixelRatio / sourceResolution;
  sources.forEach(function(src, i, arr) {
    var xPos = src.extent[0] - sourceDataExtent[0];
    var yPos = -(src.extent[3] - sourceDataExtent[3]);
    var srcWidth = getWidth(src.extent);
    var srcHeight = getHeight(src.extent);
    if (src.image.width > 0 && src.image.height > 0) {
      stitchContext.drawImage(src.image, gutter, gutter, src.image.width - 2 * gutter, src.image.height - 2 * gutter, xPos * stitchScale, yPos * stitchScale, srcWidth * stitchScale, srcHeight * stitchScale);
    }
  });
  var targetTopLeft = getTopLeft(targetExtent);
  triangulation.getTriangles().forEach(function(triangle, i, arr) {
    var source = triangle.source;
    var target = triangle.target;
    var x0 = source[0][0], y0 = source[0][1];
    var x1 = source[1][0], y1 = source[1][1];
    var x2 = source[2][0], y2 = source[2][1];
    var u0 = pixelRound((target[0][0] - targetTopLeft[0]) / targetResolution);
    var v0 = pixelRound(-(target[0][1] - targetTopLeft[1]) / targetResolution);
    var u1 = pixelRound((target[1][0] - targetTopLeft[0]) / targetResolution);
    var v1 = pixelRound(-(target[1][1] - targetTopLeft[1]) / targetResolution);
    var u2 = pixelRound((target[2][0] - targetTopLeft[0]) / targetResolution);
    var v2 = pixelRound(-(target[2][1] - targetTopLeft[1]) / targetResolution);
    var sourceNumericalShiftX = x0;
    var sourceNumericalShiftY = y0;
    x0 = 0;
    y0 = 0;
    x1 -= sourceNumericalShiftX;
    y1 -= sourceNumericalShiftY;
    x2 -= sourceNumericalShiftX;
    y2 -= sourceNumericalShiftY;
    var augmentedMatrix = [[x1, y1, 0, 0, u1 - u0], [x2, y2, 0, 0, u2 - u0], [0, 0, x1, y1, v1 - v0], [0, 0, x2, y2, v2 - v0]];
    var affineCoefs = solveLinearSystem(augmentedMatrix);
    if (!affineCoefs) {
      return;
    }
    context.save();
    context.beginPath();
    if (isBrokenDiagonalRendering() || opt_contextOptions === IMAGE_SMOOTHING_DISABLED) {
      context.moveTo(u1, v1);
      var steps = 4;
      var ud = u0 - u1;
      var vd = v0 - v1;
      for (var step = 0; step < steps; step++) {
        context.lineTo(u1 + pixelRound((step + 1) * ud / steps), v1 + pixelRound(step * vd / (steps - 1)));
        if (step != steps - 1) {
          context.lineTo(u1 + pixelRound((step + 1) * ud / steps), v1 + pixelRound((step + 1) * vd / (steps - 1)));
        }
      }
      context.lineTo(u2, v2);
    } else {
      context.moveTo(u1, v1);
      context.lineTo(u0, v0);
      context.lineTo(u2, v2);
    }
    context.clip();
    context.transform(affineCoefs[0], affineCoefs[2], affineCoefs[1], affineCoefs[3], u0, v0);
    context.translate(sourceDataExtent[0] - sourceNumericalShiftX, sourceDataExtent[3] - sourceNumericalShiftY);
    context.scale(sourceResolution / pixelRatio, -sourceResolution / pixelRatio);
    context.drawImage(stitchContext.canvas, 0, 0);
    context.restore();
  });
  if (opt_renderEdges) {
    context.save();
    context.globalCompositeOperation = "source-over";
    context.strokeStyle = "black";
    context.lineWidth = 1;
    triangulation.getTriangles().forEach(function(triangle, i, arr) {
      var target = triangle.target;
      var u0 = (target[0][0] - targetTopLeft[0]) / targetResolution;
      var v0 = -(target[0][1] - targetTopLeft[1]) / targetResolution;
      var u1 = (target[1][0] - targetTopLeft[0]) / targetResolution;
      var v1 = -(target[1][1] - targetTopLeft[1]) / targetResolution;
      var u2 = (target[2][0] - targetTopLeft[0]) / targetResolution;
      var v2 = -(target[2][1] - targetTopLeft[1]) / targetResolution;
      context.beginPath();
      context.moveTo(u1, v1);
      context.lineTo(u0, v0);
      context.lineTo(u2, v2);
      context.closePath();
      context.stroke();
    });
    context.restore();
  }
  return context.canvas;
}

// node_modules/ol/reproj/Tile.js
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
var ReprojTile = (
  /** @class */
  function(_super) {
    __extends(ReprojTile2, _super);
    function ReprojTile2(sourceProj, sourceTileGrid, targetProj, targetTileGrid, tileCoord, wrappedTileCoord, pixelRatio, gutter, getTileFunction, opt_errorThreshold, opt_renderEdges, opt_contextOptions) {
      var _this = _super.call(this, tileCoord, TileState_default.IDLE) || this;
      _this.renderEdges_ = opt_renderEdges !== void 0 ? opt_renderEdges : false;
      _this.contextOptions_ = opt_contextOptions;
      _this.pixelRatio_ = pixelRatio;
      _this.gutter_ = gutter;
      _this.canvas_ = null;
      _this.sourceTileGrid_ = sourceTileGrid;
      _this.targetTileGrid_ = targetTileGrid;
      _this.wrappedTileCoord_ = wrappedTileCoord ? wrappedTileCoord : tileCoord;
      _this.sourceTiles_ = [];
      _this.sourcesListenerKeys_ = null;
      _this.sourceZ_ = 0;
      var targetExtent = targetTileGrid.getTileCoordExtent(_this.wrappedTileCoord_);
      var maxTargetExtent = _this.targetTileGrid_.getExtent();
      var maxSourceExtent = _this.sourceTileGrid_.getExtent();
      var limitedTargetExtent = maxTargetExtent ? getIntersection(targetExtent, maxTargetExtent) : targetExtent;
      if (getArea(limitedTargetExtent) === 0) {
        _this.state = TileState_default.EMPTY;
        return _this;
      }
      var sourceProjExtent = sourceProj.getExtent();
      if (sourceProjExtent) {
        if (!maxSourceExtent) {
          maxSourceExtent = sourceProjExtent;
        } else {
          maxSourceExtent = getIntersection(maxSourceExtent, sourceProjExtent);
        }
      }
      var targetResolution = targetTileGrid.getResolution(_this.wrappedTileCoord_[0]);
      var sourceResolution = calculateSourceExtentResolution(sourceProj, targetProj, limitedTargetExtent, targetResolution);
      if (!isFinite(sourceResolution) || sourceResolution <= 0) {
        _this.state = TileState_default.EMPTY;
        return _this;
      }
      var errorThresholdInPixels = opt_errorThreshold !== void 0 ? opt_errorThreshold : ERROR_THRESHOLD;
      _this.triangulation_ = new Triangulation_default(sourceProj, targetProj, limitedTargetExtent, maxSourceExtent, sourceResolution * errorThresholdInPixels, targetResolution);
      if (_this.triangulation_.getTriangles().length === 0) {
        _this.state = TileState_default.EMPTY;
        return _this;
      }
      _this.sourceZ_ = sourceTileGrid.getZForResolution(sourceResolution);
      var sourceExtent = _this.triangulation_.calculateSourceExtent();
      if (maxSourceExtent) {
        if (sourceProj.canWrapX()) {
          sourceExtent[1] = clamp(sourceExtent[1], maxSourceExtent[1], maxSourceExtent[3]);
          sourceExtent[3] = clamp(sourceExtent[3], maxSourceExtent[1], maxSourceExtent[3]);
        } else {
          sourceExtent = getIntersection(sourceExtent, maxSourceExtent);
        }
      }
      if (!getArea(sourceExtent)) {
        _this.state = TileState_default.EMPTY;
      } else {
        var sourceRange = sourceTileGrid.getTileRangeForExtentAndZ(sourceExtent, _this.sourceZ_);
        for (var srcX = sourceRange.minX; srcX <= sourceRange.maxX; srcX++) {
          for (var srcY = sourceRange.minY; srcY <= sourceRange.maxY; srcY++) {
            var tile = getTileFunction(_this.sourceZ_, srcX, srcY, pixelRatio);
            if (tile) {
              _this.sourceTiles_.push(tile);
            }
          }
        }
        if (_this.sourceTiles_.length === 0) {
          _this.state = TileState_default.EMPTY;
        }
      }
      return _this;
    }
    ReprojTile2.prototype.getImage = function() {
      return this.canvas_;
    };
    ReprojTile2.prototype.reproject_ = function() {
      var sources = [];
      this.sourceTiles_.forEach(function(tile, i, arr) {
        if (tile && tile.getState() == TileState_default.LOADED) {
          sources.push({
            extent: this.sourceTileGrid_.getTileCoordExtent(tile.tileCoord),
            image: tile.getImage()
          });
        }
      }.bind(this));
      this.sourceTiles_.length = 0;
      if (sources.length === 0) {
        this.state = TileState_default.ERROR;
      } else {
        var z = this.wrappedTileCoord_[0];
        var size = this.targetTileGrid_.getTileSize(z);
        var width = typeof size === "number" ? size : size[0];
        var height = typeof size === "number" ? size : size[1];
        var targetResolution = this.targetTileGrid_.getResolution(z);
        var sourceResolution = this.sourceTileGrid_.getResolution(this.sourceZ_);
        var targetExtent = this.targetTileGrid_.getTileCoordExtent(this.wrappedTileCoord_);
        this.canvas_ = render(width, height, this.pixelRatio_, sourceResolution, this.sourceTileGrid_.getExtent(), targetResolution, targetExtent, this.triangulation_, sources, this.gutter_, this.renderEdges_, this.contextOptions_);
        this.state = TileState_default.LOADED;
      }
      this.changed();
    };
    ReprojTile2.prototype.load = function() {
      if (this.state == TileState_default.IDLE) {
        this.state = TileState_default.LOADING;
        this.changed();
        var leftToLoad_1 = 0;
        this.sourcesListenerKeys_ = [];
        this.sourceTiles_.forEach(function(tile, i, arr) {
          var state = tile.getState();
          if (state == TileState_default.IDLE || state == TileState_default.LOADING) {
            leftToLoad_1++;
            var sourceListenKey_1 = listen(tile, EventType_default.CHANGE, function(e) {
              var state2 = tile.getState();
              if (state2 == TileState_default.LOADED || state2 == TileState_default.ERROR || state2 == TileState_default.EMPTY) {
                unlistenByKey(sourceListenKey_1);
                leftToLoad_1--;
                if (leftToLoad_1 === 0) {
                  this.unlistenSources_();
                  this.reproject_();
                }
              }
            }, this);
            this.sourcesListenerKeys_.push(sourceListenKey_1);
          }
        }.bind(this));
        this.sourceTiles_.forEach(function(tile, i, arr) {
          var state = tile.getState();
          if (state == TileState_default.IDLE) {
            tile.load();
          }
        });
        if (leftToLoad_1 === 0) {
          setTimeout(this.reproject_.bind(this), 0);
        }
      }
    };
    ReprojTile2.prototype.unlistenSources_ = function() {
      this.sourcesListenerKeys_.forEach(unlistenByKey);
      this.sourcesListenerKeys_ = null;
    };
    return ReprojTile2;
  }(Tile_default)
);
var Tile_default2 = ReprojTile;

// node_modules/ol/source/TileEventType.js
var TileEventType_default = {
  /**
   * Triggered when a tile starts loading.
   * @event module:ol/source/Tile.TileSourceEvent#tileloadstart
   * @api
   */
  TILELOADSTART: "tileloadstart",
  /**
   * Triggered when a tile finishes loading, either when its data is loaded,
   * or when loading was aborted because the tile is no longer needed.
   * @event module:ol/source/Tile.TileSourceEvent#tileloadend
   * @api
   */
  TILELOADEND: "tileloadend",
  /**
   * Triggered if tile loading results in an error.
   * @event module:ol/source/Tile.TileSourceEvent#tileloaderror
   * @api
   */
  TILELOADERROR: "tileloaderror"
};

// node_modules/ol/tilegrid/TileGrid.js
var tmpTileCoord = [0, 0, 0];
var TileGrid = (
  /** @class */
  function() {
    function TileGrid2(options) {
      this.minZoom = options.minZoom !== void 0 ? options.minZoom : 0;
      this.resolutions_ = options.resolutions;
      assert(isSorted(this.resolutions_, function(a, b) {
        return b - a;
      }, true), 17);
      var zoomFactor;
      if (!options.origins) {
        for (var i = 0, ii = this.resolutions_.length - 1; i < ii; ++i) {
          if (!zoomFactor) {
            zoomFactor = this.resolutions_[i] / this.resolutions_[i + 1];
          } else {
            if (this.resolutions_[i] / this.resolutions_[i + 1] !== zoomFactor) {
              zoomFactor = void 0;
              break;
            }
          }
        }
      }
      this.zoomFactor_ = zoomFactor;
      this.maxZoom = this.resolutions_.length - 1;
      this.origin_ = options.origin !== void 0 ? options.origin : null;
      this.origins_ = null;
      if (options.origins !== void 0) {
        this.origins_ = options.origins;
        assert(this.origins_.length == this.resolutions_.length, 20);
      }
      var extent = options.extent;
      if (extent !== void 0 && !this.origin_ && !this.origins_) {
        this.origin_ = getTopLeft(extent);
      }
      assert(!this.origin_ && this.origins_ || this.origin_ && !this.origins_, 18);
      this.tileSizes_ = null;
      if (options.tileSizes !== void 0) {
        this.tileSizes_ = options.tileSizes;
        assert(this.tileSizes_.length == this.resolutions_.length, 19);
      }
      this.tileSize_ = options.tileSize !== void 0 ? options.tileSize : !this.tileSizes_ ? DEFAULT_TILE_SIZE : null;
      assert(!this.tileSize_ && this.tileSizes_ || this.tileSize_ && !this.tileSizes_, 22);
      this.extent_ = extent !== void 0 ? extent : null;
      this.fullTileRanges_ = null;
      this.tmpSize_ = [0, 0];
      if (options.sizes !== void 0) {
        this.fullTileRanges_ = options.sizes.map(function(size, z) {
          var tileRange = new TileRange_default(Math.min(0, size[0]), Math.max(size[0] - 1, -1), Math.min(0, size[1]), Math.max(size[1] - 1, -1));
          if (extent) {
            var restrictedTileRange = this.getTileRangeForExtentAndZ(extent, z);
            tileRange.minX = Math.max(restrictedTileRange.minX, tileRange.minX);
            tileRange.maxX = Math.min(restrictedTileRange.maxX, tileRange.maxX);
            tileRange.minY = Math.max(restrictedTileRange.minY, tileRange.minY);
            tileRange.maxY = Math.min(restrictedTileRange.maxY, tileRange.maxY);
          }
          return tileRange;
        }, this);
      } else if (extent) {
        this.calculateTileRanges_(extent);
      }
    }
    TileGrid2.prototype.forEachTileCoord = function(extent, zoom, callback) {
      var tileRange = this.getTileRangeForExtentAndZ(extent, zoom);
      for (var i = tileRange.minX, ii = tileRange.maxX; i <= ii; ++i) {
        for (var j = tileRange.minY, jj = tileRange.maxY; j <= jj; ++j) {
          callback([zoom, i, j]);
        }
      }
    };
    TileGrid2.prototype.forEachTileCoordParentTileRange = function(tileCoord, callback, opt_tileRange, opt_extent) {
      var tileRange, x, y;
      var tileCoordExtent = null;
      var z = tileCoord[0] - 1;
      if (this.zoomFactor_ === 2) {
        x = tileCoord[1];
        y = tileCoord[2];
      } else {
        tileCoordExtent = this.getTileCoordExtent(tileCoord, opt_extent);
      }
      while (z >= this.minZoom) {
        if (this.zoomFactor_ === 2) {
          x = Math.floor(x / 2);
          y = Math.floor(y / 2);
          tileRange = createOrUpdate3(x, x, y, y, opt_tileRange);
        } else {
          tileRange = this.getTileRangeForExtentAndZ(tileCoordExtent, z, opt_tileRange);
        }
        if (callback(z, tileRange)) {
          return true;
        }
        --z;
      }
      return false;
    };
    TileGrid2.prototype.getExtent = function() {
      return this.extent_;
    };
    TileGrid2.prototype.getMaxZoom = function() {
      return this.maxZoom;
    };
    TileGrid2.prototype.getMinZoom = function() {
      return this.minZoom;
    };
    TileGrid2.prototype.getOrigin = function(z) {
      if (this.origin_) {
        return this.origin_;
      } else {
        return this.origins_[z];
      }
    };
    TileGrid2.prototype.getResolution = function(z) {
      return this.resolutions_[z];
    };
    TileGrid2.prototype.getResolutions = function() {
      return this.resolutions_;
    };
    TileGrid2.prototype.getTileCoordChildTileRange = function(tileCoord, opt_tileRange, opt_extent) {
      if (tileCoord[0] < this.maxZoom) {
        if (this.zoomFactor_ === 2) {
          var minX = tileCoord[1] * 2;
          var minY = tileCoord[2] * 2;
          return createOrUpdate3(minX, minX + 1, minY, minY + 1, opt_tileRange);
        }
        var tileCoordExtent = this.getTileCoordExtent(tileCoord, opt_extent);
        return this.getTileRangeForExtentAndZ(tileCoordExtent, tileCoord[0] + 1, opt_tileRange);
      }
      return null;
    };
    TileGrid2.prototype.getTileRangeExtent = function(z, tileRange, opt_extent) {
      var origin = this.getOrigin(z);
      var resolution = this.getResolution(z);
      var tileSize = toSize(this.getTileSize(z), this.tmpSize_);
      var minX = origin[0] + tileRange.minX * tileSize[0] * resolution;
      var maxX = origin[0] + (tileRange.maxX + 1) * tileSize[0] * resolution;
      var minY = origin[1] + tileRange.minY * tileSize[1] * resolution;
      var maxY = origin[1] + (tileRange.maxY + 1) * tileSize[1] * resolution;
      return createOrUpdate(minX, minY, maxX, maxY, opt_extent);
    };
    TileGrid2.prototype.getTileRangeForExtentAndZ = function(extent, z, opt_tileRange) {
      var tileCoord = tmpTileCoord;
      this.getTileCoordForXYAndZ_(extent[0], extent[3], z, false, tileCoord);
      var minX = tileCoord[1];
      var minY = tileCoord[2];
      this.getTileCoordForXYAndZ_(extent[2], extent[1], z, true, tileCoord);
      return createOrUpdate3(minX, tileCoord[1], minY, tileCoord[2], opt_tileRange);
    };
    TileGrid2.prototype.getTileCoordCenter = function(tileCoord) {
      var origin = this.getOrigin(tileCoord[0]);
      var resolution = this.getResolution(tileCoord[0]);
      var tileSize = toSize(this.getTileSize(tileCoord[0]), this.tmpSize_);
      return [origin[0] + (tileCoord[1] + 0.5) * tileSize[0] * resolution, origin[1] - (tileCoord[2] + 0.5) * tileSize[1] * resolution];
    };
    TileGrid2.prototype.getTileCoordExtent = function(tileCoord, opt_extent) {
      var origin = this.getOrigin(tileCoord[0]);
      var resolution = this.getResolution(tileCoord[0]);
      var tileSize = toSize(this.getTileSize(tileCoord[0]), this.tmpSize_);
      var minX = origin[0] + tileCoord[1] * tileSize[0] * resolution;
      var minY = origin[1] - (tileCoord[2] + 1) * tileSize[1] * resolution;
      var maxX = minX + tileSize[0] * resolution;
      var maxY = minY + tileSize[1] * resolution;
      return createOrUpdate(minX, minY, maxX, maxY, opt_extent);
    };
    TileGrid2.prototype.getTileCoordForCoordAndResolution = function(coordinate, resolution, opt_tileCoord) {
      return this.getTileCoordForXYAndResolution_(coordinate[0], coordinate[1], resolution, false, opt_tileCoord);
    };
    TileGrid2.prototype.getTileCoordForXYAndResolution_ = function(x, y, resolution, reverseIntersectionPolicy, opt_tileCoord) {
      var z = this.getZForResolution(resolution);
      var scale2 = resolution / this.getResolution(z);
      var origin = this.getOrigin(z);
      var tileSize = toSize(this.getTileSize(z), this.tmpSize_);
      var adjustX = reverseIntersectionPolicy ? 0.5 : 0;
      var adjustY = reverseIntersectionPolicy ? 0.5 : 0;
      var xFromOrigin = Math.floor((x - origin[0]) / resolution + adjustX);
      var yFromOrigin = Math.floor((origin[1] - y) / resolution + adjustY);
      var tileCoordX = scale2 * xFromOrigin / tileSize[0];
      var tileCoordY = scale2 * yFromOrigin / tileSize[1];
      if (reverseIntersectionPolicy) {
        tileCoordX = Math.ceil(tileCoordX) - 1;
        tileCoordY = Math.ceil(tileCoordY) - 1;
      } else {
        tileCoordX = Math.floor(tileCoordX);
        tileCoordY = Math.floor(tileCoordY);
      }
      return createOrUpdate2(z, tileCoordX, tileCoordY, opt_tileCoord);
    };
    TileGrid2.prototype.getTileCoordForXYAndZ_ = function(x, y, z, reverseIntersectionPolicy, opt_tileCoord) {
      var origin = this.getOrigin(z);
      var resolution = this.getResolution(z);
      var tileSize = toSize(this.getTileSize(z), this.tmpSize_);
      var adjustX = reverseIntersectionPolicy ? 0.5 : 0;
      var adjustY = reverseIntersectionPolicy ? 0.5 : 0;
      var xFromOrigin = Math.floor((x - origin[0]) / resolution + adjustX);
      var yFromOrigin = Math.floor((origin[1] - y) / resolution + adjustY);
      var tileCoordX = xFromOrigin / tileSize[0];
      var tileCoordY = yFromOrigin / tileSize[1];
      if (reverseIntersectionPolicy) {
        tileCoordX = Math.ceil(tileCoordX) - 1;
        tileCoordY = Math.ceil(tileCoordY) - 1;
      } else {
        tileCoordX = Math.floor(tileCoordX);
        tileCoordY = Math.floor(tileCoordY);
      }
      return createOrUpdate2(z, tileCoordX, tileCoordY, opt_tileCoord);
    };
    TileGrid2.prototype.getTileCoordForCoordAndZ = function(coordinate, z, opt_tileCoord) {
      return this.getTileCoordForXYAndZ_(coordinate[0], coordinate[1], z, false, opt_tileCoord);
    };
    TileGrid2.prototype.getTileCoordResolution = function(tileCoord) {
      return this.resolutions_[tileCoord[0]];
    };
    TileGrid2.prototype.getTileSize = function(z) {
      if (this.tileSize_) {
        return this.tileSize_;
      } else {
        return this.tileSizes_[z];
      }
    };
    TileGrid2.prototype.getFullTileRange = function(z) {
      if (!this.fullTileRanges_) {
        return this.extent_ ? this.getTileRangeForExtentAndZ(this.extent_, z) : null;
      } else {
        return this.fullTileRanges_[z];
      }
    };
    TileGrid2.prototype.getZForResolution = function(resolution, opt_direction) {
      var z = linearFindNearest(this.resolutions_, resolution, opt_direction || 0);
      return clamp(z, this.minZoom, this.maxZoom);
    };
    TileGrid2.prototype.calculateTileRanges_ = function(extent) {
      var length = this.resolutions_.length;
      var fullTileRanges = new Array(length);
      for (var z = this.minZoom; z < length; ++z) {
        fullTileRanges[z] = this.getTileRangeForExtentAndZ(extent, z);
      }
      this.fullTileRanges_ = fullTileRanges;
    };
    return TileGrid2;
  }()
);
var TileGrid_default = TileGrid;

// node_modules/ol/tilegrid.js
function getForProjection(projection) {
  var tileGrid = projection.getDefaultTileGrid();
  if (!tileGrid) {
    tileGrid = createForProjection(projection);
    projection.setDefaultTileGrid(tileGrid);
  }
  return tileGrid;
}
function wrapX(tileGrid, tileCoord, projection) {
  var z = tileCoord[0];
  var center = tileGrid.getTileCoordCenter(tileCoord);
  var projectionExtent = extentFromProjection(projection);
  if (!containsCoordinate(projectionExtent, center)) {
    var worldWidth = getWidth(projectionExtent);
    var worldsAway = Math.ceil((projectionExtent[0] - center[0]) / worldWidth);
    center[0] += worldWidth * worldsAway;
    return tileGrid.getTileCoordForCoordAndZ(center, z);
  } else {
    return tileCoord;
  }
}
function createForExtent(extent, opt_maxZoom, opt_tileSize, opt_corner) {
  var corner = opt_corner !== void 0 ? opt_corner : Corner_default.TOP_LEFT;
  var resolutions = resolutionsFromExtent(extent, opt_maxZoom, opt_tileSize);
  return new TileGrid_default({
    extent,
    origin: getCorner(extent, corner),
    resolutions,
    tileSize: opt_tileSize
  });
}
function createXYZ(opt_options) {
  var xyzOptions = opt_options || {};
  var extent = xyzOptions.extent || get("EPSG:3857").getExtent();
  var gridOptions = {
    extent,
    minZoom: xyzOptions.minZoom,
    tileSize: xyzOptions.tileSize,
    resolutions: resolutionsFromExtent(extent, xyzOptions.maxZoom, xyzOptions.tileSize, xyzOptions.maxResolution)
  };
  return new TileGrid_default(gridOptions);
}
function resolutionsFromExtent(extent, opt_maxZoom, opt_tileSize, opt_maxResolution) {
  var maxZoom = opt_maxZoom !== void 0 ? opt_maxZoom : DEFAULT_MAX_ZOOM;
  var height = getHeight(extent);
  var width = getWidth(extent);
  var tileSize = toSize(opt_tileSize !== void 0 ? opt_tileSize : DEFAULT_TILE_SIZE);
  var maxResolution = opt_maxResolution > 0 ? opt_maxResolution : Math.max(width / tileSize[0], height / tileSize[1]);
  var length = maxZoom + 1;
  var resolutions = new Array(length);
  for (var z = 0; z < length; ++z) {
    resolutions[z] = maxResolution / Math.pow(2, z);
  }
  return resolutions;
}
function createForProjection(projection, opt_maxZoom, opt_tileSize, opt_corner) {
  var extent = extentFromProjection(projection);
  return createForExtent(extent, opt_maxZoom, opt_tileSize, opt_corner);
}
function extentFromProjection(projection) {
  projection = get(projection);
  var extent = projection.getExtent();
  if (!extent) {
    var half = 180 * METERS_PER_UNIT[Units_default.DEGREES] / projection.getMetersPerUnit();
    extent = createOrUpdate(-half, -half, half, half);
  }
  return extent;
}

// node_modules/ol/source/Tile.js
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
var TileSource = (
  /** @class */
  function(_super) {
    __extends2(TileSource2, _super);
    function TileSource2(options) {
      var _this = _super.call(this, {
        attributions: options.attributions,
        attributionsCollapsible: options.attributionsCollapsible,
        projection: options.projection,
        state: options.state,
        wrapX: options.wrapX
      }) || this;
      _this.opaque_ = options.opaque !== void 0 ? options.opaque : false;
      _this.tilePixelRatio_ = options.tilePixelRatio !== void 0 ? options.tilePixelRatio : 1;
      _this.tileGrid = options.tileGrid !== void 0 ? options.tileGrid : null;
      var tileSize = [256, 256];
      var tileGrid = options.tileGrid;
      if (tileGrid) {
        toSize(tileGrid.getTileSize(tileGrid.getMinZoom()), tileSize);
      }
      _this.tileCache = new TileCache_default(options.cacheSize || 0);
      _this.tmpSize = [0, 0];
      _this.key_ = options.key || "";
      _this.tileOptions = {
        transition: options.transition
      };
      _this.zDirection = options.zDirection ? options.zDirection : 0;
      return _this;
    }
    TileSource2.prototype.canExpireCache = function() {
      return this.tileCache.canExpireCache();
    };
    TileSource2.prototype.expireCache = function(projection, usedTiles) {
      var tileCache = this.getTileCacheForProjection(projection);
      if (tileCache) {
        tileCache.expireCache(usedTiles);
      }
    };
    TileSource2.prototype.forEachLoadedTile = function(projection, z, tileRange, callback) {
      var tileCache = this.getTileCacheForProjection(projection);
      if (!tileCache) {
        return false;
      }
      var covered = true;
      var tile, tileCoordKey, loaded;
      for (var x = tileRange.minX; x <= tileRange.maxX; ++x) {
        for (var y = tileRange.minY; y <= tileRange.maxY; ++y) {
          tileCoordKey = getKeyZXY(z, x, y);
          loaded = false;
          if (tileCache.containsKey(tileCoordKey)) {
            tile = /** @type {!import("../Tile.js").default} */
            tileCache.get(tileCoordKey);
            loaded = tile.getState() === TileState_default.LOADED;
            if (loaded) {
              loaded = callback(tile) !== false;
            }
          }
          if (!loaded) {
            covered = false;
          }
        }
      }
      return covered;
    };
    TileSource2.prototype.getGutterForProjection = function(projection) {
      return 0;
    };
    TileSource2.prototype.getKey = function() {
      return this.key_;
    };
    TileSource2.prototype.setKey = function(key) {
      if (this.key_ !== key) {
        this.key_ = key;
        this.changed();
      }
    };
    TileSource2.prototype.getOpaque = function(projection) {
      return this.opaque_;
    };
    TileSource2.prototype.getResolutions = function() {
      return this.tileGrid.getResolutions();
    };
    TileSource2.prototype.getTile = function(z, x, y, pixelRatio, projection) {
      return abstract();
    };
    TileSource2.prototype.getTileGrid = function() {
      return this.tileGrid;
    };
    TileSource2.prototype.getTileGridForProjection = function(projection) {
      if (!this.tileGrid) {
        return getForProjection(projection);
      } else {
        return this.tileGrid;
      }
    };
    TileSource2.prototype.getTileCacheForProjection = function(projection) {
      assert(
        equivalent(this.getProjection(), projection),
        68
        // A VectorTile source can only be rendered if it has a projection compatible with the view projection.
      );
      return this.tileCache;
    };
    TileSource2.prototype.getTilePixelRatio = function(pixelRatio) {
      return this.tilePixelRatio_;
    };
    TileSource2.prototype.getTilePixelSize = function(z, pixelRatio, projection) {
      var tileGrid = this.getTileGridForProjection(projection);
      var tilePixelRatio = this.getTilePixelRatio(pixelRatio);
      var tileSize = toSize(tileGrid.getTileSize(z), this.tmpSize);
      if (tilePixelRatio == 1) {
        return tileSize;
      } else {
        return scale(tileSize, tilePixelRatio, this.tmpSize);
      }
    };
    TileSource2.prototype.getTileCoordForTileUrlFunction = function(tileCoord, opt_projection) {
      var projection = opt_projection !== void 0 ? opt_projection : this.getProjection();
      var tileGrid = this.getTileGridForProjection(projection);
      if (this.getWrapX() && projection.isGlobal()) {
        tileCoord = wrapX(tileGrid, tileCoord, projection);
      }
      return withinExtentAndZ(tileCoord, tileGrid) ? tileCoord : null;
    };
    TileSource2.prototype.clear = function() {
      this.tileCache.clear();
    };
    TileSource2.prototype.refresh = function() {
      this.clear();
      _super.prototype.refresh.call(this);
    };
    TileSource2.prototype.updateCacheSize = function(tileCount, projection) {
      var tileCache = this.getTileCacheForProjection(projection);
      if (tileCount > tileCache.highWaterMark) {
        tileCache.highWaterMark = tileCount;
      }
    };
    TileSource2.prototype.useTile = function(z, x, y, projection) {
    };
    return TileSource2;
  }(Source_default)
);
var TileSourceEvent = (
  /** @class */
  function(_super) {
    __extends2(TileSourceEvent2, _super);
    function TileSourceEvent2(type, tile) {
      var _this = _super.call(this, type) || this;
      _this.tile = tile;
      return _this;
    }
    return TileSourceEvent2;
  }(Event_default)
);
var Tile_default3 = TileSource;

// node_modules/ol/tileurlfunction.js
function createFromTemplate(template, tileGrid) {
  var zRegEx = /\{z\}/g;
  var xRegEx = /\{x\}/g;
  var yRegEx = /\{y\}/g;
  var dashYRegEx = /\{-y\}/g;
  return (
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile Coordinate.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("./proj/Projection.js").default} projection Projection.
     * @return {string|undefined} Tile URL.
     */
    function(tileCoord, pixelRatio, projection) {
      if (!tileCoord) {
        return void 0;
      } else {
        return template.replace(zRegEx, tileCoord[0].toString()).replace(xRegEx, tileCoord[1].toString()).replace(yRegEx, tileCoord[2].toString()).replace(dashYRegEx, function() {
          var z = tileCoord[0];
          var range = tileGrid.getFullTileRange(z);
          assert(range, 55);
          var y = range.getHeight() - tileCoord[2] - 1;
          return y.toString();
        });
      }
    }
  );
}
function createFromTemplates(templates, tileGrid) {
  var len = templates.length;
  var tileUrlFunctions = new Array(len);
  for (var i = 0; i < len; ++i) {
    tileUrlFunctions[i] = createFromTemplate(templates[i], tileGrid);
  }
  return createFromTileUrlFunctions(tileUrlFunctions);
}
function createFromTileUrlFunctions(tileUrlFunctions) {
  if (tileUrlFunctions.length === 1) {
    return tileUrlFunctions[0];
  }
  return (
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile Coordinate.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("./proj/Projection.js").default} projection Projection.
     * @return {string|undefined} Tile URL.
     */
    function(tileCoord, pixelRatio, projection) {
      if (!tileCoord) {
        return void 0;
      } else {
        var h = hash(tileCoord);
        var index = modulo(h, tileUrlFunctions.length);
        return tileUrlFunctions[index](tileCoord, pixelRatio, projection);
      }
    }
  );
}
function expandUrl(url) {
  var urls = [];
  var match = /\{([a-z])-([a-z])\}/.exec(url);
  if (match) {
    var startCharCode = match[1].charCodeAt(0);
    var stopCharCode = match[2].charCodeAt(0);
    var charCode = void 0;
    for (charCode = startCharCode; charCode <= stopCharCode; ++charCode) {
      urls.push(url.replace(match[0], String.fromCharCode(charCode)));
    }
    return urls;
  }
  match = /\{(\d+)-(\d+)\}/.exec(url);
  if (match) {
    var stop_1 = parseInt(match[2], 10);
    for (var i = parseInt(match[1], 10); i <= stop_1; i++) {
      urls.push(url.replace(match[0], i.toString()));
    }
    return urls;
  }
  urls.push(url);
  return urls;
}

// node_modules/ol/source/UrlTile.js
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
var UrlTile = (
  /** @class */
  function(_super) {
    __extends3(UrlTile2, _super);
    function UrlTile2(options) {
      var _this = _super.call(this, {
        attributions: options.attributions,
        cacheSize: options.cacheSize,
        opaque: options.opaque,
        projection: options.projection,
        state: options.state,
        tileGrid: options.tileGrid,
        tilePixelRatio: options.tilePixelRatio,
        wrapX: options.wrapX,
        transition: options.transition,
        key: options.key,
        attributionsCollapsible: options.attributionsCollapsible,
        zDirection: options.zDirection
      }) || this;
      _this.generateTileUrlFunction_ = _this.tileUrlFunction === UrlTile2.prototype.tileUrlFunction;
      _this.tileLoadFunction = options.tileLoadFunction;
      if (options.tileUrlFunction) {
        _this.tileUrlFunction = options.tileUrlFunction;
      }
      _this.urls = null;
      if (options.urls) {
        _this.setUrls(options.urls);
      } else if (options.url) {
        _this.setUrl(options.url);
      }
      _this.tileLoadingKeys_ = {};
      return _this;
    }
    UrlTile2.prototype.getTileLoadFunction = function() {
      return this.tileLoadFunction;
    };
    UrlTile2.prototype.getTileUrlFunction = function() {
      return Object.getPrototypeOf(this).tileUrlFunction === this.tileUrlFunction ? this.tileUrlFunction.bind(this) : this.tileUrlFunction;
    };
    UrlTile2.prototype.getUrls = function() {
      return this.urls;
    };
    UrlTile2.prototype.handleTileChange = function(event) {
      var tile = (
        /** @type {import("../Tile.js").default} */
        event.target
      );
      var uid = getUid(tile);
      var tileState = tile.getState();
      var type;
      if (tileState == TileState_default.LOADING) {
        this.tileLoadingKeys_[uid] = true;
        type = TileEventType_default.TILELOADSTART;
      } else if (uid in this.tileLoadingKeys_) {
        delete this.tileLoadingKeys_[uid];
        type = tileState == TileState_default.ERROR ? TileEventType_default.TILELOADERROR : tileState == TileState_default.LOADED ? TileEventType_default.TILELOADEND : void 0;
      }
      if (type != void 0) {
        this.dispatchEvent(new TileSourceEvent(type, tile));
      }
    };
    UrlTile2.prototype.setTileLoadFunction = function(tileLoadFunction) {
      this.tileCache.clear();
      this.tileLoadFunction = tileLoadFunction;
      this.changed();
    };
    UrlTile2.prototype.setTileUrlFunction = function(tileUrlFunction, key) {
      this.tileUrlFunction = tileUrlFunction;
      this.tileCache.pruneExceptNewestZ();
      if (typeof key !== "undefined") {
        this.setKey(key);
      } else {
        this.changed();
      }
    };
    UrlTile2.prototype.setUrl = function(url) {
      var urls = expandUrl(url);
      this.urls = urls;
      this.setUrls(urls);
    };
    UrlTile2.prototype.setUrls = function(urls) {
      this.urls = urls;
      var key = urls.join("\n");
      if (this.generateTileUrlFunction_) {
        this.setTileUrlFunction(createFromTemplates(urls, this.tileGrid), key);
      } else {
        this.setKey(key);
      }
    };
    UrlTile2.prototype.tileUrlFunction = function(tileCoord, pixelRatio, projection) {
      return void 0;
    };
    UrlTile2.prototype.useTile = function(z, x, y) {
      var tileCoordKey = getKeyZXY(z, x, y);
      if (this.tileCache.containsKey(tileCoordKey)) {
        this.tileCache.get(tileCoordKey);
      }
    };
    return UrlTile2;
  }(Tile_default3)
);
var UrlTile_default = UrlTile;

// node_modules/ol/source/TileImage.js
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
var TileImage = (
  /** @class */
  function(_super) {
    __extends4(TileImage2, _super);
    function TileImage2(options) {
      var _this = _super.call(this, {
        attributions: options.attributions,
        cacheSize: options.cacheSize,
        opaque: options.opaque,
        projection: options.projection,
        state: options.state,
        tileGrid: options.tileGrid,
        tileLoadFunction: options.tileLoadFunction ? options.tileLoadFunction : defaultTileLoadFunction,
        tilePixelRatio: options.tilePixelRatio,
        tileUrlFunction: options.tileUrlFunction,
        url: options.url,
        urls: options.urls,
        wrapX: options.wrapX,
        transition: options.transition,
        key: options.key,
        attributionsCollapsible: options.attributionsCollapsible,
        zDirection: options.zDirection
      }) || this;
      _this.crossOrigin = options.crossOrigin !== void 0 ? options.crossOrigin : null;
      _this.tileClass = options.tileClass !== void 0 ? options.tileClass : ImageTile_default;
      _this.tileCacheForProjection = {};
      _this.tileGridForProjection = {};
      _this.reprojectionErrorThreshold_ = options.reprojectionErrorThreshold;
      _this.contextOptions_ = options.imageSmoothing === false ? IMAGE_SMOOTHING_DISABLED : void 0;
      _this.renderReprojectionEdges_ = false;
      return _this;
    }
    TileImage2.prototype.canExpireCache = function() {
      if (!ENABLE_RASTER_REPROJECTION) {
        return _super.prototype.canExpireCache.call(this);
      }
      if (this.tileCache.canExpireCache()) {
        return true;
      } else {
        for (var key in this.tileCacheForProjection) {
          if (this.tileCacheForProjection[key].canExpireCache()) {
            return true;
          }
        }
      }
      return false;
    };
    TileImage2.prototype.expireCache = function(projection, usedTiles) {
      if (!ENABLE_RASTER_REPROJECTION) {
        _super.prototype.expireCache.call(this, projection, usedTiles);
        return;
      }
      var usedTileCache = this.getTileCacheForProjection(projection);
      this.tileCache.expireCache(this.tileCache == usedTileCache ? usedTiles : {});
      for (var id in this.tileCacheForProjection) {
        var tileCache = this.tileCacheForProjection[id];
        tileCache.expireCache(tileCache == usedTileCache ? usedTiles : {});
      }
    };
    TileImage2.prototype.getContextOptions = function() {
      return this.contextOptions_;
    };
    TileImage2.prototype.getGutterForProjection = function(projection) {
      if (ENABLE_RASTER_REPROJECTION && this.getProjection() && projection && !equivalent(this.getProjection(), projection)) {
        return 0;
      } else {
        return this.getGutter();
      }
    };
    TileImage2.prototype.getGutter = function() {
      return 0;
    };
    TileImage2.prototype.getKey = function() {
      return _super.prototype.getKey.call(this) + (this.contextOptions_ ? "\n" + JSON.stringify(this.contextOptions_) : "");
    };
    TileImage2.prototype.getOpaque = function(projection) {
      if (ENABLE_RASTER_REPROJECTION && this.getProjection() && projection && !equivalent(this.getProjection(), projection)) {
        return false;
      } else {
        return _super.prototype.getOpaque.call(this, projection);
      }
    };
    TileImage2.prototype.getTileGridForProjection = function(projection) {
      if (!ENABLE_RASTER_REPROJECTION) {
        return _super.prototype.getTileGridForProjection.call(this, projection);
      }
      var thisProj = this.getProjection();
      if (this.tileGrid && (!thisProj || equivalent(thisProj, projection))) {
        return this.tileGrid;
      } else {
        var projKey = getUid(projection);
        if (!(projKey in this.tileGridForProjection)) {
          this.tileGridForProjection[projKey] = getForProjection(projection);
        }
        return this.tileGridForProjection[projKey];
      }
    };
    TileImage2.prototype.getTileCacheForProjection = function(projection) {
      if (!ENABLE_RASTER_REPROJECTION) {
        return _super.prototype.getTileCacheForProjection.call(this, projection);
      }
      var thisProj = this.getProjection();
      if (!thisProj || equivalent(thisProj, projection)) {
        return this.tileCache;
      } else {
        var projKey = getUid(projection);
        if (!(projKey in this.tileCacheForProjection)) {
          this.tileCacheForProjection[projKey] = new TileCache_default(this.tileCache.highWaterMark);
        }
        return this.tileCacheForProjection[projKey];
      }
    };
    TileImage2.prototype.createTile_ = function(z, x, y, pixelRatio, projection, key) {
      var tileCoord = [z, x, y];
      var urlTileCoord = this.getTileCoordForTileUrlFunction(tileCoord, projection);
      var tileUrl = urlTileCoord ? this.tileUrlFunction(urlTileCoord, pixelRatio, projection) : void 0;
      var tile = new this.tileClass(tileCoord, tileUrl !== void 0 ? TileState_default.IDLE : TileState_default.EMPTY, tileUrl !== void 0 ? tileUrl : "", this.crossOrigin, this.tileLoadFunction, this.tileOptions);
      tile.key = key;
      tile.addEventListener(EventType_default.CHANGE, this.handleTileChange.bind(this));
      return tile;
    };
    TileImage2.prototype.getTile = function(z, x, y, pixelRatio, projection) {
      var sourceProjection = this.getProjection();
      if (!ENABLE_RASTER_REPROJECTION || !sourceProjection || !projection || equivalent(sourceProjection, projection)) {
        return this.getTileInternal(z, x, y, pixelRatio, sourceProjection || projection);
      } else {
        var cache = this.getTileCacheForProjection(projection);
        var tileCoord = [z, x, y];
        var tile = void 0;
        var tileCoordKey = getKey(tileCoord);
        if (cache.containsKey(tileCoordKey)) {
          tile = cache.get(tileCoordKey);
        }
        var key = this.getKey();
        if (tile && tile.key == key) {
          return tile;
        } else {
          var sourceTileGrid = this.getTileGridForProjection(sourceProjection);
          var targetTileGrid = this.getTileGridForProjection(projection);
          var wrappedTileCoord = this.getTileCoordForTileUrlFunction(tileCoord, projection);
          var newTile = new Tile_default2(sourceProjection, sourceTileGrid, projection, targetTileGrid, tileCoord, wrappedTileCoord, this.getTilePixelRatio(pixelRatio), this.getGutter(), function(z2, x2, y2, pixelRatio2) {
            return this.getTileInternal(z2, x2, y2, pixelRatio2, sourceProjection);
          }.bind(this), this.reprojectionErrorThreshold_, this.renderReprojectionEdges_, this.contextOptions_);
          newTile.key = key;
          if (tile) {
            newTile.interimTile = tile;
            newTile.refreshInterimChain();
            cache.replace(tileCoordKey, newTile);
          } else {
            cache.set(tileCoordKey, newTile);
          }
          return newTile;
        }
      }
    };
    TileImage2.prototype.getTileInternal = function(z, x, y, pixelRatio, projection) {
      var tile = null;
      var tileCoordKey = getKeyZXY(z, x, y);
      var key = this.getKey();
      if (!this.tileCache.containsKey(tileCoordKey)) {
        tile = this.createTile_(z, x, y, pixelRatio, projection, key);
        this.tileCache.set(tileCoordKey, tile);
      } else {
        tile = this.tileCache.get(tileCoordKey);
        if (tile.key != key) {
          var interimTile = tile;
          tile = this.createTile_(z, x, y, pixelRatio, projection, key);
          if (interimTile.getState() == TileState_default.IDLE) {
            tile.interimTile = interimTile.interimTile;
          } else {
            tile.interimTile = interimTile;
          }
          tile.refreshInterimChain();
          this.tileCache.replace(tileCoordKey, tile);
        }
      }
      return tile;
    };
    TileImage2.prototype.setRenderReprojectionEdges = function(render2) {
      if (!ENABLE_RASTER_REPROJECTION || this.renderReprojectionEdges_ == render2) {
        return;
      }
      this.renderReprojectionEdges_ = render2;
      for (var id in this.tileCacheForProjection) {
        this.tileCacheForProjection[id].clear();
      }
      this.changed();
    };
    TileImage2.prototype.setTileGridForProjection = function(projection, tilegrid) {
      if (ENABLE_RASTER_REPROJECTION) {
        var proj = get(projection);
        if (proj) {
          var projKey = getUid(proj);
          if (!(projKey in this.tileGridForProjection)) {
            this.tileGridForProjection[projKey] = tilegrid;
          }
        }
      }
    };
    return TileImage2;
  }(UrlTile_default)
);
function defaultTileLoadFunction(imageTile, src) {
  imageTile.getImage().src = src;
}
var TileImage_default = TileImage;

// node_modules/ol/source/XYZ.js
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
var XYZ = (
  /** @class */
  function(_super) {
    __extends5(XYZ2, _super);
    function XYZ2(opt_options) {
      var _this = this;
      var options = opt_options || {};
      var projection = options.projection !== void 0 ? options.projection : "EPSG:3857";
      var tileGrid = options.tileGrid !== void 0 ? options.tileGrid : createXYZ({
        extent: extentFromProjection(projection),
        maxResolution: options.maxResolution,
        maxZoom: options.maxZoom,
        minZoom: options.minZoom,
        tileSize: options.tileSize
      });
      _this = _super.call(this, {
        attributions: options.attributions,
        cacheSize: options.cacheSize,
        crossOrigin: options.crossOrigin,
        imageSmoothing: options.imageSmoothing,
        opaque: options.opaque,
        projection,
        reprojectionErrorThreshold: options.reprojectionErrorThreshold,
        tileGrid,
        tileLoadFunction: options.tileLoadFunction,
        tilePixelRatio: options.tilePixelRatio,
        tileUrlFunction: options.tileUrlFunction,
        url: options.url,
        urls: options.urls,
        wrapX: options.wrapX !== void 0 ? options.wrapX : true,
        transition: options.transition,
        attributionsCollapsible: options.attributionsCollapsible,
        zDirection: options.zDirection
      }) || this;
      return _this;
    }
    return XYZ2;
  }(TileImage_default)
);
var XYZ_default = XYZ;

// node_modules/ol/source/OSM.js
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
var ATTRIBUTION = '&#169; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors.';
var OSM = (
  /** @class */
  function(_super) {
    __extends6(OSM2, _super);
    function OSM2(opt_options) {
      var _this = this;
      var options = opt_options || {};
      var attributions;
      if (options.attributions !== void 0) {
        attributions = options.attributions;
      } else {
        attributions = [ATTRIBUTION];
      }
      var crossOrigin = options.crossOrigin !== void 0 ? options.crossOrigin : "anonymous";
      var url = options.url !== void 0 ? options.url : "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png";
      _this = _super.call(this, {
        attributions,
        attributionsCollapsible: false,
        cacheSize: options.cacheSize,
        crossOrigin,
        imageSmoothing: options.imageSmoothing,
        maxZoom: options.maxZoom !== void 0 ? options.maxZoom : 19,
        opaque: options.opaque !== void 0 ? options.opaque : true,
        reprojectionErrorThreshold: options.reprojectionErrorThreshold,
        tileLoadFunction: options.tileLoadFunction,
        transition: options.transition,
        url,
        wrapX: options.wrapX
      }) || this;
      return _this;
    }
    return OSM2;
  }(XYZ_default)
);
var OSM_default = OSM;
export {
  ATTRIBUTION,
  OSM_default as default
};
//# sourceMappingURL=ol_source_OSM.js.map
