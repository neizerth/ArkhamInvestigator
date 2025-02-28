import type { PropsWithSkill } from "@shared/model/ui";
import { Background, Container, Foreground, type PropsWithTheme } from "./SkillIcon.components";
import type { IconProps } from "../Icon";

export type SkillIconProps = Omit<IconProps, 'icon'> & PropsWithSkill & PropsWithTheme;

export const SkillIcon = ({
  skillType,
  dark,
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
        dark={dark}
      />
      <Foreground
        {...props}
        icon={foreground}
      />
    </Container>
  );
}