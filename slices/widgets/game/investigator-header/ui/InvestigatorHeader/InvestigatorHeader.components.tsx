import { InvestigatorSkills } from "@widgets/game/investigator-skills";
import { InvestigatorTitle } from "@widgets/game/investigator-title";
import { View } from "react-native";
import styled from "styled-components/native";

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

export const Skills: typeof InvestigatorSkills = styled(InvestigatorSkills)`
  position: relative;
  z-index: 2;
`;
