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
 * Extract rule, rule class.
 */
let Extract = class Extract extends Class.Null {
    /**
     * Default constructor.
     * @param property Target property.
     * @param rule Extraction rule.
     */
    constructor(property, rule) {
        super();
        this.property = property;
        this.rule = rule;
    }
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context) {
        const start = context.offset;
        if (this.rule.consume(context)) {
            context.tree.data[this.property] = context.content.substring(start, context.offset);
            return true;
        }
        return false;
    }
};
__decorate([
    Class.Private()
], Extract.prototype, "property", void 0);
__decorate([
    Class.Private()
], Extract.prototype, "rule", void 0);
__decorate([
    Class.Public()
], Extract.prototype, "consume", null);
Extract = __decorate([
    Class.Describe()
], Extract);
exports.Extract = Extract;
//# sourceMappingURL=extract.js.map