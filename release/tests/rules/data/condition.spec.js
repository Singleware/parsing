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
 * Condition rule, test case.
 */
let Condition = class Condition extends Testing.Case {
    /**
     * Test method.
     */
    dataCondition() {
        const context = new Parsing.Context(new Parsing.Data.Node('test'), 'defabcadg');
        const ruleA = new Parsing.Rules.Data.Extract('name', Parsing.Data.Texts.DEFAULT, new Parsing.Rules.String.Choice('abc', 'def'));
        const ruleB = new Parsing.Rules.Data.Condition('name', Parsing.Data.Conditions.EQUALS, 'def', new Parsing.Rules.Flow.Reference(() => ruleA));
        // First success
        this.isTrue(ruleA.consume(context));
        this.areSame(context.tree.data['name'], 'def');
        this.areSame(context.offset, 3);
        // Second success
        this.isTrue(ruleB.consume(context));
        this.areSame(context.tree.data['name'], 'abc');
        this.areSame(context.offset, 6);
        // Expected error (Condition failed)
        this.isFalse(ruleB.consume(context));
        this.areSame(context.tree.data['name'], 'abc');
        this.areSame(context.offset, 6);
    }
};
__decorate([
    Testing.Method(),
    Class.Public()
], Condition.prototype, "dataCondition", null);
Condition = __decorate([
    Class.Describe()
], Condition);
exports.Condition = Condition;
//# sourceMappingURL=condition.spec.js.map