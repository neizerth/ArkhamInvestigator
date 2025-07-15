type Options = {
	text: string;
	value: number;
};

export const replaceXEffectValue = ({ text, value }: Options) => {
	return text.replace(/([-—−]X)/, `${value} ($1)`);
};
