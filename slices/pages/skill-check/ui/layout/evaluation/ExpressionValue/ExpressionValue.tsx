import * as C from './ExpressionValue.components';

export type ExpressionValueProps = {

}

export const ExpressionValue = ({}: ExpressionValueProps) => {
  const value = 9;
  return (
    <C.Container>
      <C.Value>={value}</C.Value>
    </C.Container>
  );
}