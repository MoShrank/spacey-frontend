export const getTimeFormatted = (date?: Date) => {
	if (!date) date = new Date();
	return date.toISOString();
};
