import { mainStatStyles } from "@modules/board/base/entities/base/ui/value";
import { size } from "@shared/config";
import type { InvestigatorMainStatType } from "@shared/model";
import { Value as BaseValue } from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { assetsSize } from "../../../../config";
import {
	BaseStatPicker,
	BoardValue,
	type BoardValueProps,
	type DefinedBaseStatPickerProps,
} from "../common";
import { StatPickerMemo as StatPicker } from "../common/StatPicker";

/** the base value difference hangs off the corner the asset leaves free */
const baseRight: Record<InvestigatorMainStatType, number> = {
	health: -25,
	sanity: 0,
};

const createComponents = (stat: InvestigatorMainStatType) => {
	const statColor = mainStatStyles[stat].color;

	const PickerValue: FC<BoardValueProps> = styled(BoardValue).attrs({
		testID: `${stat}-value`,
	})``;

	const BasePickerValue: FC<BoardValueProps> = styled(BoardValue).attrs({
		testID: `${stat}-base-value`,
	})``;

	const Container: typeof View = styled(View)`
		position: relative;
		padding-top: ${size.gap.xl}px;
	`;

	const Value: typeof BaseValue = styled(BaseValue)`
		color: ${statColor};
	`;

	const Base: FC<DefinedBaseStatPickerProps> = styled(BaseStatPicker).attrs({
		testID: `${stat}-base-picker`,
		Component: BasePickerValue,
		statType: stat,
		valueStyle: {
			color: statColor,
			fontSize: 42,
		},
		itemHeight: assetsSize.main,
		contentContainerStyle: {
			position: "absolute",
			zIndex: 4,
			right: baseRight[stat],
			top: -10,
		},
		gap: 5,
	})``;

	const Additional: typeof Value = styled(Value).attrs({
		testID: `${stat}-additional`,
	})``;

	const Picker: typeof StatPicker = styled(StatPicker).attrs({
		testID: `${stat}-picker`,
		Component: PickerValue,
		valueStyle: {
			color: statColor,
		},
		itemHeight: assetsSize.main,
	})`
		position: absolute;
		z-index: 1;
	`;

	return {
		Container,
		Value,
		Picker,
		Base,
		Additional,
	};
};

export const byStat = {
	health: createComponents("health"),
	sanity: createComponents("sanity"),
};
