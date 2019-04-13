/*
 * Copyright (C) 2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Testing from '@singleware/testing';

import * as Parsing from '../../../source';

/**
 * End of content rule, test case.
 */
@Class.Describe()
export class End extends Testing.Case {
  /**
   * Test method.
   */
  @Testing.Method()
  @Class.Public()
  public end(): void {
    const contextA = new Parsing.Context('');
    const contextB = new Parsing.Context('x');
    const tree = new Parsing.Trees.Node('test', 0);
    const rule = new Parsing.Rules.Data.End();
    // Success
    this.isTrue(rule.consume(contextA, tree));
    this.areSame(contextA.offset, 0);
    // Expected error (No end of content)
    this.isFalse(rule.consume(contextB, tree));
    this.areSame(contextB.offset, 0);
  }
}
