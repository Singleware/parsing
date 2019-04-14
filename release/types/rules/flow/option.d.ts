import * as Class from '@singleware/class';
import { Rule } from '../../rule';
import { Context } from '../../context';
/**
 * Option rule, rule class.
 */
export declare class Option extends Class.Null implements Rule {
    /**
     * Sub rule.
     */
    private rule;
    /**
     * Default constructor.
     * @param rule Option rule.
     */
    constructor(rule: Rule);
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context: Context): boolean;
}
