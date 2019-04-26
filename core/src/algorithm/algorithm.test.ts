import { water, land } from "./../types/sea";
import { findIslands, labelRows, getTileBehind, getTileAbove } from ".";

describe("algorithm", () => {
  const emptySea = [[]];

  const singleWaterSea = [[water]];

  const singleLandSea = [[land]];

  const allWaterRowSea = [[water, water, water, water, water]];

  const allLandRowSea = [[land, land, land, land, land]];

  const allWaterColumnSea = [[water], [water], [water], [water], [water]];

  const allLandColumnSea = [[land], [land], [land], [land], [land]];

  const singleRowSea = [[land, land, water, water, land]];

  const singleColumnSea = [[land], [land], [water], [land], [land]];

  const sea0 = [
    [land, land, water, water, land],
    [water, land, water, water, land],
    [land, water, water, land, land],
    [water, water, water, water, water],
    [land, water, land, water, land]
  ];

  const sea1 = [
    [water, water, land, water, water],
    [water, land, land, land, water],
    [land, land, land, land, land],
    [water, land, land, land, water],
    [water, water, land, water, water]
  ];

  const sea2 = [
    [land, land, water, land, water],
    [water, land, water, land, land],
    [water, land, land, water, water],
    [land, land, water, water, land]
  ];

  test("getTileBehind", () => {
    expect(getTileBehind(emptySea, 0, 0)).toEqual(null);

    expect(getTileBehind(singleWaterSea, 0, 0)).toEqual(null);

    expect(getTileBehind(singleLandSea, 0, 0)).toEqual(null);

    expect(getTileBehind(singleRowSea, 0, 0)).toEqual(null);
    expect(getTileBehind(singleRowSea, 0, 1)).toEqual(land);
    expect(getTileBehind(singleRowSea, 0, 2)).toEqual(land);
    expect(getTileBehind(singleRowSea, 0, 3)).toEqual(water);
    expect(getTileBehind(singleRowSea, 0, 4)).toEqual(water);
    expect(getTileBehind(singleRowSea, 0, 5)).toEqual(land);
    expect(getTileBehind(singleRowSea, 0, 6)).toEqual(null);

    expect(getTileBehind(singleColumnSea, 0, 0)).toEqual(null);
    expect(getTileBehind(singleColumnSea, 1, 0)).toEqual(null);
    expect(getTileBehind(singleColumnSea, 2, 0)).toEqual(null);
    expect(getTileBehind(singleColumnSea, 3, 0)).toEqual(null);
    expect(getTileBehind(singleColumnSea, 4, 0)).toEqual(null);

    expect(getTileBehind(sea0, 0, 0)).toEqual(null);
    expect(getTileBehind(sea0, 1, 1)).toEqual(water);
    expect(getTileBehind(sea0, 2, 2)).toEqual(water);
    expect(getTileBehind(sea0, 3, 3)).toEqual(water);
    expect(getTileBehind(sea0, 4, 4)).toEqual(water);

    expect(getTileBehind(sea1, 0, 0)).toEqual(null);
    expect(getTileBehind(sea1, 1, 1)).toEqual(water);
    expect(getTileBehind(sea1, 2, 2)).toEqual(land);
    expect(getTileBehind(sea1, 3, 3)).toEqual(land);
    expect(getTileBehind(sea1, 4, 4)).toEqual(water);
  });

  test("getTileAbove", () => {
    expect(getTileAbove(emptySea, 0, 0)).toEqual(null);

    expect(getTileAbove(singleWaterSea, 0, 0)).toEqual(null);

    expect(getTileAbove(singleLandSea, 0, 0)).toEqual(null);

    expect(getTileAbove(singleRowSea, 0, 0)).toEqual(null);
    expect(getTileAbove(singleRowSea, 0, 1)).toEqual(null);
    expect(getTileAbove(singleRowSea, 0, 2)).toEqual(null);
    expect(getTileAbove(singleRowSea, 0, 3)).toEqual(null);
    expect(getTileAbove(singleRowSea, 0, 4)).toEqual(null);

    expect(getTileAbove(singleColumnSea, 0, 0)).toEqual(null);
    expect(getTileAbove(singleColumnSea, 1, 0)).toEqual(land);
    expect(getTileAbove(singleColumnSea, 2, 0)).toEqual(land);
    expect(getTileAbove(singleColumnSea, 3, 0)).toEqual(water);
    expect(getTileAbove(singleColumnSea, 4, 0)).toEqual(land);

    expect(getTileAbove(sea0, 0, 0)).toEqual(null);
    expect(getTileAbove(sea0, 1, 1)).toEqual(land);
    expect(getTileAbove(sea0, 2, 2)).toEqual(water);
    expect(getTileAbove(sea0, 3, 3)).toEqual(land);
    expect(getTileAbove(sea0, 4, 4)).toEqual(water);

    expect(getTileAbove(sea1, 0, 0)).toEqual(null);
    expect(getTileAbove(sea1, 1, 1)).toEqual(water);
    expect(getTileAbove(sea1, 2, 2)).toEqual(land);
    expect(getTileAbove(sea1, 3, 3)).toEqual(land);
    expect(getTileAbove(sea1, 4, 4)).toEqual(water);
  });

  test("labelRows", () => {
    expect(labelRows(emptySea)).toEqual(emptySea);
    expect(labelRows(singleWaterSea)).toEqual([[0]]);
    expect(labelRows(singleLandSea)).toEqual([[1]]);
    expect(labelRows(allWaterRowSea)).toEqual([[0, 0, 0, 0, 0]]);
    expect(labelRows(allLandRowSea)).toEqual([[1, 1, 1, 1, 1]]);
    expect(labelRows(allWaterColumnSea)).toEqual([[0], [0], [0], [0], [0]]);
    expect(labelRows(allLandColumnSea)).toEqual([[1], [1], [1], [1], [1]]);
    expect(labelRows(singleRowSea)).toEqual([[1, 1, 0, 0, 2]]);
    expect(labelRows(singleColumnSea)).toEqual([[1], [1], [0], [2], [2]]);

    const expectedSea0 = [
      [1, 1, 0, 0, 2],
      [0, 1, 0, 0, 2],
      [3, 0, 0, 2, 2],
      [0, 0, 0, 0, 0],
      [5, 0, 6, 0, 7]
    ];

    expect(labelRows(sea0)).toEqual(expectedSea0);

    const expectedSea1 = [
      [0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0],
      [1, 1, 1, 1, 1],
      [0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0]
    ];

    expect(labelRows(sea1)).toEqual(expectedSea1);

    const expectedSea2 = [
      [1, 1, 0, 2, 0],
      [0, 1, 0, 2, 2],
      [0, 1, 1, 0, 0],
      [1, 1, 0, 0, 4]
    ];

    expect(labelRows(sea2)).toEqual(expectedSea2);
  });

  test("findIslands", () => {
    expect(findIslands(emptySea)).toEqual([]);

    expect(findIslands(singleWaterSea)).toEqual([]);

    expect(findIslands(singleLandSea)).toEqual([[{ x: 0, y: 0 }]]);

    expect(findIslands(allWaterRowSea)).toEqual([]);

    expect(findIslands(allLandRowSea)).toEqual([
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 0, y: 3 },
        { x: 0, y: 4 }
      ]
    ]);

    expect(findIslands(allWaterColumnSea)).toEqual([]);

    expect(findIslands(allLandColumnSea)).toEqual([
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 4, y: 0 }
      ]
    ]);

    expect(findIslands(singleRowSea)).toEqual([
      [{ x: 0, y: 0 }, { x: 0, y: 1 }],
      [{ x: 0, y: 4 }]
    ]);

    expect(findIslands(singleColumnSea)).toEqual([
      [{ x: 0, y: 0 }, { x: 1, y: 0 }],
      [{ x: 3, y: 0 }, { x: 4, y: 0 }]
    ]);

    const expectedIslandsSea0 = [
      [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
      [{ x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 3 }, { x: 2, y: 4 }],
      [{ x: 2, y: 0 }],
      [{ x: 4, y: 0 }],
      [{ x: 4, y: 2 }],
      [{ x: 4, y: 4 }]
    ];

    expect(findIslands(sea0)).toEqual(expectedIslandsSea0);

    const expectedIslandsSea1 = [
      [
        { x: 0, y: 2 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 1, y: 3 },
        { x: 2, y: 0 },
        { x: 2, y: 1 },
        { x: 2, y: 2 },
        { x: 2, y: 3 },
        { x: 2, y: 4 },
        { x: 3, y: 1 },
        { x: 3, y: 2 },
        { x: 3, y: 3 },
        { x: 4, y: 2 }
      ]
    ];

    expect(findIslands(sea1)).toEqual(expectedIslandsSea1);

    const expectedIslandsSea2 = [
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 0 },
        { x: 3, y: 1 }
      ],
      [{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 1, y: 4 }],
      [{ x: 3, y: 4 }]
    ];

    expect(findIslands(sea2)).toEqual(expectedIslandsSea2);
  });
});
