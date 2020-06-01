// Takes an array of tokens and returns
// an array representing an abstract
// syntax tree.
let parse = tokens => {
  let tree = [];

  for (let i = 0; i < tokens.length; i++) {
    let [type, value] = tokens[i];

    // If we encounter an opening bracket,
    // we are dealing with an array literal,
    // and we want to eagerly consume everything
    // until we encounter a closing bracket.
    if (type === "[") {
      let subTokens = [];
      let outstanding = 1;
      let j = i;

      while (j < tokens.length - i && outstanding > 0) {
        let nextToken = tokens[j + 1];
        let [type, value] = nextToken;

        if (type === "[") {
          // For every opening bracket we find,
          // we have to find its closing counterpart.
          outstanding++;
        } else if (type === "]") {
          outstanding--;
        } else {
          subTokens.push(nextToken);
        }

        j++;
      }

      // Do not iterate over already consumed
      // items next time.
      i += j;

      tree = [
        ...tree,
        [
          "array-literal",
          parse(subTokens, "array")
        ]
      ];
    } else if (type !== "]") {
      tree = [
        ...tree,
        tokens[i]
      ];
    }
  }

  return tree;
};

module.exports = { parse };
