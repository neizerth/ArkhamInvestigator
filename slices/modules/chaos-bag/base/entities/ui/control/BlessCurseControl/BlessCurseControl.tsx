import type { ViewProps } from "react-native";
import * as C from "./BlessCurseControl.components";

export type BlessCurseControlProps = ViewProps & {
	incrementLongPressEnabled?: boolean;
};

export const BlessCurseControl = ({
	incrementLongPressEnabled = false,
	...props
}: BlessCurseControlProps) => {
	return (
		<C.Container {...props}>
			<C.Token
				type="bless"
				incrementLongPressEnabled={incrementLongPressEnabled}
			/>
			<C.Token
				type="curse"
				incrementLongPressEnabled={incrementLongPressEnabled}
			/>
		</C.Container>
	);
};
