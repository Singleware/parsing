import * as Data from '../../data';
import * as Flow from '../flow';
import { Rule } from '../../rule';
/**
 * String letters, rule class.
 */
export declare class Letters extends Flow.Repeat implements Rule {
    /**
     * Default constructor.
     * @param style Text case style.
     */
    constructor(style: Data.Texts);
}
