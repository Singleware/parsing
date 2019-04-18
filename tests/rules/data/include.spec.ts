/*
 * Copyright (C) 2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Testing from '@singleware/testing';

import * as Parsing from '../../../source';

/**
 * Include rule, test case.
 */
@Class.Describe()
export class Include extends Testing.Case {
  /**
   * Test method.
   */
  @Testing.Method()
  @Class.Public()
  public dataEqual(): void {
    const context = new Parsing.Context(new Parsing.Data.Node('test'), 'defabcadg');
    const ruleA = new Parsing.Rules.Data.Extract('name', new Parsing.Rules.String.Choice('abc', 'def'));
    const ruleB = new Parsing.Rules.Data.Include('name', ['def', 'abc'], new Parsing.Rules.Flow.Reference(() => ruleA));
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

  /**
   * Soft test method.
   */
  @Testing.Method()
  @Class.Public()
  public dataSoftEqual(): void {
    const context = new Parsing.Context(new Parsing.Data.Node('test'), 'dEfABcadg');
    const ruleA = new Parsing.Rules.Data.Extract('name', new Parsing.Rules.String.SoftChoice('abc', 'def'));
    const ruleB = new Parsing.Rules.Data.SoftInclude('name', ['def', 'abc'], new Parsing.Rules.Flow.Reference(() => ruleA));
    // First success
    this.isTrue(ruleA.consume(context));
    this.areSame(context.tree.data['name'], 'dEf');
    this.areSame(context.offset, 3);
    // Second success
    this.isTrue(ruleB.consume(context));
    this.areSame(context.tree.data['name'], 'ABc');
    this.areSame(context.offset, 6);
    // Expected error (Condition failed)
    this.isFalse(ruleB.consume(context));
    this.areSame(context.tree.data['name'], 'ABc');
    this.areSame(context.offset, 6);
  }
}
