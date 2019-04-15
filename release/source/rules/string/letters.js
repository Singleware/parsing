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
const Char = require("../char");
const Flow = require("../flow");
/**
 * String letters, lowercase rule class.
 */
let LowerLetters = class LowerLetters extends Flow.Repeat {
    /**
     * Default constructor.
     */
    constructor() {
        super(new Char.LowerLetter());
    }
};
LowerLetters = __decorate([
    Class.Describe()
], LowerLetters);
exports.LowerLetters = LowerLetters;
/**
 * String letters, uppercase rule class.
 */
let UpperLetters = class UpperLetters extends Flow.Repeat {
    /**
     * Default constructor.
     */
    constructor() {
        super(new Char.UpperLetter());
    }
};
UpperLetters = __decorate([
    Class.Describe()
], UpperLetters);
exports.UpperLetters = UpperLetters;
/**
 * String letters, default rule class.
 */
let Letters = class Letters extends Flow.Repeat {
    /**
     * Default constructor.
     */
    constructor() {
        super(new Char.Letter());
    }
};
Letters = __decorate([
    Class.Describe()
], Letters);
exports.Letters = Letters;
//# sourceMappingURL=letters.js.map