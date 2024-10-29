import {
  CollectionEventType_default,
  Collection_default
} from "./chunk-IPFZOMEQ.js";
import {
  DEFAULT_TILE_SIZE,
  easeOut,
  inAndOut
} from "./chunk-EQJ7DEGW.js";
import {
  MapEventType_default,
  Overlay_default
} from "./chunk-EOS2HULN.js";
import {
  OverlayPositioning_default
} from "./chunk-ENFFV6PJ.js";
import {
  TileState_default
} from "./chunk-D4CEI2RF.js";
import {
  Point_default,
  deflateCoordinates,
  deflateCoordinatesArray
} from "./chunk-ZAMJISOG.js";
import {
  ViewHint_default,
  douglasPeucker,
  inflateCoordinates,
  inflateCoordinatesArray,
  quantizeArray
} from "./chunk-CSFTPNSM.js";
import {
  shared
} from "./chunk-M73HJ6UG.js";
import {
  hasArea
} from "./chunk-OKB4YAGZ.js";
import {
  Base_default,
  EventType_default as EventType_default2,
  Event_default as Event_default2,
  inView
} from "./chunk-NYVFUT5G.js";
import {
  State_default
} from "./chunk-LNJCZJZQ.js";
import {
  checkedFonts
} from "./chunk-67PVPDW7.js";
import {
  CLASS_COLLAPSED,
  CLASS_CONTROL,
  CLASS_HIDDEN,
  CLASS_UNSELECTABLE,
  CLASS_UNSUPPORTED
} from "./chunk-5TINQ75E.js";
import {
  DEVICE_PIXEL_RATIO,
  IMAGE_DECODE,
  PASSIVE_EVENT_LISTENERS,
  removeChildren,
  removeNode,
  replaceChildren,
  replaceNode
} from "./chunk-NUKIIKKO.js";
import {
  GeometryLayout_default,
  SimpleGeometry_default
} from "./chunk-DEWJO73N.js";
import {
  METERS_PER_UNIT,
  Units_default,
  add,
  createProjection,
  equals as equals3,
  fromUserCoordinate,
  fromUserExtent,
  get,
  getPointResolution,
  getTransformFromProjections,
  getUserProjection,
  identityTransform,
  offset,
  rotate,
  toUserCoordinate,
  toUserExtent,
  wrapX
} from "./chunk-7ZC75XQY.js";
import {
  apply,
  compose,
  create,
  makeInverse
} from "./chunk-GAGXBDJ6.js";
import {
  GeometryType_default,
  clamp,
  lerp,
  modulo,
  squaredDistance,
  toRadians
} from "./chunk-5JPMEZLO.js";
import {
  Disposable_default,
  EventType_default,
  Event_default,
  ObjectEventType_default,
  Object_default,
  TRUE,
  Target_default,
  VOID,
  equals,
  extend,
  getChangeEventType,
  linearFindNearest,
  listen,
  listenOnce,
  numberSafeCompareFunction,
  stopPropagation,
  unlistenByKey
} from "./chunk-5ORQIOU2.js";
import {
  abstract,
  assert,
  assign,
  clear,
  clone,
  closestSquaredDistanceXY,
  containsExtent,
  createEmpty,
  createOrUpdateEmpty,
  equals as equals2,
  extendFlatCoordinates,
  forEachCorner,
  getBottomRight,
  getCenter,
  getForViewAndSize,
  getHeight,
  getIntersection,
  getTopLeft,
  getUid,
  getWidth,
  intersects,
  intersectsSegment,
  isEmpty,
  scaleFromCenter
} from "./chunk-MN23FWKY.js";

// node_modules/ol/control/Control.js
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
var Control = (
  /** @class */
  function(_super) {
    __extends(Control2, _super);
    function Control2(options) {
      var _this = _super.call(this) || this;
      var element = options.element;
      if (element && !options.target && !element.style.pointerEvents) {
        element.style.pointerEvents = "auto";
      }
      _this.element = element ? element : null;
      _this.target_ = null;
      _this.map_ = null;
      _this.listenerKeys = [];
      if (options.render) {
        _this.render = options.render;
      }
      if (options.target) {
        _this.setTarget(options.target);
      }
      return _this;
    }
    Control2.prototype.disposeInternal = function() {
      removeNode(this.element);
      _super.prototype.disposeInternal.call(this);
    };
    Control2.prototype.getMap = function() {
      return this.map_;
    };
    Control2.prototype.setMap = function(map) {
      if (this.map_) {
        removeNode(this.element);
      }
      for (var i = 0, ii = this.listenerKeys.length; i < ii; ++i) {
        unlistenByKey(this.listenerKeys[i]);
      }
      this.listenerKeys.length = 0;
      this.map_ = map;
      if (this.map_) {
        var target = this.target_ ? this.target_ : map.getOverlayContainerStopEvent();
        target.appendChild(this.element);
        if (this.render !== VOID) {
          this.listenerKeys.push(listen(map, MapEventType_default.POSTRENDER, this.render, this));
        }
        map.render();
      }
    };
    Control2.prototype.render = function(mapEvent) {
    };
    Control2.prototype.setTarget = function(target) {
      this.target_ = typeof target === "string" ? document.getElementById(target) : target;
    };
    return Control2;
  }(Object_default)
);
var Control_default = Control;

// node_modules/ol/control/Attribution.js
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
var Attribution = (
  /** @class */
  function(_super) {
    __extends2(Attribution2, _super);
    function Attribution2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      _this = _super.call(this, {
        element: document.createElement("div"),
        render: options.render,
        target: options.target
      }) || this;
      _this.ulElement_ = document.createElement("ul");
      _this.collapsed_ = options.collapsed !== void 0 ? options.collapsed : true;
      _this.userCollapsed_ = _this.collapsed_;
      _this.overrideCollapsible_ = options.collapsible !== void 0;
      _this.collapsible_ = options.collapsible !== void 0 ? options.collapsible : true;
      if (!_this.collapsible_) {
        _this.collapsed_ = false;
      }
      var className = options.className !== void 0 ? options.className : "ol-attribution";
      var tipLabel = options.tipLabel !== void 0 ? options.tipLabel : "Attributions";
      var expandClassName = options.expandClassName !== void 0 ? options.expandClassName : className + "-expand";
      var collapseLabel = options.collapseLabel !== void 0 ? options.collapseLabel : "»";
      var collapseClassName = options.collapseClassName !== void 0 ? options.collapseClassName : className + "-collpase";
      if (typeof collapseLabel === "string") {
        _this.collapseLabel_ = document.createElement("span");
        _this.collapseLabel_.textContent = collapseLabel;
        _this.collapseLabel_.className = collapseClassName;
      } else {
        _this.collapseLabel_ = collapseLabel;
      }
      var label = options.label !== void 0 ? options.label : "i";
      if (typeof label === "string") {
        _this.label_ = document.createElement("span");
        _this.label_.textContent = label;
        _this.label_.className = expandClassName;
      } else {
        _this.label_ = label;
      }
      var activeLabel = _this.collapsible_ && !_this.collapsed_ ? _this.collapseLabel_ : _this.label_;
      var button = document.createElement("button");
      button.setAttribute("type", "button");
      button.title = tipLabel;
      button.appendChild(activeLabel);
      button.addEventListener(EventType_default.CLICK, _this.handleClick_.bind(_this), false);
      var cssClasses = className + " " + CLASS_UNSELECTABLE + " " + CLASS_CONTROL + (_this.collapsed_ && _this.collapsible_ ? " " + CLASS_COLLAPSED : "") + (_this.collapsible_ ? "" : " ol-uncollapsible");
      var element = _this.element;
      element.className = cssClasses;
      element.appendChild(_this.ulElement_);
      element.appendChild(button);
      _this.renderedAttributions_ = [];
      _this.renderedVisible_ = true;
      return _this;
    }
    Attribution2.prototype.collectSourceAttributions_ = function(frameState) {
      var lookup = {};
      var visibleAttributions = [];
      var collapsible = true;
      var layerStatesArray = frameState.layerStatesArray;
      for (var i = 0, ii = layerStatesArray.length; i < ii; ++i) {
        var layerState = layerStatesArray[i];
        if (!inView(layerState, frameState.viewState)) {
          continue;
        }
        var source = (
          /** @type {import("../layer/Layer.js").default} */
          layerState.layer.getSource()
        );
        if (!source) {
          continue;
        }
        var attributionGetter = source.getAttributions();
        if (!attributionGetter) {
          continue;
        }
        var attributions = attributionGetter(frameState);
        if (!attributions) {
          continue;
        }
        collapsible = collapsible && source.getAttributionsCollapsible() !== false;
        if (Array.isArray(attributions)) {
          for (var j = 0, jj = attributions.length; j < jj; ++j) {
            if (!(attributions[j] in lookup)) {
              visibleAttributions.push(attributions[j]);
              lookup[attributions[j]] = true;
            }
          }
        } else {
          if (!(attributions in lookup)) {
            visibleAttributions.push(attributions);
            lookup[attributions] = true;
          }
        }
      }
      if (!this.overrideCollapsible_) {
        this.setCollapsible(collapsible);
      }
      return visibleAttributions;
    };
    Attribution2.prototype.updateElement_ = function(frameState) {
      if (!frameState) {
        if (this.renderedVisible_) {
          this.element.style.display = "none";
          this.renderedVisible_ = false;
        }
        return;
      }
      var attributions = this.collectSourceAttributions_(frameState);
      var visible = attributions.length > 0;
      if (this.renderedVisible_ != visible) {
        this.element.style.display = visible ? "" : "none";
        this.renderedVisible_ = visible;
      }
      if (equals(attributions, this.renderedAttributions_)) {
        return;
      }
      removeChildren(this.ulElement_);
      for (var i = 0, ii = attributions.length; i < ii; ++i) {
        var element = document.createElement("li");
        element.innerHTML = attributions[i];
        this.ulElement_.appendChild(element);
      }
      this.renderedAttributions_ = attributions;
    };
    Attribution2.prototype.handleClick_ = function(event) {
      event.preventDefault();
      this.handleToggle_();
      this.userCollapsed_ = this.collapsed_;
    };
    Attribution2.prototype.handleToggle_ = function() {
      this.element.classList.toggle(CLASS_COLLAPSED);
      if (this.collapsed_) {
        replaceNode(this.collapseLabel_, this.label_);
      } else {
        replaceNode(this.label_, this.collapseLabel_);
      }
      this.collapsed_ = !this.collapsed_;
    };
    Attribution2.prototype.getCollapsible = function() {
      return this.collapsible_;
    };
    Attribution2.prototype.setCollapsible = function(collapsible) {
      if (this.collapsible_ === collapsible) {
        return;
      }
      this.collapsible_ = collapsible;
      this.element.classList.toggle("ol-uncollapsible");
      if (this.userCollapsed_) {
        this.handleToggle_();
      }
    };
    Attribution2.prototype.setCollapsed = function(collapsed) {
      this.userCollapsed_ = collapsed;
      if (!this.collapsible_ || this.collapsed_ === collapsed) {
        return;
      }
      this.handleToggle_();
    };
    Attribution2.prototype.getCollapsed = function() {
      return this.collapsed_;
    };
    Attribution2.prototype.render = function(mapEvent) {
      this.updateElement_(mapEvent.frameState);
    };
    return Attribution2;
  }(Control_default)
);
var Attribution_default = Attribution;

// node_modules/ol/control/Rotate.js
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
var Rotate = (
  /** @class */
  function(_super) {
    __extends3(Rotate2, _super);
    function Rotate2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      _this = _super.call(this, {
        element: document.createElement("div"),
        render: options.render,
        target: options.target
      }) || this;
      var className = options.className !== void 0 ? options.className : "ol-rotate";
      var label = options.label !== void 0 ? options.label : "⇧";
      var compassClassName = options.compassClassName !== void 0 ? options.compassClassName : "ol-compass";
      _this.label_ = null;
      if (typeof label === "string") {
        _this.label_ = document.createElement("span");
        _this.label_.className = compassClassName;
        _this.label_.textContent = label;
      } else {
        _this.label_ = label;
        _this.label_.classList.add(compassClassName);
      }
      var tipLabel = options.tipLabel ? options.tipLabel : "Reset rotation";
      var button = document.createElement("button");
      button.className = className + "-reset";
      button.setAttribute("type", "button");
      button.title = tipLabel;
      button.appendChild(_this.label_);
      button.addEventListener(EventType_default.CLICK, _this.handleClick_.bind(_this), false);
      var cssClasses = className + " " + CLASS_UNSELECTABLE + " " + CLASS_CONTROL;
      var element = _this.element;
      element.className = cssClasses;
      element.appendChild(button);
      _this.callResetNorth_ = options.resetNorth ? options.resetNorth : void 0;
      _this.duration_ = options.duration !== void 0 ? options.duration : 250;
      _this.autoHide_ = options.autoHide !== void 0 ? options.autoHide : true;
      _this.rotation_ = void 0;
      if (_this.autoHide_) {
        _this.element.classList.add(CLASS_HIDDEN);
      }
      return _this;
    }
    Rotate2.prototype.handleClick_ = function(event) {
      event.preventDefault();
      if (this.callResetNorth_ !== void 0) {
        this.callResetNorth_();
      } else {
        this.resetNorth_();
      }
    };
    Rotate2.prototype.resetNorth_ = function() {
      var map = this.getMap();
      var view = map.getView();
      if (!view) {
        return;
      }
      var rotation = view.getRotation();
      if (rotation !== void 0) {
        if (this.duration_ > 0 && rotation % (2 * Math.PI) !== 0) {
          view.animate({
            rotation: 0,
            duration: this.duration_,
            easing: easeOut
          });
        } else {
          view.setRotation(0);
        }
      }
    };
    Rotate2.prototype.render = function(mapEvent) {
      var frameState = mapEvent.frameState;
      if (!frameState) {
        return;
      }
      var rotation = frameState.viewState.rotation;
      if (rotation != this.rotation_) {
        var transform = "rotate(" + rotation + "rad)";
        if (this.autoHide_) {
          var contains = this.element.classList.contains(CLASS_HIDDEN);
          if (!contains && rotation === 0) {
            this.element.classList.add(CLASS_HIDDEN);
          } else if (contains && rotation !== 0) {
            this.element.classList.remove(CLASS_HIDDEN);
          }
        }
        this.label_.style.transform = transform;
      }
      this.rotation_ = rotation;
    };
    return Rotate2;
  }(Control_default)
);
var Rotate_default = Rotate;

// node_modules/ol/control/Zoom.js
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
var Zoom = (
  /** @class */
  function(_super) {
    __extends4(Zoom2, _super);
    function Zoom2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      _this = _super.call(this, {
        element: document.createElement("div"),
        target: options.target
      }) || this;
      var className = options.className !== void 0 ? options.className : "ol-zoom";
      var delta = options.delta !== void 0 ? options.delta : 1;
      var zoomInClassName = options.zoomInClassName !== void 0 ? options.zoomInClassName : className + "-in";
      var zoomOutClassName = options.zoomOutClassName !== void 0 ? options.zoomOutClassName : className + "-out";
      var zoomInLabel = options.zoomInLabel !== void 0 ? options.zoomInLabel : "+";
      var zoomOutLabel = options.zoomOutLabel !== void 0 ? options.zoomOutLabel : "−";
      var zoomInTipLabel = options.zoomInTipLabel !== void 0 ? options.zoomInTipLabel : "Zoom in";
      var zoomOutTipLabel = options.zoomOutTipLabel !== void 0 ? options.zoomOutTipLabel : "Zoom out";
      var inElement = document.createElement("button");
      inElement.className = zoomInClassName;
      inElement.setAttribute("type", "button");
      inElement.title = zoomInTipLabel;
      inElement.appendChild(typeof zoomInLabel === "string" ? document.createTextNode(zoomInLabel) : zoomInLabel);
      inElement.addEventListener(EventType_default.CLICK, _this.handleClick_.bind(_this, delta), false);
      var outElement = document.createElement("button");
      outElement.className = zoomOutClassName;
      outElement.setAttribute("type", "button");
      outElement.title = zoomOutTipLabel;
      outElement.appendChild(typeof zoomOutLabel === "string" ? document.createTextNode(zoomOutLabel) : zoomOutLabel);
      outElement.addEventListener(EventType_default.CLICK, _this.handleClick_.bind(_this, -delta), false);
      var cssClasses = className + " " + CLASS_UNSELECTABLE + " " + CLASS_CONTROL;
      var element = _this.element;
      element.className = cssClasses;
      element.appendChild(inElement);
      element.appendChild(outElement);
      _this.duration_ = options.duration !== void 0 ? options.duration : 250;
      return _this;
    }
    Zoom2.prototype.handleClick_ = function(delta, event) {
      event.preventDefault();
      this.zoomByDelta_(delta);
    };
    Zoom2.prototype.zoomByDelta_ = function(delta) {
      var map = this.getMap();
      var view = map.getView();
      if (!view) {
        return;
      }
      var currentZoom = view.getZoom();
      if (currentZoom !== void 0) {
        var newZoom = view.getConstrainedZoom(currentZoom + delta);
        if (this.duration_ > 0) {
          if (view.getAnimating()) {
            view.cancelAnimations();
          }
          view.animate({
            zoom: newZoom,
            duration: this.duration_,
            easing: easeOut
          });
        } else {
          view.setZoom(newZoom);
        }
      }
    };
    return Zoom2;
  }(Control_default)
);
var Zoom_default = Zoom;

// node_modules/ol/control/FullScreen.js
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
var events = ["fullscreenchange", "webkitfullscreenchange", "MSFullscreenChange"];
var FullScreenEventType = {
  /**
   * Triggered after the map entered fullscreen.
   * @event FullScreenEventType#enterfullscreen
   * @api
   */
  ENTERFULLSCREEN: "enterfullscreen",
  /**
   * Triggered after the map leave fullscreen.
   * @event FullScreenEventType#leavefullscreen
   * @api
   */
  LEAVEFULLSCREEN: "leavefullscreen"
};
var FullScreen = (
  /** @class */
  function(_super) {
    __extends5(FullScreen2, _super);
    function FullScreen2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      _this = _super.call(this, {
        element: document.createElement("div"),
        target: options.target
      }) || this;
      _this.cssClassName_ = options.className !== void 0 ? options.className : "ol-full-screen";
      _this.activeClassName_ = options.activeClassName !== void 0 ? options.activeClassName.split(" ") : [_this.cssClassName_ + "-true"];
      _this.inactiveClassName_ = options.inactiveClassName !== void 0 ? options.inactiveClassName.split(" ") : [_this.cssClassName_ + "-false"];
      var label = options.label !== void 0 ? options.label : "⤢";
      _this.labelNode_ = typeof label === "string" ? document.createTextNode(label) : label;
      var labelActive = options.labelActive !== void 0 ? options.labelActive : "×";
      _this.labelActiveNode_ = typeof labelActive === "string" ? document.createTextNode(labelActive) : labelActive;
      _this.button_ = document.createElement("button");
      var tipLabel = options.tipLabel ? options.tipLabel : "Toggle full-screen";
      _this.setClassName_(_this.button_, isFullScreen());
      _this.button_.setAttribute("type", "button");
      _this.button_.title = tipLabel;
      _this.button_.appendChild(_this.labelNode_);
      _this.button_.addEventListener(EventType_default.CLICK, _this.handleClick_.bind(_this), false);
      var cssClasses = _this.cssClassName_ + " " + CLASS_UNSELECTABLE + " " + CLASS_CONTROL + " " + (!isFullScreenSupported() ? CLASS_UNSUPPORTED : "");
      var element = _this.element;
      element.className = cssClasses;
      element.appendChild(_this.button_);
      _this.keys_ = options.keys !== void 0 ? options.keys : false;
      _this.source_ = options.source;
      return _this;
    }
    FullScreen2.prototype.handleClick_ = function(event) {
      event.preventDefault();
      this.handleFullScreen_();
    };
    FullScreen2.prototype.handleFullScreen_ = function() {
      if (!isFullScreenSupported()) {
        return;
      }
      var map = this.getMap();
      if (!map) {
        return;
      }
      if (isFullScreen()) {
        exitFullScreen();
      } else {
        var element = void 0;
        if (this.source_) {
          element = typeof this.source_ === "string" ? document.getElementById(this.source_) : this.source_;
        } else {
          element = map.getTargetElement();
        }
        if (this.keys_) {
          requestFullScreenWithKeys(element);
        } else {
          requestFullScreen(element);
        }
      }
    };
    FullScreen2.prototype.handleFullScreenChange_ = function() {
      var map = this.getMap();
      if (isFullScreen()) {
        this.setClassName_(this.button_, true);
        replaceNode(this.labelActiveNode_, this.labelNode_);
        this.dispatchEvent(FullScreenEventType.ENTERFULLSCREEN);
      } else {
        this.setClassName_(this.button_, false);
        replaceNode(this.labelNode_, this.labelActiveNode_);
        this.dispatchEvent(FullScreenEventType.LEAVEFULLSCREEN);
      }
      if (map) {
        map.updateSize();
      }
    };
    FullScreen2.prototype.setClassName_ = function(element, fullscreen) {
      var _a, _b, _c;
      var activeClassName = this.activeClassName_;
      var inactiveClassName = this.inactiveClassName_;
      var nextClassName = fullscreen ? activeClassName : inactiveClassName;
      (_a = element.classList).remove.apply(_a, activeClassName);
      (_b = element.classList).remove.apply(_b, inactiveClassName);
      (_c = element.classList).add.apply(_c, nextClassName);
    };
    FullScreen2.prototype.setMap = function(map) {
      _super.prototype.setMap.call(this, map);
      if (map) {
        for (var i = 0, ii = events.length; i < ii; ++i) {
          this.listenerKeys.push(listen(document, events[i], this.handleFullScreenChange_, this));
        }
      }
    };
    return FullScreen2;
  }(Control_default)
);
function isFullScreenSupported() {
  var body = document.body;
  return !!(body["webkitRequestFullscreen"] || body["msRequestFullscreen"] && document["msFullscreenEnabled"] || body.requestFullscreen && document.fullscreenEnabled);
}
function isFullScreen() {
  return !!(document["webkitIsFullScreen"] || document["msFullscreenElement"] || document.fullscreenElement);
}
function requestFullScreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element["msRequestFullscreen"]) {
    element["msRequestFullscreen"]();
  } else if (element["webkitRequestFullscreen"]) {
    element["webkitRequestFullscreen"]();
  }
}
function requestFullScreenWithKeys(element) {
  if (element["webkitRequestFullscreen"]) {
    element["webkitRequestFullscreen"]();
  } else {
    requestFullScreen(element);
  }
}
function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document["msExitFullscreen"]) {
    document["msExitFullscreen"]();
  } else if (document["webkitExitFullscreen"]) {
    document["webkitExitFullscreen"]();
  }
}
var FullScreen_default = FullScreen;

// node_modules/ol/pointer/EventType.js
var EventType_default3 = {
  POINTERMOVE: "pointermove",
  POINTERDOWN: "pointerdown",
  POINTERUP: "pointerup",
  POINTEROVER: "pointerover",
  POINTEROUT: "pointerout",
  POINTERENTER: "pointerenter",
  POINTERLEAVE: "pointerleave",
  POINTERCANCEL: "pointercancel"
};

