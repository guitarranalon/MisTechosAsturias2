import {
  clamp,
  cosh,
  modulo,
  toDegrees,
  toRadians
} from "./chunk-5JPMEZLO.js";
import {
  applyTransform,
  getWidth
} from "./chunk-MN23FWKY.js";

// node_modules/ol/proj/Units.js
var Units = {
  /**
   * Degrees
   * @api
   */
  DEGREES: "degrees",
  /**
   * Feet
   * @api
   */
  FEET: "ft",
  /**
   * Meters
   * @api
   */
  METERS: "m",
  /**
   * Pixels
   * @api
   */
  PIXELS: "pixels",
  /**
   * Tile Pixels
   * @api
   */
  TILE_PIXELS: "tile-pixels",
  /**
   * US Feet
   * @api
   */
  USFEET: "us-ft"
};
var METERS_PER_UNIT = {};
METERS_PER_UNIT[Units.DEGREES] = 2 * Math.PI * 6370997 / 360;
METERS_PER_UNIT[Units.FEET] = 0.3048;
METERS_PER_UNIT[Units.METERS] = 1;
METERS_PER_UNIT[Units.USFEET] = 1200 / 3937;
var Units_default = Units;

// node_modules/ol/proj/Projection.js
var Projection = (
  /** @class */
  function() {
    function Projection2(options) {
      this.code_ = options.code;
      this.units_ = /** @type {import("./Units.js").default} */
      options.units;
      this.extent_ = options.extent !== void 0 ? options.extent : null;
      this.worldExtent_ = options.worldExtent !== void 0 ? options.worldExtent : null;
      this.axisOrientation_ = options.axisOrientation !== void 0 ? options.axisOrientation : "enu";
      this.global_ = options.global !== void 0 ? options.global : false;
      this.canWrapX_ = !!(this.global_ && this.extent_);
      this.getPointResolutionFunc_ = options.getPointResolution;
      this.defaultTileGrid_ = null;
      this.metersPerUnit_ = options.metersPerUnit;
    }
    Projection2.prototype.canWrapX = function() {
      return this.canWrapX_;
    };
    Projection2.prototype.getCode = function() {
      return this.code_;
    };
    Projection2.prototype.getExtent = function() {
      return this.extent_;
    };
    Projection2.prototype.getUnits = function() {
      return this.units_;
    };
    Projection2.prototype.getMetersPerUnit = function() {
      return this.metersPerUnit_ || METERS_PER_UNIT[this.units_];
    };
    Projection2.prototype.getWorldExtent = function() {
      return this.worldExtent_;
    };
    Projection2.prototype.getAxisOrientation = function() {
      return this.axisOrientation_;
    };
    Projection2.prototype.isGlobal = function() {
      return this.global_;
    };
    Projection2.prototype.setGlobal = function(global) {
      this.global_ = global;
      this.canWrapX_ = !!(global && this.extent_);
    };
    Projection2.prototype.getDefaultTileGrid = function() {
      return this.defaultTileGrid_;
    };
    Projection2.prototype.setDefaultTileGrid = function(tileGrid) {
      this.defaultTileGrid_ = tileGrid;
    };
    Projection2.prototype.setExtent = function(extent) {
      this.extent_ = extent;
      this.canWrapX_ = !!(this.global_ && extent);
    };
    Projection2.prototype.setWorldExtent = function(worldExtent) {
      this.worldExtent_ = worldExtent;
    };
    Projection2.prototype.setGetPointResolution = function(func) {
      this.getPointResolutionFunc_ = func;
    };
    Projection2.prototype.getPointResolutionFunc = function() {
      return this.getPointResolutionFunc_;
    };
    return Projection2;
  }()
);
var Projection_default = Projection;

