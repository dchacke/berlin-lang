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
,\`baz\`
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

  describe("strings", () => {
    let ast = [["string", "foo_bar"]];
    let result = translate(ast);

    it("surrounds the string with back ticks", () => {
      assert.equal(result, "`foo_bar`\n");
    });
  });

  describe("numbers", () => {
    let ast = [["number", "12"]];
    let result = translate(ast);

    it("does not touch numbers", () => {
      assert.equal(result, "12\n");
    });
  });

  describe("arrays", () => {
    let ast = [
      [
        "array-literal",
        [
          ["number", "1"],
          ["number", "2"],
          ["number", "3"],
          [
            "array-literal",
            [
              ["number", "4"]
            ]
          ],
          ["number", "5"],
        ]
      ]
    ];
    let result = translate(ast);

    it("translates nested arrays", () => {
      assert.equal(result, `[1
,2
,3
,[4
]
,5
]
`);
    });
  });
});
