import {
  Units_default,
  get,
  getTransform
} from "./chunk-7ZC75XQY.js";
import {
  compose,
  create
} from "./chunk-GAGXBDJ6.js";
import {
  Object_default,
  memoizeOne
} from "./chunk-5ORQIOU2.js";
import {
  abstract,
  createEmpty,
  createOrUpdateEmpty,
  createOrUpdateFromFlatCoordinates,
  getCenter,
  getHeight,
  returnOrUpdate
} from "./chunk-MN23FWKY.js";

// node_modules/ol/geom/flat/transform.js
function transform2D(flatCoordinates, offset, end, stride, transform, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var i = 0;
  for (var j = offset; j < end; j += stride) {
    var x = flatCoordinates[j];
    var y = flatCoordinates[j + 1];
    dest[i++] = transform[0] * x + transform[2] * y + transform[4];
    dest[i++] = transform[1] * x + transform[3] * y + transform[5];
  }
  if (opt_dest && dest.length != i) {
    dest.length = i;
  }
  return dest;
}
function rotate(flatCoordinates, offset, end, stride, angle, anchor, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  var anchorX = anchor[0];
  var anchorY = anchor[1];
  var i = 0;
  for (var j = offset; j < end; j += stride) {
    var deltaX = flatCoordinates[j] - anchorX;
    var deltaY = flatCoordinates[j + 1] - anchorY;
    dest[i++] = anchorX + deltaX * cos - deltaY * sin;
    dest[i++] = anchorY + deltaX * sin + deltaY * cos;
    for (var k = j + 2; k < j + stride; ++k) {
      dest[i++] = flatCoordinates[k];
    }
  }
  if (opt_dest && dest.length != i) {
    dest.length = i;
  }
  return dest;
}
function scale(flatCoordinates, offset, end, stride, sx, sy, anchor, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var anchorX = anchor[0];
  var anchorY = anchor[1];
  var i = 0;
  for (var j = offset; j < end; j += stride) {
    var deltaX = flatCoordinates[j] - anchorX;
    var deltaY = flatCoordinates[j + 1] - anchorY;
    dest[i++] = anchorX + sx * deltaX;
    dest[i++] = anchorY + sy * deltaY;
    for (var k = j + 2; k < j + stride; ++k) {
      dest[i++] = flatCoordinates[k];
    }
  }
  if (opt_dest && dest.length != i) {
    dest.length = i;
  }
  return dest;
}
function translate(flatCoordinates, offset, end, stride, deltaX, deltaY, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var i = 0;
  for (var j = offset; j < end; j += stride) {
    dest[i++] = flatCoordinates[j] + deltaX;
    dest[i++] = flatCoordinates[j + 1] + deltaY;
    for (var k = j + 2; k < j + stride; ++k) {
      dest[i++] = flatCoordinates[k];
    }
  }
  if (opt_dest && dest.length != i) {
    dest.length = i;
  }
  return dest;
}

