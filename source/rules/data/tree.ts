/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Data from '../../data';

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
  private direction: Data.Directions;

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
  private attachNode(target: Data.Node, source: Data.Node): void {
    switch (this.direction) {
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
   * @param type Tree type.
   * @param direction Tree direction.
   * @param rule Tree rule.
   */
  constructor(type: string, direction: Data.Directions, rule: Rule) {
    super();
    this.type = type;
    this.direction = direction;
    this.rule = rule;
  }

  /**
   * Consumes this rule moving ahead the context offset.
   * @param context Context entity.
   * @returns Returns true when the analysis was succeed or false otherwise.
   */
  @Class.Public()
  public consume(context: Context): boolean {
    const tree = new Data.Node(this.type, context.offset);
    const temp = context.copy(tree);
    const result = this.rule.consume(temp);
    context.forward(temp.offset - context.offset);
    if (result) {
      this.attachNode(context.tree, temp.tree);
    }
    return result;
  }
}
