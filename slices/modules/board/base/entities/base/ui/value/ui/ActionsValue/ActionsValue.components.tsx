import { Picker as BasePicker } from "@modules/core/control/entities/picker/ui";
import { ActionStatBackground } from "@modules/core/theme/shared/ui";
import { color, gameAssets } from "@shared/config";
import { IconNumber } from "@shared/ui";
import styled from "styled-components/native";
import { VALUE_HEIGHT } from "../../config";

export const Container: typeof ActionStatBackground = styled(
	ActionStatBackground,
)`
  width: ${VALUE_HEIGHT * gameAssets.action.ratio}px;
  height: ${VALUE_HEIGHT}px;
`;

export const Value: typeof IconNumber = styled(IconNumber).attrs({
	stroke: true,
	contentContainerStyle: {
		flex: 0,
	},
	strokeStyle: {
		color: color.action,
	},
})`
    font-size: 24px;
    color: white;
  `;

export const Picker: typeof BasePicker = styled(BasePicker).attrs({
	itemHeight: 30 + 5,
})`
		position: absolute;
		z-index: 10;
	`;
