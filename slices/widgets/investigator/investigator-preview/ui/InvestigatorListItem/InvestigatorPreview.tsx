import { 
  getInvestigatorImageUrl as getImageUrl 
} from "@shared/api/getInvestigatorImageUrl"
import type { Faction, InvestigatorSource, Story } from "@shared/model"
import { Container, NeutralIcon, FactionIcon, Image, Info, Selection } from "./InvestigatorPreview.components"
import type { TouchableOpacityProps } from "react-native"
import { useImageSize } from "@widgets/investigator/investigator-select/lib/hooks"
import type { Investigator as InvestigatorMedia } from "arkham-investigator-data"

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
  const { code, faction_code } = investigator;
  const url = getImageUrl(code, 'square')
  const source = { uri: url }
  return (
    <Container {...props}>
      <Image 
        source={source}
        size={size}
      />
      <Info>
        {faction_code === 'neutral' ? (
          <NeutralIcon/>
        ) : (
          <FactionIcon faction={faction_code}/>
        )}
      </Info>
      {selected && (
        <Selection 
          faction={faction_code as Faction}
        />
      )}
    </Container>
  )
}