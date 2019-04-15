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
 * Match data, rule class.
 */
let MatchRule = class MatchRule extends Class.Null {
    /**
     * Default constructor.
     * @param soft Determines whether the rule should be case insensitive.
     * @param property Expected data property.
     * @param rule Expected rule.
     */
    constructor(soft, property, rule) {
        super();
        this.soft = soft;
        this.property = property;
        this.rule = rule;
    }
    /**
     * Gets the value according to the rule matching style.
     * @param value Input value.
     * @returns Returns the value according to the rule matching style.
     */
    getValue(value) {
        return this.soft ? value.toLowerCase() : value;
    }
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context) {
        const temp = context.copy();
        if (this.rule.consume(temp)) {
            const expected = this.getValue(context.tree.data[this.property]);
            const consumed = this.getValue(context.content.substring(temp.offset, context.offset));
            if (expected === consumed) {
                context.forward(consumed.length);
                context.tree.assignNodes(temp.tree);
                return true;
            }
        }
        return false;
    }
};
__decorate([
    Class.Private()
], MatchRule.prototype, "soft", void 0);
__decorate([
    Class.Private()
], MatchRule.prototype, "property", void 0);
__decorate([
    Class.Private()
], MatchRule.prototype, "rule", void 0);
__decorate([
    Class.Private()
], MatchRule.prototype, "getValue", null);
__decorate([
    Class.Public()
], MatchRule.prototype, "consume", null);
MatchRule = __decorate([
    Class.Describe()
], MatchRule);
/**
 * Match data, soft rule class.
 */
let SoftMatch = class SoftMatch extends MatchRule {
    /**
     * Default constructor.
     * @param property Expected data property.
     * @param rule Expected rule.
     */
    constructor(property, rule) {
        super(true, property, rule);
    }
};
SoftMatch = __decorate([
    Class.Describe()
], SoftMatch);
exports.SoftMatch = SoftMatch;
/**
 * Match data, hard rule class.
 */
let Match = class Match extends MatchRule {
    /**
     * Default constructor.
     * @param property Expected data property.
     * @param rule Expected rule.
     */
    constructor(property, rule) {
        super(false, property, rule);
    }
};
Match = __decorate([
    Class.Describe()
], Match);
exports.Match = Match;
//# sourceMappingURL=match.js.map