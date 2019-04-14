/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import { Rule } from '../rule';
import { Map } from './map';

/**
 * Error interface.
 */
export interface Error {
  /**
   * Error code;
   */
  code: number;
  /**
   * Error offset.
   */
  offset: number;
  /**
   * Error data map.
   */
  data?: Map;
}
