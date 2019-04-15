import * as Flow from '../flow';
import { Range } from './range';
import { Rule } from '../../rule';
/**
 * Character letter, lowercase rule class.
 */
export declare class LowerLetter extends Range implements Rule {
    /**
     * Default constructor.
     */
    constructor();
}
/**
 * Character letter, uppercase rule class.
 */
export declare class UpperLetter extends Range implements Rule {
    /**
     * Default constructor.
     */
    constructor();
}
/**
 * Character letter, default rule class.
 */
export declare class Letter extends Flow.Any implements Rule {
    /**
     * Default constructor.
     */
    constructor();
}
