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
  public dataEnd(): void {
    const contextA = new Parsing.Context(new Parsing.Data.Node('test'), '');
    const contextB = new Parsing.Context(new Parsing.Data.Node('test'), 'x');
    const rule = new Parsing.Rules.Data.End();
    // Success
    this.isTrue(rule.consume(contextA));
    this.areSame(contextA.offset, 0);
    // Expected error (No end of content)
    this.isFalse(rule.consume(contextB));
    this.areSame(contextB.offset, 0);
  }
}
