import { selectCurrentLanguage } from "@features/i18n";
import {
	selectShowFanMadeStories,
	selectShowTranslatedOnlyStories,
	selectStories,
	selectStory,
	useAppSelector,
} from "@shared/lib";
import type { Story } from "@shared/model";
import { useCallback, useMemo } from "react";

export const useReferenceStories = () => {
	const translated = useAppSelector(selectShowTranslatedOnlyStories);
	const custom = useAppSelector(selectShowFanMadeStories);
	const stories = useAppSelector(selectStories);
	const language = useAppSelector(selectCurrentLanguage);
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
			if (item.value.code === story?.code) {
				return true;
			}

			const { value } = item;

			if (translated && !item.translated) {
				return false;
			}
			if (!custom && !value.official) {
				return false;
			}
			return true;
		});
	}, [stories, story, mapStory, translated, custom]);
};