// node_modules/ol/control/MousePosition.js
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
var PROJECTION = "projection";
var COORDINATE_FORMAT = "coordinateFormat";
var MousePosition = (
  /** @class */
  function(_super) {
    __extends6(MousePosition2, _super);
    function MousePosition2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      var element = document.createElement("div");
      element.className = options.className !== void 0 ? options.className : "ol-mouse-position";
      _this = _super.call(this, {
        element,
        render: options.render,
        target: options.target
      }) || this;
      _this.addEventListener(getChangeEventType(PROJECTION), _this.handleProjectionChanged_);
      if (options.coordinateFormat) {
        _this.setCoordinateFormat(options.coordinateFormat);
      }
      if (options.projection) {
        _this.setProjection(options.projection);
      }
      _this.undefinedHTML_ = options.undefinedHTML !== void 0 ? options.undefinedHTML : "&#160;";
      _this.renderOnMouseOut_ = !!_this.undefinedHTML_;
      _this.renderedHTML_ = element.innerHTML;
      _this.mapProjection_ = null;
      _this.transform_ = null;
      return _this;
    }
    MousePosition2.prototype.handleProjectionChanged_ = function() {
      this.transform_ = null;
    };
    MousePosition2.prototype.getCoordinateFormat = function() {
      return (
        /** @type {import("../coordinate.js").CoordinateFormat|undefined} */
        this.get(COORDINATE_FORMAT)
      );
    };
    MousePosition2.prototype.getProjection = function() {
      return (
        /** @type {import("../proj/Projection.js").default|undefined} */
        this.get(PROJECTION)
      );
    };
    MousePosition2.prototype.handleMouseMove = function(event) {
      var map = this.getMap();
      this.updateHTML_(map.getEventPixel(event));
    };
    MousePosition2.prototype.handleMouseOut = function(event) {
      this.updateHTML_(null);
    };
    MousePosition2.prototype.setMap = function(map) {
      _super.prototype.setMap.call(this, map);
      if (map) {
        var viewport = map.getViewport();
        this.listenerKeys.push(listen(viewport, EventType_default3.POINTERMOVE, this.handleMouseMove, this));
        if (this.renderOnMouseOut_) {
          this.listenerKeys.push(listen(viewport, EventType_default3.POINTEROUT, this.handleMouseOut, this));
        }
      }
    };
    MousePosition2.prototype.setCoordinateFormat = function(format) {
      this.set(COORDINATE_FORMAT, format);
    };
    MousePosition2.prototype.setProjection = function(projection) {
      this.set(PROJECTION, get(projection));
    };
    MousePosition2.prototype.updateHTML_ = function(pixel) {
      var html = this.undefinedHTML_;
      if (pixel && this.mapProjection_) {
        if (!this.transform_) {
          var projection = this.getProjection();
          if (projection) {
            this.transform_ = getTransformFromProjections(this.mapProjection_, projection);
          } else {
            this.transform_ = identityTransform;
          }
        }
        var map = this.getMap();
        var coordinate = map.getCoordinateFromPixelInternal(pixel);
        if (coordinate) {
          var userProjection = getUserProjection();
          if (userProjection) {
            this.transform_ = getTransformFromProjections(this.mapProjection_, userProjection);
          }
          this.transform_(coordinate, coordinate);
          var coordinateFormat = this.getCoordinateFormat();
          if (coordinateFormat) {
            html = coordinateFormat(coordinate);
          } else {
            html = coordinate.toString();
          }
        }
      }
      if (!this.renderedHTML_ || html !== this.renderedHTML_) {
        this.element.innerHTML = html;
        this.renderedHTML_ = html;
      }
    };
    MousePosition2.prototype.render = function(mapEvent) {
      var frameState = mapEvent.frameState;
      if (!frameState) {
        this.mapProjection_ = null;
      } else {
        if (this.mapProjection_ != frameState.viewState.projection) {
          this.mapProjection_ = frameState.viewState.projection;
          this.transform_ = null;
        }
      }
    };
    return MousePosition2;
  }(Control_default)
);
var MousePosition_default = MousePosition;

// node_modules/ol/renderer/Map.js
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
var MapRenderer = (
  /** @class */
  function(_super) {
    __extends7(MapRenderer2, _super);
    function MapRenderer2(map) {
      var _this = _super.call(this) || this;
      _this.map_ = map;
      return _this;
    }
    MapRenderer2.prototype.dispatchRenderEvent = function(type, frameState) {
      abstract();
    };
    MapRenderer2.prototype.calculateMatrices2D = function(frameState) {
      var viewState = frameState.viewState;
      var coordinateToPixelTransform = frameState.coordinateToPixelTransform;
      var pixelToCoordinateTransform = frameState.pixelToCoordinateTransform;
      compose(coordinateToPixelTransform, frameState.size[0] / 2, frameState.size[1] / 2, 1 / viewState.resolution, -1 / viewState.resolution, -viewState.rotation, -viewState.center[0], -viewState.center[1]);
      makeInverse(pixelToCoordinateTransform, coordinateToPixelTransform);
    };
    MapRenderer2.prototype.forEachFeatureAtCoordinate = function(coordinate, frameState, hitTolerance, checkWrapped, callback, thisArg, layerFilter, thisArg2) {
      var result;
      var viewState = frameState.viewState;
      function forEachFeatureAtCoordinate(managed, feature, layer2, geometry) {
        return callback.call(thisArg, feature, managed ? layer2 : null, geometry);
      }
      var projection = viewState.projection;
      var translatedCoordinate = wrapX(coordinate.slice(), projection);
      var offsets = [[0, 0]];
      if (projection.canWrapX() && checkWrapped) {
        var projectionExtent = projection.getExtent();
        var worldWidth = getWidth(projectionExtent);
        offsets.push([-worldWidth, 0], [worldWidth, 0]);
      }
      var layerStates = frameState.layerStatesArray;
      var numLayers = layerStates.length;
      var matches = (
        /** @type {Array<HitMatch<T>>} */
        []
      );
      var tmpCoord = [];
      for (var i = 0; i < offsets.length; i++) {
        for (var j = numLayers - 1; j >= 0; --j) {
          var layerState = layerStates[j];
          var layer = layerState.layer;
          if (layer.hasRenderer() && inView(layerState, viewState) && layerFilter.call(thisArg2, layer)) {
            var layerRenderer = layer.getRenderer();
            var source = layer.getSource();
            if (layerRenderer && source) {
              var coordinates2 = source.getWrapX() ? translatedCoordinate : coordinate;
              var callback_1 = forEachFeatureAtCoordinate.bind(null, layerState.managed);
              tmpCoord[0] = coordinates2[0] + offsets[i][0];
              tmpCoord[1] = coordinates2[1] + offsets[i][1];
              result = layerRenderer.forEachFeatureAtCoordinate(tmpCoord, frameState, hitTolerance, callback_1, matches);
            }
            if (result) {
              return result;
            }
          }
        }
      }
      if (matches.length === 0) {
        return void 0;
      }
      var order = 1 / matches.length;
      matches.forEach(function(m, i2) {
        return m.distanceSq += i2 * order;
      });
      matches.sort(function(a, b) {
        return a.distanceSq - b.distanceSq;
      });
      matches.some(function(m) {
        return result = m.callback(m.feature, m.layer, m.geometry);
      });
      return result;
    };
    MapRenderer2.prototype.forEachLayerAtPixel = function(pixel, frameState, hitTolerance, callback, layerFilter) {
      return abstract();
    };
    MapRenderer2.prototype.hasFeatureAtCoordinate = function(coordinate, frameState, hitTolerance, checkWrapped, layerFilter, thisArg) {
      var hasFeature = this.forEachFeatureAtCoordinate(coordinate, frameState, hitTolerance, checkWrapped, TRUE, this, layerFilter, thisArg);
      return hasFeature !== void 0;
    };
    MapRenderer2.prototype.getMap = function() {
      return this.map_;
    };
    MapRenderer2.prototype.renderFrame = function(frameState) {
      abstract();
    };
    MapRenderer2.prototype.scheduleExpireIconCache = function(frameState) {
      if (shared.canExpireCache()) {
        frameState.postRenderFunctions.push(expireIconCache);
      }
    };
    return MapRenderer2;
  }(Disposable_default)
);
function expireIconCache(map, frameState) {
  shared.expire();
}
var Map_default = MapRenderer;

// node_modules/ol/renderer/Composite.js
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
var CompositeMapRenderer = (
  /** @class */
  function(_super) {
    __extends8(CompositeMapRenderer2, _super);
    function CompositeMapRenderer2(map) {
      var _this = _super.call(this, map) || this;
      _this.fontChangeListenerKey_ = listen(checkedFonts, ObjectEventType_default.PROPERTYCHANGE, map.redrawText.bind(map));
      _this.element_ = document.createElement("div");
      var style = _this.element_.style;
      style.position = "absolute";
      style.width = "100%";
      style.height = "100%";
      style.zIndex = "0";
      _this.element_.className = CLASS_UNSELECTABLE + " ol-layers";
      var container = map.getViewport();
      container.insertBefore(_this.element_, container.firstChild || null);
      _this.children_ = [];
      _this.renderedVisible_ = true;
      return _this;
    }
    CompositeMapRenderer2.prototype.dispatchRenderEvent = function(type, frameState) {
      var map = this.getMap();
      if (map.hasListener(type)) {
        var event_1 = new Event_default2(type, void 0, frameState);
        map.dispatchEvent(event_1);
      }
    };
    CompositeMapRenderer2.prototype.disposeInternal = function() {
      unlistenByKey(this.fontChangeListenerKey_);
      this.element_.parentNode.removeChild(this.element_);
      _super.prototype.disposeInternal.call(this);
    };
    CompositeMapRenderer2.prototype.renderFrame = function(frameState) {
      if (!frameState) {
        if (this.renderedVisible_) {
          this.element_.style.display = "none";
          this.renderedVisible_ = false;
        }
        return;
      }
      this.calculateMatrices2D(frameState);
      this.dispatchRenderEvent(EventType_default2.PRECOMPOSE, frameState);
      var layerStatesArray = frameState.layerStatesArray.sort(function(a, b) {
        return a.zIndex - b.zIndex;
      });
      var viewState = frameState.viewState;
      this.children_.length = 0;
      var declutterLayers = [];
      var previousElement = null;
      for (var i = 0, ii = layerStatesArray.length; i < ii; ++i) {
        var layerState = layerStatesArray[i];
        frameState.layerIndex = i;
        if (!inView(layerState, viewState) || layerState.sourceState != State_default.READY && layerState.sourceState != State_default.UNDEFINED) {
          continue;
        }
        var layer = layerState.layer;
        var element = layer.render(frameState, previousElement);
        if (!element) {
          continue;
        }
        if (element !== previousElement) {
          this.children_.push(element);
          previousElement = element;
        }
        if ("getDeclutter" in layer) {
          declutterLayers.push(layer);
        }
      }
      for (var i = declutterLayers.length - 1; i >= 0; --i) {
        declutterLayers[i].renderDeclutter(frameState);
      }
      replaceChildren(this.element_, this.children_);
      this.dispatchRenderEvent(EventType_default2.POSTCOMPOSE, frameState);
      if (!this.renderedVisible_) {
        this.element_.style.display = "";
        this.renderedVisible_ = true;
      }
      this.scheduleExpireIconCache(frameState);
    };
    CompositeMapRenderer2.prototype.forEachLayerAtPixel = function(pixel, frameState, hitTolerance, callback, layerFilter) {
      var viewState = frameState.viewState;
      var layerStates = frameState.layerStatesArray;
      var numLayers = layerStates.length;
      for (var i = numLayers - 1; i >= 0; --i) {
        var layerState = layerStates[i];
        var layer = layerState.layer;
        if (layer.hasRenderer() && inView(layerState, viewState) && layerFilter(layer)) {
          var layerRenderer = layer.getRenderer();
          var data = layerRenderer.getDataAtPixel(pixel, frameState, hitTolerance);
          if (data) {
            var result = callback(layer, data);
            if (result) {
              return result;
            }
          }
        }
      }
      return void 0;
    };
    return CompositeMapRenderer2;
  }(Map_default)
);
var Composite_default = CompositeMapRenderer;

// node_modules/ol/MapProperty.js
var MapProperty_default = {
  LAYERGROUP: "layergroup",
  SIZE: "size",
  TARGET: "target",
  VIEW: "view"
};

// node_modules/ol/layer/Group.js
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
var Property = {
  LAYERS: "layers"
};
var LayerGroup = (
  /** @class */
  function(_super) {
    __extends9(LayerGroup2, _super);
    function LayerGroup2(opt_options) {
      var _this = this;
      var options = opt_options || {};
      var baseOptions = (
        /** @type {Options} */
        assign({}, options)
      );
      delete baseOptions.layers;
      var layers = options.layers;
      _this = _super.call(this, baseOptions) || this;
      _this.layersListenerKeys_ = [];
      _this.listenerKeys_ = {};
      _this.addEventListener(getChangeEventType(Property.LAYERS), _this.handleLayersChanged_);
      if (layers) {
        if (Array.isArray(layers)) {
          layers = new Collection_default(layers.slice(), {
            unique: true
          });
        } else {
          assert(typeof /** @type {?} */
          layers.getArray === "function", 43);
        }
      } else {
        layers = new Collection_default(void 0, {
          unique: true
        });
      }
      _this.setLayers(layers);
      return _this;
    }
    LayerGroup2.prototype.handleLayerChange_ = function() {
      this.changed();
    };
    LayerGroup2.prototype.handleLayersChanged_ = function() {
      this.layersListenerKeys_.forEach(unlistenByKey);
      this.layersListenerKeys_.length = 0;
      var layers = this.getLayers();
      this.layersListenerKeys_.push(listen(layers, CollectionEventType_default.ADD, this.handleLayersAdd_, this), listen(layers, CollectionEventType_default.REMOVE, this.handleLayersRemove_, this));
      for (var id in this.listenerKeys_) {
        this.listenerKeys_[id].forEach(unlistenByKey);
      }
      clear(this.listenerKeys_);
      var layersArray = layers.getArray();
      for (var i = 0, ii = layersArray.length; i < ii; i++) {
        var layer = layersArray[i];
        this.listenerKeys_[getUid(layer)] = [listen(layer, ObjectEventType_default.PROPERTYCHANGE, this.handleLayerChange_, this), listen(layer, EventType_default.CHANGE, this.handleLayerChange_, this)];
      }
      this.changed();
    };
    LayerGroup2.prototype.handleLayersAdd_ = function(collectionEvent) {
      var layer = (
        /** @type {import("./Base.js").default} */
        collectionEvent.element
      );
      this.listenerKeys_[getUid(layer)] = [listen(layer, ObjectEventType_default.PROPERTYCHANGE, this.handleLayerChange_, this), listen(layer, EventType_default.CHANGE, this.handleLayerChange_, this)];
      this.changed();
    };
    LayerGroup2.prototype.handleLayersRemove_ = function(collectionEvent) {
      var layer = (
        /** @type {import("./Base.js").default} */
        collectionEvent.element
      );
      var key = getUid(layer);
      this.listenerKeys_[key].forEach(unlistenByKey);
      delete this.listenerKeys_[key];
      this.changed();
    };
    LayerGroup2.prototype.getLayers = function() {
      return (
        /** @type {!import("../Collection.js").default<import("./Base.js").default>} */
        this.get(Property.LAYERS)
      );
    };
    LayerGroup2.prototype.setLayers = function(layers) {
      this.set(Property.LAYERS, layers);
    };
    LayerGroup2.prototype.getLayersArray = function(opt_array) {
      var array = opt_array !== void 0 ? opt_array : [];
      this.getLayers().forEach(function(layer) {
        layer.getLayersArray(array);
      });
      return array;
    };
    LayerGroup2.prototype.getLayerStatesArray = function(opt_states) {
      var states = opt_states !== void 0 ? opt_states : [];
      var pos = states.length;
      this.getLayers().forEach(function(layer) {
        layer.getLayerStatesArray(states);
      });
      var ownLayerState = this.getLayerState();
      for (var i = pos, ii = states.length; i < ii; i++) {
        var layerState = states[i];
        layerState.opacity *= ownLayerState.opacity;
        layerState.visible = layerState.visible && ownLayerState.visible;
        layerState.maxResolution = Math.min(layerState.maxResolution, ownLayerState.maxResolution);
        layerState.minResolution = Math.max(layerState.minResolution, ownLayerState.minResolution);
        layerState.minZoom = Math.max(layerState.minZoom, ownLayerState.minZoom);
        layerState.maxZoom = Math.min(layerState.maxZoom, ownLayerState.maxZoom);
        if (ownLayerState.extent !== void 0) {
          if (layerState.extent !== void 0) {
            layerState.extent = getIntersection(layerState.extent, ownLayerState.extent);
          } else {
            layerState.extent = ownLayerState.extent;
          }
        }
      }
      return states;
    };
    LayerGroup2.prototype.getSourceState = function() {
      return State_default.READY;
    };
    return LayerGroup2;
  }(Base_default)
);
var Group_default = LayerGroup;

