import { color, gameAssets } from "@shared/config";
import { Doom, IconNumber } from "@shared/ui";
import styled from "styled-components/native";
import { Picker as BasePicker } from "../../../../control/picker";
import { VALUE_HEIGHT } from "../../config";

export const Container: typeof Doom = styled(Doom)`
  width: ${VALUE_HEIGHT * gameAssets.doom.ratio}px;
  height: ${VALUE_HEIGHT}px;
`;

export const Value: typeof IconNumber = styled(IconNumber).attrs({
	stroke: true,
	contentContainerStyle: {
		flex: 0,
	},
	strokeStyle: {
		color: color.doom.dark,
	},
})`
    font-size: 24px;
    color: ${color.white};
  `;

export const Picker: typeof BasePicker = styled(BasePicker).attrs({
	itemHeight: 30 + 5,
})`
    position: absolute;
    z-index: 10;
  `;
