# FormSelect — Usage

> **Keep in sync:** When you change `src/lib/components/form-select/FormSelect.svelte`, update this document to match (props, slots, events, CSS variables, examples).

## Overview

`ui-form-select` is a native `<select>` styled like Bootstrap’s form select. Options are provided via the default slot as `<option>` elements. It supports sizes (sm, md, lg), disabled, required, and multiple/size attributes.

## Custom element

- **Tag:** `ui-form-select`

## Props (attributes)

| Prop              | Type                       | Default | Description |
|-------------------|----------------------------|--------|-------------|
| `value`           | `string`                   | `""`   | Selected value (use with `change` for two-way sync). |
| `name`            | `string`                   | —      | Form field name. |
| `id`              | `string`                   | —      | ID for labels. |
| `size`            | `"sm"` \| `"md"` \| `"lg"` | `"md"` | Visual size. |
| `disabled`        | `boolean`                  | `false`| Disables the select. |
| `required`        | `boolean`                  | `false`| Required for validation. |
| `multiple`        | `boolean`                  | `false`| Allow multiple selection. |
| `selectSize`      | `number`                   | —      | Number of visible rows (for multi or list). |
| `ariaLabel`       | `string`                   | —      | Accessible name. |
| `ariaDescribedby` | `string`                   | —      | ID of description element. |
| `onchange`        | `(detail: { value: string }) => void` | — | Callback when selection changes (Svelte 5; alternative to `change` event). |

## Slots

| Slot        | Description |
|-------------|-------------|
| *(default)* | `<option>` elements. Include `<option value="">Placeholder</option>` if needed. |

## Events

- **`change`** — Fired when selection changes. `event.detail.value` is the new value (first selected in multi). You can also use the `onchange` callback prop (Svelte 5; `createEventDispatcher` is deprecated).

## CSS variables (design tokens)

Uses the same input tokens as `ui-input` for border, focus, disabled, etc. Select-specific:

- `--ui-select-padding-y`, `--ui-select-padding-x` — Padding.
- `--ui-select-padding-y-sm`, `--ui-select-padding-x-sm` — Small size.
- `--ui-select-padding-y-lg`, `--ui-select-padding-x-lg` — Large size.
- `--ui-select-indicator-padding` — Right padding for dropdown arrow.
- `--ui-select-font-size` — Font size.

## Examples

**Basic**

```html
<label for="choice">Choose one</label>
<ui-form-select id="choice" name="choice" aria-label="Choose option">
  <option value="">Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</ui-form-select>
```

**Sizes**

```html
<ui-form-select size="sm">
  <option value="">Small</option>
  <option value="a">A</option>
</ui-form-select>
<ui-form-select size="lg">
  <option value="">Large</option>
  <option value="a">A</option>
</ui-form-select>
```

**Disabled**

```html
<ui-form-select disabled>
  <option value="">Disabled select</option>
</ui-form-select>
```

**With value and change event**

```html
<ui-form-select
  value={selected}
  onchange={(e) => selected = e.detail.value}
  aria-label="Choose option"
>
  <option value="">Select...</option>
  <option value="yes">Yes</option>
  <option value="no">No</option>
</ui-form-select>
```

**Multiple**

```html
<ui-form-select multiple selectSize="3" aria-label="Multiple select">
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</ui-form-select>
```
