import type { PropsWithFaction } from '@shared/model/ui';
import * as C from './FactionCard.components';
import { useWindowDimensions, type LayoutChangeEvent, type ViewProps } from 'react-native';
import { memo, useCallback, useMemo, useState } from 'react';
import { Outside } from '@shared/ui';
import { useLayoutSize } from '@shared/lib';

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
  const window = useWindowDimensions();
  const [size, onLayout] = useLayoutSize(window);
  const [containerSize, onContainerLayout] = useLayoutSize();

  const maxHeight = useMemo(() => {
    return size.height + MAX_HEIGHT_AREA
  }, [size]);

  const style = size ? {
    maxHeight
  } : {};

  const containerStyle = {
    opacity: size ? 1 : 0
  }
  
  return (
    <C.Container 
      {...props} 
      style={[
        style, 
        props.style, 
        containerStyle
      ]}
      onLayout={onContainerLayout}
    >
      <C.Header faction={faction}>
        {containerSize && (
          <C.Background 
            faction={faction}
            width={containerSize.width}
            height={55}
          />
        )}
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

export const InvestigatorDetailSelectCardMemo = memo(InvestigatorDetailSelectCard);