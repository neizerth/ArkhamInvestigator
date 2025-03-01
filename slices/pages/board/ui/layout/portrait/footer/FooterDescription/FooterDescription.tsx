import { Animated, type ViewProps } from 'react-native';
import * as C from './FooterDescription.components';
import { useCallback, useContext, useState } from 'react';
import { descriptionSize, LayoutContext, PORTRAIT_DESCRIPTION_HEIGHT } from '@pages/board/config';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export type FooterDescriptionProps = ViewProps;

export const FooterDescription = ({
  ...props
}: FooterDescriptionProps) => {
  const [display, setDisplay] = useState(false);
  const { view } = useContext(LayoutContext);
  const top = useSharedValue(0);

  const toggle = useCallback(() => {   
    const toggleView = display ? hide : show;
    setDisplay(!display);
    toggleView();
  }, [display]);

  const show = () => {
    const value = PORTRAIT_DESCRIPTION_HEIGHT - view.width / descriptionSize.ratio;
    top.value = value;
  }

  const hide = () => {
    top.value = 0;
  }
  
  const contentStyle = useAnimatedStyle(() => {
    return {
      top: withTiming(top.value, {
        duration: 300
      })
    };
  });

  return (
    <C.Container {...props}>
      <C.Content>
        <C.Expand style={contentStyle}>
          <C.Button onPress={toggle}>
            <C.Background view={view}/>
          </C.Button>
        </C.Expand>
      </C.Content>
    </C.Container>
  );
}