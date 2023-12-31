const sortDesc = (a: number, b: number) => b - a;
const sortAsc = (a: number, b: number) => a - b;
const sortAlphabetically = (a: string, b: string) => a.localeCompare(b);

export { sortDesc, sortAsc, sortAlphabetically };
