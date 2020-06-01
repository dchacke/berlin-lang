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
        ["]", "]"]
      ];
      let result = parse(tokens);

      it("parses arrays", () => {
        assert(_.isEqual(result, [
          [
            "array-literal",
            [
              ["number", "1"],
              ["number", "2"],
              ["number", "3"]
            ]
          ]
        ]));
      });
    });
  });
});
