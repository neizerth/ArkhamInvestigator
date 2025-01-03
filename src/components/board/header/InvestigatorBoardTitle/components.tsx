import styled, { css } from "styled-components";

import { Block, Image } from '@/components';
import { PropsWithChildren } from "react";
import { createResponsiveUnit } from "@/features/units/responsive";

const px = createResponsiveUnit({
  defaultValue: 597,
  name: 'unit'
})

export const Container = styled(Block)<{
  $language: string
  $faction: string
}>`
  font-family: 'Teutonic', sans-serif;
  position: relative;
  color: #2e2622;
  ${({ $language }) => $language === 'ru' && css`
    font-family: 'Conkordia', 'Arkhamic';
  `}
`

export const Background = styled(Image)`
  filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0));
  width: 100%;
`

export const NameContainer = styled(Block)`
  position: absolute;
  top: ${px(5)};
  left: 0;
  width: 100%;
  font-size: ${px(52)};
  text-align: center;
  padding-left: ${px(120)};
  padding-right: ${px(70)};
  box-sizing: border-box;
`

export const NameContent = styled(Block)`
  position: relative;
  display: inline-block;
  white-space: nowrap;
`

export const Name = ({ children }: PropsWithChildren) => {
  return (
    <NameContainer>
      <NameContent>
        {children}
      </NameContent>
    </NameContainer>
  );
}

export const Unique = styled(Block)`
  position: absolute;
  left: ${px(-30)};
  font-size: ${px(24)};
  top: 50%;
  transform: translateY(-50%);
`

export const Subname = styled(Block)`
  font-family: 'Arno Pro', sans-serif;
  font-weight: bold;
  position: absolute;
  top: ${px(77)};
  width: 100%;
  font-size: ${px(18)};
  text-align: center;

  padding-left: ${px(153)};
  padding-right: ${px(104)};
  box-sizing: border-box;
  white-space: nowrap;
`