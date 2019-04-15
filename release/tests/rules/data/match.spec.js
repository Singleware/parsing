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
 * Match rule, test case.
 */
let Match = class Match extends Testing.Case {
    /**
     * Lowercase test method.
     */
    dataLowerMatch() {
        const context = new Parsing.Context(new Parsing.Data.Node('test'), 'DeFaBCadg');
        const rule = new Parsing.Rules.Data.Match('name', Parsing.Data.Texts.LOWERCASE, new Parsing.Rules.Data.Extract('name', Parsing.Data.Texts.LOWERCASE, new Parsing.Rules.String.Choice('aBC', 'DeF')));
        // First success
        this.isTrue(rule.consume(context));
        this.areSame(context.tree.data['name'], 'def');
        this.areSame(context.offset, 3);
        // Second success
        this.isTrue(rule.consume(context));
        this.areSame(context.tree.data['name'], 'abc');
        this.areSame(context.offset, 6);
        // Expected error (No choice available)
        this.isFalse(rule.consume(context));
        this.areSame(context.tree.data['name'], 'abc');
        this.areSame(context.offset, 6);
    }
    /**
     * Uppercase test method.
     */
    dataUpperMatch() {
        const context = new Parsing.Context(new Parsing.Data.Node('test'), 'DeFaBCadg');
        const rule = new Parsing.Rules.Data.Match('name', Parsing.Data.Texts.UPPERCASE, new Parsing.Rules.Data.Extract('name', Parsing.Data.Texts.UPPERCASE, new Parsing.Rules.String.Choice('aBC', 'DeF')));
        // First success
        this.isTrue(rule.consume(context));
        this.areSame(context.tree.data['name'], 'DEF');
        this.areSame(context.offset, 3);
        // Second success
        this.isTrue(rule.consume(context));
        this.areSame(context.tree.data['name'], 'ABC');
        this.areSame(context.offset, 6);
        // Expected error (No choice available)
        this.isFalse(rule.consume(context));
        this.areSame(context.tree.data['name'], 'ABC');
        this.areSame(context.offset, 6);
    }
    /**
     * Default test method.
     */
    dataDefaultMatch() {
        const context = new Parsing.Context(new Parsing.Data.Node('test'), 'DeFaBCadg');
        const rule = new Parsing.Rules.Data.Match('name', Parsing.Data.Texts.DEFAULT, new Parsing.Rules.Data.Extract('name', Parsing.Data.Texts.DEFAULT, new Parsing.Rules.String.Choice('aBC', 'DeF')));
        // First success
        this.isTrue(rule.consume(context));
        this.areSame(context.tree.data['name'], 'DeF');
        this.areSame(context.offset, 3);
        // Second success
        this.isTrue(rule.consume(context));
        this.areSame(context.tree.data['name'], 'aBC');
        this.areSame(context.offset, 6);
        // Expected error (No choice available)
        this.isFalse(rule.consume(context));
        this.areSame(context.tree.data['name'], 'aBC');
        this.areSame(context.offset, 6);
    }
};
__decorate([
    Testing.Method(),
    Class.Public()
], Match.prototype, "dataLowerMatch", null);
__decorate([
    Testing.Method(),
    Class.Public()
], Match.prototype, "dataUpperMatch", null);
__decorate([
    Testing.Method(),
    Class.Public()
], Match.prototype, "dataDefaultMatch", null);
Match = __decorate([
    Class.Describe()
], Match);
exports.Match = Match;
//# sourceMappingURL=match.spec.js.map