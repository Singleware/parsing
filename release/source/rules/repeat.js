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
 * Repeat rule, rule class.
 */
let Repeat = class Repeat extends Class.Null {
    /**
     * Default constructor.
     * @param rule Repeated rule.
     */
    constructor(rule) {
        super();
        if ((this.rule = rule) instanceof option_1.Option) {
            throw new Error(`Repeat rule can't contains Option rule.`);
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
        if (this.rule.consume(context, node)) {
            while (context.offset < context.length) {
                const tempContext = context.copy();
                const tempNode = new Trees.Node('temp', context.offset, node.data);
                if (!this.rule.consume(tempContext, tempNode)) {
                    break;
                }
                context.forward(tempContext.offset - context.offset);
                node.assignNodes(tempNode);
            }
            return true;
        }
        return false;
    }
};
__decorate([
    Class.Private()
], Repeat.prototype, "rule", void 0);
__decorate([
    Class.Public()
], Repeat.prototype, "peek", null);
__decorate([
    Class.Public()
], Repeat.prototype, "consume", null);
Repeat = __decorate([
    Class.Describe()
], Repeat);
exports.Repeat = Repeat;
//# sourceMappingURL=repeat.js.map