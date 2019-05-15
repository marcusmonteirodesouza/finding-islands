import { Sea } from '@finding-islands/core';

const WATER_STR = '0';
const WATER_INT = 0;
const LAND_STR = '1';
const LAND_INT = 1;

export default class SeaParser {
  /**
   * Returns a Sea type from a grid string.
   *
   * @param grid - a string. The only values that are as tiles are the values
   * defined WATER (0) and LAND (1). Newlines are used to define rows. The coordinate
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
    const relevantTilesRegExp = new RegExp(
      `[^${WATER_STR}${LAND_STR}\\n]`,
      'g'
    );

    const relevantGrid = grid.replace(relevantTilesRegExp, '');

    return relevantGrid
      .split('\n')
      .filter(row => row.length > 0)
      .map(row => {
        return row.split('').map(tile => {
          if (tile === WATER_STR) {
            return WATER_INT;
          } else if (tile === LAND_STR) {
            return LAND_INT;
          } else {
            throw new Error('Logic error. This should never happen!');
          }
        });
      });
  }
}
