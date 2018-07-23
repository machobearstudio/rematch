import { Plugin } from '@rematch/core';
export { createSelector, createStructuredSelector } from 'reselect';
export interface SelectConfig {
    sliceState?: any;
    selectorCreator?: any;
}
declare const createSelectPlugin: (config?: SelectConfig) => Plugin<import("../../../../../../../Users/karl/Documents/rematch/plugins/select/node_modules/@rematch/core").Models, import("../../../../../../../Users/karl/Documents/rematch/plugins/select/node_modules/@rematch/core").Action<any, any>>;
export default createSelectPlugin;
