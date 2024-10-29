import {
  OverlayPositioning_default
} from "./chunk-ENFFV6PJ.js";
import {
  CLASS_SELECTABLE
} from "./chunk-5TINQ75E.js";
import {
  outerHeight,
  outerWidth,
  removeChildren,
  removeNode
} from "./chunk-NUKIIKKO.js";
import {
  Object_default,
  getChangeEventType,
  listen,
  unlistenByKey
} from "./chunk-5ORQIOU2.js";
import {
  containsExtent
} from "./chunk-MN23FWKY.js";

// node_modules/ol/MapEventType.js
var MapEventType_default = {
  /**
   * Triggered after a map frame is rendered.
   * @event module:ol/MapEvent~MapEvent#postrender
   * @api
   */
  POSTRENDER: "postrender",
  /**
   * Triggered when the map starts moving.
   * @event module:ol/MapEvent~MapEvent#movestart
   * @api
   */
  MOVESTART: "movestart",
  /**
   * Triggered after the map is moved.
   * @event module:ol/MapEvent~MapEvent#moveend
   * @api
   */
  MOVEEND: "moveend"
};

// node_modules/ol/Overlay.js
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
  ELEMENT: "element",
  MAP: "map",
  OFFSET: "offset",
  POSITION: "position",
  POSITIONING: "positioning"
};
var Overlay = (
  /** @class */
  function(_super) {
    __extends(Overlay2, _super);
    function Overlay2(options) {
      var _this = _super.call(this) || this;
      _this.options = options;
      _this.id = options.id;
      _this.insertFirst = options.insertFirst !== void 0 ? options.insertFirst : true;
      _this.stopEvent = options.stopEvent !== void 0 ? options.stopEvent : true;
      _this.element = document.createElement("div");
      _this.element.className = options.className !== void 0 ? options.className : "ol-overlay-container " + CLASS_SELECTABLE;
      _this.element.style.position = "absolute";
      _this.element.style.pointerEvents = "auto";
      var autoPan = options.autoPan;
      if (autoPan && "object" !== typeof autoPan) {
        autoPan = {
          animation: options.autoPanAnimation,
          margin: options.autoPanMargin
        };
      }
      _this.autoPan = /** @type {PanIntoViewOptions} */
      autoPan || false;
      _this.rendered = {
        transform_: "",
        visible: true
      };
      _this.mapPostrenderListenerKey = null;
      _this.addEventListener(getChangeEventType(Property.ELEMENT), _this.handleElementChanged);
      _this.addEventListener(getChangeEventType(Property.MAP), _this.handleMapChanged);
      _this.addEventListener(getChangeEventType(Property.OFFSET), _this.handleOffsetChanged);
      _this.addEventListener(getChangeEventType(Property.POSITION), _this.handlePositionChanged);
      _this.addEventListener(getChangeEventType(Property.POSITIONING), _this.handlePositioningChanged);
      if (options.element !== void 0) {
        _this.setElement(options.element);
      }
      _this.setOffset(options.offset !== void 0 ? options.offset : [0, 0]);
      _this.setPositioning(options.positioning !== void 0 ? (
        /** @type {import("./OverlayPositioning.js").default} */
        options.positioning
      ) : OverlayPositioning_default.TOP_LEFT);
      if (options.position !== void 0) {
        _this.setPosition(options.position);
      }
      return _this;
    }
    Overlay2.prototype.getElement = function() {
      return (
        /** @type {HTMLElement|undefined} */
        this.get(Property.ELEMENT)
      );
    };
    Overlay2.prototype.getId = function() {
      return this.id;
    };
    Overlay2.prototype.getMap = function() {
      return (
        /** @type {import("./PluggableMap.js").default|undefined} */
        this.get(Property.MAP)
      );
    };
    Overlay2.prototype.getOffset = function() {
      return (
        /** @type {Array<number>} */
        this.get(Property.OFFSET)
      );
    };
    Overlay2.prototype.getPosition = function() {
      return (
        /** @type {import("./coordinate.js").Coordinate|undefined} */
        this.get(Property.POSITION)
      );
    };
    Overlay2.prototype.getPositioning = function() {
      return (
        /** @type {import("./OverlayPositioning.js").default} */
        this.get(Property.POSITIONING)
      );
    };
    Overlay2.prototype.handleElementChanged = function() {
      removeChildren(this.element);
      var element = this.getElement();
      if (element) {
        this.element.appendChild(element);
      }
    };
    Overlay2.prototype.handleMapChanged = function() {
      if (this.mapPostrenderListenerKey) {
        removeNode(this.element);
        unlistenByKey(this.mapPostrenderListenerKey);
        this.mapPostrenderListenerKey = null;
      }
      var map = this.getMap();
      if (map) {
        this.mapPostrenderListenerKey = listen(map, MapEventType_default.POSTRENDER, this.render, this);
        this.updatePixelPosition();
        var container = this.stopEvent ? map.getOverlayContainerStopEvent() : map.getOverlayContainer();
        if (this.insertFirst) {
          container.insertBefore(this.element, container.childNodes[0] || null);
        } else {
          container.appendChild(this.element);
        }
        this.performAutoPan();
      }
    };
    Overlay2.prototype.render = function() {
      this.updatePixelPosition();
    };
    Overlay2.prototype.handleOffsetChanged = function() {
      this.updatePixelPosition();
    };
    Overlay2.prototype.handlePositionChanged = function() {
      this.updatePixelPosition();
      this.performAutoPan();
    };
    Overlay2.prototype.handlePositioningChanged = function() {
      this.updatePixelPosition();
    };
    Overlay2.prototype.setElement = function(element) {
      this.set(Property.ELEMENT, element);
    };
    Overlay2.prototype.setMap = function(map) {
      this.set(Property.MAP, map);
    };
    Overlay2.prototype.setOffset = function(offset) {
      this.set(Property.OFFSET, offset);
    };
    Overlay2.prototype.setPosition = function(position) {
      this.set(Property.POSITION, position);
    };
    Overlay2.prototype.performAutoPan = function() {
      if (this.autoPan) {
        this.panIntoView(this.autoPan);
      }
    };
    Overlay2.prototype.panIntoView = function(opt_panIntoViewOptions) {
      var map = this.getMap();
      if (!map || !map.getTargetElement() || !this.get(Property.POSITION)) {
        return;
      }
      var mapRect = this.getRect(map.getTargetElement(), map.getSize());
      var element = this.getElement();
      var overlayRect = this.getRect(element, [outerWidth(element), outerHeight(element)]);
      var panIntoViewOptions = opt_panIntoViewOptions || {};
      var myMargin = panIntoViewOptions.margin === void 0 ? 20 : panIntoViewOptions.margin;
      if (!containsExtent(mapRect, overlayRect)) {
        var offsetLeft = overlayRect[0] - mapRect[0];
        var offsetRight = mapRect[2] - overlayRect[2];
        var offsetTop = overlayRect[1] - mapRect[1];
        var offsetBottom = mapRect[3] - overlayRect[3];
        var delta = [0, 0];
        if (offsetLeft < 0) {
          delta[0] = offsetLeft - myMargin;
        } else if (offsetRight < 0) {
          delta[0] = Math.abs(offsetRight) + myMargin;
        }
        if (offsetTop < 0) {
          delta[1] = offsetTop - myMargin;
        } else if (offsetBottom < 0) {
          delta[1] = Math.abs(offsetBottom) + myMargin;
        }
        if (delta[0] !== 0 || delta[1] !== 0) {
          var center = (
            /** @type {import("./coordinate.js").Coordinate} */
            map.getView().getCenterInternal()
          );
          var centerPx = map.getPixelFromCoordinateInternal(center);
          if (!centerPx) {
            return;
          }
          var newCenterPx = [centerPx[0] + delta[0], centerPx[1] + delta[1]];
          var panOptions = panIntoViewOptions.animation || {};
          map.getView().animateInternal({
            center: map.getCoordinateFromPixelInternal(newCenterPx),
            duration: panOptions.duration,
            easing: panOptions.easing
          });
        }
      }
    };
    Overlay2.prototype.getRect = function(element, size) {
      var box = element.getBoundingClientRect();
      var offsetX = box.left + window.pageXOffset;
      var offsetY = box.top + window.pageYOffset;
      return [offsetX, offsetY, offsetX + size[0], offsetY + size[1]];
    };
    Overlay2.prototype.setPositioning = function(positioning) {
      this.set(Property.POSITIONING, positioning);
    };
    Overlay2.prototype.setVisible = function(visible) {
      if (this.rendered.visible !== visible) {
        this.element.style.display = visible ? "" : "none";
        this.rendered.visible = visible;
      }
    };
    Overlay2.prototype.updatePixelPosition = function() {
      var map = this.getMap();
      var position = this.getPosition();
      if (!map || !map.isRendered() || !position) {
        this.setVisible(false);
        return;
      }
      var pixel = map.getPixelFromCoordinate(position);
      var mapSize = map.getSize();
      this.updateRenderedPosition(pixel, mapSize);
    };
    Overlay2.prototype.updateRenderedPosition = function(pixel, mapSize) {
      var style = this.element.style;
      var offset = this.getOffset();
      var positioning = this.getPositioning();
      this.setVisible(true);
      var x = Math.round(pixel[0] + offset[0]) + "px";
      var y = Math.round(pixel[1] + offset[1]) + "px";
      var posX = "0%";
      var posY = "0%";
      if (positioning == OverlayPositioning_default.BOTTOM_RIGHT || positioning == OverlayPositioning_default.CENTER_RIGHT || positioning == OverlayPositioning_default.TOP_RIGHT) {
        posX = "-100%";
      } else if (positioning == OverlayPositioning_default.BOTTOM_CENTER || positioning == OverlayPositioning_default.CENTER_CENTER || positioning == OverlayPositioning_default.TOP_CENTER) {
        posX = "-50%";
      }
      if (positioning == OverlayPositioning_default.BOTTOM_LEFT || positioning == OverlayPositioning_default.BOTTOM_CENTER || positioning == OverlayPositioning_default.BOTTOM_RIGHT) {
        posY = "-100%";
      } else if (positioning == OverlayPositioning_default.CENTER_LEFT || positioning == OverlayPositioning_default.CENTER_CENTER || positioning == OverlayPositioning_default.CENTER_RIGHT) {
        posY = "-50%";
      }
      var transform = "translate(" + posX + ", " + posY + ") translate(" + x + ", " + y + ")";
      if (this.rendered.transform_ != transform) {
        this.rendered.transform_ = transform;
        style.transform = transform;
        style.msTransform = transform;
      }
    };
    Overlay2.prototype.getOptions = function() {
      return this.options;
    };
    return Overlay2;
  }(Object_default)
);
var Overlay_default = Overlay;

export {
  MapEventType_default,
  Overlay_default
};
//# sourceMappingURL=chunk-EOS2HULN.js.map
