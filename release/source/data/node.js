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
/**
 * Tree node interface.
 */
let Node = class Node extends Class.Null {
    /**
     * Default constructor.
     * @param type Node type.
     * @param offset Optional node offset.
     * @param data Optional node data.
     */
    constructor(type, offset, data) {
        super();
        /**
         * Node data.
         */
        this.nodeData = {};
        this.nodeType = type;
        this.nodeOffset = offset || -1;
        this.nodeData = data || {};
    }
    /**
     * Gets the node type.
     */
    get type() {
        return this.nodeType;
    }
    /**
     * Gets the node offset.
     */
    get offset() {
        return this.nodeOffset;
    }
    /**
     * Gets the node data.
     */
    get data() {
        return this.nodeData;
    }
    /**
     * Gets the left node.
     */
    get left() {
        return this.leftNode;
    }
    /**
     * Gets the next node.
     */
    get next() {
        return this.nextNode;
    }
    /**
     * Gets the right node.
     */
    get right() {
        return this.rightNode;
    }
    /**
     * Attaches the specified node in the left node of this tree.
     * @param node Node to be attached.
     * @returns Returns the own instance.
     */
    attachLeft(node) {
        let last = this;
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
    attachNext(node) {
        let last = this;
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
    attachRight(node) {
        let last = this;
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
    assignNodes(node) {
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
};
__decorate([
    Class.Private()
], Node.prototype, "nodeType", void 0);
__decorate([
    Class.Private()
], Node.prototype, "nodeOffset", void 0);
__decorate([
    Class.Private()
], Node.prototype, "nodeData", void 0);
__decorate([
    Class.Private()
], Node.prototype, "leftNode", void 0);
__decorate([
    Class.Private()
], Node.prototype, "nextNode", void 0);
__decorate([
    Class.Private()
], Node.prototype, "rightNode", void 0);
__decorate([
    Class.Public()
], Node.prototype, "type", null);
__decorate([
    Class.Public()
], Node.prototype, "offset", null);
__decorate([
    Class.Public()
], Node.prototype, "data", null);
__decorate([
    Class.Public()
], Node.prototype, "left", null);
__decorate([
    Class.Public()
], Node.prototype, "next", null);
__decorate([
    Class.Public()
], Node.prototype, "right", null);
__decorate([
    Class.Public()
], Node.prototype, "attachLeft", null);
__decorate([
    Class.Public()
], Node.prototype, "attachNext", null);
__decorate([
    Class.Public()
], Node.prototype, "attachRight", null);
__decorate([
    Class.Public()
], Node.prototype, "assignNodes", null);
Node = __decorate([
    Class.Describe()
], Node);
exports.Node = Node;
//# sourceMappingURL=node.js.map