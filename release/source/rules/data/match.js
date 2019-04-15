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
 * Match rule, rule class.
 */
let Match = class Match extends Class.Null {
    /**
     * Default constructor.
     * @param property Expected data property.
     * @param style Match text style.
     * @param rule Expected rule.
     */
    constructor(property, style, rule) {
        super();
        this.property = property;
        this.style = style;
        this.rule = rule;
    }
    /**
     * Gets the value according to the rule text style.
     * @param value Input value.
     * @returns Returns the value according to the rule text style..
     */
    getValue(value) {
        switch (this.style) {
            case Data.Texts.LOWERCASE:
                return value.toLowerCase();
            case Data.Texts.UPPERCASE:
                return value.toUpperCase();
            default:
                return value;
        }
    }
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context) {
        const temp = context.copy();
        if (this.rule.consume(temp)) {
            const expected = context.tree.data[this.property];
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
], Match.prototype, "property", void 0);
__decorate([
    Class.Private()
], Match.prototype, "style", void 0);
__decorate([
    Class.Private()
], Match.prototype, "rule", void 0);
__decorate([
    Class.Private()
], Match.prototype, "getValue", null);
__decorate([
    Class.Public()
], Match.prototype, "consume", null);
Match = __decorate([
    Class.Describe()
], Match);
exports.Match = Match;
//# sourceMappingURL=match.js.map