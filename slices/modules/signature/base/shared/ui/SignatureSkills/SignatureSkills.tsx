import * as C from "./SignatureSkills.components";

export type SignatureSkillsProps = {
	agility: number;
	intellect: number;
	combat: number;
	willpower: number;
};

export const SignatureSkills = ({
	agility,
	intellect,
	combat,
	willpower,
}: SignatureSkillsProps) => {
	return (
		<C.Container>
			<C.Skill value={willpower} skillType="willpower" />
			<C.Skill value={intellect} skillType="intellect" />
			<C.Skill value={combat} skillType="combat" />
			<C.Skill value={agility} skillType="agility" />
		</C.Container>
	);
};
