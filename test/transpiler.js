let assert = require("assert");
let { transpile } = require("../transpiler");

describe("Transpiler", () => {
  // This is just a small test to make sure the whole
  // pipeline works. All other tests belong to the
  // specific files corresponding to stages of the
  // pipeline: lexer -> parser -> translator.
  it("works", () => {
    assert.equal(transpile("def(foo 1)"), "let foo  = 1 ;\n");
  });
});
