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
 * Character choice, rule class.
 */
let Choice = class Choice extends Class.Null {
    /**
     * Default constructor.
     * @param chars List of expected characters.
     */
    constructor(...chars) {
        super();
        this.expected = chars.map((char) => char[0]);
    }
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context) {
        if (this.expected.includes(context.content[context.offset])) {
            context.forward(1);
            return true;
        }
        return false;
    }
};
__decorate([
    Class.Private()
], Choice.prototype, "expected", void 0);
__decorate([
    Class.Public()
], Choice.prototype, "consume", null);
Choice = __decorate([
    Class.Describe()
], Choice);
exports.Choice = Choice;
//# sourceMappingURL=choice.js.map