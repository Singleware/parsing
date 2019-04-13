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
 * Characters range rule, test case.
 */
let Range = class Range extends Testing.Case {
    /**
     * Test method.
     */
    charRange() {
        const context = new Parsing.Context('efghij');
        const tree = new Parsing.Trees.Node('test', 0);
        const rule = new Parsing.Rules.Char.Range('e', 'i');
        // Letters from 'e' to 'i'
        for (let i = 0; i < 5; ++i) {
            this.isTrue(rule.consume(context, tree));
            this.areSame(context.offset, i + 1);
        }
        // Expected error (No range char available)
        this.isFalse(rule.consume(context, tree));
        this.areSame(context.offset, 5);
    }
};
__decorate([
    Testing.Method(),
    Class.Public()
], Range.prototype, "charRange", null);
Range = __decorate([
    Class.Describe()
], Range);
exports.Range = Range;
//# sourceMappingURL=range.spec.js.map