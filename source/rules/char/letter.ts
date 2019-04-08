/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import { Range } from './range';
import { Rule } from '../../rule';

/**
 * Character letter, rule class.
 */
@Class.Describe()
export class Letter extends Range implements Rule {
  /**
   * Default constructor.
   */
  constructor() {
    super('a', 'z');
  }
}
