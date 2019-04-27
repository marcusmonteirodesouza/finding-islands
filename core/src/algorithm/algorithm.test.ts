import { water, land } from "./../types/sea";
import { findIslands, labelRows, getTileBehind, getTileAbove } from ".";

describe("algorithm", () => {
  const emptySea = [[]];

  const singleWaterTile = [[water]];

  const singleLandTile = [[land]];

  const allWaterRow = [[water, water, water, water, water]];

  const allLandRowSea = [[land, land, land, land, land]];

  const allWaterColumn = [[water], [water], [water], [water], [water]];

  const allLandColumn = [[land], [land], [land], [land], [land]];

  const singleRow = [[land, land, water, water, land]];

  const singleColumn = [[land], [land], [water], [land], [land]];

  const sea0 = [
    [land, land, water, water, land],
    [water, land, water, water, land],
    [land, water, water, land, land],
    [water, water, water, water, water],
    [land, water, land, water, land]
  ];

  const hugeIsland = [
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

    expect(getTileBehind(singleWaterTile, 0, 0)).toEqual(null);

    expect(getTileBehind(singleLandTile, 0, 0)).toEqual(null);

    expect(getTileBehind(singleRow, 0, 0)).toEqual(null);
    expect(getTileBehind(singleRow, 0, 1)).toEqual(land);
    expect(getTileBehind(singleRow, 0, 2)).toEqual(land);
    expect(getTileBehind(singleRow, 0, 3)).toEqual(water);
    expect(getTileBehind(singleRow, 0, 4)).toEqual(water);
    expect(getTileBehind(singleRow, 0, 5)).toEqual(land);
    expect(getTileBehind(singleRow, 0, 6)).toEqual(null);

    expect(getTileBehind(singleColumn, 0, 0)).toEqual(null);
    expect(getTileBehind(singleColumn, 1, 0)).toEqual(null);
    expect(getTileBehind(singleColumn, 2, 0)).toEqual(null);
    expect(getTileBehind(singleColumn, 3, 0)).toEqual(null);
    expect(getTileBehind(singleColumn, 4, 0)).toEqual(null);

    expect(getTileBehind(sea0, 0, 0)).toEqual(null);
    expect(getTileBehind(sea0, 1, 1)).toEqual(water);
    expect(getTileBehind(sea0, 2, 2)).toEqual(water);
    expect(getTileBehind(sea0, 3, 3)).toEqual(water);
    expect(getTileBehind(sea0, 4, 4)).toEqual(water);

    expect(getTileBehind(hugeIsland, 0, 0)).toEqual(null);
    expect(getTileBehind(hugeIsland, 1, 1)).toEqual(water);
    expect(getTileBehind(hugeIsland, 2, 2)).toEqual(land);
    expect(getTileBehind(hugeIsland, 3, 3)).toEqual(land);
    expect(getTileBehind(hugeIsland, 4, 4)).toEqual(water);
  });

  test("getTileAbove", () => {
    expect(getTileAbove(emptySea, 0, 0)).toEqual(null);

    expect(getTileAbove(singleWaterTile, 0, 0)).toEqual(null);

    expect(getTileAbove(singleLandTile, 0, 0)).toEqual(null);

    expect(getTileAbove(singleRow, 0, 0)).toEqual(null);
    expect(getTileAbove(singleRow, 0, 1)).toEqual(null);
    expect(getTileAbove(singleRow, 0, 2)).toEqual(null);
    expect(getTileAbove(singleRow, 0, 3)).toEqual(null);
    expect(getTileAbove(singleRow, 0, 4)).toEqual(null);

    expect(getTileAbove(singleColumn, 0, 0)).toEqual(null);
    expect(getTileAbove(singleColumn, 1, 0)).toEqual(land);
    expect(getTileAbove(singleColumn, 2, 0)).toEqual(land);
    expect(getTileAbove(singleColumn, 3, 0)).toEqual(water);
    expect(getTileAbove(singleColumn, 4, 0)).toEqual(land);

    expect(getTileAbove(sea0, 0, 0)).toEqual(null);
    expect(getTileAbove(sea0, 1, 1)).toEqual(land);
    expect(getTileAbove(sea0, 2, 2)).toEqual(water);
    expect(getTileAbove(sea0, 3, 3)).toEqual(land);
    expect(getTileAbove(sea0, 4, 4)).toEqual(water);

    expect(getTileAbove(hugeIsland, 0, 0)).toEqual(null);
    expect(getTileAbove(hugeIsland, 1, 1)).toEqual(water);
    expect(getTileAbove(hugeIsland, 2, 2)).toEqual(land);
    expect(getTileAbove(hugeIsland, 3, 3)).toEqual(land);
    expect(getTileAbove(hugeIsland, 4, 4)).toEqual(water);
  });

  describe("labelRows", () => {
    test("empty sea", () => {
      expect(labelRows(emptySea)).toEqual(emptySea);
    });

    test("single water tile", () => {
      expect(labelRows(singleWaterTile)).toEqual([[0]]);
    });

    test("single land tile", () => {
      expect(labelRows(singleLandTile)).toEqual([[1]]);
    });

    test("all water row", () => {
      expect(labelRows(allWaterRow)).toEqual([[0, 0, 0, 0, 0]]);
    });

    test("all land row", () => {
      expect(labelRows(allLandRowSea)).toEqual([[1, 1, 1, 1, 1]]);
    });

    test("all water column", () => {
      expect(labelRows(allWaterColumn)).toEqual([[0], [0], [0], [0], [0]]);
    });

    test("all land column", () => {
      expect(labelRows(allLandColumn)).toEqual([[1], [1], [1], [1], [1]]);
    });

    test("single row", () => {
      expect(labelRows(singleRow)).toEqual([[1, 1, 0, 0, 2]]);
    });

    test("single column", () => {
      expect(labelRows(singleColumn)).toEqual([[1], [1], [0], [2], [2]]);
    });

    test("common case 1", () => {
      const expectedSea0 = [
        [1, 1, 0, 0, 2],
        [0, 1, 0, 0, 2],
        [3, 0, 0, 2, 2],
        [0, 0, 0, 0, 0],
        [5, 0, 6, 0, 7]
      ];

      expect(labelRows(sea0)).toEqual(expectedSea0);
    });

    test("huge island", () => {
      const expectedHugeIsland = [
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0]
      ];

      expect(labelRows(hugeIsland)).toEqual(expectedHugeIsland);
    });

    test("common case 2", () => {
      const expectedSea2 = [
        [1, 1, 0, 2, 0],
        [0, 1, 0, 2, 2],
        [0, 1, 1, 0, 0],
        [1, 1, 0, 0, 4]
      ];

      expect(labelRows(sea2)).toEqual(expectedSea2);
    });
  });

  describe("findIslands", () => {
    test("empty sea", () => {
      expect(findIslands(emptySea)).toEqual([]);
    });

    test("single water tile", () => {
      expect(findIslands(singleWaterTile)).toEqual([]);
    });

    test("single land tile", () => {
      expect(findIslands(singleLandTile)).toEqual([[{ x: 0, y: 0 }]]);
    });

    test("all water row", () => {
      expect(findIslands(allWaterRow)).toEqual([]);
    });

    test("all land row", () => {
      expect(findIslands(allLandRowSea)).toEqual([
        [
          { x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 0, y: 2 },
          { x: 0, y: 3 },
          { x: 0, y: 4 }
        ]
      ]);
    });

    test("all water column", () => {
      expect(findIslands(allWaterColumn)).toEqual([]);
    });

    test("all land column", () => {
      expect(findIslands(allLandColumn)).toEqual([
        [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 2, y: 0 },
          { x: 3, y: 0 },
          { x: 4, y: 0 }
        ]
      ]);
    });

    test("single row", () => {
      expect(findIslands(singleRow)).toEqual([
        [{ x: 0, y: 0 }, { x: 0, y: 1 }],
        [{ x: 0, y: 4 }]
      ]);
    });

    test("single column", () => {
      expect(findIslands(singleColumn)).toEqual([
        [{ x: 0, y: 0 }, { x: 1, y: 0 }],
        [{ x: 3, y: 0 }, { x: 4, y: 0 }]
      ]);
    });

    test("common case 1", () => {
      const expectedIslandsSea0 = [
        [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
        [{ x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 3 }, { x: 2, y: 4 }],
        [{ x: 2, y: 0 }],
        [{ x: 4, y: 0 }],
        [{ x: 4, y: 2 }],
        [{ x: 4, y: 4 }]
      ];

      expect(findIslands(sea0)).toEqual(expectedIslandsSea0);
    });

    test("huge island", () => {
      const expectedHugeIsland = [
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

      expect(findIslands(hugeIsland)).toEqual(expectedHugeIsland);
    });

    test("common case 2", () => {
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
});
