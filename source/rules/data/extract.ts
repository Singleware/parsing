/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Data from '../../data';

import { Rule } from '../../rule';
import { Context } from '../../context';

/**
 * Extract data, rule class.
 */
@Class.Describe()
class ExtractRule extends Class.Null implements Rule {
  /**
   * Text style.
   */
  @Class.Private()
  private style: Data.Styles;

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
   * Gets the value according to the rule text style.
   * @param value Input value.
   * @returns Returns the value according to the rule text style.
   */
  @Class.Private()
  private getValue(value: string): string {
    switch (this.style) {
      case Data.Styles.LOWERCASE:
        return value.toLowerCase();
      case Data.Styles.UPPERCASE:
        return value.toUpperCase();
      default:
        return value;
    }
  }

  /**
   * Default constructor.
   * @param style Extracted text style.
   * @param property Target property.
   * @param rule Extraction rule.
   */
  constructor(style: Data.Styles, property: string, rule: Rule) {
    super();
    this.style = style;
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
      context.tree.data[this.property] = this.getValue(context.content.substring(start, context.offset));
      return true;
    }
    return false;
  }
}

/**
 * Extract data, lowercase rule class.
 */
@Class.Describe()
export class LowerExtract extends ExtractRule {
  /**
   * Default constructor.
   * @param property Target property.
   * @param rule Extraction rule.
   */
  constructor(property: string, rule: Rule) {
    super(Data.Styles.LOWERCASE, property, rule);
  }
}

/**
 * Extract data, uppercase rule class.
 */
@Class.Describe()
export class UpperExtract extends ExtractRule {
  /**
   * Default constructor.
   * @param property Target property.
   * @param rule Extraction rule.
   */
  constructor(property: string, rule: Rule) {
    super(Data.Styles.UPPERCASE, property, rule);
  }
}

/**
 * Extract data, default rule class.
 */
@Class.Describe()
export class Extract extends ExtractRule {
  /**
   * Default constructor.
   * @param property Target property.
   * @param rule Extraction rule.
   */
  constructor(property: string, rule: Rule) {
    super(Data.Styles.DEFAULT, property, rule);
  }
}
