import {
  FormatType_default,
  RBush_default,
  VectorEventType_default,
  Vector_default as Vector_default2
} from "./chunk-IEGF2JUD.js";
import {
  Composite_default,
  MapBrowserEventType_default,
  MapBrowserEvent_default,
  PluggableMap_default,
  Polygon_default,
  arrayMaxSquaredDelta,
  assignClosestArrayPoint,
  assignClosestMultiArrayPoint,
  assignClosestPoint,
  defaults,
  disable,
  forEach,
  fromCircle,
  fromExtent,
  getInteriorPointsOfMultiArray,
  intersectsLineString,
  intersectsLineStringArray,
  intersectsLinearRingMultiArray,
  linearRingss,
  linearRingssAreOriented,
  linearRingssContainsXY,
  maxSquaredDelta,
  multiArrayMaxSquaredDelta,
  orientLinearRingsArray
} from "./chunk-H66NXA67.js";
import {
  CollectionEventType_default,
  Collection_default
} from "./chunk-IPFZOMEQ.js";
import {
  easeOut,
  linear
} from "./chunk-EQJ7DEGW.js";
import {
  Point_default,
  deflateCoordinate,
  deflateCoordinates,
  deflateCoordinatesArray,
  deflateMultiCoordinatesArray
} from "./chunk-ZAMJISOG.js";
import {
  Vector_default,
  lineStringLength
} from "./chunk-UNLO6I66.js";
import {
  createEditingStyle
} from "./chunk-MMBLHBTF.js";
import {
  douglasPeucker,
  douglasPeuckerArray,
  inflateCoordinates,
  inflateCoordinatesArray,
  inflateMultiCoordinatesArray,
  quantizeMultiArray
} from "./chunk-CSFTPNSM.js";
import {
  DEVICE_PIXEL_RATIO,
  FIREFOX,
  MAC,
  WEBKIT
} from "./chunk-NUKIIKKO.js";
import {
  GeometryLayout_default,
  SimpleGeometry_default,
  rotate as rotate2,
  translate
} from "./chunk-DEWJO73N.js";
import {
  closestOnCircle,
  closestOnSegment,
  distance,
  equals as equals2,
  fromUserCoordinate,
  fromUserExtent,
  get,
  getUserProjection,
  rotate,
  scale,
  squaredDistance as squaredDistance2,
  squaredDistanceToSegment,
  toUserCoordinate,
  toUserExtent
} from "./chunk-7ZC75XQY.js";
import {
  GeometryType_default,
  clamp,
  lerp,
  squaredDistance
} from "./chunk-5JPMEZLO.js";
import {
  Disposable_default,
  EventType_default,
  Event_default,
  FALSE,
  Object_default,
  TRUE,
  binarySearch,
  equals,
  extend,
  getChangeEventType,
  includes,
  listen,
  unlistenByKey
} from "./chunk-5ORQIOU2.js";
import {
  assert,
  assign,
  boundingExtent,
  buffer,
  clear,
  closestSquaredDistanceXY,
  containsXY,
  createEmpty,
  createOrUpdate,
  createOrUpdateFromCoordinate,
  createOrUpdateFromCoordinates,
  createOrUpdateFromFlatCoordinates,
  forEachCorner,
  getArea,
  getBottomLeft,
  getCenter,
  getTopRight,
  getUid,
  getValues,
  intersects,
  scaleFromCenter
} from "./chunk-MN23FWKY.js";

// node_modules/ol/interaction/Property.js
var Property_default = {
  ACTIVE: "active"
};

// node_modules/ol/interaction/Interaction.js
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
var Interaction = (
  /** @class */
  function(_super) {
    __extends(Interaction2, _super);
    function Interaction2(opt_options) {
      var _this = _super.call(this) || this;
      if (opt_options && opt_options.handleEvent) {
        _this.handleEvent = opt_options.handleEvent;
      }
      _this.map_ = null;
      _this.setActive(true);
      return _this;
    }
    Interaction2.prototype.getActive = function() {
      return (
        /** @type {boolean} */
        this.get(Property_default.ACTIVE)
      );
    };
    Interaction2.prototype.getMap = function() {
      return this.map_;
    };
    Interaction2.prototype.handleEvent = function(mapBrowserEvent) {
      return true;
    };
    Interaction2.prototype.setActive = function(active) {
      this.set(Property_default.ACTIVE, active);
    };
    Interaction2.prototype.setMap = function(map) {
      this.map_ = map;
    };
    return Interaction2;
  }(Object_default)
);
function pan(view, delta, opt_duration) {
  var currentCenter = view.getCenterInternal();
  if (currentCenter) {
    var center = [currentCenter[0] + delta[0], currentCenter[1] + delta[1]];
    view.animateInternal({
      duration: opt_duration !== void 0 ? opt_duration : 250,
      easing: linear,
      center: view.getConstrainedCenter(center)
    });
  }
}
function zoomByDelta(view, delta, opt_anchor, opt_duration) {
  var currentZoom = view.getZoom();
  if (currentZoom === void 0) {
    return;
  }
  var newZoom = view.getConstrainedZoom(currentZoom + delta);
  var newResolution = view.getResolutionForZoom(newZoom);
  if (view.getAnimating()) {
    view.cancelAnimations();
  }
  view.animate({
    resolution: newResolution,
    anchor: opt_anchor,
    duration: opt_duration !== void 0 ? opt_duration : 250,
    easing: easeOut
  });
}
var Interaction_default = Interaction;

// node_modules/ol/interaction/DoubleClickZoom.js
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
var DoubleClickZoom = (
  /** @class */
  function(_super) {
    __extends2(DoubleClickZoom2, _super);
    function DoubleClickZoom2(opt_options) {
      var _this = _super.call(this) || this;
      var options = opt_options ? opt_options : {};
      _this.delta_ = options.delta ? options.delta : 1;
      _this.duration_ = options.duration !== void 0 ? options.duration : 250;
      return _this;
    }
    DoubleClickZoom2.prototype.handleEvent = function(mapBrowserEvent) {
      var stopEvent = false;
      if (mapBrowserEvent.type == MapBrowserEventType_default.DBLCLICK) {
        var browserEvent = (
          /** @type {MouseEvent} */
          mapBrowserEvent.originalEvent
        );
        var map = mapBrowserEvent.map;
        var anchor = mapBrowserEvent.coordinate;
        var delta = browserEvent.shiftKey ? -this.delta_ : this.delta_;
        var view = map.getView();
        zoomByDelta(view, delta, anchor, this.duration_);
        browserEvent.preventDefault();
        stopEvent = true;
      }
      return !stopEvent;
    };
    return DoubleClickZoom2;
  }(Interaction_default)
);
var DoubleClickZoom_default = DoubleClickZoom;

// node_modules/ol/interaction/Pointer.js
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
var PointerInteraction = (
  /** @class */
  function(_super) {
    __extends3(PointerInteraction2, _super);
    function PointerInteraction2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      _this = _super.call(
        this,
        /** @type {import("./Interaction.js").InteractionOptions} */
        options
      ) || this;
      if (options.handleDownEvent) {
        _this.handleDownEvent = options.handleDownEvent;
      }
      if (options.handleDragEvent) {
        _this.handleDragEvent = options.handleDragEvent;
      }
      if (options.handleMoveEvent) {
        _this.handleMoveEvent = options.handleMoveEvent;
      }
      if (options.handleUpEvent) {
        _this.handleUpEvent = options.handleUpEvent;
      }
      if (options.stopDown) {
        _this.stopDown = options.stopDown;
      }
      _this.handlingDownUpSequence = false;
      _this.trackedPointers_ = {};
      _this.targetPointers = [];
      return _this;
    }
    PointerInteraction2.prototype.getPointerCount = function() {
      return this.targetPointers.length;
    };
    PointerInteraction2.prototype.handleDownEvent = function(mapBrowserEvent) {
      return false;
    };
    PointerInteraction2.prototype.handleDragEvent = function(mapBrowserEvent) {
    };
    PointerInteraction2.prototype.handleEvent = function(mapBrowserEvent) {
      if (!mapBrowserEvent.originalEvent) {
        return true;
      }
      var stopEvent = false;
      this.updateTrackedPointers_(mapBrowserEvent);
      if (this.handlingDownUpSequence) {
        if (mapBrowserEvent.type == MapBrowserEventType_default.POINTERDRAG) {
          this.handleDragEvent(mapBrowserEvent);
          mapBrowserEvent.originalEvent.preventDefault();
        } else if (mapBrowserEvent.type == MapBrowserEventType_default.POINTERUP) {
          var handledUp = this.handleUpEvent(mapBrowserEvent);
          this.handlingDownUpSequence = handledUp && this.targetPointers.length > 0;
        }
      } else {
        if (mapBrowserEvent.type == MapBrowserEventType_default.POINTERDOWN) {
          var handled = this.handleDownEvent(mapBrowserEvent);
          this.handlingDownUpSequence = handled;
          stopEvent = this.stopDown(handled);
        } else if (mapBrowserEvent.type == MapBrowserEventType_default.POINTERMOVE) {
          this.handleMoveEvent(mapBrowserEvent);
        }
      }
      return !stopEvent;
    };
    PointerInteraction2.prototype.handleMoveEvent = function(mapBrowserEvent) {
    };
    PointerInteraction2.prototype.handleUpEvent = function(mapBrowserEvent) {
      return false;
    };
    PointerInteraction2.prototype.stopDown = function(handled) {
      return handled;
    };
    PointerInteraction2.prototype.updateTrackedPointers_ = function(mapBrowserEvent) {
      if (isPointerDraggingEvent(mapBrowserEvent)) {
        var event_1 = mapBrowserEvent.originalEvent;
        var id = event_1.pointerId.toString();
        if (mapBrowserEvent.type == MapBrowserEventType_default.POINTERUP) {
          delete this.trackedPointers_[id];
        } else if (mapBrowserEvent.type == MapBrowserEventType_default.POINTERDOWN) {
          this.trackedPointers_[id] = event_1;
        } else if (id in this.trackedPointers_) {
          this.trackedPointers_[id] = event_1;
        }
        this.targetPointers = getValues(this.trackedPointers_);
      }
    };
    return PointerInteraction2;
  }(Interaction_default)
);
function centroid(pointerEvents) {
  var length = pointerEvents.length;
  var clientX = 0;
  var clientY = 0;
  for (var i = 0; i < length; i++) {
    clientX += pointerEvents[i].clientX;
    clientY += pointerEvents[i].clientY;
  }
  return [clientX / length, clientY / length];
}
function isPointerDraggingEvent(mapBrowserEvent) {
  var type = mapBrowserEvent.type;
  return type === MapBrowserEventType_default.POINTERDOWN || type === MapBrowserEventType_default.POINTERDRAG || type === MapBrowserEventType_default.POINTERUP;
}
var Pointer_default = PointerInteraction;

// node_modules/ol/events/condition.js
function all(var_args) {
  var conditions = arguments;
  return function(event) {
    var pass = true;
    for (var i = 0, ii = conditions.length; i < ii; ++i) {
      pass = pass && conditions[i](event);
      if (!pass) {
        break;
      }
    }
    return pass;
  };
}
var altKeyOnly = function(mapBrowserEvent) {
  var originalEvent = (
    /** @type {KeyboardEvent|MouseEvent|TouchEvent} */
    mapBrowserEvent.originalEvent
  );
  return originalEvent.altKey && !(originalEvent.metaKey || originalEvent.ctrlKey) && !originalEvent.shiftKey;
};
var altShiftKeysOnly = function(mapBrowserEvent) {
  var originalEvent = (
    /** @type {KeyboardEvent|MouseEvent|TouchEvent} */
    mapBrowserEvent.originalEvent
  );
  return originalEvent.altKey && !(originalEvent.metaKey || originalEvent.ctrlKey) && originalEvent.shiftKey;
};
var focus = function(event) {
  return event.target.getTargetElement().contains(document.activeElement);
};
var focusWithTabindex = function(event) {
  return event.map.getTargetElement().hasAttribute("tabindex") ? focus(event) : true;
};
var always = TRUE;
var mouseActionButton = function(mapBrowserEvent) {
  var originalEvent = (
    /** @type {MouseEvent} */
    mapBrowserEvent.originalEvent
  );
  return originalEvent.button == 0 && !(WEBKIT && MAC && originalEvent.ctrlKey);
};
var never = FALSE;
var singleClick = function(mapBrowserEvent) {
  return mapBrowserEvent.type == MapBrowserEventType_default.SINGLECLICK;
};
var noModifierKeys = function(mapBrowserEvent) {
  var originalEvent = (
    /** @type {KeyboardEvent|MouseEvent|TouchEvent} */
    mapBrowserEvent.originalEvent
  );
  return !originalEvent.altKey && !(originalEvent.metaKey || originalEvent.ctrlKey) && !originalEvent.shiftKey;
};
var shiftKeyOnly = function(mapBrowserEvent) {
  var originalEvent = (
    /** @type {KeyboardEvent|MouseEvent|TouchEvent} */
    mapBrowserEvent.originalEvent
  );
  return !originalEvent.altKey && !(originalEvent.metaKey || originalEvent.ctrlKey) && originalEvent.shiftKey;
};
var targetNotEditable = function(mapBrowserEvent) {
  var originalEvent = (
    /** @type {KeyboardEvent|MouseEvent|TouchEvent} */
    mapBrowserEvent.originalEvent
  );
  var tagName = (
    /** @type {Element} */
    originalEvent.target.tagName
  );
  return tagName !== "INPUT" && tagName !== "SELECT" && tagName !== "TEXTAREA";
};
var mouseOnly = function(mapBrowserEvent) {
  var pointerEvent = (
    /** @type {import("../MapBrowserEvent").default} */
    mapBrowserEvent.originalEvent
  );
  assert(pointerEvent !== void 0, 56);
  return pointerEvent.pointerType == "mouse";
};
var primaryAction = function(mapBrowserEvent) {
  var pointerEvent = (
    /** @type {import("../MapBrowserEvent").default} */
    mapBrowserEvent.originalEvent
  );
  assert(pointerEvent !== void 0, 56);
  return pointerEvent.isPrimary && pointerEvent.button === 0;
};

// node_modules/ol/interaction/DragPan.js
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
var DragPan = (
  /** @class */
  function(_super) {
    __extends4(DragPan2, _super);
    function DragPan2(opt_options) {
      var _this = _super.call(this, {
        stopDown: FALSE
      }) || this;
      var options = opt_options ? opt_options : {};
      _this.kinetic_ = options.kinetic;
      _this.lastCentroid = null;
      _this.lastPointersCount_;
      _this.panning_ = false;
      var condition = options.condition ? options.condition : all(noModifierKeys, primaryAction);
      _this.condition_ = options.onFocusOnly ? all(focusWithTabindex, condition) : condition;
      _this.noKinetic_ = false;
      return _this;
    }
    DragPan2.prototype.handleDragEvent = function(mapBrowserEvent) {
      if (!this.panning_) {
        this.panning_ = true;
        this.getMap().getView().beginInteraction();
      }
      var targetPointers = this.targetPointers;
      var centroid2 = centroid(targetPointers);
      if (targetPointers.length == this.lastPointersCount_) {
        if (this.kinetic_) {
          this.kinetic_.update(centroid2[0], centroid2[1]);
        }
        if (this.lastCentroid) {
          var delta = [this.lastCentroid[0] - centroid2[0], centroid2[1] - this.lastCentroid[1]];
          var map = mapBrowserEvent.map;
          var view = map.getView();
          scale(delta, view.getResolution());
          rotate(delta, view.getRotation());
          view.adjustCenterInternal(delta);
        }
      } else if (this.kinetic_) {
        this.kinetic_.begin();
      }
      this.lastCentroid = centroid2;
      this.lastPointersCount_ = targetPointers.length;
      mapBrowserEvent.originalEvent.preventDefault();
    };
    DragPan2.prototype.handleUpEvent = function(mapBrowserEvent) {
      var map = mapBrowserEvent.map;
      var view = map.getView();
      if (this.targetPointers.length === 0) {
        if (!this.noKinetic_ && this.kinetic_ && this.kinetic_.end()) {
          var distance2 = this.kinetic_.getDistance();
          var angle = this.kinetic_.getAngle();
          var center = view.getCenterInternal();
          var centerpx = map.getPixelFromCoordinateInternal(center);
          var dest = map.getCoordinateFromPixelInternal([centerpx[0] - distance2 * Math.cos(angle), centerpx[1] - distance2 * Math.sin(angle)]);
          view.animateInternal({
            center: view.getConstrainedCenter(dest),
            duration: 500,
            easing: easeOut
          });
        }
        if (this.panning_) {
          this.panning_ = false;
          view.endInteraction();
        }
        return false;
      } else {
        if (this.kinetic_) {
          this.kinetic_.begin();
        }
        this.lastCentroid = null;
        return true;
      }
    };
    DragPan2.prototype.handleDownEvent = function(mapBrowserEvent) {
      if (this.targetPointers.length > 0 && this.condition_(mapBrowserEvent)) {
        var map = mapBrowserEvent.map;
        var view = map.getView();
        this.lastCentroid = null;
        if (view.getAnimating()) {
          view.cancelAnimations();
        }
        if (this.kinetic_) {
          this.kinetic_.begin();
        }
        this.noKinetic_ = this.targetPointers.length > 1;
        return true;
      } else {
        return false;
      }
    };
    return DragPan2;
  }(Pointer_default)
);
var DragPan_default = DragPan;

// node_modules/ol/interaction/DragRotate.js
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
var DragRotate = (
  /** @class */
  function(_super) {
    __extends5(DragRotate2, _super);
    function DragRotate2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      _this = _super.call(this, {
        stopDown: FALSE
      }) || this;
      _this.condition_ = options.condition ? options.condition : altShiftKeysOnly;
      _this.lastAngle_ = void 0;
      _this.duration_ = options.duration !== void 0 ? options.duration : 250;
      return _this;
    }
    DragRotate2.prototype.handleDragEvent = function(mapBrowserEvent) {
      if (!mouseOnly(mapBrowserEvent)) {
        return;
      }
      var map = mapBrowserEvent.map;
      var view = map.getView();
      if (view.getConstraints().rotation === disable) {
        return;
      }
      var size = map.getSize();
      var offset = mapBrowserEvent.pixel;
      var theta = Math.atan2(size[1] / 2 - offset[1], offset[0] - size[0] / 2);
      if (this.lastAngle_ !== void 0) {
        var delta = theta - this.lastAngle_;
        view.adjustRotationInternal(-delta);
      }
      this.lastAngle_ = theta;
    };
    DragRotate2.prototype.handleUpEvent = function(mapBrowserEvent) {
      if (!mouseOnly(mapBrowserEvent)) {
        return true;
      }
      var map = mapBrowserEvent.map;
      var view = map.getView();
      view.endInteraction(this.duration_);
      return false;
    };
    DragRotate2.prototype.handleDownEvent = function(mapBrowserEvent) {
      if (!mouseOnly(mapBrowserEvent)) {
        return false;
      }
      if (mouseActionButton(mapBrowserEvent) && this.condition_(mapBrowserEvent)) {
        var map = mapBrowserEvent.map;
        map.getView().beginInteraction();
        this.lastAngle_ = void 0;
        return true;
      } else {
        return false;
      }
    };
    return DragRotate2;
  }(Pointer_default)
);
var DragRotate_default = DragRotate;

// node_modules/ol/render/Box.js
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
var RenderBox = (
  /** @class */
  function(_super) {
    __extends6(RenderBox2, _super);
    function RenderBox2(className) {
      var _this = _super.call(this) || this;
      _this.geometry_ = null;
      _this.element_ = document.createElement("div");
      _this.element_.style.position = "absolute";
      _this.element_.style.pointerEvents = "auto";
      _this.element_.className = "ol-box " + className;
      _this.map_ = null;
      _this.startPixel_ = null;
      _this.endPixel_ = null;
      return _this;
    }
    RenderBox2.prototype.disposeInternal = function() {
      this.setMap(null);
    };
    RenderBox2.prototype.render_ = function() {
      var startPixel = this.startPixel_;
      var endPixel = this.endPixel_;
      var px = "px";
      var style = this.element_.style;
      style.left = Math.min(startPixel[0], endPixel[0]) + px;
      style.top = Math.min(startPixel[1], endPixel[1]) + px;
      style.width = Math.abs(endPixel[0] - startPixel[0]) + px;
      style.height = Math.abs(endPixel[1] - startPixel[1]) + px;
    };
    RenderBox2.prototype.setMap = function(map) {
      if (this.map_) {
        this.map_.getOverlayContainer().removeChild(this.element_);
        var style = this.element_.style;
        style.left = "inherit";
        style.top = "inherit";
        style.width = "inherit";
        style.height = "inherit";
      }
      this.map_ = map;
      if (this.map_) {
        this.map_.getOverlayContainer().appendChild(this.element_);
      }
    };
    RenderBox2.prototype.setPixels = function(startPixel, endPixel) {
      this.startPixel_ = startPixel;
      this.endPixel_ = endPixel;
      this.createOrUpdateGeometry();
      this.render_();
    };
    RenderBox2.prototype.createOrUpdateGeometry = function() {
      var startPixel = this.startPixel_;
      var endPixel = this.endPixel_;
      var pixels = [startPixel, [startPixel[0], endPixel[1]], endPixel, [endPixel[0], startPixel[1]]];
      var coordinates = pixels.map(this.map_.getCoordinateFromPixelInternal, this.map_);
      coordinates[4] = coordinates[0].slice();
      if (!this.geometry_) {
        this.geometry_ = new Polygon_default([coordinates]);
      } else {
        this.geometry_.setCoordinates([coordinates]);
      }
    };
    RenderBox2.prototype.getGeometry = function() {
      return this.geometry_;
    };
    return RenderBox2;
  }(Disposable_default)
);
var Box_default = RenderBox;

