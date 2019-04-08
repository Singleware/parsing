/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Trees from '../trees';

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
   * Consumes this rule without moving ahead the context offset.
   * @param context Context entity.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public peek(context: Context): boolean {
    return this.condition.peek(context);
  }

  /**
   * Consumes this rule moving ahead the context offset.
   * @param context Context entity.
   * @param node Current context node.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public consume(context: Context, node: Trees.Node): boolean {
    const tempContext = context.copy();
    if (this.condition.consume(tempContext, new Trees.Node('temp', context.offset, node.data))) {
      context.forward(tempContext.offset - context.offset);
      return this.success.consume(context, node);
    }
    return this.failure.consume(context, node);
  }
}
