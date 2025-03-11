import { descriptionSize, LayoutContext, PORTRAIT_DESCRIPTION_HEIGHT } from "@pages/board/config";
import { selectShowDescription, useAppSelector } from "@shared/lib";
import { useContext, useEffect } from "react";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export const useShowDescription = () => {
  const top = useSharedValue(0);

  const showDescription = useAppSelector(selectShowDescription);
  
  const { view } = useContext(LayoutContext);
  
  useEffect(() => {
    const height = view.width / descriptionSize.ratio;
    
    top.value = showDescription ? 
      PORTRAIT_DESCRIPTION_HEIGHT - height : 
      0;

  }, [showDescription, view, top]);

  return useAnimatedStyle(() => {
    return {
      top: withTiming(top.value, {
        duration: 100
      })
    };
  });
}