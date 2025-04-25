import { getInvestigatorImageUrl } from "@shared/api";
import { memo } from "react";
import * as C from "./InvestigatorImage.components";
import type { InvestigatorImageProps } from "./InvestigatorImage.types";
import { useGrayscaleAnimation } from "./hooks/useGrayscaleAnimation";

export const InvestigatorImage = ({
	contentContainerStyle,
	code,
	...props
}: InvestigatorImageProps) => {
	const style = useGrayscaleAnimation();
	const source = {
		uri: getInvestigatorImageUrl({
			code,
			type: "full",
		}),
	};

	return (
		<C.AnimatedContainer style={[contentContainerStyle, style]}>
			<C.Background {...props} source={source} />
		</C.AnimatedContainer>
	);
};

export const InvestigatorImageMemo = memo(InvestigatorImage);
