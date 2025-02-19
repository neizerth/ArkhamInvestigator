import { type IconNumberProps } from "@shared/ui";
import { Container, Value } from "./Skill.components";

export type SkillProps = IconNumberProps & {
  value: number
  icon: string
}

export const Skill = ({
  value
}: SkillProps) => {
  return (
    <Container>
      <Value
        value={value}
      />
    </Container>
  );
}