import {
  Source_default
} from "./chunk-KB323GAH.js";
import {
  CollectionEventType_default,
  Collection_default
} from "./chunk-IPFZOMEQ.js";
import {
  RBush
} from "./chunk-5KKL43HL.js";
import {
  State_default
} from "./chunk-LNJCZJZQ.js";
import {
  EventType_default,
  Event_default,
  ObjectEventType_default,
  TRUE,
  VOID,
  extend,
  listen,
  unlistenByKey
} from "./chunk-5ORQIOU2.js";
import {
  assert,
  containsExtent,
  createOrUpdate,
  equals,
  getUid,
  getValues,
  isEmpty2 as isEmpty
} from "./chunk-MN23FWKY.js";

// node_modules/ol/structs/RBush.js
var RBush2 = (
  /** @class */
  function() {
    function RBush3(opt_maxEntries) {
      this.rbush_ = new RBush(opt_maxEntries);
      this.items_ = {};
    }
    RBush3.prototype.insert = function(extent, value) {
      var item = {
        minX: extent[0],
        minY: extent[1],
        maxX: extent[2],
        maxY: extent[3],
        value
      };
      this.rbush_.insert(item);
      this.items_[getUid(value)] = item;
    };
    RBush3.prototype.load = function(extents, values) {
      var items = new Array(values.length);
      for (var i = 0, l = values.length; i < l; i++) {
        var extent = extents[i];
        var value = values[i];
        var item = {
          minX: extent[0],
          minY: extent[1],
          maxX: extent[2],
          maxY: extent[3],
          value
        };
        items[i] = item;
        this.items_[getUid(value)] = item;
      }
      this.rbush_.load(items);
    };
    RBush3.prototype.remove = function(value) {
      var uid = getUid(value);
      var item = this.items_[uid];
      delete this.items_[uid];
      return this.rbush_.remove(item) !== null;
    };
    RBush3.prototype.update = function(extent, value) {
      var item = this.items_[getUid(value)];
      var bbox = [item.minX, item.minY, item.maxX, item.maxY];
      if (!equals(bbox, extent)) {
        this.remove(value);
        this.insert(extent, value);
      }
    };
    RBush3.prototype.getAll = function() {
      var items = this.rbush_.all();
      return items.map(function(item) {
        return item.value;
      });
    };
    RBush3.prototype.getInExtent = function(extent) {
      var bbox = {
        minX: extent[0],
        minY: extent[1],
        maxX: extent[2],
        maxY: extent[3]
      };
      var items = this.rbush_.search(bbox);
      return items.map(function(item) {
        return item.value;
      });
    };
    RBush3.prototype.forEach = function(callback) {
      return this.forEach_(this.getAll(), callback);
    };
    RBush3.prototype.forEachInExtent = function(extent, callback) {
      return this.forEach_(this.getInExtent(extent), callback);
    };
    RBush3.prototype.forEach_ = function(values, callback) {
      var result;
      for (var i = 0, l = values.length; i < l; i++) {
        result = callback(values[i]);
        if (result) {
          return result;
        }
      }
      return result;
    };
    RBush3.prototype.isEmpty = function() {
      return isEmpty(this.items_);
    };
    RBush3.prototype.clear = function() {
      this.rbush_.clear();
      this.items_ = {};
    };
    RBush3.prototype.getExtent = function(opt_extent) {
      var data = this.rbush_.toJSON();
      return createOrUpdate(data.minX, data.minY, data.maxX, data.maxY, opt_extent);
    };
    RBush3.prototype.concat = function(rbush) {
      this.rbush_.load(rbush.rbush_.all());
      for (var i in rbush.items_) {
        this.items_[i] = rbush.items_[i];
      }
    };
    return RBush3;
  }()
);
var RBush_default = RBush2;

