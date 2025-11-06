import { getActiveOpacity } from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./BlessCurseCount.components";

export type BlessCurseCountProps = ViewProps & {
	onBlessPress?: () => void;
	onCursePress?: () => void;
	onBlessLongPress?: () => void;
	onCurseLongPress?: () => void;
	available?: boolean;
};

export const BlessCurseCount = ({
	onBlessPress,
	onCursePress,
	onBlessLongPress,
	onCurseLongPress,
	available = false,
	...props
}: BlessCurseCountProps) => {
	const blessEnabled = Boolean(onBlessPress);
	const curseEnabled = Boolean(onCursePress);

	const blessOpacity = getActiveOpacity(blessEnabled);
	const curseOpacity = getActiveOpacity(curseEnabled);

	return (
		<C.Container {...props}>
			<C.Touchable
				onPress={onBlessPress}
				onLongPress={onBlessLongPress}
				activeOpacity={blessOpacity}
			>
				<C.Token type="bless" available={available} />
			</C.Touchable>
			<C.Separator />
			<C.Touchable
				onPress={onCursePress}
				onLongPress={onCurseLongPress}
				activeOpacity={curseOpacity}
			>
				<C.Token type="curse" available={available} />
			</C.Touchable>
		</C.Container>
	);
};
