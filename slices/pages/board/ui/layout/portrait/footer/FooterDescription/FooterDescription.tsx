import { Animated, StyleSheet, type ViewProps } from 'react-native';
import * as C from './FooterDescription.components';
import { useCallback, useContext, useEffect, useState } from 'react';
import { descriptionSize, LayoutContext, PORTRAIT_DESCRIPTION_HEIGHT, PortraitLayoutContext } from '@pages/board/config';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { navigateTo, selectShowDescription, setShowDescription, useAppDispatch, useAppSelector } from '@shared/lib';
import { selectBoard } from '@pages/board/lib';
import { Faction } from '@shared/model';
import { tick, TICK_PATTERN } from '@features/haptic';

export type FooterDescriptionProps = ViewProps;

export const FooterDescription = ({
  ...props
}: FooterDescriptionProps) => {
  const dispatch = useAppDispatch();
  const showDescription = useAppSelector(selectShowDescription);

  const { view } = useContext(LayoutContext);
  const { investigator } = useAppSelector(selectBoard);
  const faction = investigator.faction_code as Faction;
  const top = useSharedValue(0);

  useEffect(() => {
    top.value = showDescription ? PORTRAIT_DESCRIPTION_HEIGHT - view.width / descriptionSize.ratio : 
      0
  }, [showDescription, view, top]);
  
  const onShow = useCallback(() => {
    if (!showDescription) {
      dispatch(setShowDescription(true))
      tick();
    }
  }, [showDescription, dispatch]);

  const onHide = useCallback(() => {
    if (showDescription) {
      dispatch(setShowDescription(false))
      tick();
    }
  }, [showDescription, dispatch]);

  const contentStyle = useAnimatedStyle(() => {
    return {
      top: withTiming(top.value, {
        duration: 300
      })
    };
  });

  const goHome = useCallback(() => {
    dispatch(navigateTo('/'));
  }, [dispatch]);

  const vw = view.width * 6 / 100;

  return (
    <C.Container {...props}>
      <C.Content>
        <C.Expand style={contentStyle}>
          {showDescription ? (
            <>
              <C.Exit onPress={goHome}/>
              <C.Clear/>
            </>
          ) : (
            <C.ExpandArea onPress={onShow} style={StyleSheet.absoluteFill}/>
          )}
          
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
        </C.Expand>
      </C.Content>
    </C.Container>
  );
}