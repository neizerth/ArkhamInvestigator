import { PickerValue, type WithPickerValueProps } from "../../lib";
import { MainStatFigure, type MainStatType } from "../MainStatFigure";
import { valueByStat } from "../StatFigure";

export type MainStatValueProps = WithPickerValueProps & {
	stat: MainStatType;
	initialValue?: number;
	/** prefix of the testIDs, so a screen can tell apart several values of one stat */
	testID?: string;
};

/** the compact health and sanity value, used outside the board */
export const MainStatValue = ({
	stat,
	value,
	initialValue,
	testID = stat,
	children,
	...props
}: MainStatValueProps) => {
	const Value = valueByStat[stat];

	return (
		<MainStatFigure
			stat={stat}
			size="small"
			Value={Value}
			initialValue={initialValue}
		>
			<PickerValue
				testID={`${testID}-picker`}
				valueTestID={`${testID}-value`}
				{...props}
				value={value}
				Value={Value}
			/>
			{children}
		</MainStatFigure>
	);
};

export type HealthValueProps = Omit<MainStatValueProps, "stat">;
export type SanityValueProps = Omit<MainStatValueProps, "stat">;

export const HealthValue = (props: HealthValueProps) => (
	<MainStatValue {...props} stat="health" />
);

export const SanityValue = (props: SanityValueProps) => (
	<MainStatValue {...props} stat="sanity" />
);
