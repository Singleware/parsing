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
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context) {
        const temp = context.copy();
        if (this.rule.consume(temp)) {
            context.forward(temp.offset - context.offset);
            context.tree.assignNodes(temp.tree);
        }
        return true;
    }
};
__decorate([
    Class.Private()
], Option.prototype, "rule", void 0);
__decorate([
    Class.Public()
], Option.prototype, "consume", null);
Option = __decorate([
    Class.Describe()
], Option);
exports.Option = Option;
//# sourceMappingURL=option.js.map