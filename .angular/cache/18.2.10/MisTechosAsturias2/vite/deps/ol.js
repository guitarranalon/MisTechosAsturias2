import {
  ImageTile_default,
  TileCache_default,
  Tile_default
} from "./chunk-ZNRTZ7YK.js";
import {
  Feature_default,
  Kinetic_default,
  LineString_default,
  Map_default
} from "./chunk-XKJHLDBA.js";
import {
  Vector_default as Vector_default2
} from "./chunk-IEGF2JUD.js";
import "./chunk-KB323GAH.js";
import {
  MapBrowserEventHandler_default,
  MapBrowserEvent_default,
  MapEvent_default,
  PluggableMap_default,
  TileQueue_default,
  View_default,
  circular
} from "./chunk-H66NXA67.js";
import {
  Collection_default
} from "./chunk-IPFZOMEQ.js";
import "./chunk-EQJ7DEGW.js";
import {
  Overlay_default
} from "./chunk-EOS2HULN.js";
import "./chunk-ENFFV6PJ.js";
import {
  TileRange_default
} from "./chunk-UVRH6PWK.js";
import {
  TileState_default
} from "./chunk-D4CEI2RF.js";
import {
  Point_default
} from "./chunk-ZAMJISOG.js";
import {
  Immediate_default,
  Vector_default,
  getSquaredTolerance
} from "./chunk-UNLO6I66.js";
import "./chunk-5KKL43HL.js";
import {
  Fill_default,
  Stroke_default,
  Style_default,
  Text_default
} from "./chunk-MMBLHBTF.js";
import {
  ImageBase_default,
  Image_default
} from "./chunk-63P252AH.js";
import "./chunk-MNGUBNU3.js";
import "./chunk-CSFTPNSM.js";
import "./chunk-M73HJ6UG.js";
import "./chunk-OKB4YAGZ.js";
import "./chunk-2BYM4VZ2.js";
import {
  ImageState_default
} from "./chunk-O4WNZANO.js";
import {
  EventType_default as EventType_default2
} from "./chunk-NYVFUT5G.js";
import "./chunk-LNJCZJZQ.js";
import "./chunk-67PVPDW7.js";
import "./chunk-5TINQ75E.js";
import {
  createCanvasContext2D
} from "./chunk-NUKIIKKO.js";
import {
  GeometryLayout_default
} from "./chunk-DEWJO73N.js";
import {
  degreesToStringHDMS,
  equivalent,
  get,
  getTransform,
  getTransformFromProjections,
  getUserProjection,
  identityTransform
} from "./chunk-7ZC75XQY.js";
import {
  multiply
} from "./chunk-GAGXBDJ6.js";
import {
  clamp,
  squaredSegmentDistance,
  toRadians
} from "./chunk-5JPMEZLO.js";
import {
  Disposable_default,
  EventType_default,
  Event_default,
  Object_default,
  Observable_default,
  getChangeEventType
} from "./chunk-5ORQIOU2.js";
import {
  AssertionError_default,
  VERSION,
  applyTransform,
  approximatelyEquals,
  assign,
  containsCoordinate,
  containsExtent,
  equals,
  getCenter,
  getHeight,
  getIntersection,
  getUid,
  getWidth,
  intersects,
  isEmpty,
  wrapX
} from "./chunk-MN23FWKY.js";
import "./chunk-R2QGWZ7S.js";

