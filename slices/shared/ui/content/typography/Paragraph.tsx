import { color, font, size } from "@shared/config";
import { Alegreya } from "@shared/fonts";
import { View, type ViewStyle, type TextProps } from "react-native";
import styled from "styled-components/native";
import { Text } from "./Text";

const Container: typeof View = styled(View)`
  padding: ${size.gap.default}px 0px;
`

type ParagraphProps = TextProps & {
  contentContainerStyle?: ViewStyle
}

export const Paragraph = ({
  children,
  contentContainerStyle,
  ...props
}: ParagraphProps) => {
  return (
    <Container style={contentContainerStyle}>
      <Text {...props}>
        {children}
      </Text>
    </Container>
  )
}