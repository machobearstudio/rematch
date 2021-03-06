"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_1 = require("./utils/validate");
/**
 * PluginFactory
 *
 * makes Plugin objects extend and inherit from a root PluginFactory
 */
exports.default = (function (config) { return ({
    config: config,
    /**
     * validate
     *
     * bind validate to the store for easy access
     */
    validate: validate_1.default,
    /**
     * create plugin
     *
     * binds plugin properties and functions to an instance of PluginFactorys
     * @param plugin
     */
    create: function (plugin) {
        validate_1.default([
            [
                plugin.onStoreCreated && typeof plugin.onStoreCreated !== 'function',
                'Plugin onStoreCreated must be a function',
            ],
            [
                plugin.onModel && typeof plugin.onModel !== 'function',
                'Plugin onModel must be a function',
            ],
            [
                plugin.middleware && typeof plugin.middleware !== 'function',
                'Plugin middleware must be a function',
            ],
        ]);
        if (plugin.onInit) {
            plugin.onInit.call(this);
        }
        var result = {};
        if (plugin.exposed) {
            for (var _i = 0, _a = Object.keys(plugin.exposed); _i < _a.length; _i++) {
                var key = _a[_i];
                this[key] =
                    typeof plugin.exposed[key] === 'function'
                        ? plugin.exposed[key].bind(this) // bind functions to plugin class
                        : Object.create(plugin.exposed[key]); // add exposed to plugin class
            }
        }
        for (var _b = 0, _c = ['onModel', 'middleware', 'onStoreCreated']; _b < _c.length; _b++) {
            var method = _c[_b];
            if (plugin[method]) {
                result[method] = plugin[method].bind(this);
            }
        }
        return result;
    },
}); });
//# sourceMappingURL=pluginFactory.js.map