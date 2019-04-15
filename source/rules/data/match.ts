/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Data from '../../data';

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
   * Text style.
   */
  @Class.Private()
  private style: Data.Texts;

  /**
   * Expected rule.
   */
  @Class.Private()
  private rule: Rule;

  /**
   * Gets the value according to the rule text style.
   * @param value Input value.
   * @returns Returns the value according to the rule text style..
   */
  @Class.Private()
  private getValue(value: string): string {
    switch (this.style) {
      case Data.Texts.LOWERCASE:
        return value.toLowerCase();
      case Data.Texts.UPPERCASE:
        return value.toUpperCase();
      default:
        return value;
    }
  }

  /**
   * Default constructor.
   * @param property Expected data property.
   * @param style Match text style.
   * @param rule Expected rule.
   */
  constructor(property: string, style: Data.Texts, rule: Rule) {
    super();
    this.property = property;
    this.style = style;
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
      const consumed = this.getValue(context.content.substring(temp.offset, context.offset));
      if (expected === consumed) {
        context.forward(consumed.length);
        context.tree.assignNodes(temp.tree);
        return true;
      }
    }
    return false;
  }
}
