import { color, gameAssets } from "@shared/config";
import { Health, IconNumber, type IconNumberProps } from "@shared/ui";
import { View } from "react-native";
import styled, { css } from "styled-components/native";
import { VALUE_HEIGHT } from "../../config";

export const Container: typeof Health = styled(Health)`
	position: relative;
  width: ${VALUE_HEIGHT * gameAssets.health.ratio}px;
  height: ${VALUE_HEIGHT}px;
`;

export const Value: typeof IconNumber = styled(IconNumber).attrs({
	stroke: true,
	contentContainerStyle: {
		flex: 0,
	},
	strokeStyle: {
		color: color.health,
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

export const Initial: typeof View = styled(View)`
	position: absolute;
	z-index: -1;
	right: -8px;
	bottom: -10px;
`;

export const InitialValue: typeof Value = styled(Value)`
	font-size: 18px;
`;
