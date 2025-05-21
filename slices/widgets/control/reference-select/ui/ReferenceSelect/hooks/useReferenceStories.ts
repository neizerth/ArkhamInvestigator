import { selectCurrentLanguage } from "@features/i18n";
import {
	selectShowFanMadeStories,
	selectShowTranslatedOnlyStories,
	selectStories,
	selectStory,
	selectStoryTypeFilter,
	useAppSelector,
} from "@shared/lib";
import type { Story } from "@shared/model";
import { useCallback, useMemo } from "react";

export const useReferenceStories = () => {
	const translated = useAppSelector(selectShowTranslatedOnlyStories);
	const custom = useAppSelector(selectShowFanMadeStories);
	const stories = useAppSelector(selectStories);
	const language = useAppSelector(selectCurrentLanguage);
	const storyType = useAppSelector(selectStoryTypeFilter);

	const story = useAppSelector(selectStory);

	const mapStory = useCallback(
		(story: Story) => {
			return {
				label: story.name,
				value: story,
				translated: language === story.locale,
			};
		},
		[language],
	);

	return useMemo(() => {
		return stories.map(mapStory).filter((item) => {
			const { value } = item;
			if (value.code === story?.code) {
				return true;
			}

			if (translated && !item.translated) {
				return false;
			}
			if (!custom && !value.official) {
				return false;
			}
			const isCampaign = ["side_campaign", "campaign"].includes(value.type);

			if (storyType === "campaign" && !isCampaign) {
				return false;
			}

			if (storyType === "scenario" && isCampaign) {
				return false;
			}

			return true;
		});
	}, [stories, story, mapStory, storyType, translated, custom]);
};
