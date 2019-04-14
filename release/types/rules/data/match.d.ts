import * as Class from '@singleware/class';
import { Rule } from '../../rule';
import { Context } from '../../context';
/**
 * Match rule, rule class.
 */
export declare class Match extends Class.Null implements Rule {
    /**
     * Expected data property.
     */
    private property;
    /**
     * Expected rule.
     */
    private rule;
    /**
     * Default constructor.
     * @param property Expected data property.
     * @param rule Expected rule.
     */
    constructor(property: string, rule: Rule);
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context: Context): boolean;
}
