import styled from 'styled-components';
import { createResponsiveUnit } from '@/features/units/responsive';
import { BACKGROUND_WIDTH } from '../InvestigatorBoardSkills/constants';
import { Block } from '@/components';

const px = createResponsiveUnit({
  defaultValue: BACKGROUND_WIDTH,
  name: 'unit'
});

export const Container = styled.div`
  width: ${px(100)};
  height: ${px(86)};
  position: relative;
  overflow: hidden;
  border-radius: ${px(36)};
  font-size: ${px(36)};
`

export const Value = styled(Block)`
  position: absolute;
  z-index: 2;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: ${px(36)};
  width: ${px(44)};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

export const CheckPopupActivation = styled(Block)`
  cursor: pointer;
  border-radius: ${px(36)};
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`