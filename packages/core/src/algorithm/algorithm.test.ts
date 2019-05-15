import { SeaTile } from './../types/sea';
import { WATER, LAND } from './../types';
import { findIslands, labelRows, getTileBehind, getTileAbove } from '.';

describe('algorithm', () => {
  const empty = [];

  const emptySea = [[]];

  const singleWaterTile = [[WATER]];

  const singleLandTile = [[LAND]];

  const allWaterRow = [[WATER, WATER, WATER, WATER, WATER]];

  const allLandRowSea = [[LAND, LAND, LAND, LAND, LAND]];

  const allWaterColumn = [[WATER], [WATER], [WATER], [WATER], [WATER]];

  const allLandColumn = [[LAND], [LAND], [LAND], [LAND], [LAND]];

  const singleRow = [[LAND, LAND, WATER, WATER, LAND]];

  const singleColumn = [[LAND], [LAND], [WATER], [LAND], [LAND]];

  const sea0 = [
    [LAND, LAND, WATER, WATER, LAND],
    [WATER, LAND, WATER, WATER, LAND],
    [LAND, WATER, WATER, LAND, LAND],
    [WATER, WATER, WATER, WATER, WATER],
    [LAND, WATER, LAND, WATER, LAND]
  ];

  const hugeIsland = [
    [WATER, WATER, LAND, WATER, WATER],
    [WATER, LAND, LAND, LAND, WATER],
    [LAND, LAND, LAND, LAND, LAND],
    [WATER, LAND, LAND, LAND, WATER],
    [WATER, WATER, LAND, WATER, WATER]
  ];

  const sea2 = [
    [LAND, LAND, WATER, LAND, WATER],
    [WATER, LAND, WATER, LAND, LAND],
    [WATER, LAND, LAND, WATER, WATER],
    [LAND, LAND, WATER, WATER, LAND]
  ];

  const nonSquareSea = [
    [LAND],
    [WATER, LAND],
    [WATER, LAND],
    [WATER, WATER, LAND, LAND],
    [WATER, LAND, LAND, LAND, WATER]
  ];

  const sea3 = [
    [LAND, LAND, LAND, WATER, WATER, WATER, LAND, LAND],
    [LAND, LAND, WATER, WATER, LAND, LAND, LAND, LAND],
    [LAND, WATER, LAND, LAND, WATER, WATER, WATER, WATER]
  ];

  test('getTileBehind', () => {
    expect(getTileBehind(emptySea, 0, 0)).toEqual(WATER);

    expect(getTileBehind(singleWaterTile, 0, 0)).toEqual(WATER);

    expect(getTileBehind(singleLandTile, 0, 0)).toEqual(WATER);

    expect(getTileBehind(singleRow, 0, 0)).toEqual(WATER);
    expect(getTileBehind(singleRow, 0, 1)).toEqual(LAND);
    expect(getTileBehind(singleRow, 0, 2)).toEqual(LAND);
    expect(getTileBehind(singleRow, 0, 3)).toEqual(WATER);
    expect(getTileBehind(singleRow, 0, 4)).toEqual(WATER);
    expect(getTileBehind(singleRow, 0, 5)).toEqual(LAND);
    expect(getTileBehind(singleRow, 0, 6)).toEqual(WATER);

    expect(getTileBehind(singleColumn, 0, 0)).toEqual(WATER);
    expect(getTileBehind(singleColumn, 1, 0)).toEqual(WATER);
    expect(getTileBehind(singleColumn, 2, 0)).toEqual(WATER);
    expect(getTileBehind(singleColumn, 3, 0)).toEqual(WATER);
    expect(getTileBehind(singleColumn, 4, 0)).toEqual(WATER);

    expect(getTileBehind(sea0, 0, 0)).toEqual(WATER);
    expect(getTileBehind(sea0, 1, 1)).toEqual(WATER);
    expect(getTileBehind(sea0, 2, 2)).toEqual(WATER);
    expect(getTileBehind(sea0, 3, 3)).toEqual(WATER);
    expect(getTileBehind(sea0, 4, 4)).toEqual(WATER);

    expect(getTileBehind(hugeIsland, 0, 0)).toEqual(WATER);
    expect(getTileBehind(hugeIsland, 1, 1)).toEqual(WATER);
    expect(getTileBehind(hugeIsland, 2, 2)).toEqual(LAND);
    expect(getTileBehind(hugeIsland, 3, 3)).toEqual(LAND);
    expect(getTileBehind(hugeIsland, 4, 4)).toEqual(WATER);
  });

  test('getTileAbove', () => {
    expect(getTileAbove(emptySea, 0, 0)).toEqual(WATER);

    expect(getTileAbove(singleWaterTile, 0, 0)).toEqual(WATER);

    expect(getTileAbove(singleLandTile, 0, 0)).toEqual(WATER);

    expect(getTileAbove(singleRow, 0, 0)).toEqual(WATER);
    expect(getTileAbove(singleRow, 0, 1)).toEqual(WATER);
    expect(getTileAbove(singleRow, 0, 2)).toEqual(WATER);
    expect(getTileAbove(singleRow, 0, 3)).toEqual(WATER);
    expect(getTileAbove(singleRow, 0, 4)).toEqual(WATER);

    expect(getTileAbove(singleColumn, 0, 0)).toEqual(WATER);
    expect(getTileAbove(singleColumn, 1, 0)).toEqual(LAND);
    expect(getTileAbove(singleColumn, 2, 0)).toEqual(LAND);
    expect(getTileAbove(singleColumn, 3, 0)).toEqual(WATER);
    expect(getTileAbove(singleColumn, 4, 0)).toEqual(LAND);

    expect(getTileAbove(sea0, 0, 0)).toEqual(WATER);
    expect(getTileAbove(sea0, 1, 1)).toEqual(LAND);
    expect(getTileAbove(sea0, 2, 2)).toEqual(WATER);
    expect(getTileAbove(sea0, 3, 3)).toEqual(LAND);
    expect(getTileAbove(sea0, 4, 4)).toEqual(WATER);

    expect(getTileAbove(hugeIsland, 0, 0)).toEqual(WATER);
    expect(getTileAbove(hugeIsland, 1, 1)).toEqual(WATER);
    expect(getTileAbove(hugeIsland, 2, 2)).toEqual(LAND);
    expect(getTileAbove(hugeIsland, 3, 3)).toEqual(LAND);
    expect(getTileAbove(hugeIsland, 4, 4)).toEqual(WATER);
  });

  describe('labelRows', () => {
    test('empty sea', () => {
      expect(labelRows(emptySea)).toEqual(emptySea);
    });

    test('single water tile', () => {
      expect(labelRows(singleWaterTile)).toEqual([[0]]);
    });

    test('single land tile', () => {
      expect(labelRows(singleLandTile)).toEqual([[1]]);
    });

    test('all water row', () => {
      expect(labelRows(allWaterRow)).toEqual([[0, 0, 0, 0, 0]]);
    });

    test('all land row', () => {
      expect(labelRows(allLandRowSea)).toEqual([[1, 1, 1, 1, 1]]);
    });

    test('all water column', () => {
      expect(labelRows(allWaterColumn)).toEqual([[0], [0], [0], [0], [0]]);
    });

    test('all land column', () => {
      expect(labelRows(allLandColumn)).toEqual([[1], [1], [1], [1], [1]]);
    });

    test('single row', () => {
      expect(labelRows(singleRow)).toEqual([[1, 1, 0, 0, 2]]);
    });

    test('single column', () => {
      expect(labelRows(singleColumn)).toEqual([[1], [1], [0], [2], [2]]);
    });

    test('common case 1', () => {
      const expectedSea0 = [
        [1, 1, 0, 0, 2],
        [0, 1, 0, 0, 2],
        [3, 0, 0, 2, 2],
        [0, 0, 0, 0, 0],
        [5, 0, 6, 0, 7]
      ];

      expect(labelRows(sea0)).toEqual(expectedSea0);
    });

    test('huge island', () => {
      const expectedHugeIsland = [
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0]
      ];

      expect(labelRows(hugeIsland)).toEqual(expectedHugeIsland);
    });

    test('common case 2', () => {
      const expectedSea2 = [
        [1, 1, 0, 2, 0],
        [0, 1, 0, 2, 2],
        [0, 1, 1, 0, 0],
        [1, 1, 0, 0, 4]
      ];

      expect(labelRows(sea2)).toEqual(expectedSea2);
    });
  });

  describe('findIslands', () => {
    test('empty', () => {
      expect(findIslands(empty)).toEqual([]);
    });

    test('empty sea', () => {
      expect(findIslands(emptySea)).toEqual([]);
    });

    test('single water tile', () => {
      expect(findIslands(singleWaterTile)).toEqual([]);
    });

    test('single land tile', () => {
      expect(findIslands(singleLandTile)).toEqual([[{ x: 0, y: 0 }]]);
    });

    test('all water row', () => {
      expect(findIslands(allWaterRow)).toEqual([]);
    });

    test('all land row', () => {
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

    test('all water column', () => {
      expect(findIslands(allWaterColumn)).toEqual([]);
    });

    test('all land column', () => {
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

    test('single row', () => {
      expect(findIslands(singleRow)).toEqual([
        [{ x: 0, y: 0 }, { x: 0, y: 1 }],
        [{ x: 0, y: 4 }]
      ]);
    });

    test('single column', () => {
      expect(findIslands(singleColumn)).toEqual([
        [{ x: 0, y: 0 }, { x: 1, y: 0 }],
        [{ x: 3, y: 0 }, { x: 4, y: 0 }]
      ]);
    });

    test('common case 1', () => {
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

    test('huge island', () => {
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

    test('common case 2', () => {
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

    test('non-square sea', () => {
      const expectedIslandsNonSquareSea = [
        [{ x: 0, y: 0 }],
        [{ x: 1, y: 1 }, { x: 2, y: 1 }],
        [
          { x: 3, y: 2 },
          { x: 3, y: 3 },
          { x: 4, y: 1 },
          { x: 4, y: 2 },
          { x: 4, y: 3 }
        ]
      ];

      expect(findIslands(nonSquareSea)).toEqual(expectedIslandsNonSquareSea);
    });

    test('sea3', () => {
      const expectedIslandsSea3 = [
        [
          { x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 0, y: 2 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 0 }
        ],
        [
          { x: 0, y: 6 },
          { x: 0, y: 7 },
          { x: 1, y: 4 },
          { x: 1, y: 5 },
          { x: 1, y: 6 },
          { x: 1, y: 7 }
        ],
        [{ x: 2, y: 2 }, { x: 2, y: 3 }]
      ];

      expect(findIslands(sea3)).toEqual(expectedIslandsSea3);
    });
  });
});
