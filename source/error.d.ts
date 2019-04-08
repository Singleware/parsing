/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import { Rule } from './rule';

/**
 * Error interface.
 */
export interface Error {
  /**
   * Error offset.
   */
  offset: number;
  /**
   * Error code;
   */
  code: number;
}
