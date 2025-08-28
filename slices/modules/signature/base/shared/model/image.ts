import type { BoxLayout } from "@shared/model";

export type SignatureImageType = "full" | "square";

export type SignatureImageLayout = {
	crop: BoxLayout;
	scale: number;
	faceHeightPercent: number;
};
