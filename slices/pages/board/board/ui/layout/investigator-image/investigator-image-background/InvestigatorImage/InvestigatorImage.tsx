import { getSignatureImageUrl } from "@modules/signature/shared/lib";
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
		uri: getSignatureImageUrl({
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
