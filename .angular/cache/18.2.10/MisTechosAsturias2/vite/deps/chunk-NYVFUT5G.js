import {
  State_default
} from "./chunk-LNJCZJZQ.js";
import {
  clamp
} from "./chunk-5JPMEZLO.js";
import {
  EventType_default,
  Event_default,
  Object_default,
  getChangeEventType,
  listen,
  unlistenByKey
} from "./chunk-5ORQIOU2.js";
import {
  abstract,
  assert,
  assign
} from "./chunk-MN23FWKY.js";

// node_modules/ol/render/EventType.js
var EventType_default2 = {
  /**
   * Triggered before a layer is rendered.
   * @event module:ol/render/Event~RenderEvent#prerender
   * @api
   */
  PRERENDER: "prerender",
  /**
   * Triggered after a layer is rendered.
   * @event module:ol/render/Event~RenderEvent#postrender
   * @api
   */
  POSTRENDER: "postrender",
  /**
   * Triggered before layers are rendered.
   * The event object will not have a `context` set.
   * @event module:ol/render/Event~RenderEvent#precompose
   * @api
   */
  PRECOMPOSE: "precompose",
  /**
   * Triggered after all layers are rendered.
   * The event object will not have a `context` set.
   * @event module:ol/render/Event~RenderEvent#postcompose
   * @api
   */
  POSTCOMPOSE: "postcompose",
  /**
   * Triggered when rendering is complete, i.e. all sources and tiles have
   * finished loading for the current viewport, and all tiles are faded in.
   * The event object will not have a `context` set.
   * @event module:ol/render/Event~RenderEvent#rendercomplete
   * @api
   */
  RENDERCOMPLETE: "rendercomplete"
};

// node_modules/ol/layer/Property.js
var Property_default = {
  OPACITY: "opacity",
  VISIBLE: "visible",
  EXTENT: "extent",
  Z_INDEX: "zIndex",
  MAX_RESOLUTION: "maxResolution",
  MIN_RESOLUTION: "minResolution",
  MAX_ZOOM: "maxZoom",
  MIN_ZOOM: "minZoom",
  SOURCE: "source"
};

