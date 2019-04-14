/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Parsing from '../source';
import * as Rules from '../source/rules';

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
function printTree(node: Parsing.Data.Node, offset: number): void {
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

const tree = new Parsing.Data.Node('document');
const context = new Parsing.Context(
  tree,
  `
<html>
  <!-- Header begins -->
  <head>
    <meta charset="utf-8">
    <title>Parser Test</title>
  </head>
  <!-- Header ends, body begins -->
  <body>
    <custom-element />
    <namespaced:element />
  </body>
  <script></script>
  <!-- Body ends -->
</html>`
);

const singleQuotes = new Rules.Char.Expect("'");
const doubleQuotes = new Rules.Char.Expect('"');
const escapeString = new Rules.Char.Expect('\\');
const whitespace = new Rules.Char.Choice(' ', '\t', '\r', '\n');
const content = new Rules.Char.Any();
const tagOpen = new Rules.Char.Expect('<');
const tagEnding = new Rules.Char.Expect('/');
const tagClose = new Rules.Char.Expect('>');
const tagName = new Rules.Flow.Repeat(new Rules.Flow.Not(new Rules.Flow.Any(whitespace, tagEnding, tagClose), content));
const paramName = new Rules.String.Letters(Parsing.Data.Texts.BOTH);
const paramAssign = new Rules.Char.Expect('=');

const singleString = new Rules.Flow.All(
  singleQuotes,
  new Rules.Data.Extract(
    'value',
    new Rules.Flow.Repeat(new Rules.Flow.Fork(escapeString, content, new Rules.Flow.Not(singleQuotes, content)))
  ),
  singleQuotes
);

const doubleString = new Rules.Flow.All(
  doubleQuotes,
  new Rules.Data.Extract(
    'value',
    new Rules.Flow.Repeat(new Rules.Flow.Fork(escapeString, content, new Rules.Flow.Not(doubleQuotes, content)))
  ),
  doubleQuotes
);

const noString = new Rules.Data.Extract(
  'value',
  new Rules.Flow.Repeat(
    new Rules.Flow.Any(new Rules.String.Letters(Parsing.Data.Texts.BOTH), new Rules.String.Digits(), new Rules.Char.Choice('-', '_'))
  )
);

const commentOpen = new Rules.String.Expect('<!--');
const commentClose = new Rules.String.Expect('-->');
const optionalSpace = new Rules.Flow.Option(new Rules.Flow.Repeat(whitespace));

let text: Parsing.Rule;
let comment: Parsing.Rule;
let parameters: Parsing.Rule;
let element: Parsing.Rule;
let collection: Parsing.Rule;
let document: Parsing.Rule;

text = new Rules.Status.Success(
  new Rules.Data.Tree(
    'text',
    Parsing.Data.Directions.NEXT,
    new Rules.Data.Extract('content', new Rules.Flow.Repeat(new Rules.Flow.Not(tagOpen, content)))
  )
);

comment = new Rules.Status.Success(
  new Rules.Flow.All(
    commentOpen,
    new Rules.Data.Tree(
      'comment',
      Parsing.Data.Directions.NEXT,
      new Rules.Data.Extract('content', new Rules.Flow.Repeat(new Rules.Flow.Not(commentClose, content)))
    ),
    commentClose
  )
);

parameters = new Rules.Data.Tree(
  'attribute',
  Parsing.Data.Directions.NEXT,
  new Rules.Flow.All(
    new Rules.Data.Extract('name', paramName),
    optionalSpace,
    new Rules.Flow.Option(new Rules.Flow.All(paramAssign, optionalSpace, new Rules.Flow.Any(singleString, doubleString, noString)))
  )
);

element = new Rules.Status.Success(
  new Rules.Data.Tree(
    'element',
    Parsing.Data.Directions.NEXT,
    new Rules.Flow.All(
      new Rules.Status.Error(Errors.EXPECTED_TAG_OPEN, tagOpen),
      optionalSpace,
      new Rules.Status.Error(Errors.EXPECTED_TAG_NAME, new Rules.Data.Extract('name', tagName)),
      optionalSpace,
      new Rules.Flow.Option(
        new Rules.Data.Node(
          Parsing.Data.Directions.NEXT,
          Parsing.Data.Directions.LEFT,
          new Rules.Flow.Repeat(new Rules.Flow.All(parameters, optionalSpace))
        )
      ),
      new Rules.Flow.Any(
        new Rules.Data.Condition(
          'name',
          Parsing.Data.Conditions.IN,
          ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'],
          new Rules.Status.Error(Errors.EXPECTED_TAG_CLOSE, tagClose)
        ),
        new Rules.Flow.All(
          new Rules.Status.Error(Errors.EXPECTED_TAG_ENDING, tagEnding),
          optionalSpace,
          new Rules.Status.Error(Errors.EXPECTED_TAG_CLOSE, tagClose)
        ),
        new Rules.Flow.All(
          new Rules.Status.Error(Errors.EXPECTED_TAG_CLOSE, tagClose),
          optionalSpace,
          new Rules.Data.Node(
            Parsing.Data.Directions.NEXT,
            Parsing.Data.Directions.RIGHT,
            new Rules.Flow.Option(new Rules.Flow.Reference(() => collection))
          ),
          new Rules.Status.Error(Errors.EXPECTED_TAG_OPEN, tagOpen),
          optionalSpace,
          new Rules.Flow.All(new Rules.Status.Error(Errors.EXPECTED_TAG_ENDING, tagEnding), optionalSpace),
          new Rules.Status.Error(Errors.EXPECTED_TAG_NAME_MATCHING, new Rules.Data.Match('name', tagName)),
          optionalSpace,
          new Rules.Status.Error(Errors.EXPECTED_TAG_CLOSE, tagClose)
        )
      )
    )
  )
);

collection = new Rules.Flow.Repeat(new Rules.Flow.Any(whitespace, text, comment, element));

document = new Rules.Flow.All(
  new Rules.Flow.Option(collection),
  new Rules.Status.Error(Errors.EXPECTED_END_OF_CONTENT, new Rules.Data.End())
);

if (document.consume(context)) {
  console.log(`Context analysis succeed.`);
  printTree(tree, 0);
} else {
  console.log(`Context analysis has been failed at the offset ${context.error.offset}.`);
  printError(context.error);
}
