import type { Box } from "@shared/model";

export const INVESTIGATORS_API_URL = process.env
	.EXPO_PUBLIC_INVESTIGATORS_API_URL as string;
export const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

export const miniImageSize: Box = {
	width: 484,
	height: 744,
};
