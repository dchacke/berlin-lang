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
      let literal = tokens[i - 1] && tokens[i - 1][0] === "#" ? "set" : "map";
      let [subTree, newlyConsumedTokens] = parse(tokens.slice(i + 1), literal);

      if (!even(subTree.length) && literal === "map") {
        throw "Map literal requires an even number of elements";
      }

      tree.push(
        [`${literal}-literal`, subTree]
      );

      i += newlyConsumedTokens;
      consumedTokens += newlyConsumedTokens;
    } else if (type === "}") {
      if (mode === "map" || mode === "set" || mode === "block") {
        consumedTokens++;
        return [tree, consumedTokens];
      } else {
        throw "Unmatched closing curly brace }";
      }
    } else if (type === ")") {
      if (mode === "arguments") {
        consumedTokens++;
        return [tree, consumedTokens];
      } else {
        throw "Unmatched closing parenthesis )";
      }
    } else if (type === "symbol") {
      if (value === "true") {
        tree.push(["boolean-literal", "true"]);
      } else if (value === "false") {
        tree.push(["boolean-literal", "false"]);
      // We are invoking a fn. (We look ahead and check
      // here for an opening parenthesis, which tells us it's
      // a function call. Therefore, there is no need to check
      // for an opening parenthesis above like we do with open
      // brackets and curly braces.)
      } else if (tokens[i + 1] && tokens[i + 1][0] === "(") {
        let [subTree, newlyConsumedTokens] = parse(tokens.slice(i + 2), "arguments");
        newlyConsumedTokens++;

        tree.push(
          ["function-call", value, ["argument-list", subTree]]
        );

        i += newlyConsumedTokens;
        consumedTokens += newlyConsumedTokens;
      // We are declaring a block.
      } else if (value === "~" && tokens[i + 1] && tokens[i + 1][0] === "{") {
        let [subTree, newlyConsumedTokens] = parse(tokens.slice(i + 2), "block");
        newlyConsumedTokens++;

        tree.push(
          ["block-declaration", subTree]
        );

        i += newlyConsumedTokens;
        consumedTokens += newlyConsumedTokens;
      } else {
        tree.push(tokens[i]);
      }
    } else if (type !== "#") {
      tree.push(tokens[i]);
    }

    consumedTokens++;
  }

  return [tree, consumedTokens];
};

module.exports = { parse };
