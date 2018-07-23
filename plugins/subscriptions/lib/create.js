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
var handlers_1 = require("./handlers");
exports.createSubscription = function (modelName, matcher, onAction, actionList) {
    var createHandler = function (target, formattedMatcher) {
        var _a;
        // prevent infinite loops within models by validating against
        // subscription matchers in the action name
        actionList.forEach(function (actionName) {
            var regex = new RegExp(formattedMatcher);
            if ((modelName + "/" + actionName).match(regex)) {
                throw new Error("Subscription (" + formattedMatcher + ") cannot match action name (" + actionName + ") in its own model.");
            }
        });
        // handlers match on { modelName: onAction }
        // to allow multiple subscriptions in different models
        var handler = (_a = {}, _a[modelName] = onAction, _a);
        if (target.has(formattedMatcher)) {
            handler = __assign({}, target.get(formattedMatcher), handler);
        }
        target.set(formattedMatcher, handler);
    };
    handlers_1.onHandlers(createHandler)(matcher);
};
//# sourceMappingURL=create.js.map