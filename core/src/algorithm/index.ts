import { safeAccess } from '../utils';
import { Sea, WATER, Coordinate } from './../types';

/**
 * Returns the islands in a map.
 *
 * @remarks
 * The implementation's algorithm is row-by-row segmentation, as explained in this video {@link https://www.youtube.com/watch?v=hMIrQdX4BkE}
 *
 * @param sea - a bi-dimensional array of integers. Water is represented by the value 0 and land by the value 1.
 * @returns the islands. An island is an array of coordinates.
 *
 * @example
 * Usage example
 * ``ts
 * findIslands([
 *  [land, land, water, land, water],
 *  [water, land, water, land, land],
 *  [water, land, land, water, water],
 *  [land, land, water, water, land]
 * ])
 *
 * [
 * [
 *   { x: 0, y: 0 },
 *   { x: 0, y: 1 },
 *   { x: 1, y: 1 },
 *   { x: 2, y: 1 },
 *   { x: 2, y: 2 },
 *   { x: 3, y: 0 },
 *   { x: 3, y: 1 }
 * ],
 * [{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 1, y: 4 }],
 * [{ x: 3, y: 4 }]
 * ]
 * ``
 */
export function findIslands(sea: Sea): Coordinate[][] {
  const labeledSea = labelRows(sea);

  const islands = {};

  for (let i = 0; i < labeledSea.length; i++) {
    for (let j = 0; j < labeledSea[i].length; j++) {
      const label = labeledSea[i][j] as number;
      if (label === WATER) {
        continue;
      }
      if (label in islands) {
        islands[label].push({ x: i, y: j });
      } else {
        islands[label] = [{ x: i, y: j }];
      }
    }
  }

  return Object.keys(islands).map(key => islands[key]);
}

export function labelRows(grid: number[][]): number[][] {
  let counter = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const tile = grid[i][j];

      if (tile !== WATER) {
        let tileBehind = getTileBehind(grid, i, j);
        let tileAbove = getTileAbove(grid, i, j);

        const isConnected = tileBehind !== WATER || tileAbove !== WATER;

        if (isConnected) {
          const minLabel = (() => {
            if (tileAbove === WATER) {
              return tileBehind;
            } else if (tileBehind === WATER) {
              return tileAbove;
            } else {
              return Math.min(tileBehind, tileAbove);
            }
          })();

          grid[i][j] = minLabel;

          let b = 1;
          while (tileBehind !== WATER) {
            grid[i][j - b] = minLabel;
            tileBehind = getTileBehind(grid, i, j - b);
            b += 1;
          }

          let a = 1;
          while (tileAbove !== WATER) {
            grid[i - a][j] = minLabel;
            tileAbove = getTileAbove(grid, i - a, j);
            a += 1;
          }
        } else {
          counter++;
          grid[i][j] = counter;
        }
      } else {
        grid[i][j] = WATER;
      }
    }
  }
  return grid;
}

export function getTileBehind(grid: number[][], i, j): number {
  // If there is no tile above or behind it is considered water
  const row = safeAccess(grid, i);
  const result = safeAccess(row, j - 1);
  return result ? result : WATER;
}

export function getTileAbove(grid: number[][], i, j): number {
  // If there is no tile above or behind it is considered water
  const rowAbove = safeAccess(grid, i - 1);
  const result = safeAccess(rowAbove, j);
  return result ? result : WATER;
}
