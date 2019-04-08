/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Trees from '../../trees';

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
    const tempOffset = context.offset;
    if (this.rule.consume(context, node)) {
      node.data[this.property] = context.content.substring(tempOffset, context.offset);
      return true;
    }
    return false;
  }
}
