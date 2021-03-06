"use strict";
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
/**
 * Effects Plugin
 *
 * Plugin for handling async actions
 */
var effectsPlugin = {
    exposed: {
        // expose effects for access from dispatch plugin
        effects: {},
    },
    // add effects to dispatch so that dispatch[modelName][effectName] calls an effect
    onModel: function (model) {
        if (!model.effects) {
            return;
        }
        var effects = typeof model.effects === 'function'
            ? model.effects(this.dispatch)
            : model.effects;
        for (var _i = 0, _a = Object.keys(effects); _i < _a.length; _i++) {
            var effectName = _a[_i];
            this.validate([
                [
                    !!effectName.match(/\//),
                    "Invalid effect name (" + model.name + "/" + effectName + ")",
                ],
                [
                    typeof effects[effectName] !== 'function',
                    "Invalid effect (" + model.name + "/" + effectName + "). Must be a function",
                ],
            ]);
            this.effects[model.name + "/" + effectName] = effects[effectName].bind(this.dispatch[model.name]);
            // add effect to dispatch
            // is assuming dispatch is available already... that the dispatch plugin is in there
            this.dispatch[model.name][effectName] = this.createDispatcher.apply(this, [model.name, effectName]);
            // tag effects so they can be differentiated from normal actions
            this.dispatch[model.name][effectName].isEffect = true;
        }
    },
    // process async/await actions
    middleware: function (store) {
        var _this = this;
        return function (next) { return function (action) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(action.type in this.effects)) return [3 /*break*/, 2];
                        return [4 /*yield*/, next(action)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.effects[action.type](action.payload, store.getState(), action.meta)];
                    case 2: return [2 /*return*/, next(action)];
                }
            });
        }); }; };
    },
};
exports.default = effectsPlugin;
//# sourceMappingURL=effects.js.map