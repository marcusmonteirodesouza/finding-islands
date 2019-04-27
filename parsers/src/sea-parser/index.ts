import { Sea, LAND, WATER } from "@finding-islands/core";

export default class SeaParser {
  static parseGrid(grid: string): Sea {
    const landStr = LAND.toString();
    const waterStr = WATER.toString();

    const relevantTilesRegExp = new RegExp(`[^${landStr}${waterStr}\\n]`, "g");

    const relevantGrid = grid.replace(relevantTilesRegExp, "");

    return relevantGrid
      .split("\n")
      .filter(row => row.length > 0)
      .map(row => {
        return row.split("").map(tile => {
          if (tile === landStr) {
            return LAND;
          } else if (tile === waterStr) {
            return WATER;
          } else {
            throw new Error("Logic error. This should never happen!");
          }
        });
      });
  }
}
