import * as Class from '@singleware/class';
import { Rule } from '../rule';
import { Context } from '../context';
/**
 * Not rule, rule class.
 */
export declare class Not extends Class.Null implements Rule {
    /**
     * Condition rule.
     */
    private condition;
    /**
     * Sub rule.
     */
    private rule;
    /**
     * Default constructor.
     * @param condition Condition rule.
     * @param
     */
    constructor(condition: Rule, rule: Rule);
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context: Context): boolean;
}
