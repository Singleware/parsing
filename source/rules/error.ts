/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import { Rule } from '../rule';
import { Context } from '../context';

/**
 * Error rule, rule class.
 */
@Class.Describe()
export class Error extends Class.Null implements Rule {
  /**
   * Error code.
   */
  @Class.Private()
  private code: number;

  /**
   * Sub rule.
   */
  @Class.Private()
  private rule: Rule;

  /**
   * Default constructor.
   * @param code Error code.
   * @param rule Data rule.
   */
  constructor(code: number, rule: Rule) {
    super();
    this.code = code;
    this.rule = rule;
  }

  /**
   * Consumes this rule moving ahead the context offset.
   * @param context Context entity.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public consume(context: Context): boolean {
    if (!this.rule.consume(context)) {
      if (context.offset > context.error.offset) {
        context.fail(this.code);
      }
      return false;
    }
    return true;
  }
}
