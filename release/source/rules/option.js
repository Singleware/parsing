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
const Trees = require("../trees");
/**
 * Option rule, rule class.
 */
let Option = class Option extends Class.Null {
    /**
     * Default constructor.
     * @param rule Option rule.
     */
    constructor(rule) {
        super();
        this.rule = rule;
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
        const tempContext = context.copy();
        const tempNode = new Trees.Node('temp', context.offset, node.data);
        if (this.rule.consume(tempContext, tempNode)) {
            context.forward(tempContext.offset - context.offset);
            node.assignNodes(tempNode);
        }
        return true;
    }
};
__decorate([
    Class.Private()
], Option.prototype, "rule", void 0);
__decorate([
    Class.Public()
], Option.prototype, "peek", null);
__decorate([
    Class.Public()
], Option.prototype, "consume", null);
Option = __decorate([
    Class.Describe()
], Option);
exports.Option = Option;
//# sourceMappingURL=option.js.map