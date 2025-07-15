export type ReplaceTokenValueEffectCallbackOptions = {
	value: number;
	text: string;
};

export type ReplaceTokenValueEffectCallback = (
	options: ReplaceTokenValueEffectCallbackOptions,
) => string;
