import { IInvestigator } from '@/types/api';
import guardian from '../images/header_guardian.png';

export const getBackground = ({ faction_code }: IInvestigator) => {
  return guardian;
}