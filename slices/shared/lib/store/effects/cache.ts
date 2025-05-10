import type { AppThunk } from "@shared/model";
import { Image as ExpoImage } from "expo-image";

export const clearImageCache = (): AppThunk => () => {
	ExpoImage.clearDiskCache();
};
