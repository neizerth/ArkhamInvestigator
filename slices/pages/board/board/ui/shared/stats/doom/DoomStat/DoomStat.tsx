import type { DoomStatBackground } from "@modules/core/theme/shared/ui";
import type { StatSourceType } from "@shared/model";
import { range } from "ramda";
import type { ComponentProps } from "react";
import { byType } from "./DoomStat.components";
import { useDoomStat } from "./useDoomStat";

const doomData = range(0, 101);

export type DoomStatProps = ComponentProps<typeof DoomStatBackground> & {
	type: StatSourceType;
};

export const DoomStat = ({ type, ...props }: DoomStatProps) => {
	const C = byType[type];
	const { value, onValueChanged, onLongPress, onPress } = useDoomStat(type);

	return (
		<C.Container {...props}>
			<C.Picker
				value={value}
				data={doomData}
				onValueChanged={onValueChanged}
				onLongPress={onLongPress}
				onPress={onPress}
			/>
		</C.Container>
	);
};

export type InvestigatorDoomProps = Omit<DoomStatProps, "type">;
export type ScenarioDoomProps = Omit<DoomStatProps, "type">;

export const InvestigatorDoom = (props: InvestigatorDoomProps) => (
	<DoomStat {...props} type="investigator" />
);

export const ScenarioDoom = (props: ScenarioDoomProps) => (
	<DoomStat {...props} type="scenario" />
);
