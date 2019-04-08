import * as Class from '@singleware/class';
import * as Trees from '../../trees';
import { Rule } from '../../rule';
import { Context } from '../../context';
/**
 * Tree rule, rule class.
 */
export declare class Tree extends Class.Null implements Rule {
    /**
     * Node type.
     */
    private type;
    /**
     * Node direction.
     */
    private direction;
    /**
     * Sub rule.
     */
    private rule;
    /**
     * Attaches the specified source node into the specified target node.
     * @param target Target node.
     * @param source Source node.
     */
    private attachNode;
    /**
     * Default constructor.
     * @param type Tree type.
     * @param direction Tree direction.
     * @param rule Tree rule.
     */
    constructor(type: string, direction: Trees.Directions, rule: Rule);
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
