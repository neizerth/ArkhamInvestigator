import { createSelector } from "@reduxjs/toolkit";
import { selectArtworkUrl } from "../theme";

export const selectArtworksEnabled = createSelector(
	[selectArtworkUrl],
	(artworkUrl) => Boolean(artworkUrl),
);
