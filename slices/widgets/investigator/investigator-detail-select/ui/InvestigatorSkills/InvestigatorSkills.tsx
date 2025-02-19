import type { InvestigatorSource } from '@shared/model';
import { Agility, Combat, Container, Intellect, Willpower } from './InvestigatorSkills.components';

export type InvestigatorSkillsProps = {
  investigator: InvestigatorSource
}

export const InvestigatorSkills = ({
  investigator
}: InvestigatorSkillsProps) => {

  const {
    skill_willpower,
    skill_intellect,
    skill_combat,
    skill_agility
  } = investigator
  return (
    <Container>
      <Willpower value={skill_willpower}/>
      <Intellect value={skill_intellect}/>
      <Combat value={skill_combat}/>
      <Agility value={skill_willpower}/>
    </Container>
  );
}