import * as Class from '@singleware/class';
import * as Data from '../../data';
import { Rule } from '../../rule';
import { Context } from '../../context';
/**
 * Condition rule, rule class.
 */
export declare class Condition extends Class.Null implements Rule {
    /**
     * Comparison property.
     */
    private property;
    /**
     * Comparison operator.
     */
    private condition;
    /**
     * Comparison value.
     */
    private value;
    /**
     * Comparison rule.
     */
    private rule;
    /**
     * Check if the comparison value and the expected value meets the desired conditions.
     * @param value Comparison value.
     * @returns Returns true when the comparison was successful, false otherwise.
     */
    private canGoAhead;
    /**
     * Default constructor.
     * @param property Comparison value.
     * @param condition Conditional operator.
     * @param value Expected value.
     * @param rule Success rule.
     */
    constructor(property: string, condition: Data.Conditions, value: string | string[], rule: Rule);
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context: Context): boolean;
}
