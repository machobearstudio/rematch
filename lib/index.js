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
var rematch_1 = require("./rematch");
var deprecate_1 = require("./utils/deprecate");
var mergeConfig_1 = require("./utils/mergeConfig");
exports.getState = function () {
    deprecate_1.default("global getState has been removed in @rematch/core 1.0.0-beta.3.\n\tSee https://github.com/rematch/rematch/blob/master/CHANGELOG.md#100-beta3---2018-06-23 for details.\n\tFor a quick fix, import and use store.getState.");
};
exports.dispatch = function () {
    deprecate_1.default("global dispatch has been removed in @rematch/core 1.0.0-beta.3.\n\tSee https://github.com/rematch/rematch/blob/master/CHANGELOG.md#100-beta3---2018-06-23 for details.\n\tFor a quick fix, import and use store.dispatch.");
};
/**
 * global createModel
 *
 * creates a model for the given object
 * this is for autocomplete purposes only
 * returns the same object that was received as argument
 */
function createModel(model) {
    return model;
}
exports.createModel = createModel;
// incrementer used to provide a store name if none exists
var count = 0;
/**
 * init
 *
 * generates a Rematch store
 * with a set configuration
 * @param config
 */
exports.init = function (initConfig) {
    if (initConfig === void 0) { initConfig = {}; }
    var name = initConfig.name || count.toString();
    count += 1;
    var config = mergeConfig_1.default(__assign({}, initConfig, { name: name }));
    return new rematch_1.default(config).init();
};
exports.default = {
    init: exports.init,
};
//# sourceMappingURL=index.js.map