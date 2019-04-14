/*
 * Copyright (C) 2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Testing from '@singleware/testing';

import * as Parsing from '../../../source';

/**
 * Characters range rule, test case.
 */
@Class.Describe()
export class Range extends Testing.Case {
  /**
   * Test method.
   */
  @Testing.Method()
  @Class.Public()
  public charRange(): void {
    const context = new Parsing.Context(new Parsing.Data.Node('test'), 'efghij');
    const rule = new Parsing.Rules.Char.Range('e', 'i');
    // Letters from 'e' to 'i'
    for (let i = 0; i < 5; ++i) {
      this.isTrue(rule.consume(context));
      this.areSame(context.offset, i + 1);
    }
    // Expected error (No range char available)
    this.isFalse(rule.consume(context));
    this.areSame(context.offset, 5);
  }
}
