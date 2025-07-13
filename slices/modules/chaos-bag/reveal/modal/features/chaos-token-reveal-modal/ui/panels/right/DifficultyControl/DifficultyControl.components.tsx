import { color } from "@shared/config";
import { UnscaledText, Value } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { Picker } from "../../../../../../../../../../widgets/control/picker";

export const Container: typeof View = styled(View)`
  position: relative;
`;

export const Content: typeof View = styled(View)`
  border-radius: 15px;
  overflow: hidden;
`;

export const Control: typeof Picker = styled(Picker).attrs({
	gap: 50,
})`
  
`;

export const Difficulty: typeof Value = styled(Value).attrs({
	strokeStyle: {
		color: color.dark30,
	},
})`
  font-size: 50px;
  width: 60px;
`;

export const CompareSymbol: typeof UnscaledText = styled(UnscaledText)`
  position: absolute;
  top: -19px;
  left: -15px;
  color: ${color.white};
  font-size: 30px;
`;
