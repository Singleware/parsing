/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

/**
 * Tree node interface.
 */
@Class.Describe()
export class Node extends Class.Null {
  /**
   * Node type.
   */
  @Class.Private()
  private nodeType: string;

  /**
   * Node offset.
   */
  @Class.Private()
  private nodeOffset: number;

  /**
   * Node data.
   */
  @Class.Private()
  private nodeData = <any>{};

  /**
   * Left tree node.
   */
  @Class.Private()
  private leftNode?: Node;

  /**
   * Next tree node.
   */
  @Class.Private()
  private nextNode?: Node;

  /**
   * Right tree node.
   */
  @Class.Private()
  private rightNode?: Node;

  /**
   * Default constructor.
   * @param type Node type.
   * @param offset Optional node offset.
   * @param data Optional node data.
   */
  constructor(type: string, offset?: number, data?: any) {
    super();
    this.nodeType = type;
    this.nodeOffset = offset || -1;
    this.nodeData = data || {};
  }

  /**
   * Gets the node type.
   */
  @Class.Public()
  public get type(): string {
    return this.nodeType;
  }

  /**
   * Gets the node offset.
   */
  @Class.Public()
  public get offset(): number {
    return this.nodeOffset;
  }

  /**
   * Gets the node data.
   */
  @Class.Public()
  public get data(): any {
    return this.nodeData;
  }

  /**
   * Gets the left node.
   */
  @Class.Public()
  public get left(): Node | undefined {
    return this.leftNode;
  }

  /**
   * Gets the next node.
   */
  @Class.Public()
  public get next(): Node | undefined {
    return this.nextNode;
  }

  /**
   * Gets the right node.
   */
  @Class.Public()
  public get right(): Node | undefined {
    return this.rightNode;
  }

  /**
   * Attaches the specified node in the left node of this tree.
   * @param node Node to be attached.
   * @returns Returns the own instance.
   */
  @Class.Public()
  public attachLeft(node: Node): Node {
    let last = <Node>this;
    while (last.leftNode !== void 0) {
      last = last.leftNode;
    }
    last.leftNode = node;
    return this;
  }

  /**
   * Attaches the specified node in the next node of this tree.
   * @param node Node to be attached.
   * @returns Returns the own instance.
   */
  @Class.Public()
  public attachNext(node: Node): Node {
    let last = <Node>this;
    while (last.nextNode !== void 0) {
      last = last.nextNode;
    }
    last.nextNode = node;
    return this;
  }

  /**
   * Attaches the specified node in the right node of this tree.
   * @param node Node to be attached.
   * @returns Returns the own instance.
   */
  @Class.Public()
  public attachRight(node: Node): Node {
    let last = <Node>this;
    while (last.rightNode !== void 0) {
      last = last.rightNode;
    }
    last.rightNode = node;
    return this;
  }

  /**
   * Assign all children nodes from the specified node in this node.
   * @param node Node to be assigned.
   * @returns Returns the own instance.
   */
  @Class.Public()
  public assignNodes(node: Node): Node {
    if (Class.resolve(this) !== Class.resolve(node)) {
      if (node.leftNode !== void 0) {
        this.attachLeft(node.leftNode);
      }
      if (node.nextNode !== void 0) {
        this.attachNext(node.nextNode);
      }
      if (node.rightNode !== void 0) {
        this.attachRight(node.rightNode);
      }
      this.nodeData = {
        ...node.nodeData,
        ...this.nodeData
      };
    }
    return this;
  }
}
