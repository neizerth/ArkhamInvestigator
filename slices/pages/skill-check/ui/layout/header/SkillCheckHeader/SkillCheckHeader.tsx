import { goBack, selectHistoryShown, selectSkillCheckType, setHistoryShown, useAppDispatch, useAppSelector } from '@shared/lib';
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

  const back = useCallback(() => {
    dispatch(goBack())
  }, [dispatch]);

  return (
    <C.Container {...props}>
      <C.Row>
        <C.Button 
          icon='arrow_back' 
          onPress={back}
        />
        {icon && (
          <C.Stat icon={icon}/>
        )}
        <C.Button 
          icon='history' 
          onPress={toggleHistory}
        />
      </C.Row>
      <C.Rule/>
    </C.Container>
  );
}