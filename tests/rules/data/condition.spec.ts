/*
 * Copyright (C) 2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Testing from '@singleware/testing';

import * as Parsing from '../../../source';

/**
 * Condition rule, test case.
 */
@Class.Describe()
export class Condition extends Testing.Case {
  /**
   * Test method.
   */
  @Testing.Method()
  @Class.Public()
  public dataCondition(): void {
    const context = new Parsing.Context(new Parsing.Data.Node('test'), 'defabcadg');
    const ruleA = new Parsing.Rules.Data.Extract('name', Parsing.Data.Texts.DEFAULT, new Parsing.Rules.String.Choice('abc', 'def'));
    const ruleB = new Parsing.Rules.Data.Condition(
      'name',
      Parsing.Data.Conditions.EQUALS,
      'def',
      new Parsing.Rules.Flow.Reference(() => ruleA)
    );
    // First success
    this.isTrue(ruleA.consume(context));
    this.areSame(context.tree.data['name'], 'def');
    this.areSame(context.offset, 3);
    // Second success
    this.isTrue(ruleB.consume(context));
    this.areSame(context.tree.data['name'], 'abc');
    this.areSame(context.offset, 6);
    // Expected error (Condition failed)
    this.isFalse(ruleB.consume(context));
    this.areSame(context.tree.data['name'], 'abc');
    this.areSame(context.offset, 6);
  }
}
