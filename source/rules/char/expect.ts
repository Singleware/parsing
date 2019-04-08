/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Trees from '../../trees';

import { Rule } from '../../rule';
import { Context } from '../../context';

/**
 * Expected character, rule class.
 */
@Class.Describe()
export class Expect extends Class.Null implements Rule {
  /**
   * Expected character.
   */
  @Class.Private()
  private expected: string;

  /**
   * Default constructor.
   * @param char Expected character.
   */
  constructor(char: string) {
    super();
    this.expected = char[0];
  }

  /**
   * Consumes this rule without moving ahead the context offset.
   * @param context Context entity.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public peek(context: Context): boolean {
    return context.content[context.offset] === this.expected;
  }

  /**
   * Consumes this rule moving ahead the context offset.
   * @param context Context entity.
   * @param node Current context node.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public consume(context: Context, node: Trees.Node): boolean {
    if (context.offset < context.length && this.peek(context)) {
      return context.forward(1), true;
    }
    return false;
  }
}
