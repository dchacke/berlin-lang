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
          if (curr === " " || curr === "\n") {
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
          }
          // All other cases: ignore
          return acc;
        }
      }
    }, {
      mode: [],
      result: []
    });
};
