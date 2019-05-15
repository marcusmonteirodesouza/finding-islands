export function safeAccess(arr: any[], i: number): any {
  return arr && i >= 0 && i < arr.length ? arr[i] : null;
}
