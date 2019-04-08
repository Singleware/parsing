/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Trees from '../../trees';

import { Rule } from '../../rule';
import { Context } from '../../context';

/**
 * Tree rule, rule class.
 */
@Class.Describe()
export class Tree extends Class.Null implements Rule {
  /**
   * Node type.
   */
  @Class.Private()
  private type: string;

  /**
   * Node direction.
   */
  @Class.Private()
  private direction: Trees.Directions;

  /**
   * Sub rule.
   */
  @Class.Private()
  private rule: Rule;

  /**
   * Attaches the specified source node into the specified target node.
   * @param target Target node.
   * @param source Source node.
   */
  @Class.Private()
  private attachNode(target: Trees.Node, source: Trees.Node): void {
    switch (this.direction) {
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
   * @param type Tree type.
   * @param direction Tree direction.
   * @param rule Tree rule.
   */
  constructor(type: string, direction: Trees.Directions, rule: Rule) {
    super();
    this.type = type;
    this.direction = direction;
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
    const tempNode = new Trees.Node(this.type, context.offset);
    if (this.rule.consume(context, tempNode)) {
      return this.attachNode(node, tempNode), true;
    }
    return false;
  }
}