// node_modules/ol/interaction/DragBox.js
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
var DragBoxEventType = {
  /**
   * Triggered upon drag box start.
   * @event DragBoxEvent#boxstart
   * @api
   */
  BOXSTART: "boxstart",
  /**
   * Triggered on drag when box is active.
   * @event DragBoxEvent#boxdrag
   * @api
   */
  BOXDRAG: "boxdrag",
  /**
   * Triggered upon drag box end.
   * @event DragBoxEvent#boxend
   * @api
   */
  BOXEND: "boxend",
  /**
   * Triggered upon drag box canceled.
   * @event DragBoxEvent#boxcancel
   * @api
   */
  BOXCANCEL: "boxcancel"
};
var DragBoxEvent = (
  /** @class */
  function(_super) {
    __extends7(DragBoxEvent2, _super);
    function DragBoxEvent2(type, coordinate, mapBrowserEvent) {
      var _this = _super.call(this, type) || this;
      _this.coordinate = coordinate;
      _this.mapBrowserEvent = mapBrowserEvent;
      return _this;
    }
    return DragBoxEvent2;
  }(Event_default)
);
var DragBox = (
  /** @class */
  function(_super) {
    __extends7(DragBox2, _super);
    function DragBox2(opt_options) {
      var _this = _super.call(this) || this;
      var options = opt_options ? opt_options : {};
      _this.box_ = new Box_default(options.className || "ol-dragbox");
      _this.minArea_ = options.minArea !== void 0 ? options.minArea : 64;
      if (options.onBoxEnd) {
        _this.onBoxEnd = options.onBoxEnd;
      }
      _this.startPixel_ = null;
      _this.condition_ = options.condition ? options.condition : mouseActionButton;
      _this.boxEndCondition_ = options.boxEndCondition ? options.boxEndCondition : _this.defaultBoxEndCondition;
      return _this;
    }
    DragBox2.prototype.defaultBoxEndCondition = function(mapBrowserEvent, startPixel, endPixel) {
      var width = endPixel[0] - startPixel[0];
      var height = endPixel[1] - startPixel[1];
      return width * width + height * height >= this.minArea_;
    };
    DragBox2.prototype.getGeometry = function() {
      return this.box_.getGeometry();
    };
    DragBox2.prototype.handleDragEvent = function(mapBrowserEvent) {
      this.box_.setPixels(this.startPixel_, mapBrowserEvent.pixel);
      this.dispatchEvent(new DragBoxEvent(DragBoxEventType.BOXDRAG, mapBrowserEvent.coordinate, mapBrowserEvent));
    };
    DragBox2.prototype.handleUpEvent = function(mapBrowserEvent) {
      this.box_.setMap(null);
      var completeBox = this.boxEndCondition_(mapBrowserEvent, this.startPixel_, mapBrowserEvent.pixel);
      if (completeBox) {
        this.onBoxEnd(mapBrowserEvent);
      }
      this.dispatchEvent(new DragBoxEvent(completeBox ? DragBoxEventType.BOXEND : DragBoxEventType.BOXCANCEL, mapBrowserEvent.coordinate, mapBrowserEvent));
      return false;
    };
    DragBox2.prototype.handleDownEvent = function(mapBrowserEvent) {
      if (this.condition_(mapBrowserEvent)) {
        this.startPixel_ = mapBrowserEvent.pixel;
        this.box_.setMap(mapBrowserEvent.map);
        this.box_.setPixels(this.startPixel_, this.startPixel_);
        this.dispatchEvent(new DragBoxEvent(DragBoxEventType.BOXSTART, mapBrowserEvent.coordinate, mapBrowserEvent));
        return true;
      } else {
        return false;
      }
    };
    DragBox2.prototype.onBoxEnd = function(event) {
    };
    return DragBox2;
  }(Pointer_default)
);
var DragBox_default = DragBox;

// node_modules/ol/interaction/DragZoom.js
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
var DragZoom = (
  /** @class */
  function(_super) {
    __extends8(DragZoom2, _super);
    function DragZoom2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      var condition = options.condition ? options.condition : shiftKeyOnly;
      _this = _super.call(this, {
        condition,
        className: options.className || "ol-dragzoom",
        minArea: options.minArea
      }) || this;
      _this.duration_ = options.duration !== void 0 ? options.duration : 200;
      _this.out_ = options.out !== void 0 ? options.out : false;
      return _this;
    }
    DragZoom2.prototype.onBoxEnd = function(event) {
      var map = this.getMap();
      var view = (
        /** @type {!import("../View.js").default} */
        map.getView()
      );
      var size = (
        /** @type {!import("../size.js").Size} */
        map.getSize()
      );
      var extent = this.getGeometry().getExtent();
      if (this.out_) {
        var mapExtent = view.calculateExtentInternal(size);
        var boxPixelExtent = createOrUpdateFromCoordinates([map.getPixelFromCoordinateInternal(getBottomLeft(extent)), map.getPixelFromCoordinateInternal(getTopRight(extent))]);
        var factor = view.getResolutionForExtentInternal(boxPixelExtent, size);
        scaleFromCenter(mapExtent, 1 / factor);
        extent = mapExtent;
      }
      var resolution = view.getConstrainedResolution(view.getResolutionForExtentInternal(extent, size));
      var center = view.getConstrainedCenter(getCenter(extent), resolution);
      view.animateInternal({
        resolution,
        center,
        duration: this.duration_,
        easing: easeOut
      });
    };
    return DragZoom2;
  }(DragBox_default)
);
var DragZoom_default = DragZoom;

// node_modules/ol/events/KeyCode.js
var KeyCode_default = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

// node_modules/ol/interaction/KeyboardPan.js
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
var KeyboardPan = (
  /** @class */
  function(_super) {
    __extends9(KeyboardPan2, _super);
    function KeyboardPan2(opt_options) {
      var _this = _super.call(this) || this;
      var options = opt_options || {};
      _this.defaultCondition_ = function(mapBrowserEvent) {
        return noModifierKeys(mapBrowserEvent) && targetNotEditable(mapBrowserEvent);
      };
      _this.condition_ = options.condition !== void 0 ? options.condition : _this.defaultCondition_;
      _this.duration_ = options.duration !== void 0 ? options.duration : 100;
      _this.pixelDelta_ = options.pixelDelta !== void 0 ? options.pixelDelta : 128;
      return _this;
    }
    KeyboardPan2.prototype.handleEvent = function(mapBrowserEvent) {
      var stopEvent = false;
      if (mapBrowserEvent.type == EventType_default.KEYDOWN) {
        var keyEvent = (
          /** @type {KeyboardEvent} */
          mapBrowserEvent.originalEvent
        );
        var keyCode = keyEvent.keyCode;
        if (this.condition_(mapBrowserEvent) && (keyCode == KeyCode_default.DOWN || keyCode == KeyCode_default.LEFT || keyCode == KeyCode_default.RIGHT || keyCode == KeyCode_default.UP)) {
          var map = mapBrowserEvent.map;
          var view = map.getView();
          var mapUnitsDelta = view.getResolution() * this.pixelDelta_;
          var deltaX = 0, deltaY = 0;
          if (keyCode == KeyCode_default.DOWN) {
            deltaY = -mapUnitsDelta;
          } else if (keyCode == KeyCode_default.LEFT) {
            deltaX = -mapUnitsDelta;
          } else if (keyCode == KeyCode_default.RIGHT) {
            deltaX = mapUnitsDelta;
          } else {
            deltaY = mapUnitsDelta;
          }
          var delta = [deltaX, deltaY];
          rotate(delta, view.getRotation());
          pan(view, delta, this.duration_);
          keyEvent.preventDefault();
          stopEvent = true;
        }
      }
      return !stopEvent;
    };
    return KeyboardPan2;
  }(Interaction_default)
);
var KeyboardPan_default = KeyboardPan;

// node_modules/ol/interaction/KeyboardZoom.js
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
var KeyboardZoom = (
  /** @class */
  function(_super) {
    __extends10(KeyboardZoom2, _super);
    function KeyboardZoom2(opt_options) {
      var _this = _super.call(this) || this;
      var options = opt_options ? opt_options : {};
      _this.condition_ = options.condition ? options.condition : targetNotEditable;
      _this.delta_ = options.delta ? options.delta : 1;
      _this.duration_ = options.duration !== void 0 ? options.duration : 100;
      return _this;
    }
    KeyboardZoom2.prototype.handleEvent = function(mapBrowserEvent) {
      var stopEvent = false;
      if (mapBrowserEvent.type == EventType_default.KEYDOWN || mapBrowserEvent.type == EventType_default.KEYPRESS) {
        var keyEvent = (
          /** @type {KeyboardEvent} */
          mapBrowserEvent.originalEvent
        );
        var charCode = keyEvent.charCode;
        if (this.condition_(mapBrowserEvent) && (charCode == "+".charCodeAt(0) || charCode == "-".charCodeAt(0))) {
          var map = mapBrowserEvent.map;
          var delta = charCode == "+".charCodeAt(0) ? this.delta_ : -this.delta_;
          var view = map.getView();
          zoomByDelta(view, delta, void 0, this.duration_);
          keyEvent.preventDefault();
          stopEvent = true;
        }
      }
      return !stopEvent;
    };
    return KeyboardZoom2;
  }(Interaction_default)
);
var KeyboardZoom_default = KeyboardZoom;

// node_modules/ol/Kinetic.js
var Kinetic = (
  /** @class */
  function() {
    function Kinetic2(decay, minVelocity, delay) {
      this.decay_ = decay;
      this.minVelocity_ = minVelocity;
      this.delay_ = delay;
      this.points_ = [];
      this.angle_ = 0;
      this.initialVelocity_ = 0;
    }
    Kinetic2.prototype.begin = function() {
      this.points_.length = 0;
      this.angle_ = 0;
      this.initialVelocity_ = 0;
    };
    Kinetic2.prototype.update = function(x, y) {
      this.points_.push(x, y, Date.now());
    };
    Kinetic2.prototype.end = function() {
      if (this.points_.length < 6) {
        return false;
      }
      var delay = Date.now() - this.delay_;
      var lastIndex = this.points_.length - 3;
      if (this.points_[lastIndex + 2] < delay) {
        return false;
      }
      var firstIndex = lastIndex - 3;
      while (firstIndex > 0 && this.points_[firstIndex + 2] > delay) {
        firstIndex -= 3;
      }
      var duration = this.points_[lastIndex + 2] - this.points_[firstIndex + 2];
      if (duration < 1e3 / 60) {
        return false;
      }
      var dx = this.points_[lastIndex] - this.points_[firstIndex];
      var dy = this.points_[lastIndex + 1] - this.points_[firstIndex + 1];
      this.angle_ = Math.atan2(dy, dx);
      this.initialVelocity_ = Math.sqrt(dx * dx + dy * dy) / duration;
      return this.initialVelocity_ > this.minVelocity_;
    };
    Kinetic2.prototype.getDistance = function() {
      return (this.minVelocity_ - this.initialVelocity_) / this.decay_;
    };
    Kinetic2.prototype.getAngle = function() {
      return this.angle_;
    };
    return Kinetic2;
  }()
);
var Kinetic_default = Kinetic;

// node_modules/ol/interaction/MouseWheelZoom.js
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
var Mode = {
  TRACKPAD: "trackpad",
  WHEEL: "wheel"
};
var MouseWheelZoom = (
  /** @class */
  function(_super) {
    __extends11(MouseWheelZoom2, _super);
    function MouseWheelZoom2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      _this = _super.call(
        this,
        /** @type {import("./Interaction.js").InteractionOptions} */
        options
      ) || this;
      _this.totalDelta_ = 0;
      _this.lastDelta_ = 0;
      _this.maxDelta_ = options.maxDelta !== void 0 ? options.maxDelta : 1;
      _this.duration_ = options.duration !== void 0 ? options.duration : 250;
      _this.timeout_ = options.timeout !== void 0 ? options.timeout : 80;
      _this.useAnchor_ = options.useAnchor !== void 0 ? options.useAnchor : true;
      _this.constrainResolution_ = options.constrainResolution !== void 0 ? options.constrainResolution : false;
      var condition = options.condition ? options.condition : always;
      _this.condition_ = options.onFocusOnly ? all(focusWithTabindex, condition) : condition;
      _this.lastAnchor_ = null;
      _this.startTime_ = void 0;
      _this.timeoutId_;
      _this.mode_ = void 0;
      _this.trackpadEventGap_ = 400;
      _this.trackpadTimeoutId_;
      _this.deltaPerZoom_ = 300;
      return _this;
    }
    MouseWheelZoom2.prototype.endInteraction_ = function() {
      this.trackpadTimeoutId_ = void 0;
      var view = this.getMap().getView();
      view.endInteraction(void 0, this.lastDelta_ ? this.lastDelta_ > 0 ? 1 : -1 : 0, this.lastAnchor_);
    };
    MouseWheelZoom2.prototype.handleEvent = function(mapBrowserEvent) {
      if (!this.condition_(mapBrowserEvent)) {
        return true;
      }
      var type = mapBrowserEvent.type;
      if (type !== EventType_default.WHEEL) {
        return true;
      }
      var map = mapBrowserEvent.map;
      var wheelEvent = (
        /** @type {WheelEvent} */
        mapBrowserEvent.originalEvent
      );
      wheelEvent.preventDefault();
      if (this.useAnchor_) {
        this.lastAnchor_ = mapBrowserEvent.coordinate;
      }
      var delta;
      if (mapBrowserEvent.type == EventType_default.WHEEL) {
        delta = wheelEvent.deltaY;
        if (FIREFOX && wheelEvent.deltaMode === WheelEvent.DOM_DELTA_PIXEL) {
          delta /= DEVICE_PIXEL_RATIO;
        }
        if (wheelEvent.deltaMode === WheelEvent.DOM_DELTA_LINE) {
          delta *= 40;
        }
      }
      if (delta === 0) {
        return false;
      } else {
        this.lastDelta_ = delta;
      }
      var now = Date.now();
      if (this.startTime_ === void 0) {
        this.startTime_ = now;
      }
      if (!this.mode_ || now - this.startTime_ > this.trackpadEventGap_) {
        this.mode_ = Math.abs(delta) < 4 ? Mode.TRACKPAD : Mode.WHEEL;
      }
      var view = map.getView();
      if (this.mode_ === Mode.TRACKPAD && !(view.getConstrainResolution() || this.constrainResolution_)) {
        if (this.trackpadTimeoutId_) {
          clearTimeout(this.trackpadTimeoutId_);
        } else {
          if (view.getAnimating()) {
            view.cancelAnimations();
          }
          view.beginInteraction();
        }
        this.trackpadTimeoutId_ = setTimeout(this.endInteraction_.bind(this), this.timeout_);
        view.adjustZoom(-delta / this.deltaPerZoom_, this.lastAnchor_);
        this.startTime_ = now;
        return false;
      }
      this.totalDelta_ += delta;
      var timeLeft = Math.max(this.timeout_ - (now - this.startTime_), 0);
      clearTimeout(this.timeoutId_);
      this.timeoutId_ = setTimeout(this.handleWheelZoom_.bind(this, map), timeLeft);
      return false;
    };
    MouseWheelZoom2.prototype.handleWheelZoom_ = function(map) {
      var view = map.getView();
      if (view.getAnimating()) {
        view.cancelAnimations();
      }
      var delta = -clamp(this.totalDelta_, -this.maxDelta_ * this.deltaPerZoom_, this.maxDelta_ * this.deltaPerZoom_) / this.deltaPerZoom_;
      if (view.getConstrainResolution() || this.constrainResolution_) {
        delta = delta ? delta > 0 ? 1 : -1 : 0;
      }
      zoomByDelta(view, delta, this.lastAnchor_, this.duration_);
      this.mode_ = void 0;
      this.totalDelta_ = 0;
      this.lastAnchor_ = null;
      this.startTime_ = void 0;
      this.timeoutId_ = void 0;
    };
    MouseWheelZoom2.prototype.setMouseAnchor = function(useAnchor) {
      this.useAnchor_ = useAnchor;
      if (!useAnchor) {
        this.lastAnchor_ = null;
      }
    };
    return MouseWheelZoom2;
  }(Interaction_default)
);
var MouseWheelZoom_default = MouseWheelZoom;

// node_modules/ol/interaction/PinchRotate.js
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
var PinchRotate = (
  /** @class */
  function(_super) {
    __extends12(PinchRotate2, _super);
    function PinchRotate2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      var pointerOptions = (
        /** @type {import("./Pointer.js").Options} */
        options
      );
      if (!pointerOptions.stopDown) {
        pointerOptions.stopDown = FALSE;
      }
      _this = _super.call(this, pointerOptions) || this;
      _this.anchor_ = null;
      _this.lastAngle_ = void 0;
      _this.rotating_ = false;
      _this.rotationDelta_ = 0;
      _this.threshold_ = options.threshold !== void 0 ? options.threshold : 0.3;
      _this.duration_ = options.duration !== void 0 ? options.duration : 250;
      return _this;
    }
    PinchRotate2.prototype.handleDragEvent = function(mapBrowserEvent) {
      var rotationDelta = 0;
      var touch0 = this.targetPointers[0];
      var touch1 = this.targetPointers[1];
      var angle = Math.atan2(touch1.clientY - touch0.clientY, touch1.clientX - touch0.clientX);
      if (this.lastAngle_ !== void 0) {
        var delta = angle - this.lastAngle_;
        this.rotationDelta_ += delta;
        if (!this.rotating_ && Math.abs(this.rotationDelta_) > this.threshold_) {
          this.rotating_ = true;
        }
        rotationDelta = delta;
      }
      this.lastAngle_ = angle;
      var map = mapBrowserEvent.map;
      var view = map.getView();
      if (view.getConstraints().rotation === disable) {
        return;
      }
      var viewportPosition = map.getViewport().getBoundingClientRect();
      var centroid2 = centroid(this.targetPointers);
      centroid2[0] -= viewportPosition.left;
      centroid2[1] -= viewportPosition.top;
      this.anchor_ = map.getCoordinateFromPixelInternal(centroid2);
      if (this.rotating_) {
        map.render();
        view.adjustRotationInternal(rotationDelta, this.anchor_);
      }
    };
    PinchRotate2.prototype.handleUpEvent = function(mapBrowserEvent) {
      if (this.targetPointers.length < 2) {
        var map = mapBrowserEvent.map;
        var view = map.getView();
        view.endInteraction(this.duration_);
        return false;
      } else {
        return true;
      }
    };
    PinchRotate2.prototype.handleDownEvent = function(mapBrowserEvent) {
      if (this.targetPointers.length >= 2) {
        var map = mapBrowserEvent.map;
        this.anchor_ = null;
        this.lastAngle_ = void 0;
        this.rotating_ = false;
        this.rotationDelta_ = 0;
        if (!this.handlingDownUpSequence) {
          map.getView().beginInteraction();
        }
        return true;
      } else {
        return false;
      }
    };
    return PinchRotate2;
  }(Pointer_default)
);
var PinchRotate_default = PinchRotate;

// node_modules/ol/interaction/PinchZoom.js
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
var PinchZoom = (
  /** @class */
  function(_super) {
    __extends13(PinchZoom2, _super);
    function PinchZoom2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      var pointerOptions = (
        /** @type {import("./Pointer.js").Options} */
        options
      );
      if (!pointerOptions.stopDown) {
        pointerOptions.stopDown = FALSE;
      }
      _this = _super.call(this, pointerOptions) || this;
      _this.anchor_ = null;
      _this.duration_ = options.duration !== void 0 ? options.duration : 400;
      _this.lastDistance_ = void 0;
      _this.lastScaleDelta_ = 1;
      return _this;
    }
    PinchZoom2.prototype.handleDragEvent = function(mapBrowserEvent) {
      var scaleDelta = 1;
      var touch0 = this.targetPointers[0];
      var touch1 = this.targetPointers[1];
      var dx = touch0.clientX - touch1.clientX;
      var dy = touch0.clientY - touch1.clientY;
      var distance2 = Math.sqrt(dx * dx + dy * dy);
      if (this.lastDistance_ !== void 0) {
        scaleDelta = this.lastDistance_ / distance2;
      }
      this.lastDistance_ = distance2;
      var map = mapBrowserEvent.map;
      var view = map.getView();
      if (scaleDelta != 1) {
        this.lastScaleDelta_ = scaleDelta;
      }
      var viewportPosition = map.getViewport().getBoundingClientRect();
      var centroid2 = centroid(this.targetPointers);
      centroid2[0] -= viewportPosition.left;
      centroid2[1] -= viewportPosition.top;
      this.anchor_ = map.getCoordinateFromPixelInternal(centroid2);
      map.render();
      view.adjustResolutionInternal(scaleDelta, this.anchor_);
    };
    PinchZoom2.prototype.handleUpEvent = function(mapBrowserEvent) {
      if (this.targetPointers.length < 2) {
        var map = mapBrowserEvent.map;
        var view = map.getView();
        var direction = this.lastScaleDelta_ > 1 ? 1 : -1;
        view.endInteraction(this.duration_, direction);
        return false;
      } else {
        return true;
      }
    };
    PinchZoom2.prototype.handleDownEvent = function(mapBrowserEvent) {
      if (this.targetPointers.length >= 2) {
        var map = mapBrowserEvent.map;
        this.anchor_ = null;
        this.lastDistance_ = void 0;
        this.lastScaleDelta_ = 1;
        if (!this.handlingDownUpSequence) {
          map.getView().beginInteraction();
        }
        return true;
      } else {
        return false;
      }
    };
    return PinchZoom2;
  }(Pointer_default)
);
var PinchZoom_default = PinchZoom;

// node_modules/ol/interaction/DragAndDrop.js
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
var DragAndDropEventType = {
  /**
   * Triggered when features are added
   * @event DragAndDropEvent#addfeatures
   * @api
   */
  ADD_FEATURES: "addfeatures"
};
var DragAndDropEvent = (
  /** @class */
  function(_super) {
    __extends14(DragAndDropEvent2, _super);
    function DragAndDropEvent2(type, file, opt_features, opt_projection) {
      var _this = _super.call(this, type) || this;
      _this.features = opt_features;
      _this.file = file;
      _this.projection = opt_projection;
      return _this;
    }
    return DragAndDropEvent2;
  }(Event_default)
);
var DragAndDrop = (
  /** @class */
  function(_super) {
    __extends14(DragAndDrop2, _super);
    function DragAndDrop2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      _this = _super.call(this, {
        handleEvent: TRUE
      }) || this;
      _this.readAsBuffer_ = false;
      _this.formats_ = [];
      var formatConstructors = options.formatConstructors ? options.formatConstructors : [];
      for (var i = 0, ii = formatConstructors.length; i < ii; ++i) {
        var format = formatConstructors[i];
        if (typeof format === "function") {
          format = new format();
        }
        _this.formats_.push(format);
        _this.readAsBuffer_ = _this.readAsBuffer_ || format.getType() === FormatType_default.ARRAY_BUFFER;
      }
      _this.projection_ = options.projection ? get(options.projection) : null;
      _this.dropListenKeys_ = null;
      _this.source_ = options.source || null;
      _this.target = options.target ? options.target : null;
      return _this;
    }
    DragAndDrop2.prototype.handleResult_ = function(file, event) {
      var result = event.target.result;
      var map = this.getMap();
      var projection = this.projection_;
      if (!projection) {
        var view = map.getView();
        projection = view.getProjection();
      }
      var text;
      var formats = this.formats_;
      for (var i = 0, ii = formats.length; i < ii; ++i) {
        var format = formats[i];
        var input = result;
        if (this.readAsBuffer_ && format.getType() !== FormatType_default.ARRAY_BUFFER) {
          if (text === void 0) {
            text = new TextDecoder().decode(result);
          }
          input = text;
        }
        var features = this.tryReadFeatures_(format, input, {
          featureProjection: projection
        });
        if (features && features.length > 0) {
          if (this.source_) {
            this.source_.clear();
            this.source_.addFeatures(features);
          }
          this.dispatchEvent(new DragAndDropEvent(DragAndDropEventType.ADD_FEATURES, file, features, projection));
          break;
        }
      }
    };
    DragAndDrop2.prototype.registerListeners_ = function() {
      var map = this.getMap();
      if (map) {
        var dropArea = this.target ? this.target : map.getViewport();
        this.dropListenKeys_ = [listen(dropArea, EventType_default.DROP, this.handleDrop, this), listen(dropArea, EventType_default.DRAGENTER, this.handleStop, this), listen(dropArea, EventType_default.DRAGOVER, this.handleStop, this), listen(dropArea, EventType_default.DROP, this.handleStop, this)];
      }
    };
    DragAndDrop2.prototype.setActive = function(active) {
      if (!this.getActive() && active) {
        this.registerListeners_();
      }
      if (this.getActive() && !active) {
        this.unregisterListeners_();
      }
      _super.prototype.setActive.call(this, active);
    };
    DragAndDrop2.prototype.setMap = function(map) {
      this.unregisterListeners_();
      _super.prototype.setMap.call(this, map);
      if (this.getActive()) {
        this.registerListeners_();
      }
    };
    DragAndDrop2.prototype.tryReadFeatures_ = function(format, text, options) {
      try {
        return (
          /** @type {Array<import("../Feature.js").default>} */
          format.readFeatures(text, options)
        );
      } catch (e) {
        return null;
      }
    };
    DragAndDrop2.prototype.unregisterListeners_ = function() {
      if (this.dropListenKeys_) {
        this.dropListenKeys_.forEach(unlistenByKey);
        this.dropListenKeys_ = null;
      }
    };
    DragAndDrop2.prototype.handleDrop = function(event) {
      var files = event.dataTransfer.files;
      for (var i = 0, ii = files.length; i < ii; ++i) {
        var file = files.item(i);
        var reader = new FileReader();
        reader.addEventListener(EventType_default.LOAD, this.handleResult_.bind(this, file));
        if (this.readAsBuffer_) {
          reader.readAsArrayBuffer(file);
        } else {
          reader.readAsText(file);
        }
      }
    };
    DragAndDrop2.prototype.handleStop = function(event) {
      event.stopPropagation();
      event.preventDefault();
      event.dataTransfer.dropEffect = "copy";
    };
    return DragAndDrop2;
  }(Interaction_default)
);

