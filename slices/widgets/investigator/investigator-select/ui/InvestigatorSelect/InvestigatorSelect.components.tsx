import { size } from "@shared/config";
import { View } from "react-native";
import styled from "styled-components/native";
import { FactionSelect as BaseFactionSelect } from "../FactionSelect";
import { InvestigatorSelectFooter } from "../InvestigatorSelectFooter";

import { InvestigatorList } from "../investigator-list/InvestigatorList";

export const Container: typeof View = styled(View)`
  flex: 1;
`;

export const Content: typeof View = styled(View)`
  flex: 1;
`;

export const List: typeof InvestigatorList = styled(InvestigatorList)`
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
  width: 100%;
  bottom: ${size.gap.default}px;
  left: 0;
  right: 0;
`;
