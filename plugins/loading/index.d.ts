import { Plugin } from '@rematch/core';
export interface LoadingConfig {
    name?: string;
    whitelist?: string[];
    blacklist?: string[];
    asNumber?: boolean;
}
declare const _default: (config?: LoadingConfig) => Plugin<import("../../../../../../../Users/karl/Documents/rematch/plugins/loading/node_modules/@rematch/core").Models, import("../../../../../../../Users/karl/Documents/rematch/plugins/loading/node_modules/@rematch/core").Action<any, any>>;
export default _default;
