import { safeAccess } from "../utils";
import { Sea, land, water } from "./../types/sea";

export function findIslands(sea: Sea) {
  // https://www.youtube.com/watch?v=hMIrQdX4BkE
  const labeledSea = labelRows(sea);
  sea.forEach((row, x) => {
    const counter = 0;
  });
  sea.map(x => x.map(y => console.log(y)));
  return 1;
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
          sea[i][j] = Math.min(tileBehind, tileAbove);
        } else {
          counter++;
          sea[i][j] = counter;
        }
      } else {
        sea[i][j] = water;
      }
    }

    return sea;
  }
}

export function getTileBehind(sea: Sea, i, j) {
  const row = safeAccess(sea, i);
  return safeAccess(row, j - 1);
}

export function getTileAbove(sea: Sea, i, j) {
  const rowAbove = safeAccess(sea, i - 1);
  return safeAccess(rowAbove, j);
}
