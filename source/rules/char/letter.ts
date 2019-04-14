/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Data from '../../data';
import * as Flow from '../flow';

import { Range } from './range';
import { Rule } from '../../rule';

/**
 * Character letter, rule class.
 */
@Class.Describe()
export class Letter extends Flow.Any implements Rule {
  /**
   * Default constructor.
   * @param style Text case style.
   * @throws Throws an error when the specified text case style is not valid.
   */
  constructor(style: Data.Texts) {
    switch (style) {
      case Data.Texts.BOTH:
        super(new Range('a', 'z'), new Range('A', 'Z'));
        break;
      case Data.Texts.LOWER:
        super(new Range('a', 'z'));
        break;
      case Data.Texts.UPPER:
        super(new Range('A', 'Z'));
        break;
      default:
        throw new TypeError(`Invalid text case style.`);
    }
  }
}
