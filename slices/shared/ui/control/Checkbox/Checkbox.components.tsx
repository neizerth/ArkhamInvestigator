import { Alegreya } from "@assets/fonts";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import styled from "styled-components";
import { color, size } from "../../../config";
import { Text, TextView } from "../../content";
import { Icon } from "../../game";
import { Row } from "../../grid";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  gap: ${size.gap.default}px;
  padding: ${size.gap.small}px 2px;
`;
export const Label: typeof Text = styled(Text)`
  text-align: right;
`;

export const Control: typeof Icon = styled(Icon)`
  position: relative;
  color: ${color.dark10};
  font-size: 24px;
  line-height: 24px;
`;

export const Content: typeof Row = styled(Row)`
  gap: ${size.gap.default}px;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

export const Hint: typeof TextView = styled(TextView)`
  font-family: ${Alegreya.italic};
  color: ${color.gray20};
  text-align: right;
`;
