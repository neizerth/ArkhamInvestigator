import { 
  getInvestigatorImageUrl as getImageUrl 
} from "@shared/api/getInvestigatorImageUrl"
import type { InvestigatorSource, Story } from "@shared/model"
import { Container, NeutralIcon, FactionIcon, Image, Info } from "./InvestigatorListItem.components"
import type { Investigator as InvestigatorMedia } from "arkham-investigator-data"

export type InvestigatorListItemProps = {
  investigator: InvestigatorSource
  story: Story
  media?: InvestigatorMedia
}
export const InvestigatorListItem = ({
  investigator,
  media
}: InvestigatorListItemProps) => {
  const { code, faction_code } = investigator;
  const id = media?.image?.id || code;
  const url = getImageUrl(id, 'square')
  const source = { uri: url }
  return (
    <Container>
      <Image source={source} />
      <Info>
        {faction_code === 'neutral' ? (
          <NeutralIcon/>
        ) : (
          <FactionIcon faction={faction_code}/>
        )}
      </Info>
    </Container>
  )
}