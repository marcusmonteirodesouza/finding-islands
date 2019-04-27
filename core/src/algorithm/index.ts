import { safeAccess } from '../utils';
import { Sea, WATER } from './../types';

/**
 * Returns the islands in a map.
 *
 * @remarks
 * The implementation's algorithm is row-by-row segmentation, as explained in this video {@link https://www.youtube.com/watch?v=hMIrQdX4BkE}
 *
 * @param sea - a bi-dimensional array of integers. Water is represented by the value 0.
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

export function labelRows(sea: Sea): Number[][] {
  let counter = 0;

  for (let i = 0; i < sea.length; i++) {
    for (let j = 0; j < sea[i].length; j++) {
      const tile = sea[i][j];

      if (tile !== WATER) {
        // trick here
        let tileBehind = getTileBehind(sea, i, j) || WATER;
        let tileAbove = getTileAbove(sea, i, j) || WATER;

        const isConnected = tileBehind !== WATER || tileAbove !== WATER;
        if (isConnected) {
          tileBehind =
            tileBehind === WATER ? Number.POSITIVE_INFINITY : tileBehind;
          tileAbove =
            tileAbove === WATER ? Number.POSITIVE_INFINITY : tileAbove;
          const minLabel = Math.min(tileBehind, tileAbove);
          sea[i][j] = minLabel;
          if (isFinite(tileBehind)) {
            sea[i][j - 1] = minLabel;
          }
          if (isFinite(tileAbove)) {
            sea[i - 1][j] = minLabel;
          }
        } else {
          counter++;
          sea[i][j] = counter;
        }
      } else {
        sea[i][j] = WATER;
      }
    }
  }
  return sea;
}

export function getTileBehind(sea: Sea, i, j) {
  const row = safeAccess(sea, i);
  return safeAccess(row, j - 1);
}

export function getTileAbove(sea: Sea, i, j) {
  const rowAbove = safeAccess(sea, i - 1);
  return safeAccess(rowAbove, j);
}
