"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Parsing = require("../source");
/**
 * Errors enumerations.
 */
var Errors;
(function (Errors) {
    Errors[Errors["EXPECTED_TAG_OPEN"] = 0] = "EXPECTED_TAG_OPEN";
    Errors[Errors["EXPECTED_TAG_CLOSE"] = 1] = "EXPECTED_TAG_CLOSE";
    Errors[Errors["EXPECTED_TAG_ENDING"] = 2] = "EXPECTED_TAG_ENDING";
    Errors[Errors["EXPECTED_TAG_NAME"] = 3] = "EXPECTED_TAG_NAME";
    Errors[Errors["EXPECTED_TAG_NAME_MATCHING"] = 4] = "EXPECTED_TAG_NAME_MATCHING";
    Errors[Errors["EXPECTED_END_OF_CONTENT"] = 5] = "EXPECTED_END_OF_CONTENT";
})(Errors || (Errors = {}));
/**
 * Prints the specified error entity.
 * @param error Error entity.
 */
function printError(error) {
    switch (error.code) {
        case Errors.EXPECTED_TAG_OPEN:
            console.log(`Expected token '<' does not found.`);
            break;
        case Errors.EXPECTED_TAG_CLOSE:
            console.log(`Expected token '>' does not found.`);
            break;
        case Errors.EXPECTED_TAG_ENDING:
            console.log(`Expected token '/' does not found.`);
            break;
        case Errors.EXPECTED_TAG_NAME:
            console.log(`Expected tag name does not found.`);
            break;
        case Errors.EXPECTED_TAG_NAME_MATCHING:
            console.log(`Expected tag name matching has been failed.`);
            break;
        case Errors.EXPECTED_END_OF_CONTENT:
            console.log(`Expected end of content does not found.`);
            break;
    }
}
/**
 * Print the specified tree node and its children.
 * @param node Current tree node.
 * @param offset Current level offset.
 */
