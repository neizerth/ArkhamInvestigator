import { selectChaosBagEnabledInternal } from "@modules/chaos-bag/base/shared/lib";
import { selectArtworksEnabled } from "@modules/core/theme/shared/lib";
import { createSelector } from "@reduxjs/toolkit";

export const selectChaosBagEnabled = createSelector(
	[selectChaosBagEnabledInternal, selectArtworksEnabled],
	(enabled, artworksEnabled) => artworksEnabled && enabled,
);
