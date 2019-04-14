/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Data from '../../data';
import * as Char from '../char';
import * as Flow from '../flow';

import { Rule } from '../../rule';

/**
 * String letters, rule class.
 */
@Class.Describe()
export class Letters extends Flow.Repeat implements Rule {
  /**
   * Default constructor.
   * @param style Text case style.
   */
  constructor(style: Data.Texts) {
    super(new Char.Letter(style));
  }
}
