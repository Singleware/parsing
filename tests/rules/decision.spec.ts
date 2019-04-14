/*
 * Copyright (C) 2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Testing from '@singleware/testing';

import * as Parsing from '../../source';

/**
 * Decision rule, test case.
 */
@Class.Describe()
export class Decision extends Testing.Case {
  /**
   * Test method.
   */
  @Testing.Method()
  @Class.Public()
  public decision(): void {
    const context = new Parsing.Context(new Parsing.Data.Node('test'), '\\a0a');
    const rule = new Parsing.Rules.Decision(
      new Parsing.Rules.Char.Expect('\\'),
      new Parsing.Rules.Char.Any(),
      new Parsing.Rules.Char.Digit()
    );
    // First
    this.isTrue(rule.consume(context));
    this.areSame(context.offset, 2);
    // Second
    this.isTrue(rule.consume(context));
    this.areSame(context.offset, 3);
    // Expected error (No valid content)
    this.isFalse(rule.consume(context));
    this.areSame(context.offset, 3);
  }
}
