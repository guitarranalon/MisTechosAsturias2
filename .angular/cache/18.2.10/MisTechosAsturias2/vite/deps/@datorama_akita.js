import {
  defer,
  isObservable,
  merge
} from "./chunk-LWIWGYA7.js";
import {
  BehaviorSubject,
  EMPTY,
  ReplaySubject,
  Subject,
  auditTime,
  combineLatest,
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  finalize,
  first,
  from,
  map,
  of,
  pairwise,
  skip,
  switchMap,
  take,
  tap
} from "./chunk-LTHPNJ3H.js";
import {
  __decorate,
  __metadata
} from "./chunk-OMOJI57B.js";
import {
  __objRest,
  __restKey,
  __spreadProps,
  __spreadValues
} from "./chunk-R2QGWZ7S.js";

// node_modules/@datorama/akita/src/lib/actions.js
var currentAction = {
  type: null,
  entityIds: null,
  skip: false,
  payload: null
};
var customActionActive = false;
function resetCustomAction() {
  customActionActive = false;
}
function logAction(type, entityIds, payload) {
  setAction(type, entityIds, payload);
  customActionActive = true;
}
function setAction(type, entityIds, payload) {
  if (customActionActive === false) {
    currentAction.type = type;
    currentAction.entityIds = entityIds;
    currentAction.payload = payload;
  }
}
function setSkipAction(skip2 = true) {
  currentAction.skip = skip2;
}
function action(action2, entityIds) {
  return function(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args) {
      logAction(action2, entityIds);
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}

// node_modules/@datorama/akita/src/lib/hasEntity.js
function hasEntity(entities, id) {
  return entities.hasOwnProperty(id);
}

// node_modules/@datorama/akita/src/lib/isArray.js
function isArray(value) {
  return Array.isArray(value);
}

// node_modules/@datorama/akita/src/lib/activeState.js
function hasActiveState(state) {
  return state.hasOwnProperty("active");
}
function isMultiActiveState(active) {
  return isArray(active);
}
function resolveActiveEntity({
  active,
  ids,
  entities
}) {
  if (isMultiActiveState(active)) {
    return getExitingActives(active, ids);
  }
  if (hasEntity(entities, active) === false) {
    return null;
  }
  return active;
}
function getExitingActives(currentActivesIds, newIds) {
  const filtered = currentActivesIds.filter((id) => newIds.indexOf(id) > -1);
  if (filtered.length === currentActivesIds.length) {
    return currentActivesIds;
  }
  return filtered;
}

// node_modules/@datorama/akita/src/lib/addEntities.js
function addEntities({
  state,
  entities,
  idKey,
  options = {},
  preAddEntity
}) {
  let newEntities = {};
  let newIds = [];
  let hasNewEntities = false;
  for (const entity of entities) {
    if (hasEntity(state.entities, entity[idKey]) === false) {
      const current = preAddEntity(entity);
      const entityId = current[idKey];
      newEntities[entityId] = current;
      if (options.prepend) newIds.unshift(entityId);
      else newIds.push(entityId);
      hasNewEntities = true;
    }
  }
  return hasNewEntities ? {
    newState: __spreadProps(__spreadValues({}, state), {
      entities: __spreadValues(__spreadValues({}, state.entities), newEntities),
      ids: options.prepend ? [...newIds, ...state.ids] : [...state.ids, ...newIds]
    }),
    newIds
  } : null;
}

// node_modules/@datorama/akita/src/lib/isNil.js
function isNil(v) {
  return v === null || v === void 0;
}

// node_modules/@datorama/akita/src/lib/coerceArray.js
function coerceArray(value) {
  if (isNil(value)) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

// node_modules/@datorama/akita/src/lib/arrayAdd.js
function arrayAdd(arr, newEntity, options = {}) {
  const newEntities = coerceArray(newEntity);
  const toArr = arr || [];
  return options.prepend ? [...newEntities, ...toArr] : [...toArr, ...newEntities];
}

// node_modules/@datorama/akita/src/lib/defaultIDKey.js
var DEFAULT_ID_KEY = "id";

// node_modules/@datorama/akita/src/lib/isEmpty.js
function isEmpty(arr) {
  if (isArray(arr)) {
    return arr.length === 0;
  }
  return false;
}

// node_modules/@datorama/akita/src/lib/isFunction.js
function isFunction(value) {
  return typeof value === "function";
}

// node_modules/@datorama/akita/src/lib/arrayFind.js
function find(collection, idsOrPredicate, idKey) {
  const result = [];
  if (isFunction(idsOrPredicate)) {
    for (const entity of collection) {
      if (idsOrPredicate(entity) === true) {
        result.push(entity);
      }
    }
  } else {
    const toSet = coerceArray(idsOrPredicate).reduce((acc, current) => acc.add(current), /* @__PURE__ */ new Set());
    for (const entity of collection) {
      if (toSet.has(entity[idKey])) {
        result.push(entity);
      }
    }
  }
  return result;
}
function distinctUntilArrayItemChanged() {
  return distinctUntilChanged((prevCollection, currentCollection) => {
    if (prevCollection === currentCollection) {
      return true;
    }
    if (!isArray(prevCollection) || !isArray(currentCollection)) {
      return false;
    }
    if (isEmpty(prevCollection) && isEmpty(currentCollection)) {
      return true;
    }
    if (prevCollection.length !== currentCollection.length) {
      return false;
    }
    const isOneOfItemReferenceChanged = currentCollection.some((item, i) => {
      return prevCollection[i] !== item;
    });
    return isOneOfItemReferenceChanged === false;
  });
}
function arrayFind(idsOrPredicate, idKey) {
  return function(source) {
    return source.pipe(map((collection) => {
      if (isArray(collection) === false) {
        return collection;
      }
      return find(collection, idsOrPredicate, idKey || DEFAULT_ID_KEY);
    }), distinctUntilArrayItemChanged(), map((value) => {
      if (isArray(value) === false) {
        return value;
      }
      if (isArray(idsOrPredicate) || isFunction(idsOrPredicate)) {
        return value;
      }
      return value[0];
    }));
  };
}

// node_modules/@datorama/akita/src/lib/isObject.js
function isObject(value) {
  const type = typeof value;
  return value != null && (type == "object" || type == "function");
}

// node_modules/@datorama/akita/src/lib/not.js
function not(pred) {
  return function(...args) {
    return !pred(...args);
  };
}

// node_modules/@datorama/akita/src/lib/arrayRemove.js
function arrayRemove(arr, identifier, idKey = DEFAULT_ID_KEY) {
  let identifiers;
  let filterFn;
  if (isFunction(identifier)) {
    filterFn = not(identifier);
  } else {
    identifiers = coerceArray(identifier);
    filterFn = (current) => {
      return identifiers.includes(isObject(current) ? current[idKey] : current) === false;
    };
  }
  if (Array.isArray(arr)) {
    return arr.filter(filterFn);
  }
}

// node_modules/@datorama/akita/src/lib/arrayToggle.js
function byKey(prop) {
  return (a, b) => a[prop] === b[prop];
}
function byId() {
  return byKey("id");
}
function arrayToggle(array, newValue, compare = (a, b) => a === b) {
  const index = array.findIndex((oldValue) => compare(newValue, oldValue));
  return !!~index ? [...array.slice(0, index), ...array.slice(index + 1)] : [...array, newValue];
}

// node_modules/@datorama/akita/src/lib/arrayUpdate.js
function arrayUpdate(arr, predicateOrIds, obj, idKey = DEFAULT_ID_KEY) {
  let condition;
  if (isFunction(predicateOrIds)) {
    condition = predicateOrIds;
  } else {
    const ids = coerceArray(predicateOrIds);
    condition = (item) => ids.includes(isObject(item) ? item[idKey] : item) === true;
  }
  const updateFn = (state) => state.map((entity, index) => {
    if (condition(entity, index) === true) {
      return isObject(entity) ? __spreadValues(__spreadValues({}, entity), obj) : obj;
    }
    return entity;
  });
  return updateFn(arr);
}

// node_modules/@datorama/akita/src/lib/arrayUpsert.js
function arrayUpsert(arr, id, obj, idKey = DEFAULT_ID_KEY) {
  const entityIsObject = isObject(obj);
  const entityExists = arr.some((entity) => entityIsObject ? entity[idKey] === id : entity === id);
  if (entityExists) {
    return arrayUpdate(arr, id, obj, idKey);
  } else {
    return arrayAdd(arr, entityIsObject ? __spreadProps(__spreadValues({}, obj), {
      [idKey]: id
    }) : obj);
  }
}

// node_modules/@datorama/akita/src/lib/cacheable.js
function cacheable(store, request$, options = {
  emitNext: false
}) {
  if (store._cache().value) {
    return options.emitNext ? of(void 0) : EMPTY;
  }
  return request$;
}

// node_modules/@datorama/akita/src/lib/combineQueries.js
function combineQueries(observables) {
  return combineLatest(observables).pipe(auditTime(0));
}

// node_modules/@datorama/akita/src/lib/config.js
var CONFIG = {
  resettable: false,
  ttl: null,
  producerFn: void 0
};
function akitaConfig(config) {
  CONFIG = __spreadValues(__spreadValues({}, CONFIG), config);
}
function getAkitaConfig() {
  return CONFIG;
}
function getGlobalProducerFn() {
  return CONFIG.producerFn;
}

// node_modules/@datorama/akita/src/lib/isDefined.js
function isDefined(val) {
  return isNil(val) === false;
}

// node_modules/@datorama/akita/src/lib/dispatchers.js
var $$deleteStore = new Subject();
var $$addStore = new ReplaySubject(50, 5e3);
var $$updateStore = new Subject();
function dispatchDeleted(storeName) {
  $$deleteStore.next(storeName);
}
function dispatchAdded(storeName) {
  $$addStore.next(storeName);
}
function dispatchUpdate(storeName, action2) {
  $$updateStore.next({
    storeName,
    action: action2
  });
}

// node_modules/@datorama/akita/src/lib/root.js
var isBrowser = typeof window !== "undefined";
var isNotBrowser = !isBrowser;
var hasLocalStorage = () => {
  try {
    return typeof localStorage !== "undefined";
  } catch {
    return false;
  }
};
var hasSessionStorage = () => {
  try {
    return typeof sessionStorage !== "undefined";
  } catch {
    return false;
  }
};

// node_modules/@datorama/akita/src/lib/stores.js
var __stores__ = {};
var __queries__ = {};
if (isBrowser) {
  window.$$stores = __stores__;
  window.$$queries = __queries__;
}

// node_modules/@datorama/akita/src/lib/capitalize.js
function capitalize(value) {
  return value && value.charAt(0).toUpperCase() + value.slice(1);
}

// node_modules/@datorama/akita/src/lib/devtools.js
var subs = [];
function akitaDevtools(ngZoneOrOptions, options = {}) {
  if (isNotBrowser) return;
  if (!window.__REDUX_DEVTOOLS_EXTENSION__) {
    return;
  }
  subs.length && subs.forEach((s) => {
    if (s.unsubscribe) {
      s.unsubscribe();
    } else {
      s && s();
    }
  });
  const isAngular = ngZoneOrOptions && ngZoneOrOptions["run"];
  if (!isAngular) {
    ngZoneOrOptions = ngZoneOrOptions || {};
    ngZoneOrOptions.run = (cb) => cb();
    options = ngZoneOrOptions;
  }
  const defaultOptions = {
    name: "Akita",
    shallow: true,
    storesWhitelist: []
  };
  const merged = Object.assign({}, defaultOptions, options);
  const storesWhitelist = merged.storesWhitelist;
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect(merged);
  let appState = {};
  const isAllowed = (storeName) => {
    if (!storesWhitelist.length) {
      return true;
    }
    return storesWhitelist.indexOf(storeName) > -1;
  };
  subs.push($$addStore.subscribe((storeName) => {
    if (isAllowed(storeName) === false) return;
    appState = __spreadProps(__spreadValues({}, appState), {
      [storeName]: __stores__[storeName]._value()
    });
    devTools.send({
      type: `[${capitalize(storeName)}] - @@INIT`
    }, appState);
  }));
  subs.push($$deleteStore.subscribe((storeName) => {
    if (isAllowed(storeName) === false) return;
    delete appState[storeName];
    devTools.send({
      type: `[${storeName}] - Delete Store`
    }, appState);
  }));
  subs.push($$updateStore.subscribe(({
    storeName,
    action: action2
  }) => {
    if (isAllowed(storeName) === false) return;
    const _a = action2, {
      type,
      entityIds,
      skip: skip2
    } = _a, rest = __objRest(_a, [
      "type",
      "entityIds",
      "skip"
    ]);
    const payload = rest.payload;
    if (skip2) {
      setSkipAction(false);
      return;
    }
    const store = __stores__[storeName];
    if (!store) {
      return;
    }
    if (options.shallow === false && appState[storeName]) {
      const isEqual = JSON.stringify(store._value()) === JSON.stringify(appState[storeName]);
      if (isEqual) return;
    }
    appState = __spreadProps(__spreadValues({}, appState), {
      [storeName]: store._value()
    });
    const normalize = capitalize(storeName);
    let msg = isDefined(entityIds) ? `[${normalize}] - ${type} (ids: ${entityIds})` : `[${normalize}] - ${type}`;
    if (options.logTrace) {
      console.group(msg);
      console.trace();
      console.groupEnd();
    }
    if (options.sortAlphabetically) {
      const sortedAppState = Object.keys(appState).sort().reduce((acc, storeName2) => {
        acc[storeName2] = appState[storeName2];
        return acc;
      }, {});
      devTools.send(__spreadValues({
        type: msg
      }, payload), sortedAppState);
      return;
    }
    devTools.send(__spreadValues({
      type: msg
    }, payload), appState);
  }));
  subs.push(devTools.subscribe((message) => {
    if (message.type === "DISPATCH") {
      const payloadType = message.payload.type;
      if (payloadType === "COMMIT") {
        devTools.init(appState);
        return;
      }
      if (message.state) {
        const rootState = JSON.parse(message.state);
        for (let i = 0, keys = Object.keys(rootState); i < keys.length; i++) {
          const storeName = keys[i];
          if (__stores__[storeName]) {
            ngZoneOrOptions.run(() => {
              __stores__[storeName]._setState(() => rootState[storeName], false);
            });
          }
        }
      }
    }
  }));
}

// node_modules/@datorama/akita/src/lib/sort.js
var Order;
(function(Order2) {
  Order2["ASC"] = "asc";
  Order2["DESC"] = "desc";
})(Order || (Order = {}));
function compareValues(key, order = Order.ASC) {
  return function(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }
    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];
    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order == Order.DESC ? comparison * -1 : comparison;
  };
}