// node_modules/ol/Geolocation.js
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
  ACCURACY: "accuracy",
  ACCURACY_GEOMETRY: "accuracyGeometry",
  ALTITUDE: "altitude",
  ALTITUDE_ACCURACY: "altitudeAccuracy",
  HEADING: "heading",
  POSITION: "position",
  PROJECTION: "projection",
  SPEED: "speed",
  TRACKING: "tracking",
  TRACKING_OPTIONS: "trackingOptions"
};
var GeolocationError = (
  /** @class */
  function(_super) {
    __extends(GeolocationError2, _super);
    function GeolocationError2(error) {
      var _this = _super.call(this, EventType_default.ERROR) || this;
      _this.code = error.code;
      _this.message = error.message;
      return _this;
    }
    return GeolocationError2;
  }(Event_default)
);
var Geolocation = (
  /** @class */
  function(_super) {
    __extends(Geolocation2, _super);
    function Geolocation2(opt_options) {
      var _this = _super.call(this) || this;
      var options = opt_options || {};
      _this.position_ = null;
      _this.transform_ = identityTransform;
      _this.watchId_ = void 0;
      _this.addEventListener(getChangeEventType(Property.PROJECTION), _this.handleProjectionChanged_);
      _this.addEventListener(getChangeEventType(Property.TRACKING), _this.handleTrackingChanged_);
      if (options.projection !== void 0) {
        _this.setProjection(options.projection);
      }
      if (options.trackingOptions !== void 0) {
        _this.setTrackingOptions(options.trackingOptions);
      }
      _this.setTracking(options.tracking !== void 0 ? options.tracking : false);
      return _this;
    }
    Geolocation2.prototype.disposeInternal = function() {
      this.setTracking(false);
      _super.prototype.disposeInternal.call(this);
    };
    Geolocation2.prototype.handleProjectionChanged_ = function() {
      var projection = this.getProjection();
      if (projection) {
        this.transform_ = getTransformFromProjections(get("EPSG:4326"), projection);
        if (this.position_) {
          this.set(Property.POSITION, this.transform_(this.position_));
        }
      }
    };
    Geolocation2.prototype.handleTrackingChanged_ = function() {
      if ("geolocation" in navigator) {
        var tracking = this.getTracking();
        if (tracking && this.watchId_ === void 0) {
          this.watchId_ = navigator.geolocation.watchPosition(this.positionChange_.bind(this), this.positionError_.bind(this), this.getTrackingOptions());
        } else if (!tracking && this.watchId_ !== void 0) {
          navigator.geolocation.clearWatch(this.watchId_);
          this.watchId_ = void 0;
        }
      }
    };
    Geolocation2.prototype.positionChange_ = function(position) {
      var coords = position.coords;
      this.set(Property.ACCURACY, coords.accuracy);
      this.set(Property.ALTITUDE, coords.altitude === null ? void 0 : coords.altitude);
      this.set(Property.ALTITUDE_ACCURACY, coords.altitudeAccuracy === null ? void 0 : coords.altitudeAccuracy);
      this.set(Property.HEADING, coords.heading === null ? void 0 : toRadians(coords.heading));
      if (!this.position_) {
        this.position_ = [coords.longitude, coords.latitude];
      } else {
        this.position_[0] = coords.longitude;
        this.position_[1] = coords.latitude;
      }
      var projectedPosition = this.transform_(this.position_);
      this.set(Property.POSITION, projectedPosition);
      this.set(Property.SPEED, coords.speed === null ? void 0 : coords.speed);
      var geometry = circular(this.position_, coords.accuracy);
      geometry.applyTransform(this.transform_);
      this.set(Property.ACCURACY_GEOMETRY, geometry);
      this.changed();
    };
    Geolocation2.prototype.positionError_ = function(error) {
      this.dispatchEvent(new GeolocationError(error));
    };
    Geolocation2.prototype.getAccuracy = function() {
      return (
        /** @type {number|undefined} */
        this.get(Property.ACCURACY)
      );
    };
    Geolocation2.prototype.getAccuracyGeometry = function() {
      return (
        /** @type {?import("./geom/Polygon.js").default} */
        this.get(Property.ACCURACY_GEOMETRY) || null
      );
    };
    Geolocation2.prototype.getAltitude = function() {
      return (
        /** @type {number|undefined} */
        this.get(Property.ALTITUDE)
      );
    };
    Geolocation2.prototype.getAltitudeAccuracy = function() {
      return (
        /** @type {number|undefined} */
        this.get(Property.ALTITUDE_ACCURACY)
      );
    };
    Geolocation2.prototype.getHeading = function() {
      return (
        /** @type {number|undefined} */
        this.get(Property.HEADING)
      );
    };
    Geolocation2.prototype.getPosition = function() {
      return (
        /** @type {import("./coordinate.js").Coordinate|undefined} */
        this.get(Property.POSITION)
      );
    };
    Geolocation2.prototype.getProjection = function() {
      return (
        /** @type {import("./proj/Projection.js").default|undefined} */
        this.get(Property.PROJECTION)
      );
    };
    Geolocation2.prototype.getSpeed = function() {
      return (
        /** @type {number|undefined} */
        this.get(Property.SPEED)
      );
    };
    Geolocation2.prototype.getTracking = function() {
      return (
        /** @type {boolean} */
        this.get(Property.TRACKING)
      );
    };
    Geolocation2.prototype.getTrackingOptions = function() {
      return (
        /** @type {PositionOptions|undefined} */
        this.get(Property.TRACKING_OPTIONS)
      );
    };
    Geolocation2.prototype.setProjection = function(projection) {
      this.set(Property.PROJECTION, get(projection));
    };
    Geolocation2.prototype.setTracking = function(tracking) {
      this.set(Property.TRACKING, tracking);
    };
    Geolocation2.prototype.setTrackingOptions = function(options) {
      this.set(Property.TRACKING_OPTIONS, options);
    };
    return Geolocation2;
  }(Object_default)
);
var Geolocation_default = Geolocation;

// node_modules/ol/render.js
function getVectorContext(event) {
  var frameState = event.frameState;
  var transform = multiply(event.inversePixelTransform.slice(), frameState.coordinateToPixelTransform);
  var squaredTolerance = getSquaredTolerance(frameState.viewState.resolution, frameState.pixelRatio);
  var userTransform;
  var userProjection = getUserProjection();
  if (userProjection) {
    userTransform = getTransformFromProjections(userProjection, frameState.viewState.projection);
  }
  return new Immediate_default(event.context, frameState.pixelRatio, frameState.extent, transform, frameState.viewState.rotation, squaredTolerance, userTransform);
}

