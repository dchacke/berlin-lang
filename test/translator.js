let util = require("util");
let assert = require("assert");
let { translate } = require("../translator");
let _ = require("lodash");

describe("Translator", () => {
  describe("simple ast", () => {
    let ast =  [
      [
        "function-call",
        [
          "invocable",
          ["symbol", "foo"]
        ],
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
      assert.equal(result, `(foo )(bar ,\`baz\` );\n`);
    });
  });

  describe("keywords", () => {
    let ast = [["keyword", "foo-bar!"]];
    let result = translate(ast);

    it("converts keywords into js symbols", () => {
      assert.equal(result, "Symbol.for(\"foo-bar!\");\n");
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
          "__LESS_THAN____GREATER_THAN__bar;\n");
      });
    });

    describe("without special characters", () => {
      let ast = [["symbol", "foo_bar"]];
      let result = translate(ast);

      it("does not change the symbol literal", () => {
        assert.equal(result, "foo_bar;\n");
      });
    });
  });

  describe("booleans", () => {
    let ast = [
      ["boolean-literal", "true"],
      ["boolean-literal", "false"]
    ];
    let result = translate(ast);

    it("treats booleans as symbols", () => {
      assert.equal(result, "true;\nfalse;\n");
    });
  });

  describe("strings", () => {
    let ast = [["string", "foo_bar"]];
    let result = translate(ast);

    it("surrounds the string with back ticks", () => {
      assert.equal(result, "`foo_bar`;\n");
    });
  });

  describe("numbers", () => {
    let ast = [["number", "12"]];
    let result = translate(ast);

    it("does not touch numbers", () => {
      assert.equal(result, "12;\n");
    });
  });

  describe("arrays", () => {
    describe("nested with numbers", () => {
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
        assert.equal(result, `[1 ,2 ,3 ,[4 ] ,5 ];\n`);
      });
    });

    describe("nested with function calls", () => {
      // This is "[bar(x) y]"
      let ast = [
        [
          "array-literal",
          [
            [
              "function-call",
              [
                "invocable",
                ["symbol", "bar"]
              ],
              [
                "argument-list",
                [
                  ["symbol", "x"]
                ]
              ]
            ],
            ["symbol", "y"]
          ]
        ]
      ];
      let result = translate(ast);

      it("converts the ast into a nested array with a function call", () => {
        assert.equal(result, `[(bar )(x ) ,y ];\n`);
      });
    });
  });

  describe("nested, multi-parameter fn call", () => {
    // This is "foo(bar(x) y)"
    let ast =  [
      [
        "function-call",
        [
          "invocable",
          ["symbol", "foo"]
        ],
        [
          "argument-list",
          [
            [
              "function-call",
              [
                "invocable",
                ["symbol", "bar"]
              ],
              [
                "argument-list",
                [
                  ["symbol", "x"]
                ]
              ]
            ],
            ["symbol", "y"]
          ]
        ]
      ]
    ];
    let result = translate(ast);

    it("converts the ast into a nested js function call", () => {
      assert.equal(result, `(foo )((bar )(x ) ,y );\n`);
    });
  });

  describe("instance method", () => {
    let ast = [
      [
        "function-call",
        [
          "invocable",
          ["symbol", ".concat"]
        ],
        [
          "argument-list",
          [
            ["string", "foo"],
            ["string", " bar"]
          ]
        ]
      ]
    ];
    let result = translate(ast);

    it("invokes the given method on the first argument and passes the remaining arguments", () => {
      assert.equal(result, `((\`foo\` ).concat (\` bar\` ));\n`);
    });
  });

  describe("constructors", () => {
    let ast = [
      [
        "function-call",
        [
          "invocable",
          ["symbol", "Foo."]
        ],
        [
          "argument-list",
          [
            ["string", "bar"],
            ["string", " baz"]
          ]
        ]
      ]
    ];
    let result = translate(ast);

    it("instantiates the constructor with the given arguments", () => {
      assert.equal(result, "(new Foo (`bar` ,` baz` ));\n");
    });
  });

  describe("blocks", () => {
    let ast = [
      [
        "block-declaration",
        [
          ["number", "1"],
          ["number", "2"],
          ["number", "3"]
        ]
      ]
    ];
    let result = translate(ast);

    it("translates the block", () => {
      assert.equal(result, `{1;\n2;\nreturn 3;\n};\n`);
    });
  });

  describe("maps", () => {
    let ast = [
      [
        "map-literal",
        [
          ["number", "1"],
          ["number", "2"],
          ["keyword", "foo"],
          ["string", "bar"]
        ]
      ]
    ];
    let result = translate(ast);

    it("translates the map into a JS Map constructor invocation", () => {
      assert.equal(result, `new Map([[1 ,2 ] ,[Symbol.for("foo") ,\`bar\` ] ]);\n`);
    });
  });

  describe("sets", () => {
    let ast = [
      [
        "set-literal",
        [
          ["number", "1"],
          ["string", "foo"],
          [
            "array-literal",
            [
              ["symbol", "bar"],
              ["keyword", "baz"]
            ]
          ]
        ]
      ]
    ];
    let result = translate(ast);

    it("translates the set into a JS Set constructor invocation", () => {
      assert.equal(result, `new Set([1 ,\`foo\` ,[bar ,Symbol.for("baz") ] ]);\n`);
    });
  });

  describe("function declaration", () => {
    describe("with block", () => {
      describe("with arguments", () => {
        let ast = [
          [
            "function-call",
            [
              "invocable",
              ["symbol", "fn"]
            ],
            [
              "argument-list",
              [
                ["symbol", "x"],
                ["symbol", "y"],
                [
                  "block-declaration",
                  [
                    ["number", "1"],
                    ["number", "2"]
                  ]
                ]
              ]
            ]
          ]
        ];
        let result = translate(ast);

        it("translates the function declaration", () => {
          assert.equal(result, `((x ,y ) => {1;\nreturn 2;\n} );\n`);
        });
      });

      describe("without arguments", () => {
        let ast = [
          [
            "function-call",
            [
              "invocable",
              ["symbol", "fn"]
            ],
            [
              "argument-list",
              [
                [
                  "block-declaration",
                  [
                    ["number", "1"]
                  ]
                ]
              ]
            ]
          ]
        ];
        let result = translate(ast);

        it("translates the function declaration", () => {
          assert.equal(result, `(() => {return 1;\n} );\n`);
        });
      });

      // This one is mainly to check for the correct placement
      // of "return".
      describe("arbitrary, complex example", () => {
        // This ast is
        // fn(vector ~{
        //   vector(1)
        // })(fn(x ~{[x]}))
        let ast = [
          [
            "function-call",
            [
              "invocable",
              [
                "function-call",
                [
                  "invocable",
                  ["symbol", "fn"]
                ],
                [
                  "argument-list",
                  [
                    ["symbol", "vector"],
                    [
                      "block-declaration",
                      [
                        [
                          "function-call",
                          [
                            "invocable",
                            ["symbol", "vector"]
                          ],
                          [
                            "argument-list",
                            [
                              ["number", "1"]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]
                ]
              ]
            ],
            [
              "argument-list",
              [
                [
                  "function-call",
                  [
                    "invocable",
                    ["symbol", "fn"]
                  ],
                  [
                    "argument-list",
                    [
                      ["symbol", "x"],
                      [
                        "block-declaration",
                        [
                          [
                            "array-literal",
                            [
                              ["symbol", "x"]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ]
        ];
        let result = translate(ast);

        it("translates the ast correctly", () => {
          assert.equal(result, `(((vector ) => {return (vector )(1 );
} ) )(((x ) => {return [x ];
} ) );
`);
        });
      });
    });

    describe("without block", () => {
      describe("with arguments", () => {
        let ast = [
          [
            "function-call",
            [
              "invocable",
              ["symbol", "fn"]
            ],
            [
              "argument-list",
              [
                ["symbol", "x"],
                ["symbol", "y"]
              ]
            ]
          ]
        ];

        it("throws without a block", () => {
          assert.throws(() => {
            translate(ast);
          }, /^Function declaration requires code block$/);
        });
      });

      describe("without arguments", () => {
        let ast = [
          [
            "function-call",
            [
              "invocable",
              ["symbol", "fn"]
            ],
            [
              "argument-list",
              []
            ]
          ]
        ];

        it("throws without a block", () => {
          assert.throws(() => {
            translate(ast);
          }, /^Function declaration requires code block$/);
        });
      });
    });
  });
});
