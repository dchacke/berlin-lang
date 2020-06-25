# Berlin

Poor man's Clojure.

## Description

Berlin is a small, functional programming language that lives at the intersection between JavaScript and Clojure. It comes with a transpiler that spits out JavaScript code.

You can find the source code and the Readme with credits, license information, rationale and additional information [here](https://github.com/dchacke/berlin-lang).

To try out Berlin in a REPL, use the [CLI](https://github.com/dchacke/berlin-cli).

Berlin is currently in an unstable alpha phase. Expect rapid breaking changes.

## Literals and Data Structures

Berlin comes with the following literals:

- Strings: `"foo"`
- Numbers: `1`, `2.5`, `-3`
- Booleans: `true`, `false`
- Keywords: `:foo`
- Null value: `nil`
- Undefined value: `undefined`

Keywords implement JavaScript's [symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol).

Berlin further has the following data structures:

- Arrays: `[1 2 3]`
- Maps: `~{:foo 1 :bar "hi"}`
- Sets: `#{1 2 3}`

Maps implement JavaScript [maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), and sets implement JavaScript [sets](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set).

## "Typography"

Berlin treats commas as whitespace. Use of commas is discouraged.
Semicolons are used to start a single-line comment:

```js
; this is a comment
```

Underscores can be used as optional thousands separators in numbers:

```js
1_000_000
```

## Mutation

None of Berlin's core functions employ mutation. Mutation is discouraged, but if you must mutate, use JavaScript interop (see below).

## API

### Special Forms

Special forms look--for the most part--just like function invocations, but they are not declared as functions anywhere. Instead, the transpiler recognizes them to apply a certain logic. That logic depends on the particular special form.

All special forms take at least one block. Blocks are indicated by curly braces `{}`. When blocks only contain a single statement, the curly braces can be omitted. This applies to all special forms.

Blocks can only be used in special forms.

#### if

Evaluates the given statement and, if truthy, executes the first branch, or, if falsey, the second branch (if given).

##### Arguments

- Anything
- Block
- Optional block

##### Returns

Anything

##### Examples

```js
if (true 1 2) ; => 1
if (false 1 2) ; => 2
if (false 1) ; => undefined
if (true {
  log("computing...")
  1} {
  log("that didn't work.")
  2}) ; => 1
```

#### fn

Declares a function. It looks just like a function invocation, but takes only symbols (i.e., variable names) as arguments, and a block as the last argument.

##### Arguments

- Variable number of symbols
- Block

##### Returns

Function

##### Examples

```js
fn(a a) ; => Function
fn(a a)(1) ; => 1
fn(a log(a))(1) ; prints "1" then returns undefined
fn(a b {
  log("computing")
  +(a b)})(1 2) ; => 3
```

#### fn!

Like `fn` but strict, meaning the declared function must only access the arguments it was given.

The purpose of strict functions is to increase their referential transparency.

As a convention, a strict function's name should end with `!`, e.g. `def(identity! fn!(a a))`.

##### Arguments

- Variable number of symbols
- Block

##### Returns

Function

##### Examples

```js
fn!(a a) ; => Function
fn!(a a)(1) ; => 1

def(a 1)
fn!({
  log("I want to return a...")
  a}) ; transpiler throws: Cannot access symbol a in strict function. Pass a in fn! declaration instead or declare it using let block
```

#### def

Used for top-level variable declaration. `def` should not be used for re-assignments.

##### Arguments

- Symbol
- Anything

##### Returns

`undefined`

##### Examples

```js
def(a 1) ; => 1
```

#### let

Used for variable declaration. `let` takes an array of symbols and values for variable declaration and a block in which the declared variables are accessible.

##### Arguments

- Array
- Block

##### Returns

Anything

##### Examples

```js
let([a 1
     b 2]
  +(a b)) ; => 3
```

### Basics

#### defined?

Returns true if the given value is not `undefined`.

##### Arguments

- Anything

##### Returns

Boolean

##### Examples

```js
defined?("foo") ; => true
defined?(undefined) ; => false
```

#### undefined?

Returns true if the given value is `undefined`.

##### Arguments

- Anything

##### Returns

Boolean

##### Examples

```js
undefined?("foo") ; => true
undefined?(undefined) ; => false
```

#### =

Does a deep comparison of the two given values to see if they are equivalent.

##### Arguments

- Anything
- Anything

##### Returns

Boolean

##### Examples

```js
=(1 1) ; => true
=(1 2) ; => false
=([] []) ; => true
=(~{:foo :bar} ~{:foo :bar}) ; => true
=(true false) ; => false
=([] [1 2 3]) ; => false
````

#### identity

Returns the given argument.

##### Arguments

- Anything

##### Returns

Anything

##### Examples

```js
identity(1) ; => 1
identity([]) ; => []
```

#### or

Returns the first truthy or last falsey argument. All arguments are evaluated before invocation.

##### Arguments

Variable number of anything.

##### Returns

The first truthy or last falsey argument.

##### Examples

```js
or(1 2 3) ; => 1
or(false 2) ; => 2
or(false nil) ; => nil
```

#### and

Returns the first falsey argument or last argument (going from left to right). All arguments are evaluated before invocation.

##### Arguments

Variable number of anything.

##### Returns

The first truthy or last falsey argument. `and()` returns `true`.

##### Examples

```js
and(1 2 3) ; => 3
and(false 2) ; => false
and(false nil) ; => false
```

### Math & Numbers

#### +

Adds the given numbers.

##### Arguments

A variable number of numbers.

##### Returns

Number

##### Examples

```js
+() ; => 0
+(1) ; => 1
+(1 2) ; => 3
+(1 2 3) ; => 6
+(1 -1) ; => 0
```

#### -

Subtracts the given numbers.

##### Arguments

A variable number of numbers (at least one).

##### Returns

Number

##### Examples

```js
-(1) ; => -1
-(1 2) ; => -1
-(1 2 3) ; => -4
-(1 -1) ; => 2
```

#### *

Subtracts the given numbers.

##### Arguments

A variable number of numbers.

##### Returns

Number

##### Examples

```js
*() ; => 1
*(1) ; => 1
*(1 2) ; => 2
*(1 2 3) ; => 6
*(1 -1) ; => -1
```

#### /

Divides the given numbers.

##### Arguments

A variable number of numbers (at least one).

##### Returns

Number

##### Examples

```js
/(2) ; => 1/2
/(1 2) ; => 1/2
/(1 2 10) ; => 0.05
/(1 -1) ; => -1
```

#### %

Returns the remainder of dividing the first given number by the second.

##### Arguments

- Number
- Number

##### Returns

Number

##### Examples

```js
%(10 5) ; => 0
%(10 4) ; => 2
```

#### inc

Increments the given number.

##### Arguments

- Number

##### Returns

Number

##### Examples

```js
inc(1) ; => 2
```

#### dec

Decrements the given number.

##### Arguments

- Number

##### Returns

Number

##### Examples

```js
dec(1) ; => 0
```

#### zero?

Checks if the given argument is equal to the number `0`.

##### Arguments

- Anything

##### Returns

Boolean

##### Examples

```js
zero?(0) ; => true
zero?("foo") ; => false
```

#### even?

Checks if the given number is even.

##### Arguments

- Number

##### Returns

Boolean

##### Examples

```js
even?(2) ; => true
even?(1) ; => false
even?(0) ; => false
```

#### odd?

Checks if the given number is odd.

##### Arguments

- Number

##### Returns

Boolean

##### Examples

```js
odd?(2) ; => false
odd?(1) ; => true
odd?(0) ; => false
```

#### max

Determines the maximum of the given numbers.

##### Arguments

- Variable number of numbers (at least one)

##### Returns

Number

##### Examples

```js
max(1 2 3) ; => 3
max(1) ; => 1
```

#### min

Determines the minimum of the given numbers.

##### Arguments

- Variable number of numbers (at least one)

##### Returns

Number

##### Examples

```js
min(1 2 3) ; => 1
min(1) ; => 1
```

#### int?

Determines whether the given argument is an integer.

##### Arguments

- Anything

##### Returns

Boolean

##### Examples

```js
int?(1) ; => true
int?(1.5) ; => false
int?("foo") ; => false
```

#### float?

Determines whether the given argument is a float.

##### Arguments

- Anything

##### Returns

Boolean

##### Examples

```js
float?(1) ; => false
float?(1.5) ; => true
float?("foo") ; => false
```

#### pos?

Determines whether the given number is positive.

##### Arguments

- Anything

##### Returns

Boolean

##### Examples

```js
pos?(1) ; => true
pos?(1.5) ; => true
pos?(0) ; => false
pos?(-1) ; => false
```

#### neg?

Determines whether the given number is negative.

##### Arguments

- Anything

##### Returns

Boolean

##### Examples

```js
neg?(1) ; => false
neg?(1.5) ; => false
neg?(0) ; => false
neg?(-1) ; => true
neg?(-1.5) ; => true
```

#### rand

Returns a random number between 0 (inclusive) and 1 (exclusive).

##### Arguments

None

##### Returns

Number

##### Examples

```js
rand() ; => 0.2351
```

#### rand

Returns a random integer between 0 (inclusive) and the given number (exclusive).

##### Arguments

- Number

##### Returns

Integer

##### Examples

```js
rand-int(10) ; => 7
```

### Primitives

#### str

Returns a new string that is the result of concatenating the given arguments.

##### Arguments

Variable number of anything.

##### Returns

String

##### Examples

```js
str("foo" "bar") ; => "foobar"
str(1 2) ; => "12"
str("foo" 1 2) ; => "foo12"
str([] "foo" nil) ; => "foonull"
```

#### string?

Determines if the given argument is a string.

##### Arguments

- Anything

##### Returns

Boolean

##### Examples

```js
string?("foo") ; => true
string?(nil) ; => false
string?([]) ; => false
```

#### number?

Determines if the given argument is a number.

##### Arguments

- Anything

##### Returns

Boolean

##### Examples

```js
number?(1) ; => true
number?(2.5) ; => true
number?(nil) ; => false
number?([]) ; => false
```

#### keyword?

Determines if the given argument is a keyword.

##### Arguments

- Anything

##### Returns

Boolean

##### Examples

```js
keyword?(:foo) ; => true
keyword?("nope") ; => false
keyword?(nil) ; => false
keyword?([]) ; => false
```

#### boolean?

Determines if the given argument is a boolean.

##### Arguments

- Anything

##### Returns

Boolean

##### Examples

```js
boolean?(true) ; => true
boolean?(false) ; => true
boolean?(nil) ; => false
boolean?([]) ; => false
```

#### nil?

Determines if the given argument is `nil`.

##### Arguments

- Anything

##### Returns

Boolean

##### Examples

```js
nil?(nil) ; => true
nil?(false) ; => false
nil?([]) ; => false
```

#### true?

Determines if the given argument is `true`.

##### Arguments

- Anything

##### Returns

Boolean

##### Examples

```js
true?(true) ; => true
true?(false) ; => false
true?([]) ; => false
```

#### false?

Determines if the given argument is `false`.

##### Arguments

- Anything

##### Returns

Boolean

##### Examples

```js
false?(false) ; => false
false?(false) ; => false
false?([]) ; => false
```

#### truthy?

Determines if the given argument has a truthy value. Returns true for anything but `nil`, `false`, and `undefined`.

##### Arguments

- Anything

##### Returns

Boolean

##### Examples

```js
truthy?(true) ; => true
truthy?(false) ; => false
truthy?([]) ; => true
truthy?(0) ; => true
truthy?("") ; => true
```

#### falsey?

Determines if the given argument is `false`. Returns true only for `nil`, `false`, and `undefined`.

#### not?

Alias for `falsey?`.

##### Arguments

- Anything

##### Returns

Boolean

##### Examples

```js
falsey?(true) ; => false
falsey?(false) ; => true
falsey?(nil) ; => true
falsey?([]) ; => false
falsey?("") ; => false
falsey?(0) ; => false
```

### Collections

A collection is either an array, a map, or a set.

#### array?

Determines if the given argument is an array.

##### Arguments

- Anything

##### Returns

Boolean

##### Examples

```js
array?([1 2 3]) ; => true
array?("foo") ; => false
array?(nil) ; => false
array?(~{}) ; => false
array?(#{}) ; => false
```

#### set?

Determines if the given argument is a set.

##### Arguments

- Anything

##### Returns

Boolean

##### Examples

```js
set?(#{1 2 3}) ; => true
set?("bar") ; => false
set?(nil) ; => false
set?(~{}) ; => false
set?([]) ; => false
```

#### map?

Determines if the given argument is a map.

##### Arguments

- Anything

##### Returns

Boolean

##### Examples

```js
map?(~{}) ; => true
map?([1 2 3]) ; => false
map?("foo") ; => false
map?(nil) ; => false
map?(#{}) ; => false
```

#### count

Determines the given collection's size.

##### Arguments

- Collection

##### Returns

Number

##### Examples

```js
count([1 2 3]) ; => 3
count(#{1 2}) ; => 2
count(~{:foo :bar :baz :boo}) ; => 2 (because there are two *pairs*)
count([]) ; => 0
```

#### empty?

Determines if the given collection does not have any entries.

##### Arguments

- Collection or `nil`

##### Returns

Boolean

##### Examples

```js
empty?([]) ; => true
empty?(~{}) ; => true
empty?(~{:foo :bar}) ; => false
empty?(#{1}) ; => false
empty?(nil) ; => true
```

#### first

Returns the first item of the given collection. Returns `nil` if the collection is empty.

##### Arguments

- Collection or `nil`

##### Returns

Anything

##### Examples

```js
first([1 2 3]) ; => 1
first(~{"foo" :bar :sna :fu}) ; => ["foo" :bar]
first(#{}) ; => nil
first(nil) ; => nil
```

#### ffirst

The same as calling `first(first(coll))`.

##### Arguments

- Collection or `nil`

##### Returns

- Anything

##### Examples

```js
ffirst([[1]]) ; => 1
ffirst(#{[2 3 4]}) ; => 4
ffirst(nil) ; => nil
ffirst([]) ; => nil
```

#### second

Like `first` but for the second item in the collection.

#### third

Like `first` but for the third item in the collection.

#### last

Returns the last item in the given collection. Returns `nil` if the collection is empty.

##### Arguments

- Collection or `nil`

##### Returns

Anything

##### Examples

```js
last([1 2 3]) ; => 3
last(~{:foo :bar "boo" "bar"}) ; => ["boo" "bar"]
last(nil) ; => nil
last([]) ; => nil
```

#### butlast

Returns an array containing all but the last items from the given collection.

##### Arguments

- Collection or `nil`

##### Returns

Array or `nil`

##### Examples

```js
butlast([1 2 3]) ; => [1 2]
butlast(#{1 2 3}) ; => [1 2]
butlast(nil) ; => nil
```

#### rest

Returns an array containing all but the first item from the given collection.

##### Arguments

- Collection or `nil`

##### Returns

Array

##### Examples

```js
rest([1 2 3]) ; => [2 3]
rest(#{1 2 3}) ; => [2 3]
rest(~{:foo :bar "bar" "baz"}) ; => [["bar" "baz"]]
rest(nil) ; => nil
rest([]) ; => []
```

#### next

Like `rest`, but returns `nil` if the given collection is empty.

#### cons

`cons`trucs a new array with the given items.

##### Arguments

- Anything
- Collection or `nil`

##### Returns

Array

##### Examples

```js
cons(1 []) ; => [1]
cons(1 [2 3]) ; => [1 2 3]
cons(0 #{1 2 3}) ; => [0 1 2 3]
cons(0 nil) ; => [0]
cons(:foo ~{}) ; => [:foo]
```

#### conj

`conj`oins the given arguments onto the given collection.

##### Arguments

- Collection or `nil`
- Variable number of anything

##### Returns

A new collection of the same type containing the new elements. If the collection is an array, the new elements are added at the end.

##### Examples

```js
conj([1 2] 3 4) ; => [1 2 3 4]
conj(#{1} 2 3 4) ; => #{1 2 3 4}
conj(~{} [:foo :bar]) ; => ~{:foo :bar}
conj(nil :foo) ; => [:foo]
```

#### disj

"Removes" the given arguments from the given set.

##### Arguments

- Set or `nil`
- Variable number of anything

##### Returns

Set

##### Examples

```js
disj(#{1 2 3} 2 3) ; => #{1}
disj(#{1 2 3} 4) ; => #{1 2 3}
disj(nil 1 2 3) ; => nil
```

#### assoc

`assoc`iates the given array or map at the given keys with the given values. For arrays, the given key must be a number between 0 and the arrays's length (inclusive) at each step.

##### Arguments

- Array, map, or `nil`
- Even number of anything

##### Returns

Array or map

##### Examples

```js
assoc([1 2 3] 0 5) ; => [5 2 3]
assoc({:foo :bar} :boo :baz 1 2) ; => {:foo :bar :boo :baz 1 2}
assoc([1] 1 2) ; => [1 2]
assoc([1] 1 2 2 3) ; => [1 2 3]
```

#### assoc-in

Like `assoc`, but takes a nested key. Creates maps for all non-existent keys at every step.

##### Arguments

- Array, map, or `nil`
- Array
- Anything

##### Returns

Array or map

##### Examples

```js
assoc-in([1 [2 3]] [1 0] 0) ; => [1 [0 3]]
assoc-in([1 [2 3]] [1 2 :foo] 0) ; => [1 [2 3 {:foo 0}]]
```

#### dissoc

"Removes" the given fields from the given map.

##### Arguments

- Map or `nil`
- Variable number of anything

##### Returns

Map

##### Examples

```js
dissoc(~{:foo :bar :boo :baz} :foo :boo) ; => ~{}
dissoc(nil :foo :bar) ; => nil
```

#### update

"Updates" the given map or array by `assoc`ing with the result from invoking the given function with the element at the given key and any additional arguments.

##### Arguments

- Map, array, or `nil`
- Anything
- Function
- Variable number of anything

##### Returns

Map or array

##### Examples

```js
update([0 2 3] 0 inc) ; => [1 2 3]
update(~{:foo 2} :foo * 3) ; => ~{:foo 6}
update(nil 1 inc) ; => ~{1 1}
```

#### update

Like `update`, but works for deeply nested keys.

##### Arguments

- Map, array, or `nil`
- Array
- Function
- Variable number of anything

##### Returns

Map or array

##### Examples

```js
update-in(~{:foo [2]} [:foo 0 * 3]) ; => ~{foo [6]}
```

#### take

Returns an array of the first n items of the given collection.

##### Arguments

- Number
- Collection or `nil`

##### Returns

Array

##### Examples

```js
take(2 [1 2 3 4]) ; => [1 2]
take(5 [1 2]) ; => [1 2]
take(-1 [1 2]) ; => []
take(2 nil) ; => []
```

#### drop

Returns an array without the first n items of the given collection.

##### Arguments

- Number
- Collection or `nil`

##### Returns

Array

##### Examples

```js
drop(2 [1 2 3 4]) ; => [3 4]
drop(5 [1 2]) ; => []
drop(-1 [1 2]) ; => [1 2]
drop(2 nil) ; => []
```

#### arr

Returns a new array containing the items of the given collection. When given an array, it returns that array untouched. When given `nil`, it returns an empty array.

##### Arguments

- Collection, string, or `nil`

##### Returns

Array or `nil`

##### Examples

```js
arr(#{1 2 3}) ; => [1 2 3]
arr([true false]) ; => [true false]
arr(~{:foo :bar "baz" "boo"}) ; => [[:foo :bar] ["baz" "boo"]]
arr(nil) ; => []
arr("foo") ; => ["f" "o" "o"]
```

#### array

Returns an array containing the given arguments.

##### Arguments

Variable number of anything

##### Returns

Array

##### Examples

```js
array(1 2 3) ; => [1 2 3]
```

#### set

Returns a set containing the elements from the given collection.

##### Arguments

- Collection or `nil`

##### Returns

Set

##### Examples

```js
set([1 2 3]) ; => #{1 2 3}
set(#{1 2 3}) ; => #{1 2 3}
set(~{:foo :bar}) ; => #{[:foo :bar]}
set(nil) ; => #{}
```

#### hash-set

Returns a set containing the given arguments.

##### Arguments

Variable number of anything

##### Returns

Set

##### Examples

```js
hash-set(1 2 3) ; => #{1 2 3}
```

#### tuples->map

Returns a map made of the given key-value pairs.

##### Arguments

- Array of key-value pairs or `nil`

##### Returns

Map

##### Examples

```js
tuples->map([[:foo :bar]]) ; => ~{:foo :bar}
tuples->map(nil) ; => ~{}
```

#### hash-map

Returns a map containing the given arguments.

##### Arguments

Even number of anything

##### Returns

map

##### Examples

```js
hash-map(1 2 3 4) ; => ~{1 2 3 4}
```

#### keys

Returns an array of the given map's keys.

##### Arguments

- Map or `nil`

##### Returns

Array

##### Examples

```js
keys(~{:foo :bar "boo" "baz"}) ; => [:foo "boo"]
keys(nil) ; => []
```

#### vals

Returns an array of the given map's values.

##### Arguments

- Map or `nil`

##### Returns

Array

##### Examples

```js
vals(~{:foo :bar "boo" "baz"}) ; => [:bar "baz"]
vals(nil) ; => []
```

#### map

Returns an array that is the result of invoking the given function for each element in the given collection.

##### Arguments

- Function of one argument
- Collection or `nil`

##### Returns

Array

##### Examples

```js
map(inc [1 2 3]) ; => [2 3 4]
map(inc #{1 2 3}) ; => [2 3 4]
map(inc nil) ; => []
```

#### filter

Returns an array that only contains those elements of the given collection for which the given predicate function returns a truthy value.

##### Arguments

- Function of one argument
- Collection or `nil`

##### Returns

Array

##### Examples

```js
filter(even? [1 2 3]) ; => [2]
filter(even? #{1 2 3}) ; => [2]
filter(even? nil) ; => []
```

#### remove

Like `filter`, but returns an array that only containts those elements of the given collection for which the given predicate function returns a *falsey* value.

#### reduce

Iterates over the given collection and invokes the given function with the given initial value and the first element from the collection, then with the result from the previous step and the next element, etc. If no initial value is given, it takes the first element from the collection and iterates over the rest. Returns the result of all of these operations.

##### Arguments

- Function of two arguments
- An optional initial value
- Collection or `nil`

##### Returns

Anything

##### Examples

```js
reduce(+ [1 2 3]) ; => 6 (same result as apply(+ [1 2 3]))
reduce(fn(acc curr
        conj(acc curr curr))
       []
       [1 2 3]) ; => [1 1 2 2 3 3]
```

#### reverse

Returns an array with the elements of the given collection in reverse order.

##### Arguments

- Collection or `nil`

##### Returns

Array

##### Examples

```js
reverse([1 2 3]) ; => [3 2 1]
reverse({:foo :bar "boo" "far"}) ; => [["boo" "far"] [:foo :bar]]
reverse(nil) ; => []
```

#### every?

Determines whether every item in the given collection results in a truthy value when it is passed to the given predicate function.

##### Arguments

- Function
- Collection or `nil`

##### Returns

Boolean

##### Examples

```js
every?(even? [1 2 3]) ; => false
every?(even? #{2 4}) ; => false
every?(even? []) ; => true
every?(even? nil) ; => true
```

#### get

Returns the value at the given key. Returns nil when the key cannot be found.

##### Arguments

- Array, map, or `nil`
- Anything

##### Returns

Anything

##### Examples

```js
get([1 2 3] 0) ; => 1
get(~{:foo :bar} :foo) ; => :foo
get([1 2 3] 5) ; => nil
get(nil 1) => nil
```

#### get-in

Like `get`, but searches in a deeply nested data structure.

##### Arguments

- Array, map, or `nil`
- Array

##### Returns

Anything

##### Examples

```js
get-in([[1]] [0 0]) ; => 1
get-in(~{:foo {:bar "baz"}} [:foo :bar]) ; => "baz"
get-in(~{} [:foo :bar]) ; => nil
get-in(nil ["foo"]) ; => nil
```

#### contains?

Determines if the given collection contains a given key.

##### Arguments

- Collection or `nil`
- Anything

##### Returns

Boolean

##### Examples

```js
contains?([1 2 3] 0) ; => true
contains?(~{:foo :bar} "baz") ; => false
contains?(~{4 5 6} 5) ; => true
```

### Comparisons

#### <

Returns true if every given number is less than its successor.

##### Arguments

Variable number of numbers (at least one)

##### Returns

Boolean

##### Examples

```js
<(1 2 3) ; => true
<(1 2 2) ; => false
<(2 1) ; => false
<(1) ; => true
```

#### <=

Like `<`, but checks if every given number is less than or equal to its successor.

#### >

Returns true if every given number is greater than its successor.

##### Arguments

Variable number of numbers (at least one)

##### Returns

Boolean

##### Examples

```js
<(3 2 1) ; => true
<(3 2 2) ; => false
<(1 2) ; => false
<(1) ; => true
```

#### >=

Like `>`, but checks if every given number is greater than or equal to its successor.

### Functions

#### apply

Invokes the given function with the arguments from the given collection.

##### Arguments

- Function
- Optional, variable number of arguments
- Collection

##### Returns

Whatever the given function returns once invoked.

##### Examples

```js
apply(+ [1 2 3]) ; => 6; same as calling +(1 2 3)
apply(+ 1 2 [3]) ; => 6; same as calling apply(+ [1 2 3])
```

#### partial

Prepares a function with some but not all arguments so it may be invoked later with additional arguments.

##### Arguments

- Functions
- Variable number of anything

##### Returns

Function

##### Examples

```js
partial(* 3)(2) ; => 6
partial(+ 3 2)(1) ; => 6
```

#### comp

Returns a function that takes a variable number of arguments and then invokes the given functions from right to left. The rightmost function is invoked with the given arguments, then the next function is invoked with the result of the previous step, etc.

##### Arguments

- Variable number of functions

##### Returns

Function

##### Examples

```js
comp(not even?)(3) ; => true
comp(str not even?)(2) ; => "false"
```

#### complement

Returns a function that returns the negation of the given function.

##### Arguments

- Function

##### Returns

Function

##### Examples

```js
complement(even?)(1) ; => true
```

#### ->

Thread-first operator. Takes a value and a variable number of arrays that take the form of [f arg1 arg2 ...]. Takes the value and invokes the function from the first array with it and that array's remaining arguments, then invokes the function from the second array and invokes it with the previous step's result and the second array's remaining arguments, etc. Functions need not be wrapped in an array if they do not take any additional arguments.

All arguments are evaluated before invocation.

##### Arguments

- Anything
- Variable number of functions

##### Returns

Anything

##### Examples

```js
->(1 [+ 3] dec [* 4]) ; => 12
```

#### ->>

Thread-last operator. Like the thread-first operator, but places each intermediate result as the *last* argument to corresponding function invocation.

All arguments are evaluated before invocation.

##### Arguments

- Anything
- Variable number of functions

##### Returns

Anything

##### Examples

```js
->>([1 2 3 4] [filter even?] [map inc] [apply +]) ; => 8
```

### Miscellaneous

#### pairwise

Returns an array containing pairs of the elements of the given arguments. Accepts only an even number of arguments.

##### Arguments

A variable number of anything.

##### Returns

Array of two-element arrays.

##### Examples

```js
pairwise() ; => []
pairwise(1 2 3 4) ; => [[1 2] [3 4]]
```

#### repeat

Returns an array that contains the given element the given amount of times.

##### Arguments

- Number
- Anything

##### Returns

Array

##### Examples

```js
repeat(3 4) ; => [4 4 4]
repeat(0 10) ; => []
```

#### repeatedly

Returns an array that contains the result of invoking the given function with the given arguments the given amount of times.

##### Arguments

- Number
- Function
- Variable number of anything

##### Returns

Array

##### Examples

```js
repeatedly(3 * 3 4) ; => [12 12 12]
```

## JavaScript Interop

To use one of JavaScript's built-in constructors or prototype methods, use the dot notation as follows:

```js
.log(console "foo")
Map.([[1 2]])
````

The first line is the same as saying `console.log("foo")` in JavaScript. The second line is the same as new `Map([[1 2]])`.

To mutate a JavaScript map, you can do the following:

```js
def(m ~{})
.set(m "foo" 1) ; => ~{"foo" 1}
```

The same can be done for sets, arrays, etc. E.g.:

```js
def(a [])
.push(a 1) ; => 1; a is now [1]
```

To mutate a JavaScript object, use the built-in special form `set-property`:

```js
def(o Object.())
set-property(o "foo" "bar") ; => "bar"; o is now {foo: "bar"}
```
