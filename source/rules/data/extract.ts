/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Data from '../../data';

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
   * Text style.
   */
  @Class.Private()
  private style: Data.Texts;

  /**
   * Sub rule.
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
   * @param property Target property.
   * @param style Extracted text style.
   * @param rule Extraction rule.
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
    const start = context.offset;
    if (this.rule.consume(context)) {
      context.tree.data[this.property] = this.getValue(context.content.substring(start, context.offset));
      return true;
    }
    return false;
  }
}
