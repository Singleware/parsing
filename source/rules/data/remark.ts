/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Trees from '../../trees';

import { Rule } from '../../rule';
import { Context } from '../../context';

/**
 * Remark rule, rule class.
 */
@Class.Describe()
export class Remark extends Class.Null implements Rule {
  /**
   * Remark property.
   */
  @Class.Private()
  private property: string;

  /**
   * Remark value.
   */
  @Class.Private()
  private value: any;

  /**
   * Remark rule.
   */
  @Class.Private()
  private rule: Rule;

  /**
   * Default constructor.
   * @param property Remark property.
   * @param value Remark value.
   * @param rule Remark rule.
   */
  constructor(property: string, value: any, rule: Rule) {
    super();
    this.property = property;
    this.value = value;
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
    if (this.rule.consume(context, node)) {
      node.data[this.property] = this.value;
      return true;
    }
    return false;
  }
}
