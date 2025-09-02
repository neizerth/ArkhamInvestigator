import { memo } from "react";
import type { ViewProps } from "react-native";
import { LogoMemo as Logo } from "../../content";
import { Progress } from "../../control";
import * as C from "./LoadScreen.components";

export type LoadScreenProps = ViewProps & {
	progress: number;
	showProgress?: boolean;
	showNumericProgress?: boolean;
};

export const LoadScreen = ({
	progress,
	children,
	showProgress = true,
	showNumericProgress = false,
	...props
}: LoadScreenProps) => {
	return (
		<C.Container {...props}>
			<Logo />
			{showProgress && (
				<>
					<Progress value={progress} />
					{showNumericProgress && (
						<C.NumericProgress>{progress}%</C.NumericProgress>
					)}
				</>
			)}
			{children}
		</C.Container>
	);
};

export const LoadScreenMemo = memo(LoadScreen);
