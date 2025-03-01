import { useAppSelector } from '@shared/lib';
import * as C from './Actions.components';
import { selectBoard } from '@pages/board/lib';

export type ActionsProps = {

}

export const Actions = ({
  ...props
}: ActionsProps) => {
  const { value } = useAppSelector(selectBoard);
  const { additionalAction } = value;

  const actionIcon = 'investigator';
  return (
    <C.Container {...props}>
      <C.Content>
        {additionalAction && (
          <C.AdditionalAction>
            <C.ActionIcon icon={actionIcon}/>
          </C.AdditionalAction>
        )}
      </C.Content>
    </C.Container>
  );
}