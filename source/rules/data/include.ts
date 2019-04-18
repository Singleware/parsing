/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import { Rule } from '../../rule';
import { Context } from '../../context';

/**
 * Include data, rule class.
 */
@Class.Describe()
class IncludeRule extends Class.Null implements Rule {
  /**
   * Determines whether the rule should be case insensitive.
   */
  @Class.Private()
  private soft: boolean;

  /**
   * Comparison property.
   */
  @Class.Private()
  private property: string;

  /**
   * Expected values.
   */
  @Class.Private()
  private expected: string[];

  /**
   * Success rule.
   */
  @Class.Private()
  private rule: Rule;

  /**
   * Gets the value according to the rule matching style.
   * @param value Input value.
   * @returns Returns the value according to the rule matching style.
   */
  @Class.Private()
  private getValue(value: string): string {
    return this.soft ? value.toLowerCase() : value;
  }

  /**
   * Default constructor.
   * @param soft Determines whether the rule should be case insensitive.
   * @param property Comparison value.
   * @param expected Expected values.
   * @param rule Success rule.
   */
  constructor(soft: boolean, property: string, expected: string[], rule: Rule) {
    super();
    this.soft = soft;
    this.property = property;
    this.expected = expected.map(value => this.getValue(value));
    this.rule = rule;
  }

  /**
   * Consumes this rule moving ahead the context offset.
   * @param context Context entity.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public consume(context: Context): boolean {
    const stored = this.getValue(context.tree.data[this.property]);
    if (this.expected.includes(stored)) {
      return this.rule.consume(context);
    }
    return false;
  }
}

/**
 * Include data, soft rule class.
 */
@Class.Describe()
export class SoftInclude extends IncludeRule {
  /**
   * Default constructor.
   * @param property Comparison value.
   * @param expected Expected values.
   * @param rule Success rule.
   */
  constructor(property: string, expected: string[], rule: Rule) {
    super(true, property, expected, rule);
  }
}

/**
 * Include data, hard rule class.
 */
@Class.Describe()
export class Include extends IncludeRule {
  /**
   * Default constructor.
   * @param property Comparison value.
   * @param expected Expected values.
   * @param rule Success rule.
   */
  constructor(property: string, expected: string[], rule: Rule) {
    super(false, property, expected, rule);
  }
}
