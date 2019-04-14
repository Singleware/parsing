import * as Class from '@singleware/class';
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
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context: Context): boolean;
}
