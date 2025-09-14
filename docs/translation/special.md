
# Special Values for Conjunctions

These keys are used to join multiple values in rules, abilities, and card effects.

```json
"list.separator.two": " and ",
"list.separator.multiple": ", ",
"preposition.and": "and"
```

## Usage

### 1. `"list.separator.two"`

Used when exactly **two values** are joined in a list.

* Example:
  *Kohaku Narukami adds \[bless] and \[curse] to the chaos bag.*

### 2. `"list.separator.multiple"`

Used when joining **more than two values**.

* Example:
  *Add \[skull], \[cultist], and \[tablet] to the chaos bag.*
  → Here, all values except the last one are separated by `"list.separator.multiple"`.
  → The last two values are joined using `"list.separator.two"`.

### 3. `"preposition.and"`

Used for combining **two separate gains or effects**, not as part of a list.

* Example:
  *Stella Clark gains 1 resource and 1 action.*

## Notes

* Translators may need to adapt conjunctions depending on grammar rules of the target language.
* Lists of **two values** always use `"list.separator.two"`.
* Lists of **three or more values** use `"list.separator.multiple"` for the early elements, and `"list.separator.two"` between the last two.
