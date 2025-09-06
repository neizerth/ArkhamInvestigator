import { createAction } from "@reduxjs/toolkit";

export type UnzipPayload = {
	src: string;
	dest: string;
	unlink?: boolean;
};

export const unzip = createAction<UnzipPayload>("disk/unzip");

export type UnzipCompletePayload = UnzipPayload & {
	path: string;
};

export const unzipComplete =
	createAction<UnzipCompletePayload>("disk/unzipComplete");

export type UnzipErrorPayload = UnzipPayload & {
	error: string;
};

export const unzipError = createAction<UnzipErrorPayload>("disk/unzipError");
