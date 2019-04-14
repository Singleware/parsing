import * as Class from '@singleware/class';
import { Rule } from '../../rule';
import { Context } from '../../context';
/**
 * String choice, rule class.
 */
export declare class Choice extends Class.Null implements Rule {
    /**
     * Expected strings.
     */
    private expected;
    /**
     * Default constructor.
     * @param strings List of expected strings.
     */
    constructor(...strings: string[]);
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context: Context): boolean;
}
