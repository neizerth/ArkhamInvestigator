import { View } from "react-native";
import styled from "styled-components/native";
import { InvestigatorSkills } from "../../../investigator-skills";
import { InvestigatorTitle } from "../../../investigator-title";

export const Container: typeof View = styled(View)`
  position: relative;
`;

export const Title: typeof InvestigatorTitle = styled(InvestigatorTitle).attrs({
	contentContainerStyle: {
		position: "relative",
		flex: 0,
		zIndex: 1,
	},
})`  
`;

export const Skills: typeof InvestigatorSkills = styled(InvestigatorSkills)`
  position: relative;
  z-index: 2;
`;
