import { InvestigatorBoard, LogPopup, Page } from '@/components';
import S from './InvestigatorPage.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectInvesigator } from '@/store/features/investigator/investigator';
import { selectLoading } from '@/store/features/app/app';

export type InvestigatorPageProps = {

}

export const InvestigatorPage = ({}: InvestigatorPageProps) => {
  const investigator = useAppSelector(selectInvesigator);
  const loading = useAppSelector(selectLoading);
  return (
    <Page>
      {!investigator && !loading && <div className={S.notFound}>Not found</div>}
      {investigator && (
        <InvestigatorBoard investigator={investigator}/>
      )}
      <LogPopup/>
    </Page>
  );
}