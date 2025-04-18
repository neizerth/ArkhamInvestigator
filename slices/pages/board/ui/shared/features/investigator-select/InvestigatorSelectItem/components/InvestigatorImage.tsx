import type { FC } from "react";
import FastImage from "react-native-fast-image";
import styled, { css } from "styled-components/native";
import type { InvestigatorImageProps } from "../InvestigatorSelectItem.types";

export const InvestigatorImage: FC<InvestigatorImageProps> = styled(FastImage)`
  ${({ active }: InvestigatorImageProps) =>
		!active &&
		css`
    filter: grayscale(1);
  `}
`;
