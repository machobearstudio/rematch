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
var redux_persist_1 = require("redux-persist");
var storage_1 = require("redux-persist/lib/storage");
var persistor;
// persistor is used for PersistGate
// see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
exports.getPersistor = function () { return persistor; };
// rematch plugin
var persistPlugin = function (config, pesistStoreConfig, callback) {
    if (config === void 0) { config = {}; }
    // merge config with common config options
    var mergedConfig = __assign({ key: 'root', storage: storage_1.default }, config);
    return {
        config: {
            // pass in merged config as first param of persistCombineReducers
            redux: {
                combineReducers: redux_persist_1.persistCombineReducers.bind(null, mergedConfig),
            },
        },
        onStoreCreated: function (store) {
            // run persist store once store is available
            persistor = redux_persist_1.persistStore(store, pesistStoreConfig, callback);
        },
    };
};
exports.default = persistPlugin;
//# sourceMappingURL=index.js.map