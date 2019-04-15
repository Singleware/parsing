/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import { Rule } from '../../rule';
import { Context } from '../../context';

/**
 * Character choice, generic rule class.
 */
@Class.Describe()
class ChoiceRule extends Class.Null implements Rule {
  /**
   * Determines whether the rule should be case insensitive.
   */
  @Class.Private()
  private soft: boolean;

  /**
   * Expected characters.
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
   * @param chars List of expected characters.
   */
  constructor(soft: boolean, ...chars: string[]) {
    super();
    this.soft = soft;
    this.expected = chars.map((char: string) => this.getValue(char[0]));
  }

  /**
   * Consumes this rule moving ahead the context offset.
   * @param context Context entity.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public consume(context: Context): boolean {
    if (this.expected.includes(this.getValue(context.content[context.offset]))) {
      context.forward(1);
      return true;
    }
    return false;
  }
}

/**
 * Character choice, soft rule class.
 */
@Class.Describe()
export class SoftChoice extends ChoiceRule {
  /**
   * Default constructor.
   * @param chars List of expected characters.
   */
  constructor(...chars: string[]) {
    super(true, ...chars);
  }
}

/**
 * Character choice, hard rule class.
 */
@Class.Describe()
export class Choice extends ChoiceRule {
  /**
   * Default constructor.
   * @param chars List of expected characters.
   */
  constructor(...chars: string[]) {
    super(false, ...chars);
  }
}
