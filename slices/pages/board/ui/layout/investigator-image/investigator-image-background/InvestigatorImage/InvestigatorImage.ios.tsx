import { getInvestigatorImageUrl } from "@shared/api";
import * as C from "./InvestigatorImage.components";
import type { InvestigatorImageProps } from "./InvestigatorImage.types";
import { useOpacityAnimation } from "./hooks";

export const InvestigatorImage = ({
	contentContainerStyle,
	style,
	code,
	...props
}: InvestigatorImageProps) => {
	const { layout } = props;
	const grayscaleStyle = useOpacityAnimation();

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

	return (
		<C.Container layout={layout} style={[contentContainerStyle]}>
			<C.GrayscaleContainer style={grayscaleStyle}>
				<C.GrayscaleBackground
					{...props}
					source={grayscaleSource}
					layout={layout}
				/>
			</C.GrayscaleContainer>

			<C.Background
				{...props}
				style={[style]}
				source={source}
				layout={layout}
			/>
		</C.Container>
	);
};
