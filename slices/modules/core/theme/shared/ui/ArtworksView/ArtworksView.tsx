import { useAppSelector } from "@shared/lib";
import type { PropsWithChildren } from "react";
import { selectArtworksEnabled } from "../../lib";

export type ArtworksViewProps = PropsWithChildren & {
	disabled?: boolean;
};

export const ArtworksView = ({ disabled, children }: ArtworksViewProps) => {
	const artworksEnabled = useAppSelector(selectArtworksEnabled);

	if (!artworksEnabled && !disabled) {
		return null;
	}

	if (artworksEnabled && disabled) {
		return null;
	}

	return children;
};
