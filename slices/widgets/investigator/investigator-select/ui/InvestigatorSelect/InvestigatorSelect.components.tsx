import { View } from "react-native";
import styled from "styled-components/native";
import { FactionSelect as BaseFactionSelect } from "../FactionSelect";
import { InvestigatorSelectFooter } from "../InvestigatorSelectFooter";

import { SignaturePreviewList } from "@modules/signature/base/entities/ui";
import { getFooterStyle } from "./InvestigatorSelect.styles";

export const Container: typeof View = styled(View)`
  flex: 1;
`;

export const Content: typeof View = styled(View)`
  flex: 1;
`;

export const List: typeof SignaturePreviewList = styled(SignaturePreviewList)`
`;

export const FactionSelect: typeof BaseFactionSelect = styled(
	BaseFactionSelect,
)`
  margin: -5px auto 0px auto;
`;

export const Footer: typeof InvestigatorSelectFooter = styled(
	InvestigatorSelectFooter,
)`
  position: absolute;
  z-index: 1;
  ${getFooterStyle()};
`;
