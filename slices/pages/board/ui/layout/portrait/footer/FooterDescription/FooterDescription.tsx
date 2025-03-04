import { Animated, type ViewProps } from 'react-native';
import * as C from './FooterDescription.components';
import { useCallback, useContext, useEffect, useState } from 'react';
import { descriptionSize, LayoutContext, PORTRAIT_DESCRIPTION_HEIGHT, PortraitLayoutContext } from '@pages/board/config';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useAppSelector } from '@shared/lib';
import { selectBoard } from '@pages/board/lib';
import { Faction } from '@shared/model';
import { tick } from '@features/haptic';

export type FooterDescriptionProps = ViewProps;

export const FooterDescription = ({
  ...props
}: FooterDescriptionProps) => {
  const { showDescription, setShowDescription } = useContext(PortraitLayoutContext);

  const { view } = useContext(LayoutContext);
  const { investigator } = useAppSelector(selectBoard);
  const faction = investigator.faction_code as Faction;
  const top = useSharedValue(0);

  useEffect(() => {
    top.value = showDescription ? 
      PORTRAIT_DESCRIPTION_HEIGHT - 
        view.width / descriptionSize.ratio : 
      0
  }, [showDescription, view, top]);
  
  const onShow = useCallback(() => {
    if (!showDescription) {
      setShowDescription(true)
      tick();
    }
  }, [showDescription, setShowDescription]);

  const onHide = useCallback(() => {
    if (showDescription) {
      setShowDescription(false)
      tick();
    }
  }, [showDescription, setShowDescription]);

  const contentStyle = useAnimatedStyle(() => {
    return {
      top: withTiming(top.value, {
        duration: 300
      })
    };
  });

  const vw = view.width * 6 / 100;

  return (
    <C.Container {...props}>
      <C.Content>
        <C.Expand style={contentStyle}>
          <C.Button onPress={onShow}>
            <C.Background 
              faction={faction}
              width={view.width}
            >
              <C.DescriptionContent>
                <C.TextCollapse onPress={onHide}>
                  <C.TextContent>
                    <C.Traits unit={vw}>
                      {investigator.traits}
                    </C.Traits>
                    {showDescription && (
                      <>
                        <C.Text 
                          value={investigator.text}
                          unit={vw}
                        />
                        <C.Flavor unit={vw}>
                          {investigator.flavor}
                        </C.Flavor>
                      </>
                    )}
                  </C.TextContent>
                </C.TextCollapse>
                <C.Menu/>
              </C.DescriptionContent>
            </C.Background>
          </C.Button>
        </C.Expand>
      </C.Content>
    </C.Container>
  );
}