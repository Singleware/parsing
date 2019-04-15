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
 * Extract data, rule class.
 */
let ExtractRule = class ExtractRule extends Class.Null {
    /**
     * Default constructor.
     * @param style Extracted text style.
     * @param property Target property.
     * @param rule Extraction rule.
     */
    constructor(style, property, rule) {
        super();
        this.style = style;
        this.property = property;
        this.rule = rule;
    }
    /**
     * Gets the value according to the rule text style.
     * @param value Input value.
     * @returns Returns the value according to the rule text style.
     */
    getValue(value) {
        switch (this.style) {
            case Data.Styles.LOWERCASE:
                return value.toLowerCase();
            case Data.Styles.UPPERCASE:
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
        const start = context.offset;
        if (this.rule.consume(context)) {
            context.tree.data[this.property] = this.getValue(context.content.substring(start, context.offset));
            return true;
        }
        return false;
    }
};
__decorate([
    Class.Private()
], ExtractRule.prototype, "style", void 0);
__decorate([
    Class.Private()
], ExtractRule.prototype, "property", void 0);
__decorate([
    Class.Private()
], ExtractRule.prototype, "rule", void 0);
__decorate([
    Class.Private()
], ExtractRule.prototype, "getValue", null);
__decorate([
    Class.Public()
], ExtractRule.prototype, "consume", null);
ExtractRule = __decorate([
    Class.Describe()
], ExtractRule);
/**
 * Extract data, lowercase rule class.
 */
let LowerExtract = class LowerExtract extends ExtractRule {
    /**
     * Default constructor.
     * @param property Target property.
     * @param rule Extraction rule.
     */
    constructor(property, rule) {
        super(Data.Styles.LOWERCASE, property, rule);
    }
};
LowerExtract = __decorate([
    Class.Describe()
], LowerExtract);
exports.LowerExtract = LowerExtract;
/**
 * Extract data, uppercase rule class.
 */
let UpperExtract = class UpperExtract extends ExtractRule {
    /**
     * Default constructor.
     * @param property Target property.
     * @param rule Extraction rule.
     */
    constructor(property, rule) {
        super(Data.Styles.UPPERCASE, property, rule);
    }
};
UpperExtract = __decorate([
    Class.Describe()
], UpperExtract);
exports.UpperExtract = UpperExtract;
/**
 * Extract data, default rule class.
 */
let Extract = class Extract extends ExtractRule {
    /**
     * Default constructor.
     * @param property Target property.
     * @param rule Extraction rule.
     */
    constructor(property, rule) {
        super(Data.Styles.DEFAULT, property, rule);
    }
};
Extract = __decorate([
    Class.Describe()
], Extract);
exports.Extract = Extract;
//# sourceMappingURL=extract.js.map