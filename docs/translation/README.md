# Translation Guide

This project uses **[i18next](https://www.i18next.com/)** with **React Native** for internationalization.  
We welcome contributions to add or improve translations!

## Supported languages

Currently, the app supports the following locales:

- **en** — English  
- **de** — Deutsch  
- **es** — Español  
- **fr** — Français  
- **it** — Italiano  
- **ko** — 한국어 (Korean)
- **pl** — Polski  
- **pt** — Português  
- **ru** — Русский  
- **vi** — Tiếng Việt  
- **zh-cn** — 中文（Simplified, China Mainland）  
- **zh** — 中文（Traditional, generic）

If your language is missing, feel free to add it.

---

## Adding a new language

1. Copy the base English translation files and rename them to your locale code (see the list above):

   - `assets/i18n/core/en.json` → `assets/i18n/core/<locale>.json`  
   - `assets/i18n/loading/en.json` → `assets/i18n/loading/<locale>.json`

2. Translate all keys into your language.

3. Commit your changes using a proper prefix:

   - `feat: added <locale> translation` (for new translations). For example: `feat: added ko translation`
   - `fix: updated <locale> translation` (for improvements/fixes). For example: `feat: updated ko translation`

4. Open a Pull Request.

---

## Loading screen phrases

From time to time, the app needs a moment to load data.  
To keep this screen fun, short phrases from the game universe appear under the loading indicator.

All phrases are stored here:

```
assets/i18n/loading/en.json
```


Use the English file as a guide.  
You don’t have to translate every phrase word for word — it’s perfectly fine to adapt them for your community.  
Local jokes or cultural references are welcome, as long as they fit the style of the game.  

⚠️ Just make sure your phrases stay friendly:  
avoid anything offensive or disrespectful.

---

### Adding a new language for loading phrases

After you create your `assets/i18n/loading/<locale>.json` file, you also need to register it in:

```
assets/i18n/loading/index.ts
```

Then add your new locale. For example, if you are adding German (`de`):

```ts
import de from "./de.json"; // import locale file

export const loadingTranslations: Record<string, string[]> = {
  en,
  ru,
  de, // <-- here
};

```

## 📚 Additional Documentation

* 📄 [**special.md**](./special.md)
  Special keys for joining values (e.g., *and*, list separators).

* 📄 [**plurals.md**](./plurals.md)
  Rules for pluralization (`one`, `few`, `many`) in supported locales.

* 📄 [**declensions.md**](./declensions.md)
  Grammatical declensions (currently accusative forms, e.g., Polish, Russian).

* 📄 [**syntax.md**](./syntax.md)
  Text formatting: ArkhamDB-style icons, keywords, traits, HTML, line breaks.

---
