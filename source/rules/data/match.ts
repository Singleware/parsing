/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import { Rule } from '../../rule';
import { Context } from '../../context';

/**
 * Match rule, rule class.
 */
@Class.Describe()
export class Match extends Class.Null implements Rule {
  /**
   * Expected data property.
   */
  @Class.Private()
  private property: string;

  /**
   * Expected rule.
   */
  @Class.Private()
  private rule: Rule;

  /**
   * Default constructor.
   * @param property Expected data property.
   * @param rule Expected rule.
   */
  constructor(property: string, rule: Rule) {
    super();
    this.property = property;
    this.rule = rule;
  }

  /**
   * Consumes this rule moving ahead the context offset.
   * @param context Context entity.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public consume(context: Context): boolean {
    const temp = context.copy();
    if (this.rule.consume(temp)) {
      const expected = context.tree.data[this.property];
      const consumed = context.content.substring(temp.offset, context.offset);
      if (expected === consumed) {
        context.forward(consumed.length);
        context.tree.assignNodes(temp.tree);
        return true;
      }
    }
    return false;
  }
}
