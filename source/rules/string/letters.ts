/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Char from '../char';
import * as Flow from '../flow';

import { Rule } from '../../rule';

/**
 * String letters, lowercase rule class.
 */
@Class.Describe()
export class LowerLetters extends Flow.Repeat implements Rule {
  /**
   * Default constructor.
   */
  constructor() {
    super(new Char.LowerLetter());
  }
}

/**
 * String letters, uppercase rule class.
 */
@Class.Describe()
export class UpperLetters extends Flow.Repeat implements Rule {
  /**
   * Default constructor.
   */
  constructor() {
    super(new Char.UpperLetter());
  }
}

/**
 * String letters, default rule class.
 */
@Class.Describe()
export class Letters extends Flow.Repeat implements Rule {
  /**
   * Default constructor.
   */
  constructor() {
    super(new Char.Letter());
  }
}
