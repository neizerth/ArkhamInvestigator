import { createAction } from "@reduxjs/toolkit";

type ChangeStoryPayload = {
	storyCode?: string;
	referenceCardCode?: string;
	difficultyId?: string;
	fillChaosBag?: boolean;
};

export const changeStory = createAction<ChangeStoryPayload>("story/change");
