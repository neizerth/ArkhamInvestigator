import { useAppTranslation } from "@features/i18n";
import { useModal } from "@features/modal";
import type { Faction, FactionFilterType } from "@shared/model";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import { FACTION_SELECT_VALUES } from "../../config";
import * as C from "./FactionSelect.components";

export type FactionSelectValue = Faction | "spoiler";

export type FactionSelectProps = ViewProps & {
	onChange?: (value: FactionFilterType | null) => void;
	value?: FactionFilterType | null;
};

const values: FactionFilterType[] = [...FACTION_SELECT_VALUES, "spoiler"];

export const FactionSelect = ({
	value,
	onChange,
	...props
}: FactionSelectProps) => {
	const { t } = useAppTranslation();
	const [showSpilerAlert] = useModal({
		id: "faction-select-spoiler-alert",
		data: {
			type: "faction",
			faction: "neutral",
			title: t`Spoiler Alert`,
			text: t`This section contains campaign spoilers. Do you want to proceed?`,
			okText: t`Yes`,
			cancelText: t`Cancel`,
		},
		onOk: () => onChange?.("spoiler"),
	});

	const onPress = useCallback(
		(item: FactionFilterType) => () => {
			if (!onChange) {
				return false;
			}
			if (item === value) {
				onChange(null);
				return;
			}
			if (item === "spoiler") {
				showSpilerAlert();
				return;
			}
			onChange(item);
		},
		[value, onChange, showSpilerAlert],
	);

	return (
		<C.Container {...props}>
			<C.Content>
				{values.map((item, index) => (
					<C.Button
						key={item}
						value={item}
						selected={value === item}
						onPress={onPress(item)}
						first={index === 0}
						last={index === item.length - 1}
					/>
				))}
			</C.Content>
		</C.Container>
	);
};
