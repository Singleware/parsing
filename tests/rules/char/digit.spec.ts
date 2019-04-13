/*
 * Copyright (C) 2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Testing from '@singleware/testing';

import * as Parsing from '../../../source';

/**
 * Character digit rule, test case.
 */
@Class.Describe()
export class Digit extends Testing.Case {
  /**
   * Test method.
   */
  @Testing.Method()
  @Class.Public()
  public charDigit(): void {
    const context = new Parsing.Context('0123456789a');
    const tree = new Parsing.Trees.Node('test', 0);
    const rule = new Parsing.Rules.Char.Digit();
    // Digits from 0 to 9 (Success)
    for (let i = 0; i < 10; ++i) {
      this.isTrue(rule.consume(context, tree));
      this.areSame(context.offset, i + 1);
    }
    // Expected error (No digit available)
    this.isFalse(rule.consume(context, tree));
    this.areSame(context.offset, 10);
  }
}
