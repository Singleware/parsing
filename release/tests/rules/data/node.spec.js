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
 * Node rule, test case.
 */
let Node = class Node extends Testing.Case {
    /**
     * Test method.
     */
    dataNode() {
        const context = new Parsing.Context('defabcadg');
        const tree = new Parsing.Trees.Node('test', 0);
        const rule = new Parsing.Rules.Data.Node(Parsing.Trees.Directions.NEXT, Parsing.Trees.Directions.LEFT, new Parsing.Rules.Data.Tree('choice', Parsing.Trees.Directions.NEXT, new Parsing.Rules.Data.Extract('name', new Parsing.Rules.String.Choice('abc', 'def'))));
        // First success
        this.isTrue(rule.consume(context, tree));
        this.areSame(tree.left.type, 'choice');
        this.areSame(tree.left.data['name'], 'def');
        this.areSame(context.offset, 3);
        // Second success
        this.isTrue(rule.consume(context, tree));
        this.areSame(tree.left.type, 'choice');
        this.areSame(tree.left.data['name'], 'def');
        this.areSame(tree.left.left.type, 'choice');
        this.areSame(tree.left.left.data['name'], 'abc');
        this.areSame(context.offset, 6);
        // Expected error (No choice available)
        this.isFalse(rule.consume(context, tree));
        this.areSame(tree.left.type, 'choice');
        this.areSame(tree.left.data['name'], 'def');
        this.areSame(tree.left.left.type, 'choice');
        this.areSame(tree.left.left.data['name'], 'abc');
        this.areSame(context.offset, 6);
    }
};
__decorate([
    Testing.Method(),
    Class.Public()
], Node.prototype, "dataNode", null);
Node = __decorate([
    Class.Describe()
], Node);
exports.Node = Node;
//# sourceMappingURL=node.spec.js.map