import { PickerMemo as BasePicker } from "@modules/core/control/entities/picker/ui";
import {
	ValueMemo as BaseValue,
	type ValueProps as BaseValueProps,
} from "@shared/ui";
import type { FC } from "react";
import styled from "styled-components/native";

export const Picker: typeof BasePicker = styled(BasePicker)`

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
