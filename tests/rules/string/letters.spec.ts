/*
 * Copyright (C) 2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Testing from '@singleware/testing';

import * as Parsing from '../../../source';

/**
 * String letter rule, test case.
 */
@Class.Describe()
export class Letters extends Testing.Case {
  /**
   * Lowercase test method.
   */
  @Testing.Method()
  @Class.Public()
  public stringLowerLetters(): void {
    const context = new Parsing.Context(new Parsing.Data.Node('test', 0), 'abcdefghijklmnopqrstuvwxyzç');
    const rule = new Parsing.Rules.String.LowerLetters();
    // Letters from 'a' to 'z'
    this.isTrue(rule.consume(context));
    this.areSame(context.offset, 26);
    // Expected error
    this.isFalse(rule.consume(context));
    this.areSame(context.offset, 26);
  }

  /**
   * Uppercase test method.
   */
  @Testing.Method()
  @Class.Public()
  public stringUpperLetters(): void {
    const context = new Parsing.Context(new Parsing.Data.Node('test'), 'ABCDEFGHIJKLMNOPQRSTUVWXYZÇ');
    const rule = new Parsing.Rules.String.UpperLetters();
    // Letters from 'A' to 'Z'
    this.isTrue(rule.consume(context));
    this.areSame(context.offset, 26);
    // Expected error (No letter available)
    this.isFalse(rule.consume(context));
    this.areSame(context.offset, 26);
  }

  /**
   * Default test method.
   */
  @Testing.Method()
  @Class.Public()
  public stringLetters(): void {
    const context = new Parsing.Context(new Parsing.Data.Node('test'), 'aABbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZzÇ');
    const rule = new Parsing.Rules.String.Letters();
    // Letters from 'Aa' to 'Zz'
    this.isTrue(rule.consume(context));
    this.areSame(context.offset, 52);
    // Expected error (No letter available)
    this.isFalse(rule.consume(context));
    this.areSame(context.offset, 52);
  }
}
