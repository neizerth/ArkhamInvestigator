export const formatValue = (value: number) => {
	if (value === Number.POSITIVE_INFINITY) {
		return "∞";
	}
	if (value === Number.NEGATIVE_INFINITY) {
		return "-∞";
	}
	return value.toString();
};
