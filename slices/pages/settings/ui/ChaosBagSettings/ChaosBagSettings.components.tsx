import { size } from "@shared/config";
import { Row as BaseRow, Section as BaseSection } from "@shared/ui";
import { StoreCheckbox } from "@widgets/control/store-checkbox";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
`;

export const Section: typeof BaseSection = styled(BaseSection).attrs({
	bodyStyle: {
		gap: size.gap.default,
	},
})`
`;

export const Row: typeof BaseRow = styled(BaseRow)`
  flex-direction: row;
  align-items: center;
	justify-content: stretch;
`;

export const Checkbox: typeof StoreCheckbox = styled(StoreCheckbox).attrs({
	contentContainerStyle: {
		flex: 1,
	},
})`
  flex: 1;
  justify-content: flex-end;
`;
