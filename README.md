# Berlin

Poor man's Clojure.

## Description

Berlin is a small, functional programming language that lives at the intersection between JavaScript and Clojure. It comes with a transpiler that spits out JavaScript code.

## Example Syntax

```ruby
def(filter fn(f coll
  let([coll arr(coll)]
    if(empty?(coll)
      []
      let([el first(coll)]
        if(f(el)
          cons(el filter(f rest(coll)))
          filter(f rest(coll))))))))
```

The above code declares a function called `filter`. It takes a function and a collection and returns an array of only those items for which the given function returns a truthy value.

## Rationale

Berlin makes JavaScript development more enjoyable by reducing JavaScript to its best parts. There are no classes, prototypes, wacky equalities, operators, or expressions. Semicolons and commas play a small role. There are really only functions and data.

Additionally, Berlin is meant to be a gateway to programming in Clojure. Directly jumping from JavaScript to Clojure can be difficult because one has to learn many new concepts *and* a new syntax at the same time. Berlin syntax has elements from both languages with some changes mixed in and uses some but not all Clojure concepts. Both of these characteristics should make for a smooth transition from JavaScript to Berlin, and then, optionally, from Berlin to Clojure.

That being said, Berlin is meant to stand and provide value on its own. Even if you don't intend ever to use Clojure, I hope you will find Berlin useful.

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

The `transpile` function takes a string of Berlin source code and returns a string of the equivalent JavaScript source code. You may then `eval` that source code.

## I Came Here from JavaScript--What's New?

Overall, Berlin is a much simpler language than JavaScript because it doesn't have many of JavaScript's superfluous features. That said, here's a quick rundown of what Berlin *does* have:

### Literals

Berlin introduces a keyword literal. Keywords begin with a colon: `:foo`. Under the hood, keyword literals create a call to `Symbol.for`. So, `:foo` results in `Symbol.for("foo")`. Keywords work well as keys in maps.

Speaking of maps, Berlin's map literal looks like this: `~{:foo "bar"}`. Map literals do not create JS objects, but [maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), allowing you to use not only strings and numbers as keys, but anything at all.

Berlin also has a set literal: `#{1 2 3}`. These literals create JS [sets](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) under the hood.

While JavaScript has three (!) different types of strings--single-quote, double-quote, and backtick strings--Berlin only offers double-quote strings. They support line breaks.

Berlin uses `nil` in place of `null`. Otherwise, Berlin uses all the same data types as JavaScript: numbers, arrays, booleans, and `undefined`.

### Mutation

Berlin avoids mutation. None of the core functions mutate data. Mutation can still be achieved through JavaScript interop, but is discouraged.

### Support for Special Characters

You can use virtually any special character for variable names. Here are some examples:

```clojure
empty?
do-stuff!
+
->?nil
```

These are all valid Berlin symbols.

### Operators

There are no operators in Berlin. Instead of using `=`, `==`, `===`, `+`, `-`, `||`, `&&`, etc., you use the corresponding functions and special forms.

For example, where in JS you'd write `let x = 1 + (a || b)`, in Berlin you write `def(x +(1 or(a b))`.

### Implicit Return Statements

There are no return statements in Berlin. A function's or form's last value is its return value.

### Special Forms

Several special forms exist in Berlin. The most important are `def`, `let`, and `if`. You use `def` to declare variables at the top-level scope. These are variables you need to access across an entire file, say.

```ruby
def(x 1)
def(y 2)

+(x y) ; => 3
```

Variables declared using `let` are only available in the scope of the `let` form's block:

```ruby
let([x 1
     y 2]
  +(x y))

; => the whole let block returns 3

; Trying to access x outside the let block:
x
; => ReferenceError: x is not defined
```

### Functions

While function invocations look--for the most part--the same as in JS, function declarations look quite a bit different:

```ruby
fn({})
```

This code declares a blank function. It takes no parameters and does nothing.

```ruby
fn({a})
```

This example declares a function that returns some variable `a`, which variable presumably exists in the context outside the function.

Those curly braces are *blocks*. They allow you to write multi-line code. They can only be used in functions and special forms.

Since the function body above uses only a single line, you can omit the braces:

```ruby
fn(a)
```

How do we declare function parameters?

```ruby
fn(a a)
```

This function is the identity function. It takes a parameter `a` and returns it. The last item in the parameter list is not a parameter at all but the function's body.

