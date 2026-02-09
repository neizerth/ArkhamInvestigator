import { DEFAULT_LANGUAGE } from "@modules/core/i18n/shared/config";
import { selectCurrentLanguage } from "@modules/core/i18n/shared/lib";
import { changeStory } from "@modules/stories/entities/lib";
import {
	getReferenceCardText,
	isReferenceBackDifficultyId,
	selectReferenceCard,
	selectShowFanMadeStories,
	selectShowTranslatedOnlyStories,
	selectStory,
	selectStoryDifficulty,
	setShowFanMadeStories,
	setShowTranslatedOnlyStories,
} from "@modules/stories/shared/lib";
import type { Story } from "@modules/stories/shared/model";
import { useAppDispatch, useAppSelector, useBoolean } from "@shared/lib";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";
import * as C from "./ReferenceSelect.components";

export type ReferenceSelectProps = ViewProps & {
	onClose?: () => void;
};
export const ReferenceSelect = ({
	onClose,
	...props
}: ReferenceSelectProps) => {
	const dispatch = useAppDispatch();
	const language = useAppSelector(selectCurrentLanguage);
	const defaultReferenceCard = useAppSelector(selectReferenceCard);
	const defaultStory = useAppSelector(selectStory);
	const defaultDifficulty = useAppSelector(selectStoryDifficulty);

	const [story, setStory] = useState(defaultStory);
	const [referenceCard, setReferenceCard] = useState(defaultReferenceCard);

	const [fillChaosBag, setFillChaosBag] = useBoolean(false);
	const [difficulty, setDifficulty] = useState(defaultDifficulty);

	const { t } = useTranslation();
	const showBack = isReferenceBackDifficultyId(difficulty?.id);

	const referenceCardText = getReferenceCardText({
		card: referenceCard,
		showBack,
	});

	const isDefaultLanguage = language === DEFAULT_LANGUAGE;

	const onChangeStory = useCallback((story: Story | null) => {
		const referenceCard = story?.referenceCards[0];
		const difficulty = story?.difficultyLevels[0];

		setStory(story);
		setReferenceCard(referenceCard);
		setDifficulty(difficulty);
	}, []);

	const ok = useCallback(() => {
		dispatch(
			changeStory({
				storyCode: story?.code,
				referenceCardCode: referenceCard?.code,
				difficultyId: difficulty?.id,
				fillChaosBag: fillChaosBag,
			}),
		);
		onClose?.();
	}, [
		dispatch,
		fillChaosBag,
		onClose,
		difficulty,
		referenceCard?.code,
		story?.code,
	]);

	return (
		<C.Container {...props}>
			<C.Body>
				<C.Content>
					<C.Header>
						{!isDefaultLanguage && (
							<C.Checkbox
								label={t`Translated content`}
								actionCreator={setShowTranslatedOnlyStories}
								selector={selectShowTranslatedOnlyStories}
							/>
						)}
						<C.Checkbox
							label={t`Fan-made Scenarios`}
							actionCreator={setShowFanMadeStories}
							selector={selectShowFanMadeStories}
						/>
					</C.Header>
					<C.ScrollArea>
						<C.StorySelect value={story} onChange={onChangeStory} />
						<C.CardSelect
							value={referenceCard}
							onChange={setReferenceCard}
							story={story}
						/>
						{referenceCard && (
							<C.DifficultySelect
								story={story}
								value={difficulty}
								onChange={setDifficulty}
							/>
						)}
						{difficulty && (
							<>
								<C.DifficultyTokens difficulty={difficulty} />
								<C.Check
									label={t`Fill Chaos Bag`}
									checked={fillChaosBag}
									onPress={setFillChaosBag.toggle}
								/>
							</>
						)}

						{referenceCardText && (
							<C.ReferencePreview>
								<C.ReferenceText value={referenceCardText} />
							</C.ReferencePreview>
						)}
					</C.ScrollArea>
				</C.Content>
			</C.Body>
			{onClose && (
				<C.Actions>
					<C.Cancel text={t`Cancel`} icon="dismiss" onPress={onClose} />
					<C.Ok text={t`Okay`} icon="check" onPress={ok} />
				</C.Actions>
			)}
		</C.Container>
	);
};
