/**
 * @fileoverview Rule to replace lodash map to native map where possible
 * @author Liza Svitanko
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "replace lodash map to native map",
            category: "Possible Errors",
            recommended: true,
            url: ""
        },
        fixable: "code",
        schema: [] // no options
    },
    create: function (context) {
        const isArray = (node) => {
            const callee = node.callee;
            return node.type === 'NewExpression' &&
                callee.type === 'Identifier' &&
                callee.name === 'Array';
        };

        const makeReplace = (fixer, node) => {
            const sourceCode = context.getSourceCode();
            const [collection, fn] = sourceCode.getText(node);
            return fixer.replaceText(node, `${collection}.map(${fn})`);
        };

        const report = (node) => {
            return context.report({
                node,
                messageId: 'Avoid using lodash map with arrays',
                data: {
                    identifier: node.name
                },
                fix: function(fixer) {
                    return makeReplace(fixer, node)
                },
            });
        };

        return {
            CallExpression: function (node) {
                const callee = node.callee;
                const argFirst = node.arguments[0];
                const isLodashImported = (callee.object.name === '_' && callee.object.type === 'Identifier') ||
                    (
                        node.parent.callee
                        && node.parent.callee.object.name === '_'
                        && node.parent.callee.object.type === 'Identifier'
                    );


                if (!isLodashImported || argFirst.type === 'ObjectExpression') {
                    return;
                }

                if (isArray(argFirst)) {
                    report(node);
                }
            }
        };
    }
};