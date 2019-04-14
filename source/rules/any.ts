/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import { Rule } from '../rule';
import { Context } from '../context';

import { Option } from './option';

/**
 * Require any rule, rule class.
 */
@Class.Describe()
export class Any extends Class.Null implements Rule {
  /**
   * Sub rules.
   */
  @Class.Private()
  private rules: Rule[];

  /**
   * Default constructor.
   * @param rule First rule.
   * @param rules List of rules.
   */
  constructor(rule: Rule, ...rules: Rule[]) {
    super();
    if ((this.rules = [rule, ...rules]).findIndex(rule => rule instanceof Option) !== -1) {
      throw new Error(`Any rule can't contains Option rules.`);
    }
  }

  /**
   * Consumes this rule moving ahead the context offset.
   * @param context Context entity.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public consume(context: Context): boolean {
    for (const rule of this.rules) {
      const temp = context.copy();
      if (rule.consume(temp)) {
        context.forward(temp.offset - context.offset);
        context.tree.assignNodes(temp.tree);
        return true;
      }
    }
    return false;
  }
}
