import { useGrayscaleAnimation } from "../lib";
import type { AnimatedSignatureImageProps } from "../model";
import * as C from "./AnimatedSignatureImage.components";

export const AnimatedSignatureImage = ({
	contentContainerStyle,
	grayscale = false,
	...props
}: AnimatedSignatureImageProps) => {
	const style = useGrayscaleAnimation(grayscale);

	return (
		<C.AnimatedContainer style={[contentContainerStyle, style]}>
			<C.Image {...props} />
		</C.AnimatedContainer>
	);
};
