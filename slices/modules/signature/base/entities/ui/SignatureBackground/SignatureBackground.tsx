import type { BoxLayout } from "@shared/model";
import type { SignatureImageProps } from "../signature-image";
import * as C from "./SignatureBackground.components";

export type SignatureBackgroundProps = SignatureImageProps & {
	layout: BoxLayout;
};

export const SignatureBackground = ({
	layout,
	...props
}: SignatureBackgroundProps) => {
	const contentContainerStyle = {
		position: "absolute" as const,
		left: -layout.left,
		top: -layout.top,
		width: layout.width,
		height: layout.height,
	};

	const imageStyle = {
		width: layout.width,
		height: layout.height,
	};

	return (
		<C.Background
			{...props}
			animated
			// contentContainerStyle={contentContainerStyle}
			// style={imageStyle}
		/>
	);
};
