import { UnscaledText, type AppTextProps } from '../../behavior/UnscaledText';
export type BreakProps = AppTextProps

export const Break = (props: BreakProps) => {
  return (
    <UnscaledText {...props}>{'\n'}</UnscaledText>
  );
}