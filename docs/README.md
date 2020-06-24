# Berlin

Poor man's Clojure.

## Description

Berlin is a small, functional programming language that lives at the intersection between JavaScript and Clojure. It comes with a transpiler that spits out JavaScript code.

You can find the source code and the Readme with credits and license information [here](https://github.com/dchacke/berlin-lang).

## API

### Basics

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

Returns the first truthy or last falsey argument. All arguments are evaluated.

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

Returns the first falsey argument or last argument (going from left to right). All arguments are evaluated.

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

### Math

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

### Collections

A collection is either an array, a map, or a set.

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

- Collection

##### Returns

Anything

##### Examples

```js
last([1 2 3]) ; => 3
last(~{:foo :bar "boo" "bar"}) ; => ["boo" "bar"]
last(nil) ; => nil
last([]) ; => nil
```
