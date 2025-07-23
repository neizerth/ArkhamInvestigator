import { Value } from "@shared/ui";
import { Picker } from "@widgets/control/picker";
import styled from "styled-components/native";

export const ValuePicker: typeof Picker = styled(Picker).attrs({
	gap: 50,
})`
  
`;

export const SkillValueItem: typeof Value = styled(Value).attrs({
	containerStyle: {
		justifyContent: "flex-end",
		background: "red",
	},
})`
  font-size: 50px;
  width: 60px;
  text-align: right;
`;
