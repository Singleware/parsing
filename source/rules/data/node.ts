/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Data from '../../data';

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
  private source: Data.Directions;

  /**
   * Target node direction.
   */
  @Class.Private()
  private target: Data.Directions;

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
  private getSourceNode(tree: Data.Node): Data.Node | undefined {
    switch (this.source) {
      case Data.Directions.LEFT:
        return tree.left;
      case Data.Directions.NEXT:
        return tree.next;
      case Data.Directions.RIGHT:
        return tree.right;
    }
  }

  /**
   * Attaches the specified source node into the specified target node.
   * @param target Target node.
   * @param source Source node.
   */
  @Class.Private()
  private attachSourceNode(target: Data.Node, source: Data.Node): void {
    switch (this.target) {
      case Data.Directions.LEFT:
        target.attachLeft(source);
        break;
      case Data.Directions.NEXT:
        target.attachNext(source);
        break;
      case Data.Directions.RIGHT:
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
  constructor(source: Data.Directions, target: Data.Directions, rule: Rule) {
    super();
    this.source = source;
    this.target = target;
    this.rule = rule;
  }

  /**
   * Consumes this rule moving ahead the context offset.
   * @param context Context entity.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public consume(context: Context): boolean {
    const temp = context.copy();
    const result = this.rule.consume(temp);
    context.forward(temp.offset - context.offset);
    if (result) {
      const source = this.getSourceNode(temp.tree);
      if (source) {
        this.attachSourceNode(context.tree, source);
      }
    }
    return result;
  }
}
