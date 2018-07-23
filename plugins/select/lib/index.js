"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reselect_1 = require("reselect");
var reselect_2 = require("reselect");
exports.createSelector = reselect_2.createSelector;
exports.createStructuredSelector = reselect_2.createStructuredSelector;
var makeSelect = function () {
    /**
     * Maps models to structured selector
     * @param  mapSelectToStructure function that gets passed `selectors` and returns an object
     * @param  structuredSelectorCreator=createStructuredSelector if you need to provide your own implementation
     *
     * @return the result of calling `structuredSelectorCreator` with the new selectors
     */
    function select(mapSelectToStructure, structuredSelectorCreator) {
        if (structuredSelectorCreator === void 0) { structuredSelectorCreator = reselect_1.createStructuredSelector; }
        var func = function (state, props) {
            func = structuredSelectorCreator(mapSelectToStructure(select));
            return func(state, props);
        };
        return function (state, props) { return func(state, props); };
    }
    return select;
};
var makeFactoryGroup = function () {
    var ready = false;
    var factories = new Set();
    return {
        add: function (added) {
            if (!ready) {
                added.forEach(function (factory) { return factories.add(factory); });
            }
            else {
                added.forEach(function (factory) { return factory(); });
            }
        },
        finish: function (factory) {
            factories.delete(factory);
        },
        startBuilding: function () {
            ready = true;
            factories.forEach(function (factory) { return factory(); });
        },
    };
};
var validateConfig = function (config) {
    if (config.sliceState && typeof config.sliceState !== 'function') {
        throw new Error('select plugin config sliceState must be a function');
    }
    if (config.selectorCreator && typeof config.selectorCreator !== 'function') {
        throw new Error('select plugin config selectorCreator must be a function');
    }
};
var createSelectPlugin = function (config) {
    if (config === void 0) { config = {}; }
    validateConfig(config);
    var sliceState = config.sliceState || (function (state, model) { return state[model.name]; });
    var selectorCreator = config.selectorCreator || reselect_1.createSelector;
    var slice = function (model) { return function (stateOrNext) {
        if (typeof stateOrNext === 'function') {
            return selectorCreator(function (state) { return sliceState(state, model); }, stateOrNext);
        }
        return sliceState(stateOrNext, model);
    }; };
    var hasProps = function (inner) {
        return function (models) {
            var _this = this;
            return selectorCreator(function (props) { return props; }, function (props) { return inner.call(_this, models, props); });
        };
    };
    var factoryGroup = makeFactoryGroup();
    var select = makeSelect();
    return {
        exposed: {
            select: select,
            sliceState: sliceState,
            selectorCreator: selectorCreator,
        },
        onModel: function (model) {
            var _this = this;
            select[model.name] = {};
            var selectorFactories = typeof model.selectors === 'function'
                ? model.selectors(slice(model), selectorCreator, hasProps)
                : model.selectors;
            factoryGroup.add(Object.keys(selectorFactories || {}).map(function (selectorName) {
                _this.validate([
                    [
                        typeof selectorFactories[selectorName] !== 'function',
                        "Selector (" + model.name + "/" + selectorName + ") must be a function",
                    ],
                ]);
                var factory = function () {
                    factoryGroup.finish(factory);
                    delete select[model.name][selectorName];
                    return (select[model.name][selectorName] = selectorFactories[selectorName].call(select[model.name], select));
                };
                // Define a getter for early constructing
                Object.defineProperty(select[model.name], selectorName, {
                    configurable: true,
                    get: function () {
                        return factory();
                    },
                });
                return factory;
            }));
        },
        onStoreCreated: function (store) {
            factoryGroup.startBuilding();
            return {
                select: select,
            };
        },
    };
};
exports.default = createSelectPlugin;
//# sourceMappingURL=index.js.map