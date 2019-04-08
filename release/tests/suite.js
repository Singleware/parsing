"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Testing = require("@singleware/testing");
const Char = require("./char");
const suite = new Testing.Suite();
const logger = new Testing.Loggers.Tap();
// Test cases.
suite.addCase(Char.Any);
(async function () {
    const report = await suite.perform();
    logger.print(report);
    process.exitCode = report.errors > 0 ? 1 : 0;
})();
//# sourceMappingURL=suite.js.map