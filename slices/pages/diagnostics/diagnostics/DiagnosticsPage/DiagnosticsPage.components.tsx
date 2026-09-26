import {
	Button as BaseButton,
	Row as BaseRow,
	Section as BaseSection,
} from "@shared/ui";
import { ContentPage } from "@widgets/content";
import { StoreCheckbox as BaseCheckbox } from "@widgets/control/store-checkbox";
import { View } from "react-native";
import styled from "styled-components/native";

export const Page: typeof ContentPage = styled(ContentPage).attrs(
	({ theme }) => ({
		contentStyle: {
			paddingLeft: theme.size.gap.default,
			paddingRight: theme.size.gap.default,
		},
	}),
)`
`;

export const Section: typeof BaseSection = styled(BaseSection).attrs(
	({ theme }) => ({
		bodyStyle: {
			gap: theme.size.gap.default,
		},
	}),
)`
`;

export const Button: typeof BaseButton = styled(BaseButton).attrs(
	({ theme }) => ({
		textStyle: {
			fontSize: theme.font.size.default,
		},
	}),
)`
	flex: 1;
`;

export const Container: typeof View = styled(View)`
  background-color: ${({ theme }) => theme.color.dark40};
  flex: 1;
  align-self: stretch;
`;

export const Content: typeof View = styled(View)`
  gap: ${({ theme }) => theme.size.gap.large}px;
  width: 100%;
`;

export const Row: typeof BaseRow = styled(BaseRow)`
  flex-direction: row;
  align-items: center;
	justify-content: stretch;
`;

export const Checkbox: typeof BaseCheckbox = styled(BaseCheckbox)`
  flex: 1;
`;
