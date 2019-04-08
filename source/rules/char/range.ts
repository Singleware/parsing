/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Trees from '../../trees';

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
   * Consumes this rule without moving ahead the context offset.
   * @param context Context entity.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public peek(context: Context): boolean {
    return context.content[context.offset] >= this.start && context.content[context.offset] <= this.end;
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
