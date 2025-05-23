import { HapticSelect } from "@features/haptic";
import { color, size } from "@shared/config";
import { Icon, Row, Text } from "@shared/ui";
import styled from "styled-components/native";

export const Select: typeof HapticSelect = styled(HapticSelect)`
  background-color: ${color.dark30};
  border: 1px solid ${color.dark20};
`;

export const FFG: typeof Icon = styled(Icon)`
  color: ${color.ffg.light};
`;

export const EnIcon: typeof Icon = styled(Icon)`
  color: ${color.gray20};
  text-align: center;
`;

export const Item: typeof Row = styled(Row)`
  padding: ${size.gap.small}px ${size.gap.default}px;
  gap: ${size.gap.small}px;
  align-items: center;
  min-height: 48px;
`;

export const ItemText: typeof Text = styled(Text)`
  flex: 1;
  flex-wrap: wrap;
`;

export const ItemIcon: typeof Icon = styled(Icon)`
  color: ${color.light10};
  text-align: center;
  width: 24px;
`;
