import { View } from "react-native";
import styled from "styled-components/native";
import { FactionSelect as BaseFactionSelect } from "../FactionSelect";
import { SignatureSelectFooter } from "../SignatureSelectFooter";

import { SignatureList } from "@modules/signature/base/entities/ui";
import { SignaturePreviewList } from "@modules/signature/base/features/base/ui";
import { getFooterStyle, getListPaddingBottom } from "./SignatureSelect.styles";

export const Container: typeof View = styled(View)`
  flex: 1;
`;

const paddingBottom = getListPaddingBottom();

export const Content: typeof View = styled(View)`
  flex: 1;
`;

const attrs = {
	contentContainerStyle: {
		paddingBottom,
	},
};

export const PreviewList: typeof SignaturePreviewList = styled(
	SignaturePreviewList,
).attrs(attrs)`
`;

export const List: typeof SignatureList = styled(SignatureList).attrs(attrs)`
`;

export const FactionSelect: typeof BaseFactionSelect = styled(
	BaseFactionSelect,
)`
  margin: -5px auto 0px auto;
`;

export const Footer: typeof SignatureSelectFooter = styled(
	SignatureSelectFooter,
)`
  position: absolute;
  z-index: 1;
  ${getFooterStyle()};
`;
