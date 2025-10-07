import { createAction } from "@reduxjs/toolkit";

export type RemoveDirectoryPayload = {
	directory: string;
};

export const removeDirectory = createAction<RemoveDirectoryPayload>(
	"disk/removeDirectory",
);