// node_modules/@datorama/akita/src/lib/entitiesToArray.js
function entitiesToArray(state, options) {
  let arr = [];
  const {
    ids,
    entities
  } = state;
  const {
    filterBy,
    limitTo,
    sortBy,
    sortByOrder
  } = options;
  for (let i = 0; i < ids.length; i++) {
    const entity = entities[ids[i]];
    if (!filterBy) {
      arr.push(entity);
      continue;
    }
    const toArray = coerceArray(filterBy);
    const allPass = toArray.every((fn) => fn(entity, i));
    if (allPass) {
      arr.push(entity);
    }
  }
  if (sortBy) {
    let _sortBy = isFunction(sortBy) ? sortBy : compareValues(sortBy, sortByOrder);
    arr = arr.sort((a, b) => _sortBy(a, b, state));
  }
  const length = Math.min(limitTo || arr.length, arr.length);
  return length === arr.length ? arr : arr.slice(0, length);
}

// node_modules/@datorama/akita/src/lib/entitiesToMap.js
function entitiesToMap(state, options) {
  const map2 = {};
  const {
    filterBy,
    limitTo
  } = options;
  const {
    ids,
    entities
  } = state;
  if (!filterBy && !limitTo) {
    return entities;
  }
  const hasLimit = isNil(limitTo) === false;
  if (filterBy && hasLimit) {
    let count = 0;
    for (let i = 0, length = ids.length; i < length; i++) {
      if (count === limitTo) break;
      const id = ids[i];
      const entity = entities[id];
      const allPass = coerceArray(filterBy).every((fn) => fn(entity, i));
      if (allPass) {
        map2[id] = entity;
        count++;
      }
    }
  } else {
    const finalLength = Math.min(limitTo || ids.length, ids.length);
    for (let i = 0; i < finalLength; i++) {
      const id = ids[i];
      const entity = entities[id];
      if (!filterBy) {
        map2[id] = entity;
        continue;
      }
      const allPass = coerceArray(filterBy).every((fn) => fn(entity, i));
      if (allPass) {
        map2[id] = entity;
      }
    }
  }
  return map2;
}

// node_modules/@datorama/akita/src/lib/entityActions.js
var EntityActions;
(function(EntityActions2) {
  EntityActions2["Set"] = "Set";
  EntityActions2["Add"] = "Add";
  EntityActions2["Update"] = "Update";
  EntityActions2["Remove"] = "Remove";
})(EntityActions || (EntityActions = {}));

// node_modules/@datorama/akita/src/lib/entityService.js
var EntityService = class {
};

// node_modules/@datorama/akita/src/lib/env.js
var __DEV__ = true;
function enableAkitaProdMode() {
  __DEV__ = false;
  if (isBrowser) {
    delete window.$$stores;
    delete window.$$queries;
  }
}
function isDev() {
  return __DEV__;
}

// node_modules/@datorama/akita/src/lib/getActiveEntities.js
function getActiveEntities(idOrOptions, ids, currentActive) {
  let result;
  if (isArray(idOrOptions)) {
    result = idOrOptions;
  } else {
    if (isObject(idOrOptions)) {
      if (isNil(currentActive)) return;
      idOrOptions = Object.assign({
        wrap: true
      }, idOrOptions);
      const currentIdIndex = ids.indexOf(currentActive);
      if (idOrOptions.prev) {
        const isFirst = currentIdIndex === 0;
        if (isFirst && !idOrOptions.wrap) return;
        result = isFirst ? ids[ids.length - 1] : ids[currentIdIndex - 1];
      } else if (idOrOptions.next) {
        const isLast = ids.length === currentIdIndex + 1;
        if (isLast && !idOrOptions.wrap) return;
        result = isLast ? ids[0] : ids[currentIdIndex + 1];
      }
    } else {
      if (idOrOptions === currentActive) return;
      result = idOrOptions;
    }
  }
  return result;
}

// node_modules/@datorama/akita/src/lib/getInitialEntitiesState.js
var getInitialEntitiesState = () => ({
  entities: {},
  ids: [],
  loading: true,
  error: null
});

// node_modules/@datorama/akita/src/lib/isUndefined.js
function isUndefined(value) {
  return value === void 0;
}

// node_modules/@datorama/akita/src/lib/removeEntities.js
function removeEntities({
  state,
  ids
}) {
  if (isNil(ids)) return removeAllEntities(state);
  const entities = state.entities;
  let newEntities = {};
  for (const id of state.ids) {
    if (ids.includes(id) === false) {
      newEntities[id] = entities[id];
    }
  }
  const newState = __spreadProps(__spreadValues({}, state), {
    entities: newEntities,
    ids: state.ids.filter((current) => ids.includes(current) === false)
  });
  if (hasActiveState(state)) {
    newState.active = resolveActiveEntity(newState);
  }
  return newState;
}
function removeAllEntities(state) {
  return __spreadProps(__spreadValues({}, state), {
    entities: {},
    ids: [],
    active: isMultiActiveState(state.active) ? [] : null
  });
}

// node_modules/@datorama/akita/src/lib/toEntitiesObject.js
function toEntitiesObject(entities, idKey, preAddEntity) {
  const acc = {
    entities: {},
    ids: []
  };
  for (const entity of entities) {
    const current = preAddEntity(entity);
    acc.entities[current[idKey]] = current;
    acc.ids.push(current[idKey]);
  }
  return acc;
}

// node_modules/@datorama/akita/src/lib/setEntities.js
function isEntityState(state) {
  return state.entities && state.ids;
}
function applyMiddleware(entities, preAddEntity) {
  let mapped = {};
  for (const id of Object.keys(entities)) {
    mapped[id] = preAddEntity(entities[id]);
  }
  return mapped;
}
function setEntities({
  state,
  entities,
  idKey,
  preAddEntity,
  isNativePreAdd
}) {
  let newEntities;
  let newIds;
  if (isArray(entities)) {
    const resolve = toEntitiesObject(entities, idKey, preAddEntity);
    newEntities = resolve.entities;
    newIds = resolve.ids;
  } else if (isEntityState(entities)) {
    newEntities = isNativePreAdd ? entities.entities : applyMiddleware(entities.entities, preAddEntity);
    newIds = entities.ids;
  } else {
    newEntities = isNativePreAdd ? entities : applyMiddleware(entities, preAddEntity);
    newIds = Object.keys(newEntities).map((id) => isNaN(id) ? id : Number(id));
  }
  const newState = __spreadProps(__spreadValues({}, state), {
    entities: newEntities,
    ids: newIds,
    loading: false
  });
  if (hasActiveState(state)) {
    newState.active = resolveActiveEntity(newState);
  }
  return newState;
}

// node_modules/@datorama/akita/src/lib/deepFreeze.js
function deepFreeze(o) {
  Object.freeze(o);
  const oIsFunction = typeof o === "function";
  const hasOwnProp = Object.prototype.hasOwnProperty;
  Object.getOwnPropertyNames(o).forEach(function(prop) {
    if (hasOwnProp.call(o, prop) && (oIsFunction ? prop !== "caller" && prop !== "callee" && prop !== "arguments" : true) && o[prop] !== null && (typeof o[prop] === "object" || typeof o[prop] === "function") && !Object.isFrozen(o[prop])) {
      deepFreeze(o[prop]);
    }
  });
  return o;
}

// node_modules/@datorama/akita/src/lib/errors.js
var AkitaError = class extends Error {
  constructor(message) {
    super(message);
  }
};
function assertStoreHasName(name, className) {
  if (!name) {
    console.error(`@StoreConfig({ name }) is missing in ${className}`);
  }
}

// node_modules/@datorama/akita/src/lib/toBoolean.js
function toBoolean(value) {
  return value != null && `${value}` !== "false";
}

// node_modules/@datorama/akita/src/lib/isPlainObject.js
function isPlainObject(value) {
  return toBoolean(value) && value.constructor.name === "Object";
}

// node_modules/@datorama/akita/src/lib/storeConfig.js
var configKey = "akitaConfig";
function StoreConfig(metadata) {
  return function(constructor) {
    constructor[configKey] = {
      idKey: "id"
    };
    for (let i = 0, keys = Object.keys(metadata); i < keys.length; i++) {
      const key = keys[i];
      if (key === "name") {
        constructor[configKey]["storeName"] = metadata[key];
      } else {
        constructor[configKey][key] = metadata[key];
      }
    }
  };
}

// node_modules/@datorama/akita/src/lib/transaction.js
var transactionFinished = new Subject();
var transactionInProcess = new BehaviorSubject(false);
var transactionManager = {
  activeTransactions: 0,
  batchTransaction: null
};
function startBatch() {
  if (!isTransactionInProcess()) {
    transactionManager.batchTransaction = new Subject();
  }
  transactionManager.activeTransactions++;
  transactionInProcess.next(true);
}
function endBatch() {
  if (--transactionManager.activeTransactions === 0) {
    transactionManager.batchTransaction.next(true);
    transactionManager.batchTransaction.complete();
    transactionInProcess.next(false);
    transactionFinished.next(true);
  }
}
function isTransactionInProcess() {
  return transactionManager.activeTransactions > 0;
}
function commit() {
  return transactionManager.batchTransaction ? transactionManager.batchTransaction.asObservable() : of(true);
}
function applyTransaction(action2, thisArg = void 0) {
  startBatch();
  try {
    return action2.apply(thisArg);
  } finally {
    logAction("@Transaction");
    endBatch();
  }
}
function transaction() {
  return function(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args) {
      return applyTransaction(() => {
        return originalMethod.apply(this, args);
      }, this);
    };
    return descriptor;
  };
}
function withTransaction(next) {
  return function(source) {
    return source.pipe(tap((value) => applyTransaction(() => next(value))));
  };
}

