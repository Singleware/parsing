/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Trees from '../../trees';

import { Rule } from '../../rule';
import { Context } from '../../context';

/**
 * Node rule, rule class.
 */
@Class.Describe()
export class Node extends Class.Null implements Rule {
  /**
   * Source node direction.
   */
  @Class.Private()
  private source: Trees.Directions;

  /**
   * Target node direction.
   */
  @Class.Private()
  private target: Trees.Directions;

  /**
   * Sub rule.
   */
  @Class.Private()
  private rule: Rule;

  /**
   * Gets the source node form the specified tree node.
   * @param tree Tree node.
   * @returns Returns the source node.
   */
  @Class.Private()
  private getSourceNode(tree: Trees.Node): Trees.Node | undefined {
    switch (this.source) {
      case Trees.Directions.LEFT:
        return tree.left;
      case Trees.Directions.NEXT:
        return tree.next;
      case Trees.Directions.RIGHT:
        return tree.right;
    }
  }

  /**
   * Attaches the specified source node into the specified target node.
   * @param target Target node.
   * @param source Source node.
   */
  @Class.Private()
  private attachSourceNode(target: Trees.Node, source: Trees.Node): void {
    switch (this.target) {
      case Trees.Directions.LEFT:
        target.attachLeft(source);
        break;
      case Trees.Directions.NEXT:
        target.attachNext(source);
        break;
      case Trees.Directions.RIGHT:
        target.attachRight(source);
        break;
    }
  }

  /**
   * Default constructor.
   * @param source Source node direction.
   * @param target Target node direction.
   * @param rule Node rule.
   */
  constructor(source: Trees.Directions, target: Trees.Directions, rule: Rule) {
    super();
    this.source = source;
    this.target = target;
    this.rule = rule;
  }

  /**
   * Consumes this rule without moving ahead the context offset.
   * @param context Context entity.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public peek(context: Context): boolean {
    return this.rule.peek(context);
  }

  /**
   * Consumes this rule moving ahead the context offset.
   * @param context Context entity.
   * @param node Current context node.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public consume(context: Context, node: Trees.Node): boolean {
    const tempNode = new Trees.Node('temp', context.offset, node.data);
    if (this.rule.consume(context, tempNode)) {
      const source = this.getSourceNode(tempNode);
      if (source) {
        this.attachSourceNode(node, source);
      }
      return true;
    }
    return false;
  }
}
