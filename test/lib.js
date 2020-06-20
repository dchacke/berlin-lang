let assert = require("assert");
let { get } = require("../lib");

describe("lib", () => {
  describe("get", () => {
    it("retrieves the given index from the given array", () => {
      assert.equal(get([1, 2, 3], 0), 1);
    });

    it("retrieves the given field from the given object", () => {
      assert.equal(get({foo: "bar"}, "foo"), "bar");
    });
  });
});