// node_modules/ol/MapEvent.js
var __extends10 = /* @__PURE__ */ function() {
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
var MapEvent = (
  /** @class */
  function(_super) {
    __extends10(MapEvent2, _super);
    function MapEvent2(type, map, opt_frameState) {
      var _this = _super.call(this, type) || this;
      _this.map = map;
      _this.frameState = opt_frameState !== void 0 ? opt_frameState : null;
      return _this;
    }
    return MapEvent2;
  }(Event_default)
);
var MapEvent_default = MapEvent;

// node_modules/ol/MapBrowserEvent.js
var __extends11 = /* @__PURE__ */ function() {
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
var MapBrowserEvent = (
  /** @class */
  function(_super) {
    __extends11(MapBrowserEvent2, _super);
    function MapBrowserEvent2(type, map, originalEvent, opt_dragging, opt_frameState) {
      var _this = _super.call(this, type, map, opt_frameState) || this;
      _this.originalEvent = originalEvent;
      _this.pixel_ = null;
      _this.coordinate_ = null;
      _this.dragging = opt_dragging !== void 0 ? opt_dragging : false;
      return _this;
    }
    Object.defineProperty(MapBrowserEvent2.prototype, "pixel", {
      /**
       * The map pixel relative to the viewport corresponding to the original event.
       * @type {import("./pixel.js").Pixel}
       * @api
       */
      get: function() {
        if (!this.pixel_) {
          this.pixel_ = this.map.getEventPixel(this.originalEvent);
        }
        return this.pixel_;
      },
      set: function(pixel) {
        this.pixel_ = pixel;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MapBrowserEvent2.prototype, "coordinate", {
      /**
       * The coordinate corresponding to the original browser event.  This will be in the user
       * projection if one is set.  Otherwise it will be in the view projection.
       * @type {import("./coordinate.js").Coordinate}
       * @api
       */
      get: function() {
        if (!this.coordinate_) {
          this.coordinate_ = this.map.getCoordinateFromPixel(this.pixel);
        }
        return this.coordinate_;
      },
      set: function(coordinate) {
        this.coordinate_ = coordinate;
      },
      enumerable: false,
      configurable: true
    });
    MapBrowserEvent2.prototype.preventDefault = function() {
      _super.prototype.preventDefault.call(this);
      this.originalEvent.preventDefault();
    };
    MapBrowserEvent2.prototype.stopPropagation = function() {
      _super.prototype.stopPropagation.call(this);
      this.originalEvent.stopPropagation();
    };
    return MapBrowserEvent2;
  }(MapEvent_default)
);
var MapBrowserEvent_default = MapBrowserEvent;

// node_modules/ol/MapBrowserEventType.js
var MapBrowserEventType_default = {
  /**
   * A true single click with no dragging and no double click. Note that this
   * event is delayed by 250 ms to ensure that it is not a double click.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#singleclick
   * @api
   */
  SINGLECLICK: "singleclick",
  /**
   * A click with no dragging. A double click will fire two of this.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#click
   * @api
   */
  CLICK: EventType_default.CLICK,
  /**
   * A true double click, with no dragging.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#dblclick
   * @api
   */
  DBLCLICK: EventType_default.DBLCLICK,
  /**
   * Triggered when a pointer is dragged.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#pointerdrag
   * @api
   */
  POINTERDRAG: "pointerdrag",
  /**
   * Triggered when a pointer is moved. Note that on touch devices this is
   * triggered when the map is panned, so is not the same as mousemove.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#pointermove
   * @api
   */
  POINTERMOVE: "pointermove",
  POINTERDOWN: "pointerdown",
  POINTERUP: "pointerup",
  POINTEROVER: "pointerover",
  POINTEROUT: "pointerout",
  POINTERENTER: "pointerenter",
  POINTERLEAVE: "pointerleave",
  POINTERCANCEL: "pointercancel"
};

// node_modules/ol/MapBrowserEventHandler.js
var __extends12 = /* @__PURE__ */ function() {
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
var MapBrowserEventHandler = (
  /** @class */
  function(_super) {
    __extends12(MapBrowserEventHandler2, _super);
    function MapBrowserEventHandler2(map, moveTolerance) {
      var _this = _super.call(this, map) || this;
      _this.map_ = map;
      _this.clickTimeoutId_;
      _this.emulateClicks_ = false;
      _this.dragging_ = false;
      _this.dragListenerKeys_ = [];
      _this.moveTolerance_ = moveTolerance ? moveTolerance * DEVICE_PIXEL_RATIO : DEVICE_PIXEL_RATIO;
      _this.down_ = null;
      var element = _this.map_.getViewport();
      _this.activePointers_ = 0;
      _this.trackedTouches_ = {};
      _this.element_ = element;
      _this.pointerdownListenerKey_ = listen(element, EventType_default3.POINTERDOWN, _this.handlePointerDown_, _this);
      _this.originalPointerMoveEvent_;
      _this.relayedListenerKey_ = listen(element, EventType_default3.POINTERMOVE, _this.relayEvent_, _this);
      _this.boundHandleTouchMove_ = _this.handleTouchMove_.bind(_this);
      _this.element_.addEventListener(EventType_default.TOUCHMOVE, _this.boundHandleTouchMove_, PASSIVE_EVENT_LISTENERS ? {
        passive: false
      } : false);
      return _this;
    }
    MapBrowserEventHandler2.prototype.emulateClick_ = function(pointerEvent) {
      var newEvent = new MapBrowserEvent_default(MapBrowserEventType_default.CLICK, this.map_, pointerEvent);
      this.dispatchEvent(newEvent);
      if (this.clickTimeoutId_ !== void 0) {
        clearTimeout(this.clickTimeoutId_);
        this.clickTimeoutId_ = void 0;
        newEvent = new MapBrowserEvent_default(MapBrowserEventType_default.DBLCLICK, this.map_, pointerEvent);
        this.dispatchEvent(newEvent);
      } else {
        this.clickTimeoutId_ = setTimeout(
          /** @this {MapBrowserEventHandler} */
          function() {
            this.clickTimeoutId_ = void 0;
            var newEvent2 = new MapBrowserEvent_default(MapBrowserEventType_default.SINGLECLICK, this.map_, pointerEvent);
            this.dispatchEvent(newEvent2);
          }.bind(this),
          250
        );
      }
    };
    MapBrowserEventHandler2.prototype.updateActivePointers_ = function(pointerEvent) {
      var event = pointerEvent;
      if (event.type == MapBrowserEventType_default.POINTERUP || event.type == MapBrowserEventType_default.POINTERCANCEL) {
        delete this.trackedTouches_[event.pointerId];
      } else if (event.type == MapBrowserEventType_default.POINTERDOWN) {
        this.trackedTouches_[event.pointerId] = true;
      }
      this.activePointers_ = Object.keys(this.trackedTouches_).length;
    };
    MapBrowserEventHandler2.prototype.handlePointerUp_ = function(pointerEvent) {
      this.updateActivePointers_(pointerEvent);
      var newEvent = new MapBrowserEvent_default(MapBrowserEventType_default.POINTERUP, this.map_, pointerEvent);
      this.dispatchEvent(newEvent);
      if (this.emulateClicks_ && !newEvent.propagationStopped && !this.dragging_ && this.isMouseActionButton_(pointerEvent)) {
        this.emulateClick_(this.down_);
      }
      if (this.activePointers_ === 0) {
        this.dragListenerKeys_.forEach(unlistenByKey);
        this.dragListenerKeys_.length = 0;
        this.dragging_ = false;
        this.down_ = null;
      }
    };
    MapBrowserEventHandler2.prototype.isMouseActionButton_ = function(pointerEvent) {
      return pointerEvent.button === 0;
    };
    MapBrowserEventHandler2.prototype.handlePointerDown_ = function(pointerEvent) {
      this.emulateClicks_ = this.activePointers_ === 0;
      this.updateActivePointers_(pointerEvent);
      var newEvent = new MapBrowserEvent_default(MapBrowserEventType_default.POINTERDOWN, this.map_, pointerEvent);
      this.dispatchEvent(newEvent);
      this.down_ = pointerEvent;
      if (this.dragListenerKeys_.length === 0) {
        var doc = this.map_.getOwnerDocument();
        this.dragListenerKeys_.push(
          listen(doc, MapBrowserEventType_default.POINTERMOVE, this.handlePointerMove_, this),
          listen(doc, MapBrowserEventType_default.POINTERUP, this.handlePointerUp_, this),
          /* Note that the listener for `pointercancel is set up on
           * `pointerEventHandler_` and not `documentPointerEventHandler_` like
           * the `pointerup` and `pointermove` listeners.
           *
           * The reason for this is the following: `TouchSource.vacuumTouches_()`
           * issues `pointercancel` events, when there was no `touchend` for a
           * `touchstart`. Now, let's say a first `touchstart` is registered on
           * `pointerEventHandler_`. The `documentPointerEventHandler_` is set up.
           * But `documentPointerEventHandler_` doesn't know about the first
           * `touchstart`. If there is no `touchend` for the `touchstart`, we can
           * only receive a `touchcancel` from `pointerEventHandler_`, because it is
           * only registered there.
           */
          listen(this.element_, MapBrowserEventType_default.POINTERCANCEL, this.handlePointerUp_, this)
        );
        if (this.element_.getRootNode && this.element_.getRootNode() !== doc) {
          this.dragListenerKeys_.push(listen(this.element_.getRootNode(), MapBrowserEventType_default.POINTERUP, this.handlePointerUp_, this));
        }
      }
    };
    MapBrowserEventHandler2.prototype.handlePointerMove_ = function(pointerEvent) {
      if (this.isMoving_(pointerEvent)) {
        this.dragging_ = true;
        var newEvent = new MapBrowserEvent_default(MapBrowserEventType_default.POINTERDRAG, this.map_, pointerEvent, this.dragging_);
        this.dispatchEvent(newEvent);
      }
    };
    MapBrowserEventHandler2.prototype.relayEvent_ = function(pointerEvent) {
      this.originalPointerMoveEvent_ = pointerEvent;
      var dragging = !!(this.down_ && this.isMoving_(pointerEvent));
      this.dispatchEvent(new MapBrowserEvent_default(pointerEvent.type, this.map_, pointerEvent, dragging));
    };
    MapBrowserEventHandler2.prototype.handleTouchMove_ = function(event) {
      if (!this.originalPointerMoveEvent_ || this.originalPointerMoveEvent_.defaultPrevented) {
        event.preventDefault();
      }
    };
    MapBrowserEventHandler2.prototype.isMoving_ = function(pointerEvent) {
      return this.dragging_ || Math.abs(pointerEvent.clientX - this.down_.clientX) > this.moveTolerance_ || Math.abs(pointerEvent.clientY - this.down_.clientY) > this.moveTolerance_;
    };
    MapBrowserEventHandler2.prototype.disposeInternal = function() {
      if (this.relayedListenerKey_) {
        unlistenByKey(this.relayedListenerKey_);
        this.relayedListenerKey_ = null;
      }
      this.element_.removeEventListener(EventType_default.TOUCHMOVE, this.boundHandleTouchMove_);
      if (this.pointerdownListenerKey_) {
        unlistenByKey(this.pointerdownListenerKey_);
        this.pointerdownListenerKey_ = null;
      }
      this.dragListenerKeys_.forEach(unlistenByKey);
      this.dragListenerKeys_.length = 0;
      this.element_ = null;
      _super.prototype.disposeInternal.call(this);
    };
    return MapBrowserEventHandler2;
  }(Target_default)
);
var MapBrowserEventHandler_default = MapBrowserEventHandler;

// node_modules/ol/structs/PriorityQueue.js
var DROP = Infinity;
var PriorityQueue = (
  /** @class */
  function() {
    function PriorityQueue2(priorityFunction, keyFunction) {
      this.priorityFunction_ = priorityFunction;
      this.keyFunction_ = keyFunction;
      this.elements_ = [];
      this.priorities_ = [];
      this.queuedElements_ = {};
    }
    PriorityQueue2.prototype.clear = function() {
      this.elements_.length = 0;
      this.priorities_.length = 0;
      clear(this.queuedElements_);
    };
    PriorityQueue2.prototype.dequeue = function() {
      var elements = this.elements_;
      var priorities = this.priorities_;
      var element = elements[0];
      if (elements.length == 1) {
        elements.length = 0;
        priorities.length = 0;
      } else {
        elements[0] = elements.pop();
        priorities[0] = priorities.pop();
        this.siftUp_(0);
      }
      var elementKey = this.keyFunction_(element);
      delete this.queuedElements_[elementKey];
      return element;
    };
    PriorityQueue2.prototype.enqueue = function(element) {
      assert(!(this.keyFunction_(element) in this.queuedElements_), 31);
      var priority = this.priorityFunction_(element);
      if (priority != DROP) {
        this.elements_.push(element);
        this.priorities_.push(priority);
        this.queuedElements_[this.keyFunction_(element)] = true;
        this.siftDown_(0, this.elements_.length - 1);
        return true;
      }
      return false;
    };
    PriorityQueue2.prototype.getCount = function() {
      return this.elements_.length;
    };
    PriorityQueue2.prototype.getLeftChildIndex_ = function(index) {
      return index * 2 + 1;
    };
    PriorityQueue2.prototype.getRightChildIndex_ = function(index) {
      return index * 2 + 2;
    };
    PriorityQueue2.prototype.getParentIndex_ = function(index) {
      return index - 1 >> 1;
    };
    PriorityQueue2.prototype.heapify_ = function() {
      var i;
      for (i = (this.elements_.length >> 1) - 1; i >= 0; i--) {
        this.siftUp_(i);
      }
    };
    PriorityQueue2.prototype.isEmpty = function() {
      return this.elements_.length === 0;
    };
    PriorityQueue2.prototype.isKeyQueued = function(key) {
      return key in this.queuedElements_;
    };
    PriorityQueue2.prototype.isQueued = function(element) {
      return this.isKeyQueued(this.keyFunction_(element));
    };
    PriorityQueue2.prototype.siftUp_ = function(index) {
      var elements = this.elements_;
      var priorities = this.priorities_;
      var count = elements.length;
      var element = elements[index];
      var priority = priorities[index];
      var startIndex = index;
      while (index < count >> 1) {
        var lIndex = this.getLeftChildIndex_(index);
        var rIndex = this.getRightChildIndex_(index);
        var smallerChildIndex = rIndex < count && priorities[rIndex] < priorities[lIndex] ? rIndex : lIndex;
        elements[index] = elements[smallerChildIndex];
        priorities[index] = priorities[smallerChildIndex];
        index = smallerChildIndex;
      }
      elements[index] = element;
      priorities[index] = priority;
      this.siftDown_(startIndex, index);
    };
    PriorityQueue2.prototype.siftDown_ = function(startIndex, index) {
      var elements = this.elements_;
      var priorities = this.priorities_;
      var element = elements[index];
      var priority = priorities[index];
      while (index > startIndex) {
        var parentIndex = this.getParentIndex_(index);
        if (priorities[parentIndex] > priority) {
          elements[index] = elements[parentIndex];
          priorities[index] = priorities[parentIndex];
          index = parentIndex;
        } else {
          break;
        }
      }
      elements[index] = element;
      priorities[index] = priority;
    };
    PriorityQueue2.prototype.reprioritize = function() {
      var priorityFunction = this.priorityFunction_;
      var elements = this.elements_;
      var priorities = this.priorities_;
      var index = 0;
      var n = elements.length;
      var element, i, priority;
      for (i = 0; i < n; ++i) {
        element = elements[i];
        priority = priorityFunction(element);
        if (priority == DROP) {
          delete this.queuedElements_[this.keyFunction_(element)];
        } else {
          priorities[index] = priority;
          elements[index++] = element;
        }
      }
      elements.length = index;
      priorities.length = index;
      this.heapify_();
    };
    return PriorityQueue2;
  }()
);
var PriorityQueue_default = PriorityQueue;

// node_modules/ol/TileQueue.js
var __extends13 = /* @__PURE__ */ function() {
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
var TileQueue = (
  /** @class */
  function(_super) {
    __extends13(TileQueue2, _super);
    function TileQueue2(tilePriorityFunction, tileChangeCallback) {
      var _this = _super.call(
        this,
        /**
         * @param {Array} element Element.
         * @return {number} Priority.
         */
        function(element) {
          return tilePriorityFunction.apply(null, element);
        },
        /**
         * @param {Array} element Element.
         * @return {string} Key.
         */
        function(element) {
          return (
            /** @type {import("./Tile.js").default} */
            element[0].getKey()
          );
        }
      ) || this;
      _this.boundHandleTileChange_ = _this.handleTileChange.bind(_this);
      _this.tileChangeCallback_ = tileChangeCallback;
      _this.tilesLoading_ = 0;
      _this.tilesLoadingKeys_ = {};
      return _this;
    }
    TileQueue2.prototype.enqueue = function(element) {
      var added = _super.prototype.enqueue.call(this, element);
      if (added) {
        var tile = element[0];
        tile.addEventListener(EventType_default.CHANGE, this.boundHandleTileChange_);
      }
      return added;
    };
    TileQueue2.prototype.getTilesLoading = function() {
      return this.tilesLoading_;
    };
    TileQueue2.prototype.handleTileChange = function(event) {
      var tile = (
        /** @type {import("./Tile.js").default} */
        event.target
      );
      var state = tile.getState();
      if (tile.hifi && state === TileState_default.LOADED || state === TileState_default.ERROR || state === TileState_default.EMPTY) {
        tile.removeEventListener(EventType_default.CHANGE, this.boundHandleTileChange_);
        var tileKey = tile.getKey();
        if (tileKey in this.tilesLoadingKeys_) {
          delete this.tilesLoadingKeys_[tileKey];
          --this.tilesLoading_;
        }
        this.tileChangeCallback_();
      }
    };
    TileQueue2.prototype.loadMoreTiles = function(maxTotalLoading, maxNewLoads) {
      var newLoads = 0;
      var state, tile, tileKey;
      while (this.tilesLoading_ < maxTotalLoading && newLoads < maxNewLoads && this.getCount() > 0) {
        tile = /** @type {import("./Tile.js").default} */
        this.dequeue()[0];
        tileKey = tile.getKey();
        state = tile.getState();
        if (state === TileState_default.IDLE && !(tileKey in this.tilesLoadingKeys_)) {
          this.tilesLoadingKeys_[tileKey] = true;
          ++this.tilesLoading_;
          ++newLoads;
          tile.load();
        }
      }
    };
    return TileQueue2;
  }(PriorityQueue_default)
);
var TileQueue_default = TileQueue;
function getTilePriority(frameState, tile, tileSourceKey, tileCenter, tileResolution) {
  if (!frameState || !(tileSourceKey in frameState.wantedTiles)) {
    return DROP;
  }
  if (!frameState.wantedTiles[tileSourceKey][tile.getKey()]) {
    return DROP;
  }
  var center = frameState.viewState.center;
  var deltaX = tileCenter[0] - center[0];
  var deltaY = tileCenter[1] - center[1];
  return 65536 * Math.log(tileResolution) + Math.sqrt(deltaX * deltaX + deltaY * deltaY) / tileResolution;
}

// node_modules/ol/ViewProperty.js
var ViewProperty_default = {
  CENTER: "center",
  RESOLUTION: "resolution",
  ROTATION: "rotation"
};

// node_modules/ol/centerconstraint.js
function createExtent(extent, onlyCenter, smooth) {
  return (
    /**
     * @param {import("./coordinate.js").Coordinate|undefined} center Center.
     * @param {number} resolution Resolution.
     * @param {import("./size.js").Size} size Viewport size; unused if `onlyCenter` was specified.
     * @param {boolean=} opt_isMoving True if an interaction or animation is in progress.
     * @param {Array<number>=} opt_centerShift Shift between map center and viewport center.
     * @return {import("./coordinate.js").Coordinate|undefined} Center.
     */
    function(center, resolution, size, opt_isMoving, opt_centerShift) {
      if (center) {
        var viewWidth = onlyCenter ? 0 : size[0] * resolution;
        var viewHeight = onlyCenter ? 0 : size[1] * resolution;
        var shiftX = opt_centerShift ? opt_centerShift[0] : 0;
        var shiftY = opt_centerShift ? opt_centerShift[1] : 0;
        var minX = extent[0] + viewWidth / 2 + shiftX;
        var maxX = extent[2] - viewWidth / 2 + shiftX;
        var minY = extent[1] + viewHeight / 2 + shiftY;
        var maxY = extent[3] - viewHeight / 2 + shiftY;
        if (minX > maxX) {
          minX = (maxX + minX) / 2;
          maxX = minX;
        }
        if (minY > maxY) {
          minY = (maxY + minY) / 2;
          maxY = minY;
        }
        var x = clamp(center[0], minX, maxX);
        var y = clamp(center[1], minY, maxY);
        var ratio = 30 * resolution;
        if (opt_isMoving && smooth) {
          x += -ratio * Math.log(1 + Math.max(0, minX - center[0]) / ratio) + ratio * Math.log(1 + Math.max(0, center[0] - maxX) / ratio);
          y += -ratio * Math.log(1 + Math.max(0, minY - center[1]) / ratio) + ratio * Math.log(1 + Math.max(0, center[1] - maxY) / ratio);
        }
        return [x, y];
      } else {
        return void 0;
      }
    }
  );
}
function none(center) {
  return center;
}

// node_modules/ol/resolutionconstraint.js
function getViewportClampedResolution(resolution, maxExtent, viewportSize, showFullExtent) {
  var xResolution = getWidth(maxExtent) / viewportSize[0];
  var yResolution = getHeight(maxExtent) / viewportSize[1];
  if (showFullExtent) {
    return Math.min(resolution, Math.max(xResolution, yResolution));
  }
  return Math.min(resolution, Math.min(xResolution, yResolution));
}
function getSmoothClampedResolution(resolution, maxResolution, minResolution) {
  var result = Math.min(resolution, maxResolution);
  var ratio = 50;
  result *= Math.log(1 + ratio * Math.max(0, resolution / maxResolution - 1)) / ratio + 1;
  if (minResolution) {
    result = Math.max(result, minResolution);
    result /= Math.log(1 + ratio * Math.max(0, minResolution / resolution - 1)) / ratio + 1;
  }
  return clamp(result, minResolution / 2, maxResolution * 2);
}
function createSnapToResolutions(resolutions, opt_smooth, opt_maxExtent, opt_showFullExtent) {
  return (
    /**
     * @param {number|undefined} resolution Resolution.
     * @param {number} direction Direction.
     * @param {import("./size.js").Size} size Viewport size.
     * @param {boolean=} opt_isMoving True if an interaction or animation is in progress.
     * @return {number|undefined} Resolution.
     */
    function(resolution, direction, size, opt_isMoving) {
      if (resolution !== void 0) {
        var maxResolution = resolutions[0];
        var minResolution = resolutions[resolutions.length - 1];
        var cappedMaxRes = opt_maxExtent ? getViewportClampedResolution(maxResolution, opt_maxExtent, size, opt_showFullExtent) : maxResolution;
        if (opt_isMoving) {
          var smooth = opt_smooth !== void 0 ? opt_smooth : true;
          if (!smooth) {
            return clamp(resolution, minResolution, cappedMaxRes);
          }
          return getSmoothClampedResolution(resolution, cappedMaxRes, minResolution);
        }
        var capped = Math.min(cappedMaxRes, resolution);
        var z = Math.floor(linearFindNearest(resolutions, capped, direction));
        if (resolutions[z] > cappedMaxRes && z < resolutions.length - 1) {
          return resolutions[z + 1];
        }
        return resolutions[z];
      } else {
        return void 0;
      }
    }
  );
}
function createSnapToPower(power, maxResolution, opt_minResolution, opt_smooth, opt_maxExtent, opt_showFullExtent) {
  return (
    /**
     * @param {number|undefined} resolution Resolution.
     * @param {number} direction Direction.
     * @param {import("./size.js").Size} size Viewport size.
     * @param {boolean=} opt_isMoving True if an interaction or animation is in progress.
     * @return {number|undefined} Resolution.
     */
    function(resolution, direction, size, opt_isMoving) {
      if (resolution !== void 0) {
        var cappedMaxRes = opt_maxExtent ? getViewportClampedResolution(maxResolution, opt_maxExtent, size, opt_showFullExtent) : maxResolution;
        var minResolution = opt_minResolution !== void 0 ? opt_minResolution : 0;
        if (opt_isMoving) {
          var smooth = opt_smooth !== void 0 ? opt_smooth : true;
          if (!smooth) {
            return clamp(resolution, minResolution, cappedMaxRes);
          }
          return getSmoothClampedResolution(resolution, cappedMaxRes, minResolution);
        }
        var tolerance = 1e-9;
        var minZoomLevel = Math.ceil(Math.log(maxResolution / cappedMaxRes) / Math.log(power) - tolerance);
        var offset2 = -direction * (0.5 - tolerance) + 0.5;
        var capped = Math.min(cappedMaxRes, resolution);
        var cappedZoomLevel = Math.floor(Math.log(maxResolution / capped) / Math.log(power) + offset2);
        var zoomLevel = Math.max(minZoomLevel, cappedZoomLevel);
        var newResolution = maxResolution / Math.pow(power, zoomLevel);
        return clamp(newResolution, minResolution, cappedMaxRes);
      } else {
        return void 0;
      }
    }
  );
}
function createMinMaxResolution(maxResolution, minResolution, opt_smooth, opt_maxExtent, opt_showFullExtent) {
  return (
    /**
     * @param {number|undefined} resolution Resolution.
     * @param {number} direction Direction.
     * @param {import("./size.js").Size} size Viewport size.
     * @param {boolean=} opt_isMoving True if an interaction or animation is in progress.
     * @return {number|undefined} Resolution.
     */
    function(resolution, direction, size, opt_isMoving) {
      if (resolution !== void 0) {
        var cappedMaxRes = opt_maxExtent ? getViewportClampedResolution(maxResolution, opt_maxExtent, size, opt_showFullExtent) : maxResolution;
        var smooth = opt_smooth !== void 0 ? opt_smooth : true;
        if (!smooth || !opt_isMoving) {
          return clamp(resolution, minResolution, cappedMaxRes);
        }
        return getSmoothClampedResolution(resolution, cappedMaxRes, minResolution);
      } else {
        return void 0;
      }
    }
  );
}

// node_modules/ol/rotationconstraint.js
function disable(rotation) {
  if (rotation !== void 0) {
    return 0;
  } else {
    return void 0;
  }
}
function none2(rotation) {
  if (rotation !== void 0) {
    return rotation;
  } else {
    return void 0;
  }
}
function createSnapToN(n) {
  var theta = 2 * Math.PI / n;
  return (
    /**
     * @param {number|undefined} rotation Rotation.
     * @param {boolean=} opt_isMoving True if an interaction or animation is in progress.
     * @return {number|undefined} Rotation.
     */
    function(rotation, opt_isMoving) {
      if (opt_isMoving) {
        return rotation;
      }
      if (rotation !== void 0) {
        rotation = Math.floor(rotation / theta + 0.5) * theta;
        return rotation;
      } else {
        return void 0;
      }
    }
  );
}
function createSnapToZero(opt_tolerance) {
  var tolerance = opt_tolerance || toRadians(5);
  return (
    /**
     * @param {number|undefined} rotation Rotation.
     * @param {boolean=} opt_isMoving True if an interaction or animation is in progress.
     * @return {number|undefined} Rotation.
     */
    function(rotation, opt_isMoving) {
      if (opt_isMoving) {
        return rotation;
      }
      if (rotation !== void 0) {
        if (Math.abs(rotation) <= tolerance) {
          return 0;
        } else {
          return rotation;
        }
      } else {
        return void 0;
      }
    }
  );
}

// node_modules/ol/geom/flat/closest.js
function assignClosest(flatCoordinates, offset1, offset2, stride, x, y, closestPoint) {
  var x1 = flatCoordinates[offset1];
  var y1 = flatCoordinates[offset1 + 1];
  var dx = flatCoordinates[offset2] - x1;
  var dy = flatCoordinates[offset2 + 1] - y1;
  var offset3;
  if (dx === 0 && dy === 0) {
    offset3 = offset1;
  } else {
    var t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
    if (t > 1) {
      offset3 = offset2;
    } else if (t > 0) {
      for (var i = 0; i < stride; ++i) {
        closestPoint[i] = lerp(flatCoordinates[offset1 + i], flatCoordinates[offset2 + i], t);
      }
      closestPoint.length = stride;
      return;
    } else {
      offset3 = offset1;
    }
  }
  for (var i = 0; i < stride; ++i) {
    closestPoint[i] = flatCoordinates[offset3 + i];
  }
  closestPoint.length = stride;
}
function maxSquaredDelta(flatCoordinates, offset2, end, stride, max) {
  var x1 = flatCoordinates[offset2];
  var y1 = flatCoordinates[offset2 + 1];
  for (offset2 += stride; offset2 < end; offset2 += stride) {
    var x2 = flatCoordinates[offset2];
    var y2 = flatCoordinates[offset2 + 1];
    var squaredDelta = squaredDistance(x1, y1, x2, y2);
    if (squaredDelta > max) {
      max = squaredDelta;
    }
    x1 = x2;
    y1 = y2;
  }
  return max;
}
function arrayMaxSquaredDelta(flatCoordinates, offset2, ends, stride, max) {
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    max = maxSquaredDelta(flatCoordinates, offset2, end, stride, max);
    offset2 = end;
  }
  return max;
}
function multiArrayMaxSquaredDelta(flatCoordinates, offset2, endss, stride, max) {
  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];
    max = arrayMaxSquaredDelta(flatCoordinates, offset2, ends, stride, max);
    offset2 = ends[ends.length - 1];
  }
  return max;
}
function assignClosestPoint(flatCoordinates, offset2, end, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, opt_tmpPoint) {
  if (offset2 == end) {
    return minSquaredDistance;
  }
  var i, squaredDistance2;
  if (maxDelta === 0) {
    squaredDistance2 = squaredDistance(x, y, flatCoordinates[offset2], flatCoordinates[offset2 + 1]);
    if (squaredDistance2 < minSquaredDistance) {
      for (i = 0; i < stride; ++i) {
        closestPoint[i] = flatCoordinates[offset2 + i];
      }
      closestPoint.length = stride;
      return squaredDistance2;
    } else {
      return minSquaredDistance;
    }
  }
  var tmpPoint = opt_tmpPoint ? opt_tmpPoint : [NaN, NaN];
  var index = offset2 + stride;
  while (index < end) {
    assignClosest(flatCoordinates, index - stride, index, stride, x, y, tmpPoint);
    squaredDistance2 = squaredDistance(x, y, tmpPoint[0], tmpPoint[1]);
    if (squaredDistance2 < minSquaredDistance) {
      minSquaredDistance = squaredDistance2;
      for (i = 0; i < stride; ++i) {
        closestPoint[i] = tmpPoint[i];
      }
      closestPoint.length = stride;
      index += stride;
    } else {
      index += stride * Math.max((Math.sqrt(squaredDistance2) - Math.sqrt(minSquaredDistance)) / maxDelta | 0, 1);
    }
  }
  if (isRing) {
    assignClosest(flatCoordinates, end - stride, offset2, stride, x, y, tmpPoint);
    squaredDistance2 = squaredDistance(x, y, tmpPoint[0], tmpPoint[1]);
    if (squaredDistance2 < minSquaredDistance) {
      minSquaredDistance = squaredDistance2;
      for (i = 0; i < stride; ++i) {
        closestPoint[i] = tmpPoint[i];
      }
      closestPoint.length = stride;
    }
  }
  return minSquaredDistance;
}
function assignClosestArrayPoint(flatCoordinates, offset2, ends, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, opt_tmpPoint) {
  var tmpPoint = opt_tmpPoint ? opt_tmpPoint : [NaN, NaN];
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    minSquaredDistance = assignClosestPoint(flatCoordinates, offset2, end, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, tmpPoint);
    offset2 = end;
  }
  return minSquaredDistance;
}
function assignClosestMultiArrayPoint(flatCoordinates, offset2, endss, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, opt_tmpPoint) {
  var tmpPoint = opt_tmpPoint ? opt_tmpPoint : [NaN, NaN];
  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];
    minSquaredDistance = assignClosestArrayPoint(flatCoordinates, offset2, ends, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, tmpPoint);
    offset2 = ends[ends.length - 1];
  }
  return minSquaredDistance;
}

