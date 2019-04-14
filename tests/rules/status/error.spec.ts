/*
 * Copyright (C) 2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Testing from '@singleware/testing';

import * as Parsing from '../../../source';

/**
 * Error rule, test case.
 */
@Class.Describe()
export class Error extends Testing.Case {
  /**
   * Test method.
   */
  @Testing.Method()
  @Class.Public()
  public error(): void {
    const context = new Parsing.Context(new Parsing.Data.Node('test'), 'ab');
    const rule = new Parsing.Rules.Status.Error(0xa0, new Parsing.Rules.Char.Expect('a'));
    // Success (without error data)
    this.isTrue(rule.consume(context));
    this.areSame(context.offset, 1);
    this.areSame(context.error.code, 0);
    this.areSame(context.error.offset, -1);
    // Expected error (with error data)
    this.isFalse(rule.consume(context));
    this.areSame(context.offset, 1);
    this.areSame(context.error.code, 0xa0);
    this.areSame(context.error.offset, 1);
  }
}
