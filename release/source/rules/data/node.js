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
const Data = require("../../data");
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
    attachSourceNode(target, source) {
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
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context) {
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
], Node.prototype, "consume", null);
Node = __decorate([
    Class.Describe()
], Node);
exports.Node = Node;
//# sourceMappingURL=node.js.map