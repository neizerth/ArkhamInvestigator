import { useBoolean } from "@shared/lib";
import { useEffect } from "react";
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

	const [loading, setLoading] = useBoolean(false);

	useEffect(() => {
		setLoading.off();
	}, [setLoading.off]);

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
				onLoadStart={setLoading.on}
				onLoadEnd={setLoading.off}
			/>
		</C.Container>
	);
};
