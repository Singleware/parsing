/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Flow from '../flow';

import { Range } from './range';
import { Rule } from '../../rule';

/**
 * Character letter, lowercase rule class.
 */
@Class.Describe()
export class LowerLetter extends Range implements Rule {
  /**
   * Default constructor.
   */
  constructor() {
    super('a', 'z');
  }
}

/**
 * Character letter, uppercase rule class.
 */
@Class.Describe()
export class UpperLetter extends Range implements Rule {
  /**
   * Default constructor.
   */
  constructor() {
    super('A', 'Z');
  }
}

/**
 * Character letter, default rule class.
 */
@Class.Describe()
export class Letter extends Flow.Any implements Rule {
  /**
   * Default constructor.
   */
  constructor() {
    super(new Range('a', 'z'), new Range('A', 'Z'));
  }
}
