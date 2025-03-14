import { withLocale } from "@features/i18n";
import { color, font } from "@shared/config";
import { SanCn, TeutonicRU, ViaodaLibre } from "@shared/fonts"
import { STXingkai, Arkhamic } from "@shared/fonts"

// export const Text: typeof BaseText = styled(BaseText)`
//   font-family: ${Teutonic.ru};
//   font-size: ${font.size.xxl}px;
//   color: ${color.light10};
// `

const zhText = {
  fontFamily: STXingkai.regular
}

export const Text = withLocale({
  style: {
    default: {
      fontFamily: Arkhamic.regular,
      fontSize: font.size.xxl,
      color: color.light10
    },
    ru: {
      fontFamily: TeutonicRU.regular
    },
    ko: {
      fontFamily: SanCn.bold
    },
    vi: {
      fontFamily: ViaodaLibre.regular
    },
    zh: zhText,
    "zh-cn": zhText
  }
})