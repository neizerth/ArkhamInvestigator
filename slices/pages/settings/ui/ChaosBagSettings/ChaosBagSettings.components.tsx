import { size } from "@shared/config";
import { Row as BaseRow, Section } from "@shared/ui";
import { StoreCheckbox } from "@widgets/control/store-checkbox";
import styled from "styled-components/native";

export const Container: typeof Section = styled(Section).attrs({
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
