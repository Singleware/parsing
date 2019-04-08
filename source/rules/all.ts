/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Trees from '../trees';

import { Rule } from '../rule';
import { Context } from '../context';

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
   * @param rules List of expected rules.
   */
  constructor(...rules: Rule[]) {
    super();
    this.rules = rules;
  }

  /**
   * Consumes this rule without moving ahead the context offset.
   * @param context Context entity.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public peek(context: Context): boolean {
    for (const rule of this.rules) {
      if (!rule.peek(context)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Consumes this rule moving ahead the context offset.
   * @param context Context entity.
   * @param node Current context node.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public consume(context: Context, node: Trees.Node): boolean {
    for (const rule of this.rules) {
      if (!rule.consume(context, node)) {
        return false;
      }
    }
    return true;
  }
}
