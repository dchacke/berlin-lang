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
        ["}", "}"]
      ];
      let result = parse(tokens)[0];

      it("parses nested maps", () => {
        assert(_.isEqual(result, [
          [
            "map-literal",
            [
              ["number", "1"],
              ["number", "2"]
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
});
