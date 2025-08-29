import { useOpacityAnimation } from "../lib";
import type { AnimatedGrayscaleImageProps } from "../model";
import * as C from "./AnimatedGrayscaleImage.components";

export const AnimatedGrayscaleImage = ({
	contentContainerStyle,
	grayscale = false,
	...props
}: AnimatedGrayscaleImageProps) => {
	const grayscaleStyle = useOpacityAnimation(grayscale);

	return (
		<C.Container style={[contentContainerStyle]}>
			<C.GrayscaleContainer style={grayscaleStyle}>
				<C.GrayscaleImage {...props} source={props.grayscaleSource} />
			</C.GrayscaleContainer>

			<C.Image {...props} />
		</C.Container>
	);
};