// node_modules/ol/layer/Base.js
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
var BaseLayer = (
  /** @class */
  function(_super) {
    __extends(BaseLayer2, _super);
    function BaseLayer2(options) {
      var _this = _super.call(this) || this;
      var properties = assign({}, options);
      properties[Property_default.OPACITY] = options.opacity !== void 0 ? options.opacity : 1;
      assert(typeof properties[Property_default.OPACITY] === "number", 64);
      properties[Property_default.VISIBLE] = options.visible !== void 0 ? options.visible : true;
      properties[Property_default.Z_INDEX] = options.zIndex;
      properties[Property_default.MAX_RESOLUTION] = options.maxResolution !== void 0 ? options.maxResolution : Infinity;
      properties[Property_default.MIN_RESOLUTION] = options.minResolution !== void 0 ? options.minResolution : 0;
      properties[Property_default.MIN_ZOOM] = options.minZoom !== void 0 ? options.minZoom : -Infinity;
      properties[Property_default.MAX_ZOOM] = options.maxZoom !== void 0 ? options.maxZoom : Infinity;
      _this.className_ = properties.className !== void 0 ? options.className : "ol-layer";
      delete properties.className;
      _this.setProperties(properties);
      _this.state_ = null;
      return _this;
    }
    BaseLayer2.prototype.getClassName = function() {
      return this.className_;
    };
    BaseLayer2.prototype.getLayerState = function(opt_managed) {
      var state = this.state_ || /** @type {?} */
      {
        layer: this,
        managed: opt_managed === void 0 ? true : opt_managed
      };
      var zIndex = this.getZIndex();
      state.opacity = clamp(Math.round(this.getOpacity() * 100) / 100, 0, 1);
      state.sourceState = this.getSourceState();
      state.visible = this.getVisible();
      state.extent = this.getExtent();
      state.zIndex = zIndex !== void 0 ? zIndex : state.managed === false ? Infinity : 0;
      state.maxResolution = this.getMaxResolution();
      state.minResolution = Math.max(this.getMinResolution(), 0);
      state.minZoom = this.getMinZoom();
      state.maxZoom = this.getMaxZoom();
      this.state_ = state;
      return state;
    };
    BaseLayer2.prototype.getLayersArray = function(opt_array) {
      return abstract();
    };
    BaseLayer2.prototype.getLayerStatesArray = function(opt_states) {
      return abstract();
    };
    BaseLayer2.prototype.getExtent = function() {
      return (
        /** @type {import("../extent.js").Extent|undefined} */
        this.get(Property_default.EXTENT)
      );
    };
    BaseLayer2.prototype.getMaxResolution = function() {
      return (
        /** @type {number} */
        this.get(Property_default.MAX_RESOLUTION)
      );
    };
    BaseLayer2.prototype.getMinResolution = function() {
      return (
        /** @type {number} */
        this.get(Property_default.MIN_RESOLUTION)
      );
    };
    BaseLayer2.prototype.getMinZoom = function() {
      return (
        /** @type {number} */
        this.get(Property_default.MIN_ZOOM)
      );
    };
    BaseLayer2.prototype.getMaxZoom = function() {
      return (
        /** @type {number} */
        this.get(Property_default.MAX_ZOOM)
      );
    };
    BaseLayer2.prototype.getOpacity = function() {
      return (
        /** @type {number} */
        this.get(Property_default.OPACITY)
      );
    };
    BaseLayer2.prototype.getSourceState = function() {
      return abstract();
    };
    BaseLayer2.prototype.getVisible = function() {
      return (
        /** @type {boolean} */
        this.get(Property_default.VISIBLE)
      );
    };
    BaseLayer2.prototype.getZIndex = function() {
      return (
        /** @type {number} */
        this.get(Property_default.Z_INDEX)
      );
    };
    BaseLayer2.prototype.setExtent = function(extent) {
      this.set(Property_default.EXTENT, extent);
    };
    BaseLayer2.prototype.setMaxResolution = function(maxResolution) {
      this.set(Property_default.MAX_RESOLUTION, maxResolution);
    };
    BaseLayer2.prototype.setMinResolution = function(minResolution) {
      this.set(Property_default.MIN_RESOLUTION, minResolution);
    };
    BaseLayer2.prototype.setMaxZoom = function(maxZoom) {
      this.set(Property_default.MAX_ZOOM, maxZoom);
    };
    BaseLayer2.prototype.setMinZoom = function(minZoom) {
      this.set(Property_default.MIN_ZOOM, minZoom);
    };
    BaseLayer2.prototype.setOpacity = function(opacity) {
      assert(typeof opacity === "number", 64);
      this.set(Property_default.OPACITY, opacity);
    };
    BaseLayer2.prototype.setVisible = function(visible) {
      this.set(Property_default.VISIBLE, visible);
    };
    BaseLayer2.prototype.setZIndex = function(zindex) {
      this.set(Property_default.Z_INDEX, zindex);
    };
    BaseLayer2.prototype.disposeInternal = function() {
      if (this.state_) {
        this.state_.layer = null;
        this.state_ = null;
      }
      _super.prototype.disposeInternal.call(this);
    };
    return BaseLayer2;
  }(Object_default)
);
var Base_default = BaseLayer;