// node_modules/ol/interaction/DragRotateAndZoom.js
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
var DragRotateAndZoom = (
  /** @class */
  function(_super) {
    __extends15(DragRotateAndZoom2, _super);
    function DragRotateAndZoom2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      _this = _super.call(
        this,
        /** @type {import("./Pointer.js").Options} */
        options
      ) || this;
      _this.condition_ = options.condition ? options.condition : shiftKeyOnly;
      _this.lastAngle_ = void 0;
      _this.lastMagnitude_ = void 0;
      _this.lastScaleDelta_ = 0;
      _this.duration_ = options.duration !== void 0 ? options.duration : 400;
      return _this;
    }
    DragRotateAndZoom2.prototype.handleDragEvent = function(mapBrowserEvent) {
      if (!mouseOnly(mapBrowserEvent)) {
        return;
      }
      var map = mapBrowserEvent.map;
      var size = map.getSize();
      var offset = mapBrowserEvent.pixel;
      var deltaX = offset[0] - size[0] / 2;
      var deltaY = size[1] / 2 - offset[1];
      var theta = Math.atan2(deltaY, deltaX);
      var magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      var view = map.getView();
      if (this.lastAngle_ !== void 0) {
        var angleDelta = this.lastAngle_ - theta;
        view.adjustRotationInternal(angleDelta);
      }
      this.lastAngle_ = theta;
      if (this.lastMagnitude_ !== void 0) {
        view.adjustResolutionInternal(this.lastMagnitude_ / magnitude);
      }
      if (this.lastMagnitude_ !== void 0) {
        this.lastScaleDelta_ = this.lastMagnitude_ / magnitude;
      }
      this.lastMagnitude_ = magnitude;
    };
    DragRotateAndZoom2.prototype.handleUpEvent = function(mapBrowserEvent) {
      if (!mouseOnly(mapBrowserEvent)) {
        return true;
      }
      var map = mapBrowserEvent.map;
      var view = map.getView();
      var direction = this.lastScaleDelta_ > 1 ? 1 : -1;
      view.endInteraction(this.duration_, direction);
      this.lastScaleDelta_ = 0;
      return false;
    };
    DragRotateAndZoom2.prototype.handleDownEvent = function(mapBrowserEvent) {
      if (!mouseOnly(mapBrowserEvent)) {
        return false;
      }
      if (this.condition_(mapBrowserEvent)) {
        mapBrowserEvent.map.getView().beginInteraction();
        this.lastAngle_ = void 0;
        this.lastMagnitude_ = void 0;
        return true;
      } else {
        return false;
      }
    };
    return DragRotateAndZoom2;
  }(Pointer_default)
);

// node_modules/ol/geom/Circle.js
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
var Circle = (
  /** @class */
  function(_super) {
    __extends16(Circle2, _super);
    function Circle2(center, opt_radius, opt_layout) {
      var _this = _super.call(this) || this;
      if (opt_layout !== void 0 && opt_radius === void 0) {
        _this.setFlatCoordinates(opt_layout, center);
      } else {
        var radius = opt_radius ? opt_radius : 0;
        _this.setCenterAndRadius(center, radius, opt_layout);
      }
      return _this;
    }
    Circle2.prototype.clone = function() {
      var circle = new Circle2(this.flatCoordinates.slice(), void 0, this.layout);
      circle.applyProperties(this);
      return circle;
    };
    Circle2.prototype.closestPointXY = function(x, y, closestPoint, minSquaredDistance) {
      var flatCoordinates = this.flatCoordinates;
      var dx = x - flatCoordinates[0];
      var dy = y - flatCoordinates[1];
      var squaredDistance3 = dx * dx + dy * dy;
      if (squaredDistance3 < minSquaredDistance) {
        if (squaredDistance3 === 0) {
          for (var i = 0; i < this.stride; ++i) {
            closestPoint[i] = flatCoordinates[i];
          }
        } else {
          var delta = this.getRadius() / Math.sqrt(squaredDistance3);
          closestPoint[0] = flatCoordinates[0] + delta * dx;
          closestPoint[1] = flatCoordinates[1] + delta * dy;
          for (var i = 2; i < this.stride; ++i) {
            closestPoint[i] = flatCoordinates[i];
          }
        }
        closestPoint.length = this.stride;
        return squaredDistance3;
      } else {
        return minSquaredDistance;
      }
    };
    Circle2.prototype.containsXY = function(x, y) {
      var flatCoordinates = this.flatCoordinates;
      var dx = x - flatCoordinates[0];
      var dy = y - flatCoordinates[1];
      return dx * dx + dy * dy <= this.getRadiusSquared_();
    };
    Circle2.prototype.getCenter = function() {
      return this.flatCoordinates.slice(0, this.stride);
    };
    Circle2.prototype.computeExtent = function(extent) {
      var flatCoordinates = this.flatCoordinates;
      var radius = flatCoordinates[this.stride] - flatCoordinates[0];
      return createOrUpdate(flatCoordinates[0] - radius, flatCoordinates[1] - radius, flatCoordinates[0] + radius, flatCoordinates[1] + radius, extent);
    };
    Circle2.prototype.getRadius = function() {
      return Math.sqrt(this.getRadiusSquared_());
    };
    Circle2.prototype.getRadiusSquared_ = function() {
      var dx = this.flatCoordinates[this.stride] - this.flatCoordinates[0];
      var dy = this.flatCoordinates[this.stride + 1] - this.flatCoordinates[1];
      return dx * dx + dy * dy;
    };
    Circle2.prototype.getType = function() {
      return GeometryType_default.CIRCLE;
    };
    Circle2.prototype.intersectsExtent = function(extent) {
      var circleExtent = this.getExtent();
      if (intersects(extent, circleExtent)) {
        var center = this.getCenter();
        if (extent[0] <= center[0] && extent[2] >= center[0]) {
          return true;
        }
        if (extent[1] <= center[1] && extent[3] >= center[1]) {
          return true;
        }
        return forEachCorner(extent, this.intersectsCoordinate.bind(this));
      }
      return false;
    };
    Circle2.prototype.setCenter = function(center) {
      var stride = this.stride;
      var radius = this.flatCoordinates[stride] - this.flatCoordinates[0];
      var flatCoordinates = center.slice();
      flatCoordinates[stride] = flatCoordinates[0] + radius;
      for (var i = 1; i < stride; ++i) {
        flatCoordinates[stride + i] = center[i];
      }
      this.setFlatCoordinates(this.layout, flatCoordinates);
      this.changed();
    };
    Circle2.prototype.setCenterAndRadius = function(center, radius, opt_layout) {
      this.setLayout(opt_layout, center, 0);
      if (!this.flatCoordinates) {
        this.flatCoordinates = [];
      }
      var flatCoordinates = this.flatCoordinates;
      var offset = deflateCoordinate(flatCoordinates, 0, center, this.stride);
      flatCoordinates[offset++] = flatCoordinates[0] + radius;
      for (var i = 1, ii = this.stride; i < ii; ++i) {
        flatCoordinates[offset++] = flatCoordinates[i];
      }
      flatCoordinates.length = offset;
      this.changed();
    };
    Circle2.prototype.getCoordinates = function() {
      return null;
    };
    Circle2.prototype.setCoordinates = function(coordinates, opt_layout) {
    };
    Circle2.prototype.setRadius = function(radius) {
      this.flatCoordinates[this.stride] = this.flatCoordinates[0] + radius;
      this.changed();
    };
    Circle2.prototype.rotate = function(angle, anchor) {
      var center = this.getCenter();
      var stride = this.getStride();
      this.setCenter(rotate2(center, 0, center.length, stride, angle, anchor, center));
      this.changed();
    };
    Circle2.prototype.translate = function(deltaX, deltaY) {
      var center = this.getCenter();
      var stride = this.getStride();
      this.setCenter(translate(center, 0, center.length, stride, deltaX, deltaY, center));
      this.changed();
    };
    return Circle2;
  }(SimpleGeometry_default)
);
Circle.prototype.transform;
var Circle_default = Circle;

// node_modules/ol/Feature.js
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
var Feature = (
  /** @class */
  function(_super) {
    __extends17(Feature2, _super);
    function Feature2(opt_geometryOrProperties) {
      var _this = _super.call(this) || this;
      _this.id_ = void 0;
      _this.geometryName_ = "geometry";
      _this.style_ = null;
      _this.styleFunction_ = void 0;
      _this.geometryChangeKey_ = null;
      _this.addEventListener(getChangeEventType(_this.geometryName_), _this.handleGeometryChanged_);
      if (opt_geometryOrProperties) {
        if (typeof /** @type {?} */
        opt_geometryOrProperties.getSimplifiedGeometry === "function") {
          var geometry = (
            /** @type {Geometry} */
            opt_geometryOrProperties
          );
          _this.setGeometry(geometry);
        } else {
          var properties = opt_geometryOrProperties;
          _this.setProperties(properties);
        }
      }
      return _this;
    }
    Feature2.prototype.clone = function() {
      var clone = new Feature2(this.hasProperties() ? this.getProperties() : null);
      clone.setGeometryName(this.getGeometryName());
      var geometry = this.getGeometry();
      if (geometry) {
        clone.setGeometry(geometry.clone());
      }
      var style = this.getStyle();
      if (style) {
        clone.setStyle(style);
      }
      return clone;
    };
    Feature2.prototype.getGeometry = function() {
      return (
        /** @type {Geometry|undefined} */
        this.get(this.geometryName_)
      );
    };
    Feature2.prototype.getId = function() {
      return this.id_;
    };
    Feature2.prototype.getGeometryName = function() {
      return this.geometryName_;
    };
    Feature2.prototype.getStyle = function() {
      return this.style_;
    };
    Feature2.prototype.getStyleFunction = function() {
      return this.styleFunction_;
    };
    Feature2.prototype.handleGeometryChange_ = function() {
      this.changed();
    };
    Feature2.prototype.handleGeometryChanged_ = function() {
      if (this.geometryChangeKey_) {
        unlistenByKey(this.geometryChangeKey_);
        this.geometryChangeKey_ = null;
      }
      var geometry = this.getGeometry();
      if (geometry) {
        this.geometryChangeKey_ = listen(geometry, EventType_default.CHANGE, this.handleGeometryChange_, this);
      }
      this.changed();
    };
    Feature2.prototype.setGeometry = function(geometry) {
      this.set(this.geometryName_, geometry);
    };
    Feature2.prototype.setStyle = function(opt_style) {
      this.style_ = opt_style;
      this.styleFunction_ = !opt_style ? void 0 : createStyleFunction(opt_style);
      this.changed();
    };
    Feature2.prototype.setId = function(id) {
      this.id_ = id;
      this.changed();
    };
    Feature2.prototype.setGeometryName = function(name) {
      this.removeEventListener(getChangeEventType(this.geometryName_), this.handleGeometryChanged_);
      this.geometryName_ = name;
      this.addEventListener(getChangeEventType(this.geometryName_), this.handleGeometryChanged_);
      this.handleGeometryChanged_();
    };
    return Feature2;
  }(Object_default)
);
function createStyleFunction(obj) {
  if (typeof obj === "function") {
    return obj;
  } else {
    var styles_1;
    if (Array.isArray(obj)) {
      styles_1 = obj;
    } else {
      assert(typeof /** @type {?} */
      obj.getZIndex === "function", 41);
      var style = (
        /** @type {import("./style/Style.js").default} */
        obj
      );
      styles_1 = [style];
    }
    return function() {
      return styles_1;
    };
  }
}
var Feature_default = Feature;

// node_modules/ol/geom/flat/interpolate.js
function interpolatePoint(flatCoordinates, offset, end, stride, fraction, opt_dest, opt_dimension) {
  var o, t;
  var n = (end - offset) / stride;
  if (n === 1) {
    o = offset;
  } else if (n === 2) {
    o = offset;
    t = fraction;
  } else if (n !== 0) {
    var x1 = flatCoordinates[offset];
    var y1 = flatCoordinates[offset + 1];
    var length_1 = 0;
    var cumulativeLengths = [0];
    for (var i = offset + stride; i < end; i += stride) {
      var x2 = flatCoordinates[i];
      var y2 = flatCoordinates[i + 1];
      length_1 += Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
      cumulativeLengths.push(length_1);
      x1 = x2;
      y1 = y2;
    }
    var target = fraction * length_1;
    var index = binarySearch(cumulativeLengths, target);
    if (index < 0) {
      t = (target - cumulativeLengths[-index - 2]) / (cumulativeLengths[-index - 1] - cumulativeLengths[-index - 2]);
      o = offset + (-index - 2) * stride;
    } else {
      o = offset + index * stride;
    }
  }
  var dimension = opt_dimension > 1 ? opt_dimension : 2;
  var dest = opt_dest ? opt_dest : new Array(dimension);
  for (var i = 0; i < dimension; ++i) {
    dest[i] = o === void 0 ? NaN : t === void 0 ? flatCoordinates[o + i] : lerp(flatCoordinates[o + i], flatCoordinates[o + stride + i], t);
  }
  return dest;
}
function lineStringCoordinateAtM(flatCoordinates, offset, end, stride, m, extrapolate) {
  if (end == offset) {
    return null;
  }
  var coordinate;
  if (m < flatCoordinates[offset + stride - 1]) {
    if (extrapolate) {
      coordinate = flatCoordinates.slice(offset, offset + stride);
      coordinate[stride - 1] = m;
      return coordinate;
    } else {
      return null;
    }
  } else if (flatCoordinates[end - 1] < m) {
    if (extrapolate) {
      coordinate = flatCoordinates.slice(end - stride, end);
      coordinate[stride - 1] = m;
      return coordinate;
    } else {
      return null;
    }
  }
  if (m == flatCoordinates[offset + stride - 1]) {
    return flatCoordinates.slice(offset, offset + stride);
  }
  var lo = offset / stride;
  var hi = end / stride;
  while (lo < hi) {
    var mid = lo + hi >> 1;
    if (m < flatCoordinates[(mid + 1) * stride - 1]) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }
  var m0 = flatCoordinates[lo * stride - 1];
  if (m == m0) {
    return flatCoordinates.slice((lo - 1) * stride, (lo - 1) * stride + stride);
  }
  var m1 = flatCoordinates[(lo + 1) * stride - 1];
  var t = (m - m0) / (m1 - m0);
  coordinate = [];
  for (var i = 0; i < stride - 1; ++i) {
    coordinate.push(lerp(flatCoordinates[(lo - 1) * stride + i], flatCoordinates[lo * stride + i], t));
  }
  coordinate.push(m);
  return coordinate;
}
function lineStringsCoordinateAtM(flatCoordinates, offset, ends, stride, m, extrapolate, interpolate) {
  if (interpolate) {
    return lineStringCoordinateAtM(flatCoordinates, offset, ends[ends.length - 1], stride, m, extrapolate);
  }
  var coordinate;
  if (m < flatCoordinates[stride - 1]) {
    if (extrapolate) {
      coordinate = flatCoordinates.slice(0, stride);
      coordinate[stride - 1] = m;
      return coordinate;
    } else {
      return null;
    }
  }
  if (flatCoordinates[flatCoordinates.length - 1] < m) {
    if (extrapolate) {
      coordinate = flatCoordinates.slice(flatCoordinates.length - stride);
      coordinate[stride - 1] = m;
      return coordinate;
    } else {
      return null;
    }
  }
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    if (offset == end) {
      continue;
    }
    if (m < flatCoordinates[offset + stride - 1]) {
      return null;
    } else if (m <= flatCoordinates[end - 1]) {
      return lineStringCoordinateAtM(flatCoordinates, offset, end, stride, m, false);
    }
    offset = end;
  }
  return null;
}

// node_modules/ol/geom/LineString.js
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
var LineString = (
  /** @class */
  function(_super) {
    __extends18(LineString2, _super);
    function LineString2(coordinates, opt_layout) {
      var _this = _super.call(this) || this;
      _this.flatMidpoint_ = null;
      _this.flatMidpointRevision_ = -1;
      _this.maxDelta_ = -1;
      _this.maxDeltaRevision_ = -1;
      if (opt_layout !== void 0 && !Array.isArray(coordinates[0])) {
        _this.setFlatCoordinates(
          opt_layout,
          /** @type {Array<number>} */
          coordinates
        );
      } else {
        _this.setCoordinates(
          /** @type {Array<import("../coordinate.js").Coordinate>} */
          coordinates,
          opt_layout
        );
      }
      return _this;
    }
    LineString2.prototype.appendCoordinate = function(coordinate) {
      if (!this.flatCoordinates) {
        this.flatCoordinates = coordinate.slice();
      } else {
        extend(this.flatCoordinates, coordinate);
      }
      this.changed();
    };
    LineString2.prototype.clone = function() {
      var lineString = new LineString2(this.flatCoordinates.slice(), this.layout);
      lineString.applyProperties(this);
      return lineString;
    };
    LineString2.prototype.closestPointXY = function(x, y, closestPoint, minSquaredDistance) {
      if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
        return minSquaredDistance;
      }
      if (this.maxDeltaRevision_ != this.getRevision()) {
        this.maxDelta_ = Math.sqrt(maxSquaredDelta(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, 0));
        this.maxDeltaRevision_ = this.getRevision();
      }
      return assignClosestPoint(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, this.maxDelta_, false, x, y, closestPoint, minSquaredDistance);
    };
    LineString2.prototype.forEachSegment = function(callback) {
      return forEach(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, callback);
    };
    LineString2.prototype.getCoordinateAtM = function(m, opt_extrapolate) {
      if (this.layout != GeometryLayout_default.XYM && this.layout != GeometryLayout_default.XYZM) {
        return null;
      }
      var extrapolate = opt_extrapolate !== void 0 ? opt_extrapolate : false;
      return lineStringCoordinateAtM(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, m, extrapolate);
    };
    LineString2.prototype.getCoordinates = function() {
      return inflateCoordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
    };
    LineString2.prototype.getCoordinateAt = function(fraction, opt_dest) {
      return interpolatePoint(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, fraction, opt_dest, this.stride);
    };
    LineString2.prototype.getLength = function() {
      return lineStringLength(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
    };
    LineString2.prototype.getFlatMidpoint = function() {
      if (this.flatMidpointRevision_ != this.getRevision()) {
        this.flatMidpoint_ = this.getCoordinateAt(0.5, this.flatMidpoint_);
        this.flatMidpointRevision_ = this.getRevision();
      }
      return this.flatMidpoint_;
    };
    LineString2.prototype.getSimplifiedGeometryInternal = function(squaredTolerance) {
      var simplifiedFlatCoordinates = [];
      simplifiedFlatCoordinates.length = douglasPeucker(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, squaredTolerance, simplifiedFlatCoordinates, 0);
      return new LineString2(simplifiedFlatCoordinates, GeometryLayout_default.XY);
    };
    LineString2.prototype.getType = function() {
      return GeometryType_default.LINE_STRING;
    };
    LineString2.prototype.intersectsExtent = function(extent) {
      return intersectsLineString(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, extent);
    };
    LineString2.prototype.setCoordinates = function(coordinates, opt_layout) {
      this.setLayout(opt_layout, coordinates, 1);
      if (!this.flatCoordinates) {
        this.flatCoordinates = [];
      }
      this.flatCoordinates.length = deflateCoordinates(this.flatCoordinates, 0, coordinates, this.stride);
      this.changed();
    };
    return LineString2;
  }(SimpleGeometry_default)
);
var LineString_default = LineString;