// node_modules/ol/geom/flat/area.js
function linearRing(flatCoordinates, offset2, end, stride) {
  var twiceArea = 0;
  var x1 = flatCoordinates[end - stride];
  var y1 = flatCoordinates[end - stride + 1];
  for (; offset2 < end; offset2 += stride) {
    var x2 = flatCoordinates[offset2];
    var y2 = flatCoordinates[offset2 + 1];
    twiceArea += y1 * x2 - x1 * y2;
    x1 = x2;
    y1 = y2;
  }
  return twiceArea / 2;
}
function linearRings(flatCoordinates, offset2, ends, stride) {
  var area = 0;
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    area += linearRing(flatCoordinates, offset2, end, stride);
    offset2 = end;
  }
  return area;
}
function linearRingss(flatCoordinates, offset2, endss, stride) {
  var area = 0;
  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];
    area += linearRings(flatCoordinates, offset2, ends, stride);
    offset2 = ends[ends.length - 1];
  }
  return area;
}

// node_modules/ol/geom/LinearRing.js
var __extends14 = /* @__PURE__ */ function() {
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
var LinearRing = (
  /** @class */
  function(_super) {
    __extends14(LinearRing2, _super);
    function LinearRing2(coordinates2, opt_layout) {
      var _this = _super.call(this) || this;
      _this.maxDelta_ = -1;
      _this.maxDeltaRevision_ = -1;
      if (opt_layout !== void 0 && !Array.isArray(coordinates2[0])) {
        _this.setFlatCoordinates(
          opt_layout,
          /** @type {Array<number>} */
          coordinates2
        );
      } else {
        _this.setCoordinates(
          /** @type {Array<import("../coordinate.js").Coordinate>} */
          coordinates2,
          opt_layout
        );
      }
      return _this;
    }
    LinearRing2.prototype.clone = function() {
      return new LinearRing2(this.flatCoordinates.slice(), this.layout);
    };
    LinearRing2.prototype.closestPointXY = function(x, y, closestPoint, minSquaredDistance) {
      if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
        return minSquaredDistance;
      }
      if (this.maxDeltaRevision_ != this.getRevision()) {
        this.maxDelta_ = Math.sqrt(maxSquaredDelta(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, 0));
        this.maxDeltaRevision_ = this.getRevision();
      }
      return assignClosestPoint(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, this.maxDelta_, true, x, y, closestPoint, minSquaredDistance);
    };
    LinearRing2.prototype.getArea = function() {
      return linearRing(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
    };
    LinearRing2.prototype.getCoordinates = function() {
      return inflateCoordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
    };
    LinearRing2.prototype.getSimplifiedGeometryInternal = function(squaredTolerance) {
      var simplifiedFlatCoordinates = [];
      simplifiedFlatCoordinates.length = douglasPeucker(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, squaredTolerance, simplifiedFlatCoordinates, 0);
      return new LinearRing2(simplifiedFlatCoordinates, GeometryLayout_default.XY);
    };
    LinearRing2.prototype.getType = function() {
      return GeometryType_default.LINEAR_RING;
    };
    LinearRing2.prototype.intersectsExtent = function(extent) {
      return false;
    };
    LinearRing2.prototype.setCoordinates = function(coordinates2, opt_layout) {
      this.setLayout(opt_layout, coordinates2, 1);
      if (!this.flatCoordinates) {
        this.flatCoordinates = [];
      }
      this.flatCoordinates.length = deflateCoordinates(this.flatCoordinates, 0, coordinates2, this.stride);
      this.changed();
    };
    return LinearRing2;
  }(SimpleGeometry_default)
);
var LinearRing_default = LinearRing;

// node_modules/ol/geom/flat/contains.js
function linearRingContainsExtent(flatCoordinates, offset2, end, stride, extent) {
  var outside = forEachCorner(
    extent,
    /**
     * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
     * @return {boolean} Contains (x, y).
     */
    function(coordinate) {
      return !linearRingContainsXY(flatCoordinates, offset2, end, stride, coordinate[0], coordinate[1]);
    }
  );
  return !outside;
}
function linearRingContainsXY(flatCoordinates, offset2, end, stride, x, y) {
  var wn = 0;
  var x1 = flatCoordinates[end - stride];
  var y1 = flatCoordinates[end - stride + 1];
  for (; offset2 < end; offset2 += stride) {
    var x2 = flatCoordinates[offset2];
    var y2 = flatCoordinates[offset2 + 1];
    if (y1 <= y) {
      if (y2 > y && (x2 - x1) * (y - y1) - (x - x1) * (y2 - y1) > 0) {
        wn++;
      }
    } else if (y2 <= y && (x2 - x1) * (y - y1) - (x - x1) * (y2 - y1) < 0) {
      wn--;
    }
    x1 = x2;
    y1 = y2;
  }
  return wn !== 0;
}
function linearRingsContainsXY(flatCoordinates, offset2, ends, stride, x, y) {
  if (ends.length === 0) {
    return false;
  }
  if (!linearRingContainsXY(flatCoordinates, offset2, ends[0], stride, x, y)) {
    return false;
  }
  for (var i = 1, ii = ends.length; i < ii; ++i) {
    if (linearRingContainsXY(flatCoordinates, ends[i - 1], ends[i], stride, x, y)) {
      return false;
    }
  }
  return true;
}
function linearRingssContainsXY(flatCoordinates, offset2, endss, stride, x, y) {
  if (endss.length === 0) {
    return false;
  }
  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];
    if (linearRingsContainsXY(flatCoordinates, offset2, ends, stride, x, y)) {
      return true;
    }
    offset2 = ends[ends.length - 1];
  }
  return false;
}

// node_modules/ol/geom/flat/interiorpoint.js
function getInteriorPointOfArray(flatCoordinates, offset2, ends, stride, flatCenters, flatCentersOffset, opt_dest) {
  var i, ii, x, x1, x2, y1, y2;
  var y = flatCenters[flatCentersOffset + 1];
  var intersections = [];
  for (var r = 0, rr = ends.length; r < rr; ++r) {
    var end = ends[r];
    x1 = flatCoordinates[end - stride];
    y1 = flatCoordinates[end - stride + 1];
    for (i = offset2; i < end; i += stride) {
      x2 = flatCoordinates[i];
      y2 = flatCoordinates[i + 1];
      if (y <= y1 && y2 <= y || y1 <= y && y <= y2) {
        x = (y - y1) / (y2 - y1) * (x2 - x1) + x1;
        intersections.push(x);
      }
      x1 = x2;
      y1 = y2;
    }
  }
  var pointX = NaN;
  var maxSegmentLength = -Infinity;
  intersections.sort(numberSafeCompareFunction);
  x1 = intersections[0];
  for (i = 1, ii = intersections.length; i < ii; ++i) {
    x2 = intersections[i];
    var segmentLength = Math.abs(x2 - x1);
    if (segmentLength > maxSegmentLength) {
      x = (x1 + x2) / 2;
      if (linearRingsContainsXY(flatCoordinates, offset2, ends, stride, x, y)) {
        pointX = x;
        maxSegmentLength = segmentLength;
      }
    }
    x1 = x2;
  }
  if (isNaN(pointX)) {
    pointX = flatCenters[flatCentersOffset];
  }
  if (opt_dest) {
    opt_dest.push(pointX, y, maxSegmentLength);
    return opt_dest;
  } else {
    return [pointX, y, maxSegmentLength];
  }
}
function getInteriorPointsOfMultiArray(flatCoordinates, offset2, endss, stride, flatCenters) {
  var interiorPoints = [];
  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];
    interiorPoints = getInteriorPointOfArray(flatCoordinates, offset2, ends, stride, flatCenters, 2 * i, interiorPoints);
    offset2 = ends[ends.length - 1];
  }
  return interiorPoints;
}

// node_modules/ol/geom/flat/segments.js
function forEach(flatCoordinates, offset2, end, stride, callback) {
  var point1 = [flatCoordinates[offset2], flatCoordinates[offset2 + 1]];
  var point2 = [];
  var ret;
  for (; offset2 + stride < end; offset2 += stride) {
    point2[0] = flatCoordinates[offset2 + stride];
    point2[1] = flatCoordinates[offset2 + stride + 1];
    ret = callback(point1, point2);
    if (ret) {
      return ret;
    }
    point1[0] = point2[0];
    point1[1] = point2[1];
  }
  return false;
}

// node_modules/ol/geom/flat/intersectsextent.js
function intersectsLineString(flatCoordinates, offset2, end, stride, extent) {
  var coordinatesExtent = extendFlatCoordinates(createEmpty(), flatCoordinates, offset2, end, stride);
  if (!intersects(extent, coordinatesExtent)) {
    return false;
  }
  if (containsExtent(extent, coordinatesExtent)) {
    return true;
  }
  if (coordinatesExtent[0] >= extent[0] && coordinatesExtent[2] <= extent[2]) {
    return true;
  }
  if (coordinatesExtent[1] >= extent[1] && coordinatesExtent[3] <= extent[3]) {
    return true;
  }
  return forEach(
    flatCoordinates,
    offset2,
    end,
    stride,
    /**
     * @param {import("../../coordinate.js").Coordinate} point1 Start point.
     * @param {import("../../coordinate.js").Coordinate} point2 End point.
     * @return {boolean} `true` if the segment and the extent intersect,
     *     `false` otherwise.
     */
    function(point1, point2) {
      return intersectsSegment(extent, point1, point2);
    }
  );
}
function intersectsLineStringArray(flatCoordinates, offset2, ends, stride, extent) {
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    if (intersectsLineString(flatCoordinates, offset2, ends[i], stride, extent)) {
      return true;
    }
    offset2 = ends[i];
  }
  return false;
}
function intersectsLinearRing(flatCoordinates, offset2, end, stride, extent) {
  if (intersectsLineString(flatCoordinates, offset2, end, stride, extent)) {
    return true;
  }
  if (linearRingContainsXY(flatCoordinates, offset2, end, stride, extent[0], extent[1])) {
    return true;
  }
  if (linearRingContainsXY(flatCoordinates, offset2, end, stride, extent[0], extent[3])) {
    return true;
  }
  if (linearRingContainsXY(flatCoordinates, offset2, end, stride, extent[2], extent[1])) {
    return true;
  }
  if (linearRingContainsXY(flatCoordinates, offset2, end, stride, extent[2], extent[3])) {
    return true;
  }
  return false;
}
function intersectsLinearRingArray(flatCoordinates, offset2, ends, stride, extent) {
  if (!intersectsLinearRing(flatCoordinates, offset2, ends[0], stride, extent)) {
    return false;
  }
  if (ends.length === 1) {
    return true;
  }
  for (var i = 1, ii = ends.length; i < ii; ++i) {
    if (linearRingContainsExtent(flatCoordinates, ends[i - 1], ends[i], stride, extent)) {
      if (!intersectsLineString(flatCoordinates, ends[i - 1], ends[i], stride, extent)) {
        return false;
      }
    }
  }
  return true;
}
function intersectsLinearRingMultiArray(flatCoordinates, offset2, endss, stride, extent) {
  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];
    if (intersectsLinearRingArray(flatCoordinates, offset2, ends, stride, extent)) {
      return true;
    }
    offset2 = ends[ends.length - 1];
  }
  return false;
}

// node_modules/ol/geom/flat/reverse.js
function coordinates(flatCoordinates, offset2, end, stride) {
  while (offset2 < end - stride) {
    for (var i = 0; i < stride; ++i) {
      var tmp = flatCoordinates[offset2 + i];
      flatCoordinates[offset2 + i] = flatCoordinates[end - stride + i];
      flatCoordinates[end - stride + i] = tmp;
    }
    offset2 += stride;
    end -= stride;
  }
}

// node_modules/ol/geom/flat/orient.js
function linearRingIsClockwise(flatCoordinates, offset2, end, stride) {
  var edge = 0;
  var x1 = flatCoordinates[end - stride];
  var y1 = flatCoordinates[end - stride + 1];
  for (; offset2 < end; offset2 += stride) {
    var x2 = flatCoordinates[offset2];
    var y2 = flatCoordinates[offset2 + 1];
    edge += (x2 - x1) * (y2 + y1);
    x1 = x2;
    y1 = y2;
  }
  return edge === 0 ? void 0 : edge > 0;
}
function linearRingsAreOriented(flatCoordinates, offset2, ends, stride, opt_right) {
  var right = opt_right !== void 0 ? opt_right : false;
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    var isClockwise = linearRingIsClockwise(flatCoordinates, offset2, end, stride);
    if (i === 0) {
      if (right && isClockwise || !right && !isClockwise) {
        return false;
      }
    } else {
      if (right && !isClockwise || !right && isClockwise) {
        return false;
      }
    }
    offset2 = end;
  }
  return true;
}
function linearRingssAreOriented(flatCoordinates, offset2, endss, stride, opt_right) {
  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];
    if (!linearRingsAreOriented(flatCoordinates, offset2, ends, stride, opt_right)) {
      return false;
    }
    if (ends.length) {
      offset2 = ends[ends.length - 1];
    }
  }
  return true;
}
function orientLinearRings(flatCoordinates, offset2, ends, stride, opt_right) {
  var right = opt_right !== void 0 ? opt_right : false;
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    var isClockwise = linearRingIsClockwise(flatCoordinates, offset2, end, stride);
    var reverse = i === 0 ? right && isClockwise || !right && !isClockwise : right && !isClockwise || !right && isClockwise;
    if (reverse) {
      coordinates(flatCoordinates, offset2, end, stride);
    }
    offset2 = end;
  }
  return offset2;
}
function orientLinearRingsArray(flatCoordinates, offset2, endss, stride, opt_right) {
  for (var i = 0, ii = endss.length; i < ii; ++i) {
    offset2 = orientLinearRings(flatCoordinates, offset2, endss[i], stride, opt_right);
  }
  return offset2;
}

// node_modules/ol/geom/Polygon.js
var __extends15 = /* @__PURE__ */ function() {
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
var Polygon = (
  /** @class */
  function(_super) {
    __extends15(Polygon2, _super);
    function Polygon2(coordinates2, opt_layout, opt_ends) {
      var _this = _super.call(this) || this;
      _this.ends_ = [];
      _this.flatInteriorPointRevision_ = -1;
      _this.flatInteriorPoint_ = null;
      _this.maxDelta_ = -1;
      _this.maxDeltaRevision_ = -1;
      _this.orientedRevision_ = -1;
      _this.orientedFlatCoordinates_ = null;
      if (opt_layout !== void 0 && opt_ends) {
        _this.setFlatCoordinates(
          opt_layout,
          /** @type {Array<number>} */
          coordinates2
        );
        _this.ends_ = opt_ends;
      } else {
        _this.setCoordinates(
          /** @type {Array<Array<import("../coordinate.js").Coordinate>>} */
          coordinates2,
          opt_layout
        );
      }
      return _this;
    }
    Polygon2.prototype.appendLinearRing = function(linearRing2) {
      if (!this.flatCoordinates) {
        this.flatCoordinates = linearRing2.getFlatCoordinates().slice();
      } else {
        extend(this.flatCoordinates, linearRing2.getFlatCoordinates());
      }
      this.ends_.push(this.flatCoordinates.length);
      this.changed();
    };
    Polygon2.prototype.clone = function() {
      var polygon = new Polygon2(this.flatCoordinates.slice(), this.layout, this.ends_.slice());
      polygon.applyProperties(this);
      return polygon;
    };
    Polygon2.prototype.closestPointXY = function(x, y, closestPoint, minSquaredDistance) {
      if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
        return minSquaredDistance;
      }
      if (this.maxDeltaRevision_ != this.getRevision()) {
        this.maxDelta_ = Math.sqrt(arrayMaxSquaredDelta(this.flatCoordinates, 0, this.ends_, this.stride, 0));
        this.maxDeltaRevision_ = this.getRevision();
      }
      return assignClosestArrayPoint(this.flatCoordinates, 0, this.ends_, this.stride, this.maxDelta_, true, x, y, closestPoint, minSquaredDistance);
    };
    Polygon2.prototype.containsXY = function(x, y) {
      return linearRingsContainsXY(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, x, y);
    };
    Polygon2.prototype.getArea = function() {
      return linearRings(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride);
    };
    Polygon2.prototype.getCoordinates = function(opt_right) {
      var flatCoordinates;
      if (opt_right !== void 0) {
        flatCoordinates = this.getOrientedFlatCoordinates().slice();
        orientLinearRings(flatCoordinates, 0, this.ends_, this.stride, opt_right);
      } else {
        flatCoordinates = this.flatCoordinates;
      }
      return inflateCoordinatesArray(flatCoordinates, 0, this.ends_, this.stride);
    };
    Polygon2.prototype.getEnds = function() {
      return this.ends_;
    };
    Polygon2.prototype.getFlatInteriorPoint = function() {
      if (this.flatInteriorPointRevision_ != this.getRevision()) {
        var flatCenter = getCenter(this.getExtent());
        this.flatInteriorPoint_ = getInteriorPointOfArray(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, flatCenter, 0);
        this.flatInteriorPointRevision_ = this.getRevision();
      }
      return this.flatInteriorPoint_;
    };
    Polygon2.prototype.getInteriorPoint = function() {
      return new Point_default(this.getFlatInteriorPoint(), GeometryLayout_default.XYM);
    };
    Polygon2.prototype.getLinearRingCount = function() {
      return this.ends_.length;
    };
    Polygon2.prototype.getLinearRing = function(index) {
      if (index < 0 || this.ends_.length <= index) {
        return null;
      }
      return new LinearRing_default(this.flatCoordinates.slice(index === 0 ? 0 : this.ends_[index - 1], this.ends_[index]), this.layout);
    };
    Polygon2.prototype.getLinearRings = function() {
      var layout = this.layout;
      var flatCoordinates = this.flatCoordinates;
      var ends = this.ends_;
      var linearRings2 = [];
      var offset2 = 0;
      for (var i = 0, ii = ends.length; i < ii; ++i) {
        var end = ends[i];
        var linearRing2 = new LinearRing_default(flatCoordinates.slice(offset2, end), layout);
        linearRings2.push(linearRing2);
        offset2 = end;
      }
      return linearRings2;
    };
    Polygon2.prototype.getOrientedFlatCoordinates = function() {
      if (this.orientedRevision_ != this.getRevision()) {
        var flatCoordinates = this.flatCoordinates;
        if (linearRingsAreOriented(flatCoordinates, 0, this.ends_, this.stride)) {
          this.orientedFlatCoordinates_ = flatCoordinates;
        } else {
          this.orientedFlatCoordinates_ = flatCoordinates.slice();
          this.orientedFlatCoordinates_.length = orientLinearRings(this.orientedFlatCoordinates_, 0, this.ends_, this.stride);
        }
        this.orientedRevision_ = this.getRevision();
      }
      return this.orientedFlatCoordinates_;
    };
    Polygon2.prototype.getSimplifiedGeometryInternal = function(squaredTolerance) {
      var simplifiedFlatCoordinates = [];
      var simplifiedEnds = [];
      simplifiedFlatCoordinates.length = quantizeArray(this.flatCoordinates, 0, this.ends_, this.stride, Math.sqrt(squaredTolerance), simplifiedFlatCoordinates, 0, simplifiedEnds);
      return new Polygon2(simplifiedFlatCoordinates, GeometryLayout_default.XY, simplifiedEnds);
    };
    Polygon2.prototype.getType = function() {
      return GeometryType_default.POLYGON;
    };
    Polygon2.prototype.intersectsExtent = function(extent) {
      return intersectsLinearRingArray(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, extent);
    };
    Polygon2.prototype.setCoordinates = function(coordinates2, opt_layout) {
      this.setLayout(opt_layout, coordinates2, 2);
      if (!this.flatCoordinates) {
        this.flatCoordinates = [];
      }
      var ends = deflateCoordinatesArray(this.flatCoordinates, 0, coordinates2, this.stride, this.ends_);
      this.flatCoordinates.length = ends.length === 0 ? 0 : ends[ends.length - 1];
      this.changed();
    };
    return Polygon2;
  }(SimpleGeometry_default)
);
var Polygon_default = Polygon;
function circular(center, radius, opt_n, opt_sphereRadius) {
  var n = opt_n ? opt_n : 32;
  var flatCoordinates = [];
  for (var i = 0; i < n; ++i) {
    extend(flatCoordinates, offset(center, radius, 2 * Math.PI * i / n, opt_sphereRadius));
  }
  flatCoordinates.push(flatCoordinates[0], flatCoordinates[1]);
  return new Polygon(flatCoordinates, GeometryLayout_default.XY, [flatCoordinates.length]);
}
function fromExtent(extent) {
  var minX = extent[0];
  var minY = extent[1];
  var maxX = extent[2];
  var maxY = extent[3];
  var flatCoordinates = [minX, minY, minX, maxY, maxX, maxY, maxX, minY, minX, minY];
  return new Polygon(flatCoordinates, GeometryLayout_default.XY, [flatCoordinates.length]);
}
function fromCircle(circle, opt_sides, opt_angle) {
  var sides = opt_sides ? opt_sides : 32;
  var stride = circle.getStride();
  var layout = circle.getLayout();
  var center = circle.getCenter();
  var arrayLength = stride * (sides + 1);
  var flatCoordinates = new Array(arrayLength);
  for (var i = 0; i < arrayLength; i += stride) {
    flatCoordinates[i] = 0;
    flatCoordinates[i + 1] = 0;
    for (var j = 2; j < stride; j++) {
      flatCoordinates[i + j] = center[j];
    }
  }
  var ends = [flatCoordinates.length];
  var polygon = new Polygon(flatCoordinates, layout, ends);
  makeRegular(polygon, center, circle.getRadius(), opt_angle);
  return polygon;
}
function makeRegular(polygon, center, radius, opt_angle) {
  var flatCoordinates = polygon.getFlatCoordinates();
  var stride = polygon.getStride();
  var sides = flatCoordinates.length / stride - 1;
  var startAngle = opt_angle ? opt_angle : 0;
  for (var i = 0; i <= sides; ++i) {
    var offset2 = i * stride;
    var angle = startAngle + modulo(i, sides) * 2 * Math.PI / sides;
    flatCoordinates[offset2] = center[0] + radius * Math.cos(angle);
    flatCoordinates[offset2 + 1] = center[1] + radius * Math.sin(angle);
  }
  polygon.changed();
}

