# README — Declensions

Some languages require different word forms depending on grammatical case and number.
Currently, **accusative** declension is supported.

---

## Supported locales

From the current set of languages:

* **pl** — *Polski* → ✅ requires accusative plural forms (e.g., *przerażenie / przerażenia / przerażeń*)
* **ru** — *Русский* → ✅ requires accusative plural forms (e.g., *ужас / ужаса / ужасов*)
* **uk**, **cs**, **sk**, **sr**, **hr**, **lt**, **lv** — not yet in the supported list, but would also require declensions if added in the future.

Other supported locales (English, German, Spanish, French, Italian, Korean, Portuguese, Vietnamese, Chinese Simplified/Traditional) **do not require accusative forms**, since pluralization is simpler and not case-dependent.

---

## Example: *Horror* in Polish (locale: `pl`)

```json
"plural.accusative.horror_one": "{{count}} przerażenie",
"plural.accusative.horror_few": "{{count}} przerażenia",
"plural.accusative.horror_many": "{{count}} przerażeń"
```

* 1 → `1 przerażenie`
* 3 → `3 przerażenia`
* 5 → `5 przerażeń`

---

## Example: *Damage* in Polish (locale: `pl`)

```json
"plural.accusative.damage_one": "{{count}} obrażenie",
"plural.accusative.damage_few": "{{count}} obrażenia",
"plural.accusative.damage_many": "{{count}} obrażeń"
```

* 1 → `1 obrażenie`
* 3 → `3 obrażenia`
* 5 → `5 obrażeń`

---

ℹ️ For detailed pluralization rules, see [./plurals.md](./plurals.md).

---