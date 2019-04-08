/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Char from '../char';
import { Repeat } from '../repeat';

import { Rule } from '../../rule';

/**
 * String digits, rule class.
 */
@Class.Describe()
export class Digits extends Repeat implements Rule {
  /**
   * Default constructor.
   */
  constructor() {
    super(new Char.Digit());
  }
}
