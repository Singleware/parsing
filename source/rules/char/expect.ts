/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

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
   * Consumes this rule moving ahead the context offset.
   * @param context Context entity.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public consume(context: Context): boolean {
    if (context.content[context.offset] === this.expected) {
      context.forward(1);
      return true;
    }
    return false;
  }
}
