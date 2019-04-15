import * as Class from '@singleware/class';
import { Rule } from '../../rule';
import { Context } from '../../context';
/**
 * Expected character, rule class.
 */
declare class ExpectRule extends Class.Null implements Rule {
    /**
     * Determines whether the rule should be case insensitive.
     */
    private soft;
    /**
     * Expected character.
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
     * @param char Expected character.
     */
    constructor(soft: boolean, char: string);
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context: Context): boolean;
}
/**
 * Expected character, soft rule class.
 */
export declare class SoftExpect extends ExpectRule {
    /**
     * Default constructor.
     * @param char Expected character.
     */
    constructor(char: string);
}
/**
 * Expected character, hard rule class.
 */
export declare class Expect extends ExpectRule {
    /**
     * Default constructor.
     * @param char Expected character.
     */
    constructor(char: string);
}
export {};
