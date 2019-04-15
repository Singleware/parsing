/*
 * Copyright (C) 2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Testing from '@singleware/testing';

import * as Parsing from '../../../source';

/**
 * Match rule, test case.
 */
@Class.Describe()
export class Match extends Testing.Case {
  /**
   * Soft test method.
   */
  @Testing.Method()
  @Class.Public()
  public dataSoftMatch(): void {
    const context = new Parsing.Context(new Parsing.Data.Node('test'), 'DeFaBCadg');
    const rule = new Parsing.Rules.Data.SoftMatch(
      'name',
      new Parsing.Rules.Data.Extract('name', new Parsing.Rules.String.Choice('aBC', 'DeF'))
    );
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

  /**
   * Default test method.
   */
  @Testing.Method()
  @Class.Public()
  public dataMatch(): void {
    const context = new Parsing.Context(new Parsing.Data.Node('test'), 'DeFaBCadg');
    const rule = new Parsing.Rules.Data.Match(
      'name',
      new Parsing.Rules.Data.Extract('name', new Parsing.Rules.String.Choice('aBC', 'DeF'))
    );
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
