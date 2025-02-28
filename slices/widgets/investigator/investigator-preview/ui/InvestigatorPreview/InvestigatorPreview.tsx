import { 
  getInvestigatorImageUrl as getImageUrl 
} from "@shared/api/getInvestigatorImageUrl"
import type { Faction, InvestigatorSource } from "@shared/model"
import { Container, Image, Info, Selection, ExtraIcon, OptionsInfo } from "./InvestigatorPreview.components"
import type { TouchableOpacityProps } from "react-native"
import { useImageSize } from "@widgets/investigator/investigator-select/lib/hooks"
import type { Investigator as InvestigatorMedia } from "arkham-investigator-data"
import { InvestigatorPreviewFactionIcon as FactionIcon } from "../InvestigatorPreviewFactionIcon"
import { memo } from "react"
import { TICK_PATTERN } from "@features/haptic"

export type InvestigatorPreviewProps = TouchableOpacityProps & {
  investigator: InvestigatorSource
  media?: InvestigatorMedia
  selected?: boolean
  imageId?: string
  icon?: string
  size?: number
  showIcon?: boolean
  showOptionsInfo?: boolean
}
export const InvestigatorPreview = ({
  showIcon = true,
  showOptionsInfo = true,
  investigator,
  selected,
  icon,
  media,
  ...props
}: InvestigatorPreviewProps) => {
  const defaultSize = useImageSize();
  const size = props.size || defaultSize;

  const imageId = props.imageId || investigator.code;
  const faction = investigator.faction_code as Faction;
  const uri = getImageUrl(imageId, 'square')
  const source = { uri }

  const showOptions = showOptionsInfo && (media?.variants || media?.skins);
  
  return (
    <Container 
      {...props}
      pressHapticPattern={TICK_PATTERN}
    >
      {showOptions && (
        <OptionsInfo faction={faction}/>
      )}
      <Image 
        source={source}
        size={size}
      />
      {showIcon && (
        <Info>
          {icon ? (
            <ExtraIcon icon={icon}/>
            ) : (
            <FactionIcon faction={faction}/>
          )}
        </Info>
      )}
      {selected && (
        <Selection faction={faction}/>
      )}
    </Container>
  )
}

export const InvestigatorPreviewMemo = memo(InvestigatorPreview); 