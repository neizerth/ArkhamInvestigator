import {
	HealthStatBackground,
	SanityStatBackground,
} from "@modules/core/theme/shared/ui";
import { color, gameAssets } from "@shared/config";
import type { InvestigatorMainStatType } from "@shared/model";
import { IconNumber, type IconNumberProps } from "@shared/ui";
import { View } from "react-native";
import styled, { css } from "styled-components/native";
import { VALUE_HEIGHT } from "../../config";

type MainStatConfig = {
	Background: typeof HealthStatBackground;
	color: string;
	ratio: number;
	/** the initial value badge hangs off the corner the asset leaves free */
	initialRight: number;
};

const config: Record<InvestigatorMainStatType, MainStatConfig> = {
	health: {
		Background: HealthStatBackground,
		color: color.health,
		ratio: gameAssets.health.ratio,
		initialRight: -8,
	},
	sanity: {
		Background: SanityStatBackground,
		color: color.sanity,
		ratio: gameAssets.sanity.ratio,
		initialRight: -4,
	},
};

const createComponents = (stat: InvestigatorMainStatType) => {
	const { Background, ratio, initialRight } = config[stat];

	const Container: typeof Background = styled(Background).attrs({
		testID: `${stat}-background`,
	})`
		position: relative;
		width: ${VALUE_HEIGHT * ratio}px;
		height: ${VALUE_HEIGHT}px;
	`;

	const Value: typeof IconNumber = styled(IconNumber).attrs({
		stroke: true,
		contentContainerStyle: {
			flex: 0,
		},
		strokeStyle: {
			color: config[stat].color,
		},
	})`
		font-size: 24px;
		${({ value = 0 }: IconNumberProps) =>
			value.toString().length > 1 &&
			css`
			font-size: 16px;
		`}
		color: white;
	`;

	const Initial: typeof View = styled(View).attrs({
		testID: `${stat}-initial`,
	})`
		position: absolute;
		z-index: -1;
		right: ${initialRight}px;
		bottom: -10px;
	`;

	const InitialValue: typeof Value = styled(Value)`
		font-size: 18px;
	`;

	return { Container, Value, Initial, InitialValue };
};

export const byStat = {
	health: createComponents("health"),
	sanity: createComponents("sanity"),
};
