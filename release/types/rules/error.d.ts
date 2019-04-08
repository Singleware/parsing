import * as Class from '@singleware/class';
import * as Trees from '../trees';
import { Rule } from '../rule';
import { Context } from '../context';
/**
 * Error rule, rule class.
 */
export declare class Error extends Class.Null implements Rule {
    /**
     * Error code.
     */
    private code;
    /**
     * Sub rule.
     */
    private rule;
    /**
     * Default constructor.
     * @param code Error code.
     * @param rule Data rule.
     */
    constructor(code: number, rule: Rule);
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
