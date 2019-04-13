/*
 * Copyright (C) 2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Testing from '@singleware/testing';

import * as Parsing from '../../source';

/**
 * All rules, test case.
 */
@Class.Describe()
export class All extends Testing.Case {
  /**
   * Test method.
   */
  @Testing.Method()
  @Class.Public()
  public all(): void {
    const context = new Parsing.Context('a9a5aa');
    const tree = new Parsing.Trees.Node('test', 0);
    const rule = new Parsing.Rules.All(new Parsing.Rules.Char.Expect('a'), new Parsing.Rules.Char.Digit());
    // First
    this.isTrue(rule.consume(context, tree));
    this.areSame(context.offset, 2);
    // Second
    this.isTrue(rule.consume(context, tree));
    this.areSame(context.offset, 4);
    // Expected error (No valid content)
    this.isFalse(rule.consume(context, tree));
    this.areSame(context.offset, 5);
  }
}
