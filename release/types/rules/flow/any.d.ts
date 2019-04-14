import * as Class from '@singleware/class';
import { Rule } from '../../rule';
import { Context } from '../../context';
/**
 * Require any rule, rule class.
 */
export declare class Any extends Class.Null implements Rule {
    /**
     * Sub rules.
     */
    private rules;
    /**
     * Default constructor.
     * @param rule First rule.
     * @param rules List of rules.
     */
    constructor(rule: Rule, ...rules: Rule[]);
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context: Context): boolean;
}