// node_modules/ol/geom/Geometry.js
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
var tmpTransform = create();
var Geometry = (
  /** @class */
  function(_super) {
    __extends(Geometry2, _super);
    function Geometry2() {
      var _this = _super.call(this) || this;
      _this.extent_ = createEmpty();
      _this.extentRevision_ = -1;
      _this.simplifiedGeometryMaxMinSquaredTolerance = 0;
      _this.simplifiedGeometryRevision = 0;
      _this.simplifyTransformedInternal = memoizeOne(function(revision, squaredTolerance, opt_transform) {
        if (!opt_transform) {
          return this.getSimplifiedGeometry(squaredTolerance);
        }
        var clone = this.clone();
        clone.applyTransform(opt_transform);
        return clone.getSimplifiedGeometry(squaredTolerance);
      });
      return _this;
    }
    Geometry2.prototype.simplifyTransformed = function(squaredTolerance, opt_transform) {
      return this.simplifyTransformedInternal(this.getRevision(), squaredTolerance, opt_transform);
    };
    Geometry2.prototype.clone = function() {
      return abstract();
    };
    Geometry2.prototype.closestPointXY = function(x, y, closestPoint, minSquaredDistance) {
      return abstract();
    };
    Geometry2.prototype.containsXY = function(x, y) {
      var coord = this.getClosestPoint([x, y]);
      return coord[0] === x && coord[1] === y;
    };
    Geometry2.prototype.getClosestPoint = function(point, opt_closestPoint) {
      var closestPoint = opt_closestPoint ? opt_closestPoint : [NaN, NaN];
      this.closestPointXY(point[0], point[1], closestPoint, Infinity);
      return closestPoint;
    };
    Geometry2.prototype.intersectsCoordinate = function(coordinate) {
      return this.containsXY(coordinate[0], coordinate[1]);
    };
    Geometry2.prototype.computeExtent = function(extent) {
      return abstract();
    };
    Geometry2.prototype.getExtent = function(opt_extent) {
      if (this.extentRevision_ != this.getRevision()) {
        var extent = this.computeExtent(this.extent_);
        if (isNaN(extent[0]) || isNaN(extent[1])) {
          createOrUpdateEmpty(extent);
        }
        this.extentRevision_ = this.getRevision();
      }
      return returnOrUpdate(this.extent_, opt_extent);
    };
    Geometry2.prototype.rotate = function(angle, anchor) {
      abstract();
    };
    Geometry2.prototype.scale = function(sx, opt_sy, opt_anchor) {
      abstract();
    };
    Geometry2.prototype.simplify = function(tolerance) {
      return this.getSimplifiedGeometry(tolerance * tolerance);
    };
    Geometry2.prototype.getSimplifiedGeometry = function(squaredTolerance) {
      return abstract();
    };
    Geometry2.prototype.getType = function() {
      return abstract();
    };
    Geometry2.prototype.applyTransform = function(transformFn) {
      abstract();
    };
    Geometry2.prototype.intersectsExtent = function(extent) {
      return abstract();
    };
    Geometry2.prototype.translate = function(deltaX, deltaY) {
      abstract();
    };
    Geometry2.prototype.transform = function(source, destination) {
      var sourceProj = get(source);
      var transformFn = sourceProj.getUnits() == Units_default.TILE_PIXELS ? function(inCoordinates, outCoordinates, stride) {
        var pixelExtent = sourceProj.getExtent();
        var projectedExtent = sourceProj.getWorldExtent();
        var scale2 = getHeight(projectedExtent) / getHeight(pixelExtent);
        compose(tmpTransform, projectedExtent[0], projectedExtent[3], scale2, -scale2, 0, 0, 0);
        transform2D(inCoordinates, 0, inCoordinates.length, stride, tmpTransform, outCoordinates);
        return getTransform(sourceProj, destination)(inCoordinates, outCoordinates, stride);
      } : getTransform(sourceProj, destination);
      this.applyTransform(transformFn);
      return this;
    };
    return Geometry2;
  }(Object_default)
);
var Geometry_default = Geometry;

// node_modules/ol/geom/GeometryLayout.js
var GeometryLayout_default = {
  XY: "XY",
  XYZ: "XYZ",
  XYM: "XYM",
  XYZM: "XYZM"
};

