import { Image, type ImageProps } from "expo-image";
import { pick } from "ramda";
import {
	type GetSignatureImageUrlOptions,
	getSignatureImageUrl,
} from "../../api";

export type StaticSignatureImageProps = Omit<ImageProps, "source"> &
	GetSignatureImageUrlOptions;

export const StaticSignatureImage = (props: StaticSignatureImageProps) => {
	const sourceProps = pick(["code", "type", "grayscale", "pathType"], props);
	const source = {
		uri: getSignatureImageUrl(sourceProps),
	};
	return <Image {...props} source={source} />;
};
