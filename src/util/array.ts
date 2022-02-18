export const next = (arr: Array<unknown>, curIdx: number): number => {
	return curIdx === arr.length - 1 ? 0 : curIdx + 1;
};

export const prev = (arr: Array<unknown>, curIdx: number): number => {
	return curIdx === 0 ? arr.length - 1 : curIdx - 1;
};
