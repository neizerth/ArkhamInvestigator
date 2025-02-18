import type { PropsWithFaction } from '@shared/model/ui';
import * as C from './FactionCard.components';
import type { ViewProps } from 'react-native';

export type InvestigatorDetailSelectCardProps = ViewProps & PropsWithFaction & {
  title?: string
  subtitle?: string
}

export const InvestigatorDetailSelectCard = ({
  faction,
  title,
  subtitle,
  children,
  ...props
}: InvestigatorDetailSelectCardProps) => {
  return (
    <C.Container {...props}>
      <C.Header faction={faction}>
        <C.Background faction={faction}/>
        <C.HeaderContent>
          <C.HeaderTextContent>
            <C.Title>
              {title}
            </C.Title>
            <C.Subtitle>
              {subtitle}
            </C.Subtitle>
          </C.HeaderTextContent>
          <C.Icon faction={faction}/>
        </C.HeaderContent>
      </C.Header>
      <C.Body faction={faction}>
        <C.Content>
          {children}
        </C.Content>
      </C.Body>
    </C.Container>
  );
}