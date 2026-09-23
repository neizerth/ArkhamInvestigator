import {
	HealthStatBackground,
	SanityStatBackground,
} from "@modules/core/theme/shared/ui";
import { color, gameAssets, size } from "@shared/config";
import type { InvestigatorMainStatType } from "@shared/model";
import { Value as BaseValue } from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { assetsSize } from "../../../../config";
import { withStat } from "../../../../lib";
import {
	BaseStatPicker,
	BoardValue,
	type BoardValueProps,
	type DefinedBaseStatPickerProps,
} from "../common";
import { StatPickerMemo as StatPicker } from "../common/StatPicker";

type MainStatConfig = {
	Background: typeof HealthStatBackground;
	color: string;
	ratio: number;
	/** offsets differ because the assets have different shapes */
	initialRight: number;
	baseRight: number;
};

const config: Record<InvestigatorMainStatType, MainStatConfig> = {
	health: {
		Background: HealthStatBackground,
		color: color.health,
		ratio: gameAssets.health.ratio,
		initialRight: -10,
		baseRight: -25,
	},
	sanity: {
		Background: SanityStatBackground,
		color: color.sanity,
		ratio: gameAssets.sanity.ratio,
		initialRight: 8,
		baseRight: 0,
	},
};

const createComponents = (stat: InvestigatorMainStatType) => {
	const { Background, ratio, initialRight, baseRight } = config[stat];
	const statColor = config[stat].color;

	const BaseContainer = withStat(Background, { ratio });

	const Content: typeof BaseContainer = styled(BaseContainer).attrs({
		testID: `${stat}-background`,
	})``;

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

	const Initial: typeof View = styled(View).attrs({
		testID: `${stat}-initial`,
	})`
		position: absolute;
		right: ${initialRight}px;
		bottom: -12px;
	`;

	const InitialSeparator: typeof View = styled(View)`
		position: absolute;
		left: -12px;
		top: 0px;
		width: 20px;
		height: 3px;
		background-color: white;
		border: 1px solid ${statColor};
		transform: rotate(-60deg);
		border-radius: 3px;
	`;

	const InitialValue: typeof Value = styled(Value)`
		font-size: 24px;
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
			right: baseRight,
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
		Content,
		Picker,
		Base,
		Additional,
		Initial,
		InitialSeparator,
		InitialValue,
	};
};

export const byStat = {
	health: createComponents("health"),
	sanity: createComponents("sanity"),
};