// node_modules/ol/View.js
var __extends16 = /* @__PURE__ */ function() {
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
var DEFAULT_MIN_ZOOM = 0;
var View = (
  /** @class */
  function(_super) {
    __extends16(View2, _super);
    function View2(opt_options) {
      var _this = _super.call(this) || this;
      var options = assign({}, opt_options);
      _this.hints_ = [0, 0];
      _this.animations_ = [];
      _this.updateAnimationKey_;
      _this.projection_ = createProjection(options.projection, "EPSG:3857");
      _this.viewportSize_ = [100, 100];
      _this.targetCenter_ = null;
      _this.targetResolution_;
      _this.targetRotation_;
      _this.cancelAnchor_ = void 0;
      if (options.center) {
        options.center = fromUserCoordinate(options.center, _this.projection_);
      }
      if (options.extent) {
        options.extent = fromUserExtent(options.extent, _this.projection_);
      }
      _this.applyOptions_(options);
      return _this;
    }
    View2.prototype.applyOptions_ = function(options) {
      var properties = {};
      var resolutionConstraintInfo = createResolutionConstraint(options);
      this.maxResolution_ = resolutionConstraintInfo.maxResolution;
      this.minResolution_ = resolutionConstraintInfo.minResolution;
      this.zoomFactor_ = resolutionConstraintInfo.zoomFactor;
      this.resolutions_ = options.resolutions;
      this.padding = options.padding;
      this.minZoom_ = resolutionConstraintInfo.minZoom;
      var centerConstraint = createCenterConstraint(options);
      var resolutionConstraint = resolutionConstraintInfo.constraint;
      var rotationConstraint = createRotationConstraint(options);
      this.constraints_ = {
        center: centerConstraint,
        resolution: resolutionConstraint,
        rotation: rotationConstraint
      };
      this.setRotation(options.rotation !== void 0 ? options.rotation : 0);
      this.setCenterInternal(options.center !== void 0 ? options.center : null);
      if (options.resolution !== void 0) {
        this.setResolution(options.resolution);
      } else if (options.zoom !== void 0) {
        this.setZoom(options.zoom);
      }
      this.setProperties(properties);
      this.options_ = options;
    };
    View2.prototype.getUpdatedOptions_ = function(newOptions) {
      var options = assign({}, this.options_);
      if (options.resolution !== void 0) {
        options.resolution = this.getResolution();
      } else {
        options.zoom = this.getZoom();
      }
      options.center = this.getCenterInternal();
      options.rotation = this.getRotation();
      return assign({}, options, newOptions);
    };
    View2.prototype.animate = function(var_args) {
      if (this.isDef() && !this.getAnimating()) {
        this.resolveConstraints(0);
      }
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; ++i) {
        var options = arguments[i];
        if (options.center) {
          options = assign({}, options);
          options.center = fromUserCoordinate(options.center, this.getProjection());
        }
        if (options.anchor) {
          options = assign({}, options);
          options.anchor = fromUserCoordinate(options.anchor, this.getProjection());
        }
        args[i] = options;
      }
      this.animateInternal.apply(this, args);
    };
    View2.prototype.animateInternal = function(var_args) {
      var animationCount = arguments.length;
      var callback;
      if (animationCount > 1 && typeof arguments[animationCount - 1] === "function") {
        callback = arguments[animationCount - 1];
        --animationCount;
      }
      if (!this.isDef()) {
        var state = arguments[animationCount - 1];
        if (state.center) {
          this.setCenterInternal(state.center);
        }
        if (state.zoom !== void 0) {
          this.setZoom(state.zoom);
        }
        if (state.rotation !== void 0) {
          this.setRotation(state.rotation);
        }
        if (callback) {
          animationCallback(callback, true);
        }
        return;
      }
      var start = Date.now();
      var center = this.targetCenter_.slice();
      var resolution = this.targetResolution_;
      var rotation = this.targetRotation_;
      var series = [];
      for (var i = 0; i < animationCount; ++i) {
        var options = (
          /** @type {AnimationOptions} */
          arguments[i]
        );
        var animation = {
          start,
          complete: false,
          anchor: options.anchor,
          duration: options.duration !== void 0 ? options.duration : 1e3,
          easing: options.easing || inAndOut,
          callback
        };
        if (options.center) {
          animation.sourceCenter = center;
          animation.targetCenter = options.center.slice();
          center = animation.targetCenter;
        }
        if (options.zoom !== void 0) {
          animation.sourceResolution = resolution;
          animation.targetResolution = this.getResolutionForZoom(options.zoom);
          resolution = animation.targetResolution;
        } else if (options.resolution) {
          animation.sourceResolution = resolution;
          animation.targetResolution = options.resolution;
          resolution = animation.targetResolution;
        }
        if (options.rotation !== void 0) {
          animation.sourceRotation = rotation;
          var delta = modulo(options.rotation - rotation + Math.PI, 2 * Math.PI) - Math.PI;
          animation.targetRotation = rotation + delta;
          rotation = animation.targetRotation;
        }
        if (isNoopAnimation(animation)) {
          animation.complete = true;
        } else {
          start += animation.duration;
        }
        series.push(animation);
      }
      this.animations_.push(series);
      this.setHint(ViewHint_default.ANIMATING, 1);
      this.updateAnimations_();
    };
    View2.prototype.getAnimating = function() {
      return this.hints_[ViewHint_default.ANIMATING] > 0;
    };
    View2.prototype.getInteracting = function() {
      return this.hints_[ViewHint_default.INTERACTING] > 0;
    };
    View2.prototype.cancelAnimations = function() {
      this.setHint(ViewHint_default.ANIMATING, -this.hints_[ViewHint_default.ANIMATING]);
      var anchor;
      for (var i = 0, ii = this.animations_.length; i < ii; ++i) {
        var series = this.animations_[i];
        if (series[0].callback) {
          animationCallback(series[0].callback, false);
        }
        if (!anchor) {
          for (var j = 0, jj = series.length; j < jj; ++j) {
            var animation = series[j];
            if (!animation.complete) {
              anchor = animation.anchor;
              break;
            }
          }
        }
      }
      this.animations_.length = 0;
      this.cancelAnchor_ = anchor;
    };
    View2.prototype.updateAnimations_ = function() {
      if (this.updateAnimationKey_ !== void 0) {
        cancelAnimationFrame(this.updateAnimationKey_);
        this.updateAnimationKey_ = void 0;
      }
      if (!this.getAnimating()) {
        return;
      }
      var now = Date.now();
      var more = false;
      for (var i = this.animations_.length - 1; i >= 0; --i) {
        var series = this.animations_[i];
        var seriesComplete = true;
        for (var j = 0, jj = series.length; j < jj; ++j) {
          var animation = series[j];
          if (animation.complete) {
            continue;
          }
          var elapsed = now - animation.start;
          var fraction = animation.duration > 0 ? elapsed / animation.duration : 1;
          if (fraction >= 1) {
            animation.complete = true;
            fraction = 1;
          } else {
            seriesComplete = false;
          }
          var progress = animation.easing(fraction);
          if (animation.sourceCenter) {
            var x0 = animation.sourceCenter[0];
            var y0 = animation.sourceCenter[1];
            var x1 = animation.targetCenter[0];
            var y1 = animation.targetCenter[1];
            var x = x0 + progress * (x1 - x0);
            var y = y0 + progress * (y1 - y0);
            this.targetCenter_ = [x, y];
          }
          if (animation.sourceResolution && animation.targetResolution) {
            var resolution = progress === 1 ? animation.targetResolution : animation.sourceResolution + progress * (animation.targetResolution - animation.sourceResolution);
            if (animation.anchor) {
              var size = this.getViewportSize_(this.getRotation());
              var constrainedResolution = this.constraints_.resolution(resolution, 0, size, true);
              this.targetCenter_ = this.calculateCenterZoom(constrainedResolution, animation.anchor);
            }
            this.targetResolution_ = resolution;
            this.applyTargetState_(true);
          }
          if (animation.sourceRotation !== void 0 && animation.targetRotation !== void 0) {
            var rotation = progress === 1 ? modulo(animation.targetRotation + Math.PI, 2 * Math.PI) - Math.PI : animation.sourceRotation + progress * (animation.targetRotation - animation.sourceRotation);
            if (animation.anchor) {
              var constrainedRotation = this.constraints_.rotation(rotation, true);
              this.targetCenter_ = this.calculateCenterRotate(constrainedRotation, animation.anchor);
            }
            this.targetRotation_ = rotation;
          }
          this.applyTargetState_(true);
          more = true;
          if (!animation.complete) {
            break;
          }
        }
        if (seriesComplete) {
          this.animations_[i] = null;
          this.setHint(ViewHint_default.ANIMATING, -1);
          var callback = series[0].callback;
          if (callback) {
            animationCallback(callback, true);
          }
        }
      }
      this.animations_ = this.animations_.filter(Boolean);
      if (more && this.updateAnimationKey_ === void 0) {
        this.updateAnimationKey_ = requestAnimationFrame(this.updateAnimations_.bind(this));
      }
    };
    View2.prototype.calculateCenterRotate = function(rotation, anchor) {
      var center;
      var currentCenter = this.getCenterInternal();
      if (currentCenter !== void 0) {
        center = [currentCenter[0] - anchor[0], currentCenter[1] - anchor[1]];
        rotate(center, rotation - this.getRotation());
        add(center, anchor);
      }
      return center;
    };
    View2.prototype.calculateCenterZoom = function(resolution, anchor) {
      var center;
      var currentCenter = this.getCenterInternal();
      var currentResolution = this.getResolution();
      if (currentCenter !== void 0 && currentResolution !== void 0) {
        var x = anchor[0] - resolution * (anchor[0] - currentCenter[0]) / currentResolution;
        var y = anchor[1] - resolution * (anchor[1] - currentCenter[1]) / currentResolution;
        center = [x, y];
      }
      return center;
    };
    View2.prototype.getViewportSize_ = function(opt_rotation) {
      var size = this.viewportSize_;
      if (opt_rotation) {
        var w = size[0];
        var h = size[1];
        return [Math.abs(w * Math.cos(opt_rotation)) + Math.abs(h * Math.sin(opt_rotation)), Math.abs(w * Math.sin(opt_rotation)) + Math.abs(h * Math.cos(opt_rotation))];
      } else {
        return size;
      }
    };
    View2.prototype.setViewportSize = function(opt_size) {
      this.viewportSize_ = Array.isArray(opt_size) ? opt_size.slice() : [100, 100];
      if (!this.getAnimating()) {
        this.resolveConstraints(0);
      }
    };
    View2.prototype.getCenter = function() {
      var center = this.getCenterInternal();
      if (!center) {
        return center;
      }
      return toUserCoordinate(center, this.getProjection());
    };
    View2.prototype.getCenterInternal = function() {
      return (
        /** @type {import("./coordinate.js").Coordinate|undefined} */
        this.get(ViewProperty_default.CENTER)
      );
    };
    View2.prototype.getConstraints = function() {
      return this.constraints_;
    };
    View2.prototype.getConstrainResolution = function() {
      return this.options_.constrainResolution;
    };
    View2.prototype.getHints = function(opt_hints) {
      if (opt_hints !== void 0) {
        opt_hints[0] = this.hints_[0];
        opt_hints[1] = this.hints_[1];
        return opt_hints;
      } else {
        return this.hints_.slice();
      }
    };
    View2.prototype.calculateExtent = function(opt_size) {
      var extent = this.calculateExtentInternal(opt_size);
      return toUserExtent(extent, this.getProjection());
    };
    View2.prototype.calculateExtentInternal = function(opt_size) {
      var size = opt_size || this.getViewportSize_();
      var center = (
        /** @type {!import("./coordinate.js").Coordinate} */
        this.getCenterInternal()
      );
      assert(center, 1);
      var resolution = (
        /** @type {!number} */
        this.getResolution()
      );
      assert(resolution !== void 0, 2);
      var rotation = (
        /** @type {!number} */
        this.getRotation()
      );
      assert(rotation !== void 0, 3);
      return getForViewAndSize(center, resolution, rotation, size);
    };
    View2.prototype.getMaxResolution = function() {
      return this.maxResolution_;
    };
    View2.prototype.getMinResolution = function() {
      return this.minResolution_;
    };
    View2.prototype.getMaxZoom = function() {
      return (
        /** @type {number} */
        this.getZoomForResolution(this.minResolution_)
      );
    };
    View2.prototype.setMaxZoom = function(zoom) {
      this.applyOptions_(this.getUpdatedOptions_({
        maxZoom: zoom
      }));
    };
    View2.prototype.getMinZoom = function() {
      return (
        /** @type {number} */
        this.getZoomForResolution(this.maxResolution_)
      );
    };
    View2.prototype.setMinZoom = function(zoom) {
      this.applyOptions_(this.getUpdatedOptions_({
        minZoom: zoom
      }));
    };
    View2.prototype.setConstrainResolution = function(enabled) {
      this.applyOptions_(this.getUpdatedOptions_({
        constrainResolution: enabled
      }));
    };
    View2.prototype.getProjection = function() {
      return this.projection_;
    };
    View2.prototype.getResolution = function() {
      return (
        /** @type {number|undefined} */
        this.get(ViewProperty_default.RESOLUTION)
      );
    };
    View2.prototype.getResolutions = function() {
      return this.resolutions_;
    };
    View2.prototype.getResolutionForExtent = function(extent, opt_size) {
      return this.getResolutionForExtentInternal(fromUserExtent(extent, this.getProjection()), opt_size);
    };
    View2.prototype.getResolutionForExtentInternal = function(extent, opt_size) {
      var size = opt_size || this.getViewportSize_();
      var xResolution = getWidth(extent) / size[0];
      var yResolution = getHeight(extent) / size[1];
      return Math.max(xResolution, yResolution);
    };
    View2.prototype.getResolutionForValueFunction = function(opt_power) {
      var power = opt_power || 2;
      var maxResolution = this.getConstrainedResolution(this.maxResolution_);
      var minResolution = this.minResolution_;
      var max = Math.log(maxResolution / minResolution) / Math.log(power);
      return (
        /**
         * @param {number} value Value.
         * @return {number} Resolution.
         */
        function(value) {
          var resolution = maxResolution / Math.pow(power, value * max);
          return resolution;
        }
      );
    };
    View2.prototype.getRotation = function() {
      return (
        /** @type {number} */
        this.get(ViewProperty_default.ROTATION)
      );
    };
    View2.prototype.getValueForResolutionFunction = function(opt_power) {
      var logPower = Math.log(opt_power || 2);
      var maxResolution = this.getConstrainedResolution(this.maxResolution_);
      var minResolution = this.minResolution_;
      var max = Math.log(maxResolution / minResolution) / logPower;
      return (
        /**
         * @param {number} resolution Resolution.
         * @return {number} Value.
         */
        function(resolution) {
          var value = Math.log(maxResolution / resolution) / logPower / max;
          return value;
        }
      );
    };
    View2.prototype.getViewportSizeMinusPadding_ = function(opt_rotation) {
      var size = this.getViewportSize_(opt_rotation);
      var padding = this.padding;
      if (padding) {
        size = [size[0] - padding[1] - padding[3], size[1] - padding[0] - padding[2]];
      }
      return size;
    };
    View2.prototype.getState = function() {
      var projection = this.getProjection();
      var resolution = (
        /** @type {number} */
        this.getResolution()
      );
      var rotation = this.getRotation();
      var center = (
        /** @type {import("./coordinate.js").Coordinate} */
        this.getCenterInternal()
      );
      var padding = this.padding;
      if (padding) {
        var reducedSize = this.getViewportSizeMinusPadding_();
        center = calculateCenterOn(center, this.getViewportSize_(), [reducedSize[0] / 2 + padding[3], reducedSize[1] / 2 + padding[0]], resolution, rotation);
      }
      return {
        center: center.slice(0),
        projection: projection !== void 0 ? projection : null,
        resolution,
        rotation,
        zoom: this.getZoom()
      };
    };
    View2.prototype.getZoom = function() {
      var zoom;
      var resolution = this.getResolution();
      if (resolution !== void 0) {
        zoom = this.getZoomForResolution(resolution);
      }
      return zoom;
    };
    View2.prototype.getZoomForResolution = function(resolution) {
      var offset2 = this.minZoom_ || 0;
      var max, zoomFactor;
      if (this.resolutions_) {
        var nearest = linearFindNearest(this.resolutions_, resolution, 1);
        offset2 = nearest;
        max = this.resolutions_[nearest];
        if (nearest == this.resolutions_.length - 1) {
          zoomFactor = 2;
        } else {
          zoomFactor = max / this.resolutions_[nearest + 1];
        }
      } else {
        max = this.maxResolution_;
        zoomFactor = this.zoomFactor_;
      }
      return offset2 + Math.log(max / resolution) / Math.log(zoomFactor);
    };
    View2.prototype.getResolutionForZoom = function(zoom) {
      if (this.resolutions_) {
        if (this.resolutions_.length <= 1) {
          return 0;
        }
        var baseLevel = clamp(Math.floor(zoom), 0, this.resolutions_.length - 2);
        var zoomFactor = this.resolutions_[baseLevel] / this.resolutions_[baseLevel + 1];
        return this.resolutions_[baseLevel] / Math.pow(zoomFactor, clamp(zoom - baseLevel, 0, 1));
      } else {
        return this.maxResolution_ / Math.pow(this.zoomFactor_, zoom - this.minZoom_);
      }
    };
    View2.prototype.fit = function(geometryOrExtent, opt_options) {
      var geometry;
      assert(Array.isArray(geometryOrExtent) || typeof /** @type {?} */
      geometryOrExtent.getSimplifiedGeometry === "function", 24);
      if (Array.isArray(geometryOrExtent)) {
        assert(!isEmpty(geometryOrExtent), 25);
        var extent = fromUserExtent(geometryOrExtent, this.getProjection());
        geometry = fromExtent(extent);
      } else if (geometryOrExtent.getType() === GeometryType_default.CIRCLE) {
        var extent = fromUserExtent(geometryOrExtent.getExtent(), this.getProjection());
        geometry = fromExtent(extent);
        geometry.rotate(this.getRotation(), getCenter(extent));
      } else {
        var userProjection = getUserProjection();
        if (userProjection) {
          geometry = /** @type {import("./geom/SimpleGeometry.js").default} */
          geometryOrExtent.clone().transform(userProjection, this.getProjection());
        } else {
          geometry = geometryOrExtent;
        }
      }
      this.fitInternal(geometry, opt_options);
    };
    View2.prototype.fitInternal = function(geometry, opt_options) {
      var options = opt_options || {};
      var size = options.size;
      if (!size) {
        size = this.getViewportSizeMinusPadding_();
      }
      var padding = options.padding !== void 0 ? options.padding : [0, 0, 0, 0];
      var nearest = options.nearest !== void 0 ? options.nearest : false;
      var minResolution;
      if (options.minResolution !== void 0) {
        minResolution = options.minResolution;
      } else if (options.maxZoom !== void 0) {
        minResolution = this.getResolutionForZoom(options.maxZoom);
      } else {
        minResolution = 0;
      }
      var coords = geometry.getFlatCoordinates();
      var rotation = this.getRotation();
      var cosAngle = Math.cos(-rotation);
      var sinAngle = Math.sin(-rotation);
      var minRotX = Infinity;
      var minRotY = Infinity;
      var maxRotX = -Infinity;
      var maxRotY = -Infinity;
      var stride = geometry.getStride();
      for (var i = 0, ii = coords.length; i < ii; i += stride) {
        var rotX = coords[i] * cosAngle - coords[i + 1] * sinAngle;
        var rotY = coords[i] * sinAngle + coords[i + 1] * cosAngle;
        minRotX = Math.min(minRotX, rotX);
        minRotY = Math.min(minRotY, rotY);
        maxRotX = Math.max(maxRotX, rotX);
        maxRotY = Math.max(maxRotY, rotY);
      }
      var resolution = this.getResolutionForExtentInternal([minRotX, minRotY, maxRotX, maxRotY], [size[0] - padding[1] - padding[3], size[1] - padding[0] - padding[2]]);
      resolution = isNaN(resolution) ? minResolution : Math.max(resolution, minResolution);
      resolution = this.getConstrainedResolution(resolution, nearest ? 0 : 1);
      sinAngle = -sinAngle;
      var centerRotX = (minRotX + maxRotX) / 2;
      var centerRotY = (minRotY + maxRotY) / 2;
      centerRotX += (padding[1] - padding[3]) / 2 * resolution;
      centerRotY += (padding[0] - padding[2]) / 2 * resolution;
      var centerX = centerRotX * cosAngle - centerRotY * sinAngle;
      var centerY = centerRotY * cosAngle + centerRotX * sinAngle;
      var center = this.getConstrainedCenter([centerX, centerY], resolution);
      var callback = options.callback ? options.callback : VOID;
      if (options.duration !== void 0) {
        this.animateInternal({
          resolution,
          center,
          duration: options.duration,
          easing: options.easing
        }, callback);
      } else {
        this.targetResolution_ = resolution;
        this.targetCenter_ = center;
        this.applyTargetState_(false, true);
        animationCallback(callback, true);
      }
    };
    View2.prototype.centerOn = function(coordinate, size, position) {
      this.centerOnInternal(fromUserCoordinate(coordinate, this.getProjection()), size, position);
    };
    View2.prototype.centerOnInternal = function(coordinate, size, position) {
      this.setCenterInternal(calculateCenterOn(coordinate, size, position, this.getResolution(), this.getRotation()));
    };
    View2.prototype.calculateCenterShift = function(center, resolution, rotation, size) {
      var centerShift;
      var padding = this.padding;
      if (padding && center) {
        var reducedSize = this.getViewportSizeMinusPadding_(-rotation);
        var shiftedCenter = calculateCenterOn(center, size, [reducedSize[0] / 2 + padding[3], reducedSize[1] / 2 + padding[0]], resolution, rotation);
        centerShift = [center[0] - shiftedCenter[0], center[1] - shiftedCenter[1]];
      }
      return centerShift;
    };
    View2.prototype.isDef = function() {
      return !!this.getCenterInternal() && this.getResolution() !== void 0;
    };
    View2.prototype.adjustCenter = function(deltaCoordinates) {
      var center = toUserCoordinate(this.targetCenter_, this.getProjection());
      this.setCenter([center[0] + deltaCoordinates[0], center[1] + deltaCoordinates[1]]);
    };
    View2.prototype.adjustCenterInternal = function(deltaCoordinates) {
      var center = this.targetCenter_;
      this.setCenterInternal([center[0] + deltaCoordinates[0], center[1] + deltaCoordinates[1]]);
    };
    View2.prototype.adjustResolution = function(ratio, opt_anchor) {
      var anchor = opt_anchor && fromUserCoordinate(opt_anchor, this.getProjection());
      this.adjustResolutionInternal(ratio, anchor);
    };
    View2.prototype.adjustResolutionInternal = function(ratio, opt_anchor) {
      var isMoving = this.getAnimating() || this.getInteracting();
      var size = this.getViewportSize_(this.getRotation());
      var newResolution = this.constraints_.resolution(this.targetResolution_ * ratio, 0, size, isMoving);
      if (opt_anchor) {
        this.targetCenter_ = this.calculateCenterZoom(newResolution, opt_anchor);
      }
      this.targetResolution_ *= ratio;
      this.applyTargetState_();
    };
    View2.prototype.adjustZoom = function(delta, opt_anchor) {
      this.adjustResolution(Math.pow(this.zoomFactor_, -delta), opt_anchor);
    };
    View2.prototype.adjustRotation = function(delta, opt_anchor) {
      if (opt_anchor) {
        opt_anchor = fromUserCoordinate(opt_anchor, this.getProjection());
      }
      this.adjustRotationInternal(delta, opt_anchor);
    };
    View2.prototype.adjustRotationInternal = function(delta, opt_anchor) {
      var isMoving = this.getAnimating() || this.getInteracting();
      var newRotation = this.constraints_.rotation(this.targetRotation_ + delta, isMoving);
      if (opt_anchor) {
        this.targetCenter_ = this.calculateCenterRotate(newRotation, opt_anchor);
      }
      this.targetRotation_ += delta;
      this.applyTargetState_();
    };
    View2.prototype.setCenter = function(center) {
      this.setCenterInternal(fromUserCoordinate(center, this.getProjection()));
    };
    View2.prototype.setCenterInternal = function(center) {
      this.targetCenter_ = center;
      this.applyTargetState_();
    };
    View2.prototype.setHint = function(hint, delta) {
      this.hints_[hint] += delta;
      this.changed();
      return this.hints_[hint];
    };
    View2.prototype.setResolution = function(resolution) {
      this.targetResolution_ = resolution;
      this.applyTargetState_();
    };
    View2.prototype.setRotation = function(rotation) {
      this.targetRotation_ = rotation;
      this.applyTargetState_();
    };
    View2.prototype.setZoom = function(zoom) {
      this.setResolution(this.getResolutionForZoom(zoom));
    };
    View2.prototype.applyTargetState_ = function(opt_doNotCancelAnims, opt_forceMoving) {
      var isMoving = this.getAnimating() || this.getInteracting() || opt_forceMoving;
      var newRotation = this.constraints_.rotation(this.targetRotation_, isMoving);
      var size = this.getViewportSize_(newRotation);
      var newResolution = this.constraints_.resolution(this.targetResolution_, 0, size, isMoving);
      var newCenter = this.constraints_.center(this.targetCenter_, newResolution, size, isMoving, this.calculateCenterShift(this.targetCenter_, newResolution, newRotation, size));
      if (this.get(ViewProperty_default.ROTATION) !== newRotation) {
        this.set(ViewProperty_default.ROTATION, newRotation);
      }
      if (this.get(ViewProperty_default.RESOLUTION) !== newResolution) {
        this.set(ViewProperty_default.RESOLUTION, newResolution);
      }
      if (!this.get(ViewProperty_default.CENTER) || !equals3(this.get(ViewProperty_default.CENTER), newCenter)) {
        this.set(ViewProperty_default.CENTER, newCenter);
      }
      if (this.getAnimating() && !opt_doNotCancelAnims) {
        this.cancelAnimations();
      }
      this.cancelAnchor_ = void 0;
    };
    View2.prototype.resolveConstraints = function(opt_duration, opt_resolutionDirection, opt_anchor) {
      var duration = opt_duration !== void 0 ? opt_duration : 200;
      var direction = opt_resolutionDirection || 0;
      var newRotation = this.constraints_.rotation(this.targetRotation_);
      var size = this.getViewportSize_(newRotation);
      var newResolution = this.constraints_.resolution(this.targetResolution_, direction, size);
      var newCenter = this.constraints_.center(this.targetCenter_, newResolution, size, false, this.calculateCenterShift(this.targetCenter_, newResolution, newRotation, size));
      if (duration === 0 && !this.cancelAnchor_) {
        this.targetResolution_ = newResolution;
        this.targetRotation_ = newRotation;
        this.targetCenter_ = newCenter;
        this.applyTargetState_();
        return;
      }
      var anchor = opt_anchor || (duration === 0 ? this.cancelAnchor_ : void 0);
      this.cancelAnchor_ = void 0;
      if (this.getResolution() !== newResolution || this.getRotation() !== newRotation || !this.getCenterInternal() || !equals3(this.getCenterInternal(), newCenter)) {
        if (this.getAnimating()) {
          this.cancelAnimations();
        }
        this.animateInternal({
          rotation: newRotation,
          center: newCenter,
          resolution: newResolution,
          duration,
          easing: easeOut,
          anchor
        });
      }
    };
    View2.prototype.beginInteraction = function() {
      this.resolveConstraints(0);
      this.setHint(ViewHint_default.INTERACTING, 1);
    };
    View2.prototype.endInteraction = function(opt_duration, opt_resolutionDirection, opt_anchor) {
      var anchor = opt_anchor && fromUserCoordinate(opt_anchor, this.getProjection());
      this.endInteractionInternal(opt_duration, opt_resolutionDirection, anchor);
    };
    View2.prototype.endInteractionInternal = function(opt_duration, opt_resolutionDirection, opt_anchor) {
      this.setHint(ViewHint_default.INTERACTING, -1);
      this.resolveConstraints(opt_duration, opt_resolutionDirection, opt_anchor);
    };
    View2.prototype.getConstrainedCenter = function(targetCenter, opt_targetResolution) {
      var size = this.getViewportSize_(this.getRotation());
      return this.constraints_.center(targetCenter, opt_targetResolution || this.getResolution(), size);
    };
    View2.prototype.getConstrainedZoom = function(targetZoom, opt_direction) {
      var targetRes = this.getResolutionForZoom(targetZoom);
      return this.getZoomForResolution(this.getConstrainedResolution(targetRes, opt_direction));
    };
    View2.prototype.getConstrainedResolution = function(targetResolution, opt_direction) {
      var direction = opt_direction || 0;
      var size = this.getViewportSize_(this.getRotation());
      return this.constraints_.resolution(targetResolution, direction, size);
    };
    return View2;
  }(Object_default)
);
function animationCallback(callback, returnValue) {
  setTimeout(function() {
    callback(returnValue);
  }, 0);
}
function createCenterConstraint(options) {
  if (options.extent !== void 0) {
    var smooth = options.smoothExtentConstraint !== void 0 ? options.smoothExtentConstraint : true;
    return createExtent(options.extent, options.constrainOnlyCenter, smooth);
  }
  var projection = createProjection(options.projection, "EPSG:3857");
  if (options.multiWorld !== true && projection.isGlobal()) {
    var extent = projection.getExtent().slice();
    extent[0] = -Infinity;
    extent[2] = Infinity;
    return createExtent(extent, false, false);
  }
  return none;
}
function createResolutionConstraint(options) {
  var resolutionConstraint;
  var maxResolution;
  var minResolution;
  var defaultMaxZoom = 28;
  var defaultZoomFactor = 2;
  var minZoom = options.minZoom !== void 0 ? options.minZoom : DEFAULT_MIN_ZOOM;
  var maxZoom = options.maxZoom !== void 0 ? options.maxZoom : defaultMaxZoom;
  var zoomFactor = options.zoomFactor !== void 0 ? options.zoomFactor : defaultZoomFactor;
  var multiWorld = options.multiWorld !== void 0 ? options.multiWorld : false;
  var smooth = options.smoothResolutionConstraint !== void 0 ? options.smoothResolutionConstraint : true;
  var showFullExtent = options.showFullExtent !== void 0 ? options.showFullExtent : false;
  var projection = createProjection(options.projection, "EPSG:3857");
  var projExtent = projection.getExtent();
  var constrainOnlyCenter = options.constrainOnlyCenter;
  var extent = options.extent;
  if (!multiWorld && !extent && projection.isGlobal()) {
    constrainOnlyCenter = false;
    extent = projExtent;
  }
  if (options.resolutions !== void 0) {
    var resolutions = options.resolutions;
    maxResolution = resolutions[minZoom];
    minResolution = resolutions[maxZoom] !== void 0 ? resolutions[maxZoom] : resolutions[resolutions.length - 1];
    if (options.constrainResolution) {
      resolutionConstraint = createSnapToResolutions(resolutions, smooth, !constrainOnlyCenter && extent, showFullExtent);
    } else {
      resolutionConstraint = createMinMaxResolution(maxResolution, minResolution, smooth, !constrainOnlyCenter && extent, showFullExtent);
    }
  } else {
    var size = !projExtent ? (
      // use an extent that can fit the whole world if need be
      360 * METERS_PER_UNIT[Units_default.DEGREES] / projection.getMetersPerUnit()
    ) : Math.max(getWidth(projExtent), getHeight(projExtent));
    var defaultMaxResolution = size / DEFAULT_TILE_SIZE / Math.pow(defaultZoomFactor, DEFAULT_MIN_ZOOM);
    var defaultMinResolution = defaultMaxResolution / Math.pow(defaultZoomFactor, defaultMaxZoom - DEFAULT_MIN_ZOOM);
    maxResolution = options.maxResolution;
    if (maxResolution !== void 0) {
      minZoom = 0;
    } else {
      maxResolution = defaultMaxResolution / Math.pow(zoomFactor, minZoom);
    }
    minResolution = options.minResolution;
    if (minResolution === void 0) {
      if (options.maxZoom !== void 0) {
        if (options.maxResolution !== void 0) {
          minResolution = maxResolution / Math.pow(zoomFactor, maxZoom);
        } else {
          minResolution = defaultMaxResolution / Math.pow(zoomFactor, maxZoom);
        }
      } else {
        minResolution = defaultMinResolution;
      }
    }
    maxZoom = minZoom + Math.floor(Math.log(maxResolution / minResolution) / Math.log(zoomFactor));
    minResolution = maxResolution / Math.pow(zoomFactor, maxZoom - minZoom);
    if (options.constrainResolution) {
      resolutionConstraint = createSnapToPower(zoomFactor, maxResolution, minResolution, smooth, !constrainOnlyCenter && extent, showFullExtent);
    } else {
      resolutionConstraint = createMinMaxResolution(maxResolution, minResolution, smooth, !constrainOnlyCenter && extent, showFullExtent);
    }
  }
  return {
    constraint: resolutionConstraint,
    maxResolution,
    minResolution,
    minZoom,
    zoomFactor
  };
}
function createRotationConstraint(options) {
  var enableRotation = options.enableRotation !== void 0 ? options.enableRotation : true;
  if (enableRotation) {
    var constrainRotation = options.constrainRotation;
    if (constrainRotation === void 0 || constrainRotation === true) {
      return createSnapToZero();
    } else if (constrainRotation === false) {
      return none2;
    } else if (typeof constrainRotation === "number") {
      return createSnapToN(constrainRotation);
    } else {
      return none2;
    }
  } else {
    return disable;
  }
}
function isNoopAnimation(animation) {
  if (animation.sourceCenter && animation.targetCenter) {
    if (!equals3(animation.sourceCenter, animation.targetCenter)) {
      return false;
    }
  }
  if (animation.sourceResolution !== animation.targetResolution) {
    return false;
  }
  if (animation.sourceRotation !== animation.targetRotation) {
    return false;
  }
  return true;
}
function calculateCenterOn(coordinate, size, position, resolution, rotation) {
  var cosAngle = Math.cos(-rotation);
  var sinAngle = Math.sin(-rotation);
  var rotX = coordinate[0] * cosAngle - coordinate[1] * sinAngle;
  var rotY = coordinate[1] * cosAngle + coordinate[0] * sinAngle;
  rotX += (size[0] / 2 - position[0]) * resolution;
  rotY += (position[1] - size[1] / 2) * resolution;
  sinAngle = -sinAngle;
  var centerX = rotX * cosAngle - rotY * sinAngle;
  var centerY = rotY * cosAngle + rotX * sinAngle;
  return [centerX, centerY];
}
var View_default = View;

