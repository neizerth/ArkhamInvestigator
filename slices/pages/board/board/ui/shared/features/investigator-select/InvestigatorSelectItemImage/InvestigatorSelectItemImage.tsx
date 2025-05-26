import { getInvestigatorImageUrl } from "@shared/api";
import { Image } from "expo-image";
import { useMemo } from "react";
import * as C from "./InvestigatorSelectItemImage.components";
import type { InvestigatorSelectItemImageProps } from "./InvestigatorSelectItemImage.types";

export const InvestigatorSelectItemImage = ({
	code,
	version,
	active,
	style,
	...props
}: InvestigatorSelectItemImageProps) => {
	const source = useMemo(() => {
		return {
			uri: getInvestigatorImageUrl({
				code,
				type: "square",
				version,
			}),
		};
	}, [code, version]);

	const grayscaleStyle = !active && {
		filter: "grayscale(1)",
	};

	return (
		<C.ImageContainer style={grayscaleStyle}>
			<Image {...props} source={source} style={style} />
		</C.ImageContainer>
	);
};
