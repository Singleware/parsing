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
 * String letter rule, test case.
 */
let Letters = class Letters extends Testing.Case {
    /**
     * Lowercase test method.
     */
    stringLowerLetter() {
        const context = new Parsing.Context('abcdefghijklmnopqrstuvwxyzç');
        const tree = new Parsing.Trees.Node('test', 0);
        const rule = new Parsing.Rules.String.Letters(false);
        // Letters from 'a' to 'z'
        this.isTrue(rule.consume(context, tree));
        this.areSame(context.offset, 26);
        // Expected error
        this.isFalse(rule.consume(context, tree));
        this.areSame(context.offset, 26);
    }
    /**
     * Uppercase test method.
     */
    stringUpperLetter() {
        const context = new Parsing.Context('ABCDEFGHIJKLMNOPQRSTUVWXYZÇ');
        const tree = new Parsing.Trees.Node('test', 0);
        const rule = new Parsing.Rules.String.Letters(true);
        // Letters from 'A' to 'Z'
        this.isTrue(rule.consume(context, tree));
        this.areSame(context.offset, 26);
        // Expected error (No letter available)
        this.isFalse(rule.consume(context, tree));
        this.areSame(context.offset, 26);
    }
};
__decorate([
    Testing.Method(),
    Class.Public()
], Letters.prototype, "stringLowerLetter", null);
__decorate([
    Testing.Method(),
    Class.Public()
], Letters.prototype, "stringUpperLetter", null);
Letters = __decorate([
    Class.Describe()
], Letters);
exports.Letters = Letters;
//# sourceMappingURL=letters.spec.js.map