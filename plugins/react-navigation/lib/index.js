"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_navigation_1 = require("react-navigation");
var Navigator_1 = require("./Navigator");
var redux_1 = require("./redux");
var reactNavigationPlugin = function (_a) {
    var Routes = _a.Routes, initialScreen = _a.initialScreen, _b = _a.sliceState, sliceState = _b === void 0 ? function (state) { return state.nav; } : _b;
    if (!Routes) {
        throw new Error('Rematch React Navigation requires app routes.');
    }
    if (!initialScreen) {
        throw new Error('Rematch React Navigation requires an initial screen name. For example, "Login"');
    }
    if (typeof sliceState !== 'function') {
        throw new Error('Rematch React Navigation requires sliceState config to be a function.');
    }
    var _c = redux_1.default(Routes, initialScreen, sliceState), addListener = _c.addListener, navMiddleware = _c.navMiddleware, navReducer = _c.navReducer;
    return {
        Navigator: Navigator_1.default(Routes, addListener, sliceState),
        reactNavigationPlugin: {
            config: {
                redux: {
                    middleware: [navMiddleware],
                    reducers: {
                        nav: navReducer,
                    },
                },
            },
            onStoreCreated: function () {
                var _this = this;
                this.dispatch.nav = {};
                this.dispatch.nav.navigate = function (action) { return _this.dispatch(react_navigation_1.NavigationActions.navigate(action)); };
                this.dispatch.nav.reset = function (action) { return _this.dispatch(react_navigation_1.NavigationActions.reset(action)); };
                this.dispatch.nav.back = function (action) { return _this.dispatch(react_navigation_1.NavigationActions.back(action)); };
                this.dispatch.nav.setParams = function (action) { return _this.dispatch(react_navigation_1.NavigationActions.setParams(action)); };
            },
        },
    };
};
exports.default = reactNavigationPlugin;
//# sourceMappingURL=index.js.map