import { getInvestigatorImageUrl } from "@shared/api";
import { Image } from "expo-image";
import { useMemo } from "react";
import * as C from "../InvestigatorSelectItem.components";
import type { InvestigatorImageProps } from "../InvestigatorSelectItem.types";

export const InvestigatorImage = ({
	code,
	active,
	style,
	...props
}: InvestigatorImageProps) => {
	const source = useMemo(() => {
		return {
			uri: getInvestigatorImageUrl({
				code,
				type: "mini",
			}),
		};
	}, [code]);

	const grayscaleStyle = !active && {
		filter: "grayscale(1)",
	};

	return (
		<C.ImageContainer style={grayscaleStyle}>
			<Image {...props} source={source} style={style} />
		</C.ImageContainer>
	);
};
