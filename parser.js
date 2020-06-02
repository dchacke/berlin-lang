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
    } else {
      tree.push(tokens[i]);
    }

    consumedTokens++;
  }

  return [tree, consumedTokens];
};

module.exports = { parse };
