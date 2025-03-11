import { factionColor } from "@shared/config";
import { PropsWithFaction } from "@shared/model";
import { PickerMemo as BasePicker } from "@widgets/picker";
import { FC } from "react";
import { Image as BaseImage, ImageProps, View } from "react-native";
import styled, { css } from "styled-components/native";
import { InvestigatorSelectItem } from "../InvestigatorSelectItem";

export const Container: typeof View = styled(View)`
  width: 60px;
  height: 60px;
  position: relative;
`

export const Value: typeof InvestigatorSelectItem = styled(InvestigatorSelectItem)`
  
`

export const Picker: typeof BasePicker = styled(BasePicker)
  .attrs({
    contentContainerStyle: {
      justifyContent: 'center'
    },
    itemHeight: 60,
    listStyle: {
      borderRadius: 80
    },
    gap: 48
  })`
  `