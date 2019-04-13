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
const option_1 = require("./option");
/**
 * Require any rule, rule class.
 */
let Any = class Any extends Class.Null {
    /**
     * Default constructor.
     * @param rule First rule.
     * @param rules List of rules.
     */
    constructor(rule, ...rules) {
        super();
        if ((this.rules = [rule, ...rules]).findIndex(rule => rule instanceof option_1.Option) !== -1) {
            throw new Error(`Any rule can't contains Option rules.`);
        }
    }
    /**
     * Consumes this rule without moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    peek(context) {
        for (const rule of this.rules) {
            if (rule.peek(context)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @param node Current context node.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context, node) {
        for (const rule of this.rules) {
            const tempContext = context.copy();
            const tempNode = new Trees.Node('temp', context.offset, node.data);
            if (rule.consume(tempContext, tempNode)) {
                context.forward(tempContext.offset - context.offset);
                node.assignNodes(tempNode);
                return true;
            }
        }
        return false;
    }
};
__decorate([
    Class.Private()
], Any.prototype, "rules", void 0);
__decorate([
    Class.Public()
], Any.prototype, "peek", null);
__decorate([
    Class.Public()
], Any.prototype, "consume", null);
Any = __decorate([
    Class.Describe()
], Any);
exports.Any = Any;
//# sourceMappingURL=any.js.map