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
class ExpectRule extends Class.Null implements Rule {
  /**
   * Determines whether the rule should be case insensitive.
   */
  @Class.Private()
  private soft: boolean;

  /**
   * Expected character.
   */
  @Class.Private()
  private expected: string;

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
   * @param char Expected character.
   */
  constructor(soft: boolean, char: string) {
    super();
    this.soft = soft;
    this.expected = this.getValue(char[0]);
  }

  /**
   * Consumes this rule moving ahead the context offset.
   * @param context Context entity.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public consume(context: Context): boolean {
    if (this.getValue(context.content[context.offset]) === this.expected) {
      context.forward(1);
      return true;
    }
    return false;
  }
}

/**
 * Expected character, soft rule class.
 */
@Class.Describe()
export class SoftExpect extends ExpectRule {
  /**
   * Default constructor.
   * @param char Expected character.
   */
  constructor(char: string) {
    super(true, char);
  }
}

/**
 * Expected character, hard rule class.
 */
@Class.Describe()
export class Expect extends ExpectRule {
  /**
   * Default constructor.
   * @param char Expected character.
   */
  constructor(char: string) {
    super(false, char);
  }
}
