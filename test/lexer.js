let util = require("util");
let assert = require("assert");
let { lex } = require("../lexer");
let _ = require("lodash");

describe("Lexer", () => {
  describe("primitives", () => {
    let source = `123 :foo "bar" baz 4.5 -1 +2`;
    let result = lex(source).result;

    it("tokenizes primitives", () => {
      assert(_.isEqual(result, [
        ["number", "123"],
        ["keyword", "foo"],
        ["\"", "\""],
        ["string", "bar"],
        ["\"", "\""],
        ["symbol", "baz"],
        ["number", "4.5"],
        ["number", "-1"],
        ["number", "+2"]
      ]));
    });
  });

  describe("numbers", () => {
    let source = "123_4567_89_0";
    let result = lex(source).result;

    it("ignores underscores in numbers", () => {
      assert(_.isEqual(result, [
        ["number", "1234567890"]
      ]));
    });
  });

  describe("special characters", () => {
    describe("sets, maps, and arrays", () => {
      let source = "foo(2) {:foo bar} [1] #{1 2} ~{1 2 3}";
      let result = lex(source).result;

      it("handles special characters signifying sets, maps, blocks, and arrays", () => {
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
          ["}", "}"],
          ["~", "~"],
          ["{", "{"],
          ["number", "1"],
          ["number", "2"],
          ["number", "3"],
          ["}", "}"],
        ]));
      });
    });

    describe("not as part of primitives", () => {
      let source = "foo() :foo) bar{ 1} 1( ~\"foo\"";
      let result = lex(source).result;

      it("does not make special characters part of primitives", () => {
        assert(_.isEqual(result, [
          ["symbol", "foo"],
          ["(", "("],
          [")", ")"],
          ["keyword", "foo"],
          [")", ")"],
          ["symbol", "bar"],
          ["{", "{"],
          ["number", "1"],
          ["}", "}"],
          ["number", "1"],
          ["(", "("],
          ["~", "~"],
          ["\"", "\""],
          ["string", "foo"],
          ["\"", "\""],
        ]));
      });
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
        // It includes the comma here since it's part
        // of a string.
        ["\"", "\""],
        ["string", "foo,bar"],
        ["\"", "\""],
        ["symbol", "foo"],
        ["symbol", "bar"],
        ["keyword", "baz"],
        ["symbol", "goo"]
      ]));
    });
  });

  describe("completeness", () => {
    describe("complete examples", () => {
      let examples = [
        `1 2 3`,
        `"foo"`,
        `"fo\"o"`,
        `fn({})`,
        `def(a 1)`,
        `let([a 1] a)`,
        `def(repeat fn(a b
          if(>=(a 1)
            cons(b repeat(dec(a) b))
            [])))`
      ];

      examples.forEach(source => {
        it(`"${source}" is complete`, () => {
          assert(lex(source).unclosedDelimiters.length === 0);
        });
      });
    });

    describe("incomplete examples", () => {
      let examples = {
        "foo(": ["("],
        "\"foo)": ["\""],
        "fn({a)": ["(", "{", ")"],
        "def(a": ["("],
        "let([a 1]": ["("],
        "let([a 1] {": ["(", "{"],
        "1 foo() let([a 1] { bar()": ["(", "{"],
        "def(repeat fn(a b\nif(>=(a": ["(", "(", "(", "("]
      };

      for (let key in examples) {
        it(`"${key}" is incomplete`, () => {
          assert(_.isEqual(lex(key).unclosedDelimiters, examples[key]));
        });
      };
    });
  });
});
