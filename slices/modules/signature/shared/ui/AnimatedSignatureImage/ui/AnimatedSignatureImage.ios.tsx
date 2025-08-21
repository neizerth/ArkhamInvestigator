import { useOpacityAnimation } from "../lib";
import type { AnimatedSignatureImageProps } from "../model";
import * as C from "./AnimatedSignatureImage.components";

export const AnimatedSignatureImage = ({
	contentContainerStyle,
	grayscale = false,
	...props
}: AnimatedSignatureImageProps) => {
	const grayscaleStyle = useOpacityAnimation(grayscale);

	return (
		<C.Container style={[contentContainerStyle]}>
			<C.GrayscaleContainer style={grayscaleStyle}>
				<C.GrayscaleImage {...props} grayscale />
			</C.GrayscaleContainer>

			<C.Image {...props} />
		</C.Container>
	);
};
