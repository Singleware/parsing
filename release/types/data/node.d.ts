import * as Class from '@singleware/class';
/**
 * Tree node interface.
 */
export declare class Node extends Class.Null {
    /**
     * Node type.
     */
    private nodeType;
    /**
     * Node offset.
     */
    private nodeOffset;
    /**
     * Node data.
     */
    private nodeData;
    /**
     * Left tree node.
     */
    private leftNode?;
    /**
     * Next tree node.
     */
    private nextNode?;
    /**
     * Right tree node.
     */
    private rightNode?;
    /**
     * Default constructor.
     * @param type Node type.
     * @param offset Optional node offset.
     * @param data Optional node data.
     */
    constructor(type: string, offset?: number, data?: any);
    /**
     * Gets the node type.
     */
    readonly type: string;
    /**
     * Gets the node offset.
     */
    readonly offset: number;
    /**
     * Gets the node data.
     */
    readonly data: any;
    /**
     * Gets the left node.
     */
    readonly left: Node | undefined;
    /**
     * Gets the next node.
     */
    readonly next: Node | undefined;
    /**
     * Gets the right node.
     */
    readonly right: Node | undefined;
    /**
     * Attaches the specified node in the left node of this tree.
     * @param node Node to be attached.
     * @returns Returns the own instance.
     */
    attachLeft(node: Node): Node;
    /**
     * Attaches the specified node in the next node of this tree.
     * @param node Node to be attached.
     * @returns Returns the own instance.
     */
    attachNext(node: Node): Node;
    /**
     * Attaches the specified node in the right node of this tree.
     * @param node Node to be attached.
     * @returns Returns the own instance.
     */
    attachRight(node: Node): Node;
    /**
     * Assign all children nodes from the specified node in this node.
     * @param node Node to be assigned.
     * @returns Returns the own instance.
     */
    assignNodes(node: Node): Node;
}
