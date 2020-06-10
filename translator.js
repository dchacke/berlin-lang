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

let conjoin_children = depth => {
  return (acc, child, j, children) => {
    let tree = [child];
    let translation = translate(tree, depth + 1);
    let delimiter = "";

    if (children[j + 1] && children[j + 1][0] !== "function-call") {
      delimiter = ",";
    }

    return acc + translation + delimiter;
  };
};

// Turns [1,2,3,4,5,6] into [[1,2],[3,4],[5,6]].
let pairwise = array => {
  if (array.length === 0) {
    return [];
  }

  let rest = array.slice(2);
  let result = [array[0], array[1]];

  return [result, ...pairwise(rest)];
};

let translate = (ast, depth = 0, parentType) => {
  return ast.reduce((acc, curr, i) => {
    let [type, children] = curr;
    let result;

    switch(type) {
      case "symbol": {
        // If what follows is a function declaration,
        // we can discard this symbol, because later on
        // we only need to say () => {}, not fn () => {}.
        if (children === "fn") {
          result = "";
        } else {
          result = safe_symbol(children);
        }

        break;
      }
      case "boolean-literal": {
        result = children;
        break;
      }
      case "string": {
        result = "`" + children + "`";
        break;
      }
      case "keyword": {
        result = "Symbol.for(\"" + children + "\")";
        break;
      }
      case "number": {
        result = children;
        break;
      }
      case "array-literal": {
        result = "[" +
          children.reduce(conjoin_children(depth), "")
          + "]";
        break;
      }
      case "map-literal": {
        result = "new Map([" +
          pairwise(children)
            .map(pairs => ["array-literal", pairs])
            .reduce(conjoin_children(depth), "")
          + "])";
        break;
      }
      case "set-literal": {
        result = "new Set([" +
          children.reduce(conjoin_children(depth), "")
          +"])";
        break;
      }
      case "block-declaration": {
        result = "{" + translate(children, 0, "block-declaration") + "}";
        break;
      }
      case "function-call": {
        let [_, [__, invocable], [___, fnArgs]] = curr;

        // Is this a function *declaration*?
        if (invocable[0] === "symbol" && invocable[1] === "fn") {
          let fnBlock = fnArgs[fnArgs.length - 1];
          let args = fnArgs.slice(0, fnArgs.length - 1);

          if (!fnBlock || fnBlock[0] !== "block-declaration") {
            throw("Function declaration requires code block");
          }

          result = "((" +
            args.reduce(conjoin_children(depth), "")
            + ") => " + translate([fnBlock], depth + 1) + ")";
        // No, it's really a function *invocation*
        } else {
          // We are invoking an instance method
          if (invocable[1][0] === ".") {
            result = "(" + "(" + translate([fnArgs[0]], depth + 1) + ")" + translate([invocable], depth + 1) + "(" + fnArgs.slice(1).reduce(conjoin_children(depth), "") + ")" + ")";
          // We are instantiating a constructor
          } else if (invocable[1][invocable[1].length - 1] === ".") {
            invocable[1] = invocable[1].slice(0, -1);
            result = `(new ${translate([invocable], depth + 1)}(${fnArgs.reduce(conjoin_children(depth), "")}))`;
          } else {
            result = "(" + translate([invocable], depth + 1) + ")" + "(" +
              fnArgs.reduce(conjoin_children(depth), "")
              + ")";
          }
        }

        break;
      }
    }
    // TODO: Prepend last child in fn block with string "return."
    // It may be fine to just do so in *any* block as long as I
    // only ever use blocks with functions.

    // Determine if we want to add a semicolon
    // and line break at the end. We only want
    // to do that if we are still at the top
    // level and the next element in the ast is
    // not a function call (otherwise we're putting
    // a semicolon between a function's name and
    // its parentheses).
    let eol = depth === 0;

    // If we are inside a block declaration, we want
    // to prepend a return statement to the last
    // element.
    let returnStatement;

    if (parentType === "block-declaration" && i === ast.length - 1) {
      returnStatement = "return ";
    } else {
      returnStatement = "";
    }


    return acc + returnStatement + result + (eol ? ";\n" : " ");
  }, "");
};

module.exports = { translate };
