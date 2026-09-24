import type { StatSourceType } from "@shared/model";
import { Clues, type CluesProps } from "../Clues";
import * as C from "./CluesStat.components";
import { useCluesStat } from "./useCluesStat";

export type CluesStatProps = CluesProps & {
	type: StatSourceType;
};

export const CluesStat = ({ type, ...props }: CluesStatProps) => {
	const { value, onChange, onPress, onLongPress } = useCluesStat(type);

	const clues = (
		<Clues
			type={type}
			{...props}
			value={value}
			onChange={onChange}
			onPress={onPress}
			onLongPress={onLongPress}
		/>
	);

	if (type === "investigator") {
		return clues;
	}

	return <C.ScenarioContainer>{clues}</C.ScenarioContainer>;
};

export type InvestigatorCluesProps = Omit<CluesStatProps, "type">;
export type ScenarioCluesProps = Omit<CluesStatProps, "type">;

export const InvestigatorClues = (props: InvestigatorCluesProps) => (
	<CluesStat {...props} type="investigator" />
);

export const ScenarioClues = (props: ScenarioCluesProps) => (
	<CluesStat {...props} type="scenario" />
);
