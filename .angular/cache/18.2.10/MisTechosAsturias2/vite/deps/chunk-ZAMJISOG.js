import {
  SimpleGeometry_default
} from "./chunk-DEWJO73N.js";
import {
  GeometryType_default,
  squaredDistance
} from "./chunk-5JPMEZLO.js";
import {
  containsXY,
  createOrUpdateFromCoordinate
} from "./chunk-MN23FWKY.js";

// node_modules/ol/geom/flat/deflate.js
function deflateCoordinate(flatCoordinates, offset, coordinate, stride) {
  for (var i = 0, ii = coordinate.length; i < ii; ++i) {
    flatCoordinates[offset++] = coordinate[i];
  }
  return offset;
}
function deflateCoordinates(flatCoordinates, offset, coordinates, stride) {
  for (var i = 0, ii = coordinates.length; i < ii; ++i) {
    var coordinate = coordinates[i];
    for (var j = 0; j < stride; ++j) {
      flatCoordinates[offset++] = coordinate[j];
    }
  }
  return offset;
}
function deflateCoordinatesArray(flatCoordinates, offset, coordinatess, stride, opt_ends) {
  var ends = opt_ends ? opt_ends : [];
  var i = 0;
  for (var j = 0, jj = coordinatess.length; j < jj; ++j) {
    var end = deflateCoordinates(flatCoordinates, offset, coordinatess[j], stride);
    ends[i++] = end;
    offset = end;
  }
  ends.length = i;
  return ends;
}
function deflateMultiCoordinatesArray(flatCoordinates, offset, coordinatesss, stride, opt_endss) {
  var endss = opt_endss ? opt_endss : [];
  var i = 0;
  for (var j = 0, jj = coordinatesss.length; j < jj; ++j) {
    var ends = deflateCoordinatesArray(flatCoordinates, offset, coordinatesss[j], stride, endss[i]);
    endss[i++] = ends;
    offset = ends[ends.length - 1];
  }
  endss.length = i;
  return endss;
}

// node_modules/ol/geom/Point.js
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
var Point = (
  /** @class */
  function(_super) {
    __extends(Point2, _super);
    function Point2(coordinates, opt_layout) {
      var _this = _super.call(this) || this;
      _this.setCoordinates(coordinates, opt_layout);
      return _this;
    }
    Point2.prototype.clone = function() {
      var point = new Point2(this.flatCoordinates.slice(), this.layout);
      point.applyProperties(this);
      return point;
    };
    Point2.prototype.closestPointXY = function(x, y, closestPoint, minSquaredDistance) {
      var flatCoordinates = this.flatCoordinates;
      var squaredDistance2 = squaredDistance(x, y, flatCoordinates[0], flatCoordinates[1]);
      if (squaredDistance2 < minSquaredDistance) {
        var stride = this.stride;
        for (var i = 0; i < stride; ++i) {
          closestPoint[i] = flatCoordinates[i];
        }
        closestPoint.length = stride;
        return squaredDistance2;
      } else {
        return minSquaredDistance;
      }
    };
    Point2.prototype.getCoordinates = function() {
      return !this.flatCoordinates ? [] : this.flatCoordinates.slice();
    };
    Point2.prototype.computeExtent = function(extent) {
      return createOrUpdateFromCoordinate(this.flatCoordinates, extent);
    };
    Point2.prototype.getType = function() {
      return GeometryType_default.POINT;
    };
    Point2.prototype.intersectsExtent = function(extent) {
      return containsXY(extent, this.flatCoordinates[0], this.flatCoordinates[1]);
    };
    Point2.prototype.setCoordinates = function(coordinates, opt_layout) {
      this.setLayout(opt_layout, coordinates, 0);
      if (!this.flatCoordinates) {
        this.flatCoordinates = [];
      }
      this.flatCoordinates.length = deflateCoordinate(this.flatCoordinates, 0, coordinates, this.stride);
      this.changed();
    };
    return Point2;
  }(SimpleGeometry_default)
);
var Point_default = Point;

export {
  deflateCoordinate,
  deflateCoordinates,
  deflateCoordinatesArray,
  deflateMultiCoordinatesArray,
  Point_default
};
//# sourceMappingURL=chunk-ZAMJISOG.js.map
