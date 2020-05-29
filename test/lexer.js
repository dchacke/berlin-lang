let assert = require("assert");
let { lex } = require("../lexer");
let _ = require("lodash");

describe("Lexer", () => {
  describe("primitives", () => {
    let source = `123 :foo "bar" baz 4.5`;
    let result = lex(source).result;

    it("tokenizes primitives", () => {
      assert(_.isEqual(result, [
        ["number", "123"],
        ["keyword", "foo"],
        ["string", "bar"],
        ["symbol", "baz"],
        ["number", "4.5"]
      ]));
    });
  });

  describe("special characters", () => {
    let source = "foo(2) {:foo bar} [1] #{1 2}";
    let result = lex(source).result;

    it("handles special characters signifying sets, maps, and arrays", () => {
      assert(_.isEqual(result, [
        ["symbol", "foo"],
        ["(", "("],
        ["number", "2"],
        [")", ")"],
        ["{", "{"],
        ["keyword", "foo"],
        ["symbol", "bar"],
        ["}", "}"],
        ["[", "["],
        ["number", "1"],
        ["]", "]"],
        ["#", "#"],
        ["{", "{"],
        ["number", "1"],
        ["number", "2"],
        ["}", "}"]
      ]));
    });
  });

  describe("whitespace", () => {
    let source = "#{ 1   2}";
    let result = lex(source).result;

    it("ignores redundant whitespace", () => {
      assert(_.isEqual(result, [
        ["#", "#"],
        ["{", "{"],
        ["number", "1"],
        ["number", "2"],
        ["}", "}"]
      ]));
    });
  });

  describe("comments", () => {
    let source = `foo bar ;comment
      ; more comments
      baz`;
    let result = lex(source).result;

    it("ignores comments", () => {
      assert(_.isEqual(result, [
        ["symbol", "foo"],
        ["symbol", "bar"],
        ["symbol", "baz"]
      ]));
    });
  });

  describe("commas", () => {
    let source = `1,2,3 "foo,bar" ,, foo,bar,:baz,goo`;
    let result = lex(source).result;

    it("treats commas as whitespace in the right places", () => {
      assert(_.isEqual(result, [
        ["number", "1"],
        ["number", "2"],
        ["number", "3"],
        ["string", "foo,bar"],
        ["symbol", "foo"],
        ["symbol", "bar"],
        ["keyword", "baz"],
        ["symbol", "goo"]
      ]));
    });
  });
});
