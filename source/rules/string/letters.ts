/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Char from '../char';
import { Repeat } from '../repeat';

import { Rule } from '../../rule';

/**
 * String letters, rule class.
 */
@Class.Describe()
export class Letters extends Repeat implements Rule {
  /**
   * Default constructor.
   * @param uppercase Determines whether all letters should be uppercase.
   */
  constructor(uppercase: boolean) {
    super(new Char.Letter(uppercase));
  }
}
