/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Trees from '../trees';

import { Rule } from '../rule';
import { Context } from '../context';

/**
 * Option rule, rule class.
 */
@Class.Describe()
export class Option extends Class.Null implements Rule {
  /**
   * Sub rule.
   */
  @Class.Private()
  private rule: Rule;

  /**
   * Default constructor.
   * @param rule Option rule.
   */
  constructor(rule: Rule) {
    super();
    this.rule = rule;
  }

  /**
   * Consumes this rule without moving ahead the context offset.
   * @param context Context entity.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public peek(context: Context): boolean {
    return this.rule.peek(context);
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
    const tempNode = new Trees.Node('temp', context.offset, node.data);
    if (this.rule.consume(tempContext, tempNode)) {
      context.forward(tempContext.offset - context.offset);
      node.assignNodes(tempNode);
    }
    return true;
  }
}
