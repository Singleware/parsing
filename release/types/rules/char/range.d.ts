import * as Class from '@singleware/class';
import * as Trees from '../../trees';
import { Rule } from '../../rule';
import { Context } from '../../context';
/**
 * Character range, rule class.
 */
export declare class Range extends Class.Null implements Rule {
    /**
     * Start character.
     */
    private start;
    /**
     * End character.
     */
    private end;
    /**
     * Default constructor.
     * @param start Start character.
     * @param end End character.
     */
    constructor(start: string, end: string);
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
