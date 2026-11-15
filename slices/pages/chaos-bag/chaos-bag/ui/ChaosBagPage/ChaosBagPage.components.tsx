import { ChaosTokenList } from "@modules/chaos-bag/base/entities/ui";
import { Button, Page } from "@shared/ui";
import { Row, Text } from "@shared/ui";
import { ContentPage } from "@widgets/content";
import { TopBar } from "@widgets/navigation";
import styled, { css } from "styled-components/native";

const withBackground = css`
	background-color: ${({ theme }) => theme.color.dark30};
`;
export const Container: typeof ContentPage = styled(ContentPage)`
  ${withBackground}
`;
export const LandscapeContainer: typeof Page = styled(Page)`
	${withBackground}
`;

export const LandscapeBar: typeof TopBar = styled(TopBar).attrs({
	titleStyle: {
		textAlign: "left",
		flex: 0,
	},
})`
	justify-content: space-between;
`;

export const Bag: typeof ChaosTokenList = styled(ChaosTokenList)`
	flex: 1;
`;

export const Reference: typeof Row = styled(Row)`
  ${({ theme: { size } }) => css`
  padding: ${size.gap.default}px;
	align-items: center;
	gap: ${size.gap.large}px;
`}`;

export const ReferenceText: typeof Text = styled(Text)`
  
`;

const TopButton: typeof Button = styled(Button).attrs(({ theme }) => ({
	textStyle: {
		fontSize: theme.font.size.small,
		textAlign: "left",
	},
	iconStyle: {
		fontSize: 14,
	},
}))`
`;

export const ReferenceButton: typeof TopButton = styled(TopButton)`
	flex: 1;
	padding: 0;
`;
