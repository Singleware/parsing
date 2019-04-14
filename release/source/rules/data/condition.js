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
 * Condition rule, rule class.
 */
let Condition = class Condition extends Class.Null {
    /**
     * Default constructor.
     * @param property Comparison value.
     * @param condition Conditional operator.
     * @param value Expected value.
     * @param rule Success rule.
     */
    constructor(property, condition, value, rule) {
        super();
        this.property = property;
        this.condition = condition;
        this.value = value;
        this.rule = rule;
    }
    /**
     * Check if the comparison value and the expected value meets the desired conditions.
     * @param value Comparison value.
     * @returns Returns true when the comparison was successful, false otherwise.
     */
    canGoAhead(value) {
        switch (this.condition) {
            case Data.Conditions.LESS_THAN:
                return value < this.value;
            case Data.Conditions.LESS_OR_EQUALS:
                return value <= this.value;
            case Data.Conditions.EQUALS:
                return value === this.value;
            case Data.Conditions.NOT_EQUALS:
                return value !== this.value;
            case Data.Conditions.GREATER_OR_EQUALS:
                return value >= this.value;
            case Data.Conditions.GREATER_THAN:
                return value > this.value;
            case Data.Conditions.IN:
                if (this.value instanceof Array) {
                    return this.value.includes(value);
                }
            default:
                throw new Error(`Invalid conditional operator.`);
        }
    }
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context) {
        const value = context.tree.data[this.property];
        if (this.canGoAhead(value)) {
            return this.rule.consume(context);
        }
        return false;
    }
};
__decorate([
    Class.Private()
], Condition.prototype, "property", void 0);
__decorate([
    Class.Private()
], Condition.prototype, "condition", void 0);
__decorate([
    Class.Private()
], Condition.prototype, "value", void 0);
__decorate([
    Class.Private()
], Condition.prototype, "rule", void 0);
__decorate([
    Class.Private()
], Condition.prototype, "canGoAhead", null);
__decorate([
    Class.Public()
], Condition.prototype, "consume", null);
Condition = __decorate([
    Class.Describe()
], Condition);
exports.Condition = Condition;
//# sourceMappingURL=condition.js.map