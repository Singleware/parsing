/*
 * Copyright (C) 2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Testing from '@singleware/testing';

import * as Parsing from '../../../source';

/**
 * Not rule, test case.
 */
@Class.Describe()
export class Not extends Testing.Case {
  /**
   * Test method.
   */
  @Testing.Method()
  @Class.Public()
  public not(): void {
    const context = new Parsing.Context(new Parsing.Data.Node('test'), 'abcd');
    const rule = new Parsing.Rules.Flow.Not(new Parsing.Rules.Char.Expect('d'), new Parsing.Rules.Char.Any());
    // First
    this.isTrue(rule.consume(context));
    this.areSame(context.offset, 1);
    // Second
    this.isTrue(rule.consume(context));
    this.areSame(context.offset, 2);
    // Third
    this.isTrue(rule.consume(context));
    this.areSame(context.offset, 3);
    // Expected error (No allowed character)
    this.isFalse(rule.consume(context));
    this.areSame(context.offset, 3);
  }
}
