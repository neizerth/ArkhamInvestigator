import { View } from "react-native";
import styled, { css } from "styled-components/native";
import { FactionSelect as BaseFactionSelect } from "../FactionSelect";
import { SignatureSelectFooter } from "../SignatureSelectFooter";

import { SignatureList } from "@modules/signature/base/entities/ui";
import { SignaturePreviewList } from "@modules/signature/base/features/base/ui";
import { getFooterStyle, getListPaddingBottom } from "./SignatureSelect.styles";

export const Container: typeof View = styled(View)`
  flex: 1;
	${({ theme: { safeAreaInsets, orientation } }) => css`
		padding: 0px ${safeAreaInsets.left}px;
		flex-direction: ${orientation.landscape ? "row" : "column"};
	`}
`;

export const Content: typeof View = styled(View)`
  flex: 1;
`;

export const PreviewList: typeof SignaturePreviewList = styled(
	SignaturePreviewList,
).attrs(({ theme }) => ({
	contentContainerStyle: {
		paddingBottom: getListPaddingBottom(theme),
	},
}))`
`;

export const List: typeof SignatureList = styled(SignatureList).attrs(
	({ theme }) => ({
		contentContainerStyle: {
			paddingBottom: getListPaddingBottom(theme),
		},
	}),
)`
`;

export const FactionSelect: typeof BaseFactionSelect = styled(
	BaseFactionSelect,
)`
	margin: 0px auto 0px auto;
	${({ theme: { orientation } }) =>
		orientation.landscape &&
		css`
		margin: 5px -5px 0px 0px;
		top: -10px;
	`}
`;

export const Footer: typeof SignatureSelectFooter = styled(
	SignatureSelectFooter,
)`
  position: absolute;
  z-index: 1;
  ${({ theme }) => getFooterStyle(theme)}
`;
