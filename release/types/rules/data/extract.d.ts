import * as Class from '@singleware/class';
import { Rule } from '../../rule';
import { Context } from '../../context';
/**
 * Extract rule, rule class.
 */
export declare class Extract extends Class.Null implements Rule {
    /**
     * Target property.
     */
    private property;
    /**
     * Sub rule.
     */
    private rule;
    /**
     * Default constructor.
     * @param property Target property.
     * @param rule Extraction rule.
     */
    constructor(property: string, rule: Rule);
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context: Context): boolean;
}