// node_modules/ol/geom/MultiLineString.js
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
var MultiLineString = (
  /** @class */
  function(_super) {
    __extends19(MultiLineString2, _super);
    function MultiLineString2(coordinates, opt_layout, opt_ends) {
      var _this = _super.call(this) || this;
      _this.ends_ = [];
      _this.maxDelta_ = -1;
      _this.maxDeltaRevision_ = -1;
      if (Array.isArray(coordinates[0])) {
        _this.setCoordinates(
          /** @type {Array<Array<import("../coordinate.js").Coordinate>>} */
          coordinates,
          opt_layout
        );
      } else if (opt_layout !== void 0 && opt_ends) {
        _this.setFlatCoordinates(
          opt_layout,
          /** @type {Array<number>} */
          coordinates
        );
        _this.ends_ = opt_ends;
      } else {
        var layout = _this.getLayout();
        var lineStrings = (
          /** @type {Array<LineString>} */
          coordinates
        );
        var flatCoordinates = [];
        var ends = [];
        for (var i = 0, ii = lineStrings.length; i < ii; ++i) {
          var lineString = lineStrings[i];
          if (i === 0) {
            layout = lineString.getLayout();
          }
          extend(flatCoordinates, lineString.getFlatCoordinates());
          ends.push(flatCoordinates.length);
        }
        _this.setFlatCoordinates(layout, flatCoordinates);
        _this.ends_ = ends;
      }
      return _this;
    }
    MultiLineString2.prototype.appendLineString = function(lineString) {
      if (!this.flatCoordinates) {
        this.flatCoordinates = lineString.getFlatCoordinates().slice();
      } else {
        extend(this.flatCoordinates, lineString.getFlatCoordinates().slice());
      }
      this.ends_.push(this.flatCoordinates.length);
      this.changed();
    };
    MultiLineString2.prototype.clone = function() {
      var multiLineString = new MultiLineString2(this.flatCoordinates.slice(), this.layout, this.ends_.slice());
      multiLineString.applyProperties(this);
      return multiLineString;
    };
    MultiLineString2.prototype.closestPointXY = function(x, y, closestPoint, minSquaredDistance) {
      if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
        return minSquaredDistance;
      }
      if (this.maxDeltaRevision_ != this.getRevision()) {
        this.maxDelta_ = Math.sqrt(arrayMaxSquaredDelta(this.flatCoordinates, 0, this.ends_, this.stride, 0));
        this.maxDeltaRevision_ = this.getRevision();
      }
      return assignClosestArrayPoint(this.flatCoordinates, 0, this.ends_, this.stride, this.maxDelta_, false, x, y, closestPoint, minSquaredDistance);
    };
    MultiLineString2.prototype.getCoordinateAtM = function(m, opt_extrapolate, opt_interpolate) {
      if (this.layout != GeometryLayout_default.XYM && this.layout != GeometryLayout_default.XYZM || this.flatCoordinates.length === 0) {
        return null;
      }
      var extrapolate = opt_extrapolate !== void 0 ? opt_extrapolate : false;
      var interpolate = opt_interpolate !== void 0 ? opt_interpolate : false;
      return lineStringsCoordinateAtM(this.flatCoordinates, 0, this.ends_, this.stride, m, extrapolate, interpolate);
    };
    MultiLineString2.prototype.getCoordinates = function() {
      return inflateCoordinatesArray(this.flatCoordinates, 0, this.ends_, this.stride);
    };
    MultiLineString2.prototype.getEnds = function() {
      return this.ends_;
    };
    MultiLineString2.prototype.getLineString = function(index) {
      if (index < 0 || this.ends_.length <= index) {
        return null;
      }
      return new LineString_default(this.flatCoordinates.slice(index === 0 ? 0 : this.ends_[index - 1], this.ends_[index]), this.layout);
    };
    MultiLineString2.prototype.getLineStrings = function() {
      var flatCoordinates = this.flatCoordinates;
      var ends = this.ends_;
      var layout = this.layout;
      var lineStrings = [];
      var offset = 0;
      for (var i = 0, ii = ends.length; i < ii; ++i) {
        var end = ends[i];
        var lineString = new LineString_default(flatCoordinates.slice(offset, end), layout);
        lineStrings.push(lineString);
        offset = end;
      }
      return lineStrings;
    };
    MultiLineString2.prototype.getFlatMidpoints = function() {
      var midpoints = [];
      var flatCoordinates = this.flatCoordinates;
      var offset = 0;
      var ends = this.ends_;
      var stride = this.stride;
      for (var i = 0, ii = ends.length; i < ii; ++i) {
        var end = ends[i];
        var midpoint = interpolatePoint(flatCoordinates, offset, end, stride, 0.5);
        extend(midpoints, midpoint);
        offset = end;
      }
      return midpoints;
    };
    MultiLineString2.prototype.getSimplifiedGeometryInternal = function(squaredTolerance) {
      var simplifiedFlatCoordinates = [];
      var simplifiedEnds = [];
      simplifiedFlatCoordinates.length = douglasPeuckerArray(this.flatCoordinates, 0, this.ends_, this.stride, squaredTolerance, simplifiedFlatCoordinates, 0, simplifiedEnds);
      return new MultiLineString2(simplifiedFlatCoordinates, GeometryLayout_default.XY, simplifiedEnds);
    };
    MultiLineString2.prototype.getType = function() {
      return GeometryType_default.MULTI_LINE_STRING;
    };
    MultiLineString2.prototype.intersectsExtent = function(extent) {
      return intersectsLineStringArray(this.flatCoordinates, 0, this.ends_, this.stride, extent);
    };
    MultiLineString2.prototype.setCoordinates = function(coordinates, opt_layout) {
      this.setLayout(opt_layout, coordinates, 2);
      if (!this.flatCoordinates) {
        this.flatCoordinates = [];
      }
      var ends = deflateCoordinatesArray(this.flatCoordinates, 0, coordinates, this.stride, this.ends_);
      this.flatCoordinates.length = ends.length === 0 ? 0 : ends[ends.length - 1];
      this.changed();
    };
    return MultiLineString2;
  }(SimpleGeometry_default)
);
var MultiLineString_default = MultiLineString;

// node_modules/ol/geom/MultiPoint.js
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
var MultiPoint = (
  /** @class */
  function(_super) {
    __extends20(MultiPoint2, _super);
    function MultiPoint2(coordinates, opt_layout) {
      var _this = _super.call(this) || this;
      if (opt_layout && !Array.isArray(coordinates[0])) {
        _this.setFlatCoordinates(
          opt_layout,
          /** @type {Array<number>} */
          coordinates
        );
      } else {
        _this.setCoordinates(
          /** @type {Array<import("../coordinate.js").Coordinate>} */
          coordinates,
          opt_layout
        );
      }
      return _this;
    }
    MultiPoint2.prototype.appendPoint = function(point) {
      if (!this.flatCoordinates) {
        this.flatCoordinates = point.getFlatCoordinates().slice();
      } else {
        extend(this.flatCoordinates, point.getFlatCoordinates());
      }
      this.changed();
    };
    MultiPoint2.prototype.clone = function() {
      var multiPoint = new MultiPoint2(this.flatCoordinates.slice(), this.layout);
      multiPoint.applyProperties(this);
      return multiPoint;
    };
    MultiPoint2.prototype.closestPointXY = function(x, y, closestPoint, minSquaredDistance) {
      if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
        return minSquaredDistance;
      }
      var flatCoordinates = this.flatCoordinates;
      var stride = this.stride;
      for (var i = 0, ii = flatCoordinates.length; i < ii; i += stride) {
        var squaredDistance3 = squaredDistance(x, y, flatCoordinates[i], flatCoordinates[i + 1]);
        if (squaredDistance3 < minSquaredDistance) {
          minSquaredDistance = squaredDistance3;
          for (var j = 0; j < stride; ++j) {
            closestPoint[j] = flatCoordinates[i + j];
          }
          closestPoint.length = stride;
        }
      }
      return minSquaredDistance;
    };
    MultiPoint2.prototype.getCoordinates = function() {
      return inflateCoordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
    };
    MultiPoint2.prototype.getPoint = function(index) {
      var n = !this.flatCoordinates ? 0 : this.flatCoordinates.length / this.stride;
      if (index < 0 || n <= index) {
        return null;
      }
      return new Point_default(this.flatCoordinates.slice(index * this.stride, (index + 1) * this.stride), this.layout);
    };
    MultiPoint2.prototype.getPoints = function() {
      var flatCoordinates = this.flatCoordinates;
      var layout = this.layout;
      var stride = this.stride;
      var points = [];
      for (var i = 0, ii = flatCoordinates.length; i < ii; i += stride) {
        var point = new Point_default(flatCoordinates.slice(i, i + stride), layout);
        points.push(point);
      }
      return points;
    };
    MultiPoint2.prototype.getType = function() {
      return GeometryType_default.MULTI_POINT;
    };
    MultiPoint2.prototype.intersectsExtent = function(extent) {
      var flatCoordinates = this.flatCoordinates;
      var stride = this.stride;
      for (var i = 0, ii = flatCoordinates.length; i < ii; i += stride) {
        var x = flatCoordinates[i];
        var y = flatCoordinates[i + 1];
        if (containsXY(extent, x, y)) {
          return true;
        }
      }
      return false;
    };
    MultiPoint2.prototype.setCoordinates = function(coordinates, opt_layout) {
      this.setLayout(opt_layout, coordinates, 1);
      if (!this.flatCoordinates) {
        this.flatCoordinates = [];
      }
      this.flatCoordinates.length = deflateCoordinates(this.flatCoordinates, 0, coordinates, this.stride);
      this.changed();
    };
    return MultiPoint2;
  }(SimpleGeometry_default)
);
var MultiPoint_default = MultiPoint;

// node_modules/ol/geom/flat/center.js
function linearRingss2(flatCoordinates, offset, endss, stride) {
  var flatCenters = [];
  var extent = createEmpty();
  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];
    extent = createOrUpdateFromFlatCoordinates(flatCoordinates, offset, ends[0], stride);
    flatCenters.push((extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2);
    offset = ends[ends.length - 1];
  }
  return flatCenters;
}

// node_modules/ol/geom/MultiPolygon.js
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
var MultiPolygon = (
  /** @class */
  function(_super) {
    __extends21(MultiPolygon2, _super);
    function MultiPolygon2(coordinates, opt_layout, opt_endss) {
      var _this = _super.call(this) || this;
      _this.endss_ = [];
      _this.flatInteriorPointsRevision_ = -1;
      _this.flatInteriorPoints_ = null;
      _this.maxDelta_ = -1;
      _this.maxDeltaRevision_ = -1;
      _this.orientedRevision_ = -1;
      _this.orientedFlatCoordinates_ = null;
      if (!opt_endss && !Array.isArray(coordinates[0])) {
        var layout = _this.getLayout();
        var polygons = (
          /** @type {Array<Polygon>} */
          coordinates
        );
        var flatCoordinates = [];
        var endss = [];
        for (var i = 0, ii = polygons.length; i < ii; ++i) {
          var polygon = polygons[i];
          if (i === 0) {
            layout = polygon.getLayout();
          }
          var offset = flatCoordinates.length;
          var ends = polygon.getEnds();
          for (var j = 0, jj = ends.length; j < jj; ++j) {
            ends[j] += offset;
          }
          extend(flatCoordinates, polygon.getFlatCoordinates());
          endss.push(ends);
        }
        opt_layout = layout;
        coordinates = flatCoordinates;
        opt_endss = endss;
      }
      if (opt_layout !== void 0 && opt_endss) {
        _this.setFlatCoordinates(
          opt_layout,
          /** @type {Array<number>} */
          coordinates
        );
        _this.endss_ = opt_endss;
      } else {
        _this.setCoordinates(
          /** @type {Array<Array<Array<import("../coordinate.js").Coordinate>>>} */
          coordinates,
          opt_layout
        );
      }
      return _this;
    }
    MultiPolygon2.prototype.appendPolygon = function(polygon) {
      var ends;
      if (!this.flatCoordinates) {
        this.flatCoordinates = polygon.getFlatCoordinates().slice();
        ends = polygon.getEnds().slice();
        this.endss_.push();
      } else {
        var offset = this.flatCoordinates.length;
        extend(this.flatCoordinates, polygon.getFlatCoordinates());
        ends = polygon.getEnds().slice();
        for (var i = 0, ii = ends.length; i < ii; ++i) {
          ends[i] += offset;
        }
      }
      this.endss_.push(ends);
      this.changed();
    };
    MultiPolygon2.prototype.clone = function() {
      var len = this.endss_.length;
      var newEndss = new Array(len);
      for (var i = 0; i < len; ++i) {
        newEndss[i] = this.endss_[i].slice();
      }
      var multiPolygon = new MultiPolygon2(this.flatCoordinates.slice(), this.layout, newEndss);
      multiPolygon.applyProperties(this);
      return multiPolygon;
    };
    MultiPolygon2.prototype.closestPointXY = function(x, y, closestPoint, minSquaredDistance) {
      if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
        return minSquaredDistance;
      }
      if (this.maxDeltaRevision_ != this.getRevision()) {
        this.maxDelta_ = Math.sqrt(multiArrayMaxSquaredDelta(this.flatCoordinates, 0, this.endss_, this.stride, 0));
        this.maxDeltaRevision_ = this.getRevision();
      }
      return assignClosestMultiArrayPoint(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, this.maxDelta_, true, x, y, closestPoint, minSquaredDistance);
    };
    MultiPolygon2.prototype.containsXY = function(x, y) {
      return linearRingssContainsXY(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, x, y);
    };
    MultiPolygon2.prototype.getArea = function() {
      return linearRingss(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride);
    };
    MultiPolygon2.prototype.getCoordinates = function(opt_right) {
      var flatCoordinates;
      if (opt_right !== void 0) {
        flatCoordinates = this.getOrientedFlatCoordinates().slice();
        orientLinearRingsArray(flatCoordinates, 0, this.endss_, this.stride, opt_right);
      } else {
        flatCoordinates = this.flatCoordinates;
      }
      return inflateMultiCoordinatesArray(flatCoordinates, 0, this.endss_, this.stride);
    };
    MultiPolygon2.prototype.getEndss = function() {
      return this.endss_;
    };
    MultiPolygon2.prototype.getFlatInteriorPoints = function() {
      if (this.flatInteriorPointsRevision_ != this.getRevision()) {
        var flatCenters = linearRingss2(this.flatCoordinates, 0, this.endss_, this.stride);
        this.flatInteriorPoints_ = getInteriorPointsOfMultiArray(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, flatCenters);
        this.flatInteriorPointsRevision_ = this.getRevision();
      }
      return this.flatInteriorPoints_;
    };
    MultiPolygon2.prototype.getInteriorPoints = function() {
      return new MultiPoint_default(this.getFlatInteriorPoints().slice(), GeometryLayout_default.XYM);
    };
    MultiPolygon2.prototype.getOrientedFlatCoordinates = function() {
      if (this.orientedRevision_ != this.getRevision()) {
        var flatCoordinates = this.flatCoordinates;
        if (linearRingssAreOriented(flatCoordinates, 0, this.endss_, this.stride)) {
          this.orientedFlatCoordinates_ = flatCoordinates;
        } else {
          this.orientedFlatCoordinates_ = flatCoordinates.slice();
          this.orientedFlatCoordinates_.length = orientLinearRingsArray(this.orientedFlatCoordinates_, 0, this.endss_, this.stride);
        }
        this.orientedRevision_ = this.getRevision();
      }
      return this.orientedFlatCoordinates_;
    };
    MultiPolygon2.prototype.getSimplifiedGeometryInternal = function(squaredTolerance) {
      var simplifiedFlatCoordinates = [];
      var simplifiedEndss = [];
      simplifiedFlatCoordinates.length = quantizeMultiArray(this.flatCoordinates, 0, this.endss_, this.stride, Math.sqrt(squaredTolerance), simplifiedFlatCoordinates, 0, simplifiedEndss);
      return new MultiPolygon2(simplifiedFlatCoordinates, GeometryLayout_default.XY, simplifiedEndss);
    };
    MultiPolygon2.prototype.getPolygon = function(index) {
      if (index < 0 || this.endss_.length <= index) {
        return null;
      }
      var offset;
      if (index === 0) {
        offset = 0;
      } else {
        var prevEnds = this.endss_[index - 1];
        offset = prevEnds[prevEnds.length - 1];
      }
      var ends = this.endss_[index].slice();
      var end = ends[ends.length - 1];
      if (offset !== 0) {
        for (var i = 0, ii = ends.length; i < ii; ++i) {
          ends[i] -= offset;
        }
      }
      return new Polygon_default(this.flatCoordinates.slice(offset, end), this.layout, ends);
    };
    MultiPolygon2.prototype.getPolygons = function() {
      var layout = this.layout;
      var flatCoordinates = this.flatCoordinates;
      var endss = this.endss_;
      var polygons = [];
      var offset = 0;
      for (var i = 0, ii = endss.length; i < ii; ++i) {
        var ends = endss[i].slice();
        var end = ends[ends.length - 1];
        if (offset !== 0) {
          for (var j = 0, jj = ends.length; j < jj; ++j) {
            ends[j] -= offset;
          }
        }
        var polygon = new Polygon_default(flatCoordinates.slice(offset, end), layout, ends);
        polygons.push(polygon);
        offset = end;
      }
      return polygons;
    };
    MultiPolygon2.prototype.getType = function() {
      return GeometryType_default.MULTI_POLYGON;
    };
    MultiPolygon2.prototype.intersectsExtent = function(extent) {
      return intersectsLinearRingMultiArray(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, extent);
    };
    MultiPolygon2.prototype.setCoordinates = function(coordinates, opt_layout) {
      this.setLayout(opt_layout, coordinates, 3);
      if (!this.flatCoordinates) {
        this.flatCoordinates = [];
      }
      var endss = deflateMultiCoordinatesArray(this.flatCoordinates, 0, coordinates, this.stride, this.endss_);
      if (endss.length === 0) {
        this.flatCoordinates.length = 0;
      } else {
        var lastEnds = endss[endss.length - 1];
        this.flatCoordinates.length = lastEnds.length === 0 ? 0 : lastEnds[lastEnds.length - 1];
      }
      this.changed();
    };
    return MultiPolygon2;
  }(SimpleGeometry_default)
);
var MultiPolygon_default = MultiPolygon;

