/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import { Rule } from '../rule';
import { Context } from '../context';

/**
 * Not rule, rule class.
 */
@Class.Describe()
export class Not extends Class.Null implements Rule {
  /**
   * Condition rule.
   */
  @Class.Private()
  private condition: Rule;

  /**
   * Sub rule.
   */
  @Class.Private()
  private rule: Rule;

  /**
   * Default constructor.
   * @param condition Condition rule.
   * @param
   */
  constructor(condition: Rule, rule: Rule) {
    super();
    this.condition = condition;
    this.rule = rule;
  }

  /**
   * Consumes this rule moving ahead the context offset.
   * @param context Context entity.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public consume(context: Context): boolean {
    if (!this.condition.consume(context.copy())) {
      return this.rule.consume(context);
    }
    return false;
  }
}
