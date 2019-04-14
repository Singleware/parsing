/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import { Rule } from '../../rule';
import { Context } from '../../context';

/**
 * Require all rules, rule class.
 */
@Class.Describe()
export class All extends Class.Null implements Rule {
  /**
   * Sub rules.
   */
  @Class.Private()
  private rules: Rule[];

  /**
   * Default constructor.
   * @param rule First rule.
   * @param rules List of expected rules.
   */
  constructor(rule: Rule, ...rules: Rule[]) {
    super();
    this.rules = [rule, ...rules];
  }

  /**
   * Consumes this rule moving ahead the context offset.
   * @param context Context entity.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public consume(context: Context): boolean {
    for (const rule of this.rules) {
      if (!rule.consume(context)) {
        return false;
      }
    }
    return true;
  }
}
