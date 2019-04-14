/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import { Rule } from '../rule';
import { Context } from '../context';

/**
 * Decision rule, rule class.
 */
@Class.Describe()
export class Decision extends Class.Null implements Rule {
  /**
   * Condition rule.
   */
  @Class.Private()
  private condition: Rule;

  /**
   * Success rule.
   */
  @Class.Private()
  private success: Rule;

  /**
   * Failure rule.
   */
  @Class.Private()
  private failure: Rule;

  /**
   * Default constructor.
   * @param condition Condition rule.
   */
  constructor(condition: Rule, success: Rule, failure: Rule) {
    super();
    this.condition = condition;
    this.success = success;
    this.failure = failure;
  }

  /**
   * Consumes this rule moving ahead the context offset.
   * @param context Context entity.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public consume(context: Context): boolean {
    const temp = context.copy();
    if (this.condition.consume(temp)) {
      context.forward(temp.offset - context.offset);
      return this.success.consume(context);
    }
    return this.failure.consume(context);
  }
}
