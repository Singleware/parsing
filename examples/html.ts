/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Parsing from '../source';

/**
 * Errors enumerations.
 */
enum Errors {
  EXPECTED_TAG_OPEN,
  EXPECTED_TAG_CLOSE,
  EXPECTED_TAG_ENDING,
  EXPECTED_TAG_NAME,
  EXPECTED_TAG_NAME_MATCHING,
  EXPECTED_END_OF_CONTENT
}

/**
 * Prints the specified error entity.
 * @param error Error entity.
 */
function printError(error: Parsing.Error): void {
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
function printTree(node: Parsing.Trees.Node, offset: number): void {
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
  <script></script>
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
const paramName = new Parsing.Rules.String.Letters(false);
const paramAssign = new Parsing.Rules.Char.Expect('=');

const singleString = new Parsing.Rules.All(
  singleQuotes,
  new Parsing.Rules.Data.Extract(
    'value',
    new Parsing.Rules.Repeat(new Parsing.Rules.Decision(escapeString, content, new Parsing.Rules.Not(singleQuotes, content)))
  ),
  singleQuotes
);

const doubleString = new Parsing.Rules.All(
  doubleQuotes,
  new Parsing.Rules.Data.Extract(
    'value',
    new Parsing.Rules.Repeat(new Parsing.Rules.Decision(escapeString, content, new Parsing.Rules.Not(doubleQuotes, content)))
  ),
  doubleQuotes
);

const noString = new Parsing.Rules.Data.Extract(
  'value',
  new Parsing.Rules.Repeat(
    new Parsing.Rules.Any(
      new Parsing.Rules.String.Letters(false),
      new Parsing.Rules.String.Digits(),
      new Parsing.Rules.Char.Choice('-', '_')
    )
  )
);

const commentOpen = new Parsing.Rules.String.Expect('<!--');
const commentClose = new Parsing.Rules.String.Expect('-->');
const optionalSpace = new Parsing.Rules.Option(new Parsing.Rules.Repeat(whitespace));

let text: Parsing.Rule;
let comment: Parsing.Rule;
let parameters: Parsing.Rule;
let element: Parsing.Rule;
let collection: Parsing.Rule;
let document: Parsing.Rule;

text = new Parsing.Rules.Success(
  new Parsing.Rules.Data.Tree(
    'text',
    Parsing.Trees.Directions.NEXT,
    new Parsing.Rules.Data.Extract('content', new Parsing.Rules.Repeat(new Parsing.Rules.Not(tagOpen, content)))
  )
);

comment = new Parsing.Rules.Success(
  new Parsing.Rules.All(
    commentOpen,
    new Parsing.Rules.Data.Tree(
      'comment',
      Parsing.Trees.Directions.NEXT,
      new Parsing.Rules.Data.Extract('content', new Parsing.Rules.Repeat(new Parsing.Rules.Not(commentClose, content)))
    ),
    commentClose
  )
);

parameters = new Parsing.Rules.Data.Tree(
  'attribute',
  Parsing.Trees.Directions.NEXT,
  new Parsing.Rules.All(
    new Parsing.Rules.Data.Extract('name', paramName),
    optionalSpace,
    new Parsing.Rules.Option(new Parsing.Rules.All(paramAssign, optionalSpace, new Parsing.Rules.Any(singleString, doubleString, noString)))
  )
);

element = new Parsing.Rules.Success(
  new Parsing.Rules.Data.Tree(
    'element',
    Parsing.Trees.Directions.NEXT,
    new Parsing.Rules.All(
      new Parsing.Rules.Error(Errors.EXPECTED_TAG_OPEN, tagOpen),
      optionalSpace,
      new Parsing.Rules.Error(Errors.EXPECTED_TAG_NAME, new Parsing.Rules.Data.Extract('name', tagName)),
      optionalSpace,
      new Parsing.Rules.Option(
        new Parsing.Rules.Data.Node(
          Parsing.Trees.Directions.NEXT,
          Parsing.Trees.Directions.LEFT,
          new Parsing.Rules.Repeat(new Parsing.Rules.All(parameters, optionalSpace))
        )
      ),
      new Parsing.Rules.Any(
        new Parsing.Rules.All(
          new Parsing.Rules.Error(Errors.EXPECTED_TAG_ENDING, tagEnding),
          optionalSpace,
          new Parsing.Rules.Error(Errors.EXPECTED_TAG_CLOSE, tagClose)
        ),
        new Parsing.Rules.All(
          new Parsing.Rules.Error(Errors.EXPECTED_TAG_CLOSE, tagClose),
          optionalSpace,
          new Parsing.Rules.Data.Node(
            Parsing.Trees.Directions.NEXT,
            Parsing.Trees.Directions.RIGHT,
            new Parsing.Rules.Option(new Parsing.Rules.Reference(() => collection))
          ),
          new Parsing.Rules.Error(Errors.EXPECTED_TAG_OPEN, tagOpen),
          optionalSpace,
          new Parsing.Rules.All(new Parsing.Rules.Error(Errors.EXPECTED_TAG_ENDING, tagEnding), optionalSpace),
          new Parsing.Rules.Error(Errors.EXPECTED_TAG_NAME_MATCHING, new Parsing.Rules.Data.Match('name', tagName)),
          optionalSpace,
          new Parsing.Rules.Error(Errors.EXPECTED_TAG_CLOSE, tagClose)
        )
      )
    )
  )
);

collection = new Parsing.Rules.Repeat(new Parsing.Rules.Any(whitespace, text, comment, element));

document = new Parsing.Rules.All(
  new Parsing.Rules.Option(collection),
  new Parsing.Rules.Error(Errors.EXPECTED_END_OF_CONTENT, new Parsing.Rules.Data.End())
);

if (document.consume(context, tree)) {
  console.log(`Context analysis succeed.`);
  printTree(tree, 0);
} else {
  console.log(`Context analysis has been failed at the offset ${context.error.offset}.`);
  printError(context.error);
}
