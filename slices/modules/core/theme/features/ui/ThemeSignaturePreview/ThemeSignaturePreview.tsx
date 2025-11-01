import { selectArtworksEnabled } from "@modules/core/theme/shared/lib";
import {
	SignaturePreview,
	type SignaturePreviewProps,
} from "@modules/signature/base/entities/ui";
import { useAppSelector } from "@shared/lib";
import { omit, pick } from "ramda";
import * as C from "./ThemeSignaturePreview.components";

export type ThemeSignaturePreviewProps = SignaturePreviewProps;

export const ThemeSignaturePreview = (props: ThemeSignaturePreviewProps) => {
	const artworksEnabled = useAppSelector(selectArtworksEnabled);

	if (artworksEnabled) {
		return <SignaturePreview {...props} />;
	}

	const placeholderProps = pick(["size", "onPress", "style"], props);
	const factionProps = omit(["style"], props);

	return (
		<C.Placeholder {...placeholderProps}>
			<C.Faction {...factionProps} colored />
		</C.Placeholder>
	);
};
