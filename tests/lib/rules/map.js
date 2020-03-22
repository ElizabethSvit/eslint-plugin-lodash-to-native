'use strict';

const rule = require('../../../lib/rules/map');
const RuleTester = require('eslint').RuleTester;
const RuleTesterRunner = new RuleTester();

RuleTesterRunner.run('replace lodash map to native map', rule, {

    valid: [
        // object
        {
            code: '_.map({key: value}, fn);',
        },
        // variable name or map empty array
        {
            code: 'var _ = { map: function() { return [] } }; arr = _.map([], fn);'
        }
    ],

    invalid: [
        // array
        {
            code: '_.map([0, 1, 2, 3, 4, 5], fn);',
            errors: [
                { messageId: 'errorMsg', }
            ],
        },
        // array from string
        {
            code: '_.map(Array.from("string here"), fn);',
            errors: [
                { messageId: 'errorMsg', }
            ],
        },
        // new array conversion from string
        {
            code: '_.map(new Array("string here"), fn);',
            errors: [
                { messageId: 'errorMsg', }
            ],
        },
        // separate array init
        {
            code: 'var a = [0, 1, 2, 3, 4, 5]; _.map(a, fn);',
            errors: [
                { messageId: 'errorMsg', }
            ],
        },

    ],

});
