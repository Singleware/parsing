"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (C) 2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Class = require("@singleware/class");
const Testing = require("@singleware/testing");
const Parsing = require("../../../source");
/**
 * Characters letter rule, test case.
 */
let Letter = class Letter extends Testing.Case {
    /**
     * Consume all the lowercase letters.
     */
    charLowerLetter() {
        const context = new Parsing.Context(new Parsing.Data.Node('test', 0), 'abcdefghijklmnopqrstuvwxyzç');
        const rule = new Parsing.Rules.Char.Letter(false);
        // Letters from 'a' to 'z'
        for (let i = 0; i < 26; ++i) {
            this.isTrue(rule.consume(context));
            this.areSame(context.offset, i + 1);
        }
        // Expected error
        this.isFalse(rule.consume(context));
        this.areSame(context.offset, 26);
    }
    /**
     * Consume all the uppercase letters.
     */
    charUpperLetter() {
        const context = new Parsing.Context(new Parsing.Data.Node('test'), 'ABCDEFGHIJKLMNOPQRSTUVWXYZÇ');
        const rule = new Parsing.Rules.Char.Letter(true);
        // Letters from 'A' to 'Z'
        for (let i = 0; i < 26; ++i) {
            this.isTrue(rule.consume(context));
            this.areSame(context.offset, i + 1);
        }
        // Expected error (No letter available)
        this.isFalse(rule.consume(context));
        this.areSame(context.offset, 26);
    }
};
__decorate([
    Testing.Method(),
    Class.Public()
], Letter.prototype, "charLowerLetter", null);
__decorate([
    Testing.Method(),
    Class.Public()
], Letter.prototype, "charUpperLetter", null);
Letter = __decorate([
    Class.Describe()
], Letter);
exports.Letter = Letter;
//# sourceMappingURL=letter.spec.js.map