// node_modules/@datorama/akita/src/lib/store.js
var Store = class {
  constructor(initialState, options = {}) {
    this.options = options;
    this.inTransaction = false;
    this.cache = {
      active: new BehaviorSubject(false),
      ttl: null
    };
    this.onInit(initialState);
  }
  /**
   *  Set the loading state
   *
   *  @example
   *
   *  store.setLoading(true)
   *
   */
  setLoading(loading = false) {
    if (loading !== this._value().loading) {
      isDev() && setAction("Set Loading");
      this._setState((state) => __spreadProps(__spreadValues({}, state), {
        loading
      }));
    }
  }
  /**
   *
   * Set whether the data is cached
   *
   * @example
   *
   * store.setHasCache(true)
   * store.setHasCache(false)
   * store.setHasCache(true, { restartTTL: true })
   *
   */
  setHasCache(hasCache, options = {
    restartTTL: false
  }) {
    if (hasCache !== this.cache.active.value) {
      this.cache.active.next(hasCache);
    }
    if (options.restartTTL) {
      const ttlConfig = this.getCacheTTL();
      if (ttlConfig) {
        if (this.cache.ttl !== null) {
          clearTimeout(this.cache.ttl);
        }
        this.cache.ttl = setTimeout(() => this.setHasCache(false), ttlConfig);
      }
    }
  }
  /**
   *
   * Sometimes we need to access the store value from a store
   *
   * @example middleware
   *
   */
  getValue() {
    return this.storeValue;
  }
  /**
   *  Set the error state
   *
   *  @example
   *
   *  store.setError({text: 'unable to load data' })
   *
   */
  setError(error) {
    if (error !== this._value().error) {
      isDev() && setAction("Set Error");
      this._setState((state) => __spreadProps(__spreadValues({}, state), {
        error
      }));
    }
  }
  // @internal
  _select(project) {
    return this.store.asObservable().pipe(map((snapshot) => project(snapshot.state)), distinctUntilChanged());
  }
  // @internal
  _value() {
    return this.storeValue;
  }
  // @internal
  _cache() {
    return this.cache.active;
  }
  // @internal
  get config() {
    return this.constructor[configKey] || {};
  }
  // @internal
  get storeName() {
    return this.config.storeName || this.options.storeName || this.options.name;
  }
  // @internal
  get deepFreeze() {
    return this.config.deepFreezeFn || this.options.deepFreezeFn || deepFreeze;
  }
  // @internal
  get cacheConfig() {
    return this.config.cache || this.options.cache;
  }
  get _producerFn() {
    return this.config.producerFn || this.options.producerFn || getGlobalProducerFn();
  }
  // @internal
  get resettable() {
    return isDefined(this.config.resettable) ? this.config.resettable : this.options.resettable;
  }
  // @internal
  _setState(newState, _dispatchAction = true) {
    if (isFunction(newState)) {
      const _newState = newState(this._value());
      this.storeValue = __DEV__ ? this.deepFreeze(_newState) : _newState;
    } else {
      this.storeValue = newState;
    }
    if (!this.store) {
      this.store = new BehaviorSubject({
        state: this.storeValue
      });
      if (isDev()) {
        this.store.subscribe(({
          action: action2
        }) => {
          if (action2) {
            dispatchUpdate(this.storeName, action2);
          }
        });
      }
      return;
    }
    if (isTransactionInProcess()) {
      this.handleTransaction();
      return;
    }
    this.dispatch(this.storeValue, _dispatchAction);
  }
  /**
   *
   * Reset the current store back to the initial value
   *
   * @example
   *
   * store.reset()
   *
   */
  reset() {
    if (this.isResettable()) {
      isDev() && setAction("Reset");
      this._setState(() => Object.assign({}, this._initialState));
      this.setHasCache(false);
    }
  }
  update(stateOrCallback) {
    isDev() && setAction("Update");
    let newState;
    const currentState = this._value();
    if (isFunction(stateOrCallback)) {
      newState = isFunction(this._producerFn) ? this._producerFn(currentState, stateOrCallback) : stateOrCallback(currentState);
    } else {
      newState = stateOrCallback;
    }
    const withHook = this.akitaPreUpdate(currentState, __spreadValues(__spreadValues({}, currentState), newState));
    const resolved = isPlainObject(currentState) ? withHook : new currentState.constructor(withHook);
    this._setState(resolved);
  }
  updateStoreConfig(newOptions) {
    this.options = __spreadValues(__spreadValues({}, this.options), newOptions);
  }
  // @internal
  akitaPreUpdate(_, nextState) {
    return nextState;
  }
  /**
   *
   * Destroy the store
   *
   * @example
   *
   * store.destroy()
   *
   */
  destroy() {
    const hmrEnabled = isBrowser ? window.hmrEnabled : false;
    if (!hmrEnabled && this === __stores__[this.storeName]) {
      delete __stores__[this.storeName];
      dispatchDeleted(this.storeName);
      this.setHasCache(false);
      this.cache.active.complete();
      this.store.complete();
    }
  }
  onInit(initialState) {
    __stores__[this.storeName] = this;
    this._setState(() => initialState);
    dispatchAdded(this.storeName);
    if (this.isResettable()) {
      this._initialState = initialState;
    }
    isDev() && assertStoreHasName(this.storeName, this.constructor.name);
  }
  dispatch(state, _dispatchAction = true) {
    let action2 = void 0;
    if (_dispatchAction) {
      action2 = currentAction;
      resetCustomAction();
    }
    this.store.next({
      state,
      action: action2
    });
  }
  watchTransaction() {
    commit().subscribe(() => {
      this.inTransaction = false;
      this.dispatch(this._value());
    });
  }
  isResettable() {
    if (this.resettable === false) {
      return false;
    }
    return this.resettable || getAkitaConfig().resettable;
  }
  handleTransaction() {
    if (!this.inTransaction) {
      this.watchTransaction();
      this.inTransaction = true;
    }
  }
  getCacheTTL() {
    return this.cacheConfig && this.cacheConfig.ttl || getAkitaConfig().ttl;
  }
};

// node_modules/@datorama/akita/src/lib/updateEntities.js
function updateEntities({
  state,
  ids,
  idKey,
  newStateOrFn,
  preUpdateEntity,
  producerFn,
  onEntityIdChanges
}) {
  const updatedEntities = {};
  let isUpdatingIdKey = false;
  let idToUpdate;
  for (const id of ids) {
    if (hasEntity(state.entities, id) === false) {
      continue;
    }
    const oldEntity = state.entities[id];
    let newState;
    if (isFunction(newStateOrFn)) {
      newState = isFunction(producerFn) ? producerFn(oldEntity, newStateOrFn) : newStateOrFn(oldEntity);
    } else {
      newState = newStateOrFn;
    }
    const isIdChanged = newState.hasOwnProperty(idKey) && newState[idKey] !== oldEntity[idKey];
    let newEntity;
    idToUpdate = id;
    if (isIdChanged) {
      isUpdatingIdKey = true;
      idToUpdate = newState[idKey];
    }
    const merged = __spreadValues(__spreadValues({}, oldEntity), newState);
    if (isPlainObject(oldEntity)) {
      newEntity = merged;
    } else {
      if (isPlainObject(newState)) {
        newEntity = new oldEntity.constructor(merged);
      } else {
        newEntity = new newState.constructor(merged);
      }
    }
    updatedEntities[idToUpdate] = preUpdateEntity(oldEntity, newEntity);
  }
  let updatedIds = state.ids;
  let stateEntities = state.entities;
  if (isUpdatingIdKey) {
    const [id] = ids;
    const _a = state.entities, {
      [id]: deletedEntity
    } = _a, rest = __objRest(_a, [
      __restKey(id)
    ]);
    stateEntities = rest;
    updatedIds = state.ids.map((current) => current === id ? idToUpdate : current);
    onEntityIdChanges(id, idToUpdate);
  }
  return __spreadProps(__spreadValues({}, state), {
    entities: __spreadValues(__spreadValues({}, stateEntities), updatedEntities),
    ids: updatedIds
  });
}

