import { useAppTranslation } from "@features/i18n";
import {
	selectStoryTypeFilter,
	setReferenceCardCode,
	setStoryCode,
	setStoryTypeFilter,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { Story } from "@shared/model";
import type { SelectItem } from "@shared/ui";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./ReferenceStorySelect.components";
import { useRenderItem, useStoryData } from "./hooks";

export type ReferenceStorySelectProps = ViewProps;

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

export const ReferenceStorySelect = (props: ReferenceStorySelectProps) => {
	const dispatch = useAppDispatch();
	const { t } = useAppTranslation();

	const storyType = useAppSelector(selectStoryTypeFilter);

	const [data, currentValue] = useStoryData();

	const clearStory = useCallback(() => {
		dispatch(setStoryCode(null));
		dispatch(setReferenceCardCode(null));
	}, [dispatch]);

	const onStorySelect = useCallback(
		({ value }: SelectItem<Story>) => {
			dispatch(setStoryCode(value.code));
			dispatch(setReferenceCardCode(null));

			dispatch(setReferenceCardCode(value.referenceCards[0].code));
		},
		[dispatch],
	);

	const renderItem = useRenderItem();

	const label = storyType === "scenario" ? t`Scenario` : t`Campaign`;

	return (
		<C.Container {...props}>
			<C.Tabs
				selector={selectStoryTypeFilter}
				actionCreator={setStoryTypeFilter}
				onSelect={clearStory}
				data={tabs}
				defaultValue={"campaign"}
			/>
			<C.Select
				data={data}
				onChange={onStorySelect}
				label={label}
				placeholder={t`Choose an option`}
				searchPlaceholder={t`Search`}
				renderItem={renderItem}
				value={currentValue?.value}
				search
			/>
		</C.Container>
	);
};
