import { water, land } from './../types/sea';
import {findIslands, labelRows} from '.'

describe('algorithm', () => {
    const emptySea = [[]]

    const singleWaterSea = [[water]]

    const singleLandSea = [[land]]

    const allWaterRowSea = [[water, water, water, water, water]]

    const allLandRowSea = [[land, land, land, land, land]]

    const allWaterColumnSea = [[water], [water], [water], [water], [water]]

    const allLandColumnSea = [[land], [land], [land], [land], [land]]

    const singleRowSea = [[land, land, water, water, land]]

    const singleColumnSea = [[land], [land], [water], [land], [land]]

    const sea0 = [[land, land, water, water, land],
    [water, land, water, water, land],
    [land, water, water, land, land],
    [water, water, water, water, water],
    [land, water, land, water, land]];

    test('labelRows', () => {
        expect(labelRows(emptySea)).toEqual(emptySea)
        expect(labelRows(singleWaterSea)).toEqual([[0]])
        expect(labelRows(singleLandSea)).toEqual([[1]])
        expect(labelRows(allWaterRowSea)).toEqual([[0, 0, 0, 0, 0]])
        expect(labelRows(allLandRowSea)).toEqual([[1, 1, 1, 1, 1]])
        expect(labelRows(allWaterColumnSea)).toEqual([[0], [0], [0], [0], [0]])
        expect(labelRows(allLandColumnSea)).toEqual([[1], [1], [1], [1], [1]])
        expect(labelRows(singleRowSea)).toEqual([[1, 1, 0, 0, 2]])
        expect(labelRows(singleColumnSea)).toEqual([[1], [1], [0], [1], [1]])

        const expectedSea0 = [
            [1, 1, 0, 0, 2],
            [0, 1, 0, 0, 1],
            [1, 0, 0, 2, 1],
            [0, 0, 0, 0, 0],
            [1, 0, 2, 0, 3]
        ]

        expect(labelRows(sea0)).toEqual(expectedSea0)
    })
})
