/*
 * Copyright (C) 2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Testing from '@singleware/testing';

import * as Parsing from '../../source';

/**
 * Repeat rule, test case.
 */
@Class.Describe()
export class Repeat extends Testing.Case {
  /**
   * Test method.
   */
  @Testing.Method()
  @Class.Public()
  public repeat(): void {
    const context = new Parsing.Context('xxxxxy');
    const tree = new Parsing.Trees.Node('test', 0);
    const rule = new Parsing.Rules.Repeat(new Parsing.Rules.Char.Expect('x'));
    // Success
    this.isTrue(rule.consume(context, tree));
    this.areSame(context.offset, 5);
    // Expected error (No char expected)
    this.isFalse(rule.consume(context, tree));
    this.areSame(context.offset, 5);
  }
}
