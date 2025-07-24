type Options = {
	text: string;
	value: number;
};

export const replaceNumericEffectValue = ({ text, value }: Options) => {
	return text.replace(/([-—−]?\d+)/, (source) => {
		const sourceValue = +source.replace(/[-—−]/, "-");
		if (!Number.isNaN(sourceValue) && sourceValue === value) {
			return source;
		}
		return `${value}`;
	});
};
