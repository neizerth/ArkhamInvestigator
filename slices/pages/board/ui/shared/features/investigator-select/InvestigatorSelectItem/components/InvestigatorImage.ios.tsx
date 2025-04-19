import { getInvestigatorImageUrl } from "@shared/api";
import { Image } from "expo-image";
import { useMemo } from "react";
import * as C from "../InvestigatorSelectItem.components";
import type { InvestigatorImageProps } from "../InvestigatorSelectItem.types";

export const InvestigatorImage = ({
	active,
	code,
	...props
}: InvestigatorImageProps) => {
	const source = useMemo(() => {
		return {
			uri: getInvestigatorImageUrl({
				code,
				type: "mini",
				grayscale: !active,
			}),
		};
	}, [active, code]);

	return (
		<C.ImageContainer>
			<Image {...props} source={source} />
		</C.ImageContainer>
	);
};
