import * as Class from '@singleware/class';
import { Rule } from '../../rule';
import { Context } from '../../context';
/**
 * Equal data, rule class.
 */
declare class EqualRule extends Class.Null implements Rule {
    /**
     * Determines whether the rule should be case insensitive.
     */
    private soft;
    /**
     * Comparison property.
     */
    private property;
    /**
     * Expected value.
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
     * @param expected Expected value.
     * @param rule Success rule.
     */
    constructor(soft: boolean, property: string, expected: string, rule: Rule);
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context: Context): boolean;
}
/**
 * Equal data, soft rule class.
 */
export declare class SoftEqual extends EqualRule {
    /**
     * Default constructor.
     * @param property Comparison value.
     * @param expected Expected value.
     * @param rule Success rule.
     */
    constructor(property: string, expected: string, rule: Rule);
}
/**
 * Equal data, hard rule class.
 */
export declare class Equal extends EqualRule {
    /**
     * Default constructor.
     * @param property Comparison value.
     * @param expected Expected value.
     * @param rule Success rule.
     */
    constructor(property: string, expected: string, rule: Rule);
}
export {};
