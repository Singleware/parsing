import * as Class from '@singleware/class';
import * as Data from '../../data';
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
     * Text style.
     */
    private style;
    /**
     * Sub rule.
     */
    private rule;
    /**
     * Gets the value according to the rule text style.
     * @param value Input value.
     * @returns Returns the value according to the rule text style..
     */
    private getValue;
    /**
     * Default constructor.
     * @param property Target property.
     * @param style Extracted text style.
     * @param rule Extraction rule.
     */
    constructor(property: string, style: Data.Texts, rule: Rule);
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context: Context): boolean;
}
