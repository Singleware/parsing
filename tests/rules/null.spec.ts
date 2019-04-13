/*
 * Copyright (C) 2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Testing from '@singleware/testing';

import * as Parsing from '../../source';

/**
 * Null rule, test case.
 */
@Class.Describe()
export class Null extends Testing.Case {
  /**
   * Test method.
   */
  @Testing.Method()
  @Class.Public()
  public null(): void {
    const context = new Parsing.Context('x');
    const tree = new Parsing.Trees.Node('test', 0);
    const rule = new Parsing.Rules.Null();
    // Expected error (Always false)
    this.isFalse(rule.consume(context, tree));
    this.areSame(context.offset, 0);
  }
}
