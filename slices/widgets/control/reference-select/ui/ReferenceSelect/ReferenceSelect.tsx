import { getReferenceCardText } from "@entities/reference-card";
import {
	DEFAULT_LANGUAGE,
	selectCurrentLanguage,
	useAppTranslation,
} from "@features/i18n";
import {
	selectReferenceCard,
	selectReferenceCardText,
	selectShowFanMadeStories,
	selectShowReferenceBackText,
	selectShowTranslatedOnlyStories,
	selectStory,
	selectStoryTypeFilter,
	setReferenceCardCode,
	setShowFanMadeStories,
	setShowReferenceBackText,
	setShowTranslatedOnlyStories,
	setStoryCode,
	setStoryTypeFilter,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { Story } from "@shared/model";
import type { SelectItem } from "@shared/ui";
import type { ReferenceCard } from "arkham-investigator-data";
import { useCallback, useMemo } from "react";
import type { ViewProps } from "react-native";
import * as C from "./ReferenceSelect.components";
import {
	useReferenceCardData,
	useReferenceCards,
	useReferenceStories,
} from "./hooks";

const tabs = [
	{
		id: "campaign",
		title: "Campaigns",
	},
	{
		id: "scenario",
		title: "Scenarios",
	},
];

export type ReferenceSelectProps = ViewProps;
export const ReferenceSelect = (props: ReferenceSelectProps) => {
	const dispatch = useAppDispatch();
	const language = useAppSelector(selectCurrentLanguage);
	const story = useAppSelector(selectStory);
	const storyType = useAppSelector(selectStoryTypeFilter);
	const referenceCard = useAppSelector(selectReferenceCard);
	const referenceCardText = useAppSelector(selectReferenceCardText);

	const referenceTexts = useReferenceCardData();
	const referenceCards = useReferenceCards();

	const referenceText =
		referenceCardText && getReferenceCardText(referenceCardText);

	const { t } = useAppTranslation();

	const isDefaultLanguage = language === DEFAULT_LANGUAGE;

	const data = useReferenceStories();

	const item = useMemo(() => {
		return data.find(({ value }) => value.code === story?.code);
	}, [data, story]);

	const onStorySelect = useCallback(
		({ value }: SelectItem<Story>) => {
			dispatch(setStoryCode(value.code));
			dispatch(setReferenceCardCode(null));

			dispatch(setReferenceCardCode(value.referenceCards[0].code));
		},
		[dispatch],
	);

	const onReferenceCardSelect = useCallback(
		({ value }: SelectItem<ReferenceCard>) => {
			dispatch(setReferenceCardCode(value.code));
		},
		[dispatch],
	);

	const clearStory = useCallback(() => {
		dispatch(setStoryCode(null));
		dispatch(setReferenceCardCode(null));
	}, [dispatch]);

	const renderItem = useCallback(
		({ value }: SelectItem<Story>) => {
			const icon = value.icon || "book";
			const translated = language === value.locale;
			const isDefaultLanguage = language === DEFAULT_LANGUAGE;
			return (
				<C.Item>
					<C.ItemIcon icon={icon} />
					<C.ItemText>{value.name}</C.ItemText>
					{value.official && <C.FFG icon="ffg" />}
					{!isDefaultLanguage && !translated && <C.EnIcon icon="en" />}
				</C.Item>
			);
		},
		[language],
	);

	const renderReferenceItem = useCallback(
		({ value }: SelectItem<ReferenceCard>) => {
			const icon = value.icon || "book";
			const translated = language === value.locale;
			const isDefaultLanguage = language === DEFAULT_LANGUAGE;
			return (
				<C.Item>
					<C.ItemIcon icon={icon} />
					<C.ItemText>{value.name}</C.ItemText>
					{!isDefaultLanguage && !translated && <C.EnIcon icon="en" />}
				</C.Item>
			);
		},
		[language],
	);
	const label = storyType === "scenario" ? t`Scenario` : t`Campaign`;

	return (
		<C.Container {...props}>
			<C.Content>
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
				<C.SelectGroup>
					<C.Tabs
						selector={selectStoryTypeFilter}
						actionCreator={setStoryTypeFilter}
						onSelect={clearStory}
						data={tabs}
						defaultValue={"campaign"}
					/>
					<C.StorySelect
						data={data}
						onChange={onStorySelect}
						label={label}
						placeholder={t`Choose an option`}
						searchPlaceholder={t`Search`}
						renderItem={renderItem}
						value={item?.value}
						search
					/>
				</C.SelectGroup>
				{referenceCards.length > 1 && (
					<C.Select
						data={referenceCards}
						onChange={onReferenceCardSelect}
						label={t`Scenario reference`}
						placeholder={t`Choose an option`}
						value={referenceCard}
						renderItem={renderReferenceItem}
					/>
				)}

				{referenceCard && (
					<>
						<C.StoreSelect
							label={t`Difficulty`}
							data={referenceTexts}
							actionCreator={setShowReferenceBackText}
							selector={selectShowReferenceBackText}
						/>
						{referenceText && <C.ReferenceText value={referenceText} />}
					</>
				)}
			</C.Content>
		</C.Container>
	);
};
