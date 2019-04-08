import * as Class from '@singleware/class';
import * as Trees from '../../trees';
import { Rule } from '../../rule';
import { Context } from '../../context';
/**
 * Remark rule, rule class.
 */
export declare class Remark extends Class.Null implements Rule {
    /**
     * Remark property.
     */
    private property;
    /**
     * Remark value.
     */
    private value;
    /**
     * Remark rule.
     */
    private rule;
    /**
     * Default constructor.
     * @param property Remark property.
     * @param value Remark value.
     * @param rule Remark rule.
     */
    constructor(property: string, value: any, rule: Rule);
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
