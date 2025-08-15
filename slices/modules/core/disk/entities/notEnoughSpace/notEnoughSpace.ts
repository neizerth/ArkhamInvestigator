import { createAction } from "@reduxjs/toolkit";

type NotEnoughSpacePayload = {
	freeSpace: number;
	required: number;
};

export const notEnoughSpace = createAction<NotEnoughSpacePayload>(
	"disk/notEnoughSpace",
);
