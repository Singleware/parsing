/*
 * Copyright (C) 2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Testing from '@singleware/testing';

import * as Parsing from '../../../source';

/**
 * Expected string rule, test case.
 */
@Class.Describe()
export class Expect extends Testing.Case {
  /**
   * Soft test method.
   */
  @Testing.Method()
  @Class.Public()
  public stringSoftExpect(): void {
    const context = new Parsing.Context(new Parsing.Data.Node('test'), 'aBCx');
    const rule = new Parsing.Rules.String.SoftExpect('abc');
    // Success
    this.isTrue(rule.consume(context));
    this.areSame(context.offset, 3);
    // Expected error (No char expected)
    this.isFalse(rule.consume(context));
    this.areSame(context.offset, 3);
  }

  /**
   * Test method.
   */
  @Testing.Method()
  @Class.Public()
  public stringExpect(): void {
    const context = new Parsing.Context(new Parsing.Data.Node('test'), 'abcx');
    const rule = new Parsing.Rules.String.Expect('abc');
    // Success
    this.isTrue(rule.consume(context));
    this.areSame(context.offset, 3);
    // Expected error (No char expected)
    this.isFalse(rule.consume(context));
    this.areSame(context.offset, 3);
  }
}