// node_modules/ol/interaction/Draw.js
var __extends22 = /* @__PURE__ */ function() {
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
var Mode2 = {
  POINT: "Point",
  LINE_STRING: "LineString",
  POLYGON: "Polygon",
  CIRCLE: "Circle"
};
var DrawEventType = {
  /**
   * Triggered upon feature draw start
   * @event DrawEvent#drawstart
   * @api
   */
  DRAWSTART: "drawstart",
  /**
   * Triggered upon feature draw end
   * @event DrawEvent#drawend
   * @api
   */
  DRAWEND: "drawend",
  /**
   * Triggered upon feature draw abortion
   * @event DrawEvent#drawabort
   * @api
   */
  DRAWABORT: "drawabort"
};
var DrawEvent = (
  /** @class */
  function(_super) {
    __extends22(DrawEvent2, _super);
    function DrawEvent2(type, feature) {
      var _this = _super.call(this, type) || this;
      _this.feature = feature;
      return _this;
    }
    return DrawEvent2;
  }(Event_default)
);
var Draw = (
  /** @class */
  function(_super) {
    __extends22(Draw2, _super);
    function Draw2(options) {
      var _this = this;
      var pointerOptions = (
        /** @type {import("./Pointer.js").Options} */
        options
      );
      if (!pointerOptions.stopDown) {
        pointerOptions.stopDown = FALSE;
      }
      _this = _super.call(this, pointerOptions) || this;
      _this.shouldHandle_ = false;
      _this.downPx_ = null;
      _this.downTimeout_;
      _this.lastDragTime_;
      _this.pointerType_;
      _this.freehand_ = false;
      _this.source_ = options.source ? options.source : null;
      _this.features_ = options.features ? options.features : null;
      _this.snapTolerance_ = options.snapTolerance ? options.snapTolerance : 12;
      _this.type_ = /** @type {import("../geom/GeometryType.js").default} */
      options.type;
      _this.mode_ = getMode(_this.type_);
      _this.stopClick_ = !!options.stopClick;
      _this.minPoints_ = options.minPoints ? options.minPoints : _this.mode_ === Mode2.POLYGON ? 3 : 2;
      _this.maxPoints_ = _this.mode_ === Mode2.CIRCLE ? 2 : options.maxPoints ? options.maxPoints : Infinity;
      _this.finishCondition_ = options.finishCondition ? options.finishCondition : TRUE;
      var geometryFunction = options.geometryFunction;
      if (!geometryFunction) {
        var mode_1 = _this.mode_;
        if (mode_1 === Mode2.CIRCLE) {
          geometryFunction = function(coordinates, geometry, projection) {
            var circle = geometry ? (
              /** @type {Circle} */
              geometry
            ) : new Circle_default([NaN, NaN]);
            var center = fromUserCoordinate(coordinates[0], projection);
            var squaredLength = squaredDistance2(center, fromUserCoordinate(coordinates[coordinates.length - 1], projection));
            circle.setCenterAndRadius(center, Math.sqrt(squaredLength));
            var userProjection = getUserProjection();
            if (userProjection) {
              circle.transform(projection, userProjection);
            }
            return circle;
          };
        } else {
          var Constructor_1;
          if (mode_1 === Mode2.POINT) {
            Constructor_1 = Point_default;
          } else if (mode_1 === Mode2.LINE_STRING) {
            Constructor_1 = LineString_default;
          } else if (mode_1 === Mode2.POLYGON) {
            Constructor_1 = Polygon_default;
          }
          geometryFunction = function(coordinates, geometry, projection) {
            if (geometry) {
              if (mode_1 === Mode2.POLYGON) {
                if (coordinates[0].length) {
                  geometry.setCoordinates([coordinates[0].concat([coordinates[0][0]])]);
                } else {
                  geometry.setCoordinates([]);
                }
              } else {
                geometry.setCoordinates(coordinates);
              }
            } else {
              geometry = new Constructor_1(coordinates);
            }
            return geometry;
          };
        }
      }
      _this.geometryFunction_ = geometryFunction;
      _this.dragVertexDelay_ = options.dragVertexDelay !== void 0 ? options.dragVertexDelay : 500;
      _this.finishCoordinate_ = null;
      _this.sketchFeature_ = null;
      _this.sketchPoint_ = null;
      _this.sketchCoords_ = null;
      _this.sketchLine_ = null;
      _this.sketchLineCoords_ = null;
      _this.squaredClickTolerance_ = options.clickTolerance ? options.clickTolerance * options.clickTolerance : 36;
      _this.overlay_ = new Vector_default({
        source: new Vector_default2({
          useSpatialIndex: false,
          wrapX: options.wrapX ? options.wrapX : false
        }),
        style: options.style ? options.style : getDefaultStyleFunction(),
        updateWhileInteracting: true
      });
      _this.geometryName_ = options.geometryName;
      _this.condition_ = options.condition ? options.condition : noModifierKeys;
      _this.freehandCondition_;
      if (options.freehand) {
        _this.freehandCondition_ = always;
      } else {
        _this.freehandCondition_ = options.freehandCondition ? options.freehandCondition : shiftKeyOnly;
      }
      _this.addEventListener(getChangeEventType(Property_default.ACTIVE), _this.updateState_);
      return _this;
    }
    Draw2.prototype.setMap = function(map) {
      _super.prototype.setMap.call(this, map);
      this.updateState_();
    };
    Draw2.prototype.getOverlay = function() {
      return this.overlay_;
    };
    Draw2.prototype.handleEvent = function(event) {
      if (event.originalEvent.type === EventType_default.CONTEXTMENU) {
        event.originalEvent.preventDefault();
      }
      this.freehand_ = this.mode_ !== Mode2.POINT && this.freehandCondition_(event);
      var move = event.type === MapBrowserEventType_default.POINTERMOVE;
      var pass = true;
      if (!this.freehand_ && this.lastDragTime_ && event.type === MapBrowserEventType_default.POINTERDRAG) {
        var now = Date.now();
        if (now - this.lastDragTime_ >= this.dragVertexDelay_) {
          this.downPx_ = event.pixel;
          this.shouldHandle_ = !this.freehand_;
          move = true;
        } else {
          this.lastDragTime_ = void 0;
        }
        if (this.shouldHandle_ && this.downTimeout_ !== void 0) {
          clearTimeout(this.downTimeout_);
          this.downTimeout_ = void 0;
        }
      }
      if (this.freehand_ && event.type === MapBrowserEventType_default.POINTERDRAG && this.sketchFeature_ !== null) {
        this.addToDrawing_(event.coordinate);
        pass = false;
      } else if (this.freehand_ && event.type === MapBrowserEventType_default.POINTERDOWN) {
        pass = false;
      } else if (move && this.getPointerCount() < 2) {
        pass = event.type === MapBrowserEventType_default.POINTERMOVE;
        if (pass && this.freehand_) {
          this.handlePointerMove_(event);
          if (this.shouldHandle_) {
            event.originalEvent.preventDefault();
          }
        } else if (event.originalEvent.pointerType === "mouse" || event.type === MapBrowserEventType_default.POINTERDRAG && this.downTimeout_ === void 0) {
          this.handlePointerMove_(event);
        }
      } else if (event.type === MapBrowserEventType_default.DBLCLICK) {
        pass = false;
      }
      return _super.prototype.handleEvent.call(this, event) && pass;
    };
    Draw2.prototype.handleDownEvent = function(event) {
      this.shouldHandle_ = !this.freehand_;
      if (this.freehand_) {
        this.downPx_ = event.pixel;
        if (!this.finishCoordinate_) {
          this.startDrawing_(event.coordinate);
        }
        return true;
      } else if (this.condition_(event)) {
        this.lastDragTime_ = Date.now();
        this.downTimeout_ = setTimeout(function() {
          this.handlePointerMove_(new MapBrowserEvent_default(MapBrowserEventType_default.POINTERMOVE, event.map, event.originalEvent, false, event.frameState));
        }.bind(this), this.dragVertexDelay_);
        this.downPx_ = event.pixel;
        return true;
      } else {
        this.lastDragTime_ = void 0;
        return false;
      }
    };
    Draw2.prototype.handleUpEvent = function(event) {
      var pass = true;
      if (this.getPointerCount() === 0) {
        if (this.downTimeout_) {
          clearTimeout(this.downTimeout_);
          this.downTimeout_ = void 0;
        }
        this.handlePointerMove_(event);
        if (this.shouldHandle_) {
          switch (true) {
            case !this.finishCoordinate_:
              this.startDrawing_(event.coordinate);
              if (this.mode_ !== Mode2.POINT) {
                break;
              }
            case (this.freehand_ || this.atFinish_(event.pixel) && this.finishCondition_(event)):
              this.finishDrawing();
              break;
            case !this.freehand_:
              this.addToDrawing_(event.coordinate);
              break;
            default:
              break;
          }
          pass = false;
        } else if (this.freehand_) {
          this.abortDrawing();
        }
      }
      if (!pass && this.stopClick_) {
        event.originalEvent.stopPropagation();
      }
      return pass;
    };
    Draw2.prototype.handlePointerMove_ = function(event) {
      this.pointerType_ = event.originalEvent.pointerType;
      if (this.downPx_ && (!this.freehand_ && this.shouldHandle_ || this.freehand_ && !this.shouldHandle_)) {
        var downPx = this.downPx_;
        var clickPx = event.pixel;
        var dx = downPx[0] - clickPx[0];
        var dy = downPx[1] - clickPx[1];
        var squaredDistance3 = dx * dx + dy * dy;
        this.shouldHandle_ = this.freehand_ ? squaredDistance3 > this.squaredClickTolerance_ : squaredDistance3 <= this.squaredClickTolerance_;
        if (!this.shouldHandle_) {
          return;
        }
      }
      if (this.finishCoordinate_) {
        this.modifyDrawing_(event.coordinate);
      } else {
        this.createOrUpdateSketchPoint_(event);
      }
    };
    Draw2.prototype.atFinish_ = function(pixel) {
      var at = false;
      if (this.sketchFeature_) {
        var potentiallyDone = false;
        var potentiallyFinishCoordinates = [this.finishCoordinate_];
        var mode = this.mode_;
        if (mode === Mode2.POINT) {
          at = true;
        } else if (mode === Mode2.CIRCLE) {
          at = this.sketchCoords_.length === 2;
        } else if (mode === Mode2.LINE_STRING) {
          potentiallyDone = this.sketchCoords_.length > this.minPoints_;
        } else if (mode === Mode2.POLYGON) {
          var sketchCoords = (
            /** @type {PolyCoordType} */
            this.sketchCoords_
          );
          potentiallyDone = sketchCoords[0].length > this.minPoints_;
          potentiallyFinishCoordinates = [sketchCoords[0][0], sketchCoords[0][sketchCoords[0].length - 2]];
        }
        if (potentiallyDone) {
          var map = this.getMap();
          for (var i = 0, ii = potentiallyFinishCoordinates.length; i < ii; i++) {
            var finishCoordinate = potentiallyFinishCoordinates[i];
            var finishPixel = map.getPixelFromCoordinate(finishCoordinate);
            var dx = pixel[0] - finishPixel[0];
            var dy = pixel[1] - finishPixel[1];
            var snapTolerance = this.freehand_ ? 1 : this.snapTolerance_;
            at = Math.sqrt(dx * dx + dy * dy) <= snapTolerance;
            if (at) {
              this.finishCoordinate_ = finishCoordinate;
              break;
            }
          }
        }
      }
      return at;
    };
    Draw2.prototype.createOrUpdateSketchPoint_ = function(event) {
      var coordinates = event.coordinate.slice();
      if (!this.sketchPoint_) {
        this.sketchPoint_ = new Feature_default(new Point_default(coordinates));
        this.updateSketchFeatures_();
      } else {
        var sketchPointGeom = this.sketchPoint_.getGeometry();
        sketchPointGeom.setCoordinates(coordinates);
      }
    };
    Draw2.prototype.createOrUpdateCustomSketchLine_ = function(geometry) {
      if (!this.sketchLine_) {
        this.sketchLine_ = new Feature_default();
      }
      var ring = geometry.getLinearRing(0);
      var sketchLineGeom = this.sketchLine_.getGeometry();
      if (!sketchLineGeom) {
        sketchLineGeom = new LineString_default(ring.getFlatCoordinates(), ring.getLayout());
        this.sketchLine_.setGeometry(sketchLineGeom);
      } else {
        sketchLineGeom.setFlatCoordinates(ring.getLayout(), ring.getFlatCoordinates());
        sketchLineGeom.changed();
      }
    };
    Draw2.prototype.startDrawing_ = function(start) {
      var projection = this.getMap().getView().getProjection();
      this.finishCoordinate_ = start;
      if (this.mode_ === Mode2.POINT) {
        this.sketchCoords_ = start.slice();
      } else if (this.mode_ === Mode2.POLYGON) {
        this.sketchCoords_ = [[start.slice(), start.slice()]];
        this.sketchLineCoords_ = this.sketchCoords_[0];
      } else {
        this.sketchCoords_ = [start.slice(), start.slice()];
      }
      if (this.sketchLineCoords_) {
        this.sketchLine_ = new Feature_default(new LineString_default(this.sketchLineCoords_));
      }
      var geometry = this.geometryFunction_(this.sketchCoords_, void 0, projection);
      this.sketchFeature_ = new Feature_default();
      if (this.geometryName_) {
        this.sketchFeature_.setGeometryName(this.geometryName_);
      }
      this.sketchFeature_.setGeometry(geometry);
      this.updateSketchFeatures_();
      this.dispatchEvent(new DrawEvent(DrawEventType.DRAWSTART, this.sketchFeature_));
    };
    Draw2.prototype.modifyDrawing_ = function(coordinate) {
      var map = this.getMap();
      var geometry = this.sketchFeature_.getGeometry();
      var projection = map.getView().getProjection();
      var coordinates, last;
      if (this.mode_ === Mode2.POINT) {
        last = this.sketchCoords_;
      } else if (this.mode_ === Mode2.POLYGON) {
        coordinates = /** @type {PolyCoordType} */
        this.sketchCoords_[0];
        last = coordinates[coordinates.length - 1];
        if (this.atFinish_(map.getPixelFromCoordinate(coordinate))) {
          coordinate = this.finishCoordinate_.slice();
        }
      } else {
        coordinates = this.sketchCoords_;
        last = coordinates[coordinates.length - 1];
      }
      last[0] = coordinate[0];
      last[1] = coordinate[1];
      this.geometryFunction_(
        /** @type {!LineCoordType} */
        this.sketchCoords_,
        geometry,
        projection
      );
      if (this.sketchPoint_) {
        var sketchPointGeom = this.sketchPoint_.getGeometry();
        sketchPointGeom.setCoordinates(coordinate);
      }
      if (geometry.getType() === GeometryType_default.POLYGON && this.mode_ !== Mode2.POLYGON) {
        this.createOrUpdateCustomSketchLine_(
          /** @type {Polygon} */
          geometry
        );
      } else if (this.sketchLineCoords_) {
        var sketchLineGeom = this.sketchLine_.getGeometry();
        sketchLineGeom.setCoordinates(this.sketchLineCoords_);
      }
      this.updateSketchFeatures_();
    };
    Draw2.prototype.addToDrawing_ = function(coordinate) {
      var geometry = this.sketchFeature_.getGeometry();
      var projection = this.getMap().getView().getProjection();
      var done;
      var coordinates;
      var mode = this.mode_;
      if (mode === Mode2.LINE_STRING || mode === Mode2.CIRCLE) {
        this.finishCoordinate_ = coordinate.slice();
        coordinates = /** @type {LineCoordType} */
        this.sketchCoords_;
        if (coordinates.length >= this.maxPoints_) {
          if (this.freehand_) {
            coordinates.pop();
          } else {
            done = true;
          }
        }
        coordinates.push(coordinate.slice());
        this.geometryFunction_(coordinates, geometry, projection);
      } else if (mode === Mode2.POLYGON) {
        coordinates = /** @type {PolyCoordType} */
        this.sketchCoords_[0];
        if (coordinates.length >= this.maxPoints_) {
          if (this.freehand_) {
            coordinates.pop();
          } else {
            done = true;
          }
        }
        coordinates.push(coordinate.slice());
        if (done) {
          this.finishCoordinate_ = coordinates[0];
        }
        this.geometryFunction_(this.sketchCoords_, geometry, projection);
      }
      this.updateSketchFeatures_();
      if (done) {
        this.finishDrawing();
      }
    };
    Draw2.prototype.removeLastPoint = function() {
      if (!this.sketchFeature_) {
        return;
      }
      var geometry = this.sketchFeature_.getGeometry();
      var projection = this.getMap().getView().getProjection();
      var coordinates;
      var mode = this.mode_;
      if (mode === Mode2.LINE_STRING || mode === Mode2.CIRCLE) {
        coordinates = /** @type {LineCoordType} */
        this.sketchCoords_;
        coordinates.splice(-2, 1);
        if (coordinates.length >= 2) {
          this.finishCoordinate_ = coordinates[coordinates.length - 2].slice();
          var finishCoordinate = this.finishCoordinate_.slice();
          coordinates[coordinates.length - 1] = finishCoordinate;
          this.sketchPoint_.setGeometry(new Point_default(finishCoordinate));
        }
        this.geometryFunction_(coordinates, geometry, projection);
        if (geometry.getType() === GeometryType_default.POLYGON && this.sketchLine_) {
          this.createOrUpdateCustomSketchLine_(
            /** @type {Polygon} */
            geometry
          );
        }
      } else if (mode === Mode2.POLYGON) {
        coordinates = /** @type {PolyCoordType} */
        this.sketchCoords_[0];
        coordinates.splice(-2, 1);
        var sketchLineGeom = this.sketchLine_.getGeometry();
        if (coordinates.length >= 2) {
          var finishCoordinate = coordinates[coordinates.length - 2].slice();
          coordinates[coordinates.length - 1] = finishCoordinate;
          this.sketchPoint_.setGeometry(new Point_default(finishCoordinate));
        }
        sketchLineGeom.setCoordinates(coordinates);
        this.geometryFunction_(this.sketchCoords_, geometry, projection);
      }
      if (coordinates.length === 1) {
        this.abortDrawing();
      }
      this.updateSketchFeatures_();
    };
    Draw2.prototype.finishDrawing = function() {
      var sketchFeature = this.abortDrawing_();
      if (!sketchFeature) {
        return;
      }
      var coordinates = this.sketchCoords_;
      var geometry = sketchFeature.getGeometry();
      var projection = this.getMap().getView().getProjection();
      if (this.mode_ === Mode2.LINE_STRING) {
        coordinates.pop();
        this.geometryFunction_(coordinates, geometry, projection);
      } else if (this.mode_ === Mode2.POLYGON) {
        coordinates[0].pop();
        this.geometryFunction_(coordinates, geometry, projection);
        coordinates = geometry.getCoordinates();
      }
      if (this.type_ === GeometryType_default.MULTI_POINT) {
        sketchFeature.setGeometry(new MultiPoint_default([
          /** @type {PointCoordType} */
          coordinates
        ]));
      } else if (this.type_ === GeometryType_default.MULTI_LINE_STRING) {
        sketchFeature.setGeometry(new MultiLineString_default([
          /** @type {LineCoordType} */
          coordinates
        ]));
      } else if (this.type_ === GeometryType_default.MULTI_POLYGON) {
        sketchFeature.setGeometry(new MultiPolygon_default([
          /** @type {PolyCoordType} */
          coordinates
        ]));
      }
      this.dispatchEvent(new DrawEvent(DrawEventType.DRAWEND, sketchFeature));
      if (this.features_) {
        this.features_.push(sketchFeature);
      }
      if (this.source_) {
        this.source_.addFeature(sketchFeature);
      }
    };
    Draw2.prototype.abortDrawing_ = function() {
      this.finishCoordinate_ = null;
      var sketchFeature = this.sketchFeature_;
      this.sketchFeature_ = null;
      this.sketchPoint_ = null;
      this.sketchLine_ = null;
      this.overlay_.getSource().clear(true);
      return sketchFeature;
    };
    Draw2.prototype.abortDrawing = function() {
      var sketchFeature = this.abortDrawing_();
      if (sketchFeature) {
        this.dispatchEvent(new DrawEvent(DrawEventType.DRAWABORT, sketchFeature));
      }
    };
    Draw2.prototype.appendCoordinates = function(coordinates) {
      var mode = this.mode_;
      var newDrawing = !this.sketchFeature_;
      if (newDrawing) {
        this.startDrawing_(coordinates[0]);
      }
      var sketchCoords;
      if (mode === Mode2.LINE_STRING || mode === Mode2.CIRCLE) {
        sketchCoords = /** @type {LineCoordType} */
        this.sketchCoords_;
      } else if (mode === Mode2.POLYGON) {
        sketchCoords = this.sketchCoords_ && this.sketchCoords_.length ? (
          /** @type {PolyCoordType} */
          this.sketchCoords_[0]
        ) : [];
      } else {
        return;
      }
      if (newDrawing) {
        sketchCoords.shift();
      }
      sketchCoords.pop();
      for (var i = 0; i < coordinates.length; i++) {
        this.addToDrawing_(coordinates[i]);
      }
      var ending = coordinates[coordinates.length - 1];
      this.addToDrawing_(ending);
      this.modifyDrawing_(ending);
    };
    Draw2.prototype.extend = function(feature) {
      var geometry = feature.getGeometry();
      var lineString = geometry;
      this.sketchFeature_ = feature;
      this.sketchCoords_ = lineString.getCoordinates();
      var last = this.sketchCoords_[this.sketchCoords_.length - 1];
      this.finishCoordinate_ = last.slice();
      this.sketchCoords_.push(last.slice());
      this.sketchPoint_ = new Feature_default(new Point_default(last));
      this.updateSketchFeatures_();
      this.dispatchEvent(new DrawEvent(DrawEventType.DRAWSTART, this.sketchFeature_));
    };
    Draw2.prototype.updateSketchFeatures_ = function() {
      var sketchFeatures = [];
      if (this.sketchFeature_) {
        sketchFeatures.push(this.sketchFeature_);
      }
      if (this.sketchLine_) {
        sketchFeatures.push(this.sketchLine_);
      }
      if (this.sketchPoint_) {
        sketchFeatures.push(this.sketchPoint_);
      }
      var overlaySource = this.overlay_.getSource();
      overlaySource.clear(true);
      overlaySource.addFeatures(sketchFeatures);
    };
    Draw2.prototype.updateState_ = function() {
      var map = this.getMap();
      var active = this.getActive();
      if (!map || !active) {
        this.abortDrawing();
      }
      this.overlay_.setMap(active ? map : null);
    };
    return Draw2;
  }(Pointer_default)
);
function getDefaultStyleFunction() {
  var styles = createEditingStyle();
  return function(feature, resolution) {
    return styles[feature.getGeometry().getType()];
  };
}
function getMode(type) {
  var mode;
  if (type === GeometryType_default.POINT || type === GeometryType_default.MULTI_POINT) {
    mode = Mode2.POINT;
  } else if (type === GeometryType_default.LINE_STRING || type === GeometryType_default.MULTI_LINE_STRING) {
    mode = Mode2.LINE_STRING;
  } else if (type === GeometryType_default.POLYGON || type === GeometryType_default.MULTI_POLYGON) {
    mode = Mode2.POLYGON;
  } else if (type === GeometryType_default.CIRCLE) {
    mode = Mode2.CIRCLE;
  }
  return (
    /** @type {!Mode} */
    mode
  );
}

// node_modules/ol/interaction/Extent.js
var __extends23 = /* @__PURE__ */ function() {
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
var ExtentEventType = {
  /**
   * Triggered after the extent is changed
   * @event ExtentEvent#extentchanged
   * @api
   */
  EXTENTCHANGED: "extentchanged"
};
var ExtentEvent = (
  /** @class */
  function(_super) {
    __extends23(ExtentEvent2, _super);
    function ExtentEvent2(extent) {
      var _this = _super.call(this, ExtentEventType.EXTENTCHANGED) || this;
      _this.extent = extent;
      return _this;
    }
    return ExtentEvent2;
  }(Event_default)
);
var Extent = (
  /** @class */
  function(_super) {
    __extends23(Extent2, _super);
    function Extent2(opt_options) {
      var _this = this;
      var options = opt_options || {};
      _this = _super.call(
        this,
        /** @type {import("./Pointer.js").Options} */
        options
      ) || this;
      _this.condition_ = options.condition ? options.condition : always;
      _this.extent_ = null;
      _this.pointerHandler_ = null;
      _this.pixelTolerance_ = options.pixelTolerance !== void 0 ? options.pixelTolerance : 10;
      _this.snappedToVertex_ = false;
      _this.extentFeature_ = null;
      _this.vertexFeature_ = null;
      if (!opt_options) {
        opt_options = {};
      }
      _this.extentOverlay_ = new Vector_default({
        source: new Vector_default2({
          useSpatialIndex: false,
          wrapX: !!opt_options.wrapX
        }),
        style: opt_options.boxStyle ? opt_options.boxStyle : getDefaultExtentStyleFunction(),
        updateWhileAnimating: true,
        updateWhileInteracting: true
      });
      _this.vertexOverlay_ = new Vector_default({
        source: new Vector_default2({
          useSpatialIndex: false,
          wrapX: !!opt_options.wrapX
        }),
        style: opt_options.pointerStyle ? opt_options.pointerStyle : getDefaultPointerStyleFunction(),
        updateWhileAnimating: true,
        updateWhileInteracting: true
      });
      if (opt_options.extent) {
        _this.setExtent(opt_options.extent);
      }
      return _this;
    }
    Extent2.prototype.snapToVertex_ = function(pixel, map) {
      var pixelCoordinate = map.getCoordinateFromPixelInternal(pixel);
      var sortByDistance = function(a, b) {
        return squaredDistanceToSegment(pixelCoordinate, a) - squaredDistanceToSegment(pixelCoordinate, b);
      };
      var extent = this.getExtentInternal();
      if (extent) {
        var segments = getSegments(extent);
        segments.sort(sortByDistance);
        var closestSegment = segments[0];
        var vertex = closestOnSegment(pixelCoordinate, closestSegment);
        var vertexPixel = map.getPixelFromCoordinateInternal(vertex);
        if (distance(pixel, vertexPixel) <= this.pixelTolerance_) {
          var pixel1 = map.getPixelFromCoordinateInternal(closestSegment[0]);
          var pixel2 = map.getPixelFromCoordinateInternal(closestSegment[1]);
          var squaredDist1 = squaredDistance2(vertexPixel, pixel1);
          var squaredDist2 = squaredDistance2(vertexPixel, pixel2);
          var dist = Math.sqrt(Math.min(squaredDist1, squaredDist2));
          this.snappedToVertex_ = dist <= this.pixelTolerance_;
          if (this.snappedToVertex_) {
            vertex = squaredDist1 > squaredDist2 ? closestSegment[1] : closestSegment[0];
          }
          return vertex;
        }
      }
      return null;
    };
    Extent2.prototype.handlePointerMove_ = function(mapBrowserEvent) {
      var pixel = mapBrowserEvent.pixel;
      var map = mapBrowserEvent.map;
      var vertex = this.snapToVertex_(pixel, map);
      if (!vertex) {
        vertex = map.getCoordinateFromPixelInternal(pixel);
      }
      this.createOrUpdatePointerFeature_(vertex);
    };
    Extent2.prototype.createOrUpdateExtentFeature_ = function(extent) {
      var extentFeature = this.extentFeature_;
      if (!extentFeature) {
        if (!extent) {
          extentFeature = new Feature_default({});
        } else {
          extentFeature = new Feature_default(fromExtent(extent));
        }
        this.extentFeature_ = extentFeature;
        this.extentOverlay_.getSource().addFeature(extentFeature);
      } else {
        if (!extent) {
          extentFeature.setGeometry(void 0);
        } else {
          extentFeature.setGeometry(fromExtent(extent));
        }
      }
      return extentFeature;
    };
    Extent2.prototype.createOrUpdatePointerFeature_ = function(vertex) {
      var vertexFeature = this.vertexFeature_;
      if (!vertexFeature) {
        vertexFeature = new Feature_default(new Point_default(vertex));
        this.vertexFeature_ = vertexFeature;
        this.vertexOverlay_.getSource().addFeature(vertexFeature);
      } else {
        var geometry = vertexFeature.getGeometry();
        geometry.setCoordinates(vertex);
      }
      return vertexFeature;
    };
    Extent2.prototype.handleEvent = function(mapBrowserEvent) {
      if (!mapBrowserEvent.originalEvent || !this.condition_(mapBrowserEvent)) {
        return true;
      }
      if (mapBrowserEvent.type == MapBrowserEventType_default.POINTERMOVE && !this.handlingDownUpSequence) {
        this.handlePointerMove_(mapBrowserEvent);
      }
      _super.prototype.handleEvent.call(this, mapBrowserEvent);
      return false;
    };
    Extent2.prototype.handleDownEvent = function(mapBrowserEvent) {
      var pixel = mapBrowserEvent.pixel;
      var map = mapBrowserEvent.map;
      var extent = this.getExtentInternal();
      var vertex = this.snapToVertex_(pixel, map);
      var getOpposingPoint = function(point) {
        var x_ = null;
        var y_ = null;
        if (point[0] == extent[0]) {
          x_ = extent[2];
        } else if (point[0] == extent[2]) {
          x_ = extent[0];
        }
        if (point[1] == extent[1]) {
          y_ = extent[3];
        } else if (point[1] == extent[3]) {
          y_ = extent[1];
        }
        if (x_ !== null && y_ !== null) {
          return [x_, y_];
        }
        return null;
      };
      if (vertex && extent) {
        var x = vertex[0] == extent[0] || vertex[0] == extent[2] ? vertex[0] : null;
        var y = vertex[1] == extent[1] || vertex[1] == extent[3] ? vertex[1] : null;
        if (x !== null && y !== null) {
          this.pointerHandler_ = getPointHandler(getOpposingPoint(vertex));
        } else if (x !== null) {
          this.pointerHandler_ = getEdgeHandler(getOpposingPoint([x, extent[1]]), getOpposingPoint([x, extent[3]]));
        } else if (y !== null) {
          this.pointerHandler_ = getEdgeHandler(getOpposingPoint([extent[0], y]), getOpposingPoint([extent[2], y]));
        }
      } else {
        vertex = map.getCoordinateFromPixelInternal(pixel);
        this.setExtent([vertex[0], vertex[1], vertex[0], vertex[1]]);
        this.pointerHandler_ = getPointHandler(vertex);
      }
      return true;
    };
    Extent2.prototype.handleDragEvent = function(mapBrowserEvent) {
      if (this.pointerHandler_) {
        var pixelCoordinate = mapBrowserEvent.coordinate;
        this.setExtent(this.pointerHandler_(pixelCoordinate));
        this.createOrUpdatePointerFeature_(pixelCoordinate);
      }
    };
    Extent2.prototype.handleUpEvent = function(mapBrowserEvent) {
      this.pointerHandler_ = null;
      var extent = this.getExtentInternal();
      if (!extent || getArea(extent) === 0) {
        this.setExtent(null);
      }
      return false;
    };
    Extent2.prototype.setMap = function(map) {
      this.extentOverlay_.setMap(map);
      this.vertexOverlay_.setMap(map);
      _super.prototype.setMap.call(this, map);
    };
    Extent2.prototype.getExtent = function() {
      return toUserExtent(this.getExtentInternal(), this.getMap().getView().getProjection());
    };
    Extent2.prototype.getExtentInternal = function() {
      return this.extent_;
    };
    Extent2.prototype.setExtent = function(extent) {
      this.extent_ = extent ? extent : null;
      this.createOrUpdateExtentFeature_(extent);
      this.dispatchEvent(new ExtentEvent(this.extent_));
    };
    return Extent2;
  }(Pointer_default)
);
function getDefaultExtentStyleFunction() {
  var style = createEditingStyle();
  return function(feature, resolution) {
    return style[GeometryType_default.POLYGON];
  };
}
function getDefaultPointerStyleFunction() {
  var style = createEditingStyle();
  return function(feature, resolution) {
    return style[GeometryType_default.POINT];
  };
}
function getPointHandler(fixedPoint) {
  return function(point) {
    return boundingExtent([fixedPoint, point]);
  };
}
function getEdgeHandler(fixedP1, fixedP2) {
  if (fixedP1[0] == fixedP2[0]) {
    return function(point) {
      return boundingExtent([fixedP1, [point[0], fixedP2[1]]]);
    };
  } else if (fixedP1[1] == fixedP2[1]) {
    return function(point) {
      return boundingExtent([fixedP1, [fixedP2[0], point[1]]]);
    };
  } else {
    return null;
  }
}
function getSegments(extent) {
  return [[[extent[0], extent[1]], [extent[0], extent[3]]], [[extent[0], extent[3]], [extent[2], extent[3]]], [[extent[2], extent[3]], [extent[2], extent[1]]], [[extent[2], extent[1]], [extent[0], extent[1]]]];
}

// node_modules/ol/interaction/Modify.js
var __extends24 = /* @__PURE__ */ function() {
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
var CIRCLE_CENTER_INDEX = 0;
var CIRCLE_CIRCUMFERENCE_INDEX = 1;
var tempExtent = [0, 0, 0, 0];
var tempSegment = [];
var ModifyEventType = {
  /**
   * Triggered upon feature modification start
   * @event ModifyEvent#modifystart
   * @api
   */
  MODIFYSTART: "modifystart",
  /**
   * Triggered upon feature modification end
   * @event ModifyEvent#modifyend
   * @api
   */
  MODIFYEND: "modifyend"
};
var ModifyEvent = (
  /** @class */
  function(_super) {
    __extends24(ModifyEvent2, _super);
    function ModifyEvent2(type, features, MapBrowserEvent) {
      var _this = _super.call(this, type) || this;
      _this.features = features;
      _this.mapBrowserEvent = MapBrowserEvent;
      return _this;
    }
    return ModifyEvent2;
  }(Event_default)
);
var Modify = (
  /** @class */
  function(_super) {
    __extends24(Modify2, _super);
    function Modify2(options) {
      var _this = _super.call(
        this,
        /** @type {import("./Pointer.js").Options} */
        options
      ) || this;
      _this.boundHandleFeatureChange_ = _this.handleFeatureChange_.bind(_this);
      _this.condition_ = options.condition ? options.condition : primaryAction;
      _this.defaultDeleteCondition_ = function(mapBrowserEvent) {
        return altKeyOnly(mapBrowserEvent) && singleClick(mapBrowserEvent);
      };
      _this.deleteCondition_ = options.deleteCondition ? options.deleteCondition : _this.defaultDeleteCondition_;
      _this.insertVertexCondition_ = options.insertVertexCondition ? options.insertVertexCondition : always;
      _this.vertexFeature_ = null;
      _this.vertexSegments_ = null;
      _this.lastPixel_ = [0, 0];
      _this.ignoreNextSingleClick_ = false;
      _this.featuresBeingModified_ = null;
      _this.rBush_ = new RBush_default();
      _this.pixelTolerance_ = options.pixelTolerance !== void 0 ? options.pixelTolerance : 10;
      _this.snappedToVertex_ = false;
      _this.changingFeature_ = false;
      _this.dragSegments_ = [];
      _this.overlay_ = new Vector_default({
        source: new Vector_default2({
          useSpatialIndex: false,
          wrapX: !!options.wrapX
        }),
        style: options.style ? options.style : getDefaultStyleFunction2(),
        updateWhileAnimating: true,
        updateWhileInteracting: true
      });
      _this.SEGMENT_WRITERS_ = {
        "Point": _this.writePointGeometry_.bind(_this),
        "LineString": _this.writeLineStringGeometry_.bind(_this),
        "LinearRing": _this.writeLineStringGeometry_.bind(_this),
        "Polygon": _this.writePolygonGeometry_.bind(_this),
        "MultiPoint": _this.writeMultiPointGeometry_.bind(_this),
        "MultiLineString": _this.writeMultiLineStringGeometry_.bind(_this),
        "MultiPolygon": _this.writeMultiPolygonGeometry_.bind(_this),
        "Circle": _this.writeCircleGeometry_.bind(_this),
        "GeometryCollection": _this.writeGeometryCollectionGeometry_.bind(_this)
      };
      _this.source_ = null;
      _this.hitDetection_ = null;
      var features;
      if (options.features) {
        features = options.features;
      } else if (options.source) {
        _this.source_ = options.source;
        features = new Collection_default(_this.source_.getFeatures());
        _this.source_.addEventListener(VectorEventType_default.ADDFEATURE, _this.handleSourceAdd_.bind(_this));
        _this.source_.addEventListener(VectorEventType_default.REMOVEFEATURE, _this.handleSourceRemove_.bind(_this));
      }
      if (!features) {
        throw new Error("The modify interaction requires features, a source or a layer");
      }
      if (options.hitDetection) {
        _this.hitDetection_ = options.hitDetection;
      }
      _this.features_ = features;
      _this.features_.forEach(_this.addFeature_.bind(_this));
      _this.features_.addEventListener(CollectionEventType_default.ADD, _this.handleFeatureAdd_.bind(_this));
      _this.features_.addEventListener(CollectionEventType_default.REMOVE, _this.handleFeatureRemove_.bind(_this));
      _this.lastPointerEvent_ = null;
      _this.delta_ = [0, 0];
      return _this;
    }
    Modify2.prototype.addFeature_ = function(feature) {
      var geometry = feature.getGeometry();
      if (geometry) {
        var writer = this.SEGMENT_WRITERS_[geometry.getType()];
        if (writer) {
          writer(feature, geometry);
        }
      }
      var map = this.getMap();
      if (map && map.isRendered() && this.getActive()) {
        this.handlePointerAtPixel_(this.lastPixel_, map);
      }
      feature.addEventListener(EventType_default.CHANGE, this.boundHandleFeatureChange_);
    };
    Modify2.prototype.willModifyFeatures_ = function(evt, segments) {
      if (!this.featuresBeingModified_) {
        this.featuresBeingModified_ = new Collection_default();
        var features = this.featuresBeingModified_.getArray();
        for (var i = 0, ii = segments.length; i < ii; ++i) {
          var feature = segments[i][0].feature;
          if (features.indexOf(feature) === -1) {
            this.featuresBeingModified_.push(feature);
          }
        }
        this.dispatchEvent(new ModifyEvent(ModifyEventType.MODIFYSTART, this.featuresBeingModified_, evt));
      }
    };
    Modify2.prototype.removeFeature_ = function(feature) {
      this.removeFeatureSegmentData_(feature);
      if (this.vertexFeature_ && this.features_.getLength() === 0) {
        this.overlay_.getSource().removeFeature(this.vertexFeature_);
        this.vertexFeature_ = null;
      }
      feature.removeEventListener(EventType_default.CHANGE, this.boundHandleFeatureChange_);
    };
    Modify2.prototype.removeFeatureSegmentData_ = function(feature) {
      var rBush = this.rBush_;
      var nodesToRemove = [];
      rBush.forEach(
        /**
         * @param {SegmentData} node RTree node.
         */
        function(node) {
          if (feature === node.feature) {
            nodesToRemove.push(node);
          }
        }
      );
      for (var i = nodesToRemove.length - 1; i >= 0; --i) {
        var nodeToRemove = nodesToRemove[i];
        for (var j = this.dragSegments_.length - 1; j >= 0; --j) {
          if (this.dragSegments_[j][0] === nodeToRemove) {
            this.dragSegments_.splice(j, 1);
          }
        }
        rBush.remove(nodeToRemove);
      }
    };
    Modify2.prototype.setActive = function(active) {
      if (this.vertexFeature_ && !active) {
        this.overlay_.getSource().removeFeature(this.vertexFeature_);
        this.vertexFeature_ = null;
      }
      _super.prototype.setActive.call(this, active);
    };
    Modify2.prototype.setMap = function(map) {
      this.overlay_.setMap(map);
      _super.prototype.setMap.call(this, map);
    };
    Modify2.prototype.getOverlay = function() {
      return this.overlay_;
    };
    Modify2.prototype.handleSourceAdd_ = function(event) {
      if (event.feature) {
        this.features_.push(event.feature);
      }
    };
    Modify2.prototype.handleSourceRemove_ = function(event) {
      if (event.feature) {
        this.features_.remove(event.feature);
      }
    };
    Modify2.prototype.handleFeatureAdd_ = function(evt) {
      this.addFeature_(
        /** @type {Feature} */
        evt.element
      );
    };
    Modify2.prototype.handleFeatureChange_ = function(evt) {
      if (!this.changingFeature_) {
        var feature = (
          /** @type {Feature} */
          evt.target
        );
        this.removeFeature_(feature);
        this.addFeature_(feature);
      }
    };
    Modify2.prototype.handleFeatureRemove_ = function(evt) {
      var feature = (
        /** @type {Feature} */
        evt.element
      );
      this.removeFeature_(feature);
    };
    Modify2.prototype.writePointGeometry_ = function(feature, geometry) {
      var coordinates = geometry.getCoordinates();
      var segmentData = {
        feature,
        geometry,
        segment: [coordinates, coordinates]
      };
      this.rBush_.insert(geometry.getExtent(), segmentData);
    };
    Modify2.prototype.writeMultiPointGeometry_ = function(feature, geometry) {
      var points = geometry.getCoordinates();
      for (var i = 0, ii = points.length; i < ii; ++i) {
        var coordinates = points[i];
        var segmentData = {
          feature,
          geometry,
          depth: [i],
          index: i,
          segment: [coordinates, coordinates]
        };
        this.rBush_.insert(geometry.getExtent(), segmentData);
      }
    };
    Modify2.prototype.writeLineStringGeometry_ = function(feature, geometry) {
      var coordinates = geometry.getCoordinates();
      for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
        var segment = coordinates.slice(i, i + 2);
        var segmentData = {
          feature,
          geometry,
          index: i,
          segment
        };
        this.rBush_.insert(boundingExtent(segment), segmentData);
      }
    };
    Modify2.prototype.writeMultiLineStringGeometry_ = function(feature, geometry) {
      var lines = geometry.getCoordinates();
      for (var j = 0, jj = lines.length; j < jj; ++j) {
        var coordinates = lines[j];
        for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
          var segment = coordinates.slice(i, i + 2);
          var segmentData = {
            feature,
            geometry,
            depth: [j],
            index: i,
            segment
          };
          this.rBush_.insert(boundingExtent(segment), segmentData);
        }
      }
    };
    Modify2.prototype.writePolygonGeometry_ = function(feature, geometry) {
      var rings = geometry.getCoordinates();
      for (var j = 0, jj = rings.length; j < jj; ++j) {
        var coordinates = rings[j];
        for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
          var segment = coordinates.slice(i, i + 2);
          var segmentData = {
            feature,
            geometry,
            depth: [j],
            index: i,
            segment
          };
          this.rBush_.insert(boundingExtent(segment), segmentData);
        }
      }
    };
    Modify2.prototype.writeMultiPolygonGeometry_ = function(feature, geometry) {
      var polygons = geometry.getCoordinates();
      for (var k = 0, kk = polygons.length; k < kk; ++k) {
        var rings = polygons[k];
        for (var j = 0, jj = rings.length; j < jj; ++j) {
          var coordinates = rings[j];
          for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
            var segment = coordinates.slice(i, i + 2);
            var segmentData = {
              feature,
              geometry,
              depth: [j, k],
              index: i,
              segment
            };
            this.rBush_.insert(boundingExtent(segment), segmentData);
          }
        }
      }
    };
    Modify2.prototype.writeCircleGeometry_ = function(feature, geometry) {
      var coordinates = geometry.getCenter();
      var centerSegmentData = {
        feature,
        geometry,
        index: CIRCLE_CENTER_INDEX,
        segment: [coordinates, coordinates]
      };
      var circumferenceSegmentData = {
        feature,
        geometry,
        index: CIRCLE_CIRCUMFERENCE_INDEX,
        segment: [coordinates, coordinates]
      };
      var featureSegments = [centerSegmentData, circumferenceSegmentData];
      centerSegmentData.featureSegments = featureSegments;
      circumferenceSegmentData.featureSegments = featureSegments;
      this.rBush_.insert(createOrUpdateFromCoordinate(coordinates), centerSegmentData);
      var circleGeometry = (
        /** @type {import("../geom/Geometry.js").default} */
        geometry
      );
      var userProjection = getUserProjection();
      if (userProjection && this.getMap()) {
        var projection = this.getMap().getView().getProjection();
        circleGeometry = circleGeometry.clone().transform(userProjection, projection);
        circleGeometry = fromCircle(
          /** @type {import("../geom/Circle.js").default} */
          circleGeometry
        ).transform(projection, userProjection);
      }
      this.rBush_.insert(circleGeometry.getExtent(), circumferenceSegmentData);
    };
    Modify2.prototype.writeGeometryCollectionGeometry_ = function(feature, geometry) {
      var geometries = geometry.getGeometriesArray();
      for (var i = 0; i < geometries.length; ++i) {
        var geometry_1 = geometries[i];
        var writer = this.SEGMENT_WRITERS_[geometry_1.getType()];
        writer(feature, geometry_1);
      }
    };
    Modify2.prototype.createOrUpdateVertexFeature_ = function(coordinates, features, geometries) {
      var vertexFeature = this.vertexFeature_;
      if (!vertexFeature) {
        vertexFeature = new Feature_default(new Point_default(coordinates));
        this.vertexFeature_ = vertexFeature;
        this.overlay_.getSource().addFeature(vertexFeature);
      } else {
        var geometry = vertexFeature.getGeometry();
        geometry.setCoordinates(coordinates);
      }
      vertexFeature.set("features", features);
      vertexFeature.set("geometries", geometries);
      return vertexFeature;
    };
    Modify2.prototype.handleEvent = function(mapBrowserEvent) {
      if (!mapBrowserEvent.originalEvent) {
        return true;
      }
      this.lastPointerEvent_ = mapBrowserEvent;
      var handled;
      if (!mapBrowserEvent.map.getView().getInteracting() && mapBrowserEvent.type == MapBrowserEventType_default.POINTERMOVE && !this.handlingDownUpSequence) {
        this.handlePointerMove_(mapBrowserEvent);
      }
      if (this.vertexFeature_ && this.deleteCondition_(mapBrowserEvent)) {
        if (mapBrowserEvent.type != MapBrowserEventType_default.SINGLECLICK || !this.ignoreNextSingleClick_) {
          handled = this.removePoint();
        } else {
          handled = true;
        }
      }
      if (mapBrowserEvent.type == MapBrowserEventType_default.SINGLECLICK) {
        this.ignoreNextSingleClick_ = false;
      }
      return _super.prototype.handleEvent.call(this, mapBrowserEvent) && !handled;
    };
    Modify2.prototype.handleDragEvent = function(evt) {
      this.ignoreNextSingleClick_ = false;
      this.willModifyFeatures_(evt, this.dragSegments_);
      var vertex = [evt.coordinate[0] + this.delta_[0], evt.coordinate[1] + this.delta_[1]];
      var features = [];
      var geometries = [];
      for (var i = 0, ii = this.dragSegments_.length; i < ii; ++i) {
        var dragSegment = this.dragSegments_[i];
        var segmentData = dragSegment[0];
        var feature = segmentData.feature;
        if (features.indexOf(feature) === -1) {
          features.push(feature);
        }
        var geometry = segmentData.geometry;
        if (geometries.indexOf(geometry) === -1) {
          geometries.push(geometry);
        }
        var depth = segmentData.depth;
        var coordinates = void 0;
        var segment = segmentData.segment;
        var index = dragSegment[1];
        while (vertex.length < geometry.getStride()) {
          vertex.push(segment[index][vertex.length]);
        }
        switch (geometry.getType()) {
          case GeometryType_default.POINT:
            coordinates = vertex;
            segment[0] = vertex;
            segment[1] = vertex;
            break;
          case GeometryType_default.MULTI_POINT:
            coordinates = geometry.getCoordinates();
            coordinates[segmentData.index] = vertex;
            segment[0] = vertex;
            segment[1] = vertex;
            break;
          case GeometryType_default.LINE_STRING:
            coordinates = geometry.getCoordinates();
            coordinates[segmentData.index + index] = vertex;
            segment[index] = vertex;
            break;
          case GeometryType_default.MULTI_LINE_STRING:
            coordinates = geometry.getCoordinates();
            coordinates[depth[0]][segmentData.index + index] = vertex;
            segment[index] = vertex;
            break;
          case GeometryType_default.POLYGON:
            coordinates = geometry.getCoordinates();
            coordinates[depth[0]][segmentData.index + index] = vertex;
            segment[index] = vertex;
            break;
          case GeometryType_default.MULTI_POLYGON:
            coordinates = geometry.getCoordinates();
            coordinates[depth[1]][depth[0]][segmentData.index + index] = vertex;
            segment[index] = vertex;
            break;
          case GeometryType_default.CIRCLE:
            segment[0] = vertex;
            segment[1] = vertex;
            if (segmentData.index === CIRCLE_CENTER_INDEX) {
              this.changingFeature_ = true;
              geometry.setCenter(vertex);
              this.changingFeature_ = false;
            } else {
              this.changingFeature_ = true;
              var projection = evt.map.getView().getProjection();
              var radius = distance(fromUserCoordinate(geometry.getCenter(), projection), fromUserCoordinate(vertex, projection));
              var userProjection = getUserProjection();
              if (userProjection) {
                var circleGeometry = geometry.clone().transform(userProjection, projection);
                circleGeometry.setRadius(radius);
                radius = circleGeometry.transform(projection, userProjection).getRadius();
              }
              geometry.setRadius(radius);
              this.changingFeature_ = false;
            }
            break;
          default:
        }
        if (coordinates) {
          this.setGeometryCoordinates_(geometry, coordinates);
        }
      }
      this.createOrUpdateVertexFeature_(vertex, features, geometries);
    };
    Modify2.prototype.handleDownEvent = function(evt) {
      if (!this.condition_(evt)) {
        return false;
      }
      var pixelCoordinate = evt.coordinate;
      this.handlePointerAtPixel_(evt.pixel, evt.map, pixelCoordinate);
      this.dragSegments_.length = 0;
      this.featuresBeingModified_ = null;
      var vertexFeature = this.vertexFeature_;
      if (vertexFeature) {
        var projection = evt.map.getView().getProjection();
        var insertVertices = [];
        var vertex = vertexFeature.getGeometry().getCoordinates();
        var vertexExtent = boundingExtent([vertex]);
        var segmentDataMatches = this.rBush_.getInExtent(vertexExtent);
        var componentSegments = {};
        segmentDataMatches.sort(compareIndexes);
        for (var i = 0, ii = segmentDataMatches.length; i < ii; ++i) {
          var segmentDataMatch = segmentDataMatches[i];
          var segment = segmentDataMatch.segment;
          var uid = getUid(segmentDataMatch.geometry);
          var depth = segmentDataMatch.depth;
          if (depth) {
            uid += "-" + depth.join("-");
          }
          if (!componentSegments[uid]) {
            componentSegments[uid] = new Array(2);
          }
          if (segmentDataMatch.geometry.getType() === GeometryType_default.CIRCLE && segmentDataMatch.index === CIRCLE_CIRCUMFERENCE_INDEX) {
            var closestVertex = closestOnSegmentData(pixelCoordinate, segmentDataMatch, projection);
            if (equals2(closestVertex, vertex) && !componentSegments[uid][0]) {
              this.dragSegments_.push([segmentDataMatch, 0]);
              componentSegments[uid][0] = segmentDataMatch;
            }
            continue;
          }
          if (equals2(segment[0], vertex) && !componentSegments[uid][0]) {
            this.dragSegments_.push([segmentDataMatch, 0]);
            componentSegments[uid][0] = segmentDataMatch;
            continue;
          }
          if (equals2(segment[1], vertex) && !componentSegments[uid][1]) {
            if ((segmentDataMatch.geometry.getType() === GeometryType_default.LINE_STRING || segmentDataMatch.geometry.getType() === GeometryType_default.MULTI_LINE_STRING) && componentSegments[uid][0] && componentSegments[uid][0].index === 0) {
              continue;
            }
            this.dragSegments_.push([segmentDataMatch, 1]);
            componentSegments[uid][1] = segmentDataMatch;
            continue;
          }
          if (getUid(segment) in this.vertexSegments_ && !componentSegments[uid][0] && !componentSegments[uid][1] && this.insertVertexCondition_(evt)) {
            insertVertices.push(segmentDataMatch);
          }
        }
        if (insertVertices.length) {
          this.willModifyFeatures_(evt, [insertVertices]);
        }
        for (var j = insertVertices.length - 1; j >= 0; --j) {
          this.insertVertex_(insertVertices[j], vertex);
        }
      }
      return !!this.vertexFeature_;
    };
    Modify2.prototype.handleUpEvent = function(evt) {
      for (var i = this.dragSegments_.length - 1; i >= 0; --i) {
        var segmentData = this.dragSegments_[i][0];
        var geometry = segmentData.geometry;
        if (geometry.getType() === GeometryType_default.CIRCLE) {
          var coordinates = geometry.getCenter();
          var centerSegmentData = segmentData.featureSegments[0];
          var circumferenceSegmentData = segmentData.featureSegments[1];
          centerSegmentData.segment[0] = coordinates;
          centerSegmentData.segment[1] = coordinates;
          circumferenceSegmentData.segment[0] = coordinates;
          circumferenceSegmentData.segment[1] = coordinates;
          this.rBush_.update(createOrUpdateFromCoordinate(coordinates), centerSegmentData);
          var circleGeometry = geometry;
          var userProjection = getUserProjection();
          if (userProjection) {
            var projection = evt.map.getView().getProjection();
            circleGeometry = circleGeometry.clone().transform(userProjection, projection);
            circleGeometry = fromCircle(circleGeometry).transform(projection, userProjection);
          }
          this.rBush_.update(circleGeometry.getExtent(), circumferenceSegmentData);
        } else {
          this.rBush_.update(boundingExtent(segmentData.segment), segmentData);
        }
      }
      if (this.featuresBeingModified_) {
        this.dispatchEvent(new ModifyEvent(ModifyEventType.MODIFYEND, this.featuresBeingModified_, evt));
        this.featuresBeingModified_ = null;
      }
      return false;
    };
    Modify2.prototype.handlePointerMove_ = function(evt) {
      this.lastPixel_ = evt.pixel;
      this.handlePointerAtPixel_(evt.pixel, evt.map, evt.coordinate);
    };
    Modify2.prototype.handlePointerAtPixel_ = function(pixel, map, opt_coordinate) {
      var _this = this;
      var pixelCoordinate = opt_coordinate || map.getCoordinateFromPixel(pixel);
      var projection = map.getView().getProjection();
      var sortByDistance = function(a, b) {
        return projectedDistanceToSegmentDataSquared(pixelCoordinate, a, projection) - projectedDistanceToSegmentDataSquared(pixelCoordinate, b, projection);
      };
      var nodes, hitPointGeometry;
      if (this.hitDetection_) {
        var layerFilter = typeof this.hitDetection_ === "object" ? function(layer) {
          return layer === _this.hitDetection_;
        } : void 0;
        map.forEachFeatureAtPixel(pixel, function(feature, layer, geometry) {
          geometry = geometry || feature.getGeometry();
          if (geometry.getType() === GeometryType_default.POINT) {
            hitPointGeometry = geometry;
            var coordinate = geometry.getCoordinates();
            nodes = [{
              feature,
              geometry,
              segment: [coordinate, coordinate]
            }];
          }
          return true;
        }, {
          layerFilter
        });
      }
      if (!nodes) {
        var viewExtent = fromUserExtent(createOrUpdateFromCoordinate(pixelCoordinate, tempExtent), projection);
        var buffer2 = map.getView().getResolution() * this.pixelTolerance_;
        var box = toUserExtent(buffer(viewExtent, buffer2, tempExtent), projection);
        nodes = this.rBush_.getInExtent(box);
      }
      if (nodes && nodes.length > 0) {
        var node = nodes.sort(sortByDistance)[0];
        var closestSegment = node.segment;
        var vertex = closestOnSegmentData(pixelCoordinate, node, projection);
        var vertexPixel = map.getPixelFromCoordinate(vertex);
        var dist = distance(pixel, vertexPixel);
        if (hitPointGeometry || dist <= this.pixelTolerance_) {
          var vertexSegments = {};
          vertexSegments[getUid(closestSegment)] = true;
          this.delta_[0] = vertex[0] - pixelCoordinate[0];
          this.delta_[1] = vertex[1] - pixelCoordinate[1];
          if (node.geometry.getType() === GeometryType_default.CIRCLE && node.index === CIRCLE_CIRCUMFERENCE_INDEX) {
            this.snappedToVertex_ = true;
            this.createOrUpdateVertexFeature_(vertex, [node.feature], [node.geometry]);
          } else {
            var pixel1 = map.getPixelFromCoordinate(closestSegment[0]);
            var pixel2 = map.getPixelFromCoordinate(closestSegment[1]);
            var squaredDist1 = squaredDistance2(vertexPixel, pixel1);
            var squaredDist2 = squaredDistance2(vertexPixel, pixel2);
            dist = Math.sqrt(Math.min(squaredDist1, squaredDist2));
            this.snappedToVertex_ = dist <= this.pixelTolerance_;
            if (this.snappedToVertex_) {
              vertex = squaredDist1 > squaredDist2 ? closestSegment[1] : closestSegment[0];
            }
            this.createOrUpdateVertexFeature_(vertex, [node.feature], [node.geometry]);
            var geometries = {};
            geometries[getUid(node.geometry)] = true;
            for (var i = 1, ii = nodes.length; i < ii; ++i) {
              var segment = nodes[i].segment;
              if (equals2(closestSegment[0], segment[0]) && equals2(closestSegment[1], segment[1]) || equals2(closestSegment[0], segment[1]) && equals2(closestSegment[1], segment[0])) {
                var geometryUid = getUid(nodes[i].geometry);
                if (!(geometryUid in geometries)) {
                  geometries[geometryUid] = true;
                  vertexSegments[getUid(segment)] = true;
                }
              } else {
                break;
              }
            }
          }
          this.vertexSegments_ = vertexSegments;
          return;
        }
      }
      if (this.vertexFeature_) {
        this.overlay_.getSource().removeFeature(this.vertexFeature_);
        this.vertexFeature_ = null;
      }
    };
    Modify2.prototype.insertVertex_ = function(segmentData, vertex) {
      var segment = segmentData.segment;
      var feature = segmentData.feature;
      var geometry = segmentData.geometry;
      var depth = segmentData.depth;
      var index = segmentData.index;
      var coordinates;
      while (vertex.length < geometry.getStride()) {
        vertex.push(0);
      }
      switch (geometry.getType()) {
        case GeometryType_default.MULTI_LINE_STRING:
          coordinates = geometry.getCoordinates();
          coordinates[depth[0]].splice(index + 1, 0, vertex);
          break;
        case GeometryType_default.POLYGON:
          coordinates = geometry.getCoordinates();
          coordinates[depth[0]].splice(index + 1, 0, vertex);
          break;
        case GeometryType_default.MULTI_POLYGON:
          coordinates = geometry.getCoordinates();
          coordinates[depth[1]][depth[0]].splice(index + 1, 0, vertex);
          break;
        case GeometryType_default.LINE_STRING:
          coordinates = geometry.getCoordinates();
          coordinates.splice(index + 1, 0, vertex);
          break;
        default:
          return;
      }
      this.setGeometryCoordinates_(geometry, coordinates);
      var rTree = this.rBush_;
      rTree.remove(segmentData);
      this.updateSegmentIndices_(geometry, index, depth, 1);
      var newSegmentData = {
        segment: [segment[0], vertex],
        feature,
        geometry,
        depth,
        index
      };
      rTree.insert(boundingExtent(newSegmentData.segment), newSegmentData);
      this.dragSegments_.push([newSegmentData, 1]);
      var newSegmentData2 = {
        segment: [vertex, segment[1]],
        feature,
        geometry,
        depth,
        index: index + 1
      };
      rTree.insert(boundingExtent(newSegmentData2.segment), newSegmentData2);
      this.dragSegments_.push([newSegmentData2, 0]);
      this.ignoreNextSingleClick_ = true;
    };
    Modify2.prototype.removePoint = function() {
      if (this.lastPointerEvent_ && this.lastPointerEvent_.type != MapBrowserEventType_default.POINTERDRAG) {
        var evt = this.lastPointerEvent_;
        this.willModifyFeatures_(evt, this.dragSegments_);
        var removed = this.removeVertex_();
        this.dispatchEvent(new ModifyEvent(ModifyEventType.MODIFYEND, this.featuresBeingModified_, evt));
        this.featuresBeingModified_ = null;
        return removed;
      }
      return false;
    };
    Modify2.prototype.removeVertex_ = function() {
      var dragSegments = this.dragSegments_;
      var segmentsByFeature = {};
      var deleted = false;
      var component, coordinates, dragSegment, geometry, i, index, left;
      var newIndex, right, segmentData, uid;
      for (i = dragSegments.length - 1; i >= 0; --i) {
        dragSegment = dragSegments[i];
        segmentData = dragSegment[0];
        uid = getUid(segmentData.feature);
        if (segmentData.depth) {
          uid += "-" + segmentData.depth.join("-");
        }
        if (!(uid in segmentsByFeature)) {
          segmentsByFeature[uid] = {};
        }
        if (dragSegment[1] === 0) {
          segmentsByFeature[uid].right = segmentData;
          segmentsByFeature[uid].index = segmentData.index;
        } else if (dragSegment[1] == 1) {
          segmentsByFeature[uid].left = segmentData;
          segmentsByFeature[uid].index = segmentData.index + 1;
        }
      }
      for (uid in segmentsByFeature) {
        right = segmentsByFeature[uid].right;
        left = segmentsByFeature[uid].left;
        index = segmentsByFeature[uid].index;
        newIndex = index - 1;
        if (left !== void 0) {
          segmentData = left;
        } else {
          segmentData = right;
        }
        if (newIndex < 0) {
          newIndex = 0;
        }
        geometry = segmentData.geometry;
        coordinates = geometry.getCoordinates();
        component = coordinates;
        deleted = false;
        switch (geometry.getType()) {
          case GeometryType_default.MULTI_LINE_STRING:
            if (coordinates[segmentData.depth[0]].length > 2) {
              coordinates[segmentData.depth[0]].splice(index, 1);
              deleted = true;
            }
            break;
          case GeometryType_default.LINE_STRING:
            if (coordinates.length > 2) {
              coordinates.splice(index, 1);
              deleted = true;
            }
            break;
          case GeometryType_default.MULTI_POLYGON:
            component = component[segmentData.depth[1]];
          case GeometryType_default.POLYGON:
            component = component[segmentData.depth[0]];
            if (component.length > 4) {
              if (index == component.length - 1) {
                index = 0;
              }
              component.splice(index, 1);
              deleted = true;
              if (index === 0) {
                component.pop();
                component.push(component[0]);
                newIndex = component.length - 1;
              }
            }
            break;
          default:
        }
        if (deleted) {
          this.setGeometryCoordinates_(geometry, coordinates);
          var segments = [];
          if (left !== void 0) {
            this.rBush_.remove(left);
            segments.push(left.segment[0]);
          }
          if (right !== void 0) {
            this.rBush_.remove(right);
            segments.push(right.segment[1]);
          }
          if (left !== void 0 && right !== void 0) {
            var newSegmentData = {
              depth: segmentData.depth,
              feature: segmentData.feature,
              geometry: segmentData.geometry,
              index: newIndex,
              segment: segments
            };
            this.rBush_.insert(boundingExtent(newSegmentData.segment), newSegmentData);
          }
          this.updateSegmentIndices_(geometry, index, segmentData.depth, -1);
          if (this.vertexFeature_) {
            this.overlay_.getSource().removeFeature(this.vertexFeature_);
            this.vertexFeature_ = null;
          }
          dragSegments.length = 0;
        }
      }
      return deleted;
    };
    Modify2.prototype.setGeometryCoordinates_ = function(geometry, coordinates) {
      this.changingFeature_ = true;
      geometry.setCoordinates(coordinates);
      this.changingFeature_ = false;
    };
    Modify2.prototype.updateSegmentIndices_ = function(geometry, index, depth, delta) {
      this.rBush_.forEachInExtent(geometry.getExtent(), function(segmentDataMatch) {
        if (segmentDataMatch.geometry === geometry && (depth === void 0 || segmentDataMatch.depth === void 0 || equals(segmentDataMatch.depth, depth)) && segmentDataMatch.index > index) {
          segmentDataMatch.index += delta;
        }
      });
    };
    return Modify2;
  }(Pointer_default)
);
function compareIndexes(a, b) {
  return a.index - b.index;
}
function projectedDistanceToSegmentDataSquared(pointCoordinates, segmentData, projection) {
  var geometry = segmentData.geometry;
  if (geometry.getType() === GeometryType_default.CIRCLE) {
    var circleGeometry = (
      /** @type {import("../geom/Circle.js").default} */
      geometry
    );
    if (segmentData.index === CIRCLE_CIRCUMFERENCE_INDEX) {
      var userProjection = getUserProjection();
      if (userProjection) {
        circleGeometry = /** @type {import("../geom/Circle.js").default} */
        circleGeometry.clone().transform(userProjection, projection);
      }
      var distanceToCenterSquared = squaredDistance2(circleGeometry.getCenter(), fromUserCoordinate(pointCoordinates, projection));
      var distanceToCircumference = Math.sqrt(distanceToCenterSquared) - circleGeometry.getRadius();
      return distanceToCircumference * distanceToCircumference;
    }
  }
  var coordinate = fromUserCoordinate(pointCoordinates, projection);
  tempSegment[0] = fromUserCoordinate(segmentData.segment[0], projection);
  tempSegment[1] = fromUserCoordinate(segmentData.segment[1], projection);
  return squaredDistanceToSegment(coordinate, tempSegment);
}
function closestOnSegmentData(pointCoordinates, segmentData, projection) {
  var geometry = segmentData.geometry;
  if (geometry.getType() === GeometryType_default.CIRCLE && segmentData.index === CIRCLE_CIRCUMFERENCE_INDEX) {
    var circleGeometry = (
      /** @type {import("../geom/Circle.js").default} */
      geometry
    );
    var userProjection = getUserProjection();
    if (userProjection) {
      circleGeometry = /** @type {import("../geom/Circle.js").default} */
      circleGeometry.clone().transform(userProjection, projection);
    }
    return toUserCoordinate(circleGeometry.getClosestPoint(fromUserCoordinate(pointCoordinates, projection)), projection);
  }
  var coordinate = fromUserCoordinate(pointCoordinates, projection);
  tempSegment[0] = fromUserCoordinate(segmentData.segment[0], projection);
  tempSegment[1] = fromUserCoordinate(segmentData.segment[1], projection);
  return toUserCoordinate(closestOnSegment(coordinate, tempSegment), projection);
}
function getDefaultStyleFunction2() {
  var style = createEditingStyle();
  return function(feature, resolution) {
    return style[GeometryType_default.POINT];
  };
}

