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
 * String digit rule, test case.
 */
let Digits = class Digits extends Testing.Case {
    /**
     * Test method.
     */
    stringDigit() {
        const context = new Parsing.Context('0123456789a');
        const tree = new Parsing.Trees.Node('test', 0);
        const rule = new Parsing.Rules.String.Digits();
        // Digits from 0 to 9 (Success)
        this.isTrue(rule.consume(context, tree));
        this.areSame(context.offset, 10);
        // Expected error (No digit available)
        this.isFalse(rule.consume(context, tree));
        this.areSame(context.offset, 10);
    }
};
__decorate([
    Testing.Method(),
    Class.Public()
], Digits.prototype, "stringDigit", null);
Digits = __decorate([
    Class.Describe()
], Digits);
exports.Digits = Digits;
//# sourceMappingURL=digits.spec.js.map