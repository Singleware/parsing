/*
 * Copyright (C) 2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Testing from '@singleware/testing';

import * as Parsing from '../../../source';

/**
 * Extract rule, test case.
 */
@Class.Describe()
export class Extract extends Testing.Case {
  /**
   * Lowercase test method.
   */
  @Testing.Method()
  @Class.Public()
  public dataLowerExtract(): void {
    const context = new Parsing.Context(new Parsing.Data.Node('test'), 'DEFABCADG');
    const rule = new Parsing.Rules.Data.LowerExtract('name', new Parsing.Rules.String.Choice('ABC', 'DEF'));
    // First success
    this.isTrue(rule.consume(context));
    this.areSame(context.tree.data['name'], 'def');
    this.areSame(context.offset, 3);
    // Second success
    this.isTrue(rule.consume(context));
    this.areSame(context.tree.data['name'], 'abc');
    this.areSame(context.offset, 6);
    // Expected error (No choice available)
    this.isFalse(rule.consume(context));
    this.areSame(context.tree.data['name'], 'abc');
    this.areSame(context.offset, 6);
  }

  /**
   * Uppercase test method.
   */
  @Testing.Method()
  @Class.Public()
  public dataUpperExtract(): void {
    const context = new Parsing.Context(new Parsing.Data.Node('test'), 'defabcadg');
    const rule = new Parsing.Rules.Data.UpperExtract('name', new Parsing.Rules.String.Choice('abc', 'def'));
    // First success
    this.isTrue(rule.consume(context));
    this.areSame(context.tree.data['name'], 'DEF');
    this.areSame(context.offset, 3);
    // Second success
    this.isTrue(rule.consume(context));
    this.areSame(context.tree.data['name'], 'ABC');
    this.areSame(context.offset, 6);
    // Expected error (No choice available)
    this.isFalse(rule.consume(context));
    this.areSame(context.tree.data['name'], 'ABC');
    this.areSame(context.offset, 6);
  }

  /**
   * Default test method.
   */
  @Testing.Method()
  @Class.Public()
  public dataExtract(): void {
    const context = new Parsing.Context(new Parsing.Data.Node('test'), 'DeFaBCadg');
    const rule = new Parsing.Rules.Data.Extract('name', new Parsing.Rules.String.SoftChoice('abc', 'def'));
    // First success
    this.isTrue(rule.consume(context));
    this.areSame(context.tree.data['name'], 'DeF');
    this.areSame(context.offset, 3);
    // Second success
    this.isTrue(rule.consume(context));
    this.areSame(context.tree.data['name'], 'aBC');
    this.areSame(context.offset, 6);
    // Expected error (No choice available)
    this.isFalse(rule.consume(context));
    this.areSame(context.tree.data['name'], 'aBC');
    this.areSame(context.offset, 6);
  }
}
