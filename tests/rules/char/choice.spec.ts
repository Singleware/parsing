/*
 * Copyright (C) 2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Testing from '@singleware/testing';

import * as Parsing from '../../../source';

/**
 * Character choice rule, test case.
 */
@Class.Describe()
export class Choice extends Testing.Case {
  /**
   * Soft test method.
   */
  @Testing.Method()
  @Class.Public()
  public charSoftChoice(): void {
    const context = new Parsing.Context(new Parsing.Data.Node('test'), 'XyZa');
    const rule = new Parsing.Rules.Char.SoftChoice('z', 'y', 'x');
    // First success
    this.isTrue(rule.consume(context));
    this.areSame(context.offset, 1);
    // Second success
    this.isTrue(rule.consume(context));
    this.areSame(context.offset, 2);
    // Third success
    this.isTrue(rule.consume(context));
    this.areSame(context.offset, 3);
    // Expected error (No choice available)
    this.isFalse(rule.consume(context));
    this.areSame(context.offset, 3);
  }

  /**
   * Test method.
   */
  @Testing.Method()
  @Class.Public()
  public charChoice(): void {
    const context = new Parsing.Context(new Parsing.Data.Node('test'), 'xyzX');
    const rule = new Parsing.Rules.Char.Choice('z', 'y', 'x');
    // First success
    this.isTrue(rule.consume(context));
    this.areSame(context.offset, 1);
    // Second success
    this.isTrue(rule.consume(context));
    this.areSame(context.offset, 2);
    // Third success
    this.isTrue(rule.consume(context));
    this.areSame(context.offset, 3);
    // Expected error (No choice available)
    this.isFalse(rule.consume(context));
    this.areSame(context.offset, 3);
  }
}
