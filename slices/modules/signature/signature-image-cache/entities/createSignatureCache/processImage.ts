import type { InvestigatorBoardImage } from "@modules/board/base/shared/model";
import type { SignatureImageLayout } from "@modules/signature/base/shared/model";
import type { Box } from "@shared/model";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import { PixelRatio } from "react-native";

const dpr = PixelRatio.get();

type Options = {
	image: InvestigatorBoardImage;
	view: Box;
	layout: SignatureImageLayout;
	source: string;
};

export const processImage = async (payload: Options) => {
	const { view, layout, source } = payload;

	const { crop } = layout;

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
	const response = await img.saveAsync({
		format: SaveFormat.WEBP,
	});

	return response;
};