// node_modules/ol/interaction/Select.js
var __extends25 = /* @__PURE__ */ function() {
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
var SelectEventType = {
  /**
   * Triggered when feature(s) has been (de)selected.
   * @event SelectEvent#select
   * @api
   */
  SELECT: "select"
};
var SelectEvent = (
  /** @class */
  function(_super) {
    __extends25(SelectEvent2, _super);
    function SelectEvent2(type, selected, deselected, mapBrowserEvent) {
      var _this = _super.call(this, type) || this;
      _this.selected = selected;
      _this.deselected = deselected;
      _this.mapBrowserEvent = mapBrowserEvent;
      return _this;
    }
    return SelectEvent2;
  }(Event_default)
);
var originalFeatureStyles = {};
var Select = (
  /** @class */
  function(_super) {
    __extends25(Select2, _super);
    function Select2(opt_options) {
      var _this = _super.call(this) || this;
      var options = opt_options ? opt_options : {};
      _this.boundAddFeature_ = _this.addFeature_.bind(_this);
      _this.boundRemoveFeature_ = _this.removeFeature_.bind(_this);
      _this.condition_ = options.condition ? options.condition : singleClick;
      _this.addCondition_ = options.addCondition ? options.addCondition : never;
      _this.removeCondition_ = options.removeCondition ? options.removeCondition : never;
      _this.toggleCondition_ = options.toggleCondition ? options.toggleCondition : shiftKeyOnly;
      _this.multi_ = options.multi ? options.multi : false;
      _this.filter_ = options.filter ? options.filter : TRUE;
      _this.hitTolerance_ = options.hitTolerance ? options.hitTolerance : 0;
      _this.style_ = options.style !== void 0 ? options.style : getDefaultStyleFunction3();
      _this.features_ = options.features || new Collection_default();
      var layerFilter;
      if (options.layers) {
        if (typeof options.layers === "function") {
          layerFilter = options.layers;
        } else {
          var layers_1 = options.layers;
          layerFilter = function(layer) {
            return includes(layers_1, layer);
          };
        }
      } else {
        layerFilter = TRUE;
      }
      _this.layerFilter_ = layerFilter;
      _this.featureLayerAssociation_ = {};
      return _this;
    }
    Select2.prototype.addFeatureLayerAssociation_ = function(feature, layer) {
      this.featureLayerAssociation_[getUid(feature)] = layer;
    };
    Select2.prototype.getFeatures = function() {
      return this.features_;
    };
    Select2.prototype.getHitTolerance = function() {
      return this.hitTolerance_;
    };
    Select2.prototype.getLayer = function(feature) {
      return (
        /** @type {import('../layer/Vector.js').default} */
        this.featureLayerAssociation_[getUid(feature)]
      );
    };
    Select2.prototype.setHitTolerance = function(hitTolerance) {
      this.hitTolerance_ = hitTolerance;
    };
    Select2.prototype.setMap = function(map) {
      var currentMap = this.getMap();
      if (currentMap && this.style_) {
        this.features_.forEach(this.restorePreviousStyle_.bind(this));
      }
      _super.prototype.setMap.call(this, map);
      if (map) {
        this.features_.addEventListener(CollectionEventType_default.ADD, this.boundAddFeature_);
        this.features_.addEventListener(CollectionEventType_default.REMOVE, this.boundRemoveFeature_);
        if (this.style_) {
          this.features_.forEach(this.applySelectedStyle_.bind(this));
        }
      } else {
        this.features_.removeEventListener(CollectionEventType_default.ADD, this.boundAddFeature_);
        this.features_.removeEventListener(CollectionEventType_default.REMOVE, this.boundRemoveFeature_);
      }
    };
    Select2.prototype.addFeature_ = function(evt) {
      var feature = evt.element;
      if (this.style_) {
        this.applySelectedStyle_(feature);
      }
    };
    Select2.prototype.removeFeature_ = function(evt) {
      var feature = evt.element;
      if (this.style_) {
        this.restorePreviousStyle_(feature);
      }
    };
    Select2.prototype.getStyle = function() {
      return this.style_;
    };
    Select2.prototype.applySelectedStyle_ = function(feature) {
      var key = getUid(feature);
      if (!(key in originalFeatureStyles)) {
        originalFeatureStyles[key] = feature.getStyle();
      }
      feature.setStyle(this.style_);
    };
    Select2.prototype.restorePreviousStyle_ = function(feature) {
      var interactions = this.getMap().getInteractions().getArray();
      for (var i = interactions.length - 1; i >= 0; --i) {
        var interaction = interactions[i];
        if (interaction !== this && interaction instanceof Select2 && interaction.getStyle() && interaction.getFeatures().getArray().lastIndexOf(feature) !== -1) {
          feature.setStyle(interaction.getStyle());
          return;
        }
      }
      var key = getUid(feature);
      feature.setStyle(originalFeatureStyles[key]);
      delete originalFeatureStyles[key];
    };
    Select2.prototype.removeFeatureLayerAssociation_ = function(feature) {
      delete this.featureLayerAssociation_[getUid(feature)];
    };
    Select2.prototype.handleEvent = function(mapBrowserEvent) {
      if (!this.condition_(mapBrowserEvent)) {
        return true;
      }
      var add = this.addCondition_(mapBrowserEvent);
      var remove = this.removeCondition_(mapBrowserEvent);
      var toggle = this.toggleCondition_(mapBrowserEvent);
      var set = !add && !remove && !toggle;
      var map = mapBrowserEvent.map;
      var features = this.getFeatures();
      var deselected = [];
      var selected = [];
      if (set) {
        clear(this.featureLayerAssociation_);
        map.forEachFeatureAtPixel(
          mapBrowserEvent.pixel,
          /**
           * @param {import("../Feature.js").FeatureLike} feature Feature.
           * @param {import("../layer/Layer.js").default} layer Layer.
           * @return {boolean|undefined} Continue to iterate over the features.
           */
          function(feature2, layer) {
            if (this.filter_(feature2, layer)) {
              selected.push(feature2);
              this.addFeatureLayerAssociation_(feature2, layer);
              return !this.multi_;
            }
          }.bind(this),
          {
            layerFilter: this.layerFilter_,
            hitTolerance: this.hitTolerance_
          }
        );
        for (var i = features.getLength() - 1; i >= 0; --i) {
          var feature = features.item(i);
          var index = selected.indexOf(feature);
          if (index > -1) {
            selected.splice(index, 1);
          } else {
            features.remove(feature);
            deselected.push(feature);
          }
        }
        if (selected.length !== 0) {
          features.extend(selected);
        }
      } else {
        map.forEachFeatureAtPixel(
          mapBrowserEvent.pixel,
          /**
           * @param {import("../Feature.js").FeatureLike} feature Feature.
           * @param {import("../layer/Layer.js").default} layer Layer.
           * @return {boolean|undefined} Continue to iterate over the features.
           */
          function(feature2, layer) {
            if (this.filter_(feature2, layer)) {
              if ((add || toggle) && !includes(features.getArray(), feature2)) {
                selected.push(feature2);
                this.addFeatureLayerAssociation_(feature2, layer);
              } else if ((remove || toggle) && includes(features.getArray(), feature2)) {
                deselected.push(feature2);
                this.removeFeatureLayerAssociation_(feature2);
              }
              return !this.multi_;
            }
          }.bind(this),
          {
            layerFilter: this.layerFilter_,
            hitTolerance: this.hitTolerance_
          }
        );
        for (var j = deselected.length - 1; j >= 0; --j) {
          features.remove(deselected[j]);
        }
        features.extend(selected);
      }
      if (selected.length > 0 || deselected.length > 0) {
        this.dispatchEvent(new SelectEvent(SelectEventType.SELECT, selected, deselected, mapBrowserEvent));
      }
      return true;
    };
    return Select2;
  }(Interaction_default)
);
function getDefaultStyleFunction3() {
  var styles = createEditingStyle();
  extend(styles[GeometryType_default.POLYGON], styles[GeometryType_default.LINE_STRING]);
  extend(styles[GeometryType_default.GEOMETRY_COLLECTION], styles[GeometryType_default.LINE_STRING]);
  return function(feature) {
    if (!feature.getGeometry()) {
      return null;
    }
    return styles[feature.getGeometry().getType()];
  };
}

// node_modules/ol/interaction/Snap.js
var __extends26 = /* @__PURE__ */ function() {
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
function getFeatureFromEvent(evt) {
  if (
    /** @type {import("../source/Vector.js").VectorSourceEvent} */
    evt.feature
  ) {
    return (
      /** @type {import("../source/Vector.js").VectorSourceEvent} */
      evt.feature
    );
  } else if (
    /** @type {import("../Collection.js").CollectionEvent} */
    evt.element
  ) {
    return (
      /** @type {import("../Feature.js").default} */
      /** @type {import("../Collection.js").CollectionEvent} */
      evt.element
    );
  }
}
var tempSegment2 = [];
var Snap = (
  /** @class */
  function(_super) {
    __extends26(Snap2, _super);
    function Snap2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      var pointerOptions = (
        /** @type {import("./Pointer.js").Options} */
        options
      );
      if (!pointerOptions.handleDownEvent) {
        pointerOptions.handleDownEvent = TRUE;
      }
      if (!pointerOptions.stopDown) {
        pointerOptions.stopDown = FALSE;
      }
      _this = _super.call(this, pointerOptions) || this;
      _this.source_ = options.source ? options.source : null;
      _this.vertex_ = options.vertex !== void 0 ? options.vertex : true;
      _this.edge_ = options.edge !== void 0 ? options.edge : true;
      _this.features_ = options.features ? options.features : null;
      _this.featuresListenerKeys_ = [];
      _this.featureChangeListenerKeys_ = {};
      _this.indexedFeaturesExtents_ = {};
      _this.pendingFeatures_ = {};
      _this.pixelTolerance_ = options.pixelTolerance !== void 0 ? options.pixelTolerance : 10;
      _this.rBush_ = new RBush_default();
      _this.SEGMENT_WRITERS_ = {
        "Point": _this.writePointGeometry_.bind(_this),
        "LineString": _this.writeLineStringGeometry_.bind(_this),
        "LinearRing": _this.writeLineStringGeometry_.bind(_this),
        "Polygon": _this.writePolygonGeometry_.bind(_this),
        "MultiPoint": _this.writeMultiPointGeometry_.bind(_this),
        "MultiLineString": _this.writeMultiLineStringGeometry_.bind(_this),
        "MultiPolygon": _this.writeMultiPolygonGeometry_.bind(_this),
        "GeometryCollection": _this.writeGeometryCollectionGeometry_.bind(_this),
        "Circle": _this.writeCircleGeometry_.bind(_this)
      };
      return _this;
    }
    Snap2.prototype.addFeature = function(feature, opt_listen) {
      var register = opt_listen !== void 0 ? opt_listen : true;
      var feature_uid = getUid(feature);
      var geometry = feature.getGeometry();
      if (geometry) {
        var segmentWriter = this.SEGMENT_WRITERS_[geometry.getType()];
        if (segmentWriter) {
          this.indexedFeaturesExtents_[feature_uid] = geometry.getExtent(createEmpty());
          segmentWriter(feature, geometry);
        }
      }
      if (register) {
        this.featureChangeListenerKeys_[feature_uid] = listen(feature, EventType_default.CHANGE, this.handleFeatureChange_, this);
      }
    };
    Snap2.prototype.forEachFeatureAdd_ = function(feature) {
      this.addFeature(feature);
    };
    Snap2.prototype.forEachFeatureRemove_ = function(feature) {
      this.removeFeature(feature);
    };
    Snap2.prototype.getFeatures_ = function() {
      var features;
      if (this.features_) {
        features = this.features_;
      } else if (this.source_) {
        features = this.source_.getFeatures();
      }
      return features;
    };
    Snap2.prototype.handleEvent = function(evt) {
      var result = this.snapTo(evt.pixel, evt.coordinate, evt.map);
      if (result.snapped) {
        evt.coordinate = result.vertex.slice(0, 2);
        evt.pixel = result.vertexPixel;
      }
      return _super.prototype.handleEvent.call(this, evt);
    };
    Snap2.prototype.handleFeatureAdd_ = function(evt) {
      var feature = getFeatureFromEvent(evt);
      this.addFeature(feature);
    };
    Snap2.prototype.handleFeatureRemove_ = function(evt) {
      var feature = getFeatureFromEvent(evt);
      this.removeFeature(feature);
    };
    Snap2.prototype.handleFeatureChange_ = function(evt) {
      var feature = (
        /** @type {import("../Feature.js").default} */
        evt.target
      );
      if (this.handlingDownUpSequence) {
        var uid = getUid(feature);
        if (!(uid in this.pendingFeatures_)) {
          this.pendingFeatures_[uid] = feature;
        }
      } else {
        this.updateFeature_(feature);
      }
    };
    Snap2.prototype.handleUpEvent = function(evt) {
      var featuresToUpdate = getValues(this.pendingFeatures_);
      if (featuresToUpdate.length) {
        featuresToUpdate.forEach(this.updateFeature_.bind(this));
        this.pendingFeatures_ = {};
      }
      return false;
    };
    Snap2.prototype.removeFeature = function(feature, opt_unlisten) {
      var unregister = opt_unlisten !== void 0 ? opt_unlisten : true;
      var feature_uid = getUid(feature);
      var extent = this.indexedFeaturesExtents_[feature_uid];
      if (extent) {
        var rBush = this.rBush_;
        var nodesToRemove_1 = [];
        rBush.forEachInExtent(extent, function(node) {
          if (feature === node.feature) {
            nodesToRemove_1.push(node);
          }
        });
        for (var i = nodesToRemove_1.length - 1; i >= 0; --i) {
          rBush.remove(nodesToRemove_1[i]);
        }
      }
      if (unregister) {
        unlistenByKey(this.featureChangeListenerKeys_[feature_uid]);
        delete this.featureChangeListenerKeys_[feature_uid];
      }
    };
    Snap2.prototype.setMap = function(map) {
      var currentMap = this.getMap();
      var keys = this.featuresListenerKeys_;
      var features = (
        /** @type {Array<import("../Feature.js").default>} */
        this.getFeatures_()
      );
      if (currentMap) {
        keys.forEach(unlistenByKey);
        keys.length = 0;
        features.forEach(this.forEachFeatureRemove_.bind(this));
      }
      _super.prototype.setMap.call(this, map);
      if (map) {
        if (this.features_) {
          keys.push(listen(this.features_, CollectionEventType_default.ADD, this.handleFeatureAdd_, this), listen(this.features_, CollectionEventType_default.REMOVE, this.handleFeatureRemove_, this));
        } else if (this.source_) {
          keys.push(listen(this.source_, VectorEventType_default.ADDFEATURE, this.handleFeatureAdd_, this), listen(this.source_, VectorEventType_default.REMOVEFEATURE, this.handleFeatureRemove_, this));
        }
        features.forEach(this.forEachFeatureAdd_.bind(this));
      }
    };
    Snap2.prototype.snapTo = function(pixel, pixelCoordinate, map) {
      var lowerLeft = map.getCoordinateFromPixel([pixel[0] - this.pixelTolerance_, pixel[1] + this.pixelTolerance_]);
      var upperRight = map.getCoordinateFromPixel([pixel[0] + this.pixelTolerance_, pixel[1] - this.pixelTolerance_]);
      var box = boundingExtent([lowerLeft, upperRight]);
      var segments = this.rBush_.getInExtent(box);
      if (this.vertex_ && !this.edge_) {
        segments = segments.filter(function(segment) {
          return segment.feature.getGeometry().getType() !== GeometryType_default.CIRCLE;
        });
      }
      var snapped = false;
      var vertex = null;
      var vertexPixel = null;
      if (segments.length === 0) {
        return {
          snapped,
          vertex,
          vertexPixel
        };
      }
      var projection = map.getView().getProjection();
      var projectedCoordinate = fromUserCoordinate(pixelCoordinate, projection);
      var closestSegmentData;
      var minSquaredDistance = Infinity;
      for (var i = 0; i < segments.length; ++i) {
        var segmentData = segments[i];
        tempSegment2[0] = fromUserCoordinate(segmentData.segment[0], projection);
        tempSegment2[1] = fromUserCoordinate(segmentData.segment[1], projection);
        var delta = squaredDistanceToSegment(projectedCoordinate, tempSegment2);
        if (delta < minSquaredDistance) {
          closestSegmentData = segmentData;
          minSquaredDistance = delta;
        }
      }
      var closestSegment = closestSegmentData.segment;
      if (this.vertex_ && !this.edge_) {
        var pixel1 = map.getPixelFromCoordinate(closestSegment[0]);
        var pixel2 = map.getPixelFromCoordinate(closestSegment[1]);
        var squaredDist1 = squaredDistance2(pixel, pixel1);
        var squaredDist2 = squaredDistance2(pixel, pixel2);
        var dist = Math.sqrt(Math.min(squaredDist1, squaredDist2));
        if (dist <= this.pixelTolerance_) {
          snapped = true;
          vertex = squaredDist1 > squaredDist2 ? closestSegment[1] : closestSegment[0];
          vertexPixel = map.getPixelFromCoordinate(vertex);
        }
      } else if (this.edge_) {
        var isCircle = closestSegmentData.feature.getGeometry().getType() === GeometryType_default.CIRCLE;
        if (isCircle) {
          var circleGeometry = closestSegmentData.feature.getGeometry();
          var userProjection = getUserProjection();
          if (userProjection) {
            circleGeometry = circleGeometry.clone().transform(userProjection, projection);
          }
          vertex = toUserCoordinate(closestOnCircle(
            projectedCoordinate,
            /** @type {import("../geom/Circle.js").default} */
            circleGeometry
          ), projection);
        } else {
          tempSegment2[0] = fromUserCoordinate(closestSegment[0], projection);
          tempSegment2[1] = fromUserCoordinate(closestSegment[1], projection);
          vertex = toUserCoordinate(closestOnSegment(projectedCoordinate, tempSegment2), projection);
        }
        vertexPixel = map.getPixelFromCoordinate(vertex);
        if (distance(pixel, vertexPixel) <= this.pixelTolerance_) {
          snapped = true;
          if (this.vertex_ && !isCircle) {
            var pixel1 = map.getPixelFromCoordinate(closestSegment[0]);
            var pixel2 = map.getPixelFromCoordinate(closestSegment[1]);
            var squaredDist1 = squaredDistance2(vertexPixel, pixel1);
            var squaredDist2 = squaredDistance2(vertexPixel, pixel2);
            var dist = Math.sqrt(Math.min(squaredDist1, squaredDist2));
            if (dist <= this.pixelTolerance_) {
              vertex = squaredDist1 > squaredDist2 ? closestSegment[1] : closestSegment[0];
              vertexPixel = map.getPixelFromCoordinate(vertex);
            }
          }
        }
      }
      if (snapped) {
        vertexPixel = [Math.round(vertexPixel[0]), Math.round(vertexPixel[1])];
      }
      return {
        snapped,
        vertex,
        vertexPixel
      };
    };
    Snap2.prototype.updateFeature_ = function(feature) {
      this.removeFeature(feature, false);
      this.addFeature(feature, false);
    };
    Snap2.prototype.writeCircleGeometry_ = function(feature, geometry) {
      var projection = this.getMap().getView().getProjection();
      var circleGeometry = geometry;
      var userProjection = getUserProjection();
      if (userProjection) {
        circleGeometry = /** @type {import("../geom/Circle.js").default} */
        circleGeometry.clone().transform(userProjection, projection);
      }
      var polygon = fromCircle(circleGeometry);
      if (userProjection) {
        polygon.transform(projection, userProjection);
      }
      var coordinates = polygon.getCoordinates()[0];
      for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
        var segment = coordinates.slice(i, i + 2);
        var segmentData = {
          feature,
          segment
        };
        this.rBush_.insert(boundingExtent(segment), segmentData);
      }
    };
    Snap2.prototype.writeGeometryCollectionGeometry_ = function(feature, geometry) {
      var geometries = geometry.getGeometriesArray();
      for (var i = 0; i < geometries.length; ++i) {
        var segmentWriter = this.SEGMENT_WRITERS_[geometries[i].getType()];
        if (segmentWriter) {
          segmentWriter(feature, geometries[i]);
        }
      }
    };
    Snap2.prototype.writeLineStringGeometry_ = function(feature, geometry) {
      var coordinates = geometry.getCoordinates();
      for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
        var segment = coordinates.slice(i, i + 2);
        var segmentData = {
          feature,
          segment
        };
        this.rBush_.insert(boundingExtent(segment), segmentData);
      }
    };
    Snap2.prototype.writeMultiLineStringGeometry_ = function(feature, geometry) {
      var lines = geometry.getCoordinates();
      for (var j = 0, jj = lines.length; j < jj; ++j) {
        var coordinates = lines[j];
        for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
          var segment = coordinates.slice(i, i + 2);
          var segmentData = {
            feature,
            segment
          };
          this.rBush_.insert(boundingExtent(segment), segmentData);
        }
      }
    };
    Snap2.prototype.writeMultiPointGeometry_ = function(feature, geometry) {
      var points = geometry.getCoordinates();
      for (var i = 0, ii = points.length; i < ii; ++i) {
        var coordinates = points[i];
        var segmentData = {
          feature,
          segment: [coordinates, coordinates]
        };
        this.rBush_.insert(geometry.getExtent(), segmentData);
      }
    };
    Snap2.prototype.writeMultiPolygonGeometry_ = function(feature, geometry) {
      var polygons = geometry.getCoordinates();
      for (var k = 0, kk = polygons.length; k < kk; ++k) {
        var rings = polygons[k];
        for (var j = 0, jj = rings.length; j < jj; ++j) {
          var coordinates = rings[j];
          for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
            var segment = coordinates.slice(i, i + 2);
            var segmentData = {
              feature,
              segment
            };
            this.rBush_.insert(boundingExtent(segment), segmentData);
          }
        }
      }
    };
    Snap2.prototype.writePointGeometry_ = function(feature, geometry) {
      var coordinates = geometry.getCoordinates();
      var segmentData = {
        feature,
        segment: [coordinates, coordinates]
      };
      this.rBush_.insert(geometry.getExtent(), segmentData);
    };
    Snap2.prototype.writePolygonGeometry_ = function(feature, geometry) {
      var rings = geometry.getCoordinates();
      for (var j = 0, jj = rings.length; j < jj; ++j) {
        var coordinates = rings[j];
        for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
          var segment = coordinates.slice(i, i + 2);
          var segmentData = {
            feature,
            segment
          };
          this.rBush_.insert(boundingExtent(segment), segmentData);
        }
      }
    };
    return Snap2;
  }(Pointer_default)
);

