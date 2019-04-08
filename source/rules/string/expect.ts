/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Trees from '../../trees';

import { Rule } from '../../rule';
import { Context } from '../../context';

/**
 * Expected string, rule class.
 */
@Class.Describe()
export class Expect extends Class.Null implements Rule {
  /**
   * Expected string.
   */
  @Class.Private()
  private expected: string;

  /**
   * Default constructor.
   * @param string Expected string.
   */
  constructor(string: string) {
    super();
    this.expected = string;
  }

  /**
   * Consumes this rule without moving ahead the context offset.
   * @param context Context entity.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public peek(context: Context): boolean {
    return context.content.substr(context.offset, this.expected.length) === this.expected;
  }

  /**
   * Consumes this rule moving ahead the context offset.
   * @param context Context entity.
   * @param node Current context node.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public consume(context: Context, node: Trees.Node): boolean {
    if (context.offset + this.expected.length < context.length && this.peek(context)) {
      return context.forward(this.expected.length), true;
    }
    return false;
  }
}
