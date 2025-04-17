import * as C from "./InvestigatorImage.components";
import type { InvestigatorImageProps } from "./InvestigatorImage.types";
import { useGrayscaleAnimation } from "./hooks/useGrayscaleAnimation";

export const InvestigatorImage = ({
	contentContainerStyle,
	...props
}: InvestigatorImageProps) => {
	const style = useGrayscaleAnimation();
	return (
		<C.AnimatedContainer style={[contentContainerStyle, style]}>
			<C.Background {...props} />
		</C.AnimatedContainer>
	);
};
