import { useCallback } from "react";
import { Linking, type TextProps } from "react-native";
import styled from "styled-components/native";
import { useBoolean, useFadeAnimation } from "../../../lib";
import { Text } from "./Text";

const LinkText: typeof Text = styled(Text)`
  text-decoration: underline;
`;

const style = {
	textDecoration: "underline",
};

export type AProps = TextProps & {
	href: string;
};

export const A = ({ href, children, ...props }: AProps) => {
	const [active, setActive] = useBoolean(false);
	const animatedStyle = useFadeAnimation({ show: active });
	const onPress = useCallback(() => {
		Linking.openURL(href);
	}, [href]);

	return (
		<LinkText
			onPress={onPress}
			onPressIn={setActive.on}
			onPressOut={setActive.off}
			style={[animatedStyle, props.style]}
		>
			{children}
		</LinkText>
	);
};
