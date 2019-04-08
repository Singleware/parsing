"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Class = require("@singleware/class");
const Trees = require("../../trees");
/**
 * Tree rule, rule class.
 */
let Tree = class Tree extends Class.Null {
    /**
     * Default constructor.
     * @param type Tree type.
     * @param direction Tree direction.
     * @param rule Tree rule.
     */
    constructor(type, direction, rule) {
        super();
        this.type = type;
        this.direction = direction;
        this.rule = rule;
    }
    /**
     * Attaches the specified source node into the specified target node.
     * @param target Target node.
     * @param source Source node.
     */
    attachNode(target, source) {
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
     * Consumes this rule without moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    peek(context) {
        return this.rule.peek(context);
    }
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @param node Current context node.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context, node) {
        const tempNode = new Trees.Node(this.type, context.offset);
        if (this.rule.consume(context, tempNode)) {
            return this.attachNode(node, tempNode), true;
        }
        return false;
    }
};
__decorate([
    Class.Private()
], Tree.prototype, "type", void 0);
__decorate([
    Class.Private()
], Tree.prototype, "direction", void 0);
__decorate([
    Class.Private()
], Tree.prototype, "rule", void 0);
__decorate([
    Class.Private()
], Tree.prototype, "attachNode", null);
__decorate([
    Class.Public()
], Tree.prototype, "peek", null);
__decorate([
    Class.Public()
], Tree.prototype, "consume", null);
Tree = __decorate([
    Class.Describe()
], Tree);
exports.Tree = Tree;
//# sourceMappingURL=tree.js.map