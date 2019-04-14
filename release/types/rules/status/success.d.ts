import * as Class from '@singleware/class';
import { Rule } from '../../rule';
import { Context } from '../../context';
/**
 * Success rule, rule class.
 */
export declare class Success extends Class.Null implements Rule {
    /**
     * Sub rule.
     */
    private rule;
    /**
     * Default constructor.
     * @param rule Data rule.
     */
    constructor(rule: Rule);
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context: Context): boolean;
}
