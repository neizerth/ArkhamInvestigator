import * as C from "./InvestigatorImage.components";
import type { InvestigatorImageProps } from "./InvestigatorImage.types";
import { useOpacityAnimation } from "./hooks";

export const InvestigatorImage = ({
	contentContainerStyle,
	...props
}: InvestigatorImageProps) => {
	const { layout, source } = props;
	const style = useOpacityAnimation();

	return (
		<C.Container layout={layout} style={[contentContainerStyle]}>
			<C.GrayscaleContainer style={style}>
				<C.GrayscaleBackground source={source} layout={layout} />
			</C.GrayscaleContainer>
			<C.Background {...props} source={source} layout={layout} />
		</C.Container>
	);
};