// node_modules/ol/layer/Layer.js
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
var Layer = (
  /** @class */
  function(_super) {
    __extends2(Layer2, _super);
    function Layer2(options) {
      var _this = this;
      var baseOptions = assign({}, options);
      delete baseOptions.source;
      _this = _super.call(this, baseOptions) || this;
      _this.mapPrecomposeKey_ = null;
      _this.mapRenderKey_ = null;
      _this.sourceChangeKey_ = null;
      _this.renderer_ = null;
      if (options.render) {
        _this.render = options.render;
      }
      if (options.map) {
        _this.setMap(options.map);
      }
      _this.addEventListener(getChangeEventType(Property_default.SOURCE), _this.handleSourcePropertyChange_);
      var source = options.source ? (
        /** @type {SourceType} */
        options.source
      ) : null;
      _this.setSource(source);
      return _this;
    }
    Layer2.prototype.getLayersArray = function(opt_array) {
      var array = opt_array ? opt_array : [];
      array.push(this);
      return array;
    };
    Layer2.prototype.getLayerStatesArray = function(opt_states) {
      var states = opt_states ? opt_states : [];
      states.push(this.getLayerState());
      return states;
    };
    Layer2.prototype.getSource = function() {
      return (
        /** @type {SourceType} */
        this.get(Property_default.SOURCE) || null
      );
    };
    Layer2.prototype.getSourceState = function() {
      var source = this.getSource();
      return !source ? State_default.UNDEFINED : source.getState();
    };
    Layer2.prototype.handleSourceChange_ = function() {
      this.changed();
    };
    Layer2.prototype.handleSourcePropertyChange_ = function() {
      if (this.sourceChangeKey_) {
        unlistenByKey(this.sourceChangeKey_);
        this.sourceChangeKey_ = null;
      }
      var source = this.getSource();
      if (source) {
        this.sourceChangeKey_ = listen(source, EventType_default.CHANGE, this.handleSourceChange_, this);
      }
      this.changed();
    };
    Layer2.prototype.getFeatures = function(pixel) {
      return this.renderer_.getFeatures(pixel);
    };
    Layer2.prototype.render = function(frameState, target) {
      var layerRenderer = this.getRenderer();
      if (layerRenderer.prepareFrame(frameState)) {
        return layerRenderer.renderFrame(frameState, target);
      }
    };
    Layer2.prototype.setMap = function(map) {
      if (this.mapPrecomposeKey_) {
        unlistenByKey(this.mapPrecomposeKey_);
        this.mapPrecomposeKey_ = null;
      }
      if (!map) {
        this.changed();
      }
      if (this.mapRenderKey_) {
        unlistenByKey(this.mapRenderKey_);
        this.mapRenderKey_ = null;
      }
      if (map) {
        this.mapPrecomposeKey_ = listen(map, EventType_default2.PRECOMPOSE, function(evt) {
          var renderEvent = (
            /** @type {import("../render/Event.js").default} */
            evt
          );
          var layerStatesArray = renderEvent.frameState.layerStatesArray;
          var layerState = this.getLayerState(false);
          assert(!layerStatesArray.some(function(arrayLayerState) {
            return arrayLayerState.layer === layerState.layer;
          }), 67);
          layerStatesArray.push(layerState);
        }, this);
        this.mapRenderKey_ = listen(this, EventType_default.CHANGE, map.render, map);
        this.changed();
      }
    };
    Layer2.prototype.setSource = function(source) {
      this.set(Property_default.SOURCE, source);
    };
    Layer2.prototype.getRenderer = function() {
      if (!this.renderer_) {
        this.renderer_ = this.createRenderer();
      }
      return this.renderer_;
    };
    Layer2.prototype.hasRenderer = function() {
      return !!this.renderer_;
    };
    Layer2.prototype.createRenderer = function() {
      return null;
    };
    Layer2.prototype.disposeInternal = function() {
      this.setSource(null);
      _super.prototype.disposeInternal.call(this);
    };
    return Layer2;
  }(Base_default)
);
function inView(layerState, viewState) {
  if (!layerState.visible) {
    return false;
  }
  var resolution = viewState.resolution;
  if (resolution < layerState.minResolution || resolution >= layerState.maxResolution) {
    return false;
  }
  var zoom = viewState.zoom;
  return zoom > layerState.minZoom && zoom <= layerState.maxZoom;
}
var Layer_default = Layer;

// node_modules/ol/render/Event.js
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
var RenderEvent = (
  /** @class */
  function(_super) {
    __extends3(RenderEvent2, _super);
    function RenderEvent2(type, opt_inversePixelTransform, opt_frameState, opt_context) {
      var _this = _super.call(this, type) || this;
      _this.inversePixelTransform = opt_inversePixelTransform;
      _this.frameState = opt_frameState;
      _this.context = opt_context;
      return _this;
    }
    return RenderEvent2;
  }(Event_default)
);
var Event_default2 = RenderEvent;

export {
  Base_default,
  EventType_default2 as EventType_default,
  inView,
  Layer_default,
  Event_default2 as Event_default
};
//# sourceMappingURL=chunk-NYVFUT5G.js.map
