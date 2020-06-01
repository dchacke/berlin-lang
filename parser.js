// Takes an array of tokens and returns
// an array representing an abstract
// syntax tree.
let parse = tokens => {
  let tree = [];

  for (let i = 0; i < tokens.length; i++) {
    let [type, value] = tokens[i];

    if (type === "[") {
      let subTokens = [];
      let outstanding = 1;
      let j = i;

      while (j < tokens.length - i && outstanding > 0) {
        let nextToken = tokens[j + 1];
        let [type, value] = nextToken;

        if (type === "[") {
          outstanding++;
        } else if (type === "]") {
          outstanding--;
        } else {
          subTokens.push(nextToken);
        }

        j++;
      }

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

  // return tokens.reduce((acc, curr, index) => {
  //   debugger;

  //   // Tokens look like ["number", "3"],
  //   // or ["[", "["]
  //   let [type, value] = curr;
  //   let result = [];

  //   if (type === "[") {
  //     let subTokens = [];
  //     let outstanding = 1;
  //     let i = index;

  //     while (i < tokens.length && outstanding > 0) {
  //       let nextToken = tokens[i + 1];
  //       let [type, value] = nextToken;

  //       if (type === "[") {
  //         outstanding++;
  //       } else if (type === "]") {
  //         outstanding--;
  //       } else {
  //         subTokens.push(nextToken);
  //       }

  //       i++;
  //     }

  //     // acc.push([
  //     //   "array-literal",
  //     //   ...parse(subTokens, "array")
  //     // ]);

  //     result = [
  //       ...acc,
  //       "array-literal",
  //       ...parse(subTokens, "array")
  //     ];
  //   } else if (type !== "]") {
  //     // acc.push(curr);

  //     // return acc;
  //     result = [
  //       ...acc,
  //       curr
  //     ];
  //   }

  //   return result;
  // }, []);
};

module.exports = { parse };
