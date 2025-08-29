import { useGrayscaleAnimation } from "../lib";
import type { AnimatedGrayscaleImageProps } from "../model";
import * as C from "./AnimatedGrayscaleImage.components";

export const AnimatedGrayscaleImage = ({
	contentContainerStyle,
	grayscale = false,
	...props
}: AnimatedGrayscaleImageProps) => {
	const style = useGrayscaleAnimation(grayscale);

	return (
		<C.AnimatedContainer style={[contentContainerStyle, style]}>
			<C.Image {...props} />
		</C.AnimatedContainer>
	);
};
