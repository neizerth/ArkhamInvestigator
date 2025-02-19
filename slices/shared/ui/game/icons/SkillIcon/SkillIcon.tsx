import type { PropsWithSkill } from "@shared/model/ui";
import { Background, Container, Foreground } from "./SkillIcon.components";
import type { IconProps } from "../Icon";

export type SkillIconProps = Omit<IconProps, 'icon'> & PropsWithSkill;

export const SkillIcon = ({
  skillType,
  ...props
}: SkillIconProps) => {
  const foreground = `skill_${skillType}_inverted`;
  const background = `skill_${skillType}`;
  return (
    <Container>
      <Background 
        {...props}
        skillType={skillType}
        icon={background}
      />
      <Foreground
        {...props}
        icon={foreground}
      />
    </Container>
  );
}