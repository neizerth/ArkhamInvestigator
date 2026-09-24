import type { StatSourceType } from "@shared/model";
import { Resources, type ResourcesProps } from "../Resources";
import { useResourcesStat } from "./useResourcesStat";

export type ResourcesStatProps = ResourcesProps & {
	type: StatSourceType;
};

export const ResourcesStat = ({ type, ...props }: ResourcesStatProps) => {
	const { value, onChange, onPress, onLongPress } = useResourcesStat(type);

	return (
		<Resources
			type={type}
			{...props}
			value={value}
			onChange={onChange}
			onPress={onPress}
			onLongPress={onLongPress}
		/>
	);
};

export type InvestigatorResourcesProps = Omit<ResourcesStatProps, "type">;
export type ScenarioResourcesProps = Omit<ResourcesStatProps, "type">;

export const InvestigatorResources = (props: InvestigatorResourcesProps) => (
	<ResourcesStat {...props} type="investigator" />
);

export const ScenarioResources = (props: ScenarioResourcesProps) => (
	<ResourcesStat {...props} type="scenario" />
);
