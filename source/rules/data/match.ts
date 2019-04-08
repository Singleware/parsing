/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Trees from '../../trees';

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
    const tempOffset = context.copy();
    const tempNode = new Trees.Node('temp', context.offset, node.data);
    if (this.rule.consume(tempOffset, tempNode)) {
      const expected = node.data[this.property];
      const consumed = context.content.substring(tempOffset.offset, context.offset);
      if (expected === consumed) {
        context.forward(consumed.length);
        return node.assignNodes(tempNode), true;
      }
    }
    return false;
  }
}
