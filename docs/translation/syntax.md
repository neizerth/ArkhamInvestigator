# ArkhamDB syntax support

Many texts in the app support the **formatting syntax used by ArkhamDB card texts**.  
If the English translation contains this syntax, you can (and should) use it in your translation as well.

## Supported formatting elements

### Icons and symbols
- `[resource]` → displays an icon with ID **resource**

You can find a list of icon IDs at [the icons page](https://neizerth.github.io/ArkhamDividerData/fonts/icons.html)

### Keywords and traits
- `[[Discipline]]` → formats a keyword (usually **bold italic**)  
- `[[Broken]]` → formats a trait or keyword  
- `[[Unbroken]]` → formats a trait or keyword  

### HTML formatting
- `<b>Bold</b>` → **bold text**  
- `<i>Italic</i>` → *italic text*  

### Special formatting

- `<old>Old Value</old>` → marks an old value (usually displayed semi-transparent)

### Line breaks and spacing
- `\n` → line break (converted to paragraph tags automatically)
- `&nbsp;` → non-breaking space (preserves spacing). **Note**: not all the keys support this feature

## Examples

### Basic icon usage
```
Spend 2 [resource] to automatically succeed the test?
```
*Displays: "Spend 2 💰 to automatically succeed the test?"*

### Keywords in abilities
```
flip a [[Broken]] Discipline you control to its [[Unbroken]] side.
```
*Displays: "flip a **Broken** Discipline you control to its **Unbroken** side."*

### Mixed formatting
```
{{name}} gets {{count}} actions [action] from {{fromName}}
```
*Displays: "Agnes gets 2 actions ⚡ from Roland"*

### Old value marking
```
This token has been canceled or ignored
<old>{{effect}}</old>
```
*Displays the effect text in a faded/transparent style*