// node_modules/ol/geom/SimpleGeometry.js
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
var SimpleGeometry = (
  /** @class */
  function(_super) {
    __extends2(SimpleGeometry2, _super);
    function SimpleGeometry2() {
      var _this = _super.call(this) || this;
      _this.layout = GeometryLayout_default.XY;
      _this.stride = 2;
      _this.flatCoordinates = null;
      return _this;
    }
    SimpleGeometry2.prototype.computeExtent = function(extent) {
      return createOrUpdateFromFlatCoordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, extent);
    };
    SimpleGeometry2.prototype.getCoordinates = function() {
      return abstract();
    };
    SimpleGeometry2.prototype.getFirstCoordinate = function() {
      return this.flatCoordinates.slice(0, this.stride);
    };
    SimpleGeometry2.prototype.getFlatCoordinates = function() {
      return this.flatCoordinates;
    };
    SimpleGeometry2.prototype.getLastCoordinate = function() {
      return this.flatCoordinates.slice(this.flatCoordinates.length - this.stride);
    };
    SimpleGeometry2.prototype.getLayout = function() {
      return this.layout;
    };
    SimpleGeometry2.prototype.getSimplifiedGeometry = function(squaredTolerance) {
      if (this.simplifiedGeometryRevision !== this.getRevision()) {
        this.simplifiedGeometryMaxMinSquaredTolerance = 0;
        this.simplifiedGeometryRevision = this.getRevision();
      }
      if (squaredTolerance < 0 || this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && squaredTolerance <= this.simplifiedGeometryMaxMinSquaredTolerance) {
        return this;
      }
      var simplifiedGeometry = this.getSimplifiedGeometryInternal(squaredTolerance);
      var simplifiedFlatCoordinates = simplifiedGeometry.getFlatCoordinates();
      if (simplifiedFlatCoordinates.length < this.flatCoordinates.length) {
        return simplifiedGeometry;
      } else {
        this.simplifiedGeometryMaxMinSquaredTolerance = squaredTolerance;
        return this;
      }
    };
    SimpleGeometry2.prototype.getSimplifiedGeometryInternal = function(squaredTolerance) {
      return this;
    };
    SimpleGeometry2.prototype.getStride = function() {
      return this.stride;
    };
    SimpleGeometry2.prototype.setFlatCoordinates = function(layout, flatCoordinates) {
      this.stride = getStrideForLayout(layout);
      this.layout = layout;
      this.flatCoordinates = flatCoordinates;
    };
    SimpleGeometry2.prototype.setCoordinates = function(coordinates, opt_layout) {
      abstract();
    };
    SimpleGeometry2.prototype.setLayout = function(layout, coordinates, nesting) {
      var stride;
      if (layout) {
        stride = getStrideForLayout(layout);
      } else {
        for (var i = 0; i < nesting; ++i) {
          if (coordinates.length === 0) {
            this.layout = GeometryLayout_default.XY;
            this.stride = 2;
            return;
          } else {
            coordinates = /** @type {Array} */
            coordinates[0];
          }
        }
        stride = coordinates.length;
        layout = getLayoutForStride(stride);
      }
      this.layout = layout;
      this.stride = stride;
    };
    SimpleGeometry2.prototype.applyTransform = function(transformFn) {
      if (this.flatCoordinates) {
        transformFn(this.flatCoordinates, this.flatCoordinates, this.stride);
        this.changed();
      }
    };
    SimpleGeometry2.prototype.rotate = function(angle, anchor) {
      var flatCoordinates = this.getFlatCoordinates();
      if (flatCoordinates) {
        var stride = this.getStride();
        rotate(flatCoordinates, 0, flatCoordinates.length, stride, angle, anchor, flatCoordinates);
        this.changed();
      }
    };
    SimpleGeometry2.prototype.scale = function(sx, opt_sy, opt_anchor) {
      var sy = opt_sy;
      if (sy === void 0) {
        sy = sx;
      }
      var anchor = opt_anchor;
      if (!anchor) {
        anchor = getCenter(this.getExtent());
      }
      var flatCoordinates = this.getFlatCoordinates();
      if (flatCoordinates) {
        var stride = this.getStride();
        scale(flatCoordinates, 0, flatCoordinates.length, stride, sx, sy, anchor, flatCoordinates);
        this.changed();
      }
    };
    SimpleGeometry2.prototype.translate = function(deltaX, deltaY) {
      var flatCoordinates = this.getFlatCoordinates();
      if (flatCoordinates) {
        var stride = this.getStride();
        translate(flatCoordinates, 0, flatCoordinates.length, stride, deltaX, deltaY, flatCoordinates);
        this.changed();
      }
    };
    return SimpleGeometry2;
  }(Geometry_default)
);
function getLayoutForStride(stride) {
  var layout;
  if (stride == 2) {
    layout = GeometryLayout_default.XY;
  } else if (stride == 3) {
    layout = GeometryLayout_default.XYZ;
  } else if (stride == 4) {
    layout = GeometryLayout_default.XYZM;
  }
  return (
    /** @type {import("./GeometryLayout.js").default} */
    layout
  );
}
function getStrideForLayout(layout) {
  var stride;
  if (layout == GeometryLayout_default.XY) {
    stride = 2;
  } else if (layout == GeometryLayout_default.XYZ || layout == GeometryLayout_default.XYM) {
    stride = 3;
  } else if (layout == GeometryLayout_default.XYZM) {
    stride = 4;
  }
  return (
    /** @type {number} */
    stride
  );
}
function transformGeom2D(simpleGeometry, transform, opt_dest) {
  var flatCoordinates = simpleGeometry.getFlatCoordinates();
  if (!flatCoordinates) {
    return null;
  } else {
    var stride = simpleGeometry.getStride();
    return transform2D(flatCoordinates, 0, flatCoordinates.length, stride, transform, opt_dest);
  }
}
var SimpleGeometry_default = SimpleGeometry;

export {
  GeometryLayout_default,
  transform2D,
  rotate,
  translate,
  transformGeom2D,
  SimpleGeometry_default
};
//# sourceMappingURL=chunk-DEWJO73N.js.map
