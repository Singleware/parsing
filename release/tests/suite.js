"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Testing = require("@singleware/testing");
const Char = require("./rules/char");
const String = require("./rules/string");
const Data = require("./rules/data");
const Flow = require("./rules/flow");
const Status = require("./rules/status");
const suite = new Testing.Suite();
const logger = new Testing.Loggers.Tap();
// Test cases for characters rules.
suite.addCase(Char.Any);
suite.addCase(Char.Choice);
suite.addCase(Char.Digit);
suite.addCase(Char.Expect);
suite.addCase(Char.Letter);
suite.addCase(Char.Range);
// Test cases for string rules.
suite.addCase(String.Choice);
suite.addCase(String.Digits);
suite.addCase(String.Expect);
suite.addCase(String.Letters);
// Test cases for data rules.
suite.addCase(Data.Equal);
suite.addCase(Data.End);
suite.addCase(Data.Extract);
suite.addCase(Data.Match);
suite.addCase(Data.Include);
suite.addCase(Data.Remark);
suite.addCase(Data.Tree);
suite.addCase(Data.Node);
// Test cases for flow rules.
suite.addCase(Flow.All);
suite.addCase(Flow.Any);
suite.addCase(Flow.Fork);
suite.addCase(Flow.False);
suite.addCase(Flow.Not);
suite.addCase(Flow.Option);
suite.addCase(Flow.Reference);
suite.addCase(Flow.Repeat);
suite.addCase(Flow.True);
// Test cases for status rules.
suite.addCase(Status.Error);
suite.addCase(Status.Success);
(async function () {
    const report = await suite.perform();
    logger.print(report);
    process.exitCode = report.errors > 0 ? 1 : 0;
})();
//# sourceMappingURL=suite.js.map