// node_modules/ol/geom/flat/geodesic.js
function line(interpolate, transform, squaredTolerance) {
  var flatCoordinates = [];
  var geoA = interpolate(0);
  var geoB = interpolate(1);
  var a = transform(geoA);
  var b = transform(geoB);
  var geoStack = [geoB, geoA];
  var stack = [b, a];
  var fractionStack = [1, 0];
  var fractions = {};
  var maxIterations = 1e5;
  var geoM, m, fracA, fracB, fracM, key;
  while (--maxIterations > 0 && fractionStack.length > 0) {
    fracA = fractionStack.pop();
    geoA = geoStack.pop();
    a = stack.pop();
    key = fracA.toString();
    if (!(key in fractions)) {
      flatCoordinates.push(a[0], a[1]);
      fractions[key] = true;
    }
    fracB = fractionStack.pop();
    geoB = geoStack.pop();
    b = stack.pop();
    fracM = (fracA + fracB) / 2;
    geoM = interpolate(fracM);
    m = transform(geoM);
    if (squaredSegmentDistance(m[0], m[1], a[0], a[1], b[0], b[1]) < squaredTolerance) {
      flatCoordinates.push(b[0], b[1]);
      key = fracB.toString();
      fractions[key] = true;
    } else {
      fractionStack.push(fracB, fracM, fracM, fracA);
      stack.push(b, m, m, a);
      geoStack.push(geoB, geoM, geoM, geoA);
    }
  }
  return flatCoordinates;
}
function meridian(lon, lat1, lat2, projection, squaredTolerance) {
  var epsg4326Projection = get("EPSG:4326");
  return line(
    /**
     * @param {number} frac Fraction.
     * @return {import("../../coordinate.js").Coordinate} Coordinate.
     */
    function(frac) {
      return [lon, lat1 + (lat2 - lat1) * frac];
    },
    getTransform(epsg4326Projection, projection),
    squaredTolerance
  );
}
function parallel(lat, lon1, lon2, projection, squaredTolerance) {
  var epsg4326Projection = get("EPSG:4326");
  return line(
    /**
     * @param {number} frac Fraction.
     * @return {import("../../coordinate.js").Coordinate} Coordinate.
     */
    function(frac) {
      return [lon1 + (lon2 - lon1) * frac, lat];
    },
    getTransform(epsg4326Projection, projection),
    squaredTolerance
  );
}

