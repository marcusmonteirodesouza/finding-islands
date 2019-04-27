import SeaParser from ".";
import { LAND, WATER } from "@finding-islands/core";
import * as fc from "fast-check";

function includesRelevantTiles(str: string): boolean {
  return [LAND, WATER].map(n => n.toString()).some(c => str.includes(c));
}

describe("SeaParser", () => {
  describe("parseGrid", () => {
    const p = SeaParser.parseGrid;

    test(`Only ${LAND}, ${WATER} characters are taken into consideration`, () => {
      fc.assert(
        fc.property(fc.string(), str => {
          fc.pre(!includesRelevantTiles(str));
          expect(p(str)).toEqual([]);
        })
      );
    });

    test("single line grid", () => {
      expect(p("0")).toEqual([[0]]);
      expect(p("1")).toEqual([[1]]);
      expect(p("00")).toEqual([[0, 0]]);
      expect(p("00100")).toEqual([[0, 0, 1, 0, 0]]);
      expect(p("1 0 1 1")).toEqual([[1, 0, 1, 1]]);
    });

    test("single column grid", () => {
      expect(p("0\n1 ")).toEqual([[0], [1]]);
      expect(p("1     \n  0 ? J S 11")).toEqual([[1], [0, 1, 1]]);
    });

    test("grid with irrelevant characters", () => {
      const grid = `
        1 | 0 ? 11 | 0 | 2 | 3
        4 | 0 | 0 | 1 | 1

        0

        000111
        1?!99
      `;
      const expectedSea = [
        [1, 0, 1, 1, 0],
        [0, 0, 1, 1],
        [0],
        [0, 0, 0, 1, 1, 1],
        [1]
      ];
      expect(p(grid)).toEqual(expectedSea);
    });
  });
});