// node_modules/@datorama/akita/src/lib/entityStore.js
var _b;
var EntityStore = class _EntityStore extends Store {
  constructor(initialState = {}, options = {}) {
    super(__spreadValues(__spreadValues({}, getInitialEntitiesState()), initialState), options);
    this.options = options;
    this.entityActions = new Subject();
    this.entityIdChanges = new Subject();
  }
  // @internal
  get selectEntityAction$() {
    return this.entityActions.asObservable();
  }
  // @internal
  get selectEntityIdChanges$() {
    return this.entityIdChanges.asObservable();
  }
  // @internal
  get idKey() {
    return this.config.idKey || this.options.idKey || DEFAULT_ID_KEY;
  }
  /**
   *
   * Replace current collection with provided collection
   *
   * @example
   *
   * this.store.set([Entity, Entity])
   * this.store.set({ids: [], entities: {}})
   * this.store.set({ 1: {}, 2: {}})
   *
   */
  set(entities, options = {}) {
    if (isNil(entities)) return;
    isDev() && setAction("Set Entity");
    const isNativePreAdd = this.akitaPreAddEntity === _EntityStore.prototype.akitaPreAddEntity;
    this.setHasCache(true, {
      restartTTL: true
    });
    this._setState((state) => {
      const newState = setEntities({
        state,
        entities,
        idKey: this.idKey,
        preAddEntity: this.akitaPreAddEntity.bind(this),
        isNativePreAdd
      });
      if (isUndefined(options.activeId) === false) {
        newState.active = options.activeId;
      }
      return newState;
    });
    if (this.hasInitialUIState()) {
      this.handleUICreation();
    }
    this.entityActions.next({
      type: EntityActions.Set,
      ids: this.ids
    });
  }
  /**
   * Add entities
   *
   * @example
   *
   * this.store.add([Entity, Entity])
   * this.store.add(Entity)
   * this.store.add(Entity, { prepend: true })
   *
   * this.store.add(Entity, { loading: false })
   */
  add(entities, options = {
    loading: false
  }) {
    const collection = coerceArray(entities);
    if (isEmpty(collection)) return;
    const data = addEntities({
      state: this._value(),
      preAddEntity: this.akitaPreAddEntity.bind(this),
      entities: collection,
      idKey: this.idKey,
      options
    });
    if (data) {
      isDev() && setAction("Add Entity");
      data.newState.loading = options.loading;
      this._setState(() => data.newState);
      if (this.hasInitialUIState()) {
        this.handleUICreation(true);
      }
      this.entityActions.next({
        type: EntityActions.Add,
        ids: data.newIds
      });
    }
  }
  update(idsOrFnOrState, newStateOrFn) {
    if (isUndefined(newStateOrFn)) {
      super.update(idsOrFnOrState);
      return;
    }
    let ids = [];
    if (isFunction(idsOrFnOrState)) {
      ids = this.ids.filter((id) => idsOrFnOrState(this.entities[id]));
    } else {
      ids = isNil(idsOrFnOrState) ? this.ids : coerceArray(idsOrFnOrState);
    }
    if (isEmpty(ids)) return;
    isDev() && setAction("Update Entity", ids);
    let entityIdChanged;
    this._setState((state) => updateEntities({
      idKey: this.idKey,
      ids,
      preUpdateEntity: this.akitaPreUpdateEntity.bind(this),
      state,
      newStateOrFn,
      producerFn: this._producerFn,
      onEntityIdChanges: (oldId, newId) => {
        entityIdChanged = {
          oldId,
          newId
        };
        this.entityIdChanges.next(__spreadProps(__spreadValues({}, entityIdChanged), {
          pending: true
        }));
      }
    }));
    if (entityIdChanged) {
      this.entityIdChanges.next(__spreadProps(__spreadValues({}, entityIdChanged), {
        pending: false
      }));
    }
    this.entityActions.next({
      type: EntityActions.Update,
      ids
    });
  }
  upsert(ids, newState, onCreate, options = {}) {
    const toArray = coerceArray(ids);
    const predicate = (isUpdate) => (id) => hasEntity(this.entities, id) === isUpdate;
    const baseClass = isFunction(onCreate) ? options.baseClass : onCreate ? onCreate.baseClass : void 0;
    const isClassBased = isFunction(baseClass);
    const updateIds = toArray.filter(predicate(true));
    const newEntities = toArray.filter(predicate(false)).map((id) => {
      const newStateObj = typeof newState === "function" ? newState({}) : newState;
      const entity = isFunction(onCreate) ? onCreate(id, newStateObj) : newStateObj;
      const withId = __spreadProps(__spreadValues({}, entity), {
        [this.idKey]: id
      });
      if (isClassBased) {
        return new baseClass(withId);
      }
      return withId;
    });
    this.update(updateIds, newState);
    this.add(newEntities);
    isDev() && logAction("Upsert Entity");
  }
  /**
   *
   * Upsert entity collection (idKey must be present)
   *
   * @example
   *
   * store.upsertMany([ { id: 1 }, { id: 2 }]);
   *
   * store.upsertMany([ { id: 1 }, { id: 2 }], { loading: true  });
   * store.upsertMany([ { id: 1 }, { id: 2 }], { baseClass: Todo  });
   *
   */
  upsertMany(entities, options = {}) {
    const addedIds = [];
    const updatedIds = [];
    const updatedEntities = {};
    for (const entity of entities) {
      const withPreCheckHook = this.akitaPreCheckEntity(entity);
      const id = withPreCheckHook[this.idKey];
      if (hasEntity(this.entities, id)) {
        const prev = this._value().entities[id];
        const merged = __spreadValues(__spreadValues({}, this._value().entities[id]), withPreCheckHook);
        const next = options.baseClass ? new options.baseClass(merged) : merged;
        const withHook = this.akitaPreUpdateEntity(prev, next);
        const nextId = withHook[this.idKey];
        updatedEntities[nextId] = withHook;
        updatedIds.push(nextId);
      } else {
        const newEntity = options.baseClass ? new options.baseClass(withPreCheckHook) : withPreCheckHook;
        const withHook = this.akitaPreAddEntity(newEntity);
        const nextId = withHook[this.idKey];
        addedIds.push(nextId);
        updatedEntities[nextId] = withHook;
      }
    }
    isDev() && logAction("Upsert Many");
    this._setState((state) => __spreadProps(__spreadValues({}, state), {
      ids: addedIds.length ? [...state.ids, ...addedIds] : state.ids,
      entities: __spreadValues(__spreadValues({}, state.entities), updatedEntities),
      loading: !!options.loading
    }));
    updatedIds.length && this.entityActions.next({
      type: EntityActions.Update,
      ids: updatedIds
    });
    addedIds.length && this.entityActions.next({
      type: EntityActions.Add,
      ids: addedIds
    });
    if (addedIds.length && this.hasUIStore()) {
      this.handleUICreation(true);
    }
  }
  /**
   *
   * Replace one or more entities (except the id property)
   *
   *
   * @example
   *
   * this.store.replace(5, newEntity)
   * this.store.replace([1,2,3], newEntity)
   */
  replace(ids, newState) {
    const toArray = coerceArray(ids);
    if (isEmpty(toArray)) return;
    const replaced = {};
    for (const id of toArray) {
      replaced[id] = __spreadProps(__spreadValues({}, newState), {
        [this.idKey]: id
      });
    }
    isDev() && setAction("Replace Entity", ids);
    this._setState((state) => __spreadProps(__spreadValues({}, state), {
      entities: __spreadValues(__spreadValues({}, state.entities), replaced)
    }));
  }
  /**
   *
   * Move entity inside the collection
   *
   *
   * @example
   *
   * this.store.move(fromIndex, toIndex)
   */
  move(from2, to) {
    const ids = this.ids.slice();
    ids.splice(to < 0 ? ids.length + to : to, 0, ids.splice(from2, 1)[0]);
    isDev() && setAction("Move Entity");
    this._setState((state) => __spreadProps(__spreadValues({}, state), {
      // Change the entities reference so that selectAll emit
      entities: __spreadValues({}, state.entities),
      ids
    }));
  }
  remove(idsOrFn) {
    if (isEmpty(this.ids)) return;
    const idPassed = isDefined(idsOrFn);
    let ids = [];
    if (isFunction(idsOrFn)) {
      ids = this.ids.filter((entityId) => idsOrFn(this.entities[entityId]));
    } else {
      ids = idPassed ? coerceArray(idsOrFn) : this.ids;
    }
    if (isEmpty(ids)) return;
    isDev() && setAction("Remove Entity", ids);
    this._setState((state) => removeEntities({
      state,
      ids
    }));
    if (!idPassed) {
      this.setHasCache(false);
    }
    this.handleUIRemove(ids);
    this.entityActions.next({
      type: EntityActions.Remove,
      ids
    });
  }
  /**
   *
   * Update the active entity
   *
   * @example
   *
   * this.store.updateActive({ completed: true })
   * this.store.updateActive(active => {
   *   return {
   *     config: {
   *      ..active.config,
   *      date
   *     }
   *   }
   * })
   */
  updateActive(newStateOrCallback) {
    const ids = coerceArray(this.active);
    isDev() && setAction("Update Active", ids);
    this.update(ids, newStateOrCallback);
  }
  setActive(idOrOptions) {
    const active = getActiveEntities(idOrOptions, this.ids, this.active);
    if (active === void 0) {
      return;
    }
    isDev() && setAction("Set Active", active);
    this._setActive(active);
  }
  /**
   * Add active entities
   *
   * @example
   *
   * store.addActive(2);
   * store.addActive([3, 4, 5]);
   */
  addActive(ids) {
    const toArray = coerceArray(ids);
    if (isEmpty(toArray)) return;
    const everyExist = toArray.every((id) => this.active.indexOf(id) > -1);
    if (everyExist) return;
    isDev() && setAction("Add Active", ids);
    this._setState((state) => {
      const uniques = Array.from(/* @__PURE__ */ new Set([...state.active, ...toArray]));
      return __spreadProps(__spreadValues({}, state), {
        active: uniques
      });
    });
  }
  /**
   * Remove active entities
   *
   * @example
   *
   * store.removeActive(2)
   * store.removeActive([3, 4, 5])
   */
  removeActive(ids) {
    const toArray = coerceArray(ids);
    if (isEmpty(toArray)) return;
    const someExist = toArray.some((id) => this.active.indexOf(id) > -1);
    if (!someExist) return;
    isDev() && setAction("Remove Active", ids);
    this._setState((state) => {
      return __spreadProps(__spreadValues({}, state), {
        active: Array.isArray(state.active) ? state.active.filter((currentId) => toArray.indexOf(currentId) === -1) : null
      });
    });
  }
  /**
   * Toggle active entities
   *
   * @example
   *
   * store.toggle(2)
   * store.toggle([3, 4, 5])
   */
  toggleActive(ids) {
    const toArray = coerceArray(ids);
    const filterExists = (remove2) => (id) => this.active.includes(id) === remove2;
    const remove = toArray.filter(filterExists(true));
    const add = toArray.filter(filterExists(false));
    this.removeActive(remove);
    this.addActive(add);
    isDev() && logAction("Toggle Active");
  }
  /**
   *
   * Create sub UI store for managing Entity's UI state
   *
   * @example
   *
   * export type ProductUI = {
   *   isLoading: boolean;
   *   isOpen: boolean
   * }
   *
   * interface ProductsUIState extends EntityState<ProductUI> {}
   *
   * export class ProductsStore EntityStore<ProductsState, Product> {
   *   ui: EntityUIStore<ProductsUIState, ProductUI>;
   *
   *   constructor() {
   *     super();
   *     this.createUIStore();
   *   }
   *
   * }
   */
  createUIStore(initialState = {}, storeConfig = {}) {
    const defaults = {
      name: `UI/${this.storeName}`,
      idKey: this.idKey
    };
    this.ui = new EntityUIStore(initialState, __spreadValues(__spreadValues({}, defaults), storeConfig));
    return this.ui;
  }
  // @internal
  destroy() {
    super.destroy();
    if (this.ui instanceof _EntityStore) {
      this.ui.destroy();
    }
    this.entityActions.complete();
  }
  // @internal
  akitaPreUpdateEntity(_, nextEntity) {
    return nextEntity;
  }
  // @internal
  akitaPreAddEntity(newEntity) {
    return newEntity;
  }
  // @internal
  akitaPreCheckEntity(newEntity) {
    return newEntity;
  }
  get ids() {
    return this._value().ids;
  }
  get entities() {
    return this._value().entities;
  }
  get active() {
    return this._value().active;
  }
  _setActive(ids) {
    this._setState((state) => {
      return __spreadProps(__spreadValues({}, state), {
        active: ids
      });
    });
  }
  handleUICreation(add = false) {
    const ids = this.ids;
    const isFunc = isFunction(this.ui._akitaCreateEntityFn);
    let uiEntities;
    const createFn = (id) => {
      const current = this.entities[id];
      const ui = isFunc ? this.ui._akitaCreateEntityFn(current) : this.ui._akitaCreateEntityFn;
      return __spreadValues({
        [this.idKey]: current[this.idKey]
      }, ui);
    };
    if (add) {
      uiEntities = this.ids.filter((id) => isUndefined(this.ui.entities[id])).map(createFn);
    } else {
      uiEntities = ids.map(createFn);
    }
    add ? this.ui.add(uiEntities) : this.ui.set(uiEntities);
  }
  hasInitialUIState() {
    return this.hasUIStore() && isUndefined(this.ui._akitaCreateEntityFn) === false;
  }
  handleUIRemove(ids) {
    if (this.hasUIStore()) {
      this.ui.remove(ids);
    }
  }
  hasUIStore() {
    return this.ui instanceof EntityUIStore;
  }
};
__decorate([transaction(), __metadata("design:type", Function), __metadata("design:paramtypes", [Object, Object, Object, Object]), __metadata("design:returntype", void 0)], EntityStore.prototype, "upsert", null);
__decorate([transaction(), __metadata("design:type", Function), __metadata("design:paramtypes", [typeof (_b = typeof T !== "undefined" && T) === "function" ? _b : Object]), __metadata("design:returntype", void 0)], EntityStore.prototype, "toggleActive", null);
var EntityUIStore = class extends EntityStore {
  constructor(initialState = {}, storeConfig = {}) {
    super(initialState, storeConfig);
  }
  /**
   *
   * Set the initial UI entity state. This function will determine the entity's
   * initial state when we call `set()` or `add()`.
   *
   * @example
   *
   * constructor() {
   *   super();
   *   this.createUIStore().setInitialEntityState(entity => ({ isLoading: false, isOpen: true }));
   *   this.createUIStore().setInitialEntityState({ isLoading: false, isOpen: true });
   * }
   *
   */
  setInitialEntityState(createFn) {
    this._akitaCreateEntityFn = createFn;
  }
};

// node_modules/@datorama/akita/src/lib/filterNil.js
var filterNil = (source) => source.pipe(filter((value) => value !== null && typeof value !== "undefined"));
function filterNilValue() {
  return filter((value) => value !== null && value !== void 0);
}

// node_modules/@datorama/akita/src/lib/compareKeys.js
function compareKeys(keysOrFuncs) {
  return function(prevState, currState) {
    const isFns = isFunction(keysOrFuncs[0]);
    return keysOrFuncs.some((keyOrFunc) => {
      if (isFns) {
        return keyOrFunc(prevState) !== keyOrFunc(currState);
      }
      return prevState[keyOrFunc] !== currState[keyOrFunc];
    }) === false;
  };
}

// node_modules/@datorama/akita/src/lib/isString.js
function isString(value) {
  return typeof value === "string";
}

// node_modules/@datorama/akita/src/lib/queryConfig.js
var queryConfigKey = "akitaQueryConfig";
function QueryConfig(metadata) {
  return function(constructor) {
    constructor[queryConfigKey] = {};
    for (let i = 0, keys = Object.keys(metadata); i < keys.length; i++) {
      const key = keys[i];
      constructor[queryConfigKey][key] = metadata[key];
    }
  };
}

// node_modules/@datorama/akita/src/lib/query.js
var Query = class {
  constructor(store) {
    this.store = store;
    this.__store__ = store;
    if (isDev()) {
      __queries__[store.storeName] = this;
    }
  }
  select(project) {
    let mapFn;
    if (isFunction(project)) {
      mapFn = project;
    } else if (isString(project)) {
      mapFn = (state) => state[project];
    } else if (Array.isArray(project)) {
      return this.store._select((state) => state).pipe(distinctUntilChanged(compareKeys(project)), map((state) => {
        if (isFunction(project[0])) {
          return project.map((func) => func(state));
        }
        return project.reduce((acc, k) => {
          acc[k] = state[k];
          return acc;
        }, {});
      }));
    } else {
      mapFn = (state) => state;
    }
    return this.store._select(mapFn);
  }
  /**
   * Select the loading state
   *
   * @example
   *
   * this.query.selectLoading().subscribe(isLoading => {})
   */
  selectLoading() {
    return this.select((state) => state.loading);
  }
  /**
   * Select the error state
   *
   * @example
   *
   * this.query.selectError().subscribe(error => {})
   */
  selectError() {
    return this.select((state) => state.error);
  }
  /**
   * Get the store's value
   *
   * @example
   *
   * this.query.getValue()
   *
   */
  getValue() {
    return this.store._value();
  }
  /**
   * Select the cache state
   *
   * @example
   *
   * this.query.selectHasCache().pipe(
   *   switchMap(hasCache => {
   *     return hasCache ? of() : http().pipe(res => store.set(res))
   *   })
   * )
   */
  selectHasCache() {
    return this.store._cache().asObservable();
  }
  /**
   * Whether we've cached data
   *
   * @example
   *
   * this.query.getHasCache()
   *
   */
  getHasCache() {
    return this.store._cache().value;
  }
  // @internal
  get config() {
    return this.constructor[queryConfigKey];
  }
};

// node_modules/@datorama/akita/src/lib/getEntity.js
function findEntityByPredicate(predicate, entities) {
  for (const entityId of Object.keys(entities)) {
    if (predicate(entities[entityId]) === true) {
      return entityId;
    }
  }
  return void 0;
}
function getEntity(id, project) {
  return function(entities) {
    const entity = entities[id];
    if (isUndefined(entity)) {
      return void 0;
    }
    if (!project) {
      return entity;
    }
    if (isString(project)) {
      return entity[project];
    }
    return project(entity);
  };
}

