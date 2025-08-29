import {
	type GetSignatureImageUrlOptions,
	getSignatureImageUrl,
} from "@modules/signature/base/shared/api";
import {
	AnimatedGrayscaleImage,
	type AnimatedGrayscaleImageProps,
} from "@shared/ui";
import { omit, pick } from "ramda";

export type AnimatedSignatureImageProps = GetSignatureImageUrlOptions &
	AnimatedGrayscaleImageProps;

type PropKey = keyof AnimatedSignatureImageProps;

const sourceProps: PropKey[] = ["code", "pathType", "type"];

export const AnimatedSignatureImage = (props: AnimatedSignatureImageProps) => {
	const { grayscale = false } = props;
	const sourceOptions = pick(sourceProps, props);
	const restProps = omit(sourceProps, props);
	const source = {
		uri: getSignatureImageUrl(sourceOptions),
	};

	const grayscaleSource = {
		uri: getSignatureImageUrl({
			...sourceOptions,
			grayscale: true,
		}),
	};

	return (
		<AnimatedGrayscaleImage
			{...restProps}
			source={source}
			grayscaleSource={grayscaleSource}
			grayscale={grayscale}
		/>
	);
};
