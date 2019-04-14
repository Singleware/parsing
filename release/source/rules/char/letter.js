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
const Data = require("../../data");
const Flow = require("../flow");
const range_1 = require("./range");
/**
 * Character letter, rule class.
 */
let Letter = class Letter extends Flow.Any {
    /**
     * Default constructor.
     * @param style Text case style.
     * @throws Throws an error when the specified text case style is not valid.
     */
    constructor(style) {
        switch (style) {
            case Data.Texts.BOTH:
                super(new range_1.Range('a', 'z'), new range_1.Range('A', 'Z'));
                break;
            case Data.Texts.LOWER:
                super(new range_1.Range('a', 'z'));
                break;
            case Data.Texts.UPPER:
                super(new range_1.Range('A', 'Z'));
                break;
            default:
                throw new TypeError(`Invalid text case style.`);
        }
    }
};
Letter = __decorate([
    Class.Describe()
], Letter);
exports.Letter = Letter;
//# sourceMappingURL=letter.js.map