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
 * End of content rule, test case.
 */
let End = class End extends Testing.Case {
    /**
     * Test method.
     */
    end() {
        const contextA = new Parsing.Context('');
        const contextB = new Parsing.Context('x');
        const tree = new Parsing.Trees.Node('test', 0);
        const rule = new Parsing.Rules.Data.End();
        // Success
        this.isTrue(rule.consume(contextA, tree));
        this.areSame(contextA.offset, 0);
        // Expected error (No end of content)
        this.isFalse(rule.consume(contextB, tree));
        this.areSame(contextB.offset, 0);
    }
};
__decorate([
    Testing.Method(),
    Class.Public()
], End.prototype, "end", null);
End = __decorate([
    Class.Describe()
], End);
exports.End = End;
//# sourceMappingURL=end.spec.js.map