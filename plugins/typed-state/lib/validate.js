"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable no-empty, no-var-requires
var ReactPropTypesSecret = require('prop-types/lib/ReactPropTypesSecret');
var validateState = function (typeSpecs, values, modelName) {
    if (process.env.NODE_ENV !== 'production') {
        for (var typeSpecName in typeSpecs) {
            if (typeSpecs.hasOwnProperty(typeSpecName)) {
                var error = typeSpecs[typeSpecName](values, typeSpecName, modelName, 'property', null, ReactPropTypesSecret);
                if (error instanceof Error) {
                    console.warn("[rematch] " + error.message);
                }
            }
        }
    }
};
exports.default = validateState;
//# sourceMappingURL=validate.js.map