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
class ChoiceRule extends Class.Null implements Rule {
  /**
   * Determines whether the rule should be case insensitive.
   */
  @Class.Private()
  private soft: boolean;

  /**
   * Expected strings.
   */
  @Class.Private()
  private expected: string[];

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
   * @param strings List of expected strings.
   */
  constructor(soft: boolean, ...strings: string[]) {
    super();
    this.soft = soft;
    this.expected = strings.map((string: string) => this.getValue(string));
  }

  /**
   * Consumes this rule moving ahead the context offset.
   * @param context Context entity.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public consume(context: Context): boolean {
    for (const expected of this.expected) {
      const consumed = this.getValue(context.content.substr(context.offset, expected.length));
      if (expected === consumed) {
        context.forward(expected.length);
        return true;
      }
    }
    return false;
  }
}

/**
 * String choice, soft rule class.
 */
@Class.Describe()
export class SoftChoice extends ChoiceRule {
  /**
   * Default constructor.
   * @param strings List of expected strings.
   */
  constructor(...strings: string[]) {
    super(true, ...strings);
  }
}

/**
 * String choice, hard rule class.
 */
@Class.Describe()
export class Choice extends ChoiceRule {
  /**
   * Default constructor.
   * @param strings List of expected strings.
   */
  constructor(...strings: string[]) {
    super(false, ...strings);
  }
}
