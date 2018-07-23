"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// omit key from an object
exports.default = (function (prop, obj) {
    if (obj === void 0) { obj = {}; }
    return Object.keys(obj).reduce(function (next, key) {
        if (key !== prop) {
            next[key] = obj[key];
        }
        return next;
    }, {});
});
//# sourceMappingURL=omit.js.map