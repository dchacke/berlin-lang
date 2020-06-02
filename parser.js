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
      let [subTree, newlyConsumedTokens] = parse(tokens.slice(i + 1), 'array');

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
      if (mode === "map" || mode === "set") {
        consumedTokens++;
        return [tree, consumedTokens];
      } else {
        throw "Unmatched closing curly brace }";
      }
    } else if (type !== "#") {
      tree.push(tokens[i]);
    }

    consumedTokens++;
  }

  return [tree, consumedTokens];
};

module.exports = { parse };
