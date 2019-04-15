import * as Class from '@singleware/class';
import { Rule } from '../../rule';
import { Context } from '../../context';
/**
 * Character choice, generic rule class.
 */
declare class ChoiceRule extends Class.Null implements Rule {
    /**
     * Determines whether the rule should be case insensitive.
     */
    private soft;
    /**
     * Expected characters.
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
     * @param chars List of expected characters.
     */
    constructor(soft: boolean, ...chars: string[]);
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context: Context): boolean;
}
/**
 * Character choice, soft rule class.
 */
export declare class SoftChoice extends ChoiceRule {
    /**
     * Default constructor.
     * @param chars List of expected characters.
     */
    constructor(...chars: string[]);
}
/**
 * Character choice, hard rule class.
 */
export declare class Choice extends ChoiceRule {
    /**
     * Default constructor.
     * @param chars List of expected characters.
     */
    constructor(...chars: string[]);
}
export {};
