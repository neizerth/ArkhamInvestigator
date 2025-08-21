import { Image, type ImageProps } from "expo-image";
import { pick } from "ramda";
import {
	type GetSignatureImageUrlOptions,
	getSignatureImageUrl,
} from "../../lib";

export type SignatureImageProps = Omit<ImageProps, "source"> &
	GetSignatureImageUrlOptions;

export const SignatureImage = (props: SignatureImageProps) => {
	const sourceProps = pick(["code", "type", "grayscale", "pathType"], props);
	const source = {
		uri: getSignatureImageUrl(sourceProps),
	};
	return <Image {...props} source={source} />;
};
