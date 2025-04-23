import { TouchableOpacity } from "@features/haptic";
import { color } from "@shared/config";
import { IconView, Row, TextView } from "@shared/ui";
import styled from "styled-components/native";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  justify-content: center;
`;

export const Text: typeof TextView = styled(TextView)`
  
`;

export const Expression: typeof Row = styled(Row)`
`;

export const OldValue: typeof TextView = styled(TextView)`
  color: ${color.dark20};
`;

export const Value: typeof TextView = styled(TextView)`
  color: ${color.text};
`;

export const Greater: typeof TextView = styled(TextView)`
  color: #198754;
`;

export const Lower: typeof TextView = styled(TextView)`
  color: #dc3545;
`;

export const Stat: typeof IconView = styled(IconView)`
`;
