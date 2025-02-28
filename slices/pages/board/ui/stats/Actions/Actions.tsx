import * as C from './Actions.components';

export type ActionsProps = {

}

export const Actions = ({
  ...props
}: ActionsProps) => {
  return (
    <C.Container {...props}>
      <C.Background>

      </C.Background>
    </C.Container>
  );
}