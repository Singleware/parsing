/*
 * Copyright (C) 2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Testing from '@singleware/testing';

import * as Parsing from '../../../source';

/**
 * String digit rule, test case.
 */
@Class.Describe()
export class Digits extends Testing.Case {
  /**
   * Test method.
   */
  @Testing.Method()
  @Class.Public()
  public stringDigit(): void {
    const context = new Parsing.Context(new Parsing.Data.Node('test'), '0123456789a');
    const rule = new Parsing.Rules.String.Digits();
    // Digits from 0 to 9 (Success)
    this.isTrue(rule.consume(context));
    this.areSame(context.offset, 10);
    // Expected error (No digit available)
    this.isFalse(rule.consume(context));
    this.areSame(context.offset, 10);
  }
}
