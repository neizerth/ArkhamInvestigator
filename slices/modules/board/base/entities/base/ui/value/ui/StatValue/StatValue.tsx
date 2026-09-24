import { range } from "ramda";
import { PickerValue, type WithPickerValueProps } from "../../lib";
import { StatFigure, type StatFigureType, valueByStat } from "../StatFigure";

/** every stat picker offers the same range of counters */
const defaultData = range(0, 101);

export type StatValueProps = WithPickerValueProps & {
	stat: StatFigureType;
};

/** the compact stat value: the asset with the number or a picker inside it */
export const StatValue = ({
	stat,
	value,
	children,
	...props
}: StatValueProps) => (
	<StatFigure stat={stat} size="small">
		<PickerValue
			testID={`${stat}-picker`}
			{...props}
			value={value}
			Value={valueByStat[stat]}
			defaultData={defaultData}
		/>
		{children}
	</StatFigure>
);

export type CluesValueProps = Omit<StatValueProps, "stat">;
export type ResourcesValueProps = Omit<StatValueProps, "stat">;
export type ActionsValueProps = Omit<StatValueProps, "stat">;
export type DoomValueProps = Omit<StatValueProps, "stat">;

export const CluesValue = (props: CluesValueProps) => (
	<StatValue {...props} stat="clues" />
);

export const ResourcesValue = (props: ResourcesValueProps) => (
	<StatValue {...props} stat="resources" />
);

export const ActionsValue = (props: ActionsValueProps) => (
	<StatValue {...props} stat="actions" />
);

export const DoomValue = (props: DoomValueProps) => (
	<StatValue {...props} stat="doom" />
);
