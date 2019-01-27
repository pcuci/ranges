[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

# Ranges Collection _(@pcuci/ranges)_

> Manipulate half-open intervals with ease.

Adds and substracts half-open intervals from a collection of ranges.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Install

```
npm install --save-dev @pcuci/ranges
```

## Usage

```javascript
const { DiscreteRangeCollection } = require('@pcuci/ranges')

const ranges = new DiscreteRangeCollection()

ranges.add([2, 10])
ranges.print() // [2, 10)

ranges.remove([4, 7])
ranges.print() // [2, 4) [7, 8)

```

Similarly for `SimpleRangeCollection'.

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [DiscreteRangeCollection](#discreterangecollection)
    -   [add](#add)
        -   [Parameters](#parameters)
    -   [remove](#remove)
        -   [Parameters](#parameters-1)
    -   [print](#print)
-   [isNumbers](#isnumbers)
    -   [Parameters](#parameters-2)
-   [hasEvenLength](#hasevenlength)
    -   [Parameters](#parameters-3)
-   [isMonotonic](#ismonotonic)
    -   [Parameters](#parameters-4)
-   [validate](#validate)
    -   [Parameters](#parameters-5)
-   [deZero](#dezero)
    -   [Parameters](#parameters-6)
-   [diff](#diff)
    -   [Parameters](#parameters-7)
-   [union](#union)
    -   [Parameters](#parameters-8)
-   [SimpleRangeCollection](#simplerangecollection)
    -   [add](#add-1)
        -   [Parameters](#parameters-9)
    -   [remove](#remove-1)
        -   [Parameters](#parameters-10)
    -   [print](#print-1)
-   [RangeCollection](#rangecollection)
    -   [add](#add-2)
        -   [Parameters](#parameters-11)
    -   [remove](#remove-2)
        -   [Parameters](#parameters-12)
    -   [print](#print-2)

### DiscreteRangeCollection

**Extends RangeCollection**

Manipulates a collection of half-open intervals by means of a set-based implementation.
Projects the input ranges onto a set, then keeps track of in/out of interval state using
two distinctly incrementing counters for each competing range

If both or either of the ranges are "on" or "active" then conditionals are used to
compose the resulting collection of ranges

**Note**: the _union_ and _diff_ helper functions solve the general case of
adding and subtracting two collections of half-open intervals, and not just adding or substracting
one signle half-open interval from an input range.

#### add

Adds a range to the collection

##### Parameters

-   `ranges` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>** Array of two integers that specify beginning and end of range.

#### remove

Removes a range from the collection

##### Parameters

-   `ranges` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>** Array of two integers that specify beginning and end of range.

#### print

Prints out the list of ranges in the range collection

### isNumbers

Verifies all array elements are numbers

#### Parameters

-   `ranges` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>** The array whose elements to check that are all numbers


-   Throws **[Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error)** Ranges must be numbers

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** The result of the check

### hasEvenLength

Verifies the array has an even number of elements

#### Parameters

-   `ranges` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>** Array to verify the length of


-   Throws **[Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error)** Ranges array length not even

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Result of even length check

### isMonotonic

Verifies the array is sorted, values increase monotonically

#### Parameters

-   `ranges` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>** The array whose sort order is verified


-   Throws **[Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error)** Ranges array must be sorted

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Monotonicity check result

### validate

Verifies the array is only numbers, is even in length,
and its elements are monotonically increasing

#### Parameters

-   `ranges` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>** The array to validate


-   Throws **[Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error)** Ranges array must be sorted
-   Throws **[Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error)** Ranges array length not even
-   Throws **[Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error)** Ranges must be numbers

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>** The original array parameter

### deZero

Removes zero-length intervals, e.g.: \[3, 3), or
fuzes two intervals, e.g.: \[1, 2) + \[2, 3) = \[1, 3)

#### Parameters

-   `ranges` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>** The array of intervals to clean


-   Throws **[Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error)** Validation errors

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>** A modified shorter copy of the original parameter

### diff

Subtracts two collections of ranges from each other

#### Parameters

-   `range1` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>** The range to subtract from
-   `range2` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>** The range to subtract


-   Throws **[Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error)** Validation errors

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>** The difference collection

### union

Adds two collections of ranges to one another resulting
in a new collection, the union of the inputs

#### Parameters

-   `range1` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>** The first range to add
-   `range2` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>** The second range to add


-   Throws **[Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error)** Validation errors

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>** The union collection

### SimpleRangeCollection

**Extends RangeCollection**

Manipulates a collection of half-open intervals, a sign-encoded implementation.
Internally, we keep track of two positive ranges:

-   a **positive** sign indicates the closed end of the half-open interval
-   a **negative** sign indicates the open end of the half-open interval

The sign encoding helps us track if we are inside or outside an interval,
adding and subtracting ranges then becomes trivial conditional logic that
checks state to build up the resulting merged collection of ranges

#### add

Adds a range to the collection

##### Parameters

-   `ranges` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>** Array of two integers that specify beginning and end of range.

#### remove

Removes a range from the collection

##### Parameters

-   `ranges` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>** Array of two integers that specify beginning and end of range.

#### print

Prints out the list of ranges in the range collection

### RangeCollection

RangeCollection class

#### add

Adds a range to the collection

##### Parameters

-   `range` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>** Array of two integers that specify beginning and end of range.

#### remove

Removes a range from the collection

##### Parameters

-   `range` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>** Array of two integers that specify beginning and end of range.

#### print

Prints out the list of ranges in the range collection

## Contributing

PRs accepted.

## License

MIT © Paul Cuciureanu [@pcuci](https://github.com/pcuci)

