import { View } from "react-native";
import styled, { css } from "styled-components/native";
import { Text, TextView } from "../../content";
import { Dropdown } from "../Dropdown";

export const Container: typeof View = styled(View)`
  position: relative;
  ${({ theme: { size } }) => css`
    border-radius: ${size.borderRadius.default}px;
    gap: ${size.gap.default}px;
  `}
`;

export const Group: typeof View = styled(View)`
`;

export const Select: typeof Dropdown = styled(Dropdown).attrs({
	iconStyle: {
		position: "relative",
	},
	selectedTextStyle: {
		paddingTop: 20,
	},
	placeholderStyle: {
		paddingTop: 20,
	},
})`
  position: relative;
`;

export const Label: typeof Text = styled(Text)`
    position: absolute;
  z-index: 1;
  top: 8px;
  ${({ theme: { size, font, fontFamily } }) => css`
    font-family: ${fontFamily.Alegreya.italic};

    left: ${size.gap.small + 1}px;
    font-size: ${font.size.small}px;
  `}
`;

export const Hint: typeof TextView = styled(TextView)`
  ${({ theme }) => css`
    font-family: ${theme.fontFamily.Alegreya.italic};
    color: ${theme.color.gray20};
  `}
`;
