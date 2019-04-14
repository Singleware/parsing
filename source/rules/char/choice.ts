/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import { Rule } from '../../rule';
import { Context } from '../../context';

/**
 * Character choice, rule class.
 */
@Class.Describe()
export class Choice extends Class.Null implements Rule {
  /**
   * Expected characters.
   */
  @Class.Private()
  private expected: string[];

  /**
   * Default constructor.
   * @param chars List of expected characters.
   */
  constructor(...chars: string[]) {
    super();
    this.expected = chars.map((char: string) => char[0]);
  }

  /**
   * Consumes this rule moving ahead the context offset.
   * @param context Context entity.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public consume(context: Context): boolean {
    if (this.expected.includes(context.content[context.offset])) {
      context.forward(1);
      return true;
    }
    return false;
  }
}
