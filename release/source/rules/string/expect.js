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
let Expect = class Expect extends Class.Null {
    /**
     * Default constructor.
     * @param string Expected string.
     */
    constructor(string) {
        super();
        this.expected = string;
    }
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context) {
        if (context.content.substr(context.offset, this.expected.length) === this.expected) {
            context.forward(this.expected.length);
            return true;
        }
        return false;
    }
};
__decorate([
    Class.Private()
], Expect.prototype, "expected", void 0);
__decorate([
    Class.Public()
], Expect.prototype, "consume", null);
Expect = __decorate([
    Class.Describe()
], Expect);
exports.Expect = Expect;
//# sourceMappingURL=expect.js.map