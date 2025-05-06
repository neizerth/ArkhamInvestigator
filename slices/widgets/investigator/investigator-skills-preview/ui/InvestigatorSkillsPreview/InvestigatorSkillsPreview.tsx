import {
	Agility,
	Combat,
	Container,
	Intellect,
	Willpower,
} from "./InvestigatorSkillsPreview.components";

export type InvestigatorSkillsPreviewProps = {
	agility: number;
	intellect: number;
	combat: number;
	willpower: number;
};

export const InvestigatorSkillsPreview = ({
	agility,
	intellect,
	combat,
	willpower,
}: InvestigatorSkillsPreviewProps) => {
	return (
		<Container>
			<Willpower value={willpower} />
			<Intellect value={intellect} />
			<Combat value={combat} />
			<Agility value={agility} />
		</Container>
	);
};
