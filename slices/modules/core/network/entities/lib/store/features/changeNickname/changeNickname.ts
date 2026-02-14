import { createAction } from "@reduxjs/toolkit";

export const changeNickname = createAction<string>("network/changeNickname");

type NicknameChangedPayload = {
	oldValue: string | null;
	value: string;
};
export const nicknameChanged = createAction<NicknameChangedPayload>(
	"network/nicknameChanged",
);
