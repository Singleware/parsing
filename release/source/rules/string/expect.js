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
 * Expected string, rule class.
 */
let ExpectRule = class ExpectRule extends Class.Null {
    /**
     * Default constructor.
     * @param soft Determines whether the rule should be case insensitive.
     * @param string Expected string.
     */
    constructor(soft, string) {
        super();
        this.soft = soft;
        this.expected = this.getValue(string);
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
        const consumed = this.getValue(context.content.substr(context.offset, this.expected.length));
        if (consumed === this.expected) {
            context.forward(this.expected.length);
            return true;
        }
        return false;
    }
};
__decorate([
    Class.Private()
], ExpectRule.prototype, "soft", void 0);
__decorate([
    Class.Private()
], ExpectRule.prototype, "expected", void 0);
__decorate([
    Class.Private()
], ExpectRule.prototype, "getValue", null);
__decorate([
    Class.Public()
], ExpectRule.prototype, "consume", null);
ExpectRule = __decorate([
    Class.Describe()
], ExpectRule);
/**
 * Expected string, soft rule class.
 */
let SoftExpect = class SoftExpect extends ExpectRule {
    /**
     * Default constructor.
     * @param string Expected string.
     */
    constructor(string) {
        super(true, string);
    }
};
SoftExpect = __decorate([
    Class.Describe()
], SoftExpect);
exports.SoftExpect = SoftExpect;
/**
 * Expected string, hard rule class.
 */
let Expect = class Expect extends ExpectRule {
    /**
     * Default constructor.
     * @param string Expected string.
     */
    constructor(string) {
        super(false, string);
    }
};
Expect = __decorate([
    Class.Describe()
], Expect);
exports.Expect = Expect;
//# sourceMappingURL=expect.js.map