function printTree(node, offset) {
    const spacing = ' '.repeat(offset);
    switch (node.type) {
        case 'element':
            console.log(`${spacing}ELEMENT: ${node.data.name}`);
            if (node.left) {
                printTree(node.left, offset + 1);
            }
            if (node.right) {
                printTree(node.right, offset + 1);
            }
            break;
        case 'attribute':
            console.log(`${spacing}ATTRIBUTE: ${node.data.name}: ${node.data.value}`);
            break;
        case 'text':
            console.log(`${spacing}TEXT: ${node.data.content}`);
            break;
        case 'comment':
            console.log(`${spacing}COMMENT: ${node.data.content.trim()}`);
            break;
    }
    if (node.next) {
        printTree(node.next, offset);
    }
}
const tree = new Parsing.Trees.Node('document', 0);
const context = new Parsing.Context(`
<html>
  <!-- Header begins -->
  <head>
    <meta charset="utf-8"/>
    <title>Parser Test</title>
  </head>
  <!-- Header ends, body begins -->
  <body>
    <custom-element />
    <namespaced:element />
  </body>
  <!-- Body ends -->
</html>`);
const singleQuotes = new Parsing.Rules.Char.Expect("'");
const doubleQuotes = new Parsing.Rules.Char.Expect('"');
const escapeString = new Parsing.Rules.Char.Expect('\\');
const whitespace = new Parsing.Rules.Char.Choice(' ', '\t', '\r', '\n');
const content = new Parsing.Rules.Char.Any();
const tagOpen = new Parsing.Rules.Char.Expect('<');
const tagEnding = new Parsing.Rules.Char.Expect('/');
const tagClose = new Parsing.Rules.Char.Expect('>');
const tagName = new Parsing.Rules.Repeat(new Parsing.Rules.Not(new Parsing.Rules.Any(whitespace, tagEnding, tagClose), content));
const paramName = new Parsing.Rules.String.Letters();
const paramAssign = new Parsing.Rules.Char.Expect('=');
const singleString = new Parsing.Rules.All(singleQuotes, new Parsing.Rules.Data.Extract('value', new Parsing.Rules.Repeat(new Parsing.Rules.Decision(escapeString, content, new Parsing.Rules.Not(singleQuotes, content)))), singleQuotes);
const doubleString = new Parsing.Rules.All(doubleQuotes, new Parsing.Rules.Data.Extract('value', new Parsing.Rules.Repeat(new Parsing.Rules.Decision(escapeString, content, new Parsing.Rules.Not(doubleQuotes, content)))), doubleQuotes);
const noString = new Parsing.Rules.Data.Extract('value', new Parsing.Rules.Repeat(new Parsing.Rules.Any(new Parsing.Rules.String.Letters(), new Parsing.Rules.String.Digits(), new Parsing.Rules.Char.Choice('-', '_'))));
const commentOpen = new Parsing.Rules.String.Expect('<!--');
const commentClose = new Parsing.Rules.String.Expect('-->');
const optionalSpace = new Parsing.Rules.Option(new Parsing.Rules.Repeat(whitespace));
let text;
let comment;
let parameters;
let element;
let collection;
let document;
text = new Parsing.Rules.Success(new Parsing.Rules.Data.Tree('text', Parsing.Trees.Directions.NEXT, new Parsing.Rules.Data.Extract('content', new Parsing.Rules.Repeat(new Parsing.Rules.Not(tagOpen, content)))));
comment = new Parsing.Rules.Success(new Parsing.Rules.All(commentOpen, new Parsing.Rules.Data.Tree('comment', Parsing.Trees.Directions.NEXT, new Parsing.Rules.Data.Extract('content', new Parsing.Rules.Repeat(new Parsing.Rules.Not(commentClose, content)))), commentClose));
parameters = new Parsing.Rules.Data.Tree('attribute', Parsing.Trees.Directions.NEXT, new Parsing.Rules.All(new Parsing.Rules.Data.Extract('name', paramName), optionalSpace, new Parsing.Rules.Option(new Parsing.Rules.All(paramAssign, optionalSpace, new Parsing.Rules.Any(singleString, doubleString, noString)))));
element = new Parsing.Rules.Success(new Parsing.Rules.Data.Tree('element', Parsing.Trees.Directions.NEXT, new Parsing.Rules.All(new Parsing.Rules.Error(Errors.EXPECTED_TAG_OPEN, tagOpen), optionalSpace, new Parsing.Rules.Error(Errors.EXPECTED_TAG_NAME, new Parsing.Rules.Data.Extract('name', tagName)), optionalSpace, new Parsing.Rules.Option(new Parsing.Rules.Data.Node(Parsing.Trees.Directions.NEXT, Parsing.Trees.Directions.LEFT, new Parsing.Rules.Repeat(new Parsing.Rules.All(parameters, optionalSpace)))), new Parsing.Rules.Any(new Parsing.Rules.All(new Parsing.Rules.Error(Errors.EXPECTED_TAG_ENDING, tagEnding), optionalSpace, new Parsing.Rules.Error(Errors.EXPECTED_TAG_CLOSE, tagClose)), new Parsing.Rules.All(new Parsing.Rules.Error(Errors.EXPECTED_TAG_CLOSE, tagClose), optionalSpace, new Parsing.Rules.Data.Node(Parsing.Trees.Directions.NEXT, Parsing.Trees.Directions.RIGHT, new Parsing.Rules.Option(new Parsing.Rules.Reference(() => collection))), new Parsing.Rules.Error(Errors.EXPECTED_TAG_OPEN, tagOpen), optionalSpace, new Parsing.Rules.All(new Parsing.Rules.Error(Errors.EXPECTED_TAG_ENDING, tagEnding), optionalSpace), new Parsing.Rules.Error(Errors.EXPECTED_TAG_NAME_MATCHING, new Parsing.Rules.Data.Match('name', tagName)), optionalSpace, new Parsing.Rules.Error(Errors.EXPECTED_TAG_CLOSE, tagClose))))));
collection = new Parsing.Rules.Repeat(new Parsing.Rules.Any(whitespace, text, comment, element));
document = new Parsing.Rules.All(new Parsing.Rules.Option(collection), new Parsing.Rules.Error(Errors.EXPECTED_END_OF_CONTENT, new Parsing.Rules.EOC()));
if (document.consume(context, tree)) {
    console.log(`Context analysis succeed.`);
    printTree(tree, 0);
}
else {
    console.log(`Context analysis has been failed at the offset ${context.error.offset}.`);
    printError(context.error);
}
//# sourceMappingURL=html.js.map