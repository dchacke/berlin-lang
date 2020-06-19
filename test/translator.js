let util = require("util");
let assert = require("assert");
let { translate } = require("../translator");
let _ = require("lodash");

describe("Translator", () => {
  describe("functions", () => {
    describe("function invocations", () => {
      describe("simple function invocation", () => {
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

      describe("another nested, multi-parameter fn call", () => {
        // This is "foo(y bar(x))"
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
                ["symbol", "y"],
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
                ]
              ]
            ]
          ]
        ];
        let result = translate(ast);

        it("converts the ast into a nested js function call", () => {
          assert.equal(result, `(foo )(y ,(bar )(x ) );\n`);
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

    describe("fn! declaration", () => {
      describe("not trying to access non-passed parameters", () => {
        let ast = [
          [
            "function-call",
            [
              "invocable",
              ["symbol", "fn!"]
            ],
            [
              "argument-list",
              [
                // a is passed
                ["symbol", "a"],
                ["symbol", "...args"],
                [
                  "block-declaration",
                  [
                    // Accessing a should be fine
                    ["symbol", "a"],
                    // Accessing args should be fine,
                    // both with and without splat
                    ["symbol", "args"],
                    ["symbol", "...args"],
                    // All of the following should be fine
                    // (they weren't explicitly passed, but
                    // they either come as part of an object,
                    // or they are being splat).
                    [
                      "function-call",
                      [
                        "invocable",
                        ["symbol", ".foo"]
                      ],
                      [
                        "argument-list",
                        [
                          ["symbol", "a"],
                        ]
                      ]
                    ],
                    [
                      "function-call",
                      [
                        "invocable",
                        ["symbol", ".-foo"]
                      ],
                      [
                        "argument-list",
                        [
                          ["symbol", "a"],
                        ]
                      ]
                    ],
                    [
                      "function-call",
                      [
                        "invocable",
                        ["symbol", "def"]
                      ],
                      [
                        "argument-list",
                        [
                          ["symbol", "b"],
                          ["number", "3"]
                        ]
                      ]
                    ],
                    // "Accessing" some number should be fine
                    ["number", "1"],
                    // Accessing b should be fine because we
                    // declared it within the fn! using def
                    ["symbol", "b"],
                    [
                      "function-call",
                      [
                        "invocable",
                        ["symbol", "let"]
                      ],
                      [
                        "argument-list",
                        [
                          [
                            "array-literal",
                            [
                              ["symbol", "c"],
                              ["number", "2"]
                            ]
                          ],
                          [
                            "block-declaration",
                            [
                              // Accessing c should be fine because
                              // it was declared within the fn! using
                              // a let block
                              ["symbol", "c"],
                              ["symbol", "...c"]
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

        it("works and creates the same outpout as fn", () => {
          assert.equal(result, `((a ,...args ) => {a;
args;
...args;
((a ).foo ());
((a )[(\`foo\` )]);
let b  = 3 ;
1;
b;
return ((((c ) => {c;
return ...c;
} ) )(2 ) );
} );
`);
        });
      });

      describe("trying to access non-passed parameters", () => {
        describe("not nested", () => {
          let ast = [
            [
              "function-call",
              [
                "invocable",
                ["symbol", "fn!"]
              ],
              [
                "argument-list",
                [
                  [
                    "block-declaration",
                    [
                      // Accessing a should throw
                      ["symbol", "a"]
                    ]
                  ]
                ]
              ]
            ]
          ];

          it("throws", () => {
            assert.throws(() => {
              translate(ast);
            }, /^Cannot access symbol a in strict function. Pass a in fn! declaration instead or declare it using let block$/);
          });
        });

        describe("nested", () => {
          let ast = [
            [
              "function-call",
              [
                "invocable",
                ["symbol", "fn!"]
              ],
              [
                "argument-list",
                [
                  [
                    "block-declaration",
                    [
                      [
                        "function-call",
                        [
                          "invocable",
                          ["symbol", "let"]
                        ],
                        [
                          "argument-list",
                          [
                            [
                              "array-literal",
                              [
                                ["symbol", "b"],
                                ["number", "2"]
                              ]
                            ],
                            [
                              "block-declaration",
                              [
                                // Accessing b should *not* throw because it
                                // was declared in the let block inside the fn!.
                                ["symbol", "b"],
                                // Accessing c *should* throw because it was not
                                // passed to the fn! nor declared within it.
                                ["symbol", "c"]
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

          it("throws", () => {
            assert.throws(() => {
              translate(ast);
            }, /^Cannot access symbol c in strict function. Pass c in fn! declaration instead or declare it using let block$/);
          });
        });

        describe("splat", () => {
          let ast = [
            [
              "function-call",
              [
                "invocable",
                ["symbol", "fn!"]
              ],
              [
                "argument-list",
                [
                  [
                    "block-declaration",
                    [
                      // Accessing a should throw, even
                      // though it starts with a dot, which
                      // would get .-a and .a off the hook.
                      ["symbol", "...a"]
                    ]
                  ]
                ]
              ]
            ]
          ];

          it("throws", () => {
            assert.throws(() => {
              translate(ast);
            }, /^Cannot access symbol a in strict function. Pass a in fn! declaration instead or declare it using let block$/);
          });
        });
      });
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
      describe("all of them", () => {
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

      describe("twice in a row", () => {
        let ast = [["symbol", "->>"]];
        let result = translate(ast);

        it("makes *global* replacements", () => {
          assert.equal(
            result,
            "__MINUS____GREATER_THAN____GREATER_THAN__;\n");
        });
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

  describe("nil", () => {
    let ast = [
      ["null-literal", "nil"]
    ];
    let result = translate(ast);

    it("translates nil to null", () => {
      assert.equal(result, "null;\n")
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
    describe("plain", () => {
      let ast = [["number", "12"]];
      let result = translate(ast);

      it("does not touch the number", () => {
        assert.equal(result, "12;\n");
      });
    });

    describe("positive", () => {
      let ast = [["number", "+12"]];
      let result = translate(ast);

      it("does not touch the number", () => {
        assert.equal(result, "+12;\n");
      });
    });

    describe("negative", () => {
      let ast = [["number", "-12"]];
      let result = translate(ast);

      it("does not touch the number", () => {
        assert.equal(result, "-12;\n");
      });
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

  describe("special forms (other than function declarations)", () => {
    describe("invoke-operator", () => {
      describe("one argument", () => {
        describe("not throw", () => {
          let ast = [
            [
              "function-call",
              [
                "invocable",
                ["symbol", "invoke-operator"]
              ],
              [
                "argument-list",
                [
                  ["symbol", "typeof"],
                  ["number", "1"]
                ]
              ]
            ]
          ];
          let result = translate(ast);

          it("invokes the given operator with the given argument", () => {
            assert.equal(result, "typeof 1 ;\n");
          });
        });

        describe("throw", () => {
          let ast = [
            [
              "function-call",
              [
                "invocable",
                ["symbol", "invoke-operator"]
              ],
              [
                "argument-list",
                [
                  ["symbol", "throw"],
                  ["string", "exception message"]
                ]
              ]
            ]
          ];
          let result = translate(ast);

          it("wraps the operator invocation with a self-invoking fns", () => {
            assert.equal(result, "(() => {throw `exception message` })();\n");
          });
        });
      });

      describe("two arguments", () => {
        let ast = [
          [
            "function-call",
            [
              "invocable",
              ["symbol", "invoke-operator"]
            ],
            [
              "argument-list",
              [
                ["symbol", "==="],
                ["number", "1"],
                ["number", "2"]
              ]
            ]
          ]
        ];
        let result = translate(ast);

        it("invokes the given operator by surrounding it with the given arguments", () => {
          assert.equal(result, "(1  === 2 );\n");
        });
      });

      describe("neither one nor two arguments", () => {
        let ast1 = [
          [
            "function-call",
            [
              "invocable",
              ["symbol", "invoke-operator"]
            ],
            [
              "argument-list",
              [
                ["symbol", "==="]
              ]
            ]
          ]
        ];

        let ast2 = [
          [
            "function-call",
            [
              "invocable",
              ["symbol", "invoke-operator"]
            ],
            [
              "argument-list",
              [
                ["symbol", "==="],
                ["number", "1"],
                ["number", "2"],
                ["number", "3"]
              ]
            ]
          ]
        ];

        it("throws for no arguments", () => {
          assert.throws(() => {
            translate(ast1);
          }, /^Operators require exactly one or two arguments. 0 given$/);
        });

        it("throws for three arguments", () => {
          assert.throws(() => {
            translate(ast2);
          }, /^Operators require exactly one or two arguments. 3 given$/);
        });
      });
    });

    describe("set", () => {
      let ast = [
        [
          "function-call",
          [
            "invocable",
            ["symbol", "set"]
          ],
          [
            "argument-list",
            [
              ["symbol", "a"],
              ["number", "1"],
              ["number", "3"]
            ]
          ]
        ]
      ];
      let result = translate(ast);

      it("translates the call to set into an assignment", () => {
        assert.equal(result, `((a )[(1 )] = (3 ));\n`);
      });
    });

    describe("access", () => {
      let ast = [
        [
          "function-call",
          [
            "invocable",
            ["symbol", ".-foo"]
          ],
          [
            "argument-list",
            [
              ["symbol", "a"]
            ]
          ]
        ]
      ];
      let result = translate(ast);

      it("translates into a field access", () => {
        assert.equal(result, `((a )[(\`foo\` )]);\n`);
      });
    });

    describe("let", () => {
      let ast = [
        [
          "function-call",
          [
            "invocable",
            ["symbol", "let"]
          ],
          [
            "argument-list",
            [
              [
                "array-literal",
                [
                  ["symbol", "a"],
                  ["number", "1"],

                  ["symbol", "b"],
                  ["number", "2"],

                  ["symbol", "c"],
                  [
                    "function-call",
                    [
                      "invocable",
                      ["symbol", "plus"]
                    ],
                    [
                      "argument-list",
                      [
                        ["symbol", "a"],
                        ["symbol", "b"]
                      ]
                    ]
                  ]
                ]
              ],
              [
                "block-declaration",
                [
                  ["symbol", "c"]
                ]
              ]
            ]
          ]
        ]
      ];
      let result = translate(ast);

      it("translates the call to let into nested functions", () => {
        assert.equal(result, `((((a ) => {return (((b ) => {return (((c ) => {return c;
} ) )((plus )(a ,b ) );
} ) )(2 );
} ) )(1 ) );
`);
      });
    });

    describe("uneven number of elements in array", () => {
      let ast = [
        [
          "function-call",
          [
            "invocable",
            ["symbol", "let"]
          ],
          [
            "argument-list",
            [
              [
                "array-literal",
                [
                  ["symbol", "a"],
                ]
              ],
              [
                "block-declaration",
                [
                  ["symbol", "c"]
                ]
              ]
            ]
          ]
        ]
      ];

      it("throws an exception requesting an even number of elements", () => {
        assert.throws(() => {
          translate(ast);
        }, /^Uneven number of elements in let$/);
      });
    });

    describe("var", () => {
      describe("simple variable declaration", () => {
        let ast = [
          [
            "function-call",
            [
              "invocable",
              ["symbol", "def"]
            ],
            [
              "argument-list",
              [
                ["symbol", "a"],
                ["number", "1"]
              ]
            ]
          ]
        ];
        let result = translate(ast);

        it("translates the variable declaration", () => {
          assert.equal(result, `let a  = 1 ;\n`);
        });
      });
    });

    describe("if", () => {
      describe("with else branch", () => {
        let ast = [
          [
            "function-call",
            [
              "invocable",
              ["symbol", "if"]
            ],
            [
              "argument-list",
              [
                ["boolean-literal", "true"],
                [
                  "block-declaration",
                  [
                    ["number", "1"]
                  ]
                ],
                [
                  "block-declaration",
                  [
                    ["number", "2"]
                  ]
                ]
              ]
            ]
          ]
        ];
        let result = translate(ast);

        it("translates the if special form", () => {
          assert.equal(result, `((true ) ?
(() => {return 1;
} )()
:
(() => {return 2;
} )());
`);
        });
      });

      describe("without else branch", () => {
        let ast = [
          [
            "function-call",
            [
              "invocable",
              ["symbol", "if"]
            ],
            [
              "argument-list",
              [
                ["boolean-literal", "true"],
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

        it("translates the if special form", () => {
          assert.equal(result, `((true ) ?
  (() => {return 1;
} )() : undefined);
`);
        });
      });

      describe("without if branch", () => {
        let ast = [
          [
            "function-call",
            [
              "invocable",
              ["symbol", "if"]
            ],
            [
              "argument-list",
              [
                ["boolean-literal", "true"]
              ]
            ]
          ]
        ];

        it("throws", () => {
          assert.throws(() => {
            translate(ast);
          }, /^If form requires at least two arguments$/);
        });
      });
    });
  });
});
