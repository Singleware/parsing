import * as Data from '../../data';
import * as Flow from '../flow';
import { Rule } from '../../rule';
/**
 * Character letter, rule class.
 */
export declare class Letter extends Flow.Any implements Rule {
    /**
     * Default constructor.
     * @param style Text case style.
     */
    constructor(style: Data.Texts);
}
