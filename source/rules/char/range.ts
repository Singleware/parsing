/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import { Rule } from '../../rule';
import { Context } from '../../context';

/**
 * Character range, rule class.
 */
@Class.Describe()
export class Range extends Class.Null implements Rule {
  /**
   * Start character.
   */
  @Class.Private()
  private start: string;

  /**
   * End character.
   */
  @Class.Private()
  private end: string;

  /**
   * Default constructor.
   * @param start Start character.
   * @param end End character.
   */
  constructor(start: string, end: string) {
    super();
    this.start = start[0];
    this.end = end[0];
  }

  /**
   * Consumes this rule moving ahead the context offset.
   * @param context Context entity.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public consume(context: Context): boolean {
    if (context.content[context.offset] >= this.start && context.content[context.offset] <= this.end) {
      context.forward(1);
      return true;
    }
    return false;
  }
}
