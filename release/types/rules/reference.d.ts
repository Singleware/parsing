import * as Class from '@singleware/class';
import { Rule } from '../rule';
import { Context } from '../context';
/**
 * Reference rule, rule class.
 */
export declare class Reference extends Class.Null implements Rule {
    /**
     * Pointer to the sub rule.
     */
    private rule;
    /**
     * Default constructor.
     * @param rule Referenced rule.
     */
    constructor(rule: () => Rule);
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context: Context): boolean;
}
