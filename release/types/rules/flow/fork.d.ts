import * as Class from '@singleware/class';
import { Rule } from '../../rule';
import { Context } from '../../context';
/**
 * Fork rule, rule class.
 */
export declare class Fork extends Class.Null implements Rule {
    /**
     * Condition rule.
     */
    private condition;
    /**
     * Success rule.
     */
    private success;
    /**
     * Failure rule.
     */
    private failure;
    /**
     * Default constructor.
     * @param condition Condition rule.
     * @param success Success rule.
     * @param failure Failure rule.
     */
    constructor(condition: Rule, success: Rule, failure: Rule);
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context: Context): boolean;
}
