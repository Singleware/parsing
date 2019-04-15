/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import { Rule } from '../../rule';
import { Context } from '../../context';

/**
 * Expected string, rule class.
 */
@Class.Describe()
class ExpectRule extends Class.Null implements Rule {
  /**
   * Determines whether the rule should be case insensitive.
   */
  @Class.Private()
  private soft: boolean;

  /**
   * Expected string.
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
   * @param string Expected string.
   */
  constructor(soft: boolean, string: string) {
    super();
    this.soft = soft;
    this.expected = this.getValue(string);
  }

  /**
   * Consumes this rule moving ahead the context offset.
   * @param context Context entity.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public consume(context: Context): boolean {
    const consumed = this.getValue(context.content.substr(context.offset, this.expected.length));
    if (consumed === this.expected) {
      context.forward(this.expected.length);
      return true;
    }
    return false;
  }
}

/**
 * Expected string, soft rule class.
 */
@Class.Describe()
export class SoftExpect extends ExpectRule {
  /**
   * Default constructor.
   * @param string Expected string.
   */
  constructor(string: string) {
    super(true, string);
  }
}

/**
 * Expected string, hard rule class.
 */
@Class.Describe()
export class Expect extends ExpectRule {
  /**
   * Default constructor.
   * @param string Expected string.
   */
  constructor(string: string) {
    super(false, string);
  }
}
