let safe_symbol = symbol => {
  let replacements = {
    "-": "__MINUS__",
    "+": "__PLUS__",
    "!": "__BANG__",
    "@": "__AT__",
    "#": "__POUND__",
    "$": "__DOLLAR__",
    "%": "__PERCENT__",
    "^": "__CARET__",
    "&": "__AMPERSAND__",
    "*": "__ASTERISK__",
    "=": "__EQUALS__",
    "'": "__QUOTE__",
    "?": "__QUESTION_MARK__",
    "/": "__FORWARD_SLASH__",
    "\\": "__BACKSLASH__",
    "<": "__LESS_THAN__",
    ">": "__GREATER_THAN__"
  };

  return Object.keys(replacements).reduce((acc, curr) => {
    return acc.replace(curr, replacements[curr]);
  }, symbol);
};

let translate = ast => {
  return ast.reduce((acc, curr, i) => {
    let [type, children] = curr;
    let result;

    switch(type) {
      case "symbol": {
        result = acc + safe_symbol(children);
        break;
      }
      case "string": {
        result = acc + "\"" + children + "\"";
        break;
      }
      case "keyword": {
        result = acc + "Symbol.for(\"" + children + "\")";
        break;
      }
      case "function-call": {
        result = acc + "(" +
          children[1]
            .map(child => [child])
            .map(translate).join(",") + ")";
        break;
      }
    }

    return result + "\n";
  }, "");
};

module.exports = { translate };