// node_modules/ol/source/VectorEventType.js
var VectorEventType_default = {
  /**
   * Triggered when a feature is added to the source.
   * @event module:ol/source/Vector.VectorSourceEvent#addfeature
   * @api
   */
  ADDFEATURE: "addfeature",
  /**
   * Triggered when a feature is updated.
   * @event module:ol/source/Vector.VectorSourceEvent#changefeature
   * @api
   */
  CHANGEFEATURE: "changefeature",
  /**
   * Triggered when the clear method is called on the source.
   * @event module:ol/source/Vector.VectorSourceEvent#clear
   * @api
   */
  CLEAR: "clear",
  /**
   * Triggered when a feature is removed from the source.
   * See {@link module:ol/source/Vector#clear source.clear()} for exceptions.
   * @event module:ol/source/Vector.VectorSourceEvent#removefeature
   * @api
   */
  REMOVEFEATURE: "removefeature",
  /**
   * Triggered when features starts loading.
   * @event module:ol/source/Vector.VectorSourceEvent#featuresloadstart
   * @api
   */
  FEATURESLOADSTART: "featuresloadstart",
  /**
   * Triggered when features finishes loading.
   * @event module:ol/source/Vector.VectorSourceEvent#featuresloadend
   * @api
   */
  FEATURESLOADEND: "featuresloadend",
  /**
   * Triggered if feature loading results in an error.
   * @event module:ol/source/Vector.VectorSourceEvent#featuresloaderror
   * @api
   */
  FEATURESLOADERROR: "featuresloaderror"
};

// node_modules/ol/loadingstrategy.js
function all(extent, resolution) {
  return [[-Infinity, -Infinity, Infinity, Infinity]];
}

// node_modules/ol/format/FormatType.js
var FormatType_default = {
  ARRAY_BUFFER: "arraybuffer",
  JSON: "json",
  TEXT: "text",
  XML: "xml"
};

// node_modules/ol/featureloader.js
var withCredentials = false;
function loadFeaturesXhr(url, format, extent, resolution, projection, success, failure) {
  var xhr2 = new XMLHttpRequest();
  xhr2.open("GET", typeof url === "function" ? url(extent, resolution, projection) : url, true);
  if (format.getType() == FormatType_default.ARRAY_BUFFER) {
    xhr2.responseType = "arraybuffer";
  }
  xhr2.withCredentials = withCredentials;
  xhr2.onload = function(event) {
    if (!xhr2.status || xhr2.status >= 200 && xhr2.status < 300) {
      var type = format.getType();
      var source = void 0;
      if (type == FormatType_default.JSON || type == FormatType_default.TEXT) {
        source = xhr2.responseText;
      } else if (type == FormatType_default.XML) {
        source = xhr2.responseXML;
        if (!source) {
          source = new DOMParser().parseFromString(xhr2.responseText, "application/xml");
        }
      } else if (type == FormatType_default.ARRAY_BUFFER) {
        source = /** @type {ArrayBuffer} */
        xhr2.response;
      }
      if (source) {
        success(
          /** @type {Array<import("./Feature.js").default>} */
          format.readFeatures(source, {
            extent,
            featureProjection: projection
          }),
          format.readProjection(source)
        );
      } else {
        failure();
      }
    } else {
      failure();
    }
  };
  xhr2.onerror = failure;
  xhr2.send();
}
function xhr(url, format) {
  return function(extent, resolution, projection, success, failure) {
    var source = (
      /** @type {import("./source/Vector").default} */
      this
    );
    loadFeaturesXhr(
      url,
      format,
      extent,
      resolution,
      projection,
      /**
       * @param {Array<import("./Feature.js").default>} features The loaded features.
       * @param {import("./proj/Projection.js").default} dataProjection Data
       * projection.
       */
      function(features, dataProjection) {
        if (success !== void 0) {
          success(features);
        }
        source.addFeatures(features);
      },
      /* FIXME handle error */
      failure ? failure : VOID
    );
  };
}

