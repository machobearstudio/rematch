"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Redux = require("redux");
var isListener_1 = require("./utils/isListener");
var composeEnhancersWithDevtools = function (devtoolOptions) {
    if (devtoolOptions === void 0) { devtoolOptions = {}; }
    var disabled = devtoolOptions.disabled, options = __rest(devtoolOptions
    /* istanbul ignore next */
    , ["disabled"]);
    /* istanbul ignore next */
    return !disabled &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(options)
        : Redux.compose;
};
function default_1(_a) {
    var _this = this;
    var redux = _a.redux, models = _a.models;
    var combineReducers = redux.combineReducers || Redux.combineReducers;
    var createStore = redux.createStore || Redux.createStore;
    var initialState = typeof redux.initialState !== 'undefined' ? redux.initialState : {};
    this.reducers = redux.reducers;
    // combine models to generate reducers
    this.mergeReducers = function (nextReducers) {
        if (nextReducers === void 0) { nextReducers = {}; }
        // merge new reducers with existing reducers
        _this.reducers = __assign({}, _this.reducers, nextReducers);
        if (!Object.keys(_this.reducers).length) {
            // no reducers, just return state
            return function (state) { return state; };
        }
        return combineReducers(_this.reducers);
    };
    this.createModelReducer = function (model) {
        var modelBaseReducer = model.baseReducer;
        var modelReducers = {};
        for (var _i = 0, _a = Object.keys(model.reducers || {}); _i < _a.length; _i++) {
            var modelReducer = _a[_i];
            var action = isListener_1.default(modelReducer)
                ? modelReducer
                : model.name + "/" + modelReducer;
            modelReducers[action] = model.reducers[modelReducer];
        }
        var combinedReducer = function (state, action) {
            if (state === void 0) { state = model.state; }
            // handle effects
            if (typeof modelReducers[action.type] === 'function') {
                return modelReducers[action.type](state, action.payload, action.meta);
            }
            return state;
        };
        _this.reducers[model.name] = !modelBaseReducer
            ? combinedReducer
            : function (state, action) {
                return combinedReducer(modelBaseReducer(state, action), action);
            };
    };
    // initialize model reducers
    for (var _i = 0, models_1 = models; _i < models_1.length; _i++) {
        var model = models_1[_i];
        this.createModelReducer(model);
    }
    this.createRootReducer = function (rootReducers) {
        if (rootReducers === void 0) { rootReducers = {}; }
        var mergedReducers = _this.mergeReducers();
        if (Object.keys(rootReducers).length) {
            return function (state, action) {
                var rootReducerAction = rootReducers[action.type];
                if (rootReducers[action.type]) {
                    return mergedReducers(rootReducerAction(state, action), action);
                }
                return mergedReducers(state, action);
            };
        }
        return mergedReducers;
    };
    var rootReducer = this.createRootReducer(redux.rootReducers);
    var middlewares = Redux.applyMiddleware.apply(Redux, redux.middlewares);
    var enhancers = composeEnhancersWithDevtools(redux.devtoolOptions).apply(void 0, redux.enhancers.concat([middlewares]));
    this.store = createStore(rootReducer, initialState, enhancers);
    return this;
}
exports.default = default_1;
//# sourceMappingURL=redux.js.map