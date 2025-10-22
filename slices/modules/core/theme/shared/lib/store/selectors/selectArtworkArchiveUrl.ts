import { createSelector } from "@reduxjs/toolkit";
import { getArtworkImagesArchiveUrl } from "../../logic";
import { selectArtworkUrl } from "../theme";

export const selectArtworkArchiveUrl = createSelector(
	selectArtworkUrl,
	(artworkUrl) => {
		if (!artworkUrl) {
			return;
		}
		return getArtworkImagesArchiveUrl(artworkUrl);
	},
);
