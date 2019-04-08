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
 * Node rule, rule class.
 */
let Node = class Node extends Class.Null {
    /**
     * Default constructor.
     * @param source Source node direction.
     * @param target Target node direction.
     * @param rule Node rule.
     */
    constructor(source, target, rule) {
        super();
        this.source = source;
        this.target = target;
        this.rule = rule;
    }
    /**
     * Gets the source node form the specified tree node.
     * @param tree Tree node.
     * @returns Returns the source node.
     */
    getSourceNode(tree) {
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
    attachSourceNode(target, source) {
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
};
__decorate([
    Class.Private()
], Node.prototype, "source", void 0);
__decorate([
    Class.Private()
], Node.prototype, "target", void 0);
__decorate([
    Class.Private()
], Node.prototype, "rule", void 0);
__decorate([
    Class.Private()
], Node.prototype, "getSourceNode", null);
__decorate([
    Class.Private()
], Node.prototype, "attachSourceNode", null);
__decorate([
    Class.Public()
], Node.prototype, "peek", null);
__decorate([
    Class.Public()
], Node.prototype, "consume", null);
Node = __decorate([
    Class.Describe()
], Node);
exports.Node = Node;
//# sourceMappingURL=node.js.map