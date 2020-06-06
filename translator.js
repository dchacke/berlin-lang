let translate = ast => {
  return ast.reduce((acc, curr, i) => {
    let [type, children] = curr;
    let result;

    switch(type) {
      case "symbol": {
        result = acc + children;
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
