import { selectShowInitialHealthAndSanity } from "@modules/board/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import type { InvestigatorMainStatType } from "@shared/model";
import { type WithPickerValueProps, withPickerValue } from "../../lib";
import { byStat } from "./MainStatValue.components";

export type MainStatValueProps = WithPickerValueProps & {
	stat: InvestigatorMainStatType;
	initialValue?: number;
};

const controls = {
	health: withPickerValue({
		Background: byStat.health.Container,
		Value: byStat.health.Value,
	}),
	sanity: withPickerValue({
		Background: byStat.sanity.Container,
		Value: byStat.sanity.Value,
	}),
};

export const MainStatValue = ({
	stat,
	value,
	initialValue,
	children,
	...props
}: MainStatValueProps) => {
	const showInitial = useAppSelector(selectShowInitialHealthAndSanity);
	const Control = controls[stat];
	const C = byStat[stat];

	return (
		<Control {...props} value={value}>
			{children}
			{showInitial && typeof initialValue === "number" && (
				<C.Initial>
					<C.InitialValue value={initialValue} />
				</C.Initial>
			)}
		</Control>
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