// node_modules/@datorama/akita/src/lib/mapSkipUndefined.js
function mapSkipUndefined(arr, callbackFn) {
  return arr.reduce((result, value, index, array) => {
    const val = callbackFn(value, index, array);
    if (val !== void 0) {
      result.push(val);
    }
    return result;
  }, []);
}

// node_modules/@datorama/akita/src/lib/sortByOptions.js
function sortByOptions(options, config) {
  options.sortBy = options.sortBy || config && config.sortBy;
  options.sortByOrder = options.sortByOrder || config && config.sortByOrder;
}

// node_modules/@datorama/akita/src/lib/queryEntity.js
var QueryEntity = class extends Query {
  constructor(store, options = {}) {
    super(store);
    this.options = options;
    this.__store__ = store;
  }
  selectAll(options = {
    asObject: false
  }) {
    return this.select((state) => state.entities).pipe(map(() => this.getAll(options)));
  }
  getAll(options = {
    asObject: false,
    filterBy: void 0,
    limitTo: void 0
  }) {
    if (options.asObject) {
      return entitiesToMap(this.getValue(), options);
    }
    sortByOptions(options, this.config || this.options);
    return entitiesToArray(this.getValue(), options);
  }
  selectMany(ids, project) {
    if (!ids || !ids.length) return of([]);
    return this.select((state) => state.entities).pipe(map((entities) => mapSkipUndefined(ids, (id) => getEntity(id, project)(entities))), distinctUntilArrayItemChanged());
  }
  selectEntity(idOrPredicate, project) {
    let id = idOrPredicate;
    if (isFunction(idOrPredicate)) {
      id = findEntityByPredicate(idOrPredicate, this.getValue().entities);
    }
    return this.select((state) => state.entities).pipe(map(getEntity(id, project)), distinctUntilChanged());
  }
  /**
   * Get an entity by id
   *
   * @example
   *
   * this.query.getEntity(1);
   */
  getEntity(id) {
    return this.getValue().entities[id];
  }
  /**
   * Select the active entity's id
   *
   * @example
   *
   * this.query.selectActiveId()
   */
  selectActiveId() {
    return this.select((state) => state.active);
  }
  /**
   * Get the active id
   *
   * @example
   *
   * this.query.getActiveId()
   */
  getActiveId() {
    return this.getValue().active;
  }
  selectActive(project) {
    if (isArray(this.getActive())) {
      return this.selectActiveId().pipe(switchMap((ids) => this.selectMany(ids, project)));
    }
    return this.selectActiveId().pipe(switchMap((ids) => this.selectEntity(ids, project)));
  }
  getActive() {
    const activeId = this.getActiveId();
    if (isArray(activeId)) {
      return activeId.map((id) => this.getValue().entities[id]);
    }
    return toBoolean(activeId) ? this.getEntity(activeId) : void 0;
  }
  /**
   * Select the store's entity collection length
   *
   * @example
   *
   * this.query.selectCount()
   * this.query.selectCount(entity => entity.completed)
   */
  selectCount(predicate) {
    return this.select((state) => state.entities).pipe(map(() => this.getCount(predicate)));
  }
  /**
   * Get the store's entity collection length
   *
   * @example
   *
   * this.query.getCount()
   * this.query.getCount(entity => entity.completed)
   */
  getCount(predicate) {
    if (isFunction(predicate)) {
      return this.getAll().filter(predicate).length;
    }
    return this.getValue().ids.length;
  }
  selectLast(project) {
    return this.selectAt((ids) => ids[ids.length - 1], project);
  }
  selectFirst(project) {
    return this.selectAt((ids) => ids[0], project);
  }
  selectEntityAction(actionOrActions) {
    if (isNil(actionOrActions)) {
      return this.store.selectEntityAction$;
    }
    const project = isArray(actionOrActions) ? (action2) => action2 : ({
      ids
    }) => ids;
    const actions = coerceArray(actionOrActions);
    return this.store.selectEntityAction$.pipe(filter(({
      type
    }) => actions.includes(type)), map((action2) => project(action2)));
  }
  hasEntity(projectOrIds) {
    if (isNil(projectOrIds)) {
      return this.getValue().ids.length > 0;
    }
    if (isFunction(projectOrIds)) {
      return this.getAll().some(projectOrIds);
    }
    if (isArray(projectOrIds)) {
      return projectOrIds.every((id) => id in this.getValue().entities);
    }
    return projectOrIds in this.getValue().entities;
  }
  /**
   * Returns whether entity store has an active entity
   *
   * @example
   *
   * this.query.hasActive()
   * this.query.hasActive(3)
   *
   */
  hasActive(id) {
    const active = this.getValue().active;
    const isIdProvided = isDefined(id);
    if (Array.isArray(active)) {
      if (isIdProvided) {
        return active.includes(id);
      }
      return active.length > 0;
    }
    return isIdProvided ? active === id : isDefined(active);
  }
  /**
   *
   * Create sub UI query for querying Entity's UI state
   *
   * @example
   *
   *
   * export class ProductsQuery extends QueryEntity<ProductsState> {
   *   ui: EntityUIQuery<ProductsUIState>;
   *
   *   constructor(protected store: ProductsStore) {
   *     super(store);
   *     this.createUIQuery();
   *   }
   *
   * }
   */
  createUIQuery() {
    this.ui = new EntityUIQuery(this.__store__.ui);
  }
  selectAt(mapFn, project) {
    return this.select((state) => state.ids).pipe(map(mapFn), distinctUntilChanged(), switchMap((id) => this.selectEntity(id, project)));
  }
};
var EntityUIQuery = class extends QueryEntity {
  constructor(store) {
    super(store);
  }
};

// node_modules/@datorama/akita/src/lib/fp.js
function createStore(initialState, options) {
  return new Store(initialState, options);
}
function createQuery(store) {
  return new Query(store);
}
function createEntityStore(initialState, options) {
  return new EntityStore(initialState, options);
}
function createEntityQuery(store, options = {}) {
  return new QueryEntity(store, options);
}

// node_modules/@datorama/akita/src/lib/getValueByString.js
function getValue(obj, prop) {
  if (prop.split(".").length === 1) {
    return obj;
  }
  const removeStoreName = prop.split(".").slice(1).join(".");
  return removeStoreName.split(".").reduce((acc, part) => acc && acc[part], obj);
}

// node_modules/@datorama/akita/src/lib/guid.js
function guid() {
  return Math.random().toString(36).slice(2);
}

// node_modules/@datorama/akita/src/lib/isNumber.js
function isNumber(value) {
  return !isArray(value) && value - parseFloat(value) + 1 >= 0;
}

// node_modules/@datorama/akita/src/lib/setValueByString.js
function setValue(obj, prop, val, replace = false) {
  const split = prop.split(".");
  if (split.length === 1) {
    return __spreadValues(__spreadValues({}, obj), val);
  }
  obj = __spreadValues({}, obj);
  const lastIndex = split.length - 2;
  const removeStoreName = prop.split(".").slice(1);
  removeStoreName.reduce((acc, part, index) => {
    if (index !== lastIndex) {
      acc[part] = __spreadValues({}, acc[part]);
      return acc && acc[part];
    }
    acc[part] = replace || Array.isArray(acc[part]) || !isObject(acc[part]) ? val : __spreadValues(__spreadValues({}, acc[part]), val);
    return acc && acc[part];
  }, obj);
  return obj;
}

// node_modules/@datorama/akita/src/lib/persistState.js
var skipStorageUpdate = false;
var _persistStateInit = new ReplaySubject(1);
function selectPersistStateInit() {
  return _persistStateInit.asObservable();
}
function setSkipStorageUpdate(skip2) {
  skipStorageUpdate = skip2;
}
function getSkipStorageUpdate() {
  return skipStorageUpdate;
}
function isPromise(v) {
  return v && isFunction(v.then);
}
function observify(asyncOrValue) {
  if (isPromise(asyncOrValue) || isObservable(asyncOrValue)) {
    return from(asyncOrValue);
  }
  return of(asyncOrValue);
}
function persistState(params) {
  const defaults = {
    key: "AkitaStores",
    enableInNonBrowser: false,
    storage: !hasLocalStorage() ? params.storage : localStorage,
    deserialize: JSON.parse,
    serialize: JSON.stringify,
    include: [],
    select: [],
    persistOnDestroy: false,
    preStorageUpdate: function(storeName, state) {
      return state;
    },
    preStoreUpdate: function(storeName, state) {
      return state;
    },
    skipStorageUpdate: getSkipStorageUpdate,
    preStorageUpdateOperator: () => (source) => source
  };
  const {
    storage,
    enableInNonBrowser,
    deserialize,
    serialize,
    include,
    select,
    key,
    preStorageUpdate,
    persistOnDestroy,
    preStorageUpdateOperator,
    preStoreUpdate,
    skipStorageUpdate: skipStorageUpdate2
  } = Object.assign({}, defaults, params);
  if (isNotBrowser && !enableInNonBrowser || !storage) return;
  const hasInclude = include.length > 0;
  const hasSelect = select.length > 0;
  let includeStores;
  let selectStores;
  if (hasInclude) {
    includeStores = include.reduce((acc2, path) => {
      if (isFunction(path)) {
        acc2.fns.push(path);
      } else {
        const storeName = path.split(".")[0];
        acc2[storeName] = path;
      }
      return acc2;
    }, {
      fns: []
    });
  }
  if (hasSelect) {
    selectStores = select.reduce((acc2, selectFn) => {
      acc2[selectFn.storeName] = selectFn;
      return acc2;
    }, {});
  }
  let stores = {};
  const acc = {};
  const subscriptions = [];
  const buffer = [];
  function _save(v) {
    observify(v).subscribe(() => {
      const next = buffer.shift();
      next && _save(next);
    });
  }
  const isLocalStorage = hasLocalStorage() && storage === localStorage || hasSessionStorage() && storage === sessionStorage;
  observify(storage.getItem(key)).subscribe((value) => {
    let storageState = isObject(value) ? value : deserialize(value || "{}");
    function save(storeCache) {
      storageState["$cache"] = __spreadValues(__spreadValues({}, storageState["$cache"] || {}), storeCache);
      storageState = Object.assign({}, storageState, acc);
      buffer.push(storage.setItem(key, isLocalStorage ? serialize(storageState) : storageState));
      _save(buffer.shift());
    }
    function subscribe(storeName, path) {
      stores[storeName] = __stores__[storeName]._select((state) => getValue(state, path)).pipe(skip(1), map((store) => {
        if (hasSelect && selectStores[storeName]) {
          return selectStores[storeName](store);
        }
        return store;
      }), filter(() => skipStorageUpdate2() === false), preStorageUpdateOperator()).subscribe((data) => {
        acc[storeName] = preStorageUpdate(storeName, data);
        Promise.resolve().then(() => save({
          [storeName]: __stores__[storeName]._cache().getValue()
        }));
      });
    }
    function setInitial(storeName, store, path) {
      if (storeName in storageState) {
        setAction("@PersistState");
        store._setState((state) => {
          return setValue(state, path, preStoreUpdate(storeName, storageState[storeName], state));
        });
        const hasCache = storageState["$cache"] ? storageState["$cache"][storeName] : false;
        __stores__[storeName].setHasCache(hasCache, {
          restartTTL: true
        });
      }
    }
    subscriptions.push($$deleteStore.subscribe((storeName) => {
      if (stores[storeName]) {
        if (persistOnDestroy === false) {
          save({
            [storeName]: false
          });
        }
        stores[storeName].unsubscribe();
        delete stores[storeName];
      }
    }));
    subscriptions.push($$addStore.subscribe((storeName) => {
      if (storeName === "router") {
        return;
      }
      const store = __stores__[storeName];
      if (hasInclude) {
        let path = includeStores[storeName];
        if (!path) {
          const passPredicate = includeStores.fns.some((fn) => fn(storeName));
          if (passPredicate) {
            path = storeName;
          } else {
            return;
          }
        }
        setInitial(storeName, store, path);
        subscribe(storeName, path);
      } else {
        setInitial(storeName, store, storeName);
        subscribe(storeName, storeName);
      }
    }));
    _persistStateInit.next(true);
  });
  return {
    destroy() {
      subscriptions.forEach((s) => s.unsubscribe());
      for (let i = 0, keys = Object.keys(stores); i < keys.length; i++) {
        const storeName = keys[i];
        stores[storeName].unsubscribe();
      }
      stores = {};
    },
    clear() {
      storage.clear();
    },
    clearStore(storeName) {
      if (isNil(storeName)) {
        const value2 = observify(storage.setItem(key, "{}"));
        value2.subscribe();
        return;
      }
      const value = storage.getItem(key);
      observify(value).subscribe((v) => {
        const storageState = deserialize(v || "{}");
        if (storageState[storeName]) {
          delete storageState[storeName];
          const value2 = observify(storage.setItem(key, serialize(storageState)));
          value2.subscribe();
        }
      });
    }
  };
}