// node_modules/ol/layer/Graticule.js
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
var DEFAULT_STROKE_STYLE = new Stroke_default({
  color: "rgba(0,0,0,0.2)"
});
var INTERVALS = [90, 45, 30, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.01, 5e-3, 2e-3, 1e-3];
var Graticule = (
  /** @class */
  function(_super) {
    __extends2(Graticule2, _super);
    function Graticule2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      var baseOptions = assign({
        updateWhileAnimating: true,
        updateWhileInteracting: true,
        renderBuffer: 0
      }, options);
      delete baseOptions.maxLines;
      delete baseOptions.strokeStyle;
      delete baseOptions.targetSize;
      delete baseOptions.showLabels;
      delete baseOptions.lonLabelFormatter;
      delete baseOptions.latLabelFormatter;
      delete baseOptions.lonLabelPosition;
      delete baseOptions.latLabelPosition;
      delete baseOptions.lonLabelStyle;
      delete baseOptions.latLabelStyle;
      delete baseOptions.intervals;
      _this = _super.call(this, baseOptions) || this;
      _this.projection_ = null;
      _this.maxLat_ = Infinity;
      _this.maxLon_ = Infinity;
      _this.minLat_ = -Infinity;
      _this.minLon_ = -Infinity;
      _this.maxX_ = Infinity;
      _this.maxY_ = Infinity;
      _this.minX_ = -Infinity;
      _this.minY_ = -Infinity;
      _this.targetSize_ = options.targetSize !== void 0 ? options.targetSize : 100;
      _this.maxLines_ = options.maxLines !== void 0 ? options.maxLines : 100;
      _this.meridians_ = [];
      _this.parallels_ = [];
      _this.strokeStyle_ = options.strokeStyle !== void 0 ? options.strokeStyle : DEFAULT_STROKE_STYLE;
      _this.fromLonLatTransform_ = void 0;
      _this.toLonLatTransform_ = void 0;
      _this.projectionCenterLonLat_ = null;
      _this.bottomLeft_ = null;
      _this.bottomRight_ = null;
      _this.topLeft_ = null;
      _this.topRight_ = null;
      _this.meridiansLabels_ = null;
      _this.parallelsLabels_ = null;
      if (options.showLabels) {
        _this.lonLabelFormatter_ = options.lonLabelFormatter == void 0 ? degreesToStringHDMS.bind(_this, "EW") : options.lonLabelFormatter;
        _this.latLabelFormatter_ = options.latLabelFormatter == void 0 ? degreesToStringHDMS.bind(_this, "NS") : options.latLabelFormatter;
        _this.lonLabelPosition_ = options.lonLabelPosition == void 0 ? 0 : options.lonLabelPosition;
        _this.latLabelPosition_ = options.latLabelPosition == void 0 ? 1 : options.latLabelPosition;
        _this.lonLabelStyleBase_ = new Style_default({
          text: options.lonLabelStyle !== void 0 ? options.lonLabelStyle.clone() : new Text_default({
            font: "12px Calibri,sans-serif",
            textBaseline: "bottom",
            fill: new Fill_default({
              color: "rgba(0,0,0,1)"
            }),
            stroke: new Stroke_default({
              color: "rgba(255,255,255,1)",
              width: 3
            })
          })
        });
        _this.lonLabelStyle_ = function(feature) {
          var label = feature.get("graticule_label");
          this.lonLabelStyleBase_.getText().setText(label);
          return this.lonLabelStyleBase_;
        }.bind(_this);
        _this.latLabelStyleBase_ = new Style_default({
          text: options.latLabelStyle !== void 0 ? options.latLabelStyle.clone() : new Text_default({
            font: "12px Calibri,sans-serif",
            textAlign: "right",
            fill: new Fill_default({
              color: "rgba(0,0,0,1)"
            }),
            stroke: new Stroke_default({
              color: "rgba(255,255,255,1)",
              width: 3
            })
          })
        });
        _this.latLabelStyle_ = function(feature) {
          var label = feature.get("graticule_label");
          this.latLabelStyleBase_.getText().setText(label);
          return this.latLabelStyleBase_;
        }.bind(_this);
        _this.meridiansLabels_ = [];
        _this.parallelsLabels_ = [];
        _this.addEventListener(EventType_default2.POSTRENDER, _this.drawLabels_.bind(_this));
      }
      _this.intervals_ = options.intervals !== void 0 ? options.intervals : INTERVALS;
      _this.setSource(new Vector_default2({
        loader: _this.loaderFunction.bind(_this),
        strategy: _this.strategyFunction.bind(_this),
        features: new Collection_default(),
        overlaps: false,
        useSpatialIndex: false,
        wrapX: options.wrapX
      }));
      _this.featurePool_ = [];
      _this.lineStyle_ = new Style_default({
        stroke: _this.strokeStyle_
      });
      _this.loadedExtent_ = null;
      _this.renderedExtent_ = null;
      _this.setRenderOrder(null);
      return _this;
    }
    Graticule2.prototype.strategyFunction = function(extent, resolution) {
      var realWorldExtent = extent.slice();
      if (this.projection_ && this.getSource().getWrapX()) {
        wrapX(realWorldExtent, this.projection_);
      }
      if (this.loadedExtent_) {
        if (approximatelyEquals(this.loadedExtent_, realWorldExtent, resolution)) {
          realWorldExtent = this.loadedExtent_.slice();
        } else {
          this.getSource().removeLoadedExtent(this.loadedExtent_);
        }
      }
      return [realWorldExtent];
    };
    Graticule2.prototype.loaderFunction = function(extent, resolution, projection) {
      this.loadedExtent_ = extent;
      var source = this.getSource();
      var layerExtent = this.getExtent() || [-Infinity, -Infinity, Infinity, Infinity];
      var renderExtent = getIntersection(layerExtent, extent);
      if (this.renderedExtent_ && equals(this.renderedExtent_, renderExtent)) {
        return;
      }
      this.renderedExtent_ = renderExtent;
      if (isEmpty(renderExtent)) {
        return;
      }
      var center = getCenter(renderExtent);
      var squaredTolerance = resolution * resolution / 4;
      var updateProjectionInfo = !this.projection_ || !equivalent(this.projection_, projection);
      if (updateProjectionInfo) {
        this.updateProjectionInfo_(projection);
      }
      this.createGraticule_(renderExtent, center, resolution, squaredTolerance);
      var featureCount = this.meridians_.length + this.parallels_.length;
      if (this.meridiansLabels_) {
        featureCount += this.meridians_.length;
      }
      if (this.parallelsLabels_) {
        featureCount += this.parallels_.length;
      }
      var feature;
      while (featureCount > this.featurePool_.length) {
        feature = new Feature_default();
        this.featurePool_.push(feature);
      }
      var featuresColl = source.getFeaturesCollection();
      featuresColl.clear();
      var poolIndex = 0;
      var i, l;
      for (i = 0, l = this.meridians_.length; i < l; ++i) {
        feature = this.featurePool_[poolIndex++];
        feature.setGeometry(this.meridians_[i]);
        feature.setStyle(this.lineStyle_);
        featuresColl.push(feature);
      }
      for (i = 0, l = this.parallels_.length; i < l; ++i) {
        feature = this.featurePool_[poolIndex++];
        feature.setGeometry(this.parallels_[i]);
        feature.setStyle(this.lineStyle_);
        featuresColl.push(feature);
      }
    };
    Graticule2.prototype.addMeridian_ = function(lon, minLat, maxLat, squaredTolerance, extent, index) {
      var lineString = this.getMeridian_(lon, minLat, maxLat, squaredTolerance, index);
      if (intersects(lineString.getExtent(), extent)) {
        if (this.meridiansLabels_) {
          var text = this.lonLabelFormatter_(lon);
          if (index in this.meridiansLabels_) {
            this.meridiansLabels_[index].text = text;
          } else {
            this.meridiansLabels_[index] = {
              geom: new Point_default([]),
              text
            };
          }
        }
        this.meridians_[index++] = lineString;
      }
      return index;
    };
    Graticule2.prototype.addParallel_ = function(lat, minLon, maxLon, squaredTolerance, extent, index) {
      var lineString = this.getParallel_(lat, minLon, maxLon, squaredTolerance, index);
      if (intersects(lineString.getExtent(), extent)) {
        if (this.parallelsLabels_) {
          var text = this.latLabelFormatter_(lat);
          if (index in this.parallelsLabels_) {
            this.parallelsLabels_[index].text = text;
          } else {
            this.parallelsLabels_[index] = {
              geom: new Point_default([]),
              text
            };
          }
        }
        this.parallels_[index++] = lineString;
      }
      return index;
    };
    Graticule2.prototype.drawLabels_ = function(event) {
      var rotation = event.frameState.viewState.rotation;
      var extent = event.frameState.extent;
      var rotationCenter = getCenter(extent);
      var rotationExtent = extent;
      if (rotation) {
        var width = getWidth(extent);
        var height = getHeight(extent);
        var cr = Math.abs(Math.cos(rotation));
        var sr = Math.abs(Math.sin(rotation));
        var unrotatedWidth = (sr * height - cr * width) / (sr * sr - cr * cr);
        var unrotatedHeight = (sr * width - cr * height) / (sr * sr - cr * cr);
        rotationExtent = [rotationCenter[0] - unrotatedWidth / 2, rotationCenter[1] - unrotatedHeight / 2, rotationCenter[0] + unrotatedWidth / 2, rotationCenter[1] + unrotatedHeight / 2];
      }
      var startWorld = 0;
      var endWorld = 0;
      var labelsAtStart = this.latLabelPosition_ < 0.5;
      var projectionExtent = this.projection_.getExtent();
      var worldWidth = getWidth(projectionExtent);
      if (this.getSource().getWrapX() && this.projection_.canWrapX() && !containsExtent(projectionExtent, extent)) {
        startWorld = Math.floor((extent[0] - projectionExtent[0]) / worldWidth);
        endWorld = Math.ceil((extent[2] - projectionExtent[2]) / worldWidth);
        var inverted = Math.abs(rotation) > Math.PI / 2;
        labelsAtStart = labelsAtStart !== inverted;
      }
      var vectorContext = getVectorContext(event);
      for (var world = startWorld; world <= endWorld; ++world) {
        var poolIndex = this.meridians_.length + this.parallels_.length;
        var feature = void 0, index = void 0, l = void 0, textPoint = void 0;
        if (this.meridiansLabels_) {
          for (index = 0, l = this.meridiansLabels_.length; index < l; ++index) {
            var lineString = this.meridians_[index];
            if (!rotation && world === 0) {
              textPoint = this.getMeridianPoint_(lineString, extent, index);
            } else {
              var clone = lineString.clone();
              clone.translate(world * worldWidth, 0);
              clone.rotate(-rotation, rotationCenter);
              textPoint = this.getMeridianPoint_(clone, rotationExtent, index);
              textPoint.rotate(rotation, rotationCenter);
            }
            feature = this.featurePool_[poolIndex++];
            feature.setGeometry(textPoint);
            feature.set("graticule_label", this.meridiansLabels_[index].text);
            vectorContext.drawFeature(feature, this.lonLabelStyle_(feature));
          }
        }
        if (this.parallelsLabels_) {
          if (world === startWorld && labelsAtStart || world === endWorld && !labelsAtStart) {
            for (index = 0, l = this.parallels_.length; index < l; ++index) {
              var lineString = this.parallels_[index];
              if (!rotation && world === 0) {
                textPoint = this.getParallelPoint_(lineString, extent, index);
              } else {
                var clone = lineString.clone();
                clone.translate(world * worldWidth, 0);
                clone.rotate(-rotation, rotationCenter);
                textPoint = this.getParallelPoint_(clone, rotationExtent, index);
                textPoint.rotate(rotation, rotationCenter);
              }
              feature = this.featurePool_[poolIndex++];
              feature.setGeometry(textPoint);
              feature.set("graticule_label", this.parallelsLabels_[index].text);
              vectorContext.drawFeature(feature, this.latLabelStyle_(feature));
            }
          }
        }
      }
    };
    Graticule2.prototype.createGraticule_ = function(extent, center, resolution, squaredTolerance) {
      var interval = this.getInterval_(resolution);
      if (interval == -1) {
        this.meridians_.length = 0;
        this.parallels_.length = 0;
        if (this.meridiansLabels_) {
          this.meridiansLabels_.length = 0;
        }
        if (this.parallelsLabels_) {
          this.parallelsLabels_.length = 0;
        }
        return;
      }
      var wrapX2 = false;
      var projectionExtent = this.projection_.getExtent();
      var worldWidth = getWidth(projectionExtent);
      if (this.getSource().getWrapX() && this.projection_.canWrapX() && !containsExtent(projectionExtent, extent)) {
        if (getWidth(extent) >= worldWidth) {
          extent[0] = projectionExtent[0];
          extent[2] = projectionExtent[2];
        } else {
          wrapX2 = true;
        }
      }
      var validCenterP = [clamp(center[0], this.minX_, this.maxX_), clamp(center[1], this.minY_, this.maxY_)];
      var centerLonLat = this.toLonLatTransform_(validCenterP);
      if (isNaN(centerLonLat[1])) {
        centerLonLat[1] = Math.abs(this.maxLat_) >= Math.abs(this.minLat_) ? this.maxLat_ : this.minLat_;
      }
      var centerLon = clamp(centerLonLat[0], this.minLon_, this.maxLon_);
      var centerLat = clamp(centerLonLat[1], this.minLat_, this.maxLat_);
      var maxLines = this.maxLines_;
      var cnt, idx, lat, lon;
      var validExtentP = extent;
      if (!wrapX2) {
        validExtentP = [clamp(extent[0], this.minX_, this.maxX_), clamp(extent[1], this.minY_, this.maxY_), clamp(extent[2], this.minX_, this.maxX_), clamp(extent[3], this.minY_, this.maxY_)];
      }
      var validExtent = applyTransform(validExtentP, this.toLonLatTransform_, void 0, 8);
      var maxLat = validExtent[3];
      var maxLon = validExtent[2];
      var minLat = validExtent[1];
      var minLon = validExtent[0];
      if (!wrapX2) {
        if (containsCoordinate(validExtentP, this.bottomLeft_)) {
          minLon = this.minLon_;
          minLat = this.minLat_;
        }
        if (containsCoordinate(validExtentP, this.bottomRight_)) {
          maxLon = this.maxLon_;
          minLat = this.minLat_;
        }
        if (containsCoordinate(validExtentP, this.topLeft_)) {
          minLon = this.minLon_;
          maxLat = this.maxLat_;
        }
        if (containsCoordinate(validExtentP, this.topRight_)) {
          maxLon = this.maxLon_;
          maxLat = this.maxLat_;
        }
        maxLat = clamp(maxLat, centerLat, this.maxLat_);
        maxLon = clamp(maxLon, centerLon, this.maxLon_);
        minLat = clamp(minLat, this.minLat_, centerLat);
        minLon = clamp(minLon, this.minLon_, centerLon);
      }
      centerLon = Math.floor(centerLon / interval) * interval;
      lon = clamp(centerLon, this.minLon_, this.maxLon_);
      idx = this.addMeridian_(lon, minLat, maxLat, squaredTolerance, extent, 0);
      cnt = 0;
      if (wrapX2) {
        while ((lon -= interval) >= minLon && cnt++ < maxLines) {
          idx = this.addMeridian_(lon, minLat, maxLat, squaredTolerance, extent, idx);
        }
      } else {
        while (lon != this.minLon_ && cnt++ < maxLines) {
          lon = Math.max(lon - interval, this.minLon_);
          idx = this.addMeridian_(lon, minLat, maxLat, squaredTolerance, extent, idx);
        }
      }
      lon = clamp(centerLon, this.minLon_, this.maxLon_);
      cnt = 0;
      if (wrapX2) {
        while ((lon += interval) <= maxLon && cnt++ < maxLines) {
          idx = this.addMeridian_(lon, minLat, maxLat, squaredTolerance, extent, idx);
        }
      } else {
        while (lon != this.maxLon_ && cnt++ < maxLines) {
          lon = Math.min(lon + interval, this.maxLon_);
          idx = this.addMeridian_(lon, minLat, maxLat, squaredTolerance, extent, idx);
        }
      }
      this.meridians_.length = idx;
      if (this.meridiansLabels_) {
        this.meridiansLabels_.length = idx;
      }
      centerLat = Math.floor(centerLat / interval) * interval;
      lat = clamp(centerLat, this.minLat_, this.maxLat_);
      idx = this.addParallel_(lat, minLon, maxLon, squaredTolerance, extent, 0);
      cnt = 0;
      while (lat != this.minLat_ && cnt++ < maxLines) {
        lat = Math.max(lat - interval, this.minLat_);
        idx = this.addParallel_(lat, minLon, maxLon, squaredTolerance, extent, idx);
      }
      lat = clamp(centerLat, this.minLat_, this.maxLat_);
      cnt = 0;
      while (lat != this.maxLat_ && cnt++ < maxLines) {
        lat = Math.min(lat + interval, this.maxLat_);
        idx = this.addParallel_(lat, minLon, maxLon, squaredTolerance, extent, idx);
      }
      this.parallels_.length = idx;
      if (this.parallelsLabels_) {
        this.parallelsLabels_.length = idx;
      }
    };
    Graticule2.prototype.getInterval_ = function(resolution) {
      var centerLon = this.projectionCenterLonLat_[0];
      var centerLat = this.projectionCenterLonLat_[1];
      var interval = -1;
      var target = Math.pow(this.targetSize_ * resolution, 2);
      var p1 = [];
      var p2 = [];
      for (var i = 0, ii = this.intervals_.length; i < ii; ++i) {
        var delta = clamp(this.intervals_[i] / 2, 0, 90);
        var clampedLat = clamp(centerLat, -90 + delta, 90 - delta);
        p1[0] = centerLon - delta;
        p1[1] = clampedLat - delta;
        p2[0] = centerLon + delta;
        p2[1] = clampedLat + delta;
        this.fromLonLatTransform_(p1, p1);
        this.fromLonLatTransform_(p2, p2);
        var dist = Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2);
        if (dist <= target) {
          break;
        }
        interval = this.intervals_[i];
      }
      return interval;
    };
    Graticule2.prototype.getMeridian_ = function(lon, minLat, maxLat, squaredTolerance, index) {
      var flatCoordinates = meridian(lon, minLat, maxLat, this.projection_, squaredTolerance);
      var lineString = this.meridians_[index];
      if (!lineString) {
        lineString = new LineString_default(flatCoordinates, GeometryLayout_default.XY);
        this.meridians_[index] = lineString;
      } else {
        lineString.setFlatCoordinates(GeometryLayout_default.XY, flatCoordinates);
        lineString.changed();
      }
      return lineString;
    };
    Graticule2.prototype.getMeridianPoint_ = function(lineString, extent, index) {
      var flatCoordinates = lineString.getFlatCoordinates();
      var bottom = 1;
      var top = flatCoordinates.length - 1;
      if (flatCoordinates[bottom] > flatCoordinates[top]) {
        bottom = top;
        top = 1;
      }
      var clampedBottom = Math.max(extent[1], flatCoordinates[bottom]);
      var clampedTop = Math.min(extent[3], flatCoordinates[top]);
      var lat = clamp(extent[1] + Math.abs(extent[1] - extent[3]) * this.lonLabelPosition_, clampedBottom, clampedTop);
      var coordinate0 = flatCoordinates[bottom - 1] + (flatCoordinates[top - 1] - flatCoordinates[bottom - 1]) * (lat - flatCoordinates[bottom]) / (flatCoordinates[top] - flatCoordinates[bottom]);
      var coordinate = [coordinate0, lat];
      var point = this.meridiansLabels_[index].geom;
      point.setCoordinates(coordinate);
      return point;
    };
    Graticule2.prototype.getMeridians = function() {
      return this.meridians_;
    };
    Graticule2.prototype.getParallel_ = function(lat, minLon, maxLon, squaredTolerance, index) {
      var flatCoordinates = parallel(lat, minLon, maxLon, this.projection_, squaredTolerance);
      var lineString = this.parallels_[index];
      if (!lineString) {
        lineString = new LineString_default(flatCoordinates, GeometryLayout_default.XY);
      } else {
        lineString.setFlatCoordinates(GeometryLayout_default.XY, flatCoordinates);
        lineString.changed();
      }
      return lineString;
    };
    Graticule2.prototype.getParallelPoint_ = function(lineString, extent, index) {
      var flatCoordinates = lineString.getFlatCoordinates();
      var left = 0;
      var right = flatCoordinates.length - 2;
      if (flatCoordinates[left] > flatCoordinates[right]) {
        left = right;
        right = 0;
      }
      var clampedLeft = Math.max(extent[0], flatCoordinates[left]);
      var clampedRight = Math.min(extent[2], flatCoordinates[right]);
      var lon = clamp(extent[0] + Math.abs(extent[0] - extent[2]) * this.latLabelPosition_, clampedLeft, clampedRight);
      var coordinate1 = flatCoordinates[left + 1] + (flatCoordinates[right + 1] - flatCoordinates[left + 1]) * (lon - flatCoordinates[left]) / (flatCoordinates[right] - flatCoordinates[left]);
      var coordinate = [lon, coordinate1];
      var point = this.parallelsLabels_[index].geom;
      point.setCoordinates(coordinate);
      return point;
    };
    Graticule2.prototype.getParallels = function() {
      return this.parallels_;
    };
    Graticule2.prototype.updateProjectionInfo_ = function(projection) {
      var epsg4326Projection = get("EPSG:4326");
      var worldExtent = projection.getWorldExtent();
      this.maxLat_ = worldExtent[3];
      this.maxLon_ = worldExtent[2];
      this.minLat_ = worldExtent[1];
      this.minLon_ = worldExtent[0];
      var toLonLatTransform = getTransform(projection, epsg4326Projection);
      if (this.minLon_ < this.maxLon_) {
        this.toLonLatTransform_ = toLonLatTransform;
      } else {
        var split_1 = this.minLon_ + this.maxLon_ / 2;
        this.maxLon_ += 360;
        this.toLonLatTransform_ = function(coordinates, opt_output, opt_dimension) {
          var dimension = opt_dimension || 2;
          var lonLatCoordinates = toLonLatTransform(coordinates, opt_output, dimension);
          for (var i = 0, l = lonLatCoordinates.length; i < l; i += dimension) {
            if (lonLatCoordinates[i] < split_1) {
              lonLatCoordinates[i] += 360;
            }
          }
          return lonLatCoordinates;
        };
      }
      this.fromLonLatTransform_ = getTransform(epsg4326Projection, projection);
      var worldExtentP = applyTransform([this.minLon_, this.minLat_, this.maxLon_, this.maxLat_], this.fromLonLatTransform_, void 0, 8);
      this.minX_ = worldExtentP[0];
      this.maxX_ = worldExtentP[2];
      this.minY_ = worldExtentP[1];
      this.maxY_ = worldExtentP[3];
      this.bottomLeft_ = this.fromLonLatTransform_([this.minLon_, this.minLat_]);
      this.bottomRight_ = this.fromLonLatTransform_([this.maxLon_, this.minLat_]);
      this.topLeft_ = this.fromLonLatTransform_([this.minLon_, this.maxLat_]);
      this.topRight_ = this.fromLonLatTransform_([this.maxLon_, this.maxLat_]);
      this.projectionCenterLonLat_ = this.toLonLatTransform_(getCenter(projection.getExtent()));
      if (isNaN(this.projectionCenterLonLat_[1])) {
        this.projectionCenterLonLat_[1] = Math.abs(this.maxLat_) >= Math.abs(this.minLat_) ? this.maxLat_ : this.minLat_;
      }
      this.projection_ = projection;
    };
    return Graticule2;
  }(Vector_default)
);
var Graticule_default = Graticule;

