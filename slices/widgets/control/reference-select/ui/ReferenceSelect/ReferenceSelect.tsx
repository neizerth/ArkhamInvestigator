import { setReferenceCard } from "@features/chaos-bag";
import {
	DEFAULT_LANGUAGE,
	selectCurrentLanguage,
	useAppTranslation,
} from "@features/i18n";
import {
	selectShowFanMadeStories,
	selectShowTranslatedOnlyStories,
	selectStory,
	setShowFanMadeStories,
	setShowTranslatedOnlyStories,
	setStoryCode,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { Story } from "@shared/model";
import type { SelectItem } from "@shared/ui";
import { useCallback, useMemo } from "react";
import type { ViewProps } from "react-native";
import * as C from "./ReferenceSelect.components";
import { useReferenceStories } from "./hooks";

export type ReferenceSelectProps = ViewProps;
export const ReferenceSelect = (props: ReferenceSelectProps) => {
	const dispatch = useAppDispatch();
	const language = useAppSelector(selectCurrentLanguage);
	const story = useAppSelector(selectStory);

	const { t } = useAppTranslation();

	const isDefaultLanguage = language === DEFAULT_LANGUAGE;

	const data = useReferenceStories();

	const item = useMemo(() => {
		return data.find(({ value }) => value.code === story?.code);
	}, [data, story]);

	const onStorySelect = useCallback(
		({ value }: SelectItem<Story>) => {
			dispatch(setStoryCode(value.code));
			dispatch(setReferenceCard(null));
		},
		[dispatch],
	);

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
	const label = t`Campaign`;

	return (
		<C.Container {...props}>
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
			<C.Select
				data={data}
				onChange={onStorySelect}
				label={label}
				placeholder={t`Choose an option`}
				searchPlaceholder={t`Search`}
				renderItem={renderItem}
				value={item?.value}
				search
			/>
		</C.Container>
	);
};
