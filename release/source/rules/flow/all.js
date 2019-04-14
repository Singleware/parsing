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
 * Require all rules, rule class.
 */
let All = class All extends Class.Null {
    /**
     * Default constructor.
     * @param rule First rule.
     * @param rules List of expected rules.
     */
    constructor(rule, ...rules) {
        super();
        this.rules = [rule, ...rules];
    }
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context) {
        for (const rule of this.rules) {
            if (!rule.consume(context)) {
                return false;
            }
        }
        return true;
    }
};
__decorate([
    Class.Private()
], All.prototype, "rules", void 0);
__decorate([
    Class.Public()
], All.prototype, "consume", null);
All = __decorate([
    Class.Describe()
], All);
exports.All = All;
//# sourceMappingURL=all.js.map