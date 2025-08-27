import { pick } from "ramda";
import type { ImageProps, ViewProps } from "react-native";
import {
	type GetSignatureImageUrlOptions,
	getSignatureImageUrl,
} from "../../../api";

import * as C from "./StaticSignatureImage.components";

export type StaticSignatureImageProps = Omit<ImageProps, "source"> &
	GetSignatureImageUrlOptions & {
		contentContainerStyle?: ViewProps["style"];
	};

export const StaticSignatureImage = ({
	contentContainerStyle,
	...props
}: StaticSignatureImageProps) => {
	const sourceProps = pick(["code", "type", "grayscale", "pathType"], props);
	const source = {
		uri: getSignatureImageUrl(sourceProps),
	};
	return (
		<C.Container style={contentContainerStyle}>
			<C.Image {...props} source={source} />
		</C.Container>
	);
};
