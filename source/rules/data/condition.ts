/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Data from '../../data';

import { Rule } from '../../rule';
import { Context } from '../../context';

/**
 * Condition rule, rule class.
 */
@Class.Describe()
export class Condition extends Class.Null implements Rule {
  /**
   * Comparison property.
   */
  @Class.Private()
  private property: string;

  /**
   * Comparison operator.
   */
  @Class.Private()
  private condition: Data.Conditions;

  /**
   * Comparison value.
   */
  @Class.Private()
  private value: string | string[];

  /**
   * Comparison rule.
   */
  @Class.Private()
  private rule: Rule;

  /**
   * Check if the comparison value and the expected value meets the desired conditions.
   * @param value Comparison value.
   * @returns Returns true when the comparison was successful, false otherwise.
   */
  @Class.Private()
  private canGoAhead(value: string): boolean {
    switch (this.condition) {
      case Data.Conditions.LESS_THAN:
        return value < this.value;
      case Data.Conditions.LESS_OR_EQUALS:
        return value <= this.value;
      case Data.Conditions.EQUALS:
        return value === this.value;
      case Data.Conditions.NOT_EQUALS:
        return value !== this.value;
      case Data.Conditions.GREATER_OR_EQUALS:
        return value >= this.value;
      case Data.Conditions.GREATER_THAN:
        return value > this.value;
      case Data.Conditions.INCLUDES:
        if (this.value instanceof Array) {
          return this.value.includes(<string>value);
        }
      default:
        throw new Error(`Invalid conditional operator.`);
    }
  }

  /**
   * Default constructor.
   * @param property Comparison value.
   * @param condition Conditional operator.
   * @param value Expected value.
   * @param rule Success rule.
   */
  constructor(property: string, condition: Data.Conditions, value: string | string[], rule: Rule) {
    super();
    this.property = property;
    this.condition = condition;
    this.value = value;
    this.rule = rule;
  }

  /**
   * Consumes this rule moving ahead the context offset.
   * @param context Context entity.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public consume(context: Context): boolean {
    const value = context.tree.data[this.property];
    if (this.canGoAhead(value)) {
      return this.rule.consume(context);
    }
    return false;
  }
}
