import * as Class from '@singleware/class';
import { Rule } from '../../rule';
import { Context } from '../../context';
/**
 * Match data, rule class.
 */
declare class MatchRule extends Class.Null implements Rule {
    /**
     * Determines whether the rule should be case insensitive.
     */
    private soft;
    /**
     * Expected data property.
     */
    private property;
    /**
     * Expected rule.
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
     * @param property Expected data property.
     * @param rule Expected rule.
     */
    constructor(soft: boolean, property: string, rule: Rule);
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context: Context): boolean;
}
/**
 * Match data, soft rule class.
 */
export declare class SoftMatch extends MatchRule {
    /**
     * Default constructor.
     * @param property Expected data property.
     * @param rule Expected rule.
     */
    constructor(property: string, rule: Rule);
}
/**
 * Match data, hard rule class.
 */
export declare class Match extends MatchRule {
    /**
     * Default constructor.
     * @param property Expected data property.
     * @param rule Expected rule.
     */
    constructor(property: string, rule: Rule);
}
export {};
