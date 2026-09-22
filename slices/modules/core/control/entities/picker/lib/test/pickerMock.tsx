import type { PickerProps } from "@modules/core/control/entities/picker/model";
import { View } from "react-native";

/**
 * Host view instead of the gesture-driven picker: renders the current item
 * and exposes picker props via `pickerProps` for assertions and handler calls.
 * Usage: `jest.mock("@modules/core/control/entities/picker/ui", () => require("@modules/core/control/entities/picker/lib/test/pickerMock").pickerUiMock());`
 */
export function FakePicker<T>(props: PickerProps<T> & { testID?: string }) {
	const { testID = "picker", data, value, renderItem, style } = props;
	const index = Math.max(value === undefined ? 0 : data.indexOf(value), 0);
	const item = data[index];
	const separators = {
		highlight: () => {},
		unhighlight: () => {},
		updateProps: () => {},
	};

	return (
		<View testID={testID} style={style} {...{ pickerProps: props }}>
			{item !== undefined && renderItem?.({ item, index, separators })}
		</View>
	);
}

export const pickerUiMock = () => ({
	...jest.requireActual("@modules/core/control/entities/picker/ui"),
	Picker: FakePicker,
	PickerMemo: FakePicker,
});
