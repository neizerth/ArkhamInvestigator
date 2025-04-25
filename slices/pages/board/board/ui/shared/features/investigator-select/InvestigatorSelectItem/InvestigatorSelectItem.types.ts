import type { ImageProps } from "expo-image";

export type InvestigatorImageProps = Omit<ImageProps, "source"> & {
	active?: boolean;
	code: string;
};
