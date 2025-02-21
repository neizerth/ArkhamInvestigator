import { selectSelectedInvestigators, useAppSelector } from '@shared/lib';
import * as C from './StartButton.components';
import { getInvestigatorImageUrl } from '@shared/api/getInvestigatorImageUrl';
import { SelectedInvestigator } from '@shared/model';
import { Icon } from '@shared/ui';

export type StartButtonProps = {

}

const getImageSource = ({
  code,
  skinId,
  variantId
}: SelectedInvestigator) => ({
  uri: getInvestigatorImageUrl(skinId || variantId || code, 'square')
});

export const StartButton = ({}: StartButtonProps) => {
  const investigators = useAppSelector(selectSelectedInvestigators);

  return (
    <C.Container>
      <C.Content>
        <C.Investigators>
          {investigators.map(item => (
            <C.InvestigatorImage
              key={item.code}
              source={getImageSource(item)}
            />
          ))}
        </C.Investigators>
        <C.Text>Start</C.Text>
        <C.Icon icon="right-arrow"/>
      </C.Content>
    </C.Container>
  );
}