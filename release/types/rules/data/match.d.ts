import * as Class from '@singleware/class';
import * as Data from '../../data';
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
     * Text style.
     */
    private style;
    /**
     * Expected rule.
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
     * @param property Expected data property.
     * @param style Match text style.
     * @param rule Expected rule.
     */
    constructor(property: string, style: Data.Texts, rule: Rule);
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context: Context): boolean;
}
