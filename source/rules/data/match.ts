/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import { Rule } from '../../rule';
import { Context } from '../../context';

/**
 * Match data, rule class.
 */
@Class.Describe()
class MatchRule extends Class.Null implements Rule {
  /**
   * Determines whether the rule should be case insensitive.
   */
  @Class.Private()
  private soft: boolean;

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
   * @param property Expected data property.
   * @param rule Expected rule.
   */
  constructor(soft: boolean, property: string, rule: Rule) {
    super();
    this.soft = soft;
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
      const expected = this.getValue(context.tree.data[this.property]);
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

/**
 * Match data, soft rule class.
 */
@Class.Describe()
export class SoftMatch extends MatchRule {
  /**
   * Default constructor.
   * @param property Expected data property.
   * @param rule Expected rule.
   */
  constructor(property: string, rule: Rule) {
    super(true, property, rule);
  }
}

/**
 * Match data, hard rule class.
 */
@Class.Describe()
export class Match extends MatchRule {
  /**
   * Default constructor.
   * @param property Expected data property.
   * @param rule Expected rule.
   */
  constructor(property: string, rule: Rule) {
    super(false, property, rule);
  }
}
