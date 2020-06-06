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

  describe("symbols", () => {
    describe("with special characters", () => {
      let ast = [["symbol", "foo-+!@#$%^&*='?/\\<>bar"]];
      let result = translate(ast);

      it("replaces each special character with the corresponding replacement", () => {
        assert.equal(
          result,
          "foo__MINUS____PLUS____BANG____AT__" +
          "__POUND____DOLLAR____PERCENT____CARET__" +
          "__AMPERSAND____ASTERISK____EQUALS____QUOTE__" +
          "__QUESTION_MARK____FORWARD_SLASH____BACKSLASH__" +
          "__LESS_THAN____GREATER_THAN__bar\n");
      });
    });

    describe("without special characters", () => {
      let ast = [["symbol", "foo_bar"]];
      let result = translate(ast);

      it("does not change the symbol literal", () => {
        assert.equal(result, "foo_bar\n");
      });
    });
  });
});
