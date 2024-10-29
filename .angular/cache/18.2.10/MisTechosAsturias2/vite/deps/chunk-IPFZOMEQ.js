import {
  Event_default,
  Object_default
} from "./chunk-5ORQIOU2.js";
import {
  AssertionError_default
} from "./chunk-MN23FWKY.js";

// node_modules/ol/CollectionEventType.js
var CollectionEventType_default = {
  /**
   * Triggered when an item is added to the collection.
   * @event module:ol/Collection.CollectionEvent#add
   * @api
   */
  ADD: "add",
  /**
   * Triggered when an item is removed from the collection.
   * @event module:ol/Collection.CollectionEvent#remove
   * @api
   */
  REMOVE: "remove"
};

// node_modules/ol/Collection.js
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
  LENGTH: "length"
};
var CollectionEvent = (
  /** @class */
  function(_super) {
    __extends(CollectionEvent2, _super);
    function CollectionEvent2(type, opt_element, opt_index) {
      var _this = _super.call(this, type) || this;
      _this.element = opt_element;
      _this.index = opt_index;
      return _this;
    }
    return CollectionEvent2;
  }(Event_default)
);
var Collection = (
  /** @class */
  function(_super) {
    __extends(Collection2, _super);
    function Collection2(opt_array, opt_options) {
      var _this = _super.call(this) || this;
      var options = opt_options || {};
      _this.unique_ = !!options.unique;
      _this.array_ = opt_array ? opt_array : [];
      if (_this.unique_) {
        for (var i = 0, ii = _this.array_.length; i < ii; ++i) {
          _this.assertUnique_(_this.array_[i], i);
        }
      }
      _this.updateLength_();
      return _this;
    }
    Collection2.prototype.clear = function() {
      while (this.getLength() > 0) {
        this.pop();
      }
    };
    Collection2.prototype.extend = function(arr) {
      for (var i = 0, ii = arr.length; i < ii; ++i) {
        this.push(arr[i]);
      }
      return this;
    };
    Collection2.prototype.forEach = function(f) {
      var array = this.array_;
      for (var i = 0, ii = array.length; i < ii; ++i) {
        f(array[i], i, array);
      }
    };
    Collection2.prototype.getArray = function() {
      return this.array_;
    };
    Collection2.prototype.item = function(index) {
      return this.array_[index];
    };
    Collection2.prototype.getLength = function() {
      return this.get(Property.LENGTH);
    };
    Collection2.prototype.insertAt = function(index, elem) {
      if (this.unique_) {
        this.assertUnique_(elem);
      }
      this.array_.splice(index, 0, elem);
      this.updateLength_();
      this.dispatchEvent(new CollectionEvent(CollectionEventType_default.ADD, elem, index));
    };
    Collection2.prototype.pop = function() {
      return this.removeAt(this.getLength() - 1);
    };
    Collection2.prototype.push = function(elem) {
      if (this.unique_) {
        this.assertUnique_(elem);
      }
      var n = this.getLength();
      this.insertAt(n, elem);
      return this.getLength();
    };
    Collection2.prototype.remove = function(elem) {
      var arr = this.array_;
      for (var i = 0, ii = arr.length; i < ii; ++i) {
        if (arr[i] === elem) {
          return this.removeAt(i);
        }
      }
      return void 0;
    };
    Collection2.prototype.removeAt = function(index) {
      var prev = this.array_[index];
      this.array_.splice(index, 1);
      this.updateLength_();
      this.dispatchEvent(new CollectionEvent(CollectionEventType_default.REMOVE, prev, index));
      return prev;
    };
    Collection2.prototype.setAt = function(index, elem) {
      var n = this.getLength();
      if (index < n) {
        if (this.unique_) {
          this.assertUnique_(elem, index);
        }
        var prev = this.array_[index];
        this.array_[index] = elem;
        this.dispatchEvent(new CollectionEvent(CollectionEventType_default.REMOVE, prev, index));
        this.dispatchEvent(new CollectionEvent(CollectionEventType_default.ADD, elem, index));
      } else {
        for (var j = n; j < index; ++j) {
          this.insertAt(j, void 0);
        }
        this.insertAt(index, elem);
      }
    };
    Collection2.prototype.updateLength_ = function() {
      this.set(Property.LENGTH, this.array_.length);
    };
    Collection2.prototype.assertUnique_ = function(elem, opt_except) {
      for (var i = 0, ii = this.array_.length; i < ii; ++i) {
        if (this.array_[i] === elem && i !== opt_except) {
          throw new AssertionError_default(58);
        }
      }
    };
    return Collection2;
  }(Object_default)
);
var Collection_default = Collection;

export {
  CollectionEventType_default,
  Collection_default
};
//# sourceMappingURL=chunk-IPFZOMEQ.js.map
