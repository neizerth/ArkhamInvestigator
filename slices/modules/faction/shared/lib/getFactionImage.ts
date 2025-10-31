import type { Faction, FactionImages } from "../model";

type ImagesSource = {
	default: FactionImages;
	parallel: FactionImages;
};

type Options = {
	images: ImagesSource;
	faction: Faction;
	parallel: boolean;
};

export const getFactionImage = ({ images, faction, parallel }: Options) => {
	const factionImages = parallel ? images.parallel : images.default;
	const source = factionImages[faction];
	return source;
};
