/*
 * Copyright (C) 2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Testing from '@singleware/testing';

import * as Parsing from '../../../source';

/**
 * Tree rule, test case.
 */
@Class.Describe()
export class Tree extends Testing.Case {
  /**
   * Test method.
   */
  @Testing.Method()
  @Class.Public()
  public dataTree(): void {
    const context = new Parsing.Context('defabcadg');
    const tree = new Parsing.Trees.Node('test', 0);
    const rule = new Parsing.Rules.Data.Tree(
      'choice',
      Parsing.Trees.Directions.NEXT,
      new Parsing.Rules.Data.Extract('name', new Parsing.Rules.String.Choice('abc', 'def'))
    );
    // First success
    this.isTrue(rule.consume(context, tree));
    this.areSame((<Parsing.Trees.Node>tree.next).type, 'choice');
    this.areSame((<Parsing.Trees.Node>tree.next).data['name'], 'def');
    this.areSame(context.offset, 3);
    // Second success
    this.isTrue(rule.consume(context, tree));
    this.areSame((<Parsing.Trees.Node>tree.next).type, 'choice');
    this.areSame((<Parsing.Trees.Node>tree.next).data['name'], 'def');
    this.areSame((<Parsing.Trees.Node>(<Parsing.Trees.Node>tree.next).next).type, 'choice');
    this.areSame((<Parsing.Trees.Node>(<Parsing.Trees.Node>tree.next).next).data['name'], 'abc');
    this.areSame(context.offset, 6);
    // Expected error (No choice available)
    this.isFalse(rule.consume(context, tree));
    this.areSame((<Parsing.Trees.Node>tree.next).type, 'choice');
    this.areSame((<Parsing.Trees.Node>tree.next).data['name'], 'def');
    this.areSame((<Parsing.Trees.Node>(<Parsing.Trees.Node>tree.next).next).type, 'choice');
    this.areSame((<Parsing.Trees.Node>(<Parsing.Trees.Node>tree.next).next).data['name'], 'abc');
    this.areSame(context.offset, 6);
  }
}