/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import { Error } from './error';

/**
 * Context class.
 */
@Class.Describe()
export class Context extends Class.Null {
  /**
   * Content string.
   */
  @Class.Private()
  private contentString: string;

  /**
   * Content offset.
   */
  @Class.Private()
  private contentOffset: number;

  /**
   * Content length.
   */
  @Class.Private()
  private contentLength: number;

  /**
   * Content error.
   */
  @Class.Private()
  private contentError = <Error>{
    code: 0,
    offset: -1
  };

  /**
   * Default constructor.
   * @param content Context content.
   * @param offset Initial content offset.
   * @param length Maximum content length.
   */
  constructor(content: string, offset?: number, length?: number) {
    super();
    this.contentString = content;
    this.contentOffset = offset || 0;
    this.contentLength = length || content.length;
  }

  /**
   * Gets the context content.
   */
  @Class.Public()
  public get content(): string {
    return this.contentString;
  }

  /**
   * Gets the context offset.
   */
  @Class.Public()
  public get offset(): number {
    return this.contentOffset;
  }

  /**
   * Gets the context length.
   */
  @Class.Public()
  public get length(): number {
    return this.contentLength;
  }

  /**
   * Gets the context error.
   */
  @Class.Public()
  public get error(): Error {
    return this.contentError;
  }

  /**
   * Move forward the current context offset.
   * @param length Incremental length.
   * @returns Returns thw own instance.
   */
  @Class.Public()
  public forward(length: number): Context {
    this.contentOffset += length;
    return this;
  }

  /**
   * Context analysis has been failed.
   * @param code Error code.
   * @returns Returns thw own instance.
   */
  @Class.Public()
  public fail(code: number): Context {
    this.contentError.code = code;
    this.contentError.offset = this.contentOffset;
    return this;
  }

  /**
   * Context analysis has been succeed.
   * @returns Returns the own instance.
   */
  @Class.Public()
  public success(): Context {
    this.contentError.code = 0;
    this.contentError.offset = -1;
    return this;
  }

  /**
   * Creates a new copy from this context with an empty stack and no error data.
   * @returns Returns the instance copy.
   */
  @Class.Public()
  public copy(): Context {
    const newer = new Context(this.contentString, this.contentOffset, this.contentLength);
    newer.contentError = this.contentError;
    return newer;
  }
}
