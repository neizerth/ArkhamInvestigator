import { descriptionSize } from "@pages/board/config";
import { getBoxByRatio } from "@shared/lib/util/size/box";
import type { PropsWithFaction } from "@shared/model";
import type { ImageBackgroundProps } from "react-native";
import * as C from "./InvestigatorDescription.components";
import { images } from "./images";

export type InvestigatorDescriptionProps = Omit<
	ImageBackgroundProps,
	"source"
> &
	PropsWithFaction;

export const InvestigatorDescription = ({
	children,
	faction,
	...props
}: InvestigatorDescriptionProps) => {
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

	const source = images[faction];

	return (
		<C.Background {...props} source={source} box={imageBox}>
			<C.Content box={imageBox} faction={faction}>
				{children}
			</C.Content>
		</C.Background>
	);
};