Here's a more complex example:

```ruby
fn(a b +(a b))
```

This function takes parameters `a` and `b` and returns the addition of the two.

If you need to do more than one thing in the function body, use curly braces:

```ruby
fn(a b {
  log("Computing...")
  +(a b)})
```

Note, however, that much code can be written without any curly braces at all, in particular because of special forms:

```ruby
fn(a b
  let([c +(a b)
       _ log("computing...")
       result -(c 2)]
    result))
```

Strictly speaking, the `let` block is the single last argument passed to the function declaration. This block's body could in turn be wrapped in curly braces, but there is no need to because it only contains one statement: the return of the `result` variable.

As a rule of thumb--but not as a universal law--the fewer curly braces your code has, the better, as curly braces are indicative of imperative programming/side effects.

### Strict Functions

Berlin introduces a new feature called "strict functions." They are based on an idea [Brian Will](https://www.youtube.com/user/briantwill) mentioned in one of his videos. Strict functions can only access state explicitly passed as parameters. They cannot even access core functions unless they are passed.

Here is an example of a regular function called `foo`:

```ruby
def(b "bar")

def(foo fn(a
  log(a b)))

foo("foo")
; prints foo bar
```

Here is the same function, but declared as a strict function, as signified by the `!`:

```ruby
def(b "bar")

def(foo! fn!(a ; <-- here it says fn! instead of fn
  log(a b)))

foo!("foo")
; The transpiler throws: "Cannot access symbol b in strict function. Pass b in fn! declaration instead or declare it using let block"
```

To make this example work, `b` needs to be passed in explicitly:

```ruby
def(foo! fn!(a b ; b is now a parameter
  log(a b))

foo("foo" b) ; b is now passed in explicitly
; prints foo bar
```

Why use strict functions? Because they have greater referential transparency and, therefore, greater modularity. Strict functions do not *guarantee* referential transparency as they may be passed impure functions, which they can invoke. Invoking impure functions in strict functions is discouraged. Strict functions may cause side effects and, therefore, do not guarantee purity--however, a strict function that does not cause side effects and does not invoke impure functions is always pure.

As a naming convention, strict functions' names should end with a `!`.

### Miscellaneous

There are no commas or semicolons--at least not how they're used in JS. Commas are treated as whitespace and discouraged. Semicolons are used for comments.

Berlin borrows a feature from Ruby that allows you to use underscores as thousands separator: `1_000_000`. These underscores are optional, can be placed anywhere inside a number, and won't alter the number's value in any way.

Parentheses are used exclusively for function invocations. There are no groupings in Berlin. Self-invoking functions don't need to be wrapped in parentheses, either: `fn(a a)(1)` is a self-invoking identity function.

## I Came Here from Clojure(Script)--Should I Use This?

It depends. If there is nothing standing in the way of your using Clojure, go with Clojure. Berlin has only a small feature set compared to Clojure. It does not have mulit-arity functions, macros, atoms, homoiconicity, or even lists. On the other hand, if your team prefers JavaScript over Clojure(Script), Berlin may prove a promising middle ground.

Those functions of Berlin that exist by the same name in Clojure almost all have roughly the same denotation as their Clojure counterparts, so if you do decide to use Berlin, you should feel right at home. Note that all of Berlin's functions were reimplemented from scratch, so they may differ structurally and performance wise from those in Clojure. Arrays take the place of lists in Berlin, and functions like `cons`, `conj`, etc operate on arrays only.

## Is This Ready for Production?

No! Berlin grew out of a fun side project and has not been battle tested nearly enough to be used in production. This transpiler is the first one I have ever written, and I had no idea what I was doing going in.

Berlin is currently in an alpha phase and you should expect to run into bugs. That being said, I encourage you to try it out and contribute.

## Credit

The core functions of the Berlin language are mostly a subset of Clojure's core, with a few additional functions. Berlin also adopts several of Clojure's design patterns.

References to each specific Clojure feature that has inspired the Berlin language would be too numerous to mention individually and every time, but you will see Clojure's influence in many of Berlin's functions and special forms, particularly `def`, `let`, and `fn`. If a Berlin function or special form exists by the same name in Clojure, it was probably inspired by that Clojure counterpart.

## ISC License

Copyright 2020 Dennis Hackethal

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

This license is from the Open Source Initiative at https://opensource.org/licenses/ISC.