// node_modules/ol/ImageCanvas.js
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
var ImageCanvas = (
  /** @class */
  function(_super) {
    __extends3(ImageCanvas2, _super);
    function ImageCanvas2(extent, resolution, pixelRatio, canvas, opt_loader) {
      var _this = this;
      var state = opt_loader !== void 0 ? ImageState_default.IDLE : ImageState_default.LOADED;
      _this = _super.call(this, extent, resolution, pixelRatio, state) || this;
      _this.loader_ = opt_loader !== void 0 ? opt_loader : null;
      _this.canvas_ = canvas;
      _this.error_ = null;
      return _this;
    }
    ImageCanvas2.prototype.getError = function() {
      return this.error_;
    };
    ImageCanvas2.prototype.handleLoad_ = function(err) {
      if (err) {
        this.error_ = err;
        this.state = ImageState_default.ERROR;
      } else {
        this.state = ImageState_default.LOADED;
      }
      this.changed();
    };
    ImageCanvas2.prototype.load = function() {
      if (this.state == ImageState_default.IDLE) {
        this.state = ImageState_default.LOADING;
        this.changed();
        this.loader_(this.handleLoad_.bind(this));
      }
    };
    ImageCanvas2.prototype.getImage = function() {
      return this.canvas_;
    };
    return ImageCanvas2;
  }(ImageBase_default)
);
var ImageCanvas_default = ImageCanvas;

