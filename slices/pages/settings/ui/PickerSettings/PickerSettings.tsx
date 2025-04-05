import {
	selectPickerDecelerationType,
	selectPickerIntervalMomentum,
	setPickerDecelerationType,
	setPickerIntervalMomentum,
	useAppSelector,
} from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./PickerSettings.components";
import { decelerationValues } from "./values";

export type PickerSettingsProps = ViewProps;

export const PickerSettings = (props: PickerSettingsProps) => {
	const enableMomentum = useAppSelector(selectPickerIntervalMomentum);
	return (
		<C.Container {...props}>
			<C.Row>
				<C.Checkbox
					label="Inertial Scrolling"
					selector={selectPickerIntervalMomentum}
					actionCreator={setPickerIntervalMomentum}
				/>
			</C.Row>
			{enableMomentum && (
				<C.Row>
					<C.Select
						label="Scroll Deceleration"
						selector={selectPickerDecelerationType}
						actionCreator={setPickerDecelerationType}
						data={decelerationValues}
					/>
				</C.Row>
			)}
		</C.Container>
	);
};
