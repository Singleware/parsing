/*
 * Copyright (C) 2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Testing from '@singleware/testing';

import * as Parsing from '../../../source';

/**
 * Any character rule, test case.
 */
@Class.Describe()
export class Any extends Testing.Case {
  /**
   * Test method.
   */
  @Testing.Method()
  @Class.Public()
  public charAny(): void {
    const context = new Parsing.Context('x');
    const tree = new Parsing.Trees.Node('test', 0);
    const rule = new Parsing.Rules.Char.Any();
    // Success
    this.isTrue(rule.consume(context, tree));
    this.areSame(context.offset, 1);
    // Expected error (No content available)
    this.isFalse(rule.consume(context, tree));
    this.areSame(context.offset, 1);
  }
}