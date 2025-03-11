import type { ScrollView, ViewProps } from 'react-native';
import * as C from './ExpressionHistory.components';
import { getSkillCheckValue, selectCurrentBoard, selectSkillCheckHistory, setSkillCheckData, useAppDispatch, useAppSelector } from '@shared/lib';
import { ExpressionDisplay } from '../ExpressionDisplay';
import { useCallback, useRef } from 'react';
import { SkillCheckItem } from '@shared/model';

export type ExpressionHistoryProps = ViewProps & {
  size?: number;
}

export const ExpressionHistory = ({
  size = 1,
  ...props
}: ExpressionHistoryProps) => {
  const dispatch = useAppDispatch();
  const history = useAppSelector(selectSkillCheckHistory)
  const board = useAppSelector(selectCurrentBoard);

  if (!board) {
    return null;
  }
  
  const { value } = board;
  
  const data = history
    .slice(0, size)
    .map(item => ({
      ...item,
      currentValue: getSkillCheckValue({
        data: item.expression,
        value
      })
    }))

  const ref = useRef<ScrollView>(null);

  const onContentSizeChange = useCallback(() => {
    if (!ref.current) {
      return;
    }
    ref.current.scrollToEnd();
  }, [])


  const setCurrentValue = useCallback((data: SkillCheckItem[]) => () => {
    dispatch(setSkillCheckData(data));
  }, [dispatch])

  return (
    <C.Container 
      {...props}
      ref={ref}
      onContentSizeChange={onContentSizeChange}
    >
      {data.map(item => (
        <C.Item key={item.id}>
          <ExpressionDisplay
            data={item.expression}
            type="secondary"
            value={item.value}
            onPress={setCurrentValue(item.expression)}
          />
        </C.Item>
        
      ))}
    </C.Container>
  );
}