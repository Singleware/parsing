/*
 * Copyright (C) 2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Testing from '@singleware/testing';

import * as Parsing from '../../source';

/**
 * Success rule, test case.
 */
@Class.Describe()
export class Success extends Testing.Case {
  /**
   * Test method.
   */
  @Testing.Method()
  @Class.Public()
  public success(): void {
    const context = new Parsing.Context(new Parsing.Data.Node('test'), 'a');
    const ruleA = new Parsing.Rules.Error(0xa0, new Parsing.Rules.Data.End());
    const ruleB = new Parsing.Rules.Success(new Parsing.Rules.Char.Expect('a'));
    // Expected error (To set the error code)
    this.isFalse(ruleA.consume(context));
    this.areSame(context.offset, 0);
    this.areSame(context.error.code, 0xa0);
    this.areSame(context.error.offset, 0);
    // Success (clear the error code);
    this.isTrue(ruleB.consume(context));
    this.areSame(context.offset, 1);
    this.areSame(context.error.code, 0);
    this.areSame(context.error.offset, -1);
  }
}
