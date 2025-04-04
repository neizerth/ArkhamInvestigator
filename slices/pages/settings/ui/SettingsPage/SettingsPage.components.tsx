import { color, font, size } from "@shared/config";
import { Row as BaseRow, TextView } from "@shared/ui";
import { StoreCheckbox } from "@widgets/control/store-checkbox";
import { StoreSelect } from "@widgets/control/store-select";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  background-color: ${color.dark40};
  flex: 1;
  align-items: center;
`;

export const Content: typeof View = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`;

export const Row: typeof BaseRow = styled(BaseRow)`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${size.gap.default}px;
  gap: ${size.gap.default}px;
`;

export const Label: typeof TextView = styled(TextView).attrs({
	contentContainerStyle: {
		minWidth: 80,
	},
})`
  font-size: ${font.size.default}px;
  text-align: right;
`;

export const Select: typeof StoreSelect = styled(StoreSelect)`
  flex: 1;
`;

export const Checkbox: typeof StoreCheckbox = styled(StoreCheckbox)`
  flex: 1;
  justify-content: flex-end;
`;
