let util = require("util");
let assert = require("assert");
let { parse } = require("../parser");
let _ = require("lodash");

describe("Parser", () => {
  describe("primitives", () => {
    let tokens = [["number", "1"], ["string", "foo"]];
    let result = parse(tokens)[0];

    it("leaves primitives untouched", () => {
      assert(_.isEqual(result, tokens));
    });
  });

  describe("arrays", () => {
    let tokens = [
      ["[", "["],
      ["number", "1"],
      ["number", "2"],
      ["number", "3"],
      ["[", "["],
      ["number", "4"],
      ["]", "]"],
      ["number", "5"],
      ["]", "]"]
    ];
    let result = parse(tokens)[0];

    it("parses nested arrays", () => {
      assert(_.isEqual(result, [
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
      ]));
    });

    it("throws for an unmatched closing bracket", () => {
      assert.throws(() => {
        parse([["[", "["], ["]", "]"], ["]", "]"]]);
      }, /^Unmatched closing bracket ]$/);
    });
  });

  describe("maps", () => {
    describe("well formed", () => {
      let tokens = [
        ["{", "{"],
        ["number", "1"],
        ["number", "2"],
        ["{", "{"],
        ["number", "3"],
        ["number", "4"],
        ["}", "}"],
        ["number", "5"],
        ["}", "}"]
      ];
      let result = parse(tokens)[0];

      it("parses nested maps", () => {
        assert(_.isEqual(result, [
          [
            "map-literal",
            [
              ["number", "1"],
              ["number", "2"],
              [
                "map-literal",
                [
                  ["number", "3"],
                  ["number", "4"],
                ]
              ],
              ["number", "5"]
            ]
          ]
        ]));
      });
    });

    describe("malformed", () => {
      describe("unmatched closing curly brace", () => {
        let tokens = [
          ["{", "{"],
          ["number", "1"],
          ["number", "2"],
          ["}", "}"],
          ["}", "}"]
        ];

        it("throws", () => {
          assert.throws(() => {
            parse(tokens);
          }, /^Unmatched closing curly brace }$/);
        });
      });

      describe("uneven number of elements", () => {
        let tokens = [
          ["{", "{"],
          ["number", "1"],
          ["}", "}"]
        ];

        it("throws", () => {
          assert.throws(() => {
            parse(tokens);
          }, /^Map literal requires an even number of elements$/);
        });
      });
    });
  });

  describe("sets", () => {
    let tokens = [
      ["#", "#"],
      ["{", "{"],
      ["number", "1"],
      ["number", "2"],
      ["#", "#"],
      ["{", "{"],
      ["number", "3"],
      ["}", "}"],
      ["number", "4"],
      ["}", "}"]
    ];
    let result = parse(tokens)[0];

    it("parses nested sets", () => {
      assert(_.isEqual(result, [
        [
          "set-literal",
          [
            ["number", "1"],
            ["number", "2"],
            [
              "set-literal",
              [
                ["number", "3"]
              ]
            ],
            ["number", "4"],
          ]
        ]
      ]));
    });

    it("throws for an unmatched closing curly brace", () => {
      assert.throws(() => {
        parse([["#", "#"], ["{", "{"], ["}", "}"], ["}", "}"]]);
      }, /^Unmatched closing curly brace }$/);
    });
  });

  describe("boolean literals", () => {
    let tokens = [["symbol", "true"], ["symbol", "false"]];
    let result = parse(tokens)[0];

    it("parses boolean literals from their corresponding symbols", () => {
      assert(_.isEqual(result, [
        ["boolean-literal", "true"],
        ["boolean-literal", "false"]
      ]));
    });
  });

  describe("blocks", () => {
    let tokens = [
      ["keyword", "foo"],
      ["~", "~"],
      ["{", "{"],
      ["symbol", "foo"],
      ["number", "1"],
      ["symbol", "bar"],
      ["}", "}"],
      ["keyword", "bar"]
    ];
    let result = parse(tokens)[0];

    it("parses the block signified by ~{}", () => {
      assert(_.isEqual(result, [
        ["keyword", "foo"],
        [
          "block-declaration",
          [
            ["symbol", "foo"],
            ["number", "1"],
            ["symbol", "bar"]
          ]
        ],
        ["keyword", "bar"]
      ]));
    });
  });

  describe("function calls", () => {
    describe("no arguments", () => {
      let tokens = [
        ["(", "("],
        [")", ")"]
      ];
      let result = parse(tokens)[0];

      it("parses the function call with an empty argument list", () => {
        assert(_.isEqual(result, [
          [
            "function-call",
            ["argument-list", []]
          ]
        ]));
      });
    });

    describe("with arguments", () => {
      let tokens = [
        ["symbol", "foo"],
        ["(", "("],
        ["symbol", "bar"],
        ["string", "baz"],
        [")", ")"]
      ];
      let result = parse(tokens)[0];

      it("parses the function call with two arguments", () => {
        assert(_.isEqual(result, [
          // Not also that it treats the preceding symbol
          // as something entirely separate. The parser
          // doesn't care that the symbol contains the
          // functions (and it might not) -- that's for
          // the translator to figure out.
          // This is to allow functions to be invoked
          // immediately after declaration.
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
        ]));
      });
    });

    describe("unmatched closing parenthesis", () => {
      it("throws", () => {
        assert.throws(() => {
          parse([
            ["symbol", "foo"],
            ["(", "("],
            [")", ")"],
            [")", ")"]
          ]);
        }, /^Unmatched closing parenthesis \)$/);
      });
    });
  });
});
