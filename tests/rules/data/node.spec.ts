/*
 * Copyright (C) 2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Testing from '@singleware/testing';

import * as Parsing from '../../../source';

/**
 * Node rule, test case.
 */
@Class.Describe()
export class Node extends Testing.Case {
  /**
   * Test method.
   */
  @Testing.Method()
  @Class.Public()
  public dataNode(): void {
    const context = new Parsing.Context('defabcadg');
    const tree = new Parsing.Trees.Node('test', 0);
    const rule = new Parsing.Rules.Data.Node(
      Parsing.Trees.Directions.NEXT,
      Parsing.Trees.Directions.LEFT,
      new Parsing.Rules.Data.Tree(
        'choice',
        Parsing.Trees.Directions.NEXT,
        new Parsing.Rules.Data.Extract('name', new Parsing.Rules.String.Choice('abc', 'def'))
      )
    );
    // First success
    this.isTrue(rule.consume(context, tree));
    this.areSame((<Parsing.Trees.Node>tree.left).type, 'choice');
    this.areSame((<Parsing.Trees.Node>tree.left).data['name'], 'def');
    this.areSame(context.offset, 3);
    // Second success
    this.isTrue(rule.consume(context, tree));
    this.areSame((<Parsing.Trees.Node>tree.left).type, 'choice');
    this.areSame((<Parsing.Trees.Node>tree.left).data['name'], 'def');
    this.areSame((<Parsing.Trees.Node>(<Parsing.Trees.Node>tree.left).left).type, 'choice');
    this.areSame((<Parsing.Trees.Node>(<Parsing.Trees.Node>tree.left).left).data['name'], 'abc');
    this.areSame(context.offset, 6);
    // Expected error (No choice available)
    this.isFalse(rule.consume(context, tree));
    this.areSame((<Parsing.Trees.Node>tree.left).type, 'choice');
    this.areSame((<Parsing.Trees.Node>tree.left).data['name'], 'def');
    this.areSame((<Parsing.Trees.Node>(<Parsing.Trees.Node>tree.left).left).type, 'choice');
    this.areSame((<Parsing.Trees.Node>(<Parsing.Trees.Node>tree.left).left).data['name'], 'abc');
    this.areSame(context.offset, 6);
  }
}
