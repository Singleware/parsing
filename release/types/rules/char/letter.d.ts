import { Range } from './range';
import { Rule } from '../../rule';
/**
 * Character letter, rule class.
 */
export declare class Letter extends Range implements Rule {
    /**
     * Default constructor.
     * @param uppercase Determines whether all letters should be uppercase.
     */
    constructor(uppercase: boolean);
}
