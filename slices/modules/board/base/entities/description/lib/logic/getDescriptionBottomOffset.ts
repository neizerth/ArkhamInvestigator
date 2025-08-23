import { DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT } from "../../config";

export const getDescriptionBottomOffset = (descriptionHeight: number) => {
	return descriptionHeight - DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT;
};
