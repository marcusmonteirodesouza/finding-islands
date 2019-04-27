import { Sea, LAND, WATER } from "@finding-islands/core";

export default class SeaParser {
  /**
   * Returns a Sea type from a grid string.
   *
   * @param grid - a string. The only values that are as tiles are the values
   * defined LAND (1) and WATER (0). Newlines are used to define rows. The coordinate
   * {0, 0} is located at the top-left corner and is incremented both to the
   * right and down.
   * @returns a Sea type that can be processed by the `core` algorithms {@link https://www.npmjs.com/package/@finding-islands/core}.
   *
   * @example
   * Usage example
   * ``ts
   * SeaParser.parseGrid(`
   * 0 1 1 0 0 0 0
   * 1 1 0 0 0 0 0
   * 0 0 0 0 1 1 0
   * 0 0 0 0 1 1 0
   * 0 1 1 0 0 0 0
   * `)
   * [
   *  [0, 1, 1, 0, 0, 0, 0],
   *  [1, 1, 0, 0, 0, 0, 0],
   *  [0, 0, 0, 0, 1, 1, 0],
   *  [0, 0, 0, 0, 1, 1, 0],
   *  [0, 1, 1, 0, 0, 0, 0]
   * ]
   * ``
   */
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
