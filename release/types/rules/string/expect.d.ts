import * as Class from '@singleware/class';
import { Rule } from '../../rule';
import { Context } from '../../context';
/**
 * Expected string, rule class.
 */
declare class ExpectRule extends Class.Null implements Rule {
    /**
     * Determines whether the rule should be case insensitive.
     */
    private soft;
    /**
     * Expected string.
     */
    private expected;
    /**
     * Gets the value according to the rule matching style.
     * @param value Input value.
     * @returns Returns the value according to the rule matching style.
     */
    private getValue;
    /**
     * Default constructor.
     * @param soft Determines whether the rule should be case insensitive.
     * @param string Expected string.
     */
    constructor(soft: boolean, string: string);
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context: Context): boolean;
}
/**
 * Expected string, soft rule class.
 */
export declare class SoftExpect extends ExpectRule {
    /**
     * Default constructor.
     * @param string Expected string.
     */
    constructor(string: string);
}
/**
 * Expected string, hard rule class.
 */
export declare class Expect extends ExpectRule {
    /**
     * Default constructor.
     * @param string Expected string.
     */
    constructor(string: string);
}
export {};
