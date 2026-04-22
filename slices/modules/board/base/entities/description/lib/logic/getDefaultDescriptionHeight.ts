import {
	DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT,
	DESCRIPTION_NAVBAR_OFFSET,
} from "../../config";

type Options = {
	navbarHeight: number;
};

export const getDefaultDescriptionHeight = ({ navbarHeight }: Options) => {
	if (navbarHeight > 0) {
		return DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT + DESCRIPTION_NAVBAR_OFFSET;
	}

	return DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT;
};
