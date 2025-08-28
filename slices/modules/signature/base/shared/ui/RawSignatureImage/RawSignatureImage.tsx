import { pick } from "ramda";
import type { ImageProps } from "react-native";
import { Image } from "react-native";
import {
	type GetSignatureImageUrlOptions,
	getSignatureImageUrl,
} from "../../api";

export type RawSignatureImageProps = ImageProps & GetSignatureImageUrlOptions;

export const RawSignatureImage = (props: RawSignatureImageProps) => {
	const sourceProps = pick(["code", "type", "grayscale", "pathType"], props);
	const source = {
		uri: getSignatureImageUrl(sourceProps),
	};
	return <Image {...props} source={source} />;
};
