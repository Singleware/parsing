/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Trees from '../trees';

import { Option } from './option';

import { Rule } from '../rule';
import { Context } from '../context';

/**
 * Repeat rule, rule class.
 */
@Class.Describe()
export class Repeat extends Class.Null implements Rule {
  /**
   * Sub rule.
   */
  @Class.Private()
  private rule: Rule;

  /**
   * Default constructor.
   * @param rule Repeated rule.
   */
  constructor(rule: Rule) {
    super();
    if ((this.rule = rule) instanceof Option) {
      throw new Error(`Repeat rule can't contains Option rule.`);
    }
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
    if (this.rule.consume(context, node)) {
      while (context.offset < context.length) {
        const tempContext = context.copy();
        const tempNode = new Trees.Node('temp', context.offset, node.data);
        if (!this.rule.consume(tempContext, tempNode)) {
          break;
        }
        context.forward(tempContext.offset - context.offset);
        node.assignNodes(tempNode);
      }
      return true;
    }
    return false;
  }
}
