/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import { Rule } from '../../rule';
import { Context } from '../../context';

/**
 * Extract rule, rule class.
 */
@Class.Describe()
export class Extract extends Class.Null implements Rule {
  /**
   * Target property.
   */
  @Class.Private()
  private property: string;

  /**
   * Sub rule.
   */
  @Class.Private()
  private rule: Rule;

  /**
   * Default constructor.
   * @param property Target property.
   * @param rule Extraction rule.
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
    const start = context.offset;
    if (this.rule.consume(context)) {
      context.tree.data[this.property] = context.content.substring(start, context.offset);
      return true;
    }
    return false;
  }
}
