import { ASSET_URL, HAVE_AVIF_SUPPORT } from "@shared/config";
import { Platform } from "react-native";

const postfix = Platform.OS === "ios" ? "" : ".color";
const name = HAVE_AVIF_SUPPORT ? "avif" : "wepb";

export const externalImagesFilename = `${name}${postfix}.zip`;
export const externalImagesUrl = `${ASSET_URL}/${externalImagesFilename}`;

export const externalImagesArchiveDiskPath = "images.zip";

export const externalImagesDiskPath = "images";
