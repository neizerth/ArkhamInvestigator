import { createAction } from "@reduxjs/toolkit";

export type CreateGrayscaleImagePayload = {
	source: string;
	path: string;
};

export const createGrayscaleImage = createAction<CreateGrayscaleImagePayload>(
	"image/createGrayscale",
);

export const grayscaleImageCreated = createAction<CreateGrayscaleImagePayload>(
	"image/grayscaleCreated",
);
