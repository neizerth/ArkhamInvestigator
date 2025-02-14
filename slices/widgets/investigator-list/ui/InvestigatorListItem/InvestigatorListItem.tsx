import { 
  getInvestigatorImageUrl as getImageUrl 
} from "@shared/api/getInvestigatorImageUrl"
import type { InvestigatorSource, Story } from "@shared/model"
import { Container, Image } from "./InvestigatorListItem.components"
import type { Investigator as InvestigatorMedia } from "arkham-investigator-data"

export type InvestigatorListItemProps = {
  investigator: InvestigatorSource
  story: Story
  media?: InvestigatorMedia
}
export const InvestigatorListItem = ({
  investigator,
  story,
  media
}: InvestigatorListItemProps) => {
  const { code } = investigator;
  const id = media?.image?.id || code;
  const url = getImageUrl(id, 'mini')
  const source = { uri: url }

  return (
    <Container>
      <Image source={source} />
    </Container>
  )
}