// node_modules/ol/proj/epsg3857.js
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
var RADIUS = 6378137;
var HALF_SIZE = Math.PI * RADIUS;
var EXTENT = [-HALF_SIZE, -HALF_SIZE, HALF_SIZE, HALF_SIZE];
var WORLD_EXTENT = [-180, -85, 180, 85];
var MAX_SAFE_Y = RADIUS * Math.log(Math.tan(Math.PI / 2));
var EPSG3857Projection = (
  /** @class */
  function(_super) {
    __extends(EPSG3857Projection2, _super);
    function EPSG3857Projection2(code) {
      return _super.call(this, {
        code,
        units: Units_default.METERS,
        extent: EXTENT,
        global: true,
        worldExtent: WORLD_EXTENT,
        getPointResolution: function(resolution, point) {
          return resolution / cosh(point[1] / RADIUS);
        }
      }) || this;
    }
    return EPSG3857Projection2;
  }(Projection_default)
);
var PROJECTIONS = [new EPSG3857Projection("EPSG:3857"), new EPSG3857Projection("EPSG:102100"), new EPSG3857Projection("EPSG:102113"), new EPSG3857Projection("EPSG:900913"), new EPSG3857Projection("http://www.opengis.net/gml/srs/epsg.xml#3857")];
function fromEPSG4326(input, opt_output, opt_dimension) {
  var length = input.length;
  var dimension = opt_dimension > 1 ? opt_dimension : 2;
  var output = opt_output;
  if (output === void 0) {
    if (dimension > 2) {
      output = input.slice();
    } else {
      output = new Array(length);
    }
  }
  for (var i = 0; i < length; i += dimension) {
    output[i] = HALF_SIZE * input[i] / 180;
    var y = RADIUS * Math.log(Math.tan(Math.PI * (+input[i + 1] + 90) / 360));
    if (y > MAX_SAFE_Y) {
      y = MAX_SAFE_Y;
    } else if (y < -MAX_SAFE_Y) {
      y = -MAX_SAFE_Y;
    }
    output[i + 1] = y;
  }
  return output;
}
function toEPSG4326(input, opt_output, opt_dimension) {
  var length = input.length;
  var dimension = opt_dimension > 1 ? opt_dimension : 2;
  var output = opt_output;
  if (output === void 0) {
    if (dimension > 2) {
      output = input.slice();
    } else {
      output = new Array(length);
    }
  }
  for (var i = 0; i < length; i += dimension) {
    output[i] = 180 * input[i] / HALF_SIZE;
    output[i + 1] = 360 * Math.atan(Math.exp(input[i + 1] / RADIUS)) / Math.PI - 90;
  }
  return output;
}

// node_modules/ol/proj/epsg4326.js
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
var RADIUS2 = 6378137;
var EXTENT2 = [-180, -90, 180, 90];
var METERS_PER_UNIT2 = Math.PI * RADIUS2 / 180;
var EPSG4326Projection = (
  /** @class */
  function(_super) {
    __extends2(EPSG4326Projection2, _super);
    function EPSG4326Projection2(code, opt_axisOrientation) {
      return _super.call(this, {
        code,
        units: Units_default.DEGREES,
        extent: EXTENT2,
        axisOrientation: opt_axisOrientation,
        global: true,
        metersPerUnit: METERS_PER_UNIT2,
        worldExtent: EXTENT2
      }) || this;
    }
    return EPSG4326Projection2;
  }(Projection_default)
);
var PROJECTIONS2 = [new EPSG4326Projection("CRS:84"), new EPSG4326Projection("EPSG:4326", "neu"), new EPSG4326Projection("urn:ogc:def:crs:OGC:1.3:CRS84"), new EPSG4326Projection("urn:ogc:def:crs:OGC:2:84"), new EPSG4326Projection("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu")];

// node_modules/ol/proj/projections.js
var cache = {};
function clear() {
  cache = {};
}
function get(code) {
  return cache[code] || cache[code.replace(/urn:(x-)?ogc:def:crs:EPSG:(.*:)?(\w+)$/, "EPSG:$3")] || null;
}
function add(code, projection) {
  cache[code] = projection;
}

// node_modules/ol/proj/transforms.js
var transforms = {};
function clear2() {
  transforms = {};
}
function add2(source, destination, transformFn) {
  var sourceCode = source.getCode();
  var destinationCode = destination.getCode();
  if (!(sourceCode in transforms)) {
    transforms[sourceCode] = {};
  }
  transforms[sourceCode][destinationCode] = transformFn;
}
function get2(sourceCode, destinationCode) {
  var transform2;
  if (sourceCode in transforms && destinationCode in transforms[sourceCode]) {
    transform2 = transforms[sourceCode][destinationCode];
  }
  return transform2;
}

