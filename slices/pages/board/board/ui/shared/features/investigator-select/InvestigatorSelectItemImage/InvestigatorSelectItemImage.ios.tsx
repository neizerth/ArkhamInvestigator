import { getInvestigatorImageUrl } from "@shared/api";
import { Image } from "expo-image";
import { useMemo } from "react";
import * as C from "./InvestigatorSelectItemImage.components";
import type { InvestigatorSelectItemImageProps } from "./InvestigatorSelectItemImage.types";

export const InvestigatorSelectItemImage = ({
	active,
	code,
	version,
	...props
}: InvestigatorSelectItemImageProps) => {
	const source = useMemo(() => {
		return {
			uri: getInvestigatorImageUrl({
				code,
				type: "square",
				grayscale: !active,
				version,
			}),
		};
	}, [active, code, version]);

	return (
		<C.ImageContainer>
			<Image {...props} source={source} />
		</C.ImageContainer>
	);
};
