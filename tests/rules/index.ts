/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
export { All } from './all.spec';
export { Any } from './any.spec';
export { Error } from './error.spec';
export { False } from './false.spec';
export { Fork } from './fork.spec';
export { Not } from './not.spec';
export { Option } from './option.spec';
export { Reference } from './reference.spec';
export { Repeat } from './repeat.spec';
export { Success } from './success.spec';
export { True } from './true.spec';

import * as Char from './char';
export import Char = Char;

import * as Data from './data';
export import Data = Data;

import * as String from './string';
export import String = String;
