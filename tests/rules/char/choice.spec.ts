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
   * Test method.
   */
  @Testing.Method()
  @Class.Public()
  public charChoice(): void {
    const context = new Parsing.Context('xyza');
    const tree = new Parsing.Trees.Node('test', 0);
    const rule = new Parsing.Rules.Char.Choice('z', 'y', 'x');
    // First success
    this.isTrue(rule.consume(context, tree));
    this.areSame(context.offset, 1);
    // Second success
    this.isTrue(rule.consume(context, tree));
    this.areSame(context.offset, 2);
    // Third success
    this.isTrue(rule.consume(context, tree));
    this.areSame(context.offset, 3);
    // Expected error (No choice available)
    this.isFalse(rule.consume(context, tree));
    this.areSame(context.offset, 3);
  }
}
