export function safeAccess(arr: any[], i: number): any {
    if (arr && i >= 0 && i < arr.length) {
        return arr[i];
    }
    return null;
}