// node_modules/ol/VectorRenderTile.js
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
var canvasPool = [];
var VectorRenderTile = (
  /** @class */
  function(_super) {
    __extends4(VectorRenderTile2, _super);
    function VectorRenderTile2(tileCoord, state, urlTileCoord, getSourceTiles) {
      var _this = _super.call(this, tileCoord, state, {
        transition: 0
      }) || this;
      _this.context_ = {};
      _this.executorGroups = {};
      _this.declutterExecutorGroups = {};
      _this.loadingSourceTiles = 0;
      _this.errorSourceTileKeys = {};
      _this.hitDetectionImageData = {};
      _this.replayState_ = {};
      _this.sourceTiles = null;
      _this.wantedResolution;
      _this.getSourceTiles = getSourceTiles.bind(void 0, _this);
      _this.sourceZ = -1;
      _this.hifi = false;
      _this.wrappedTileCoord = urlTileCoord;
      return _this;
    }
    VectorRenderTile2.prototype.getContext = function(layer) {
      var key = getUid(layer);
      if (!(key in this.context_)) {
        this.context_[key] = createCanvasContext2D(1, 1, canvasPool);
      }
      return this.context_[key];
    };
    VectorRenderTile2.prototype.hasContext = function(layer) {
      return getUid(layer) in this.context_;
    };
    VectorRenderTile2.prototype.getImage = function(layer) {
      return this.hasContext(layer) ? this.getContext(layer).canvas : null;
    };
    VectorRenderTile2.prototype.getReplayState = function(layer) {
      var key = getUid(layer);
      if (!(key in this.replayState_)) {
        this.replayState_[key] = {
          dirty: false,
          renderedRenderOrder: null,
          renderedResolution: NaN,
          renderedRevision: -1,
          renderedTileResolution: NaN,
          renderedTileRevision: -1,
          renderedZ: -1,
          renderedTileZ: -1
        };
      }
      return this.replayState_[key];
    };
    VectorRenderTile2.prototype.load = function() {
      this.getSourceTiles();
    };
    VectorRenderTile2.prototype.release = function() {
      for (var key in this.context_) {
        canvasPool.push(this.context_[key].canvas);
        delete this.context_[key];
      }
      _super.prototype.release.call(this);
    };
    return VectorRenderTile2;
  }(Tile_default)
);
var VectorRenderTile_default = VectorRenderTile;

