/**
 * @fileoverview Rule to replace lodash map to native map where possible
 * @author Liza Svitanko
 */

'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require('requireindex');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

module.exports.rules = requireIndex(__dirname + '/lib/rules');

module.exports.configs = {
    recommended: {
        rules: {
            'lodash-to-native/map': 2,
        },
    },
};