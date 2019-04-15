/*
 * Copyright (C) 2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Testing from '@singleware/testing';

import * as Parsing from '../../../source';

/**
 * Expected character rule, test case.
 */
@Class.Describe()
export class Expect extends Testing.Case {
  /**
   * Soft test method.
   */
  @Testing.Method()
  @Class.Public()
  public charSoftExpect(): void {
    const context = new Parsing.Context(new Parsing.Data.Node('test'), 'xXy');
    const rule = new Parsing.Rules.Char.SoftExpect('x');
    // First
    this.isTrue(rule.consume(context));
    this.areSame(context.offset, 1);
    // Second
    this.isTrue(rule.consume(context));
    this.areSame(context.offset, 2);
    // Expected error (No char expected)
    this.isFalse(rule.consume(context));
    this.areSame(context.offset, 2);
  }

  /**
   * Test method.
   */
  @Testing.Method()
  @Class.Public()
  public charExpect(): void {
    const context = new Parsing.Context(new Parsing.Data.Node('test'), 'xX');
    const rule = new Parsing.Rules.Char.Expect('x');
    // Success
    this.isTrue(rule.consume(context));
    this.areSame(context.offset, 1);
    // Expected error (No char expected)
    this.isFalse(rule.consume(context));
    this.areSame(context.offset, 1);
  }
}
