let util = require("util");
let assert = require("assert");
let { translate } = require("../translator");
let _ = require("lodash");

describe("Translator", () => {
  describe("simple ast", () => {
    let ast =  [
      ["symbol", "foo"],
      [
        "function-call",
        [
          "argument-list",
          [
            ["symbol", "bar"],
            ["string", "baz"]
          ]
        ]
      ]
    ];
    let result = translate(ast);

    it("converts the ast into a js function call", () => {
      assert.equal(result, `foo
(bar
,"baz"
)
`);
    });
  });

  describe("keywords", () => {
    let ast = [["keyword", "foo-bar!"]];
    let result = translate(ast);

    it("converts keywords into js symbols", () => {
      assert.equal(result, "Symbol.for(\"foo-bar!\")\n");
    });
  });
});
