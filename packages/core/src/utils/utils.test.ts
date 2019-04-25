import { safeAccess } from ".";

describe("utils", () => {
  test("safeAccess", () => {
    expect(safeAccess([], 0)).toEqual(null);
    expect(safeAccess([], 1)).toEqual(null);
    expect(safeAccess([0], 0)).toEqual(0);
    expect(safeAccess([0], 1)).toEqual(null);
    expect(safeAccess([0, 1], 0)).toEqual(0);
    expect(safeAccess([0, 1], 1)).toEqual(1);
    expect(safeAccess([0, 1], 2)).toEqual(null);
  });
});