// node_modules/ol/VectorTile.js
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
var VectorTile = (
  /** @class */
  function(_super) {
    __extends5(VectorTile2, _super);
    function VectorTile2(tileCoord, state, src, format, tileLoadFunction, opt_options) {
      var _this = _super.call(this, tileCoord, state, opt_options) || this;
      _this.extent = null;
      _this.format_ = format;
      _this.features_ = null;
      _this.loader_;
      _this.projection = null;
      _this.resolution;
      _this.tileLoadFunction_ = tileLoadFunction;
      _this.url_ = src;
      _this.key = src;
      return _this;
    }
    VectorTile2.prototype.getFormat = function() {
      return this.format_;
    };
    VectorTile2.prototype.getFeatures = function() {
      return this.features_;
    };
    VectorTile2.prototype.load = function() {
      if (this.state == TileState_default.IDLE) {
        this.setState(TileState_default.LOADING);
        this.tileLoadFunction_(this, this.url_);
        if (this.loader_) {
          this.loader_(this.extent, this.resolution, this.projection);
        }
      }
    };
    VectorTile2.prototype.onLoad = function(features, dataProjection) {
      this.setFeatures(features);
    };
    VectorTile2.prototype.onError = function() {
      this.setState(TileState_default.ERROR);
    };
    VectorTile2.prototype.setFeatures = function(features) {
      this.features_ = features;
      this.setState(TileState_default.LOADED);
    };
    VectorTile2.prototype.setLoader = function(loader) {
      this.loader_ = loader;
    };
    return VectorTile2;
  }(Tile_default)
);
var VectorTile_default = VectorTile;
export {
  AssertionError_default as AssertionError,
  Collection_default as Collection,
  Disposable_default as Disposable,
  Feature_default as Feature,
  Geolocation_default as Geolocation,
  Graticule_default as Graticule,
  Image_default as Image,
  ImageBase_default as ImageBase,
  ImageCanvas_default as ImageCanvas,
  ImageTile_default as ImageTile,
  Kinetic_default as Kinetic,
  Map_default as Map,
  MapBrowserEvent_default as MapBrowserEvent,
  MapBrowserEventHandler_default as MapBrowserEventHandler,
  MapEvent_default as MapEvent,
  Object_default as Object,
  Observable_default as Observable,
  Overlay_default as Overlay,
  PluggableMap_default as PluggableMap,
  Tile_default as Tile,
  TileCache_default as TileCache,
  TileQueue_default as TileQueue,
  TileRange_default as TileRange,
  VERSION,
  VectorRenderTile_default as VectorRenderTile,
  VectorTile_default as VectorTile,
  View_default as View,
  getUid
};
//# sourceMappingURL=ol.js.map
