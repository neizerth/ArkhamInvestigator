## Plurals

Different languages have different rules for plural forms.  
The app uses [i18next pluralization](https://www.i18next.com/translation-function/plurals).  
Make sure to include **all plural forms required for your language** and use the correct suffixes in your JSON keys.

### Supported languages and plural suffixes

Here’s a quick reference for all locales supported by the app:

- **en** — English → `_one`, `_other`  
- **de** — Deutsch → `_one`, `_other`  
- **es** — Español → `_one`, `_many`, `_other`  
- **fr** — Français → `_one`, `_many`, `_other` (note: `0` counts as `_one`)  
- **it** — Italiano → `_one`, `_many`, `_other`  
- **ko** — 한국어 → *(no plural, use base key without suffix)*  
- **pl** — Polski → `_one`, `_few`, `_many`, `_other`  
- **pt** — Português → `_one`, `_many`, `_other`  
- **ru** — Русский → `_one`, `_few`, `_many`, `_other`  
- **vi** — Tiếng Việt → *(no plural, use base key without suffix)*  
- **zh-cn** — 中文（Simplified, China Mainland） → *(no plural, use base key without suffix)*  
- **zh** — 中文（Traditional, generic） → *(no plural, use base key without suffix)*  

## Optional `_zero` form

By default, i18next decides which suffix to use for **0** based on the language rules  
(for example, in English `0 → other`, in French `0 → one`).  

If you want to override this behavior and provide a custom message for zero,  
you can add a `_zero` key. It is **optional** and works for any language.

### Example in English

```json
{
  "item_zero": "No items",
  "item_one": "{{count}} item",
  "item_other": "{{count}} items"
}
````

Results:

* 0 → `No items`
* 1 → `1 item`
* 2 → `2 items`

---

### How to check plural suffixes

If you are not sure which suffixes are required for your language, you can use this helper tool:  
👉 [Plural suffix checker](https://jsfiddle.net/6bpxsgd4)

1. Open the page and find the field **“Enter a language code:”**.  
2. Enter your locale code (for example: `de`).  
3. In the **“Suffixes”** section you will see the available plural forms.  
4. Enter different numbers in the test field — the program will show which suffix applies to that number.

This tool is useful for:
- confirming which suffixes exist for your language  
- understanding **which number triggers which suffix**  

---

### Examples

#### English (`en`)
Suffixes: `_one`, `_other`

```json
{
  "item_one": "{{count}} item",
  "item_other": "{{count}} items"
}
````

* 1 → `1 item`
* 2 → `2 items`
* 5 → `5 items`

---

#### Polish (`pl`)

Suffixes: `_one`, `_few`, `_many`, `_other`

```json
{
  "item_one": "{{count}} przedmiot",
  "item_few": "{{count}} przedmioty",
  "item_many": "{{count}} przedmiotów",
  "item_other": "{{count}} przedmiotów"
}
```

* 1 → `1 przedmiot`
* 2 → `2 przedmioty`
* 5 → `5 przedmiotów`
* 22 → `22 przedmioty`
* 25 → `25 przedmiotów`

---

#### Spanish, French, Italian, Portuguese (`es`, `fr`, `it`, `pt`)

Suffixes: `_one`, `_many`, `_other`

```json
{
  "item_one": "{{count}} elemento",
  "item_many": "{{count}} elementos",
  "item_other": "{{count}} elementos"
}
```

* 1 → `1 elemento` (`_one`)
* 0 → `0 elementos` (`_many`, except in French where `0` → `_one`)
* 2 → `2 elementos` (`_many`)
* 1.5 → `1.5 elementos` (`_other`)

---

#### Languages without plural forms (`ko`, `vi`, `zh-cn`, `zh`)

No suffix is needed — use a single base key.

```json
{
  "item": "{{count}} 항목"
}
```

* 0 → `0 항목`
* 1 → `1 항목`
* 2 → `2 항목`

---

### Quick tip

- Always match the suffixes exactly as required for your language.
- Use the [Plural suffix checker](https://jsfiddle.net/6bpxsgd4) to confirm both **which suffixes exist** and **which numbers map to them**.