// node_modules/ol/source/Vector.js
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
var VectorSourceEvent = (
  /** @class */
  function(_super) {
    __extends(VectorSourceEvent2, _super);
    function VectorSourceEvent2(type, opt_feature, opt_features) {
      var _this = _super.call(this, type) || this;
      _this.feature = opt_feature;
      _this.features = opt_features;
      return _this;
    }
    return VectorSourceEvent2;
  }(Event_default)
);
var VectorSource = (
  /** @class */
  function(_super) {
    __extends(VectorSource2, _super);
    function VectorSource2(opt_options) {
      var _this = this;
      var options = opt_options || {};
      _this = _super.call(this, {
        attributions: options.attributions,
        projection: void 0,
        state: State_default.READY,
        wrapX: options.wrapX !== void 0 ? options.wrapX : true
      }) || this;
      _this.loader_ = VOID;
      _this.format_ = options.format;
      _this.overlaps_ = options.overlaps === void 0 ? true : options.overlaps;
      _this.url_ = options.url;
      if (options.loader !== void 0) {
        _this.loader_ = options.loader;
      } else if (_this.url_ !== void 0) {
        assert(_this.format_, 7);
        _this.loader_ = xhr(
          _this.url_,
          /** @type {import("../format/Feature.js").default} */
          _this.format_
        );
      }
      _this.strategy_ = options.strategy !== void 0 ? options.strategy : all;
      var useSpatialIndex = options.useSpatialIndex !== void 0 ? options.useSpatialIndex : true;
      _this.featuresRtree_ = useSpatialIndex ? new RBush_default() : null;
      _this.loadedExtentsRtree_ = new RBush_default();
      _this.nullGeometryFeatures_ = {};
      _this.idIndex_ = {};
      _this.uidIndex_ = {};
      _this.featureChangeKeys_ = {};
      _this.featuresCollection_ = null;
      var collection, features;
      if (Array.isArray(options.features)) {
        features = options.features;
      } else if (options.features) {
        collection = options.features;
        features = collection.getArray();
      }
      if (!useSpatialIndex && collection === void 0) {
        collection = new Collection_default(features);
      }
      if (features !== void 0) {
        _this.addFeaturesInternal(features);
      }
      if (collection !== void 0) {
        _this.bindFeaturesCollection_(collection);
      }
      return _this;
    }
    VectorSource2.prototype.addFeature = function(feature) {
      this.addFeatureInternal(feature);
      this.changed();
    };
    VectorSource2.prototype.addFeatureInternal = function(feature) {
      var featureKey = getUid(feature);
      if (!this.addToIndex_(featureKey, feature)) {
        if (this.featuresCollection_) {
          this.featuresCollection_.remove(feature);
        }
        return;
      }
      this.setupChangeEvents_(featureKey, feature);
      var geometry = feature.getGeometry();
      if (geometry) {
        var extent = geometry.getExtent();
        if (this.featuresRtree_) {
          this.featuresRtree_.insert(extent, feature);
        }
      } else {
        this.nullGeometryFeatures_[featureKey] = feature;
      }
      this.dispatchEvent(new VectorSourceEvent(VectorEventType_default.ADDFEATURE, feature));
    };
    VectorSource2.prototype.setupChangeEvents_ = function(featureKey, feature) {
      this.featureChangeKeys_[featureKey] = [listen(feature, EventType_default.CHANGE, this.handleFeatureChange_, this), listen(feature, ObjectEventType_default.PROPERTYCHANGE, this.handleFeatureChange_, this)];
    };
    VectorSource2.prototype.addToIndex_ = function(featureKey, feature) {
      var valid = true;
      var id = feature.getId();
      if (id !== void 0) {
        if (!(id.toString() in this.idIndex_)) {
          this.idIndex_[id.toString()] = feature;
        } else {
          valid = false;
        }
      }
      if (valid) {
        assert(!(featureKey in this.uidIndex_), 30);
        this.uidIndex_[featureKey] = feature;
      }
      return valid;
    };
    VectorSource2.prototype.addFeatures = function(features) {
      this.addFeaturesInternal(features);
      this.changed();
    };
    VectorSource2.prototype.addFeaturesInternal = function(features) {
      var extents = [];
      var newFeatures = [];
      var geometryFeatures = [];
      for (var i = 0, length_1 = features.length; i < length_1; i++) {
        var feature = features[i];
        var featureKey = getUid(feature);
        if (this.addToIndex_(featureKey, feature)) {
          newFeatures.push(feature);
        }
      }
      for (var i = 0, length_2 = newFeatures.length; i < length_2; i++) {
        var feature = newFeatures[i];
        var featureKey = getUid(feature);
        this.setupChangeEvents_(featureKey, feature);
        var geometry = feature.getGeometry();
        if (geometry) {
          var extent = geometry.getExtent();
          extents.push(extent);
          geometryFeatures.push(feature);
        } else {
          this.nullGeometryFeatures_[featureKey] = feature;
        }
      }
      if (this.featuresRtree_) {
        this.featuresRtree_.load(extents, geometryFeatures);
      }
      for (var i = 0, length_3 = newFeatures.length; i < length_3; i++) {
        this.dispatchEvent(new VectorSourceEvent(VectorEventType_default.ADDFEATURE, newFeatures[i]));
      }
    };
    VectorSource2.prototype.bindFeaturesCollection_ = function(collection) {
      var modifyingCollection = false;
      this.addEventListener(
        VectorEventType_default.ADDFEATURE,
        /**
         * @param {VectorSourceEvent<Geometry>} evt The vector source event
         */
        function(evt) {
          if (!modifyingCollection) {
            modifyingCollection = true;
            collection.push(evt.feature);
            modifyingCollection = false;
          }
        }
      );
      this.addEventListener(
        VectorEventType_default.REMOVEFEATURE,
        /**
         * @param {VectorSourceEvent<Geometry>} evt The vector source event
         */
        function(evt) {
          if (!modifyingCollection) {
            modifyingCollection = true;
            collection.remove(evt.feature);
            modifyingCollection = false;
          }
        }
      );
      collection.addEventListener(
        CollectionEventType_default.ADD,
        /**
         * @param {import("../Collection.js").CollectionEvent} evt The collection event
         */
        function(evt) {
          if (!modifyingCollection) {
            modifyingCollection = true;
            this.addFeature(
              /** @type {import("../Feature.js").default<Geometry>} */
              evt.element
            );
            modifyingCollection = false;
          }
        }.bind(this)
      );
      collection.addEventListener(
        CollectionEventType_default.REMOVE,
        /**
         * @param {import("../Collection.js").CollectionEvent} evt The collection event
         */
        function(evt) {
          if (!modifyingCollection) {
            modifyingCollection = true;
            this.removeFeature(
              /** @type {import("../Feature.js").default<Geometry>} */
              evt.element
            );
            modifyingCollection = false;
          }
        }.bind(this)
      );
      this.featuresCollection_ = collection;
    };
    VectorSource2.prototype.clear = function(opt_fast) {
      if (opt_fast) {
        for (var featureId in this.featureChangeKeys_) {
          var keys = this.featureChangeKeys_[featureId];
          keys.forEach(unlistenByKey);
        }
        if (!this.featuresCollection_) {
          this.featureChangeKeys_ = {};
          this.idIndex_ = {};
          this.uidIndex_ = {};
        }
      } else {
        if (this.featuresRtree_) {
          this.featuresRtree_.forEach(this.removeFeatureInternal.bind(this));
          for (var id in this.nullGeometryFeatures_) {
            this.removeFeatureInternal(this.nullGeometryFeatures_[id]);
          }
        }
      }
      if (this.featuresCollection_) {
        this.featuresCollection_.clear();
      }
      if (this.featuresRtree_) {
        this.featuresRtree_.clear();
      }
      this.nullGeometryFeatures_ = {};
      var clearEvent = new VectorSourceEvent(VectorEventType_default.CLEAR);
      this.dispatchEvent(clearEvent);
      this.changed();
    };
    VectorSource2.prototype.forEachFeature = function(callback) {
      if (this.featuresRtree_) {
        return this.featuresRtree_.forEach(callback);
      } else if (this.featuresCollection_) {
        this.featuresCollection_.forEach(callback);
      }
    };
    VectorSource2.prototype.forEachFeatureAtCoordinateDirect = function(coordinate, callback) {
      var extent = [coordinate[0], coordinate[1], coordinate[0], coordinate[1]];
      return this.forEachFeatureInExtent(extent, function(feature) {
        var geometry = feature.getGeometry();
        if (geometry.intersectsCoordinate(coordinate)) {
          return callback(feature);
        } else {
          return void 0;
        }
      });
    };
    VectorSource2.prototype.forEachFeatureInExtent = function(extent, callback) {
      if (this.featuresRtree_) {
        return this.featuresRtree_.forEachInExtent(extent, callback);
      } else if (this.featuresCollection_) {
        this.featuresCollection_.forEach(callback);
      }
    };
    VectorSource2.prototype.forEachFeatureIntersectingExtent = function(extent, callback) {
      return this.forEachFeatureInExtent(
        extent,
        /**
         * @param {import("../Feature.js").default<Geometry>} feature Feature.
         * @return {T|undefined} The return value from the last call to the callback.
         */
        function(feature) {
          var geometry = feature.getGeometry();
          if (geometry.intersectsExtent(extent)) {
            var result = callback(feature);
            if (result) {
              return result;
            }
          }
        }
      );
    };
    VectorSource2.prototype.getFeaturesCollection = function() {
      return this.featuresCollection_;
    };
    VectorSource2.prototype.getFeatures = function() {
      var features;
      if (this.featuresCollection_) {
        features = this.featuresCollection_.getArray();
      } else if (this.featuresRtree_) {
        features = this.featuresRtree_.getAll();
        if (!isEmpty(this.nullGeometryFeatures_)) {
          extend(features, getValues(this.nullGeometryFeatures_));
        }
      }
      return (
        /** @type {Array<import("../Feature.js").default<Geometry>>} */
        features
      );
    };
    VectorSource2.prototype.getFeaturesAtCoordinate = function(coordinate) {
      var features = [];
      this.forEachFeatureAtCoordinateDirect(coordinate, function(feature) {
        features.push(feature);
      });
      return features;
    };
    VectorSource2.prototype.getFeaturesInExtent = function(extent) {
      if (this.featuresRtree_) {
        return this.featuresRtree_.getInExtent(extent);
      } else if (this.featuresCollection_) {
        return this.featuresCollection_.getArray();
      } else {
        return [];
      }
    };
    VectorSource2.prototype.getClosestFeatureToCoordinate = function(coordinate, opt_filter) {
      var x = coordinate[0];
      var y = coordinate[1];
      var closestFeature = null;
      var closestPoint = [NaN, NaN];
      var minSquaredDistance = Infinity;
      var extent = [-Infinity, -Infinity, Infinity, Infinity];
      var filter = opt_filter ? opt_filter : TRUE;
      this.featuresRtree_.forEachInExtent(
        extent,
        /**
         * @param {import("../Feature.js").default<Geometry>} feature Feature.
         */
        function(feature) {
          if (filter(feature)) {
            var geometry = feature.getGeometry();
            var previousMinSquaredDistance = minSquaredDistance;
            minSquaredDistance = geometry.closestPointXY(x, y, closestPoint, minSquaredDistance);
            if (minSquaredDistance < previousMinSquaredDistance) {
              closestFeature = feature;
              var minDistance = Math.sqrt(minSquaredDistance);
              extent[0] = x - minDistance;
              extent[1] = y - minDistance;
              extent[2] = x + minDistance;
              extent[3] = y + minDistance;
            }
          }
        }
      );
      return closestFeature;
    };
    VectorSource2.prototype.getExtent = function(opt_extent) {
      return this.featuresRtree_.getExtent(opt_extent);
    };
    VectorSource2.prototype.getFeatureById = function(id) {
      var feature = this.idIndex_[id.toString()];
      return feature !== void 0 ? feature : null;
    };
    VectorSource2.prototype.getFeatureByUid = function(uid) {
      var feature = this.uidIndex_[uid];
      return feature !== void 0 ? feature : null;
    };
    VectorSource2.prototype.getFormat = function() {
      return this.format_;
    };
    VectorSource2.prototype.getOverlaps = function() {
      return this.overlaps_;
    };
    VectorSource2.prototype.getUrl = function() {
      return this.url_;
    };
    VectorSource2.prototype.handleFeatureChange_ = function(event) {
      var feature = (
        /** @type {import("../Feature.js").default<Geometry>} */
        event.target
      );
      var featureKey = getUid(feature);
      var geometry = feature.getGeometry();
      if (!geometry) {
        if (!(featureKey in this.nullGeometryFeatures_)) {
          if (this.featuresRtree_) {
            this.featuresRtree_.remove(feature);
          }
          this.nullGeometryFeatures_[featureKey] = feature;
        }
      } else {
        var extent = geometry.getExtent();
        if (featureKey in this.nullGeometryFeatures_) {
          delete this.nullGeometryFeatures_[featureKey];
          if (this.featuresRtree_) {
            this.featuresRtree_.insert(extent, feature);
          }
        } else {
          if (this.featuresRtree_) {
            this.featuresRtree_.update(extent, feature);
          }
        }
      }
      var id = feature.getId();
      if (id !== void 0) {
        var sid = id.toString();
        if (this.idIndex_[sid] !== feature) {
          this.removeFromIdIndex_(feature);
          this.idIndex_[sid] = feature;
        }
      } else {
        this.removeFromIdIndex_(feature);
        this.uidIndex_[featureKey] = feature;
      }
      this.changed();
      this.dispatchEvent(new VectorSourceEvent(VectorEventType_default.CHANGEFEATURE, feature));
    };
    VectorSource2.prototype.hasFeature = function(feature) {
      var id = feature.getId();
      if (id !== void 0) {
        return id in this.idIndex_;
      } else {
        return getUid(feature) in this.uidIndex_;
      }
    };
    VectorSource2.prototype.isEmpty = function() {
      return this.featuresRtree_.isEmpty() && isEmpty(this.nullGeometryFeatures_);
    };
    VectorSource2.prototype.loadFeatures = function(extent, resolution, projection) {
      var loadedExtentsRtree = this.loadedExtentsRtree_;
      var extentsToLoad = this.strategy_(extent, resolution);
      this.loading = false;
      var _loop_1 = function(i2, ii2) {
        var extentToLoad = extentsToLoad[i2];
        var alreadyLoaded = loadedExtentsRtree.forEachInExtent(
          extentToLoad,
          /**
           * @param {{extent: import("../extent.js").Extent}} object Object.
           * @return {boolean} Contains.
           */
          function(object) {
            return containsExtent(object.extent, extentToLoad);
          }
        );
        if (!alreadyLoaded) {
          this_1.dispatchEvent(new VectorSourceEvent(VectorEventType_default.FEATURESLOADSTART));
          this_1.loader_.call(this_1, extentToLoad, resolution, projection, function(features) {
            this.dispatchEvent(new VectorSourceEvent(VectorEventType_default.FEATURESLOADEND, void 0, features));
          }.bind(this_1), function() {
            this.dispatchEvent(new VectorSourceEvent(VectorEventType_default.FEATURESLOADERROR));
          }.bind(this_1));
          loadedExtentsRtree.insert(extentToLoad, {
            extent: extentToLoad.slice()
          });
          this_1.loading = this_1.loader_ !== VOID;
        }
      };
      var this_1 = this;
      for (var i = 0, ii = extentsToLoad.length; i < ii; ++i) {
        _loop_1(i, ii);
      }
    };
    VectorSource2.prototype.refresh = function() {
      this.clear(true);
      this.loadedExtentsRtree_.clear();
      _super.prototype.refresh.call(this);
    };
    VectorSource2.prototype.removeLoadedExtent = function(extent) {
      var loadedExtentsRtree = this.loadedExtentsRtree_;
      var obj;
      loadedExtentsRtree.forEachInExtent(extent, function(object) {
        if (equals(object.extent, extent)) {
          obj = object;
          return true;
        }
      });
      if (obj) {
        loadedExtentsRtree.remove(obj);
      }
    };
    VectorSource2.prototype.removeFeature = function(feature) {
      var featureKey = getUid(feature);
      if (featureKey in this.nullGeometryFeatures_) {
        delete this.nullGeometryFeatures_[featureKey];
      } else {
        if (this.featuresRtree_) {
          this.featuresRtree_.remove(feature);
        }
      }
      this.removeFeatureInternal(feature);
      this.changed();
    };
    VectorSource2.prototype.removeFeatureInternal = function(feature) {
      var featureKey = getUid(feature);
      this.featureChangeKeys_[featureKey].forEach(unlistenByKey);
      delete this.featureChangeKeys_[featureKey];
      var id = feature.getId();
      if (id !== void 0) {
        delete this.idIndex_[id.toString()];
      }
      delete this.uidIndex_[featureKey];
      this.dispatchEvent(new VectorSourceEvent(VectorEventType_default.REMOVEFEATURE, feature));
    };
    VectorSource2.prototype.removeFromIdIndex_ = function(feature) {
      var removed = false;
      for (var id in this.idIndex_) {
        if (this.idIndex_[id] === feature) {
          delete this.idIndex_[id];
          removed = true;
          break;
        }
      }
      return removed;
    };
    VectorSource2.prototype.setLoader = function(loader) {
      this.loader_ = loader;
    };
    VectorSource2.prototype.setUrl = function(url) {
      assert(this.format_, 7);
      this.setLoader(xhr(url, this.format_));
    };
    return VectorSource2;
  }(Source_default)
);
var Vector_default = VectorSource;

export {
  FormatType_default,
  RBush_default,
  VectorEventType_default,
  VectorSourceEvent,
  Vector_default
};
//# sourceMappingURL=chunk-IEGF2JUD.js.map
