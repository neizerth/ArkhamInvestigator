import { selectCurrentLanguage } from "@modules/core/i18n/shared/lib";
import {
	selectShowFanMadeStories,
	selectShowTranslatedOnlyStories,
	selectStories,
	selectStory,
	selectStoryTypeFilter,
} from "@modules/stories/shared/lib";
import { useAppSelector } from "@shared/lib";
import type { Story } from "@shared/model";
import { ascend, descend, prop, sortWith } from "ramda";
import { useCallback, useMemo } from "react";

export const useStoryData = () => {
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

	const data = useMemo(() => {
		const data = stories.map(mapStory).filter((item) => {
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

		return sortWith(
			[
				descend(prop("translated")),
				descend((item) => item.value.official),
				ascend((item) => {
					const { official, type } = item.value;
					const pinnedTypes = ["campaign", "side_campaign"];
					if (official && pinnedTypes.includes(type)) {
						return 0;
					}
					return item.label;
				}),
			],
			data,
		);
	}, [stories, story, mapStory, storyType, translated, custom]);

	const item = useMemo(() => {
		return data.find(({ value }) => value.code === story?.code);
	}, [data, story]);

	return [data, item] as [typeof data, typeof item];
};
