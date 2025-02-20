import type { PropsWithFaction } from '@shared/model/ui';
import * as C from './FactionCard.components';
import type { LayoutChangeEvent, ViewProps } from 'react-native';
import { useCallback, useState } from 'react';

export type InvestigatorDetailSelectCardProps = ViewProps & PropsWithFaction & {
  title?: string
  subtitle?: string
  onClose?: () => void
}

const MAX_HEIGHT_AREA = 87;

export const InvestigatorDetailSelectCard = ({
  faction,
  title,
  subtitle,
  children,
  onClose,
  ...props
}: InvestigatorDetailSelectCardProps) => {
  const [maxHeight, setMaxHeight] = useState<number | undefined>();

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    setMaxHeight(height + MAX_HEIGHT_AREA);
  }, []);

  const style = {
    maxHeight
  }
  const containerStyle = {
    opacity: maxHeight ? 1 : 0
  }
  return (
    <C.Container {...props} style={[style, props.style, containerStyle]}>
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
            <C.ScrollContent onLayout={onLayout}>
              {children}
            </C.ScrollContent>
          </C.ScrollContainer>
        </C.Content>
      </C.Body>
    </C.Container>
  );
}