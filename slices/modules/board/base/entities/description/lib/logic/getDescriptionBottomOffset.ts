import { DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT } from "../../config";

type Options = {
	descriptionHeight: number;
};

export const getDescriptionBottomOffset = (options: Options) => {
	const { descriptionHeight } = options;
	return descriptionHeight - DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT;
};
