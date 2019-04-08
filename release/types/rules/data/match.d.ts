import * as Class from '@singleware/class';
import * as Trees from '../../trees';
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
     * Consumes this rule without moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    peek(context: Context): boolean;
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @param node Current context node.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context: Context, node: Trees.Node): boolean;
}
