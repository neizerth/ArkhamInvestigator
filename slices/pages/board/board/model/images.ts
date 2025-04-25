import type { Box, ScaledBoxLayout } from "@shared/model";
import type {
	InvestigatorImageMedia,
	InvestigatorImageSource,
} from "arkham-investigator-data";

export type ImageMedia = Omit<InvestigatorImageMedia, "primary"> & {
	sourceId: string;
	enlargeTo?: ImageMedia;
};

export type MediaSourceGroup = InvestigatorImageMedia & {
	source: InvestigatorImageSource;
	media: MediaSource;
};

export type BackgroundLayout = ScaledBoxLayout & {
	image: Box;
};
