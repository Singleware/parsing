import { Repeat } from '../repeat';
import { Rule } from '../../rule';
/**
 * String letters, rule class.
 */
export declare class Letters extends Repeat implements Rule {
    /**
     * Default constructor.
     * @param uppercase Determines whether all letters should be uppercase.
     */
    constructor(uppercase: boolean);
}
