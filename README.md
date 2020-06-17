# Berlin Lang

## Description

Berlin is a small, functional programming language that lives at the intersection between JavaScript and Clojure. It comes with a transpiler that spits out JavaScript code.

## Usage

To transpile a .berlin file, use the [Berlin CLI](https://github.com/dchacke/berlin-cli).

For direct usage within JavaScript, do the following:

First, install the language by running

```bash
$ npm install berlin-lang
```

Then, in your JavaScript file, write:

```js
let { transpile } = require("berlin-lang/transpiler");
transpile("def(foo 1)");
// => "let foo = 1;"
```

The `transpile` function takes a string of Berlin source code and return a string of the equivalent JavaScript source code. You may then `eval` that source code.

## Credit

The Berlin language is intended to be a hybrid between Clojure and JavaScript. Indeed, its transpiler generates JavaScript source code.

References to each specific Clojure function that has inspired the Berlin language are too numerous to mention individually and every time, but you will see Clojure's influence in many of Berlin's functions and special forms, particularly `def`, `let`, and `fn`. If a Berlin function or special form exists by the same name in Clojure, it was probably inspired by that Clojure counterpart.

## ISC License

Copyright 2020 Dennis Hackethal

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

This license is from the Open Source Initiative at https://opensource.org/licenses/ISC.
