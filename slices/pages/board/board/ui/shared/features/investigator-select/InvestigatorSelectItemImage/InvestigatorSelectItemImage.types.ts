import type { ImageProps } from "expo-image";

export type InvestigatorSelectItemImageProps = Omit<ImageProps, "source"> & {
	active?: boolean;
	version?: number;
	code: string;
};
