import { PickerMemo as BasePicker } from "@widgets/control/picker";
import {
	ValueMemo as BaseValue,
	type ValueProps as BaseValueProps,
} from "@widgets/investigator/value";
import type { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

export const Picker: typeof BasePicker = styled(BasePicker)`

`;

export const Item: typeof View = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Value: FC<BaseValueProps> = styled(BaseValue).attrs({
	contentContainerStyle: {
		alignItems: "center",
		justifyContent: "center",
	},
})`
  justify-content: center;
  align-items: center;
`;
