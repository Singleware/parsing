/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import { Rule } from '../../rule';
import { Context } from '../../context';

/**
 * String choice, rule class.
 */
@Class.Describe()
export class Choice extends Class.Null implements Rule {
  /**
   * Expected strings.
   */
  @Class.Private()
  private expected: string[];

  /**
   * Default constructor.
   * @param strings List of expected strings.
   */
  constructor(...strings: string[]) {
    super();
    this.expected = strings;
  }

  /**
   * Consumes this rule moving ahead the context offset.
   * @param context Context entity.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public consume(context: Context): boolean {
    for (const expected of this.expected) {
      const consumed = context.content.substr(context.offset, expected.length);
      if (expected === consumed) {
        context.forward(expected.length);
        return true;
      }
    }
    return false;
  }
}
