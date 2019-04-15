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
 * String choice, rule class.
 */
let ChoiceRule = class ChoiceRule extends Class.Null {
    /**
     * Default constructor.
     * @param soft Determines whether the rule should be case insensitive.
     * @param strings List of expected strings.
     */
    constructor(soft, ...strings) {
        super();
        this.soft = soft;
        this.expected = strings.map((string) => this.getValue(string));
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
        for (const expected of this.expected) {
            const consumed = this.getValue(context.content.substr(context.offset, expected.length));
            if (expected === consumed) {
                context.forward(expected.length);
                return true;
            }
        }
        return false;
    }
};
__decorate([
    Class.Private()
], ChoiceRule.prototype, "soft", void 0);
__decorate([
    Class.Private()
], ChoiceRule.prototype, "expected", void 0);
__decorate([
    Class.Private()
], ChoiceRule.prototype, "getValue", null);
__decorate([
    Class.Public()
], ChoiceRule.prototype, "consume", null);
ChoiceRule = __decorate([
    Class.Describe()
], ChoiceRule);
/**
 * String choice, soft rule class.
 */
let SoftChoice = class SoftChoice extends ChoiceRule {
    /**
     * Default constructor.
     * @param strings List of expected strings.
     */
    constructor(...strings) {
        super(true, ...strings);
    }
};
SoftChoice = __decorate([
    Class.Describe()
], SoftChoice);
exports.SoftChoice = SoftChoice;
/**
 * String choice, hard rule class.
 */
let Choice = class Choice extends ChoiceRule {
    /**
     * Default constructor.
     * @param strings List of expected strings.
     */
    constructor(...strings) {
        super(false, ...strings);
    }
};
Choice = __decorate([
    Class.Describe()
], Choice);
exports.Choice = Choice;
//# sourceMappingURL=choice.js.map