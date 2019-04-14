import * as Class from '@singleware/class';
import { Rule } from '../../rule';
import { Context } from '../../context';
/**
 * Expected string, rule class.
 */
export declare class Expect extends Class.Null implements Rule {
    /**
     * Expected string.
     */
    private expected;
    /**
     * Default constructor.
     * @param string Expected string.
     */
    constructor(string: string);
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context: Context): boolean;
}
