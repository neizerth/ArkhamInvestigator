import { decreaseCurrentStat, increaseBaseStat, increaseCurrentStat, selectCurrentStatValues, selectShowAdditionalInformation, setBaseStat, setCurrentStat, useAppDispatch, useAppSelector } from "@shared/lib";
import { InvestigatorMainStatType } from "@shared/model";
import { PickerChangeEvent } from "@widgets/picker";
import { useCallback, useMemo } from "react";

export const useMainStat = (statType: InvestigatorMainStatType) => {
  const dispatch = useAppDispatch();
  const selectValues = useMemo(
    () => selectCurrentStatValues(statType), 
    [statType]
  )

  const {
    initialValue,
    baseValue,
    value
  } = useAppSelector(selectValues);

  const diff = baseValue - initialValue;
  const wounds = Math.max(baseValue - value, 0);

  const onChange = useCallback(({ value = 0 }: PickerChangeEvent) => {
    dispatch(setCurrentStat(statType, value));
  }, [dispatch, statType]);

  const onLongPress = useCallback(() => {
    if (diff === 0) {
      dispatch(increaseBaseStat(statType));
      dispatch(increaseCurrentStat(statType));
      return;
    }

    const nextValue = Math.min(
      initialValue,
      value - diff
    )
    
    dispatch(setBaseStat(statType, initialValue));
    dispatch(setCurrentStat(statType, nextValue));

  }, [dispatch, diff, initialValue, statType, value]);

  const onPress = useCallback(() => {
    dispatch(decreaseCurrentStat(statType));
  }, [dispatch, statType]);

  return {
    onPress,
    onLongPress,
    onChange,
    initialValue,
    baseValue,
    value,
    wounds
  }
}