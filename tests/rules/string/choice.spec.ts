/*
 * Copyright (C) 2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Testing from '@singleware/testing';

import * as Parsing from '../../../source';

/**
 * String choice rule, test case.
 */
@Class.Describe()
export class Choice extends Testing.Case {
  /**
   * Soft test method.
   */
  @Testing.Method()
  @Class.Public()
  public stringSoftChoice(): void {
    const context = new Parsing.Context(new Parsing.Data.Node('test'), 'aBCgHiDeFaDg');
    const rule = new Parsing.Rules.String.SoftChoice('abc', 'def', 'ghi');
    // First success
    this.isTrue(rule.consume(context));
    this.areSame(context.offset, 3);
    // Second success
    this.isTrue(rule.consume(context));
    this.areSame(context.offset, 6);
    // Third success
    this.isTrue(rule.consume(context));
    this.areSame(context.offset, 9);
    // Expected error (No choice available)
    this.isFalse(rule.consume(context));
    this.areSame(context.offset, 9);
  }

  /**
   * Test method.
   */
  @Testing.Method()
  @Class.Public()
  public stringChoice(): void {
    const context = new Parsing.Context(new Parsing.Data.Node('test'), 'abcghidefABC');
    const rule = new Parsing.Rules.String.Choice('abc', 'def', 'ghi');
    // First success
    this.isTrue(rule.consume(context));
    this.areSame(context.offset, 3);
    // Second success
    this.isTrue(rule.consume(context));
    this.areSame(context.offset, 6);
    // Third success
    this.isTrue(rule.consume(context));
    this.areSame(context.offset, 9);
    // Expected error (No choice available)
    this.isFalse(rule.consume(context));
    this.areSame(context.offset, 9);
  }
}
