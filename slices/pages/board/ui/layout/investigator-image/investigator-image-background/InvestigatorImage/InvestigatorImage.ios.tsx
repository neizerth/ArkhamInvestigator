import { useCallback, useState } from "react";
import * as C from "./InvestigatorImage.components";
import type { InvestigatorImageProps } from "./InvestigatorImage.types";
import { useOpacityAnimation } from "./hooks";

type LoadingState = "ready" | "complete" | "loading";

export const InvestigatorImage = ({
	contentContainerStyle,
	style,
	...props
}: InvestigatorImageProps) => {
	const { layout, source } = props;
	const grayscaleStyle = useOpacityAnimation();

	const [loading, setLoading] = useState(false);

	const onLoadStart = useCallback(() => {
		setLoading(true);
	}, []);

	const onLoadEnd = useCallback(async () => {
		setLoading(false);
	}, []);

	// const loadingStyle = loading
	// 	? {
	// 			opacity: 0,
	// 		}
	// 	: {};

	return (
		<C.Container layout={layout} style={[contentContainerStyle]}>
			{!loading && (
				<C.GrayscaleContainer style={grayscaleStyle}>
					<C.GrayscaleBackground source={source} layout={layout} />
				</C.GrayscaleContainer>
			)}

			<C.Background
				{...props}
				style={[style]}
				source={source}
				layout={layout}
				onLoadStart={onLoadStart}
				onLoadEnd={onLoadEnd}
			/>
		</C.Container>
	);
};
