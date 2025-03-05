import { View } from "react-native";
import styled from "styled-components/native";
import { InvestigatorTitle } from "../InvestigatorTitle";
import { InvestigatorSkills } from "../../../layout/skills";

export const Container: typeof View = styled(View)`
  position: relative;
`

export const Title: typeof InvestigatorTitle = styled(InvestigatorTitle)`
  position: relative;
  z-index: 1;
`

export const Skills: typeof InvestigatorSkills = styled(InvestigatorSkills)`
  position: relative;
  z-index: 2;
`