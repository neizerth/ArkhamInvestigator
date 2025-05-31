import type { ViewProps } from "react-native";
import * as C from "./BlessCurseControl.components";

export type BlessCurseControlProps = ViewProps;

export const BlessCurseControl = (props: BlessCurseControlProps) => {
	return (
		<C.Container {...props}>
			<C.Token type="bless" />
			<C.Token type="curse" />
		</C.Container>
	);
};
