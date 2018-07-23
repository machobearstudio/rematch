"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var immer_1 = __importDefault(require("immer"));
var redux_1 = require("redux");
function combineReducersWithImmer(reducers) {
    var reducersWithImmer = {};
    var _loop_1 = function (key, reducerFn) {
        reducersWithImmer[key] = function (state, payload) {
            if (typeof state === 'object') {
                return immer_1.default(state, function (draft) {
                    reducerFn(draft, payload);
                });
            }
            else {
                return reducerFn(state, payload);
            }
        };
    };
    // reducer must return value because literal don't support immer
    for (var _i = 0, _a = Object.entries(reducers); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], reducerFn = _b[1];
        _loop_1(key, reducerFn);
    }
    return redux_1.combineReducers(reducersWithImmer);
}
// rematch plugin
var immerPlugin = function () { return ({
    config: {
        redux: {
            combineReducers: combineReducersWithImmer,
        },
    },
}); };
exports.default = immerPlugin;
//# sourceMappingURL=index.js.map