// node_modules/@datorama/akita/src/lib/plugins/plugin.js
var AkitaPlugin = class {
  constructor(query, config) {
    this.query = query;
    if (config && config.resetFn) {
      if (getAkitaConfig().resettable) {
        this.onReset(config.resetFn);
      }
    }
  }
  /** This method is responsible for getting access to the query. */
  getQuery() {
    return this.query;
  }
  /** This method is responsible for getting access to the store. */
  getStore() {
    return this.getQuery().__store__;
  }
  /** This method is responsible tells whether the plugin is entityBased or not.  */
  isEntityBased(entityId) {
    return toBoolean(entityId);
  }
  /** This method is responsible for selecting the source; it can be the whole store or one entity. */
  selectSource(entityId, property) {
    if (this.isEntityBased(entityId)) {
      return this.getQuery().selectEntity(entityId).pipe(filterNilValue());
    }
    if (property) {
      return this.getQuery().select((state) => getValue(state, this.withStoreName(property)));
    }
    return this.getQuery().select();
  }
  getSource(entityId, property) {
    if (this.isEntityBased(entityId)) {
      return this.getQuery().getEntity(entityId);
    }
    const state = this.getQuery().getValue();
    if (property) {
      return getValue(state, this.withStoreName(property));
    }
    return state;
  }
  withStoreName(prop) {
    return `${this.storeName}.${prop}`;
  }
  get storeName() {
    return this.getStore().storeName;
  }
  /** This method is responsible for updating the store or one entity; it can be the whole store or one entity. */
  updateStore(newState, entityId, property, replace = false) {
    if (this.isEntityBased(entityId)) {
      const store = this.getStore();
      replace ? store.replace(entityId, newState) : store.update(entityId, newState);
    } else {
      if (property) {
        this.getStore()._setState((state) => {
          return setValue(state, this.withStoreName(property), newState, true);
        });
        return;
      }
      const nextState = replace ? newState : (state) => __spreadValues(__spreadValues({}, state), newState);
      this.getStore()._setState(nextState);
    }
  }
  /**
   * Function to invoke upon reset
   */
  onReset(fn) {
    const original = this.getStore().reset;
    this.getStore().reset = (...params) => {
      setTimeout(() => {
        original.apply(this.getStore(), params);
        fn();
      });
    };
  }
};

// node_modules/@datorama/akita/src/lib/plugins/dirtyCheck/dirtyCheckPlugin.js
var dirtyCheckDefaultParams = {
  comparator: (head, current) => JSON.stringify(head) !== JSON.stringify(current)
};
function getNestedPath(nestedObj, path) {
  const pathAsArray = path.split(".");
  return pathAsArray.reduce((obj, key) => obj && obj[key] !== "undefined" ? obj[key] : void 0, nestedObj);
}
var DirtyCheckPlugin = class extends AkitaPlugin {
  constructor(query, params, _entityId) {
    super(query);
    this.query = query;
    this.params = params;
    this._entityId = _entityId;
    this.dirty = new BehaviorSubject(false);
    this.active = false;
    this._reset = new Subject();
    this.isDirty$ = this.dirty.asObservable().pipe(distinctUntilChanged());
    this.reset$ = this._reset.asObservable();
    this.params = __spreadValues(__spreadValues({}, dirtyCheckDefaultParams), params);
    if (this.params.watchProperty) {
      const watchProp = coerceArray(this.params.watchProperty);
      if (query instanceof QueryEntity && watchProp.includes("entities") && !watchProp.includes("ids")) {
        watchProp.push("ids");
      }
      this.params.watchProperty = watchProp;
    }
  }
  reset(params = {}) {
    let currentValue = this.head;
    if (isFunction(params.updateFn)) {
      if (this.isEntityBased(this._entityId)) {
        currentValue = params.updateFn(this.head, this.getQuery().getEntity(this._entityId));
      } else {
        currentValue = params.updateFn(this.head, this.getQuery().getValue());
      }
    }
    logAction(`@DirtyCheck - Revert`);
    this.updateStore(currentValue, this._entityId);
    this._reset.next(true);
  }
  setHead() {
    if (!this.active) {
      this.activate();
      this.active = true;
    } else {
      this.head = this._getHead();
    }
    this.updateDirtiness(false);
    return this;
  }
  isDirty() {
    return !!this.dirty.value;
  }
  hasHead() {
    return !!this.getHead();
  }
  destroy() {
    this.head = null;
    this.subscription && this.subscription.unsubscribe();
    this._reset && this._reset.complete();
  }
  isPathDirty(path) {
    const head = this.getHead();
    const current = this.getQuery().getValue();
    const currentPathValue = getNestedPath(current, path);
    const headPathValue = getNestedPath(head, path);
    return this.params.comparator(currentPathValue, headPathValue);
  }
  getHead() {
    return this.head;
  }
  activate() {
    this.head = this._getHead();
    const sources = this.params.watchProperty ? this.params.watchProperty.map((prop) => this.query.select((state) => state[prop]).pipe(map((val) => ({
      val,
      __akitaKey: prop
    })))) : [this.selectSource(this._entityId)];
    this.subscription = combineLatest(sources).pipe(skip(1)).subscribe((currentState) => {
      if (isUndefined(this.head)) return;
      const isChange = currentState.some((state) => {
        const head = state.__akitaKey ? this.head[state.__akitaKey] : this.head;
        const compareTo = state.__akitaKey ? state.val : state;
        return this.params.comparator(head, compareTo);
      });
      this.updateDirtiness(isChange);
    });
  }
  updateDirtiness(isDirty) {
    this.dirty.next(isDirty);
  }
  _getHead() {
    let head = this.getSource(this._entityId);
    if (this.params.watchProperty) {
      head = this.getWatchedValues(head);
    }
    return head;
  }
  getWatchedValues(source) {
    return this.params.watchProperty.reduce((watched, prop) => {
      watched[prop] = source[prop];
      return watched;
    }, {});
  }
};

// node_modules/@datorama/akita/src/lib/plugins/entityCollectionPlugin.js
var EntityCollectionPlugin = class {
  constructor(query, entityIds) {
    this.query = query;
    this.entityIds = entityIds;
    this.entities = /* @__PURE__ */ new Map();
  }
  /**
   * Get the entity plugin instance.
   */
  getEntity(id) {
    return this.entities.get(id);
  }
  /**
   * Whether the entity plugin exist.
   */
  hasEntity(id) {
    return this.entities.has(id);
  }
  /**
   * Remove the entity plugin instance.
   */
  removeEntity(id) {
    this.destroy(id);
    return this.entities.delete(id);
  }
  /**
   * Set the entity plugin instance.
   */
  createEntity(id, plugin) {
    return this.entities.set(id, plugin);
  }
  /**
   * If the user passes `entityIds` we take them; otherwise, we take all.
   */
  getIds() {
    return isUndefined(this.entityIds) ? this.query.getValue().ids : coerceArray(this.entityIds);
  }
  /**
   * When you call one of the plugin methods, you can pass id/ids or undefined which means all.
   */
  resolvedIds(ids) {
    return isUndefined(ids) ? this.getIds() : coerceArray(ids);
  }
  /**
   * Call this method when you want to activate the plugin on init or when you need to listen to add/remove of entities dynamically.
   *
   * For example in your plugin you may do the following:
   *
   * this.query.select(state => state.ids).pipe(skip(1)).subscribe(ids => this.activate(ids));
   */
  rebase(ids, actions = {}) {
    if (toBoolean(ids)) {
      if (isUndefined(this.entityIds)) {
        for (let i = 0, len = ids.length; i < len; i++) {
          const entityId = ids[i];
          if (this.hasEntity(entityId) === false) {
            isFunction(actions.beforeAdd) && actions.beforeAdd(entityId);
            const plugin = this.instantiatePlugin(entityId);
            this.entities.set(entityId, plugin);
            isFunction(actions.afterAdd) && actions.afterAdd(plugin);
          }
        }
        this.entities.forEach((plugin, entityId) => {
          if (ids.indexOf(entityId) === -1) {
            isFunction(actions.beforeRemove) && actions.beforeRemove(plugin);
            this.removeEntity(entityId);
          }
        });
      } else {
        const _ids = coerceArray(this.entityIds);
        for (let i = 0, len = _ids.length; i < len; i++) {
          const entityId = _ids[i];
          if (ids.indexOf(entityId) > -1 && this.hasEntity(entityId) === false) {
            isFunction(actions.beforeAdd) && actions.beforeAdd(entityId);
            const plugin = this.instantiatePlugin(entityId);
            this.entities.set(entityId, plugin);
            isFunction(actions.afterAdd) && actions.afterAdd(plugin);
          } else {
            this.entities.forEach((plugin, entityId2) => {
              if (ids.indexOf(entityId2) === -1 && this.hasEntity(entityId2) === true) {
                isFunction(actions.beforeRemove) && actions.beforeRemove(plugin);
                this.removeEntity(entityId2);
              }
            });
          }
        }
      }
    } else {
      this.getIds().forEach((id) => {
        if (!this.hasEntity(id)) this.createEntity(id, this.instantiatePlugin(id));
      });
    }
  }
  /**
   * Listen for add/remove entities.
   */
  selectIds() {
    return this.query.select((state) => state.ids);
  }
  /**
   * Base method for activation, you can override it if you need to.
   */
  activate(ids) {
    this.rebase(ids);
  }
  /**
   * Loop over each id and invoke the plugin method.
   */
  forEachId(ids, cb) {
    const _ids = this.resolvedIds(ids);
    for (let i = 0, len = _ids.length; i < len; i++) {
      const id = _ids[i];
      if (this.hasEntity(id)) {
        cb(this.getEntity(id));
      }
    }
  }
};

// node_modules/@datorama/akita/src/lib/plugins/dirtyCheck/entityDirtyCheckPlugin.js
var EntityDirtyCheckPlugin = class extends EntityCollectionPlugin {
  constructor(query, params = {}) {
    super(query, params.entityIds);
    this.query = query;
    this.params = params;
    this._someDirty = new Subject();
    this.someDirty$ = merge(this.query.select((state) => state.entities), this._someDirty.asObservable()).pipe(auditTime(0), map(() => this.checkSomeDirty()));
    this.params = __spreadValues(__spreadValues({}, dirtyCheckDefaultParams), params);
    this.activate();
    this.selectIds().pipe(skip(1)).subscribe((ids) => {
      super.rebase(ids, {
        afterAdd: (plugin) => plugin.setHead()
      });
    });
  }
  setHead(ids) {
    if (this.params.entityIds && ids) {
      const toArray = coerceArray(ids);
      const someAreWatched = coerceArray(this.params.entityIds).some((id) => toArray.indexOf(id) > -1);
      if (someAreWatched === false) {
        return this;
      }
    }
    this.forEachId(ids, (e) => e.setHead());
    this._someDirty.next(true);
    return this;
  }
  hasHead(id) {
    if (this.entities.has(id)) {
      const entity = this.getEntity(id);
      return entity.hasHead();
    }
    return false;
  }
  reset(ids, params = {}) {
    this.forEachId(ids, (e) => e.reset(params));
  }
  isDirty(id, asObservable = true) {
    if (this.entities.has(id)) {
      const entity = this.getEntity(id);
      return asObservable ? entity.isDirty$ : entity.isDirty();
    }
    return false;
  }
  someDirty() {
    return this.checkSomeDirty();
  }
  isPathDirty(id, path) {
    if (this.entities.has(id)) {
      const head = this.getEntity(id).getHead();
      const current = this.query.getEntity(id);
      const currentPathValue = getNestedPath(current, path);
      const headPathValue = getNestedPath(head, path);
      return this.params.comparator(currentPathValue, headPathValue);
    }
    return null;
  }
  destroy(ids) {
    this.forEachId(ids, (e) => e.destroy());
    if (!ids) {
      this._someDirty.complete();
    }
  }
  instantiatePlugin(id) {
    return new DirtyCheckPlugin(this.query, this.params, id);
  }
  checkSomeDirty() {
    const entitiesIds = this.resolvedIds();
    for (const id of entitiesIds) {
      if (this.getEntity(id).isDirty()) {
        return true;
      }
    }
    return false;
  }
};

