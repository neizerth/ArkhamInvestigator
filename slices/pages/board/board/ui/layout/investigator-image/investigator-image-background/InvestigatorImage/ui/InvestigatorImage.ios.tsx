import { getSignatureImageUrl } from "@modules/signature/shared/api";
import { memo } from "react";
import { useOpacityAnimation } from "../lib";
import * as C from "./InvestigatorImage.components";
import type { InvestigatorImageProps } from "./InvestigatorImage.types";

export const InvestigatorImage = ({
	contentContainerStyle,
	style,
	code,
	onLoad,
	onLoadStart: onLoadStartProp,
	onLoadEnd: onLoadEndProp,
	...props
}: InvestigatorImageProps) => {
	const { layout } = props;

	const grayscaleStyle = useOpacityAnimation(code);

	const source = {
		uri: getSignatureImageUrl({
			code,
			type: "full",
		}),
	};

	const grayscaleSource = {
		uri: getSignatureImageUrl({
			code,
			type: "full",
			grayscale: true,
		}),
	};

	return (
		<C.Container style={[contentContainerStyle]}>
			<C.GrayscaleContainer style={grayscaleStyle}>
				<C.GrayscaleBackground
					{...props}
					source={grayscaleSource}
					layout={layout}
				/>
			</C.GrayscaleContainer>

			<C.Background
				{...props}
				style={style}
				source={source}
				layout={layout}
				onLoad={onLoad}
			/>
		</C.Container>
	);
};

export const InvestigatorImageMemo = memo(InvestigatorImage);
