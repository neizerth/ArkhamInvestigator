import { color } from "@shared/config";
import { Value } from "@shared/ui";
import styled from "styled-components/native";
import { Picker } from "../../../../../../../../../widgets/control/picker";

export const ValuePicker: typeof Picker = styled(Picker).attrs({
	gap: 50,
})`
  
`;

export const SkillValueItem: typeof Value = styled(Value).attrs({
	containerStyle: {
		justifyContent: "flex-end",
		background: "red",
	},
	strokeStyle: {
		color: color.dark30,
	},
})`
  font-size: 50px;
  width: 60px;
  text-align: right;
`;
