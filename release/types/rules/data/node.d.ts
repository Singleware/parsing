import * as Class from '@singleware/class';
import * as Data from '../../data';
import { Rule } from '../../rule';
import { Context } from '../../context';
/**
 * Node rule, rule class.
 */
export declare class Node extends Class.Null implements Rule {
    /**
     * Source node direction.
     */
    private source;
    /**
     * Target node direction.
     */
    private target;
    /**
     * Sub rule.
     */
    private rule;
    /**
     * Gets the source node form the specified tree node.
     * @param tree Tree node.
     * @returns Returns the source node.
     */
    private getSourceNode;
    /**
     * Attaches the specified source node into the specified target node.
     * @param target Target node.
     * @param source Source node.
     */
    private attachSourceNode;
    /**
     * Default constructor.
     * @param source Source node direction.
     * @param target Target node direction.
     * @param rule Node rule.
     */
    constructor(source: Data.Directions, target: Data.Directions, rule: Rule);
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context: Context): boolean;
}
