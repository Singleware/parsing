import * as Class from '@singleware/class';
import { Rule } from '../../rule';
import { Context } from '../../context';
/**
 * Repeat rule, rule class.
 */
export declare class Repeat extends Class.Null implements Rule {
    /**
     * Sub rule.
     */
    private rule;
    /**
     * Default constructor.
     * @param rule Repeated rule.
     */
    constructor(rule: Rule);
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context: Context): boolean;
}
