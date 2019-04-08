/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Trees from '../trees';

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
   * Consumes this rule without moving ahead the context offset.
   * @param context Context entity.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public peek(context: Context): boolean {
    return !this.condition.peek(context);
  }

  /**
   * Consumes this rule moving ahead the context offset.
   * @param context Context entity.
   * @param node Current context node.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public consume(context: Context, node: Trees.Node): boolean {
    if (!this.condition.consume(context.copy(), new Trees.Node('temp', context.offset, node.data))) {
      return this.rule.consume(context, node);
    }
    return false;
  }
}
