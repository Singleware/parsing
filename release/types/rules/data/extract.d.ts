import * as Class from '@singleware/class';
import * as Data from '../../data';
import { Rule } from '../../rule';
import { Context } from '../../context';
/**
 * Extract data, rule class.
 */
declare class ExtractRule extends Class.Null implements Rule {
    /**
     * Text style.
     */
    private style;
    /**
     * Target property.
     */
    private property;
    /**
     * Sub rule.
     */
    private rule;
    /**
     * Gets the value according to the rule text style.
     * @param value Input value.
     * @returns Returns the value according to the rule text style.
     */
    private getValue;
    /**
     * Default constructor.
     * @param style Extracted text style.
     * @param property Target property.
     * @param rule Extraction rule.
     */
    constructor(style: Data.Styles, property: string, rule: Rule);
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context: Context): boolean;
}
/**
 * Extract data, lowercase rule class.
 */
export declare class LowerExtract extends ExtractRule {
    /**
     * Default constructor.
     * @param property Target property.
     * @param rule Extraction rule.
     */
    constructor(property: string, rule: Rule);
}
/**
 * Extract data, uppercase rule class.
 */
export declare class UpperExtract extends ExtractRule {
    /**
     * Default constructor.
     * @param property Target property.
     * @param rule Extraction rule.
     */
    constructor(property: string, rule: Rule);
}
/**
 * Extract data, default rule class.
 */
export declare class Extract extends ExtractRule {
    /**
     * Default constructor.
     * @param property Target property.
     * @param rule Extraction rule.
     */
    constructor(property: string, rule: Rule);
}
export {};
