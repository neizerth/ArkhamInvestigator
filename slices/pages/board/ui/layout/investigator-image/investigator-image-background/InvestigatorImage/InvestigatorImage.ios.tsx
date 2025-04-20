import { getInvestigatorImageUrl } from "@shared/api";
import { useBoolean } from "@shared/lib";
import { memo, useCallback } from "react";
import * as C from "./InvestigatorImage.components";
import type { InvestigatorImageProps } from "./InvestigatorImage.types";
import { useOpacityAnimation } from "./hooks";

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
	const [loading, setLoading] = useBoolean(false);

	const grayscaleStyle = useOpacityAnimation(loading);

	const source = {
		uri: getInvestigatorImageUrl({
			code,
			type: "full",
		}),
	};

	const grayscaleSource = {
		uri: getInvestigatorImageUrl({
			code,
			type: "full",
			grayscale: true,
		}),
	};

	const onLoadEnd = useCallback(() => {
		setLoading.off();
		onLoadEndProp?.();
	}, [onLoadEndProp, setLoading.off]);

	const onLoadStart = useCallback(() => {
		setLoading.on();
		onLoadEndProp?.();
	}, [onLoadEndProp, setLoading.on]);

	return (
		<C.Container style={[contentContainerStyle]}>
			{!loading && (
				<C.GrayscaleContainer style={grayscaleStyle}>
					<C.GrayscaleBackground
						{...props}
						source={grayscaleSource}
						layout={layout}
					/>
				</C.GrayscaleContainer>
			)}

			<C.Background
				{...props}
				style={style}
				source={source}
				layout={layout}
				onLoadStart={onLoadStart}
				onLoadEnd={onLoadEnd}
				onLoad={onLoad}
			/>
		</C.Container>
	);
};

export const InvestigatorImageMemo = memo(InvestigatorImage);
