"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react/jsx-filename-extension */
var React = require("react");
var react_navigation_1 = require("react-navigation");
var react_redux_1 = require("react-redux");
exports.default = (function (Routes, addListener, sliceState) {
    var Navigator = /** @class */ (function (_super) {
        __extends(Navigator, _super);
        function Navigator() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Navigator.prototype.render = function () {
            return (React.createElement(Routes, { navigation: react_navigation_1.addNavigationHelpers({
                    addListener: addListener,
                    dispatch: this.props.dispatch,
                    state: this.props.nav,
                }) }));
        };
        return Navigator;
    }(React.Component));
    var mapToProps = function (state, props) { return ({
        nav: sliceState(state),
    }); };
    return react_redux_1.connect(mapToProps)(Navigator);
});
//# sourceMappingURL=Navigator.js.map