// node_modules/ol/interaction/Translate.js
var __extends27 = /* @__PURE__ */ function() {
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
var TranslateEventType = {
  /**
   * Triggered upon feature translation start.
   * @event TranslateEvent#translatestart
   * @api
   */
  TRANSLATESTART: "translatestart",
  /**
   * Triggered upon feature translation.
   * @event TranslateEvent#translating
   * @api
   */
  TRANSLATING: "translating",
  /**
   * Triggered upon feature translation end.
   * @event TranslateEvent#translateend
   * @api
   */
  TRANSLATEEND: "translateend"
};
var TranslateEvent = (
  /** @class */
  function(_super) {
    __extends27(TranslateEvent2, _super);
    function TranslateEvent2(type, features, coordinate, startCoordinate, mapBrowserEvent) {
      var _this = _super.call(this, type) || this;
      _this.features = features;
      _this.coordinate = coordinate;
      _this.startCoordinate = startCoordinate;
      _this.mapBrowserEvent = mapBrowserEvent;
      return _this;
    }
    return TranslateEvent2;
  }(Event_default)
);
var Translate = (
  /** @class */
  function(_super) {
    __extends27(Translate2, _super);
    function Translate2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      _this = _super.call(
        this,
        /** @type {import("./Pointer.js").Options} */
        options
      ) || this;
      _this.lastCoordinate_ = null;
      _this.startCoordinate_ = null;
      _this.features_ = options.features !== void 0 ? options.features : null;
      var layerFilter;
      if (options.layers) {
        if (typeof options.layers === "function") {
          layerFilter = options.layers;
        } else {
          var layers_1 = options.layers;
          layerFilter = function(layer) {
            return includes(layers_1, layer);
          };
        }
      } else {
        layerFilter = TRUE;
      }
      _this.layerFilter_ = layerFilter;
      _this.filter_ = options.filter ? options.filter : TRUE;
      _this.hitTolerance_ = options.hitTolerance ? options.hitTolerance : 0;
      _this.lastFeature_ = null;
      _this.addEventListener(getChangeEventType(Property_default.ACTIVE), _this.handleActiveChanged_);
      return _this;
    }
    Translate2.prototype.handleDownEvent = function(event) {
      this.lastFeature_ = this.featuresAtPixel_(event.pixel, event.map);
      if (!this.lastCoordinate_ && this.lastFeature_) {
        this.startCoordinate_ = event.coordinate;
        this.lastCoordinate_ = event.coordinate;
        this.handleMoveEvent(event);
        var features = this.features_ || new Collection_default([this.lastFeature_]);
        this.dispatchEvent(new TranslateEvent(TranslateEventType.TRANSLATESTART, features, event.coordinate, this.startCoordinate_, event));
        return true;
      }
      return false;
    };
    Translate2.prototype.handleUpEvent = function(event) {
      if (this.lastCoordinate_) {
        this.lastCoordinate_ = null;
        this.handleMoveEvent(event);
        var features = this.features_ || new Collection_default([this.lastFeature_]);
        this.dispatchEvent(new TranslateEvent(TranslateEventType.TRANSLATEEND, features, event.coordinate, this.startCoordinate_, event));
        this.startCoordinate_ = null;
        return true;
      }
      return false;
    };
    Translate2.prototype.handleDragEvent = function(event) {
      if (this.lastCoordinate_) {
        var newCoordinate = event.coordinate;
        var deltaX_1 = newCoordinate[0] - this.lastCoordinate_[0];
        var deltaY_1 = newCoordinate[1] - this.lastCoordinate_[1];
        var features = this.features_ || new Collection_default([this.lastFeature_]);
        features.forEach(function(feature) {
          var geom = feature.getGeometry();
          geom.translate(deltaX_1, deltaY_1);
          feature.setGeometry(geom);
        });
        this.lastCoordinate_ = newCoordinate;
        this.dispatchEvent(new TranslateEvent(TranslateEventType.TRANSLATING, features, newCoordinate, this.startCoordinate_, event));
      }
    };
    Translate2.prototype.handleMoveEvent = function(event) {
      var elem = event.map.getViewport();
      if (this.featuresAtPixel_(event.pixel, event.map)) {
        elem.classList.remove(this.lastCoordinate_ ? "ol-grab" : "ol-grabbing");
        elem.classList.add(this.lastCoordinate_ ? "ol-grabbing" : "ol-grab");
      } else {
        elem.classList.remove("ol-grab", "ol-grabbing");
      }
    };
    Translate2.prototype.featuresAtPixel_ = function(pixel, map) {
      return map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        if (this.filter_(feature, layer)) {
          if (!this.features_ || includes(this.features_.getArray(), feature)) {
            return feature;
          }
        }
      }.bind(this), {
        layerFilter: this.layerFilter_,
        hitTolerance: this.hitTolerance_
      });
    };
    Translate2.prototype.getHitTolerance = function() {
      return this.hitTolerance_;
    };
    Translate2.prototype.setHitTolerance = function(hitTolerance) {
      this.hitTolerance_ = hitTolerance;
    };
    Translate2.prototype.setMap = function(map) {
      var oldMap = this.getMap();
      _super.prototype.setMap.call(this, map);
      this.updateState_(oldMap);
    };
    Translate2.prototype.handleActiveChanged_ = function() {
      this.updateState_(null);
    };
    Translate2.prototype.updateState_ = function(oldMap) {
      var map = this.getMap();
      var active = this.getActive();
      if (!map || !active) {
        map = map || oldMap;
        if (map) {
          var elem = map.getViewport();
          elem.classList.remove("ol-grab", "ol-grabbing");
        }
      }
    };
    return Translate2;
  }(Pointer_default)
);

