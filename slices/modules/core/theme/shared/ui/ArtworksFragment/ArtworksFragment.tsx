import { useAppSelector } from "@shared/lib";
import type { PropsWithChildren } from "react";
import { selectArtworksEnabled } from "../../lib";

export type ArtworksFragmentProps = PropsWithChildren & {
	disabled?: boolean;
};

export const ArtworksFragment = ({
	disabled,
	children,
}: ArtworksFragmentProps) => {
	const artworksEnabled = useAppSelector(selectArtworksEnabled);

	if (!artworksEnabled && !disabled) {
		return null;
	}

	if (artworksEnabled && disabled) {
		return null;
	}

	return children;
};
