import type { ViewProps } from "react-native";
import { LogoMemo as Logo } from "../../content";
import { Progress } from "../../control";
import * as C from "./LoadScreen.components";

export type LoadScreenProps = ViewProps & {
	progress: number;
};

export const LoadScreen = ({
	progress,
	children,
	...props
}: LoadScreenProps) => {
	return (
		<C.Container {...props}>
			<Logo />
			<Progress value={progress} />
			{children}
		</C.Container>
	);
};
