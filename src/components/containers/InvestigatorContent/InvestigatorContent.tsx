import classNames from 'classnames';
import S from './InvestigatorContent.module.scss';
import { Block, type BlockProps } from '@/components/ui/common/Block/Block';

export type InvestigatorContentProps = BlockProps & {
  faction: string
}

export const InvestigatorContent = ({
  faction,
  ...props
}: InvestigatorContentProps) => {
  return (
    <Block
      {...props}
      className={classNames(
        S.container,
        S[faction]
      )}
    />
  )
}