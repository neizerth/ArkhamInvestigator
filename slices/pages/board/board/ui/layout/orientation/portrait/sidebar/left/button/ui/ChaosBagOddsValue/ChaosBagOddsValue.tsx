import type { ValueProps } from "@shared/ui";
import * as C from "./ChaosBagOddsValue.components";

export type ChaosBagOddsValueProps = Omit<ValueProps, "value">;

export const ChaosBagOddsValue = (props: ChaosBagOddsValueProps) => {
	const value = 30;
	const displayValue = `${value}%`;
	return <C.Content {...props} value={displayValue} />;
};
