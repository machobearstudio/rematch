import { Action } from '@rematch/core';
export declare const createSubscription: (modelName: string, matcher: string, onAction: (action: Action, unsubscribe: () => void) => void, actionList: string[]) => void;
