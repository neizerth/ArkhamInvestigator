import {
	selectShowDescription,
	useAppSelector,
	useFadeAnimation,
} from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./FooterTopContent.components";

export type FooterTopContentProps = ViewProps;

export const FooterTopContent = (props: FooterTopContentProps) => {
	const show = useAppSelector(selectShowDescription);

	const showAnimation = useFadeAnimation({
		show,
		duration: 200,
		delayIn: 300,
	});

	return (
		<C.Container {...props} style={[props.style, showAnimation]}>
			<C.Secondary />
			<C.TopMenu />
		</C.Container>
	);
};
