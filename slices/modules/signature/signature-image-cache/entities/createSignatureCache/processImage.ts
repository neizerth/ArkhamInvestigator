import { getSignatureImageUrl } from "@modules/signature/base/shared/api";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import { PixelRatio } from "react-native";
import type { CreateSignatureCachePayload } from "./createSignatureCache";

const dpr = PixelRatio.get();

export const processImage = async (payload: CreateSignatureCachePayload) => {
	const { layout, image, view } = payload;
	const { crop } = layout;
	const source = getSignatureImageUrl({
		...payload,
		code: image.id,
	});

	const ctx = ImageManipulator.manipulate(source);

	ctx.crop({
		...crop,
		originX: crop.left,
		originY: crop.top,
	});

	ctx.resize({
		width: view.width * dpr,
		height: view.height * dpr,
	});

	const img = await ctx.renderAsync();
	return img.saveAsync({
		format: SaveFormat.WEBP,
	});
};
