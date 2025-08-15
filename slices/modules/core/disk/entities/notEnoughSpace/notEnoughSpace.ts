import { createAction } from "@reduxjs/toolkit";

type NotEnoughSpacePayload = {
	total: number;
	required: number;
};

export const notEnoughSpace = createAction<NotEnoughSpacePayload>(
	"disk/notEnoughSpace",
);
