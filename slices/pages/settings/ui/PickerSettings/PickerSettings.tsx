import {
	selectPickerAnimation,
	selectPickerDecelerationType,
	selectPickerIntervalMomentum,
	selectPickerSize,
	setPickerAnimation,
	setPickerDecelerationType,
	setPickerIntervalMomentum,
	setPickerSize,
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
							label="Picker Size"
							selector={selectPickerSize}
							actionCreator={setPickerSize}
							data={boardPickerSizeValues}
						/>
					</C.Row>
				</>
			)}
		</C.Container>
	);
};
