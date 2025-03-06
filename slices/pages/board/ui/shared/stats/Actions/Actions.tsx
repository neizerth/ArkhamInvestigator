import { selectCurrentBoard, useAppSelector } from '@shared/lib';
import * as C from './Actions.components';
import { ViewProps } from 'react-native';

export type ActionsProps = ViewProps

export const Actions = ({
  ...props
}: ActionsProps) => {
  const { value } = useAppSelector(selectCurrentBoard);
  const { additionalAction } = value;

  const actionIcon = 'investigator';
  return (
    <C.Container {...props}>
      <C.Content>
        
        <C.Value value={value.actions}/>
        {additionalAction && (
          <C.AdditionalAction>
            <C.ActionIcon icon={actionIcon}/>
          </C.AdditionalAction>
        )}
      </C.Content>
    </C.Container>
  );
}