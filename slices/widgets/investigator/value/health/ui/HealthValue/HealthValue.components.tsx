import { color } from "@shared/config";
import { Health, IconNumber, type IconNumberProps } from "@shared/ui";
import styled, { css } from "styled-components/native";

export const Container: typeof Health = styled(Health)`
  width: 24px;
  height: 30px;
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
	${({ value }: IconNumberProps) =>
		value.toString().length > 1 &&
		css`
		font-size: 16px;
	`}
	color: white;
`;
