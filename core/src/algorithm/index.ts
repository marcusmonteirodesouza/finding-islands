import { safeAccess } from "../utils";
import { Sea, land, water } from "./../types/sea";

export function findIslands(sea: Sea): Coordinate[][] {
  // https://www.youtube.com/watch?v=hMIrQdX4BkE
  const labeledSea = labelRows(sea);

  const islands = {};

  for (let i = 0; i < labeledSea.length; i++) {
    for (let j = 0; j < labeledSea[i].length; j++) {
      const label = labeledSea[i][j] as number;
      if (label === water) {
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

      if (tile !== water) {
        // trick here
        let tileBehind = getTileBehind(sea, i, j) || water;
        let tileAbove = getTileAbove(sea, i, j) || water;

        const isConnected = tileBehind !== water || tileAbove !== water;
        if (isConnected) {
          tileBehind =
            tileBehind === water ? Number.POSITIVE_INFINITY : tileBehind;
          tileAbove =
            tileAbove === water ? Number.POSITIVE_INFINITY : tileAbove;
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
        sea[i][j] = water;
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
