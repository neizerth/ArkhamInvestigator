import { clearSkillCheckHistory, goBack, selectHistoryShown, selectSkillCheckType, sendCommandSignal, setHistoryShown, useAppDispatch, useAppSelector } from '@shared/lib';
import * as C from './SkillCheckHeader.components';
import { ViewProps } from 'react-native';
import { useCallback } from 'react';

type SkillCheckHeaderProps = ViewProps;
export const SkillCheckHeader = ({
  ...props
}: SkillCheckHeaderProps) => {
  const dispatch = useAppDispatch();
  const icon = useAppSelector(selectSkillCheckType);

  const historyShown = useAppSelector(selectHistoryShown);

  const toggleHistory = useCallback(() => {
    dispatch(setHistoryShown(!historyShown));
  }, [dispatch, historyShown])

  const clearHistory = useCallback(() => {
    dispatch(clearSkillCheckHistory());
  }, [dispatch])

  const back = useCallback(() => {
    dispatch(goBack())
  }, [dispatch]);

  return (
    <C.Container {...props}>
      <C.Content>
        {icon && (
          <C.CheckIcon>
            <C.Stat icon={icon}/>
          </C.CheckIcon>
        )}
        <C.Controls>
          <C.Row>
            <C.Button 
              icon='arrow_back' 
              onPress={back}
            />
            <C.HistoryActions>
              <C.Button 
                icon='trash' 
                onPress={clearHistory}
              />
              <C.Button 
                icon={historyShown ? 'calculator' : 'history'}
                onPress={toggleHistory}
              />
            </C.HistoryActions>
          </C.Row>
        </C.Controls>
        <C.Rule/>
      </C.Content>
    </C.Container>
  );
}