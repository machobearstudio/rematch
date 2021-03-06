"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var updatedPlugin = function (config) {
    if (config === void 0) { config = {}; }
    // model
    var updatedModelName = config.name || 'updated';
    var updated = {
        name: updatedModelName,
        reducers: {
            onUpdate: function (state, payload) {
                var _a, _b;
                return (__assign({}, state, (_a = {}, _a[payload.name] = __assign({}, state[payload.name], (_b = {}, _b[payload.action] = new Date(), _b)), _a)));
            },
        },
        state: {},
    };
    return {
        config: {
            models: {
                updated: updated,
            },
        },
        onModel: function (_a) {
            var _this = this;
            var name = _a.name;
            // do not run dispatch on loading, updated models
            var avoidModels = [updatedModelName, 'loading'];
            if (avoidModels.includes(name)) {
                return;
            }
            var modelActions = this.dispatch[name];
            // add empty object for effects
            updated.state[name] = {};
            var _loop_1 = function (action) {
                if (this_1.dispatch[name][action].isEffect) {
                    // copy function
                    var fn_1 = this_1.dispatch[name][action];
                    // create function with pre & post loading calls
                    var dispatchWithUpdateHook = function (props) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, fn_1(props)
                                    // waits for dispatch function to finish before calling "hide"
                                ];
                                case 1:
                                    _a.sent();
                                    // waits for dispatch function to finish before calling "hide"
                                    this.dispatch[updatedModelName].onUpdate({ name: name, action: action });
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    // replace existing effect with new dispatch
                    this_1.dispatch[name][action] = dispatchWithUpdateHook;
                }
            };
            var this_1 = this;
            // map over effects within models
            for (var _i = 0, _b = Object.keys(modelActions); _i < _b.length; _i++) {
                var action = _b[_i];
                _loop_1(action);
            }
        },
    };
};
exports.default = updatedPlugin;
//# sourceMappingURL=index.js.map