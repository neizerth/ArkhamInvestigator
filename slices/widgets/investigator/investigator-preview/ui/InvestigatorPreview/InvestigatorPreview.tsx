import { 
  getInvestigatorImageUrl as getImageUrl 
} from "@shared/api/getInvestigatorImageUrl"
import type { Faction, InvestigatorSource, Story } from "@shared/model"
import { Container, Image, Info, Selection } from "./InvestigatorPreview.components"
import type { TouchableOpacityProps } from "react-native"
import { useImageSize } from "@widgets/investigator/investigator-select/lib/hooks"
import type { Investigator as InvestigatorMedia } from "arkham-investigator-data"
import { InvestigatorPreviewFactionIcon as FactionIcon } from "../InvestigatorPreviewFactionIcon"

export type InvestigatorPreviewProps = TouchableOpacityProps & {
  investigator: InvestigatorSource
  story: Story
  media?: InvestigatorMedia
  selected: boolean
}
export const InvestigatorPreview = ({
  investigator,
  selected,
  ...props
}: InvestigatorPreviewProps) => {
  const size = useImageSize();
  const { code } = investigator;
  const faction = investigator.faction_code as Faction;
  const url = getImageUrl(code, 'square')
  const source = { uri: url }
  return (
    <Container {...props}>
      <Image 
        source={source}
        size={size}
      />
      <Info>
        <FactionIcon faction={faction}/>
      </Info>
      {selected && (
        <Selection faction={faction}/>
      )}
    </Container>
  )
}