import { addCurrentHistoryItem, decreaseCurrentStat, increaseBaseStat, increaseCurrentStat, selectCurrentStatValues, selectShowAdditionalInformation, setBaseStat, setCurrentStat, setStatTransaction, useAppDispatch, useAppSelector } from "@shared/lib";
import { InvestigatorMainStatType } from "@shared/model";
import { PickerChangeEvent } from "@widgets/picker";
import { number } from "mathjs";
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
    const diff = baseValue - initialValue;

    if (diff === 0) {
      console.log({value})
      dispatch(setStatTransaction(
        statType,
        value + 1, 
        baseValue + 1,
      ));
      return;
    }

    const nextValue = Math.min(
      initialValue,
      value - diff
    )

    dispatch(setStatTransaction(
      statType,
      nextValue, 
      initialValue,
    ));

  }, [dispatch, baseValue, initialValue, value, statType]);

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