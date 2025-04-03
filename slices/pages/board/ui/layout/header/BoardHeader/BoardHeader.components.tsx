import { View } from "react-native";
import styled from "styled-components/native";
import { BoardSkills } from "../../../layout/skills";
import { InvestigatorTitleMemo as InvestigatorTitle } from "../BoardTitle";

export const Container: typeof View = styled(View)`
  position: relative;
`;

export const Title: typeof InvestigatorTitle = styled(InvestigatorTitle).attrs({
	contentContainerStyle: {
		position: "relative",
		zIndex: 1,
	},
})`  
`;

export const Skills: typeof BoardSkills = styled(BoardSkills)`
  position: relative;
  z-index: 2;
`;
