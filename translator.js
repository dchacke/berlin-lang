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

let translate = (ast, depth = 0) => {
  return ast.reduce((acc, curr, i) => {
    let [type, children] = curr;
    let result;

    switch(type) {
      case "symbol": {
        result = acc + safe_symbol(children);
        break;
      }
      case "string": {
        result = acc + "`" + children + "`";
        break;
      }
      case "keyword": {
        result = acc + "Symbol.for(\"" + children + "\")";
        break;
      }
      case "number": {
        result = acc + children;
        break;
      }
      case "array-literal": {
        result = acc + "[" +
          children
            .map(child => [child])
            .map(tree => translate(tree, depth + 1))
            // Both for arrays and functions' argument lists,
            // elements should not be separated by a comma
            // for fn invocations (otherwise a(b(c)) turns
            // into a (b, (c )).
            // I'm surprised it does this, as nested function
            // calls should already be nested in the ast,
            // they shouldn't be siblings, yet it seems they
            // are siblings, why else do they get a comma stuck
            // in between them?
            .join(",")
          + "]";
        break;
      }
      case "function-call": {
        result = acc + "(" +
          children[1]
            .map(child => [child])
            .map(tree => translate(tree, depth + 1))
            .join(",")
          + ")";
        break;
      }
      // TODO: Translate blocks with depth=0
      // passed into the recursive calls for
      // the block's children.
    }

    // Determine if we want to add a semicolon
    // and line break at the end. We only want
    // to do that when we are still at the top
    // level and the next element in the ast is
    // not a function call (otherwise we're putting
    // a semicolon between a function's name and
    // its parentheses).
    let eol;

    if (depth === 0) {
      let next = ast[i + 1];

      if (next && next[0] === "function-call") {
        eol = false;
      } else {
        eol = true;
      }
    } else {
      eol = false;
    }

    return result + (eol ? ";\n" : " ");
  }, "");
};

module.exports = { translate };
