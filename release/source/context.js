"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Context_1;
"use strict";
/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Class = require("@singleware/class");
const Data = require("./data");
/**
 * Context class.
 */
let Context = Context_1 = class Context extends Class.Null {
    /**
     * Default constructor.
     * @param tree Content tree.
     * @param content Context content.
     * @param offset Initial content offset.
     * @param length Maximum content length.
     */
    constructor(tree, content, offset, length) {
        super();
        /**
         * Content error.
         */
        this.contentError = {
            code: 0,
            offset: -1
        };
        this.contentTree = tree;
        this.contentString = content;
        this.contentOffset = offset || 0;
        this.contentLength = length || content.length;
    }
    /**
     * Gets the content tree.
     */
    get tree() {
        return this.contentTree;
    }
    /**
     * Gets the context content.
     */
    get content() {
        return this.contentString;
    }
    /**
     * Gets the context offset.
     */
    get offset() {
        return this.contentOffset;
    }
    /**
     * Gets the context length.
     */
    get length() {
        return this.contentLength;
    }
    /**
     * Gets the context error.
     */
    get error() {
        return this.contentError;
    }
    /**
     * Move forward the current context offset.
     * @param length Incremental length.
     * @returns Returns thw own instance.
     */
    forward(length) {
        this.contentOffset += length;
        return this;
    }
    /**
     * Context analysis has been failed.
     * @param code Error code.
     * @returns Returns thw own instance.
     */
    fail(code) {
        this.contentError.code = code;
        this.contentError.offset = this.contentOffset;
        return this;
    }
    /**
     * Context analysis has been succeed.
     * @returns Returns the own instance.
     */
    success() {
        this.contentError.code = 0;
        this.contentError.offset = -1;
        return this;
    }
    /**
     * Creates a new shallow copy of this context.
     * @param tree Optional context tree.
     * @returns Returns the instance copy.
     */
    copy(tree) {
        const node = tree || new Data.Node('@temp', this.contentOffset, this.contentTree.data);
        const context = new Context_1(node, this.contentString, this.contentOffset, this.contentLength);
        context.contentError = this.contentError;
        return context;
    }
};
__decorate([
    Class.Private()
], Context.prototype, "contentTree", void 0);
__decorate([
    Class.Private()
], Context.prototype, "contentString", void 0);
__decorate([
    Class.Private()
], Context.prototype, "contentOffset", void 0);
__decorate([
    Class.Private()
], Context.prototype, "contentLength", void 0);
__decorate([
    Class.Private()
], Context.prototype, "contentError", void 0);
__decorate([
    Class.Public()
], Context.prototype, "tree", null);
__decorate([
    Class.Public()
], Context.prototype, "content", null);
__decorate([
    Class.Public()
], Context.prototype, "offset", null);
__decorate([
    Class.Public()
], Context.prototype, "length", null);
__decorate([
    Class.Public()
], Context.prototype, "error", null);
__decorate([
    Class.Public()
], Context.prototype, "forward", null);
__decorate([
    Class.Public()
], Context.prototype, "fail", null);
__decorate([
    Class.Public()
], Context.prototype, "success", null);
__decorate([
    Class.Public()
], Context.prototype, "copy", null);
Context = Context_1 = __decorate([
    Class.Describe()
], Context);
exports.Context = Context;
//# sourceMappingURL=context.js.map