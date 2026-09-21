import { memo } from "react";
import type { ImageProps, ViewProps } from "react-native";
import { LogoMemo as Logo } from "../../content";
import { Progress } from "../../control";
import * as C from "./LoadScreen.components";
import { logoSize } from "./LoadScreen.config";

export type LoadScreenProps = ViewProps & {
	progress: number;
	showProgress?: boolean;
	showNumericProgress?: boolean;
	onLogoLoad?: ImageProps["onLoad"];
};

export const LoadScreen = ({
	progress,
	children,
	showProgress = true,
	showNumericProgress = false,
	onLogoLoad,
	...props
}: LoadScreenProps) => {
	return (
		<C.Container {...props}>
			<Logo size={logoSize} onLoad={onLogoLoad} />
			<C.Footer>
				{showProgress && (
					<>
						<Progress value={progress} />
						{showNumericProgress && (
							<C.NumericProgress>{progress}%</C.NumericProgress>
						)}
					</>
				)}
				{children}
			</C.Footer>
		</C.Container>
	);
};

export const LoadScreenMemo = memo(LoadScreen);