// node_modules/ol/sphere.js
var DEFAULT_RADIUS = 63710088e-1;
function getDistance(c1, c2, opt_radius) {
  var radius = opt_radius || DEFAULT_RADIUS;
  var lat1 = toRadians(c1[1]);
  var lat2 = toRadians(c2[1]);
  var deltaLatBy2 = (lat2 - lat1) / 2;
  var deltaLonBy2 = toRadians(c2[0] - c1[0]) / 2;
  var a = Math.sin(deltaLatBy2) * Math.sin(deltaLatBy2) + Math.sin(deltaLonBy2) * Math.sin(deltaLonBy2) * Math.cos(lat1) * Math.cos(lat2);
  return 2 * radius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function offset(c1, distance2, bearing, opt_radius) {
  var radius = opt_radius || DEFAULT_RADIUS;
  var lat1 = toRadians(c1[1]);
  var lon1 = toRadians(c1[0]);
  var dByR = distance2 / radius;
  var lat = Math.asin(Math.sin(lat1) * Math.cos(dByR) + Math.cos(lat1) * Math.sin(dByR) * Math.cos(bearing));
  var lon = lon1 + Math.atan2(Math.sin(bearing) * Math.sin(dByR) * Math.cos(lat1), Math.cos(dByR) - Math.sin(lat1) * Math.sin(lat));
  return [toDegrees(lon), toDegrees(lat)];
}

// node_modules/ol/string.js
function padNumber(number, width, opt_precision) {
  var numberString = opt_precision !== void 0 ? number.toFixed(opt_precision) : "" + number;
  var decimal = numberString.indexOf(".");
  decimal = decimal === -1 ? numberString.length : decimal;
  return decimal > width ? numberString : new Array(1 + width - decimal).join("0") + numberString;
}

// node_modules/ol/coordinate.js
function add3(coordinate, delta) {
  coordinate[0] += +delta[0];
  coordinate[1] += +delta[1];
  return coordinate;
}
function closestOnCircle(coordinate, circle) {
  var r = circle.getRadius();
  var center = circle.getCenter();
  var x0 = center[0];
  var y0 = center[1];
  var x1 = coordinate[0];
  var y1 = coordinate[1];
  var dx = x1 - x0;
  var dy = y1 - y0;
  if (dx === 0 && dy === 0) {
    dx = 1;
  }
  var d = Math.sqrt(dx * dx + dy * dy);
  var x = x0 + r * dx / d;
  var y = y0 + r * dy / d;
  return [x, y];
}
function closestOnSegment(coordinate, segment) {
  var x0 = coordinate[0];
  var y0 = coordinate[1];
  var start = segment[0];
  var end = segment[1];
  var x1 = start[0];
  var y1 = start[1];
  var x2 = end[0];
  var y2 = end[1];
  var dx = x2 - x1;
  var dy = y2 - y1;
  var along = dx === 0 && dy === 0 ? 0 : (dx * (x0 - x1) + dy * (y0 - y1)) / (dx * dx + dy * dy || 0);
  var x, y;
  if (along <= 0) {
    x = x1;
    y = y1;
  } else if (along >= 1) {
    x = x2;
    y = y2;
  } else {
    x = x1 + along * dx;
    y = y1 + along * dy;
  }
  return [x, y];
}
function degreesToStringHDMS(hemispheres, degrees, opt_fractionDigits) {
  var normalizedDegrees = modulo(degrees + 180, 360) - 180;
  var x = Math.abs(3600 * normalizedDegrees);
  var dflPrecision = opt_fractionDigits || 0;
  var precision = Math.pow(10, dflPrecision);
  var deg = Math.floor(x / 3600);
  var min = Math.floor((x - deg * 3600) / 60);
  var sec = x - deg * 3600 - min * 60;
  sec = Math.ceil(sec * precision) / precision;
  if (sec >= 60) {
    sec = 0;
    min += 1;
  }
  if (min >= 60) {
    min = 0;
    deg += 1;
  }
  return deg + "° " + padNumber(min, 2) + "′ " + padNumber(sec, 2, dflPrecision) + "″" + (normalizedDegrees == 0 ? "" : " " + hemispheres.charAt(normalizedDegrees < 0 ? 1 : 0));
}
function equals(coordinate1, coordinate2) {
  var equals2 = true;
  for (var i = coordinate1.length - 1; i >= 0; --i) {
    if (coordinate1[i] != coordinate2[i]) {
      equals2 = false;
      break;
    }
  }
  return equals2;
}
function rotate(coordinate, angle) {
  var cosAngle = Math.cos(angle);
  var sinAngle = Math.sin(angle);
  var x = coordinate[0] * cosAngle - coordinate[1] * sinAngle;
  var y = coordinate[1] * cosAngle + coordinate[0] * sinAngle;
  coordinate[0] = x;
  coordinate[1] = y;
  return coordinate;
}
function scale(coordinate, scale2) {
  coordinate[0] *= scale2;
  coordinate[1] *= scale2;
  return coordinate;
}
function squaredDistance(coord1, coord2) {
  var dx = coord1[0] - coord2[0];
  var dy = coord1[1] - coord2[1];
  return dx * dx + dy * dy;
}
function distance(coord1, coord2) {
  return Math.sqrt(squaredDistance(coord1, coord2));
}
function squaredDistanceToSegment(coordinate, segment) {
  return squaredDistance(coordinate, closestOnSegment(coordinate, segment));
}
function wrapX(coordinate, projection) {
  if (projection.canWrapX()) {
    var worldWidth = getWidth(projection.getExtent());
    var worldsAway = getWorldsAway(coordinate, projection, worldWidth);
    if (worldsAway) {
      coordinate[0] -= worldsAway * worldWidth;
    }
  }
  return coordinate;
}
function getWorldsAway(coordinate, projection, opt_sourceExtentWidth) {
  var projectionExtent = projection.getExtent();
  var worldsAway = 0;
  if (projection.canWrapX() && (coordinate[0] < projectionExtent[0] || coordinate[0] > projectionExtent[2])) {
    var sourceExtentWidth = opt_sourceExtentWidth || getWidth(projectionExtent);
    worldsAway = Math.floor((coordinate[0] - projectionExtent[0]) / sourceExtentWidth);
  }
  return worldsAway;
}

// node_modules/ol/proj.js
function cloneTransform(input, opt_output, opt_dimension) {
  var output;
  if (opt_output !== void 0) {
    for (var i = 0, ii = input.length; i < ii; ++i) {
      opt_output[i] = input[i];
    }
    output = opt_output;
  } else {
    output = input.slice();
  }
  return output;
}
function identityTransform(input, opt_output, opt_dimension) {
  if (opt_output !== void 0 && input !== opt_output) {
    for (var i = 0, ii = input.length; i < ii; ++i) {
      opt_output[i] = input[i];
    }
    input = opt_output;
  }
  return input;
}
function addProjection(projection) {
  add(projection.getCode(), projection);
  add2(projection, projection, cloneTransform);
}
function addProjections(projections) {
  projections.forEach(addProjection);
}
function get3(projectionLike) {
  return typeof projectionLike === "string" ? get(
    /** @type {string} */
    projectionLike
  ) : (
    /** @type {Projection} */
    projectionLike || null
  );
}
function getPointResolution(projection, resolution, point, opt_units) {
  projection = get3(projection);
  var pointResolution;
  var getter = projection.getPointResolutionFunc();
  if (getter) {
    pointResolution = getter(resolution, point);
    if (opt_units && opt_units !== projection.getUnits()) {
      var metersPerUnit = projection.getMetersPerUnit();
      if (metersPerUnit) {
        pointResolution = pointResolution * metersPerUnit / METERS_PER_UNIT[opt_units];
      }
    }
  } else {
    var units = projection.getUnits();
    if (units == Units_default.DEGREES && !opt_units || opt_units == Units_default.DEGREES) {
      pointResolution = resolution;
    } else {
      var toEPSG4326_1 = getTransformFromProjections(projection, get3("EPSG:4326"));
      if (toEPSG4326_1 === identityTransform && units !== Units_default.DEGREES) {
        pointResolution = resolution * projection.getMetersPerUnit();
      } else {
        var vertices = [point[0] - resolution / 2, point[1], point[0] + resolution / 2, point[1], point[0], point[1] - resolution / 2, point[0], point[1] + resolution / 2];
        vertices = toEPSG4326_1(vertices, vertices, 2);
        var width = getDistance(vertices.slice(0, 2), vertices.slice(2, 4));
        var height = getDistance(vertices.slice(4, 6), vertices.slice(6, 8));
        pointResolution = (width + height) / 2;
      }
      var metersPerUnit = opt_units ? METERS_PER_UNIT[opt_units] : projection.getMetersPerUnit();
      if (metersPerUnit !== void 0) {
        pointResolution /= metersPerUnit;
      }
    }
  }
  return pointResolution;
}
function addEquivalentProjections(projections) {
  addProjections(projections);
  projections.forEach(function(source) {
    projections.forEach(function(destination) {
      if (source !== destination) {
        add2(source, destination, cloneTransform);
      }
    });
  });
}
function addEquivalentTransforms(projections1, projections2, forwardTransform, inverseTransform) {
  projections1.forEach(function(projection1) {
    projections2.forEach(function(projection2) {
      add2(projection1, projection2, forwardTransform);
      add2(projection2, projection1, inverseTransform);
    });
  });
}
function clearAllProjections() {
  clear();
  clear2();
}
function createProjection(projection, defaultCode) {
  if (!projection) {
    return get3(defaultCode);
  } else if (typeof projection === "string") {
    return get3(projection);
  } else {
    return (
      /** @type {Projection} */
      projection
    );
  }
}
function createTransformFromCoordinateTransform(coordTransform) {
  return (
    /**
     * @param {Array<number>} input Input.
     * @param {Array<number>=} opt_output Output.
     * @param {number=} opt_dimension Dimension.
     * @return {Array<number>} Output.
     */
    function(input, opt_output, opt_dimension) {
      var length = input.length;
      var dimension = opt_dimension !== void 0 ? opt_dimension : 2;
      var output = opt_output !== void 0 ? opt_output : new Array(length);
      for (var i = 0; i < length; i += dimension) {
        var point = coordTransform([input[i], input[i + 1]]);
        output[i] = point[0];
        output[i + 1] = point[1];
        for (var j = dimension - 1; j >= 2; --j) {
          output[i + j] = input[i + j];
        }
      }
      return output;
    }
  );
}
function addCoordinateTransforms(source, destination, forward, inverse) {
  var sourceProj = get3(source);
  var destProj = get3(destination);
  add2(sourceProj, destProj, createTransformFromCoordinateTransform(forward));
  add2(destProj, sourceProj, createTransformFromCoordinateTransform(inverse));
}
function fromLonLat(coordinate, opt_projection) {
  return transform(coordinate, "EPSG:4326", opt_projection !== void 0 ? opt_projection : "EPSG:3857");
}
function toLonLat(coordinate, opt_projection) {
  var lonLat = transform(coordinate, opt_projection !== void 0 ? opt_projection : "EPSG:3857", "EPSG:4326");
  var lon = lonLat[0];
  if (lon < -180 || lon > 180) {
    lonLat[0] = modulo(lon + 180, 360) - 180;
  }
  return lonLat;
}
function equivalent(projection1, projection2) {
  if (projection1 === projection2) {
    return true;
  }
  var equalUnits = projection1.getUnits() === projection2.getUnits();
  if (projection1.getCode() === projection2.getCode()) {
    return equalUnits;
  } else {
    var transformFunc = getTransformFromProjections(projection1, projection2);
    return transformFunc === cloneTransform && equalUnits;
  }
}
function getTransformFromProjections(sourceProjection, destinationProjection) {
  var sourceCode = sourceProjection.getCode();
  var destinationCode = destinationProjection.getCode();
  var transformFunc = get2(sourceCode, destinationCode);
  if (!transformFunc) {
    transformFunc = identityTransform;
  }
  return transformFunc;
}
function getTransform(source, destination) {
  var sourceProjection = get3(source);
  var destinationProjection = get3(destination);
  return getTransformFromProjections(sourceProjection, destinationProjection);
}
function transform(coordinate, source, destination) {
  var transformFunc = getTransform(source, destination);
  return transformFunc(coordinate, void 0, coordinate.length);
}
function transformExtent(extent, source, destination, opt_stops) {
  var transformFunc = getTransform(source, destination);
  return applyTransform(extent, transformFunc, void 0, opt_stops);
}
function transformWithProjections(point, sourceProjection, destinationProjection) {
  var transformFunc = getTransformFromProjections(sourceProjection, destinationProjection);
  return transformFunc(point);
}
var userProjection = null;
function setUserProjection(projection) {
  userProjection = get3(projection);
}
function clearUserProjection() {
  userProjection = null;
}
function getUserProjection() {
  return userProjection;
}
function useGeographic() {
  setUserProjection("EPSG:4326");
}
function toUserCoordinate(coordinate, sourceProjection) {
  if (!userProjection) {
    return coordinate;
  }
  return transform(coordinate, sourceProjection, userProjection);
}
function fromUserCoordinate(coordinate, destProjection) {
  if (!userProjection) {
    return coordinate;
  }
  return transform(coordinate, userProjection, destProjection);
}
function toUserExtent(extent, sourceProjection) {
  if (!userProjection) {
    return extent;
  }
  return transformExtent(extent, sourceProjection, userProjection);
}
function fromUserExtent(extent, destProjection) {
  if (!userProjection) {
    return extent;
  }
  return transformExtent(extent, userProjection, destProjection);
}
function createSafeCoordinateTransform(sourceProj, destProj, transform2) {
  return function(coord) {
    var sourceX = coord[0];
    var sourceY = coord[1];
    var transformed, worldsAway;
    if (sourceProj.canWrapX()) {
      var sourceExtent = sourceProj.getExtent();
      var sourceExtentWidth = getWidth(sourceExtent);
      worldsAway = getWorldsAway(coord, sourceProj, sourceExtentWidth);
      if (worldsAway) {
        sourceX = sourceX - worldsAway * sourceExtentWidth;
      }
      sourceX = clamp(sourceX, sourceExtent[0], sourceExtent[2]);
      sourceY = clamp(sourceY, sourceExtent[1], sourceExtent[3]);
      transformed = transform2([sourceX, sourceY]);
    } else {
      transformed = transform2(coord);
    }
    if (worldsAway && destProj.canWrapX()) {
      transformed[0] += worldsAway * getWidth(destProj.getExtent());
    }
    return transformed;
  };
}
function addCommon() {
  addEquivalentProjections(PROJECTIONS);
  addEquivalentProjections(PROJECTIONS2);
  addEquivalentTransforms(PROJECTIONS2, PROJECTIONS, fromEPSG4326, toEPSG4326);
}
addCommon();

export {
  add3 as add,
  closestOnCircle,
  closestOnSegment,
  degreesToStringHDMS,
  equals,
  rotate,
  scale,
  squaredDistance,
  distance,
  squaredDistanceToSegment,
  wrapX,
  METERS_PER_UNIT,
  Units_default,
  Projection_default,
  offset,
  cloneTransform,
  identityTransform,
  addProjection,
  addProjections,
  get3 as get,
  getPointResolution,
  addEquivalentProjections,
  addEquivalentTransforms,
  clearAllProjections,
  createProjection,
  createTransformFromCoordinateTransform,
  addCoordinateTransforms,
  fromLonLat,
  toLonLat,
  equivalent,
  getTransformFromProjections,
  getTransform,
  transform,
  transformExtent,
  transformWithProjections,
  setUserProjection,
  clearUserProjection,
  getUserProjection,
  useGeographic,
  toUserCoordinate,
  fromUserCoordinate,
  toUserExtent,
  fromUserExtent,
  createSafeCoordinateTransform,
  addCommon
};
//# sourceMappingURL=chunk-7ZC75XQY.js.map
