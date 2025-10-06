import { ASSET_URL, HAVE_AVIF_SUPPORT } from "@shared/config";
import { Platform } from "react-native";

const color = Platform.OS === "ios" ? "" : ".color";
const name = HAVE_AVIF_SUPPORT ? "avif" : "webp";

export const externalImagesFilename = `${name}${color}.zip`;
export const externalImagesUrl = `${ASSET_URL}/images/${externalImagesFilename}`;

export const externalImagesArchiveDiskPath = "images.zip";

export const externalImagesDiskPath = "images";
