let assert = require("assert");
let { parse } = require("../parser");
let _ = require("lodash");

describe("Parser", () => {
  describe("primitives", () => {
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
  });
});
