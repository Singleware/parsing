import * as Class from '@singleware/class';
import { Rule } from '../../rule';
import { Context } from '../../context';
/**
 * String choice, rule class.
 */
declare class ChoiceRule extends Class.Null implements Rule {
    /**
     * Determines whether the rule should be case insensitive.
     */
    private soft;
    /**
     * Expected strings.
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
     * @param strings List of expected strings.
     */
    constructor(soft: boolean, ...strings: string[]);
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context: Context): boolean;
}
/**
 * String choice, soft rule class.
 */
export declare class SoftChoice extends ChoiceRule {
    /**
     * Default constructor.
     * @param strings List of expected strings.
     */
    constructor(...strings: string[]);
}
/**
 * String choice, hard rule class.
 */
export declare class Choice extends ChoiceRule {
    /**
     * Default constructor.
     * @param strings List of expected strings.
     */
    constructor(...strings: string[]);
}
export {};