// node_modules/@datorama/akita/src/lib/plugins/paginator/paginatorPlugin.js
var paginatorDefaults = {
  pagesControls: false,
  range: false,
  startWith: 1,
  cacheTimeout: void 0,
  clearStoreWithCache: true
};
var PaginatorPlugin = class extends AkitaPlugin {
  constructor(query, config = {}) {
    super(query, {
      resetFn: () => {
        this.initial = false;
        this.destroy({
          clearCache: true,
          currentPage: 1
        });
      }
    });
    this.query = query;
    this.config = config;
    this.metadata = /* @__PURE__ */ new Map();
    this.pages = /* @__PURE__ */ new Map();
    this.pagination = {
      currentPage: 1,
      perPage: 0,
      total: 0,
      lastPage: 0,
      data: []
    };
    this.initial = true;
    this.isLoading$ = this.query.selectLoading().pipe(delay(0));
    this.config = __spreadValues(__spreadValues({}, paginatorDefaults), config);
    const {
      startWith,
      cacheTimeout
    } = this.config;
    this.page = new BehaviorSubject(startWith);
    if (isObservable(cacheTimeout)) {
      this.clearCacheSubscription = cacheTimeout.subscribe(() => this.clearCache());
    }
  }
  /**
   * Listen to page changes
   */
  get pageChanges() {
    return this.page.asObservable();
  }
  /**
   * Get the current page number
   */
  get currentPage() {
    return this.pagination.currentPage;
  }
  /**
   * Check if current page is the first one
   */
  get isFirst() {
    return this.currentPage === 1;
  }
  /**
   * Check if current page is the last one
   */
  get isLast() {
    return this.currentPage === this.pagination.lastPage;
  }
  /**
   * Whether to generate an array of pages for *ngFor
   * [1, 2, 3, 4]
   */
  withControls() {
    this.config.pagesControls = true;
    return this;
  }
  /**
   * Whether to generate the `from` and `to` keys
   * [1, 2, 3, 4]
   */
  withRange() {
    this.config.range = true;
    return this;
  }
  /**
   * Set the loading state
   */
  setLoading(value = true) {
    this.getStore().setLoading(value);
  }
  /**
   * Update the pagination object and add the page
   */
  update(response) {
    this.pagination = response;
    this.addPage(response.data);
  }
  /**
   *
   * Set the ids and add the page to store
   */
  addPage(data) {
    this.pages.set(this.currentPage, {
      ids: data.map((entity) => entity[this.getStore().idKey])
    });
    this.getStore().upsertMany(data);
  }
  /**
   * Clear the cache.
   */
  clearCache(options = {}) {
    if (!this.initial) {
      logAction("@Pagination - Clear Cache");
      if (options.clearStore !== false && (this.config.clearStoreWithCache || options.clearStore)) {
        this.getStore().remove();
      }
      this.pages = /* @__PURE__ */ new Map();
      this.metadata = /* @__PURE__ */ new Map();
    }
    this.initial = false;
  }
  clearPage(page) {
    this.pages.delete(page);
  }
  /**
   * Clear the cache timeout and optionally the pages
   */
  destroy({
    clearCache,
    currentPage
  } = {}) {
    if (this.clearCacheSubscription) {
      this.clearCacheSubscription.unsubscribe();
    }
    if (clearCache) {
      this.clearCache();
    }
    if (!isUndefined(currentPage)) {
      this.setPage(currentPage);
    }
    this.initial = true;
  }
  /**
   * Whether the provided page is active
   */
  isPageActive(page) {
    return this.currentPage === page;
  }
  /**
   * Set the current page
   */
  setPage(page) {
    if (page !== this.currentPage || !this.hasPage(page)) {
      this.page.next(this.pagination.currentPage = page);
    }
  }
  /**
   * Increment current page
   */
  nextPage() {
    if (this.currentPage !== this.pagination.lastPage) {
      this.setPage(this.pagination.currentPage + 1);
    }
  }
  /**
   * Decrement current page
   */
  prevPage() {
    if (this.pagination.currentPage > 1) {
      this.setPage(this.pagination.currentPage - 1);
    }
  }
  /**
   * Set current page to last
   */
  setLastPage() {
    this.setPage(this.pagination.lastPage);
  }
  /**
   * Set current page to first
   */
  setFirstPage() {
    this.setPage(1);
  }
  /**
   * Check if page exists in cache
   */
  hasPage(page) {
    return this.pages.has(page);
  }
  /**
   * Get the current page if it's in cache, otherwise invoke the request
   */
  getPage(req) {
    let page = this.pagination.currentPage;
    if (this.hasPage(page)) {
      return this.selectPage(page);
    } else {
      this.setLoading(true);
      return from(req()).pipe(switchMap((config) => {
        page = config.currentPage;
        applyTransaction(() => {
          this.setLoading(false);
          this.update(config);
        });
        return this.selectPage(page);
      }));
    }
  }
  getQuery() {
    return this.query;
  }
  refreshCurrentPage() {
    if (isNil(this.currentPage) === false) {
      this.clearPage(this.currentPage);
      this.setPage(this.currentPage);
    }
  }
  getFrom() {
    if (this.isFirst) {
      return 1;
    }
    return (this.currentPage - 1) * this.pagination.perPage + 1;
  }
  getTo() {
    if (this.isLast) {
      return this.pagination.total;
    }
    return this.currentPage * this.pagination.perPage;
  }
  /**
   * Select the page
   */
  selectPage(page) {
    return this.query.selectAll({
      asObject: true
    }).pipe(take(1), map((entities) => {
      const response = __spreadProps(__spreadValues({}, this.pagination), {
        data: this.pages.get(page).ids.map((id) => entities[id])
      });
      const {
        range,
        pagesControls
      } = this.config;
      if (isNaN(this.pagination.total)) {
        if (response.lastPage === 1) {
          response.total = response.data ? response.data.length : 0;
        } else {
          response.total = response.perPage * response.lastPage;
        }
        this.pagination.total = response.total;
      }
      if (range) {
        response.from = this.getFrom();
        response.to = this.getTo();
      }
      if (pagesControls) {
        response.pageControls = generatePages(this.pagination.total, this.pagination.perPage);
      }
      return response;
    }));
  }
};
__decorate([action("@Pagination - New Page"), __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], PaginatorPlugin.prototype, "update", null);
function generatePages(total, perPage) {
  const len = Math.ceil(total / perPage);
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i + 1);
  }
  return arr;
}
var Paginator = PaginatorPlugin;

// node_modules/@datorama/akita/src/lib/plugins/persistForm/persistNgFormPlugin.js
var PersistNgFormPlugin = class extends AkitaPlugin {
  constructor(query, factoryFnOrPath, params = {}) {
    super(query);
    this.query = query;
    this.factoryFnOrPath = factoryFnOrPath;
    this.params = params;
    this.params = __spreadValues(__spreadValues({}, {
      debounceTime: 300,
      formKey: "akitaForm",
      emitEvent: false,
      arrControlFactory: (v) => this.builder.control(v)
    }), params);
    this.isRootKeys = toBoolean(factoryFnOrPath) === false;
    this.isKeyBased = isString(factoryFnOrPath) || this.isRootKeys;
  }
  setForm(form, builder) {
    this.form = form;
    this.builder = builder;
    this.activate();
    return this;
  }
  reset(initialState) {
    let value;
    if (initialState) {
      value = initialState;
    } else {
      value = this.isKeyBased ? this.initialValue : this.factoryFnOrPath();
    }
    if (this.isKeyBased) {
      Object.keys(this.initialValue).forEach((stateKey) => {
        const value2 = this.initialValue[stateKey];
        if (Array.isArray(value2) && this.builder) {
          const formArray = this.form.controls[stateKey];
          this.cleanArray(formArray);
          value2.forEach((v, i) => {
            this.form.get(stateKey).insert(i, this.params.arrControlFactory(v));
          });
        }
      });
    }
    this.form.patchValue(value, {
      emitEvent: this.params.emitEvent
    });
    const storeValue = this.isKeyBased ? setValue(this.getQuery().getValue(), `${this.getStore().storeName}.${this.factoryFnOrPath}`, value) : {
      [this.params.formKey]: value
    };
    this.updateStore(storeValue);
  }
  cleanArray(control) {
    while (control.length !== 0) {
      control.removeAt(0);
    }
  }
  resolveInitialValue(formValue, root) {
    if (!formValue) return;
    return Object.keys(formValue).reduce((acc, stateKey) => {
      const value = root[stateKey];
      if (Array.isArray(value) && this.builder) {
        const factory = this.params.arrControlFactory;
        this.cleanArray(this.form.get(stateKey));
        value.forEach((v, i) => {
          this.form.get(stateKey).insert(i, factory(v));
        });
      }
      acc[stateKey] = root[stateKey];
      return acc;
    }, {});
  }
  activate() {
    let path;
    if (this.isKeyBased) {
      if (this.isRootKeys) {
        this.initialValue = this.resolveInitialValue(this.form.value, this.getQuery().getValue());
        this.form.patchValue(this.initialValue, {
          emitEvent: this.params.emitEvent
        });
      } else {
        path = `${this.getStore().storeName}.${this.factoryFnOrPath}`;
        const root = getValue(this.getQuery().getValue(), path);
        this.initialValue = this.resolveInitialValue(root, root);
        this.form.patchValue(this.initialValue, {
          emitEvent: this.params.emitEvent
        });
      }
    } else {
      if (!this.getQuery().getValue()[this.params.formKey]) {
        logAction("@PersistNgFormPlugin activate");
        this.updateStore({
          [this.params.formKey]: this.factoryFnOrPath()
        });
      }
      const value = this.getQuery().getValue()[this.params.formKey];
      this.form.patchValue(value);
    }
    this.formChanges = this.form.valueChanges.pipe(debounceTime(this.params.debounceTime)).subscribe((value) => {
      logAction("@PersistForm - Update");
      let newState;
      if (this.isKeyBased) {
        if (this.isRootKeys) {
          newState = (state) => __spreadValues(__spreadValues({}, state), value);
        } else {
          newState = (state) => setValue(state, path, value);
        }
      } else {
        newState = () => ({
          [this.params.formKey]: value
        });
      }
      this.updateStore(newState(this.getQuery().getValue()));
    });
  }
  destroy() {
    this.formChanges && this.formChanges.unsubscribe();
    this.form = null;
    this.builder = null;
  }
};

// node_modules/@datorama/akita/src/lib/plugins/stateHistory/stateHistoryPlugin.js
var StateHistoryPlugin = class extends AkitaPlugin {
  constructor(query, params = {}, _entityId) {
    super(query, {
      resetFn: () => this.clear()
    });
    this.query = query;
    this.params = params;
    this._entityId = _entityId;
    this.skip = false;
    this.history = {
      past: [],
      present: null,
      future: []
    };
    this.skipUpdate = false;
    params.maxAge = params.maxAge ? params.maxAge : 10;
    params.comparator = params.comparator || (() => true);
    this.activate();
  }
  /**
   * Observable stream representing whether the history plugin has an available past
   *
   */
  get hasPast$() {
    return this._hasPast$;
  }
  /**
   * Observable stream representing whether the history plugin has an available future
   *
   */
  get hasFuture$() {
    return this._hasFuture$;
  }
  get hasPast() {
    return this.history.past.length > 0;
  }
  get hasFuture() {
    return this.history.future.length > 0;
  }
  get property() {
    return this.params.watchProperty;
  }
  /* Updates the hasPast$ hasFuture$ observables*/
  updateHasHistory() {
    this.hasFutureSubject.next(this.hasFuture);
    this.hasPastSubject.next(this.hasPast);
  }
  activate() {
    this.hasPastSubject = new BehaviorSubject(false);
    this._hasPast$ = this.hasPastSubject.asObservable().pipe(distinctUntilChanged());
    this.hasFutureSubject = new BehaviorSubject(false);
    this._hasFuture$ = this.hasFutureSubject.asObservable().pipe(distinctUntilChanged());
    this.history.present = this.getSource(this._entityId, this.property);
    this.subscription = this.selectSource(this._entityId, this.property).pipe(pairwise()).subscribe(([past, present]) => {
      if (this.skip) {
        this.skip = false;
        return;
      }
      const shouldUpdate = this.params.comparator(past, present);
      if (!this.skipUpdate && shouldUpdate) {
        if (this.history.past.length === this.params.maxAge) {
          this.history.past = this.history.past.slice(1);
        }
        this.history.past = [...this.history.past, past];
        this.history.present = present;
        this.updateHasHistory();
      }
    });
  }
  undo() {
    if (this.history.past.length > 0) {
      const {
        past,
        present
      } = this.history;
      const previous = past[past.length - 1];
      this.history.past = past.slice(0, past.length - 1);
      this.history.present = previous;
      this.history.future = [present, ...this.history.future];
      this.update();
    }
  }
  redo() {
    if (this.history.future.length > 0) {
      const {
        past,
        present
      } = this.history;
      const next = this.history.future[0];
      const newFuture = this.history.future.slice(1);
      this.history.past = [...past, present];
      this.history.present = next;
      this.history.future = newFuture;
      this.update("Redo");
    }
  }
  jumpToPast(index) {
    if (index < 0 || index >= this.history.past.length) return;
    const {
      past,
      future,
      present
    } = this.history;
    const newPast = past.slice(0, index);
    const newFuture = [...past.slice(index + 1), present, ...future];
    const newPresent = past[index];
    this.history.past = newPast;
    this.history.present = newPresent;
    this.history.future = newFuture;
    this.update();
  }
  jumpToFuture(index) {
    if (index < 0 || index >= this.history.future.length) return;
    const {
      past,
      future,
      present
    } = this.history;
    const newPast = [...past, present, ...future.slice(0, index)];
    const newPresent = future[index];
    const newFuture = future.slice(index + 1);
    this.history.past = newPast;
    this.history.present = newPresent;
    this.history.future = newFuture;
    this.update("Redo");
  }
  /**
   *
   * jump n steps in the past or forward
   *
   */
  jump(n) {
    if (n > 0) return this.jumpToFuture(n - 1);
    if (n < 0) return this.jumpToPast(this.history.past.length + n);
  }
  /**
   * Clear the history
   *
   * @param customUpdateFn Callback function for only clearing part of the history
   *
   * @example
   *
   * stateHistory.clear((history) => {
   *  return {
   *    past: history.past,
   *    present: history.present,
   *    future: []
   *  };
   * });
   */
  clear(customUpdateFn) {
    this.history = isFunction(customUpdateFn) ? customUpdateFn(this.history) : {
      past: [],
      present: null,
      future: []
    };
    this.updateHasHistory();
  }
  destroy(clearHistory = false) {
    if (clearHistory) {
      this.clear();
    }
    this.subscription.unsubscribe();
  }
  ignoreNext() {
    this.skip = true;
  }
  update(action2 = "Undo") {
    this.skipUpdate = true;
    logAction(`@StateHistory - ${action2}`);
    this.updateStore(this.history.present, this._entityId, this.property, true);
    this.updateHasHistory();
    this.skipUpdate = false;
  }
};

