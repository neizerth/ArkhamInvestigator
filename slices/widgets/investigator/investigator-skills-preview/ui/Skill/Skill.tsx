import { useBreakpoint } from "@shared/lib/hooks/device/useBreakpoint";
import type { PropsWithSkill } from "@shared/model/ui";
import type { IconNumberProps } from "@shared/ui";
import { Container, Icon, Value } from "./Skill.components";

export type SkillProps = IconNumberProps &
	PropsWithSkill & {
		value: number;
	};

export const Skill = ({ value, skillType }: SkillProps) => {
	const { breakpoint } = useBreakpoint();
	return (
		<Container>
			<Value value={value} breakpoint={breakpoint} />
			<Icon skillType={skillType} breakpoint={breakpoint} />
		</Container>
	);
};
