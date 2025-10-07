import {
	selectBoardPickerSize,
	selectPickerAnimation,
	selectPickerDecelerationType,
	selectPickerIntervalMomentum,
	setBoardPickerSize,
	setPickerAnimation,
	setPickerDecelerationType,
	setPickerIntervalMomentum,
} from "@modules/core/control/entities/picker/lib";
import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./PickerSettings.components";
import { boardPickerSizeValues, decelerationValues } from "./values";

export type PickerSettingsProps = ViewProps;

export const PickerSettings = (props: PickerSettingsProps) => {
	const animated = useAppSelector(selectPickerAnimation);
	return (
		<C.Container {...props}>
			<C.Row>
				<C.Checkbox
					label="Picker animation"
					selector={selectPickerAnimation}
					actionCreator={setPickerAnimation}
				/>
			</C.Row>
			{animated && (
				<>
					<C.Row>
						<C.Checkbox
							label="Inertial Scrolling"
							selector={selectPickerIntervalMomentum}
							actionCreator={setPickerIntervalMomentum}
						/>
					</C.Row>
					<C.Row>
						<C.Select
							label="Scroll Deceleration"
							selector={selectPickerDecelerationType}
							actionCreator={setPickerDecelerationType}
							data={decelerationValues}
						/>
					</C.Row>
					<C.Row>
						<C.Select
							label="Board Picker Size"
							selector={selectBoardPickerSize}
							actionCreator={setBoardPickerSize}
							data={boardPickerSizeValues}
						/>
					</C.Row>
				</>
			)}
		</C.Container>
	);
};
