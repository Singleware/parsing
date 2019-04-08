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
   * @param rules List of rules.
   */
  constructor(...rules: Rule[]) {
    super();
    if ((this.rules = rules).findIndex(rule => rule instanceof Option) !== -1) {
      throw new Error(`Any rule can't contains Option rules.`);
    }
  }

  /**
   * Consumes this rule without moving ahead the context offset.
   * @param context Context entity.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public peek(context: Context): boolean {
    for (const rule of this.rules) {
      if (rule.peek(context)) {
        return true;
      }
    }
    return false;
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
      const tempContext = context.copy();
      const tempNode = new Trees.Node('temp', context.offset, node.data);
      if (rule.consume(tempContext, tempNode)) {
        context.forward(tempContext.offset - context.offset);
        node.assignNodes(tempNode);
        return true;
      }
    }
    return false;
  }
}