// node_modules/ol/interaction.js
function defaults2(opt_options) {
  var options = opt_options ? opt_options : {};
  var interactions = new Collection_default();
  var kinetic = new Kinetic_default(-5e-3, 0.05, 100);
  var altShiftDragRotate = options.altShiftDragRotate !== void 0 ? options.altShiftDragRotate : true;
  if (altShiftDragRotate) {
    interactions.push(new DragRotate_default());
  }
  var doubleClickZoom = options.doubleClickZoom !== void 0 ? options.doubleClickZoom : true;
  if (doubleClickZoom) {
    interactions.push(new DoubleClickZoom_default({
      delta: options.zoomDelta,
      duration: options.zoomDuration
    }));
  }
  var dragPan = options.dragPan !== void 0 ? options.dragPan : true;
  if (dragPan) {
    interactions.push(new DragPan_default({
      onFocusOnly: options.onFocusOnly,
      kinetic
    }));
  }
  var pinchRotate = options.pinchRotate !== void 0 ? options.pinchRotate : true;
  if (pinchRotate) {
    interactions.push(new PinchRotate_default());
  }
  var pinchZoom = options.pinchZoom !== void 0 ? options.pinchZoom : true;
  if (pinchZoom) {
    interactions.push(new PinchZoom_default({
      duration: options.zoomDuration
    }));
  }
  var keyboard = options.keyboard !== void 0 ? options.keyboard : true;
  if (keyboard) {
    interactions.push(new KeyboardPan_default());
    interactions.push(new KeyboardZoom_default({
      delta: options.zoomDelta,
      duration: options.zoomDuration
    }));
  }
  var mouseWheelZoom = options.mouseWheelZoom !== void 0 ? options.mouseWheelZoom : true;
  if (mouseWheelZoom) {
    interactions.push(new MouseWheelZoom_default({
      onFocusOnly: options.onFocusOnly,
      duration: options.zoomDuration
    }));
  }
  var shiftDragZoom = options.shiftDragZoom !== void 0 ? options.shiftDragZoom : true;
  if (shiftDragZoom) {
    interactions.push(new DragZoom_default({
      duration: options.zoomDuration
    }));
  }
  return interactions;
}

// node_modules/ol/Map.js
var __extends28 = /* @__PURE__ */ function() {
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
var Map = (
  /** @class */
  function(_super) {
    __extends28(Map2, _super);
    function Map2(options) {
      var _this = this;
      options = assign({}, options);
      if (!options.controls) {
        options.controls = defaults();
      }
      if (!options.interactions) {
        options.interactions = defaults2({
          onFocusOnly: true
        });
      }
      _this = _super.call(this, options) || this;
      return _this;
    }
    Map2.prototype.createRenderer = function() {
      return new Composite_default(this);
    };
    return Map2;
  }(PluggableMap_default)
);
var Map_default = Map;

export {
  Kinetic_default,
  Feature_default,
  LineString_default,
  Map_default
};
//# sourceMappingURL=chunk-XKJHLDBA.js.map
