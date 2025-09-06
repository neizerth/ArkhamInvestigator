import type { InvestigatorBoardImage } from "@modules/board/base/shared/model";
import type { SignatureImageLayout } from "@modules/signature/base/shared/model";
import type { Box } from "@shared/model";
import * as FileSystem from "expo-file-system";
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

	// Validate that the source file exists and is accessible
	const fileInfo = await FileSystem.getInfoAsync(source);
	if (!fileInfo.exists) {
		throw new Error(`Source image file does not exist: ${source}`);
	}

	if (fileInfo.size === 0) {
		throw new Error(`Source image file is empty: ${source}`);
	}

	const { crop } = layout;

	try {
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
	} catch (error) {
		// Provide more specific error information
		if (error instanceof Error) {
			throw new Error(`Failed to process image ${source}: ${error.message}`);
		}
		throw new Error(`Failed to process image ${source}: Unknown error`);
	}
};
