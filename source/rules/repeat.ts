/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import { Rule } from '../rule';
import { Context } from '../context';

import { Option } from './option';

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
   * Consumes this rule moving ahead the context offset.
   * @param context Context entity.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public consume(context: Context): boolean {
    if (this.rule.consume(context)) {
      while (context.offset < context.length) {
        const temp = context.copy();
        if (!this.rule.consume(temp)) {
          break;
        }
        context.forward(temp.offset - context.offset);
        context.tree.assignNodes(temp.tree);
      }
      return true;
    }
    return false;
  }
}
