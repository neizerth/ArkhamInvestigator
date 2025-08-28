import type { ImageProps, ViewProps } from "react-native";
import type { GetSignatureImageUrlOptions } from "../../../../shared/api";

import { RawSignatureImage } from "@modules/signature/base/shared/ui";
import { CachedSignatureImage } from "@modules/signature/signature-image-cache/shared/ui";
import * as C from "./StaticSignatureImage.components";

export type StaticSignatureImageProps = Omit<ImageProps, "source"> & {
	contentContainerStyle?: ViewProps["style"];
	uri?: string;
	cached?: boolean;
} & GetSignatureImageUrlOptions;

export const StaticSignatureImage = ({
	contentContainerStyle,
	cached,
	...props
}: StaticSignatureImageProps) => {
	const Component = cached ? CachedSignatureImage : RawSignatureImage;
	return (
		<C.Container style={contentContainerStyle}>
			<Component {...props} />
		</C.Container>
	);
};
