"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_1 = require("./validate");
var cachedTypings = {};
var typedStatePlugin = function () { return ({
    exposed: {
        typings: {},
    },
    onModel: function (model) {
        cachedTypings[model.name] = model.typings;
    },
    middleware: function (store) { return function (next) { return function (action) {
        var called = next(action);
        var _a = action.type.split('/'), modelName = _a[0], _ = _a[1];
        var typings = cachedTypings[modelName];
        if (typings) {
            validate_1.default(typings, store.getState()[modelName], modelName);
        }
        else {
            console.warn("[rematch]: Missing typings definitions for `" + modelName + "` model");
        }
        return called;
    }; }; },
}); };
exports.default = typedStatePlugin;
//# sourceMappingURL=index.js.map