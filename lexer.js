// Removes comments from the given
// source string.
let remove_comments = source => {
  // Using [^\n] as per
  // https://stackoverflow.com/a/3850095/1371131.
  // That will match up to but not including
  // the line break.
  return source.replace(/;.*[^\n]*/g, "");
};

let last = a => a[a.length - 1];

// Takes a source string and turns
// it into a sequence of tokens.
let lex = source => {
  // Remove comments
  source = remove_comments(source);

  return source
    .split("")
    .reduce((acc, curr) => {
      switch (last(acc.mode)) {
        case "number": {
          // We want to close the number and ignore
          // the current character
          if (curr === " " || curr === "\n" || curr === ",") {
            acc.mode.pop();

            return acc;
          // We want to ignore underscores (they serve
          // merely as optional thousand separators)
          } else if (curr === "_") {
            return acc;
          // A number must not contain the following
          // special characters. For example, in "foo(1 2 3)",
          // the last parenthesis is not part of the number 3,
          // even though they are not separated by a
          // whitespace.
          } else if (/[{}\[\]()#]/.test(curr)) {
            acc.mode.pop();
            acc.result.push([curr, curr]);

            return acc;
          // Consume the next character as part
          // of the number
          } else {
            let resultCount = acc.result.length;
            let currResultCount = acc.result[resultCount - 1].length;

            acc.result[resultCount - 1][currResultCount - 1] += curr;

            return acc;
          }
        }
        case "symbol": {
          // We want to close the symbol and ignore
          // the current character
          if (curr === " " || curr === "\n" || curr === ",") {
            acc.mode.pop();

            return acc;
          // A symbol must not contain the following
          // special characters. For example, in "foo()",
          // the parentheses are not part of the symbol,
          // even though they are not separated by a
          // whitespace.
          } else if (/[{}\[\]()#]/.test(curr)) {
            acc.mode.pop();
            acc.result.push([curr, curr]);

            return acc;
          // Consume the next character as part
          // of the symbol
          } else {
            let resultCount = acc.result.length;
            let currResultCount = acc.result[resultCount - 1].length;

            acc.result[resultCount - 1][currResultCount - 1] += curr;

            return acc;
          }
        }
        case "string": {
          // We want to close the string
          if (curr === "\"") {
            acc.mode.pop();

            return acc;
          // Consume the next character as part
          // of the string
          } else {
            let resultCount = acc.result.length;
            let currResultCount = acc.result[resultCount - 1].length;

            acc.result[resultCount - 1][currResultCount - 1] += curr;

            return acc;
          }
        }
        case "keyword": {
          // We want to close the keyword
          if (curr === " " || curr === "\n" || curr === ",") {
            acc.mode.pop();

            return acc;
          // Consume the next character as part
          // of the keyword
          } else {
            let resultCount = acc.result.length;
            let currResultCount = acc.result[resultCount - 1].length;

            acc.result[resultCount - 1][currResultCount - 1] += curr;

            return acc;
          }
        }
        default: {
          // We want to open a string
          if (curr === "\"") {
            acc.mode.push("string");
            acc.result.push(["string", ""]);

            return acc;
          // We want to open a keyword
          } else if (curr === ":") {
            acc.mode.push("keyword");
            acc.result.push(["keyword", ""]);

            return acc;
          // We want to open a number
          } else if (/\d/.test(curr)) {
            acc.mode.push("number");
            // The current character is already the first
            // character in the result
            acc.result.push(["number", curr]);

            return acc;
          // All other cases: open a symbol
          // (or it's a character to be ignored)
          } else {
            if (curr === " " || curr === "\n" || curr === ",") {
              return acc;
            // Turn special characters for maps,
            // sets, function invocations etc into
            // tokens of their own.
            } else if (/[{}\[\]()#]/.test(curr)) {
              acc.result.push([curr, curr]);

              return acc;
            }

            acc.mode.push("symbol");
            // The current character is already the first
            // character in the result
            acc.result.push(["symbol", curr]);

            return acc;
          }
        }
      }
    }, {
      mode: [], // does this really need to be an array? I don't think tokens can be nested...
      result: []
    });
};

// Next up: handle comments in lex fn instead of
// removing them beforehand. That should allow me
// to display error messages with accurate line
// and character numbers later on.

module.exports = { lex };

// The types of things the parser needs to recognize:
// Function/macro calls
// ✓ Primitives
// Special forms (which look like function calls, and
// maybe they can just *be* function calls, at least
// as far as the consumer of the language is concerned)
// Blocks
// ✓ Maps, Arrays, Sets
// Booleans (which look like symbols)
//
// No statements, no expressions. Only functions.
//
// Assume that opening parenthesis means we are invoking
// a function.
// Special functions that are guaranteed to be pure because
// the compiler raises an exception when the function body
// accesses a symbol the function wasn't explicitly passed
// (I got this idea from Brian Will, he briefly mentioned it
// in one of his videos, but I can't remember which one:
// https://www.youtube.com/user/briantwill/)
