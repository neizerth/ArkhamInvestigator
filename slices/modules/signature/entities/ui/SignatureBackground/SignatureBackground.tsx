import type { BoxLayout } from "@shared/model";
import { useMemo } from "react";
import type { SignatureImageProps } from "../signature-image";
import * as C from "./SignatureBackground.components";

export type SignatureBackgroundProps = SignatureImageProps & {
	layout: BoxLayout;
};

export const SignatureBackground = ({
	layout,
	...props
}: SignatureBackgroundProps) => {
	const style = useMemo(() => {
		return {
			top: -layout.top,
			left: -layout.left,
			width: layout.width,
			height: layout.height,
		};
	}, [layout]);
	return <C.Background {...props} style={[props.style, style]} animated />;
};
