import * as Class from '@singleware/class';
import { Rule } from '../../rule';
import { Context } from '../../context';
/**
 * Include data, rule class.
 */
declare class IncludeRule extends Class.Null implements Rule {
    /**
     * Determines whether the rule should be case insensitive.
     */
    private soft;
    /**
     * Comparison property.
     */
    private property;
    /**
     * Expected values.
     */
    private expected;
    /**
     * Success rule.
     */
    private rule;
    /**
     * Gets the value according to the rule matching style.
     * @param value Input value.
     * @returns Returns the value according to the rule matching style.
     */
    private getValue;
    /**
     * Default constructor.
     * @param soft Determines whether the rule should be case insensitive.
     * @param property Comparison value.
     * @param expected Expected values.
     * @param rule Success rule.
     */
    constructor(soft: boolean, property: string, expected: string[], rule: Rule);
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context: Context): boolean;
}
/**
 * Include data, soft rule class.
 */
export declare class SoftInclude extends IncludeRule {
    /**
     * Default constructor.
     * @param property Comparison value.
     * @param expected Expected values.
     * @param rule Success rule.
     */
    constructor(property: string, expected: string[], rule: Rule);
}
/**
 * Include data, hard rule class.
 */
export declare class Include extends IncludeRule {
    /**
     * Default constructor.
     * @param property Comparison value.
     * @param expected Expected values.
     * @param rule Success rule.
     */
    constructor(property: string, expected: string[], rule: Rule);
}
export {};
