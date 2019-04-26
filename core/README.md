# Finding Islands, Core

This package implements the algorithms to find the islands in a sea.

The sea is a bi-dimensional array of integers. Water is represented by the value 0.

An island is an array of coordinates.

## Example

```ts
findIslands([
  [land, land, water, land, water],
  [water, land, water, land, land],
  [water, land, land, water, water],
  [land, land, water, water, land]
]);
[
  ([
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 0 },
    { x: 3, y: 1 }
  ],
  [{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 1, y: 4 }],
  [{ x: 3, y: 4 }])
];
```
