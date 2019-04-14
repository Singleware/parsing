/*
 * Copyright (C) 2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Testing from '@singleware/testing';

import * as Parsing from '../../source';

/**
 * Reference rule, test case.
 */
@Class.Describe()
export class Reference extends Testing.Case {
  /**
   * Test method.
   */
  @Testing.Method()
  @Class.Public()
  public reference(): void {
    const context = new Parsing.Context(new Parsing.Data.Node('test'), 'xy');
    const rule = new Parsing.Rules.Reference(() => new Parsing.Rules.Char.Expect('x'));
    // Success
    this.isTrue(rule.consume(context));
    this.areSame(context.offset, 1);
    // Expected error (No char expected)
    this.isFalse(rule.consume(context));
    this.areSame(context.offset, 1);
  }
}