// node_modules/@datorama/akita/src/lib/plugins/stateHistory/entityStateHistoryPlugin.js
var EntityStateHistoryPlugin = class extends EntityCollectionPlugin {
  constructor(query, params = {}) {
    super(query, params.entityIds);
    this.query = query;
    this.params = params;
    params.maxAge = toBoolean(params.maxAge) ? params.maxAge : 10;
    this.activate();
    this.selectIds().pipe(skip(1)).subscribe((ids) => this.activate(ids));
  }
  redo(ids) {
    this.forEachId(ids, (e) => e.redo());
  }
  undo(ids) {
    this.forEachId(ids, (e) => e.undo());
  }
  hasPast(id) {
    if (this.hasEntity(id)) {
      return this.getEntity(id).hasPast;
    }
  }
  hasFuture(id) {
    if (this.hasEntity(id)) {
      return this.getEntity(id).hasFuture;
    }
  }
  jumpToFuture(ids, index) {
    this.forEachId(ids, (e) => e.jumpToFuture(index));
  }
  jumpToPast(ids, index) {
    this.forEachId(ids, (e) => e.jumpToPast(index));
  }
  clear(ids, customUpdateFn) {
    this.forEachId(ids, (e) => e.clear(customUpdateFn));
  }
  destroy(ids, clearHistory = false) {
    this.forEachId(ids, (e) => e.destroy(clearHistory));
  }
  ignoreNext(ids) {
    this.forEachId(ids, (e) => e.ignoreNext());
  }
  instantiatePlugin(id) {
    return new StateHistoryPlugin(this.query, this.params, id);
  }
};

// node_modules/@datorama/akita/src/lib/resetStores.js
function resetStores(options) {
  const defaults = {
    exclude: []
  };
  options = Object.assign({}, defaults, options);
  const stores = Object.keys(__stores__);
  applyTransaction(() => {
    for (const store of stores) {
      const s = __stores__[store];
      if (!options.exclude) {
        s.reset();
      } else {
        if (options.exclude.indexOf(s.storeName) === -1) {
          s.reset();
        }
      }
    }
  });
}

// node_modules/@datorama/akita/src/lib/runStoreAction.js
var StoreAction;
(function(StoreAction2) {
  StoreAction2["Update"] = "UPDATE";
})(StoreAction || (StoreAction = {}));
var StoreActionMapping = {
  [StoreAction.Update]: "update"
};
var EntityStoreAction;
(function(EntityStoreAction2) {
  EntityStoreAction2["Update"] = "UPDATE";
  EntityStoreAction2["AddEntities"] = "ADD_ENTITIES";
  EntityStoreAction2["SetEntities"] = "SET_ENTITIES";
  EntityStoreAction2["UpdateEntities"] = "UPDATE_ENTITIES";
  EntityStoreAction2["RemoveEntities"] = "REMOVE_ENTITIES";
  EntityStoreAction2["UpsertEntities"] = "UPSERT_ENTITIES";
  EntityStoreAction2["UpsertManyEntities"] = "UPSERT_MANY_ENTITIES";
})(EntityStoreAction || (EntityStoreAction = {}));
var EntityStoreActionMapping = {
  [EntityStoreAction.Update]: "update",
  [EntityStoreAction.AddEntities]: "add",
  [EntityStoreAction.SetEntities]: "set",
  [EntityStoreAction.UpdateEntities]: "update",
  [EntityStoreAction.RemoveEntities]: "remove",
  [EntityStoreAction.UpsertEntities]: "upsert",
  [EntityStoreAction.UpsertManyEntities]: "upsertMany"
};
function getStore(storeClass) {
  return getStoreByName(storeClass[configKey]["storeName"]);
}
function getStoreByName(storeName) {
  const store = __stores__[storeName];
  if (isNil(store)) {
    throw new AkitaError(`${store.storeName} doesn't exist`);
  }
  return store;
}
function getEntityStore(storeClass) {
  return getStore(storeClass);
}
function getEntityStoreByName(storeName) {
  return getStoreByName(storeName);
}
function runStoreAction(storeClassOrName, action2, operation) {
  const store = typeof storeClassOrName === "string" ? getStoreByName(storeClassOrName) : getStore(storeClassOrName);
  operation(store[StoreActionMapping[action2]].bind(store));
}
function runEntityStoreAction(storeClassOrName, action2, operation) {
  const store = typeof storeClassOrName === "string" ? getEntityStoreByName(storeClassOrName) : getEntityStore(storeClassOrName);
  operation(store[EntityStoreActionMapping[action2]].bind(store));
}

// node_modules/@datorama/akita/src/lib/setLoading.js
function setLoading(store) {
  return function(source) {
    return defer(() => {
      store.setLoading(true);
      return source.pipe(finalize(() => store.setLoading(false)));
    });
  };
}

// node_modules/@datorama/akita/src/lib/setLoadingAndError.js
function setLoadingAndError(store) {
  return function(source) {
    return defer(() => {
      store.setLoading(true);
      store.setError(null);
      return source.pipe(tap({
        error(err) {
          store.setLoading(false);
          store.setError(err);
        },
        complete() {
          store.setLoading(false);
        }
      }));
    });
  };
}

// node_modules/@datorama/akita/src/lib/snapshotManager.js
var SnapshotManager = class {
  /**
   * Get a snapshot of the whole state or a specific stores
   * Use it ONLY for things such as saving the state in the server
   */
  getStoresSnapshot(stores = []) {
    const acc = {};
    const hasInclude = stores.length > 0;
    const keys = hasInclude ? stores : Object.keys(__stores__);
    for (let i = 0; i < keys.length; i++) {
      const storeName = keys[i];
      if (storeName !== "router") {
        acc[storeName] = __stores__[storeName]._value();
      }
    }
    return acc;
  }
  setStoresSnapshot(stores, options) {
    const mergedOptions = __spreadValues(__spreadValues({}, {
      skipStorageUpdate: false,
      lazy: false
    }), options);
    mergedOptions.skipStorageUpdate && setSkipStorageUpdate(true);
    let normalizedStores = stores;
    if (isString(stores)) {
      normalizedStores = JSON.parse(normalizedStores);
    }
    const size = Object.keys(normalizedStores).length;
    if (mergedOptions.lazy) {
      $$addStore.pipe(filter((name) => normalizedStores.hasOwnProperty(name)), take(size)).subscribe((name) => __stores__[name]._setState(() => normalizedStores[name]));
    } else {
      for (let i = 0, keys = Object.keys(normalizedStores); i < keys.length; i++) {
        const storeName = keys[i];
        if (__stores__[storeName]) {
          __stores__[storeName]._setState(() => normalizedStores[storeName]);
        }
      }
    }
    mergedOptions.skipStorageUpdate && setSkipStorageUpdate(false);
  }
};
var snapshotManager = new SnapshotManager();

// node_modules/@datorama/akita/src/lib/toEntitiesIds.js
function toEntitiesIds(entities, idKey = DEFAULT_ID_KEY) {
  const ids = [];
  for (const entity of entities) {
    ids.push(entity[idKey]);
  }
  return ids;
}

// node_modules/@datorama/akita/src/lib/trackIdChanges.js
function trackIdChanges(query) {
  return (source) => source.lift(new TrackIdChanges(query));
}
var TrackIdChanges = class {
  constructor(query) {
    this.query = query;
  }
  call(subscriber, source) {
    return source.pipe(first(), switchMap((entity) => {
      let currId = entity[this.query.__store__.config.idKey];
      let pending = false;
      return merge(of({
        newId: void 0,
        oldId: currId,
        pending: false
      }), this.query.__store__.selectEntityIdChanges$).pipe(
        // the new id must differ form the old id
        filter((change) => change.oldId === currId),
        // extract the current pending state of the id update
        tap((change) => pending = change.pending),
        // only update the selection query if the id update is already applied to the store
        filter((change) => change.newId !== currId && !pending),
        // build a selection query for the new entity id
        switchMap((change) => this.query.selectEntity(currId = change.newId || currId).pipe(filter(() => !pending)))
      );
    })).subscribe(subscriber);
  }
};
export {
  $$addStore,
  $$deleteStore,
  $$updateStore,
  AkitaPlugin,
  DEFAULT_ID_KEY,
  DirtyCheckPlugin,
  EntityActions,
  EntityCollectionPlugin,
  EntityDirtyCheckPlugin,
  EntityService,
  EntityStateHistoryPlugin,
  EntityStore,
  EntityStoreAction,
  EntityUIQuery,
  EntityUIStore,
  Order,
  Paginator,
  PaginatorPlugin,
  PersistNgFormPlugin,
  Query,
  QueryConfig,
  QueryEntity,
  SnapshotManager,
  StateHistoryPlugin,
  Store,
  StoreAction,
  StoreConfig,
  __DEV__,
  __stores__,
  action,
  addEntities,
  akitaConfig,
  akitaDevtools,
  applyTransaction,
  arrayAdd,
  arrayFind,
  arrayRemove,
  arrayToggle,
  arrayUpdate,
  arrayUpsert,
  byId,
  byKey,
  cacheable,
  coerceArray,
  combineQueries,
  commit,
  compareValues,
  configKey,
  createEntityQuery,
  createEntityStore,
  createQuery,
  createStore,
  currentAction,
  dirtyCheckDefaultParams,
  dispatchAdded,
  dispatchDeleted,
  dispatchUpdate,
  distinctUntilArrayItemChanged,
  enableAkitaProdMode,
  endBatch,
  entitiesToArray,
  entitiesToMap,
  filterNil,
  filterNilValue,
  find,
  getActiveEntities,
  getAkitaConfig,
  getEntityStore,
  getEntityStoreByName,
  getExitingActives,
  getInitialEntitiesState,
  getNestedPath,
  getStore,
  getStoreByName,
  getValue,
  guid,
  hasActiveState,
  hasEntity,
  isArray,
  isDefined,
  isDev,
  isEmpty,
  isEntityState,
  isFunction,
  isMultiActiveState,
  isNil,
  isNotBrowser,
  isNumber,
  isObject,
  isPlainObject,
  isString,
  isTransactionInProcess,
  isUndefined,
  logAction,
  persistState,
  queryConfigKey,
  removeAllEntities,
  removeEntities,
  resetCustomAction,
  resetStores,
  resolveActiveEntity,
  runEntityStoreAction,
  runStoreAction,
  selectPersistStateInit,
  setAction,
  setEntities,
  setLoading,
  setLoadingAndError,
  setSkipAction,
  setValue,
  snapshotManager,
  sortByOptions,
  startBatch,
  toBoolean,
  toEntitiesIds,
  toEntitiesObject,
  trackIdChanges,
  transaction,
  transactionManager,
  updateEntities,
  withTransaction
};
//# sourceMappingURL=@datorama_akita.js.map
