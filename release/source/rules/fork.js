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
 * Fork rule, rule class.
 */
let Fork = class Fork extends Class.Null {
    /**
     * Default constructor.
     * @param condition Condition rule.
     * @param success Success rule.
     * @param failure Failure rule.
     */
    constructor(condition, success, failure) {
        super();
        this.condition = condition;
        this.success = success;
        this.failure = failure;
    }
    /**
     * Consumes this rule moving ahead the context offset.
     * @param context Context entity.
     * @returns Returns true when the analysis was succeed or false otherwise.
     */
    consume(context) {
        const temp = context.copy();
        if (this.condition.consume(temp)) {
            context.forward(temp.offset - context.offset);
            return this.success.consume(context);
        }
        return this.failure.consume(context);
    }
};
__decorate([
    Class.Private()
], Fork.prototype, "condition", void 0);
__decorate([
    Class.Private()
], Fork.prototype, "success", void 0);
__decorate([
    Class.Private()
], Fork.prototype, "failure", void 0);
__decorate([
    Class.Public()
], Fork.prototype, "consume", null);
Fork = __decorate([
    Class.Describe()
], Fork);
exports.Fork = Fork;
//# sourceMappingURL=fork.js.map