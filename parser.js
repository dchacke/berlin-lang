let even = n => n % 2 === 0;

// Takes an array of tokens and returns
// an array representing an abstract
// syntax tree.
let parse = (tokens, mode) => {
  let tree = [];
  let consumedTokens = 0;

  for (let i = 0; i < tokens.length; i++) {
    let [type, value] = tokens[i];

    if (type === "[") {
      let [subTree, newlyConsumedTokens] = parse(tokens.slice(i + 1), "array");

      tree.push(
        ["array-literal", subTree]
      );

      i += newlyConsumedTokens;
      consumedTokens += newlyConsumedTokens;
    } else if (type === "]") {
      if (mode === "array") {
        consumedTokens++;
        return [tree, consumedTokens];
      } else {
        throw "Unmatched closing bracket ]";
      }
    } else if (type === "{") {
      let mode;

      if (tokens[i - 1]) {
        if (tokens[i - 1][0] === "#") {
          mode = "set";
        } else if (tokens[i - 1][0] === "~") {
          mode = "block";
        } else {
          mode = "map";
        }
      } else {
        mode = "map";
      }

      let [subTree, newlyConsumedTokens] = parse(tokens.slice(i + 1), mode);

      if (!even(subTree.length) && mode === "map") {
        throw "Map literal requires an even number of elements";
      }

      if (mode === "block") {
        tree.push(
          ["block-declaration", subTree]
        );
      } else {
        tree.push(
          [`${mode}-literal`, subTree]
        );
      }

      i += newlyConsumedTokens;
      consumedTokens += newlyConsumedTokens;
    } else if (type === "}") {
      if (mode === "map" || mode === "set" || mode === "block") {
        consumedTokens++;
        return [tree, consumedTokens];
      } else {
        throw "Unmatched closing curly brace }";
      }
    // We are invoking a fn. (We look ahead and check
    // here for an opening parenthesis, which tells us it's
    // a function call. Therefore, there is no need to check
    // for an opening parenthesis above like we do with open
    // brackets and curly braces.)
    } else if (type === "(") {
      let [subTree, newlyConsumedTokens] = parse(tokens.slice(i + 1), "arguments");

      let invocable = tree[tree.length - 1];

      if (invocable === undefined) {
        throw "Cannot invoke missing function";
      }

      tree.pop();

      tree.push(
        [
          "function-call",
          ["invocable", invocable],
          ["argument-list", subTree]
        ]
      );

      i += newlyConsumedTokens;
      consumedTokens += newlyConsumedTokens;
    } else if (type === ")") {
      if (mode === "arguments") {
        consumedTokens++;
        return [tree, consumedTokens];
      } else {
        throw "Unmatched closing parenthesis )";
      }
    } else if (type === "symbol") {
      // We could just treat booleans as symbols...
      // For now we will treat them separately
      // in case anything can be done with that
      // additional information, and in case we
      // want to write translators for other
      // languages someday for which the information
      // may matter.
      if (value === "true") {
        tree.push(["boolean-literal", "true"]);
      } else if (value === "false") {
        tree.push(["boolean-literal", "false"]);
      } else if (value === "nil") {
        tree.push(["null-literal", "nil"]);
      } else {
        tree.push(tokens[i]);
      }
    } else if (type !== "#" && type !== "~") {
      tree.push(tokens[i]);
    }

    consumedTokens++;
  }

  return [tree, consumedTokens];
};

module.exports = { parse };
