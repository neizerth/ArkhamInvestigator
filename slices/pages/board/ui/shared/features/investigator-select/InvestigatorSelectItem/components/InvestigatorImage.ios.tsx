import { GrayscaleImage } from "@shared/ui";
import { Image, type ImageURISource } from "react-native";
import type { InvestigatorImageProps } from "../InvestigatorSelectItem.types";

export const InvestigatorImage = ({
	active,
	...props
}: InvestigatorImageProps) => {
	if (active) {
		return <Image {...props} />;
	}

	const source = props.source as ImageURISource;
	return <GrayscaleImage source={source} />;
};
