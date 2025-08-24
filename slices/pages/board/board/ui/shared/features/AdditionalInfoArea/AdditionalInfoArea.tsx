import type { ViewProps } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import * as C from "./AdditionalInfoArea.components";
import { useBoardGestures } from "./lib";

export type AdditionalInfoAreaProps = ViewProps & {
	swipe?: boolean;
};

export const AdditionalInfoArea = ({
	swipe = false,
	...props
}: AdditionalInfoAreaProps) => {
	const gesture = useBoardGestures({
		swipe,
	});

	return (
		<GestureDetector gesture={gesture}>
			<C.Container {...props} />
		</GestureDetector>
	);
};
