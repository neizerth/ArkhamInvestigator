import { GrayscaleImage } from "@shared/ui";
import { Image } from "react-native";
import type { InvestigatorImageProps } from "../InvestigatorSelectItem.types";

export const InvestigatorImage = ({
	active,
	...props
}: InvestigatorImageProps) => {
	if (active) {
		return <Image {...props} />;
	}

	return <GrayscaleImage {...props} />;
};
