"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * validate
 *
 * takes an array of arrays of validations and
 * throws if an error occurs
 */
var validate = function (validations) {
    if (process.env.NODE_ENV !== 'production') {
        for (var _i = 0, validations_1 = validations; _i < validations_1.length; _i++) {
            var validation = validations_1[_i];
            var condition = validation[0];
            var errorMessage = validation[1];
            if (condition) {
                throw new Error(errorMessage);
            }
        }
    }
};
exports.default = validate;
//# sourceMappingURL=validate.js.map