// node_modules/ol/PluggableMap.js
var __extends17 = /* @__PURE__ */ function() {
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
var PluggableMap = (
  /** @class */
  function(_super) {
    __extends17(PluggableMap2, _super);
    function PluggableMap2(options) {
      var _this = _super.call(this) || this;
      var optionsInternal = createOptionsInternal(options);
      _this.boundHandleBrowserEvent_ = _this.handleBrowserEvent.bind(_this);
      _this.maxTilesLoading_ = options.maxTilesLoading !== void 0 ? options.maxTilesLoading : 16;
      _this.pixelRatio_ = options.pixelRatio !== void 0 ? options.pixelRatio : DEVICE_PIXEL_RATIO;
      _this.postRenderTimeoutHandle_;
      _this.animationDelayKey_;
      _this.animationDelay_ = /** @this {PluggableMap} */
      function() {
        this.animationDelayKey_ = void 0;
        this.renderFrame_(Date.now());
      }.bind(_this);
      _this.coordinateToPixelTransform_ = create();
      _this.pixelToCoordinateTransform_ = create();
      _this.frameIndex_ = 0;
      _this.frameState_ = null;
      _this.previousExtent_ = null;
      _this.viewPropertyListenerKey_ = null;
      _this.viewChangeListenerKey_ = null;
      _this.layerGroupPropertyListenerKeys_ = null;
      _this.viewport_ = document.createElement("div");
      _this.viewport_.className = "ol-viewport" + ("ontouchstart" in window ? " ol-touch" : "");
      _this.viewport_.style.position = "relative";
      _this.viewport_.style.overflow = "hidden";
      _this.viewport_.style.width = "100%";
      _this.viewport_.style.height = "100%";
      _this.overlayContainer_ = document.createElement("div");
      _this.overlayContainer_.style.position = "absolute";
      _this.overlayContainer_.style.zIndex = "0";
      _this.overlayContainer_.style.width = "100%";
      _this.overlayContainer_.style.height = "100%";
      _this.overlayContainer_.style.pointerEvents = "none";
      _this.overlayContainer_.className = "ol-overlaycontainer";
      _this.viewport_.appendChild(_this.overlayContainer_);
      _this.overlayContainerStopEvent_ = document.createElement("div");
      _this.overlayContainerStopEvent_.style.position = "absolute";
      _this.overlayContainerStopEvent_.style.zIndex = "0";
      _this.overlayContainerStopEvent_.style.width = "100%";
      _this.overlayContainerStopEvent_.style.height = "100%";
      _this.overlayContainerStopEvent_.style.pointerEvents = "none";
      _this.overlayContainerStopEvent_.className = "ol-overlaycontainer-stopevent";
      _this.viewport_.appendChild(_this.overlayContainerStopEvent_);
      _this.mapBrowserEventHandler_ = null;
      _this.moveTolerance_ = options.moveTolerance;
      _this.keyboardEventTarget_ = optionsInternal.keyboardEventTarget;
      _this.keyHandlerKeys_ = null;
      _this.controls = optionsInternal.controls || new Collection_default();
      _this.interactions = optionsInternal.interactions || new Collection_default();
      _this.overlays_ = optionsInternal.overlays;
      _this.overlayIdIndex_ = {};
      _this.renderer_ = null;
      _this.handleResize_;
      _this.postRenderFunctions_ = [];
      _this.tileQueue_ = new TileQueue_default(_this.getTilePriority.bind(_this), _this.handleTileChange_.bind(_this));
      _this.addEventListener(getChangeEventType(MapProperty_default.LAYERGROUP), _this.handleLayerGroupChanged_);
      _this.addEventListener(getChangeEventType(MapProperty_default.VIEW), _this.handleViewChanged_);
      _this.addEventListener(getChangeEventType(MapProperty_default.SIZE), _this.handleSizeChanged_);
      _this.addEventListener(getChangeEventType(MapProperty_default.TARGET), _this.handleTargetChanged_);
      _this.setProperties(optionsInternal.values);
      _this.controls.forEach(
        /**
         * @param {import("./control/Control.js").default} control Control.
         * @this {PluggableMap}
         */
        function(control) {
          control.setMap(this);
        }.bind(_this)
      );
      _this.controls.addEventListener(
        CollectionEventType_default.ADD,
        /**
         * @param {import("./Collection.js").CollectionEvent} event CollectionEvent.
         */
        function(event) {
          event.element.setMap(this);
        }.bind(_this)
      );
      _this.controls.addEventListener(
        CollectionEventType_default.REMOVE,
        /**
         * @param {import("./Collection.js").CollectionEvent} event CollectionEvent.
         */
        function(event) {
          event.element.setMap(null);
        }.bind(_this)
      );
      _this.interactions.forEach(
        /**
         * @param {import("./interaction/Interaction.js").default} interaction Interaction.
         * @this {PluggableMap}
         */
        function(interaction) {
          interaction.setMap(this);
        }.bind(_this)
      );
      _this.interactions.addEventListener(
        CollectionEventType_default.ADD,
        /**
         * @param {import("./Collection.js").CollectionEvent} event CollectionEvent.
         */
        function(event) {
          event.element.setMap(this);
        }.bind(_this)
      );
      _this.interactions.addEventListener(
        CollectionEventType_default.REMOVE,
        /**
         * @param {import("./Collection.js").CollectionEvent} event CollectionEvent.
         */
        function(event) {
          event.element.setMap(null);
        }.bind(_this)
      );
      _this.overlays_.forEach(_this.addOverlayInternal_.bind(_this));
      _this.overlays_.addEventListener(
        CollectionEventType_default.ADD,
        /**
         * @param {import("./Collection.js").CollectionEvent} event CollectionEvent.
         */
        function(event) {
          this.addOverlayInternal_(
            /** @type {import("./Overlay.js").default} */
            event.element
          );
        }.bind(_this)
      );
      _this.overlays_.addEventListener(
        CollectionEventType_default.REMOVE,
        /**
         * @param {import("./Collection.js").CollectionEvent} event CollectionEvent.
         */
        function(event) {
          var overlay = (
            /** @type {import("./Overlay.js").default} */
            event.element
          );
          var id = overlay.getId();
          if (id !== void 0) {
            delete this.overlayIdIndex_[id.toString()];
          }
          event.element.setMap(null);
        }.bind(_this)
      );
      return _this;
    }
    PluggableMap2.prototype.createRenderer = function() {
      throw new Error("Use a map type that has a createRenderer method");
    };
    PluggableMap2.prototype.addControl = function(control) {
      this.getControls().push(control);
    };
    PluggableMap2.prototype.addInteraction = function(interaction) {
      this.getInteractions().push(interaction);
    };
    PluggableMap2.prototype.addLayer = function(layer) {
      var layers = this.getLayerGroup().getLayers();
      layers.push(layer);
    };
    PluggableMap2.prototype.addOverlay = function(overlay) {
      this.getOverlays().push(overlay);
    };
    PluggableMap2.prototype.addOverlayInternal_ = function(overlay) {
      var id = overlay.getId();
      if (id !== void 0) {
        this.overlayIdIndex_[id.toString()] = overlay;
      }
      overlay.setMap(this);
    };
    PluggableMap2.prototype.disposeInternal = function() {
      this.setTarget(null);
      _super.prototype.disposeInternal.call(this);
    };
    PluggableMap2.prototype.forEachFeatureAtPixel = function(pixel, callback, opt_options) {
      if (!this.frameState_) {
        return;
      }
      var coordinate = this.getCoordinateFromPixelInternal(pixel);
      opt_options = opt_options !== void 0 ? opt_options : {};
      var hitTolerance = opt_options.hitTolerance !== void 0 ? opt_options.hitTolerance : 0;
      var layerFilter = opt_options.layerFilter !== void 0 ? opt_options.layerFilter : TRUE;
      var checkWrapped = opt_options.checkWrapped !== false;
      return this.renderer_.forEachFeatureAtCoordinate(coordinate, this.frameState_, hitTolerance, checkWrapped, callback, null, layerFilter, null);
    };
    PluggableMap2.prototype.getFeaturesAtPixel = function(pixel, opt_options) {
      var features = [];
      this.forEachFeatureAtPixel(pixel, function(feature) {
        features.push(feature);
      }, opt_options);
      return features;
    };
    PluggableMap2.prototype.forEachLayerAtPixel = function(pixel, callback, opt_options) {
      if (!this.frameState_) {
        return;
      }
      var options = opt_options || {};
      var hitTolerance = options.hitTolerance !== void 0 ? options.hitTolerance : 0;
      var layerFilter = options.layerFilter || TRUE;
      return this.renderer_.forEachLayerAtPixel(pixel, this.frameState_, hitTolerance, callback, layerFilter);
    };
    PluggableMap2.prototype.hasFeatureAtPixel = function(pixel, opt_options) {
      if (!this.frameState_) {
        return false;
      }
      var coordinate = this.getCoordinateFromPixelInternal(pixel);
      opt_options = opt_options !== void 0 ? opt_options : {};
      var layerFilter = opt_options.layerFilter !== void 0 ? opt_options.layerFilter : TRUE;
      var hitTolerance = opt_options.hitTolerance !== void 0 ? opt_options.hitTolerance : 0;
      var checkWrapped = opt_options.checkWrapped !== false;
      return this.renderer_.hasFeatureAtCoordinate(coordinate, this.frameState_, hitTolerance, checkWrapped, layerFilter, null);
    };
    PluggableMap2.prototype.getEventCoordinate = function(event) {
      return this.getCoordinateFromPixel(this.getEventPixel(event));
    };
    PluggableMap2.prototype.getEventCoordinateInternal = function(event) {
      return this.getCoordinateFromPixelInternal(this.getEventPixel(event));
    };
    PluggableMap2.prototype.getEventPixel = function(event) {
      var viewportPosition = this.viewport_.getBoundingClientRect();
      var eventPosition = (
        //FIXME Are we really calling this with a TouchEvent anywhere?
        "changedTouches" in event ? (
          /** @type {TouchEvent} */
          event.changedTouches[0]
        ) : (
          /** @type {MouseEvent} */
          event
        )
      );
      return [eventPosition.clientX - viewportPosition.left, eventPosition.clientY - viewportPosition.top];
    };
    PluggableMap2.prototype.getTarget = function() {
      return (
        /** @type {HTMLElement|string|undefined} */
        this.get(MapProperty_default.TARGET)
      );
    };
    PluggableMap2.prototype.getTargetElement = function() {
      var target = this.getTarget();
      if (target !== void 0) {
        return typeof target === "string" ? document.getElementById(target) : target;
      } else {
        return null;
      }
    };
    PluggableMap2.prototype.getCoordinateFromPixel = function(pixel) {
      return toUserCoordinate(this.getCoordinateFromPixelInternal(pixel), this.getView().getProjection());
    };
    PluggableMap2.prototype.getCoordinateFromPixelInternal = function(pixel) {
      var frameState = this.frameState_;
      if (!frameState) {
        return null;
      } else {
        return apply(frameState.pixelToCoordinateTransform, pixel.slice());
      }
    };
    PluggableMap2.prototype.getControls = function() {
      return this.controls;
    };
    PluggableMap2.prototype.getOverlays = function() {
      return this.overlays_;
    };
    PluggableMap2.prototype.getOverlayById = function(id) {
      var overlay = this.overlayIdIndex_[id.toString()];
      return overlay !== void 0 ? overlay : null;
    };
    PluggableMap2.prototype.getInteractions = function() {
      return this.interactions;
    };
    PluggableMap2.prototype.getLayerGroup = function() {
      return (
        /** @type {LayerGroup} */
        this.get(MapProperty_default.LAYERGROUP)
      );
    };
    PluggableMap2.prototype.getLayers = function() {
      var layers = this.getLayerGroup().getLayers();
      return layers;
    };
    PluggableMap2.prototype.getLoading = function() {
      var layerStatesArray = this.getLayerGroup().getLayerStatesArray();
      for (var i = 0, ii = layerStatesArray.length; i < ii; ++i) {
        var layer = layerStatesArray[i].layer;
        var source = (
          /** @type {import("./layer/Layer.js").default} */
          layer.getSource()
        );
        if (source && source.loading) {
          return true;
        }
      }
      return false;
    };
    PluggableMap2.prototype.getPixelFromCoordinate = function(coordinate) {
      var viewCoordinate = fromUserCoordinate(coordinate, this.getView().getProjection());
      return this.getPixelFromCoordinateInternal(viewCoordinate);
    };
    PluggableMap2.prototype.getPixelFromCoordinateInternal = function(coordinate) {
      var frameState = this.frameState_;
      if (!frameState) {
        return null;
      } else {
        return apply(frameState.coordinateToPixelTransform, coordinate.slice(0, 2));
      }
    };
    PluggableMap2.prototype.getRenderer = function() {
      return this.renderer_;
    };
    PluggableMap2.prototype.getSize = function() {
      return (
        /** @type {import("./size.js").Size|undefined} */
        this.get(MapProperty_default.SIZE)
      );
    };
    PluggableMap2.prototype.getView = function() {
      return (
        /** @type {View} */
        this.get(MapProperty_default.VIEW)
      );
    };
    PluggableMap2.prototype.getViewport = function() {
      return this.viewport_;
    };
    PluggableMap2.prototype.getOverlayContainer = function() {
      return this.overlayContainer_;
    };
    PluggableMap2.prototype.getOverlayContainerStopEvent = function() {
      return this.overlayContainerStopEvent_;
    };
    PluggableMap2.prototype.getOwnerDocument = function() {
      return this.getTargetElement() ? this.getTargetElement().ownerDocument : document;
    };
    PluggableMap2.prototype.getTilePriority = function(tile, tileSourceKey, tileCenter, tileResolution) {
      return getTilePriority(this.frameState_, tile, tileSourceKey, tileCenter, tileResolution);
    };
    PluggableMap2.prototype.handleBrowserEvent = function(browserEvent, opt_type) {
      var type = opt_type || browserEvent.type;
      var mapBrowserEvent = new MapBrowserEvent_default(type, this, browserEvent);
      this.handleMapBrowserEvent(mapBrowserEvent);
    };
    PluggableMap2.prototype.handleMapBrowserEvent = function(mapBrowserEvent) {
      if (!this.frameState_) {
        return;
      }
      var originalEvent = (
        /** @type {PointerEvent} */
        mapBrowserEvent.originalEvent
      );
      var eventType = originalEvent.type;
      if (eventType === EventType_default3.POINTERDOWN || eventType === EventType_default.WHEEL || eventType === EventType_default.KEYDOWN) {
        var doc = this.getOwnerDocument();
        var rootNode = this.viewport_.getRootNode ? this.viewport_.getRootNode() : doc;
        var target = "host" in rootNode ? (
          /** @type {ShadowRoot} */
          rootNode.elementFromPoint(originalEvent.clientX, originalEvent.clientY)
        ) : (
          /** @type {Node} */
          originalEvent.target
        );
        if (
          // Abort if the target is a child of the container for elements whose events are not meant
          // to be handled by map interactions.
          this.overlayContainerStopEvent_.contains(target) || // Abort if the event target is a child of the container that is no longer in the page.
          // It's possible for the target to no longer be in the page if it has been removed in an
          // event listener, this might happen in a Control that recreates it's content based on
          // user interaction either manually or via a render in something like https://reactjs.org/
          !(rootNode === doc ? doc.documentElement : rootNode).contains(target)
        ) {
          return;
        }
      }
      mapBrowserEvent.frameState = this.frameState_;
      if (this.dispatchEvent(mapBrowserEvent) !== false) {
        var interactionsArray = this.getInteractions().getArray().slice();
        for (var i = interactionsArray.length - 1; i >= 0; i--) {
          var interaction = interactionsArray[i];
          if (interaction.getMap() !== this || !interaction.getActive() || !this.getTargetElement()) {
            continue;
          }
          var cont = interaction.handleEvent(mapBrowserEvent);
          if (!cont || mapBrowserEvent.propagationStopped) {
            break;
          }
        }
      }
    };
    PluggableMap2.prototype.handlePostRender = function() {
      var frameState = this.frameState_;
      var tileQueue = this.tileQueue_;
      if (!tileQueue.isEmpty()) {
        var maxTotalLoading = this.maxTilesLoading_;
        var maxNewLoads = maxTotalLoading;
        if (frameState) {
          var hints = frameState.viewHints;
          if (hints[ViewHint_default.ANIMATING] || hints[ViewHint_default.INTERACTING]) {
            var lowOnFrameBudget = !IMAGE_DECODE && Date.now() - frameState.time > 8;
            maxTotalLoading = lowOnFrameBudget ? 0 : 8;
            maxNewLoads = lowOnFrameBudget ? 0 : 2;
          }
        }
        if (tileQueue.getTilesLoading() < maxTotalLoading) {
          tileQueue.reprioritize();
          tileQueue.loadMoreTiles(maxTotalLoading, maxNewLoads);
        }
      }
      if (frameState && this.hasListener(EventType_default2.RENDERCOMPLETE) && !frameState.animate && !this.tileQueue_.getTilesLoading() && !this.getLoading()) {
        this.renderer_.dispatchRenderEvent(EventType_default2.RENDERCOMPLETE, frameState);
      }
      var postRenderFunctions = this.postRenderFunctions_;
      for (var i = 0, ii = postRenderFunctions.length; i < ii; ++i) {
        postRenderFunctions[i](this, frameState);
      }
      postRenderFunctions.length = 0;
    };
    PluggableMap2.prototype.handleSizeChanged_ = function() {
      if (this.getView() && !this.getView().getAnimating()) {
        this.getView().resolveConstraints(0);
      }
      this.render();
    };
    PluggableMap2.prototype.handleTargetChanged_ = function() {
      var targetElement;
      if (this.getTarget()) {
        targetElement = this.getTargetElement();
      }
      if (this.mapBrowserEventHandler_) {
        for (var i = 0, ii = this.keyHandlerKeys_.length; i < ii; ++i) {
          unlistenByKey(this.keyHandlerKeys_[i]);
        }
        this.keyHandlerKeys_ = null;
        this.viewport_.removeEventListener(EventType_default.CONTEXTMENU, this.boundHandleBrowserEvent_);
        this.viewport_.removeEventListener(EventType_default.WHEEL, this.boundHandleBrowserEvent_);
        if (this.handleResize_ !== void 0) {
          removeEventListener(EventType_default.RESIZE, this.handleResize_, false);
          this.handleResize_ = void 0;
        }
        this.mapBrowserEventHandler_.dispose();
        this.mapBrowserEventHandler_ = null;
        removeNode(this.viewport_);
      }
      if (!targetElement) {
        if (this.renderer_) {
          clearTimeout(this.postRenderTimeoutHandle_);
          this.postRenderTimeoutHandle_ = void 0;
          this.postRenderFunctions_.length = 0;
          this.renderer_.dispose();
          this.renderer_ = null;
        }
        if (this.animationDelayKey_) {
          cancelAnimationFrame(this.animationDelayKey_);
          this.animationDelayKey_ = void 0;
        }
      } else {
        targetElement.appendChild(this.viewport_);
        if (!this.renderer_) {
          this.renderer_ = this.createRenderer();
        }
        this.mapBrowserEventHandler_ = new MapBrowserEventHandler_default(this, this.moveTolerance_);
        for (var key in MapBrowserEventType_default) {
          this.mapBrowserEventHandler_.addEventListener(MapBrowserEventType_default[key], this.handleMapBrowserEvent.bind(this));
        }
        this.viewport_.addEventListener(EventType_default.CONTEXTMENU, this.boundHandleBrowserEvent_, false);
        this.viewport_.addEventListener(EventType_default.WHEEL, this.boundHandleBrowserEvent_, PASSIVE_EVENT_LISTENERS ? {
          passive: false
        } : false);
        var keyboardEventTarget = !this.keyboardEventTarget_ ? targetElement : this.keyboardEventTarget_;
        this.keyHandlerKeys_ = [listen(keyboardEventTarget, EventType_default.KEYDOWN, this.handleBrowserEvent, this), listen(keyboardEventTarget, EventType_default.KEYPRESS, this.handleBrowserEvent, this)];
        if (!this.handleResize_) {
          this.handleResize_ = this.updateSize.bind(this);
          window.addEventListener(EventType_default.RESIZE, this.handleResize_, false);
        }
      }
      this.updateSize();
    };
    PluggableMap2.prototype.handleTileChange_ = function() {
      this.render();
    };
    PluggableMap2.prototype.handleViewPropertyChanged_ = function() {
      this.render();
    };
    PluggableMap2.prototype.handleViewChanged_ = function() {
      if (this.viewPropertyListenerKey_) {
        unlistenByKey(this.viewPropertyListenerKey_);
        this.viewPropertyListenerKey_ = null;
      }
      if (this.viewChangeListenerKey_) {
        unlistenByKey(this.viewChangeListenerKey_);
        this.viewChangeListenerKey_ = null;
      }
      var view = this.getView();
      if (view) {
        this.updateViewportSize_();
        this.viewPropertyListenerKey_ = listen(view, ObjectEventType_default.PROPERTYCHANGE, this.handleViewPropertyChanged_, this);
        this.viewChangeListenerKey_ = listen(view, EventType_default.CHANGE, this.handleViewPropertyChanged_, this);
        view.resolveConstraints(0);
      }
      this.render();
    };
    PluggableMap2.prototype.handleLayerGroupChanged_ = function() {
      if (this.layerGroupPropertyListenerKeys_) {
        this.layerGroupPropertyListenerKeys_.forEach(unlistenByKey);
        this.layerGroupPropertyListenerKeys_ = null;
      }
      var layerGroup = this.getLayerGroup();
      if (layerGroup) {
        this.layerGroupPropertyListenerKeys_ = [listen(layerGroup, ObjectEventType_default.PROPERTYCHANGE, this.render, this), listen(layerGroup, EventType_default.CHANGE, this.render, this)];
      }
      this.render();
    };
    PluggableMap2.prototype.isRendered = function() {
      return !!this.frameState_;
    };
    PluggableMap2.prototype.renderSync = function() {
      if (this.animationDelayKey_) {
        cancelAnimationFrame(this.animationDelayKey_);
      }
      this.animationDelay_();
    };
    PluggableMap2.prototype.redrawText = function() {
      var layerStates = this.getLayerGroup().getLayerStatesArray();
      for (var i = 0, ii = layerStates.length; i < ii; ++i) {
        var layer = layerStates[i].layer;
        if (layer.hasRenderer()) {
          layer.getRenderer().handleFontsChanged();
        }
      }
    };
    PluggableMap2.prototype.render = function() {
      if (this.renderer_ && this.animationDelayKey_ === void 0) {
        this.animationDelayKey_ = requestAnimationFrame(this.animationDelay_);
      }
    };
    PluggableMap2.prototype.removeControl = function(control) {
      return this.getControls().remove(control);
    };
    PluggableMap2.prototype.removeInteraction = function(interaction) {
      return this.getInteractions().remove(interaction);
    };
    PluggableMap2.prototype.removeLayer = function(layer) {
      var layers = this.getLayerGroup().getLayers();
      return layers.remove(layer);
    };
    PluggableMap2.prototype.removeOverlay = function(overlay) {
      return this.getOverlays().remove(overlay);
    };
    PluggableMap2.prototype.renderFrame_ = function(time) {
      var _this = this;
      var size = this.getSize();
      var view = this.getView();
      var previousFrameState = this.frameState_;
      var frameState = null;
      if (size !== void 0 && hasArea(size) && view && view.isDef()) {
        var viewHints = view.getHints(this.frameState_ ? this.frameState_.viewHints : void 0);
        var viewState = view.getState();
        frameState = {
          animate: false,
          coordinateToPixelTransform: this.coordinateToPixelTransform_,
          declutterTree: null,
          extent: getForViewAndSize(viewState.center, viewState.resolution, viewState.rotation, size),
          index: this.frameIndex_++,
          layerIndex: 0,
          layerStatesArray: this.getLayerGroup().getLayerStatesArray(),
          pixelRatio: this.pixelRatio_,
          pixelToCoordinateTransform: this.pixelToCoordinateTransform_,
          postRenderFunctions: [],
          size,
          tileQueue: this.tileQueue_,
          time,
          usedTiles: {},
          viewState,
          viewHints,
          wantedTiles: {}
        };
      }
      this.frameState_ = frameState;
      this.renderer_.renderFrame(frameState);
      if (frameState) {
        if (frameState.animate) {
          this.render();
        }
        Array.prototype.push.apply(this.postRenderFunctions_, frameState.postRenderFunctions);
        if (previousFrameState) {
          var moveStart = !this.previousExtent_ || !isEmpty(this.previousExtent_) && !equals2(frameState.extent, this.previousExtent_);
          if (moveStart) {
            this.dispatchEvent(new MapEvent_default(MapEventType_default.MOVESTART, this, previousFrameState));
            this.previousExtent_ = createOrUpdateEmpty(this.previousExtent_);
          }
        }
        var idle = this.previousExtent_ && !frameState.viewHints[ViewHint_default.ANIMATING] && !frameState.viewHints[ViewHint_default.INTERACTING] && !equals2(frameState.extent, this.previousExtent_);
        if (idle) {
          this.dispatchEvent(new MapEvent_default(MapEventType_default.MOVEEND, this, frameState));
          clone(frameState.extent, this.previousExtent_);
        }
      }
      this.dispatchEvent(new MapEvent_default(MapEventType_default.POSTRENDER, this, frameState));
      if (!this.postRenderTimeoutHandle_) {
        this.postRenderTimeoutHandle_ = setTimeout(function() {
          _this.postRenderTimeoutHandle_ = void 0;
          _this.handlePostRender();
        }, 0);
      }
    };
    PluggableMap2.prototype.setLayerGroup = function(layerGroup) {
      this.set(MapProperty_default.LAYERGROUP, layerGroup);
    };
    PluggableMap2.prototype.setSize = function(size) {
      this.set(MapProperty_default.SIZE, size);
    };
    PluggableMap2.prototype.setTarget = function(target) {
      this.set(MapProperty_default.TARGET, target);
    };
    PluggableMap2.prototype.setView = function(view) {
      this.set(MapProperty_default.VIEW, view);
    };
    PluggableMap2.prototype.updateSize = function() {
      var targetElement = this.getTargetElement();
      if (!targetElement) {
        this.setSize(void 0);
      } else {
        var computedStyle = getComputedStyle(targetElement);
        this.setSize([targetElement.offsetWidth - parseFloat(computedStyle["borderLeftWidth"]) - parseFloat(computedStyle["paddingLeft"]) - parseFloat(computedStyle["paddingRight"]) - parseFloat(computedStyle["borderRightWidth"]), targetElement.offsetHeight - parseFloat(computedStyle["borderTopWidth"]) - parseFloat(computedStyle["paddingTop"]) - parseFloat(computedStyle["paddingBottom"]) - parseFloat(computedStyle["borderBottomWidth"])]);
      }
      this.updateViewportSize_();
    };
    PluggableMap2.prototype.updateViewportSize_ = function() {
      var view = this.getView();
      if (view) {
        var size = void 0;
        var computedStyle = getComputedStyle(this.viewport_);
        if (computedStyle.width && computedStyle.height) {
          size = [parseInt(computedStyle.width, 10), parseInt(computedStyle.height, 10)];
        }
        view.setViewportSize(size);
      }
    };
    return PluggableMap2;
  }(Object_default)
);
function createOptionsInternal(options) {
  var keyboardEventTarget = null;
  if (options.keyboardEventTarget !== void 0) {
    keyboardEventTarget = typeof options.keyboardEventTarget === "string" ? document.getElementById(options.keyboardEventTarget) : options.keyboardEventTarget;
  }
  var values = {};
  var layerGroup = options.layers && typeof /** @type {?} */
  options.layers.getLayers === "function" ? (
    /** @type {LayerGroup} */
    options.layers
  ) : new Group_default({
    layers: (
      /** @type {Collection} */
      options.layers
    )
  });
  values[MapProperty_default.LAYERGROUP] = layerGroup;
  values[MapProperty_default.TARGET] = options.target;
  values[MapProperty_default.VIEW] = options.view !== void 0 ? options.view : new View_default();
  var controls;
  if (options.controls !== void 0) {
    if (Array.isArray(options.controls)) {
      controls = new Collection_default(options.controls.slice());
    } else {
      assert(typeof /** @type {?} */
      options.controls.getArray === "function", 47);
      controls = /** @type {Collection} */
      options.controls;
    }
  }
  var interactions;
  if (options.interactions !== void 0) {
    if (Array.isArray(options.interactions)) {
      interactions = new Collection_default(options.interactions.slice());
    } else {
      assert(typeof /** @type {?} */
      options.interactions.getArray === "function", 48);
      interactions = /** @type {Collection} */
      options.interactions;
    }
  }
  var overlays;
  if (options.overlays !== void 0) {
    if (Array.isArray(options.overlays)) {
      overlays = new Collection_default(options.overlays.slice());
    } else {
      assert(typeof /** @type {?} */
      options.overlays.getArray === "function", 49);
      overlays = options.overlays;
    }
  } else {
    overlays = new Collection_default();
  }
  return {
    controls,
    interactions,
    keyboardEventTarget,
    overlays,
    values
  };
}
var PluggableMap_default = PluggableMap;

// node_modules/ol/control/OverviewMap.js
var __extends18 = /* @__PURE__ */ function() {
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
var MAX_RATIO = 0.75;
var MIN_RATIO = 0.1;
var ControlledMap = (
  /** @class */
  function(_super) {
    __extends18(ControlledMap2, _super);
    function ControlledMap2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    ControlledMap2.prototype.createRenderer = function() {
      return new Composite_default(this);
    };
    return ControlledMap2;
  }(PluggableMap_default)
);
var OverviewMap = (
  /** @class */
  function(_super) {
    __extends18(OverviewMap2, _super);
    function OverviewMap2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      _this = _super.call(this, {
        element: document.createElement("div"),
        render: options.render,
        target: options.target
      }) || this;
      _this.boundHandleRotationChanged_ = _this.handleRotationChanged_.bind(_this);
      _this.collapsed_ = options.collapsed !== void 0 ? options.collapsed : true;
      _this.collapsible_ = options.collapsible !== void 0 ? options.collapsible : true;
      if (!_this.collapsible_) {
        _this.collapsed_ = false;
      }
      _this.rotateWithView_ = options.rotateWithView !== void 0 ? options.rotateWithView : false;
      _this.viewExtent_ = void 0;
      var className = options.className !== void 0 ? options.className : "ol-overviewmap";
      var tipLabel = options.tipLabel !== void 0 ? options.tipLabel : "Overview map";
      var collapseLabel = options.collapseLabel !== void 0 ? options.collapseLabel : "«";
      if (typeof collapseLabel === "string") {
        _this.collapseLabel_ = document.createElement("span");
        _this.collapseLabel_.textContent = collapseLabel;
      } else {
        _this.collapseLabel_ = collapseLabel;
      }
      var label = options.label !== void 0 ? options.label : "»";
      if (typeof label === "string") {
        _this.label_ = document.createElement("span");
        _this.label_.textContent = label;
      } else {
        _this.label_ = label;
      }
      var activeLabel = _this.collapsible_ && !_this.collapsed_ ? _this.collapseLabel_ : _this.label_;
      var button = document.createElement("button");
      button.setAttribute("type", "button");
      button.title = tipLabel;
      button.appendChild(activeLabel);
      button.addEventListener(EventType_default.CLICK, _this.handleClick_.bind(_this), false);
      _this.ovmapDiv_ = document.createElement("div");
      _this.ovmapDiv_.className = "ol-overviewmap-map";
      _this.view_ = options.view;
      _this.ovmap_ = new ControlledMap({
        view: options.view
      });
      var ovmap = _this.ovmap_;
      if (options.layers) {
        options.layers.forEach(function(layer) {
          ovmap.addLayer(layer);
        });
      }
      var box = document.createElement("div");
      box.className = "ol-overviewmap-box";
      box.style.boxSizing = "border-box";
      _this.boxOverlay_ = new Overlay_default({
        position: [0, 0],
        positioning: OverlayPositioning_default.CENTER_CENTER,
        element: box
      });
      _this.ovmap_.addOverlay(_this.boxOverlay_);
      var cssClasses = className + " " + CLASS_UNSELECTABLE + " " + CLASS_CONTROL + (_this.collapsed_ && _this.collapsible_ ? " " + CLASS_COLLAPSED : "") + (_this.collapsible_ ? "" : " ol-uncollapsible");
      var element = _this.element;
      element.className = cssClasses;
      element.appendChild(_this.ovmapDiv_);
      element.appendChild(button);
      var scope = _this;
      var overlay = _this.boxOverlay_;
      var overlayBox = _this.boxOverlay_.getElement();
      var computeDesiredMousePosition = function(mousePosition) {
        return {
          clientX: mousePosition.clientX,
          clientY: mousePosition.clientY
        };
      };
      var move = function(event) {
        var position = (
          /** @type {?} */
          computeDesiredMousePosition(event)
        );
        var coordinates2 = ovmap.getEventCoordinateInternal(
          /** @type {MouseEvent} */
          position
        );
        overlay.setPosition(coordinates2);
      };
      var endMoving = function(event) {
        var coordinates2 = ovmap.getEventCoordinateInternal(event);
        scope.getMap().getView().setCenterInternal(coordinates2);
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", endMoving);
      };
      overlayBox.addEventListener("mousedown", function() {
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", endMoving);
      });
      return _this;
    }
    OverviewMap2.prototype.setMap = function(map) {
      var oldMap = this.getMap();
      if (map === oldMap) {
        return;
      }
      if (oldMap) {
        var oldView = oldMap.getView();
        if (oldView) {
          this.unbindView_(oldView);
        }
        this.ovmap_.setTarget(null);
      }
      _super.prototype.setMap.call(this, map);
      if (map) {
        this.ovmap_.setTarget(this.ovmapDiv_);
        this.listenerKeys.push(listen(map, ObjectEventType_default.PROPERTYCHANGE, this.handleMapPropertyChange_, this));
        var view = map.getView();
        if (view) {
          this.bindView_(view);
          if (view.isDef()) {
            this.ovmap_.updateSize();
            this.resetExtent_();
          }
        }
      }
    };
    OverviewMap2.prototype.handleMapPropertyChange_ = function(event) {
      if (event.key === MapProperty_default.VIEW) {
        var oldView = (
          /** @type {import("../View.js").default} */
          event.oldValue
        );
        if (oldView) {
          this.unbindView_(oldView);
        }
        var newView = this.getMap().getView();
        this.bindView_(newView);
      }
    };
    OverviewMap2.prototype.bindView_ = function(view) {
      if (!this.view_) {
        var newView = new View_default({
          projection: view.getProjection()
        });
        this.ovmap_.setView(newView);
      }
      view.addEventListener(getChangeEventType(ViewProperty_default.ROTATION), this.boundHandleRotationChanged_);
      this.handleRotationChanged_();
    };
    OverviewMap2.prototype.unbindView_ = function(view) {
      view.removeEventListener(getChangeEventType(ViewProperty_default.ROTATION), this.boundHandleRotationChanged_);
    };
    OverviewMap2.prototype.handleRotationChanged_ = function() {
      if (this.rotateWithView_) {
        this.ovmap_.getView().setRotation(this.getMap().getView().getRotation());
      }
    };
    OverviewMap2.prototype.validateExtent_ = function() {
      var map = this.getMap();
      var ovmap = this.ovmap_;
      if (!map.isRendered() || !ovmap.isRendered()) {
        return;
      }
      var mapSize = (
        /** @type {import("../size.js").Size} */
        map.getSize()
      );
      var view = map.getView();
      var extent = view.calculateExtentInternal(mapSize);
      if (this.viewExtent_ && equals2(extent, this.viewExtent_)) {
        return;
      }
      this.viewExtent_ = extent;
      var ovmapSize = (
        /** @type {import("../size.js").Size} */
        ovmap.getSize()
      );
      var ovview = ovmap.getView();
      var ovextent = ovview.calculateExtentInternal(ovmapSize);
      var topLeftPixel = ovmap.getPixelFromCoordinateInternal(getTopLeft(extent));
      var bottomRightPixel = ovmap.getPixelFromCoordinateInternal(getBottomRight(extent));
      var boxWidth = Math.abs(topLeftPixel[0] - bottomRightPixel[0]);
      var boxHeight = Math.abs(topLeftPixel[1] - bottomRightPixel[1]);
      var ovmapWidth = ovmapSize[0];
      var ovmapHeight = ovmapSize[1];
      if (boxWidth < ovmapWidth * MIN_RATIO || boxHeight < ovmapHeight * MIN_RATIO || boxWidth > ovmapWidth * MAX_RATIO || boxHeight > ovmapHeight * MAX_RATIO) {
        this.resetExtent_();
      } else if (!containsExtent(ovextent, extent)) {
        this.recenter_();
      }
    };
    OverviewMap2.prototype.resetExtent_ = function() {
      if (MAX_RATIO === 0 || MIN_RATIO === 0) {
        return;
      }
      var map = this.getMap();
      var ovmap = this.ovmap_;
      var mapSize = (
        /** @type {import("../size.js").Size} */
        map.getSize()
      );
      var view = map.getView();
      var extent = view.calculateExtentInternal(mapSize);
      var ovview = ovmap.getView();
      var steps = Math.log(MAX_RATIO / MIN_RATIO) / Math.LN2;
      var ratio = 1 / (Math.pow(2, steps / 2) * MIN_RATIO);
      scaleFromCenter(extent, ratio);
      ovview.fitInternal(fromExtent(extent));
    };
    OverviewMap2.prototype.recenter_ = function() {
      var map = this.getMap();
      var ovmap = this.ovmap_;
      var view = map.getView();
      var ovview = ovmap.getView();
      ovview.setCenterInternal(view.getCenterInternal());
    };
    OverviewMap2.prototype.updateBox_ = function() {
      var map = this.getMap();
      var ovmap = this.ovmap_;
      if (!map.isRendered() || !ovmap.isRendered()) {
        return;
      }
      var mapSize = (
        /** @type {import("../size.js").Size} */
        map.getSize()
      );
      var view = map.getView();
      var ovview = ovmap.getView();
      var rotation = this.rotateWithView_ ? 0 : -view.getRotation();
      var overlay = this.boxOverlay_;
      var box = this.boxOverlay_.getElement();
      var center = view.getCenterInternal();
      var resolution = view.getResolution();
      var ovresolution = ovview.getResolution();
      var width = mapSize[0] * resolution / ovresolution;
      var height = mapSize[1] * resolution / ovresolution;
      overlay.setPosition(center);
      if (box) {
        box.style.width = width + "px";
        box.style.height = height + "px";
        var transform = "rotate(" + rotation + "rad)";
        box.style.transform = transform;
      }
    };
    OverviewMap2.prototype.handleClick_ = function(event) {
      event.preventDefault();
      this.handleToggle_();
    };
    OverviewMap2.prototype.handleToggle_ = function() {
      this.element.classList.toggle(CLASS_COLLAPSED);
      if (this.collapsed_) {
        replaceNode(this.collapseLabel_, this.label_);
      } else {
        replaceNode(this.label_, this.collapseLabel_);
      }
      this.collapsed_ = !this.collapsed_;
      var ovmap = this.ovmap_;
      if (!this.collapsed_) {
        if (ovmap.isRendered()) {
          this.viewExtent_ = void 0;
          ovmap.render();
          return;
        }
        ovmap.updateSize();
        this.resetExtent_();
        listenOnce(ovmap, MapEventType_default.POSTRENDER, function(event) {
          this.updateBox_();
        }, this);
      }
    };
    OverviewMap2.prototype.getCollapsible = function() {
      return this.collapsible_;
    };
    OverviewMap2.prototype.setCollapsible = function(collapsible) {
      if (this.collapsible_ === collapsible) {
        return;
      }
      this.collapsible_ = collapsible;
      this.element.classList.toggle("ol-uncollapsible");
      if (!collapsible && this.collapsed_) {
        this.handleToggle_();
      }
    };
    OverviewMap2.prototype.setCollapsed = function(collapsed) {
      if (!this.collapsible_ || this.collapsed_ === collapsed) {
        return;
      }
      this.handleToggle_();
    };
    OverviewMap2.prototype.getCollapsed = function() {
      return this.collapsed_;
    };
    OverviewMap2.prototype.getRotateWithView = function() {
      return this.rotateWithView_;
    };
    OverviewMap2.prototype.setRotateWithView = function(rotateWithView) {
      if (this.rotateWithView_ === rotateWithView) {
        return;
      }
      this.rotateWithView_ = rotateWithView;
      if (this.getMap().getView().getRotation() !== 0) {
        if (this.rotateWithView_) {
          this.handleRotationChanged_();
        } else {
          this.ovmap_.getView().setRotation(0);
        }
        this.viewExtent_ = void 0;
        this.validateExtent_();
        this.updateBox_();
      }
    };
    OverviewMap2.prototype.getOverviewMap = function() {
      return this.ovmap_;
    };
    OverviewMap2.prototype.render = function(mapEvent) {
      this.validateExtent_();
      this.updateBox_();
    };
    return OverviewMap2;
  }(Control_default)
);
var OverviewMap_default = OverviewMap;

// node_modules/ol/control/ScaleLine.js
var __extends19 = /* @__PURE__ */ function() {
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
var UNITS_PROP = "units";
var Units = {
  DEGREES: "degrees",
  IMPERIAL: "imperial",
  NAUTICAL: "nautical",
  METRIC: "metric",
  US: "us"
};
var LEADING_DIGITS = [1, 2, 5];
var DEFAULT_DPI = 25.4 / 0.28;
var ScaleLine = (
  /** @class */
  function(_super) {
    __extends19(ScaleLine2, _super);
    function ScaleLine2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      var className = options.className !== void 0 ? options.className : options.bar ? "ol-scale-bar" : "ol-scale-line";
      _this = _super.call(this, {
        element: document.createElement("div"),
        render: options.render,
        target: options.target
      }) || this;
      _this.innerElement_ = document.createElement("div");
      _this.innerElement_.className = className + "-inner";
      _this.element.className = className + " " + CLASS_UNSELECTABLE;
      _this.element.appendChild(_this.innerElement_);
      _this.viewState_ = null;
      _this.minWidth_ = options.minWidth !== void 0 ? options.minWidth : 64;
      _this.renderedVisible_ = false;
      _this.renderedWidth_ = void 0;
      _this.renderedHTML_ = "";
      _this.addEventListener(getChangeEventType(UNITS_PROP), _this.handleUnitsChanged_);
      _this.setUnits(options.units || Units.METRIC);
      _this.scaleBar_ = options.bar || false;
      _this.scaleBarSteps_ = options.steps || 4;
      _this.scaleBarText_ = options.text || false;
      _this.dpi_ = options.dpi || void 0;
      return _this;
    }
    ScaleLine2.prototype.getUnits = function() {
      return this.get(UNITS_PROP);
    };
    ScaleLine2.prototype.handleUnitsChanged_ = function() {
      this.updateElement_();
    };
    ScaleLine2.prototype.setUnits = function(units) {
      this.set(UNITS_PROP, units);
    };
    ScaleLine2.prototype.setDpi = function(dpi) {
      this.dpi_ = dpi;
    };
    ScaleLine2.prototype.updateElement_ = function() {
      var viewState = this.viewState_;
      if (!viewState) {
        if (this.renderedVisible_) {
          this.element.style.display = "none";
          this.renderedVisible_ = false;
        }
        return;
      }
      var center = viewState.center;
      var projection = viewState.projection;
      var units = this.getUnits();
      var pointResolutionUnits = units == Units.DEGREES ? Units_default.DEGREES : Units_default.METERS;
      var pointResolution = getPointResolution(projection, viewState.resolution, center, pointResolutionUnits);
      var minWidth = this.minWidth_ * (this.dpi_ || DEFAULT_DPI) / DEFAULT_DPI;
      var nominalCount = minWidth * pointResolution;
      var suffix = "";
      if (units == Units.DEGREES) {
        var metersPerDegree = METERS_PER_UNIT[Units_default.DEGREES];
        nominalCount *= metersPerDegree;
        if (nominalCount < metersPerDegree / 60) {
          suffix = "″";
          pointResolution *= 3600;
        } else if (nominalCount < metersPerDegree) {
          suffix = "′";
          pointResolution *= 60;
        } else {
          suffix = "°";
        }
      } else if (units == Units.IMPERIAL) {
        if (nominalCount < 0.9144) {
          suffix = "in";
          pointResolution /= 0.0254;
        } else if (nominalCount < 1609.344) {
          suffix = "ft";
          pointResolution /= 0.3048;
        } else {
          suffix = "mi";
          pointResolution /= 1609.344;
        }
      } else if (units == Units.NAUTICAL) {
        pointResolution /= 1852;
        suffix = "nm";
      } else if (units == Units.METRIC) {
        if (nominalCount < 1e-3) {
          suffix = "μm";
          pointResolution *= 1e6;
        } else if (nominalCount < 1) {
          suffix = "mm";
          pointResolution *= 1e3;
        } else if (nominalCount < 1e3) {
          suffix = "m";
        } else {
          suffix = "km";
          pointResolution /= 1e3;
        }
      } else if (units == Units.US) {
        if (nominalCount < 0.9144) {
          suffix = "in";
          pointResolution *= 39.37;
        } else if (nominalCount < 1609.344) {
          suffix = "ft";
          pointResolution /= 0.30480061;
        } else {
          suffix = "mi";
          pointResolution /= 1609.3472;
        }
      } else {
        assert(false, 33);
      }
      var i = 3 * Math.floor(Math.log(minWidth * pointResolution) / Math.log(10));
      var count, width, decimalCount;
      while (true) {
        decimalCount = Math.floor(i / 3);
        var decimal = Math.pow(10, decimalCount);
        count = LEADING_DIGITS[(i % 3 + 3) % 3] * decimal;
        width = Math.round(count / pointResolution);
        if (isNaN(width)) {
          this.element.style.display = "none";
          this.renderedVisible_ = false;
          return;
        } else if (width >= minWidth) {
          break;
        }
        ++i;
      }
      var html;
      if (this.scaleBar_) {
        html = this.createScaleBar(width, count, suffix);
      } else {
        html = count.toFixed(decimalCount < 0 ? -decimalCount : 0) + " " + suffix;
      }
      if (this.renderedHTML_ != html) {
        this.innerElement_.innerHTML = html;
        this.renderedHTML_ = html;
      }
      if (this.renderedWidth_ != width) {
        this.innerElement_.style.width = width + "px";
        this.renderedWidth_ = width;
      }
      if (!this.renderedVisible_) {
        this.element.style.display = "";
        this.renderedVisible_ = true;
      }
    };
    ScaleLine2.prototype.createScaleBar = function(width, scale, suffix) {
      var mapScale = "1 : " + Math.round(this.getScaleForResolution()).toLocaleString();
      var scaleSteps = [];
      var stepWidth = width / this.scaleBarSteps_;
      var backgroundColor = "#ffffff";
      for (var i = 0; i < this.scaleBarSteps_; i++) {
        if (i === 0) {
          scaleSteps.push(this.createMarker("absolute", i));
        }
        scaleSteps.push('<div><div class="ol-scale-singlebar" style="width: ' + stepWidth + "px;background-color: " + backgroundColor + ';"></div>' + this.createMarker("relative", i) + /*render text every second step, except when only 2 steps */
        (i % 2 === 0 || this.scaleBarSteps_ === 2 ? this.createStepText(i, width, false, scale, suffix) : "") + "</div>");
        if (i === this.scaleBarSteps_ - 1) {
          {
          }
          scaleSteps.push(this.createStepText(i + 1, width, true, scale, suffix));
        }
        if (backgroundColor === "#ffffff") {
          backgroundColor = "#000000";
        } else {
          backgroundColor = "#ffffff";
        }
      }
      var scaleBarText;
      if (this.scaleBarText_) {
        scaleBarText = '<div class="ol-scale-text" style="width: ' + width + 'px;">' + mapScale + "</div>";
      } else {
        scaleBarText = "";
      }
      var container = '<div style="display: flex;">' + scaleBarText + scaleSteps.join("") + "</div>";
      return container;
    };
    ScaleLine2.prototype.createMarker = function(position, i) {
      var top = position === "absolute" ? 3 : -10;
      return '<div class="ol-scale-step-marker" style="position: ' + position + ";top: " + top + 'px;"></div>';
    };
    ScaleLine2.prototype.createStepText = function(i, width, isLast, scale, suffix) {
      var length = i === 0 ? 0 : Math.round(scale / this.scaleBarSteps_ * i * 100) / 100;
      var lengthString = length + (i === 0 ? "" : " " + suffix);
      var margin = i === 0 ? -3 : width / this.scaleBarSteps_ * -1;
      var minWidth = i === 0 ? 0 : width / this.scaleBarSteps_ * 2;
      return '<div class="ol-scale-step-text" style="margin-left: ' + margin + "px;text-align: " + (i === 0 ? "left" : "center") + "; min-width: " + minWidth + "px;left: " + (isLast ? width + "px" : "unset") + ';">' + lengthString + "</div>";
    };
    ScaleLine2.prototype.getScaleForResolution = function() {
      var resolution = getPointResolution(this.viewState_.projection, this.viewState_.resolution, this.viewState_.center);
      var dpi = this.dpi_ || DEFAULT_DPI;
      var mpu = this.viewState_.projection.getMetersPerUnit();
      var inchesPerMeter = 1e3 / 25.4;
      return parseFloat(resolution.toString()) * mpu * inchesPerMeter * dpi;
    };
    ScaleLine2.prototype.render = function(mapEvent) {
      var frameState = mapEvent.frameState;
      if (!frameState) {
        this.viewState_ = null;
      } else {
        this.viewState_ = frameState.viewState;
      }
      this.updateElement_();
    };
    return ScaleLine2;
  }(Control_default)
);
var ScaleLine_default = ScaleLine;

// node_modules/ol/control/ZoomSlider.js
var __extends20 = /* @__PURE__ */ function() {
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
var Direction = {
  VERTICAL: 0,
  HORIZONTAL: 1
};
var ZoomSlider = (
  /** @class */
  function(_super) {
    __extends20(ZoomSlider2, _super);
    function ZoomSlider2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      _this = _super.call(this, {
        element: document.createElement("div"),
        render: options.render
      }) || this;
      _this.dragListenerKeys_ = [];
      _this.currentResolution_ = void 0;
      _this.direction_ = Direction.VERTICAL;
      _this.dragging_;
      _this.heightLimit_ = 0;
      _this.widthLimit_ = 0;
      _this.startX_;
      _this.startY_;
      _this.thumbSize_ = null;
      _this.sliderInitialized_ = false;
      _this.duration_ = options.duration !== void 0 ? options.duration : 200;
      var className = options.className !== void 0 ? options.className : "ol-zoomslider";
      var thumbElement = document.createElement("button");
      thumbElement.setAttribute("type", "button");
      thumbElement.className = className + "-thumb " + CLASS_UNSELECTABLE;
      var containerElement = _this.element;
      containerElement.className = className + " " + CLASS_UNSELECTABLE + " " + CLASS_CONTROL;
      containerElement.appendChild(thumbElement);
      containerElement.addEventListener(EventType_default3.POINTERDOWN, _this.handleDraggerStart_.bind(_this), false);
      containerElement.addEventListener(EventType_default3.POINTERMOVE, _this.handleDraggerDrag_.bind(_this), false);
      containerElement.addEventListener(EventType_default3.POINTERUP, _this.handleDraggerEnd_.bind(_this), false);
      containerElement.addEventListener(EventType_default.CLICK, _this.handleContainerClick_.bind(_this), false);
      thumbElement.addEventListener(EventType_default.CLICK, stopPropagation, false);
      return _this;
    }
    ZoomSlider2.prototype.setMap = function(map) {
      _super.prototype.setMap.call(this, map);
      if (map) {
        map.render();
      }
    };
    ZoomSlider2.prototype.initSlider_ = function() {
      var container = this.element;
      var containerWidth = container.offsetWidth;
      var containerHeight = container.offsetHeight;
      if (containerWidth === 0 && containerHeight === 0) {
        return this.sliderInitialized_ = false;
      }
      var thumb = (
        /** @type {HTMLElement} */
        container.firstElementChild
      );
      var computedStyle = getComputedStyle(thumb);
      var thumbWidth = thumb.offsetWidth + parseFloat(computedStyle["marginRight"]) + parseFloat(computedStyle["marginLeft"]);
      var thumbHeight = thumb.offsetHeight + parseFloat(computedStyle["marginTop"]) + parseFloat(computedStyle["marginBottom"]);
      this.thumbSize_ = [thumbWidth, thumbHeight];
      if (containerWidth > containerHeight) {
        this.direction_ = Direction.HORIZONTAL;
        this.widthLimit_ = containerWidth - thumbWidth;
      } else {
        this.direction_ = Direction.VERTICAL;
        this.heightLimit_ = containerHeight - thumbHeight;
      }
      return this.sliderInitialized_ = true;
    };
    ZoomSlider2.prototype.handleContainerClick_ = function(event) {
      var view = this.getMap().getView();
      var relativePosition = this.getRelativePosition_(event.offsetX - this.thumbSize_[0] / 2, event.offsetY - this.thumbSize_[1] / 2);
      var resolution = this.getResolutionForPosition_(relativePosition);
      var zoom = view.getConstrainedZoom(view.getZoomForResolution(resolution));
      view.animateInternal({
        zoom,
        duration: this.duration_,
        easing: easeOut
      });
    };
    ZoomSlider2.prototype.handleDraggerStart_ = function(event) {
      if (!this.dragging_ && event.target === this.element.firstElementChild) {
        var element = (
          /** @type {HTMLElement} */
          this.element.firstElementChild
        );
        this.getMap().getView().beginInteraction();
        this.startX_ = event.clientX - parseFloat(element.style.left);
        this.startY_ = event.clientY - parseFloat(element.style.top);
        this.dragging_ = true;
        if (this.dragListenerKeys_.length === 0) {
          var drag = this.handleDraggerDrag_;
          var end = this.handleDraggerEnd_;
          var doc = this.getMap().getOwnerDocument();
          this.dragListenerKeys_.push(listen(doc, EventType_default3.POINTERMOVE, drag, this), listen(doc, EventType_default3.POINTERUP, end, this));
        }
      }
    };
    ZoomSlider2.prototype.handleDraggerDrag_ = function(event) {
      if (this.dragging_) {
        var deltaX = event.clientX - this.startX_;
        var deltaY = event.clientY - this.startY_;
        var relativePosition = this.getRelativePosition_(deltaX, deltaY);
        this.currentResolution_ = this.getResolutionForPosition_(relativePosition);
        this.getMap().getView().setResolution(this.currentResolution_);
      }
    };
    ZoomSlider2.prototype.handleDraggerEnd_ = function(event) {
      if (this.dragging_) {
        var view = this.getMap().getView();
        view.endInteraction();
        this.dragging_ = false;
        this.startX_ = void 0;
        this.startY_ = void 0;
        this.dragListenerKeys_.forEach(unlistenByKey);
        this.dragListenerKeys_.length = 0;
      }
    };
    ZoomSlider2.prototype.setThumbPosition_ = function(res) {
      var position = this.getPositionForResolution_(res);
      var thumb = (
        /** @type {HTMLElement} */
        this.element.firstElementChild
      );
      if (this.direction_ == Direction.HORIZONTAL) {
        thumb.style.left = this.widthLimit_ * position + "px";
      } else {
        thumb.style.top = this.heightLimit_ * position + "px";
      }
    };
    ZoomSlider2.prototype.getRelativePosition_ = function(x, y) {
      var amount;
      if (this.direction_ === Direction.HORIZONTAL) {
        amount = x / this.widthLimit_;
      } else {
        amount = y / this.heightLimit_;
      }
      return clamp(amount, 0, 1);
    };
    ZoomSlider2.prototype.getResolutionForPosition_ = function(position) {
      var fn = this.getMap().getView().getResolutionForValueFunction();
      return fn(1 - position);
    };
    ZoomSlider2.prototype.getPositionForResolution_ = function(res) {
      var fn = this.getMap().getView().getValueForResolutionFunction();
      return clamp(1 - fn(res), 0, 1);
    };
    ZoomSlider2.prototype.render = function(mapEvent) {
      if (!mapEvent.frameState) {
        return;
      }
      if (!this.sliderInitialized_ && !this.initSlider_()) {
        return;
      }
      var res = mapEvent.frameState.viewState.resolution;
      this.currentResolution_ = res;
      this.setThumbPosition_(res);
    };
    return ZoomSlider2;
  }(Control_default)
);
var ZoomSlider_default = ZoomSlider;

// node_modules/ol/control/ZoomToExtent.js
var __extends21 = /* @__PURE__ */ function() {
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
var ZoomToExtent = (
  /** @class */
  function(_super) {
    __extends21(ZoomToExtent2, _super);
    function ZoomToExtent2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      _this = _super.call(this, {
        element: document.createElement("div"),
        target: options.target
      }) || this;
      _this.extent = options.extent ? options.extent : null;
      var className = options.className !== void 0 ? options.className : "ol-zoom-extent";
      var label = options.label !== void 0 ? options.label : "E";
      var tipLabel = options.tipLabel !== void 0 ? options.tipLabel : "Fit to extent";
      var button = document.createElement("button");
      button.setAttribute("type", "button");
      button.title = tipLabel;
      button.appendChild(typeof label === "string" ? document.createTextNode(label) : label);
      button.addEventListener(EventType_default.CLICK, _this.handleClick_.bind(_this), false);
      var cssClasses = className + " " + CLASS_UNSELECTABLE + " " + CLASS_CONTROL;
      var element = _this.element;
      element.className = cssClasses;
      element.appendChild(button);
      return _this;
    }
    ZoomToExtent2.prototype.handleClick_ = function(event) {
      event.preventDefault();
      this.handleZoomToExtent();
    };
    ZoomToExtent2.prototype.handleZoomToExtent = function() {
      var map = this.getMap();
      var view = map.getView();
      var extent = !this.extent ? view.getProjection().getExtent() : this.extent;
      view.fitInternal(fromExtent(extent));
    };
    return ZoomToExtent2;
  }(Control_default)
);
var ZoomToExtent_default = ZoomToExtent;

// node_modules/ol/control.js
function defaults(opt_options) {
  var options = opt_options ? opt_options : {};
  var controls = new Collection_default();
  var zoomControl = options.zoom !== void 0 ? options.zoom : true;
  if (zoomControl) {
    controls.push(new Zoom_default(options.zoomOptions));
  }
  var rotateControl = options.rotate !== void 0 ? options.rotate : true;
  if (rotateControl) {
    controls.push(new Rotate_default(options.rotateOptions));
  }
  var attributionControl = options.attribution !== void 0 ? options.attribution : true;
  if (attributionControl) {
    controls.push(new Attribution_default(options.attributionOptions));
  }
  return controls;
}

export {
  Composite_default,
  MapEvent_default,
  MapBrowserEvent_default,
  MapBrowserEventType_default,
  MapBrowserEventHandler_default,
  TileQueue_default,
  disable,
  maxSquaredDelta,
  arrayMaxSquaredDelta,
  multiArrayMaxSquaredDelta,
  assignClosestPoint,
  assignClosestArrayPoint,
  assignClosestMultiArrayPoint,
  linearRingss,
  linearRingssContainsXY,
  getInteriorPointsOfMultiArray,
  forEach,
  intersectsLineString,
  intersectsLineStringArray,
  intersectsLinearRingMultiArray,
  linearRingssAreOriented,
  orientLinearRingsArray,
  Polygon_default,
  circular,
  fromExtent,
  fromCircle,
  View_default,
  PluggableMap_default,
  Control_default,
  Attribution_default,
  Rotate_default,
  Zoom_default,
  FullScreen_default,
  MousePosition_default,
  OverviewMap_default,
  ScaleLine_default,
  ZoomSlider_default,
  ZoomToExtent_default,
  defaults
};
//# sourceMappingURL=chunk-H66NXA67.js.map
