import { ASSET_URL, HAVE_AVIF_SUPPORT } from "@shared/config";
const name = HAVE_AVIF_SUPPORT ? "avif" : "webp";

export const externalImagesFilename = `${name}.color.zip`;
export const externalImagesUrl = `${ASSET_URL}/images/${externalImagesFilename}`;

export const externalImagesArchiveDiskPath = "images.zip";

export const externalImagesDiskPath = "images";
