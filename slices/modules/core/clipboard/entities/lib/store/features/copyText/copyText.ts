import { createAction } from "@reduxjs/toolkit";

type CopyTextPayload = {
	text: string;
	message?: string;
};

export const copyText = createAction<CopyTextPayload>("clipboard/copyText");
