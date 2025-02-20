import { color } from "@shared/config";
import { Icon, Title } from "@shared/ui";
import { InvestigatorSelectFooter } from "@widgets/investigator/investigator-select/ui/InvestigatorSelectFooter";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  background-color: ${color.dark30};
  flex: 1;
`