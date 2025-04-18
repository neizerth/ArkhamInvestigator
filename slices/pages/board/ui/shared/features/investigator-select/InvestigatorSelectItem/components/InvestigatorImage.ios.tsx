import { GrayscaleImage } from "@shared/ui";
import type { ImageURISource } from "react-native";
import FastImage from "react-native-fast-image";
import type { InvestigatorImageProps } from "../InvestigatorSelectItem.types";

export const InvestigatorImage = ({
	active,
	...props
}: InvestigatorImageProps) => {
	if (active) {
		return <FastImage {...props} />;
	}

	const source = props.source as ImageURISource;
	return <GrayscaleImage source={source} />;
};
