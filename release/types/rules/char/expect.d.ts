import * as Class from '@singleware/class';
import * as Trees from '../../trees';
import { Rule } from '../../rule';
import { Context } from '../../context';
/**
 * Expected character, rule class.
 */
export declare class Expect extends Class.Null implements Rule {
    /**
     * Expected character.
     */
    private expected;
    /**
     * Default constructor.
     * @param char Expected character.
     */
    constructor(char: string);
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
