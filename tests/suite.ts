/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Testing from '@singleware/testing';

import * as Char from './rules/char';
import * as String from './rules/string';
import * as Data from './rules/data';
import * as Flow from './rules/flow';
import * as Status from './rules/status';

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

(async function() {
  const report = await suite.perform();
  logger.print(report);
  process.exitCode = report.errors > 0 ? 1 : 0;
})();
