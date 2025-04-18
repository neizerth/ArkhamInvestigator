import type { FC } from "react";
import { Image } from "react-native";
import styled, { css } from "styled-components/native";
import type { InvestigatorImageProps } from "../InvestigatorSelectItem.types";

export const InvestigatorImage: FC<InvestigatorImageProps> = styled(Image)`
  ${({ active }: InvestigatorImageProps) =>
		!active &&
		css`
    filter: grayscale(1);
  `}
`;
