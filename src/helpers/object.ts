function containsKey<T extends Record<string, any>>(array: T[], key: string): boolean {
  for (let i = 0; i < array.length; i++) {
    if (key in array[i]) {
      return true;
    }
  }
  return false;
}

export { containsKey }