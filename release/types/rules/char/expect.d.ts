import * as Class from '@singleware/class';
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
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context: Context): boolean;
}
