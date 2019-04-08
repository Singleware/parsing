import * as Class from '@singleware/class';
import { Error } from './error';
/**
 * Context class.
 */
export declare class Context extends Class.Null {
    /**
     * Content string.
     */
    private contentString;
    /**
     * Content offset.
     */
    private contentOffset;
    /**
     * Content length.
     */
    private contentLength;
    /**
     * Content error.
     */
    private contentError;
    /**
     * Default constructor.
     * @param content Context content.
     * @param offset Initial content offset.
     * @param length Maximum content length.
     */
    constructor(content: string, offset?: number, length?: number);
    /**
     * Gets the context content.
     */
    readonly content: string;
    /**
     * Gets the context offset.
     */
    readonly offset: number;
    /**
     * Gets the context length.
     */
    readonly length: number;
    /**
     * Gets the context error.
     */
    readonly error: Error;
    /**
     * Move forward the current context offset.
     * @param length Incremental length.
     * @returns Returns thw own instance.
     */
    forward(length: number): Context;
    /**
     * Context analysis has been failed.
     * @param code Error code.
     * @returns Returns thw own instance.
     */
    fail(code: number): Context;
    /**
     * Context analysis has been succeed.
     * @returns Returns the own instance.
     */
    success(): Context;
    /**
     * Creates a new copy from this context with an empty stack and no error data.
     * @returns Returns the instance copy.
     */
    copy(): Context;
}
