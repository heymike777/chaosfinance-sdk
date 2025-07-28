export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isEmptyString(str: string) {
  return str === "" || str === undefined || str === null;
}
