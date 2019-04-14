/*
 * Copyright (C) 2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Testing from '@singleware/testing';

import * as Parsing from '../../../source';

/**
 * Characters letter rule, test case.
 */
@Class.Describe()
export class Letter extends Testing.Case {
  /**
   * Consume all the lowercase letters.
   */
  @Testing.Method()
  @Class.Public()
  public charLowerLetter(): void {
    const context = new Parsing.Context(new Parsing.Data.Node('test', 0), 'abcdefghijklmnopqrstuvwxyzç');
    const rule = new Parsing.Rules.Char.Letter(false);
    // Letters from 'a' to 'z'
    for (let i = 0; i < 26; ++i) {
      this.isTrue(rule.consume(context));
      this.areSame(context.offset, i + 1);
    }
    // Expected error
    this.isFalse(rule.consume(context));
    this.areSame(context.offset, 26);
  }

  /**
   * Consume all the uppercase letters.
   */
  @Testing.Method()
  @Class.Public()
  public charUpperLetter(): void {
    const context = new Parsing.Context(new Parsing.Data.Node('test'), 'ABCDEFGHIJKLMNOPQRSTUVWXYZÇ');
    const rule = new Parsing.Rules.Char.Letter(true);
    // Letters from 'A' to 'Z'
    for (let i = 0; i < 26; ++i) {
      this.isTrue(rule.consume(context));
      this.areSame(context.offset, i + 1);
    }
    // Expected error (No letter available)
    this.isFalse(rule.consume(context));
    this.areSame(context.offset, 26);
  }
}
