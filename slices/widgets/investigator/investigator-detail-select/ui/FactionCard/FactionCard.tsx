import type { PropsWithFaction } from '@shared/model/ui';
import * as C from './FactionCard.components';
import type { ViewProps } from 'react-native';

export type InvestigatorDetailSelectCardProps = ViewProps & PropsWithFaction & {
  title?: string
  subtitle?: string
  onClose?: () => void
}

export const InvestigatorDetailSelectCard = ({
  faction,
  title,
  subtitle,
  children,
  onClose,
  ...props
}: InvestigatorDetailSelectCardProps) => {
  return (
    <C.Container {...props}>
      <C.Header faction={faction}>
        <C.Background faction={faction}/>
        <C.HeaderContent>
          <C.Icon faction={faction}/>
          <C.HeaderTextContent>
            <C.Title>
              {title}
            </C.Title>
            <C.Subtitle>
              {subtitle}
            </C.Subtitle>
          </C.HeaderTextContent>
          {onClose && (
            <C.CloseIcon onPress={onClose}/>
          )}
        </C.HeaderContent>
      </C.Header>
      <C.Body faction={faction}>
        <C.Content>
          <C.ScrollContainer>
            {children}
          </C.ScrollContainer>
        </C.Content>
      </C.Body>
    </C.Container>
  );
}