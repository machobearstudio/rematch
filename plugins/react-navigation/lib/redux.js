"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_navigation_redux_helpers_1 = require("react-navigation-redux-helpers");
exports.default = (function (Routes, initialScreen, sliceState) {
    var router = Routes.router;
    var initialState = router.getStateForAction(router.getActionForPathAndParams(initialScreen));
    // reducer
    var navReducer = function (state, action) {
        if (state === void 0) { state = initialState; }
        var nextState = router.getStateForAction(action, state);
        // Simply return the original `state` if `nextState` is null or undefined.
        return nextState || state;
    };
    // middleware
    var navMiddleware = react_navigation_redux_helpers_1.createReactNavigationReduxMiddleware('root', function (state) { return sliceState(state); });
    var addListener = react_navigation_redux_helpers_1.createReduxBoundAddListener('root');
    return {
        addListener: addListener,
        navMiddleware: navMiddleware,
        navReducer: navReducer,
    };
});
//# sourceMappingURL=redux.js.map