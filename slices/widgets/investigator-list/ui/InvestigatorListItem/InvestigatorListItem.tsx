import { 
  getInvestigatorImageUrl as getImageUrl 
} from "@shared/api/getInvestigatorImageUrl"
import type { Faction, InvestigatorSource } from "@shared/model"
import { Container, NeutralIcon, FactionIcon, Image, Info, Selection } from "./InvestigatorListItem.components"
import type { TouchableOpacityProps } from "react-native"

export type InvestigatorListItemProps = TouchableOpacityProps & {
  investigator: InvestigatorSource
  selected: boolean
}
export const InvestigatorListItem = ({
  investigator,
  selected,
  ...props
}: InvestigatorListItemProps) => {
  const { code, faction_code } = investigator;
  const url = getImageUrl(code, 'square')
  const source = { uri: url }
  return (
    <Container {...props}>
      <Image 
        source={source}
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