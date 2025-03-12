import { 
  getInvestigatorImageUrl as getImageUrl 
} from "@shared/api/getInvestigatorImageUrl"
import type { Faction, InvestigatorSource } from "@shared/model"
import * as C from "./InvestigatorPreview.components"
import type { GestureResponderEvent, TouchableOpacityProps } from "react-native"
import { useImageSize } from "@widgets/investigator/investigator-select/lib/hooks"
import type { Investigator as InvestigatorMedia } from "arkham-investigator-data"
import { InvestigatorPreviewFactionIcon as FactionIcon } from "../InvestigatorPreviewFactionIcon"
import { memo, useCallback } from "react"

export type InvestigatorPreviewProps = TouchableOpacityProps & {
  investigator: InvestigatorSource
  media?: InvestigatorMedia
  selected?: boolean
  selectedCount?: number
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
  selectedCount = 0,
  icon,
  media,
  disabled,
  ...props
}: InvestigatorPreviewProps) => {
  const defaultSize = useImageSize();
  const size = props.size || defaultSize;

  const imageId = props.imageId || investigator.code;
  const faction = investigator.faction_code as Faction;
  const uri = getImageUrl(imageId, 'square')
  const source = { uri }

  const showOptions = showOptionsInfo && (media?.variants || media?.skins);

  const onPress = useCallback((event: GestureResponderEvent) => {
    if (disabled) {
      return;
    }
    props.onPress?.(event);
  }, [props.onPress, disabled])
  
  return (
    <C.Container 
      {...props} 
      onPress={onPress}
    >
      {showOptions && (
        <C.OptionsInfo faction={faction}/>
      )}
      <C.Image 
        source={source}
        size={size}
      />
      {showIcon && (
        <C.Info>
          {icon ? (
            <C.ExtraIcon icon={icon}/>
            ) : (
            <FactionIcon faction={faction}/>
          )}
        </C.Info>
      )}
      {disabled && (
        <C.DisabledOverlay/>
      )}
      {selected && (
        <C.Selection faction={faction}/>
      )}
      {selectedCount > 1 && (
        <C.SelectedCount>
          <C.Count>{selectedCount}</C.Count>
        </C.SelectedCount>
      )}
    </C.Container>
  )
}

export const InvestigatorPreviewMemo = memo(InvestigatorPreview); 