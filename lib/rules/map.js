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
        messages: {
            errorMessage: 'Avoid using lodash map with arrays',
        },
        fixable: "code",
        schema: [] // no options
    },
    create: function (context) {
        const isArrayFrom = (node) => {
            const callee = node.callee;
            return node.type === 'CallExpression'
                && callee.type === 'MemberExpression'
                && callee.object.type === 'Identifier'
                && callee.object.name === 'Array'
                && callee.property.type === 'Identifier'
                && callee.property.name === 'from';
        };

        const isArray = (node) => {
            const callee = node.callee;
            return node.type === 'NewExpression' &&
                callee.type === 'Identifier' &&
                callee.name === 'Array';
        };

        const makeReplace = (fixer, node) => {
            const sourceCode = context.getSourceCode();
            const [collection, fn] = sourceCode.getText(node);
            // выдает ошибку "A fatal parsing error occurred in autofix: Parsing error: Unexpected token ."
            return fixer.replaceText(node, `${collection}.map(${fn})`);
        };

        const report = (node) => {
            return context.report({
                node,
                messageId: 'errorMessage',
                data: {
                    identifier: node.name
                },
                fix: function(fixer) {
                    return makeReplace(fixer, node)
                },
            });
        };

        let isLodashDeclared = false;
        return {
            VariableDeclaration : function (node) {
                context.getDeclaredVariables(node).forEach((item) => {
                    if (item.name === '_') {
                        isLodashDeclared = true;
                    }
                })
            },
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

                if (isArray(argFirst) && isArrayFrom(argFirst)) {
                    report(node);
                    return;
                }

                if (argFirst.type === 'ArrayExpression') {
                    report(node);
                } else if (argFirst.type === 'Identifier') {
                    // TODO: не уверена, как это обработать
                }
            }
        };
    }
};