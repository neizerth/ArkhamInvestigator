import { selectArtworksEnabled } from "@modules/core/theme/shared/lib";
import { getSignatureImageUrl } from "@modules/signature/base/shared/api";
import type { SelectedSignature } from "@modules/signature/signature-selection/shared/model";
import { useAppSelector } from "@shared/lib";
import { Fragment } from "react";
import type { ViewProps } from "react-native";
import * as C from "./SelectedSignaturePreview.components";

export type SelectedSignaturePreviewProps = ViewProps & {
	signatures: SelectedSignature[];
};

const getImageSource = ({ code, image }: SelectedSignature) => ({
	uri: getSignatureImageUrl({
		code: image.id || code,
		type: "square",
	}),
});

export const SelectedSignaturePreview = ({
	signatures,
	...props
}: SelectedSignaturePreviewProps) => {
	const artworksEnabled = useAppSelector(selectArtworksEnabled);
	return (
		<C.Container {...props}>
			{signatures.map((item) => (
				<Fragment key={item.id}>
					{artworksEnabled ? (
						<C.InvestigatorImage source={getImageSource(item)} />
					) : (
						<C.Faction faction={item.signature.faction_code} colored light />
					)}
				</Fragment>
			))}
		</C.Container>
	);
};
