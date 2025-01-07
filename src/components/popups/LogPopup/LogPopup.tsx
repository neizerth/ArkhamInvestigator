import { Popup, InvestigatorContent, Icon, Block } from '@/components';
import S from './LogPopup.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectInvesigator } from '@/store/features/investigator/investigator';
import { selectBoardHistory } from '@/store/features/boardHistory/boardHistory';
import { useTranslation } from 'react-i18next';
import { selectLanguage } from '@/store/features/language/language';
import { mapHistoryItem } from './features/mapHistoryItem';
import { Inline } from '@/components/ui/common/Inline/Inline';
import { hhmm } from '@/features/data/date';

export type LogPopupProps = {

}

export const LogPopup = ({}: LogPopupProps) => {
  const { t } = useTranslation();
  const language = useAppSelector(selectLanguage);
  const investigator = useAppSelector(selectInvesigator);
  const items = useAppSelector(selectBoardHistory);
  const logItems = items.map(mapHistoryItem);

  return (
    <Popup id="log">
      {investigator && (
        <InvestigatorContent 
          faction={investigator.faction_code}
        >
          <Block className={S.content}>
            <table className={S.table}>
              <tbody>
                {logItems.map(item => (
                  <tr key={item.id}>
                    <td>{hhmm(item.date)}</td>
                    <td>
                      <Block className={S.type}>
                        {t(item.type)}
                        <Block className={S.icon}>
                          <Icon icon={item.icon}/>
                        </Block>
                      </Block>
                    </td>
                    <td className={S.valueCell}>
                      <Block className={S.valueInfo}>

                        <Inline>
                          {item.value > item.oldValue ? '⇑' : '⇓'}
                        </Inline>
                        <Inline className={S.old}>
                          {item.oldValue}
                          <Inline className={S.cross}>
                            <Icon icon='cross_a'/>
                          </Inline>
                        </Inline>
                        <Inline>⇒</Inline>
                        {item.value}
                      </Block>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Block>
        </InvestigatorContent>
      )}
    </Popup>
  );
}