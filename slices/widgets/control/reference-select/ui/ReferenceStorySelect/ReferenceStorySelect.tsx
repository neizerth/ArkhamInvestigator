import {
	selectStoryTypeFilter,
	setStoryTypeFilter,
} from "@modules/stories/shared/lib";
import type { Story } from "@modules/stories/shared/model";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import type { SelectItem } from "@shared/ui";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";
import * as C from "./ReferenceStorySelect.components";
import { useRenderItem, useStoryData } from "./hooks";

export type ReferenceStorySelectProps = ViewProps & {
	onChange?: (story: Story | null) => void;
	value?: Story | null;
};

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

export const ReferenceStorySelect = ({
	onChange,
	value,
	...props
}: ReferenceStorySelectProps) => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	const storyType = useAppSelector(selectStoryTypeFilter);

	const data = useStoryData(value);

	const clearStory = useCallback(() => {
		onChange?.(null);
	}, [onChange]);

	const onStorySelect = useCallback(
		({ value }: SelectItem<Story>) => {
			onChange?.(value);
			// dispatch(setStoryCode(value.code));
			// dispatch(setReferenceCardCode(value.referenceCards[0].code));
			// dispatch(clearChaosTokenValue());
		},
		[onChange],
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
				value={value}
				search
			/>
		</C.Container>
	);
};
