import { 
  getInvestigatorImageUrl as getImageUrl 
} from "@shared/api/getInvestigatorImageUrl"
import type { Faction, InvestigatorSource } from "@shared/model"
import { Container, Image, Info, Selection, ExtraIcon } from "./InvestigatorPreview.components"
import type { TouchableOpacityProps } from "react-native"
import { useImageSize } from "@widgets/investigator/investigator-select/lib/hooks"
import type { Investigator as InvestigatorMedia } from "arkham-investigator-data"
import { InvestigatorPreviewFactionIcon as FactionIcon } from "../InvestigatorPreviewFactionIcon"

export type InvestigatorPreviewProps = TouchableOpacityProps & {
  investigator: InvestigatorSource
  media?: InvestigatorMedia
  selected: boolean
  imageId?: string
  icon?: string
  size?: number
}
export const InvestigatorPreview = ({
  investigator,
  selected,
  icon,
  ...props
}: InvestigatorPreviewProps) => {
  const defaultSize = useImageSize();
  const size = props.size || defaultSize;

  const imageId = props.imageId || investigator.code;
  const faction = investigator.faction_code as Faction;
  const url = getImageUrl(imageId, 'square')
  const source = { uri: url }
  return (
    <Container {...props}>
      <Image 
        source={source}
        size={size}
      />
      <Info>
        {icon ? (
          <ExtraIcon icon={icon}/>
          ) : (
          <FactionIcon faction={faction}/>
        )}
      </Info>
      {selected && (
        <Selection faction={faction}/>
      )}
    </Container>
  )
}