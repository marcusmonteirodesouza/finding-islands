import { safeAccess } from '../utils';
import { Sea, land, water } from './../types/sea';

export function findIslands(sea: Sea) {
    // https://www.youtube.com/watch?v=hMIrQdX4BkE
    const labeledSea = labelRows(sea);
    sea.forEach((row, x) => {
        const counter = 0
    })
    sea.map(x => x.map(y => console.log(y)))
    return 1;
}

export function labelRows(sea: Sea): Number[][] {
    return sea.map((row, i) => {
        let counter = 0;
        return row.map((tile, j) => {
            if (tile === land) {
                const tileBehind = safeAccess(row, j - 1) || Number.POSITIVE_INFINITY
                const tileAbove = safeAccess(safeAccess(sea, i - 1), j) || Number.POSITIVE_INFINITY
                const isConnected = (isFinite(tileBehind) && tileBehind !== water) || (isFinite(tileAbove) && tileAbove !== water)
                if (isConnected) {
                    return Math.min(tileBehind, tileAbove)
                } else {
                    counter += 1
                    return counter
                }
            } else {
                return water
            }
        })
    })
}
