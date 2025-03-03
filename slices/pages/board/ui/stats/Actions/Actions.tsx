import { useAppSelector } from '@shared/lib';
import * as C from './Actions.components';
import { selectBoard } from '@pages/board/lib';
import { ViewProps } from 'react-native';

export type ActionsProps = ViewProps

export const Actions = ({
  ...props
}: ActionsProps) => {
  const { value } = useAppSelector(selectBoard);
  const { additionalAction } = value;

  const actionIcon = 'investigator';
  return (
    <C.Container {...props}>
      <C.Content>
        
        <C.Value>
          <C.ValueText value={value.actions}/>
        </C.Value>
        {additionalAction && (
          <C.AdditionalAction>
            <C.ActionIcon icon={actionIcon}/>
          </C.AdditionalAction>
        )}
      </C.Content>
    </C.Container>
  );
}