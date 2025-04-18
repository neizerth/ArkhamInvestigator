import type { AssetsLoadState } from "@app/model";
import assets from "@assets/images";
import { preloadImageSource } from "@features/assets";
import { inc } from "ramda";
import { useEffect, useState } from "react";
export const useAppAssets = (): AssetsLoadState => {
	const [loadedCount, setLoadedCount] = useState(0);

	const done = assets.length === loadedCount;
	const next = assets[loadedCount];

	useEffect(() => {
		if (!next || done) {
			return;
		}

		preloadImageSource(next).then(() => setLoadedCount(inc));
	}, [next, done]);

	return {
		total: assets.length,
		loadedCount,
		done,
	};
};
