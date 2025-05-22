import { color, gameAssets } from "@shared/config";
import { IconNumber, Sanity } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { VALUE_HEIGHT } from "../../config";

export const Container: typeof Sanity = styled(Sanity)`
  width: ${VALUE_HEIGHT * gameAssets.sanity.ratio}px;
  height: ${VALUE_HEIGHT}px;
`;

export const Value: typeof IconNumber = styled(IconNumber).attrs({
	stroke: true,
	contentContainerStyle: {
		flex: 0,
	},
	strokeStyle: {
		color: color.sanity,
	},
})`
    font-size: 24px;
    color: white;
  `;

export const Initial: typeof View = styled(View)`
	position: absolute;
	right: -4px;
	bottom: -10px;
`;

export const InitialValue: typeof Value = styled(Value)`
	font-size: 18px;
`;
