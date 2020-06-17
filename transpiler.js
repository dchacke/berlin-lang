let { lex } = require("./lexer");
let { parse } = require("./parser");
let { translate } = require("./translator");

let transpile = srcString => {
  return translate(parse(lex(srcString).result)[0]);
};

module.exports = { transpile };
