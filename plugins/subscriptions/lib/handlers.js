"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var subscriptions_1 = require("./subscriptions");
// matches actions with letter/number characters & -, _
var actionRegex = /^[A-Z0-9-_]+\/[A-Z0-9-_]+$/i;
// valid pattern match: letters/numbers &_-, *
// match on 'a/*', '*/b', 'a-*/b', etc.
// note: cannot match * or creates infinite loop`
var patternRegex = /^[A-Z0-9-_*]+\/[A-Z0-9-_*]+$/i;
var escapeRegex = function (str) { return str.replace('*', '.*'); };
var isAction = function (matcher, regex) { return !!matcher.match(regex); };
exports.onHandlers = function (call) { return function (matcher) {
    if (isAction(matcher, actionRegex)) {
        // exact match on create or unsubscribe
        call(subscriptions_1.subscriptions, matcher);
    }
    else if (isAction(matcher, patternRegex)) {
        // pattern match on create
        var formattedMatcher = "^" + escapeRegex(matcher) + "$";
        call(subscriptions_1.patternSubscriptions, formattedMatcher);
    }
    else if (matcher[0] === '^') {
        // pattern match, already formatted. Called by unsubscribe
        // NOTE: this should probably live elsewhere
        call(subscriptions_1.patternSubscriptions, matcher);
    }
    else {
        throw new Error("Invalid subscription matcher: " + matcher);
    }
}; };
//# sourceMappingURL=handlers.js.map