"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var pluginFactory_1 = require("./pluginFactory");
var dispatch_1 = require("./plugins/dispatch");
var effects_1 = require("./plugins/effects");
var redux_1 = require("./redux");
var validate_1 = require("./utils/validate");
var corePlugins = [dispatch_1.default, effects_1.default];
/**
 * Rematch class
 *
 * an instance of Rematch generated by "init"
 */
var Rematch = /** @class */ (function () {
    function Rematch(config) {
        var _this = this;
        this.plugins = [];
        this.config = config;
        this.pluginFactory = pluginFactory_1.default(config);
        for (var _i = 0, _a = corePlugins.concat(this.config.plugins); _i < _a.length; _i++) {
            var plugin = _a[_i];
            this.plugins.push(this.pluginFactory.create(plugin));
        }
        // preStore: middleware, model hooks
        this.forEachPlugin('middleware', function (middleware) {
            _this.config.redux.middlewares.push(middleware);
        });
    }
    Rematch.prototype.forEachPlugin = function (method, fn) {
        for (var _i = 0, _a = this.plugins; _i < _a.length; _i++) {
            var plugin = _a[_i];
            if (plugin[method]) {
                fn(plugin[method]);
            }
        }
    };
    Rematch.prototype.getModels = function (models) {
        return Object.keys(models).map(function (name) { return (__assign({ name: name }, models[name], { reducers: models[name].reducers || {} })); });
    };
    Rematch.prototype.addModel = function (model) {
        validate_1.default([
            [!model, 'model config is required'],
            [typeof model.name !== 'string', 'model "name" [string] is required'],
            [model.state === undefined && model.baseReducer === undefined, 'model "state" is required'],
            [model.baseReducer !== undefined && typeof model.baseReducer !== 'function', 'model "baseReducer" must be a function'],
        ]);
        // run plugin model subscriptions
        this.forEachPlugin('onModel', function (onModel) { return onModel(model); });
    };
    Rematch.prototype.init = function () {
        var _this = this;
        // collect all models
        this.models = this.getModels(this.config.models);
        for (var _i = 0, _a = this.models; _i < _a.length; _i++) {
            var model = _a[_i];
            this.addModel(model);
        }
        // create a redux store with initialState
        // merge in additional extra reducers
        var redux = redux_1.default.call(this, {
            redux: this.config.redux,
            models: this.models,
        });
        var rematchStore = __assign({ name: this.config.name }, redux.store, { 
            // dynamic loading of models with `replaceReducer`
            model: function (model) {
                _this.addModel(model);
                redux.mergeReducers(redux.createModelReducer(model));
                redux.store.replaceReducer(redux.createRootReducer(_this.config.redux.rootReducers));
                redux.store.dispatch({ type: '@@redux/REPLACE ' });
            } });
        this.forEachPlugin('onStoreCreated', function (onStoreCreated) {
            var returned = onStoreCreated(rematchStore);
            // if onStoreCreated returns an object value
            // merge its returned value onto the store
            if (returned) {
                Object.keys(returned || {}).forEach(function (key) {
                    rematchStore[key] = returned[key];
                });
            }
        });
        return rematchStore;
    };
    return Rematch;
}());
exports.default = Rematch;
//# sourceMappingURL=rematch.js.map