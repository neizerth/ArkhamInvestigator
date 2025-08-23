import { descriptionImages } from "@assets/images/game/description";
import { getBoxByRatio } from "@shared/lib/util/size/box";
import type { PropsWithFaction } from "@shared/model";
import type { ImageBackgroundProps } from "@shared/ui";
import * as C from "./FactionDescription.components";
import { descriptionSize } from "./FactionDescription.styles";

export type FactionDescriptionProps = Omit<ImageBackgroundProps, "source"> &
	PropsWithFaction;

export const FactionDescription = ({
	children,
	faction,
	...props
}: FactionDescriptionProps) => {
	const { width, height } = props;

	const box = {
		width,
		height,
	};

	const imageBox = getBoxByRatio({
		ratio: descriptionSize.ratio,
		box,
	});

	if (!imageBox) {
		return null;
	}

	const source = descriptionImages[faction];

	return (
		<C.Background {...props} source={source} box={imageBox}>
			<C.Content box={imageBox} faction={faction}>
				{children}
			</C.Content>
		</C.Background>
	);
};
