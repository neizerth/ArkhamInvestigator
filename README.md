# Arkham Investigator

Digital Investigator Board for Arkham Horror LCG (Arkham Horro: The Card Game)

## Translations

1. Copy [slices/modules/core/i18n/shared/config/translations/en.json](./slices/modules/core/i18n/shared/config/translations/en.json) and rename it to your locale's ISO-639 code.
2. Prefix your commit with `feat: ` or `fix: `
2. Translate and open a PR.

## Content

If you want to add skins or new investigators, follow to the [data repository](https://github.com/neizerth/ArkhamInvestigatorData)

## Architecture Concepts

This App in general is following by [FSD](https://github.com/feature-sliced) concepts, except:

   UI components can be used in the same slice. 