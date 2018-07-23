"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handlers_1 = require("./handlers");
var omit_1 = require("./omit");
var unsubscribeFrom = function (modelName) { return function (target, formattedMatcher) {
    var handler = target.get(formattedMatcher);
    var next = omit_1.default(modelName, handler);
    if (Object.keys(next).length) {
        // still other hooks under matcher
        target.set(formattedMatcher, next);
    }
    else {
        // no more hooks under matcher
        target.delete(formattedMatcher);
    }
}; };
// creates an unsubscribe function that can be called within a model
exports.createUnsubscribe = function (modelName, matcher) { return function () {
    handlers_1.onHandlers(unsubscribeFrom(modelName))(matcher);
}; };
//# sourceMappingURL=unsubscribe.js.map