import { IconImageBackground, type IconImageBackgroundProps } from "@shared/ui/image";
import styled from "styled-components/native";

const ratio = 40 / 79;

export const Background: typeof IconImageBackground = styled(IconImageBackground)`
  ${({ width, height }: IconImageBackgroundProps) => height && css`
    width: ${width || (height || height * ratio)};
  `}
  ${({ width, height }: IconImageBackgroundProps) => width && css`
    height: ${height || (width && width / ratio)};
  `}
` 