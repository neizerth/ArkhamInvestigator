type GetGridSizeOptions = {
	containerSize: number;
	gap: number;
	maxItemSize: number;
	minCount: number;
	padding: number;
};

export const getGridSize = (options: GetGridSizeOptions) => {
	const { containerSize, gap, maxItemSize, minCount, padding } = options;
	const count = Math.floor((containerSize - padding) / (maxItemSize + gap));
	return Math.max(count, minCount);
};

export const getGridItemSize = (options: GetGridSizeOptions) => {
	const { containerSize, gap, padding } = options;

	const columnsCount = getGridSize(options);

	const containerWidth = containerSize - padding;

	const contentWidth = containerWidth - (columnsCount - 1) * gap;

	const size = contentWidth / columnsCount;
	const columns = columnsCount;

	return { size, columns };
};
