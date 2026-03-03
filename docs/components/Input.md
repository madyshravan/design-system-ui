# Input — Usage

> **Keep in sync:** When you change `src/lib/components/input/Input.svelte`, update this document to match (props, slots, events, CSS variables, examples).

## Overview

`ui-input` is a single-line text input with design-system states: **Basic/Default** (purple border), **Active** (blue when focused), **Data** (grey border when filled), **Error** (red border + exclamation icon), **Success** (green border + checkmark icon), **Disabled** (grey + padlock icon), and **Search** variant (leading magnifying glass). It supports sizes (sm, md, lg) and common HTML input attributes. Use the `value` property for two-way binding and listen to `input` or `change` for updates.

## Custom element

- **Tag:** `ui-input`

## Props (attributes)

| Prop             | Type                               | Default   | Description |
|------------------|------------------------------------|-----------|-------------|
| `value`          | `string`                           | `""`      | Current value (set for two-way sync; use with `input`/`change` events). |
| `type`           | `string`                           | `"text"`  | Native input type (text, email, password, number, etc.). |
| `placeholder`    | `string`                           | `""`      | Placeholder text. |
| `name`           | `string`                           | —         | Form field name. |
| `id`             | `string`                           | —         | ID for labels. |
| `size`           | `"sm"` \| `"md"` \| `"lg"`         | `"md"`    | Visual size. |
| `variant`        | `"default"` \| `"search"`         | `"default"` | `default` = basic input; `search` = leading magnifying glass. |
| `validationState`| `"error"` \| `"success"` \| —      | —         | When `error`, red border + trailing exclamation icon; when `success`, green border + trailing checkmark. |
| `disabled`       | `boolean`                          | `false`   | Disables the input (shows trailing padlock icon). |
| `readonly`       | `boolean`                          | `false`   | Read-only (no editing). |
| `required`       | `boolean`                          | `false`   | Required for form validation. |
| `autocomplete`   | `string`                           | —         | Autocomplete hint. |
| `min`            | `string`                           | —         | Min value (number/date). |
| `max`            | `string`                           | —         | Max value (number/date). |
| `step`           | `string`                           | —         | Step for number inputs. |
| `maxlength`      | `number`                           | —         | Max length. |
| `minlength`      | `number`                           | —         | Min length. |
| `pattern`        | `string`                           | —         | Validation pattern. |
| `ariaLabel`      | `string`                           | —         | Accessible name. |
| `ariaDescribedby`| `string`                           | —         | ID of description element. |
| `oninput`        | `(detail: { value: string }) => void` | —       | Callback when value changes (Svelte 5; alternative to `input` event). |
| `onchange`       | `(detail: { value: string }) => void` | —       | Callback when value is committed (Svelte 5; alternative to `change` event). |

## Slots

None.

## Events

- **`input`** — Fired on user input. `event.detail.value` is the new value. You can also use the `oninput` callback prop (Svelte 5; `createEventDispatcher` is deprecated).
- **`change`** — Fired on blur/commit. `event.detail.value` is the new value. You can also use the `onchange` callback prop.

## CSS variables (design tokens)

Shared with other form controls where applicable:

- `--ui-input-padding-y`, `--ui-input-padding-x` — Default padding.
- `--ui-input-padding-y-sm`, `--ui-input-padding-x-sm` — Small size padding.
- `--ui-input-padding-y-lg`, `--ui-input-padding-x-lg` — Large size padding.
- `--ui-input-font-size`, `--ui-input-font-size-sm`, `--ui-input-font-size-lg` — Font sizes.
- `--ui-input-color` — Text color.
- `--ui-input-bg` — Background.
- `--ui-input-border-width` — Border width.
- `--ui-input-border-color-default` — Default (empty) border (e.g. purple).
- `--ui-input-border-color-data` — Border when field has value (data state).
- `--ui-input-focus-border-color`, `--ui-input-focus-ring` — Focus (active) state.
- `--ui-input-error-border-color`, `--ui-input-error-icon-color`, `--ui-input-error-ring` — Error state.
- `--ui-input-success-border-color`, `--ui-input-success-icon-color`, `--ui-input-success-ring` — Success state.
- `--ui-input-disabled-border-color`, `--ui-input-disabled-bg`, `--ui-input-disabled-color` — Disabled state.
- `--ui-input-search-icon-color` — Search variant leading icon color.
- `--ui-input-border-radius`, `--ui-input-border-radius-sm`, `--ui-input-border-radius-lg` — Radius.
- `--ui-input-box-shadow` — Inset shadow.
- `--ui-input-placeholder-color` — Placeholder color.

## Examples

**Basic**

```html
<label for="email">Email</label>
<ui-input id="email" type="email" placeholder="name@example.com" name="email"></ui-input>
```

**Sizes**

```html
<ui-input size="sm" placeholder="Small"></ui-input>
<ui-input size="md" placeholder="Default"></ui-input>
<ui-input size="lg" placeholder="Large"></ui-input>
```

**Password**

```html
<ui-input type="password" name="password" placeholder="Password"></ui-input>
```

**Disabled / Readonly**

```html
<ui-input disabled placeholder="Disabled"></ui-input>
<ui-input readonly value="Read only text"></ui-input>
```

**With value and events**

```html
<ui-input
  value={email}
  oninput={(e) => email = e.detail.value}
  placeholder="Email"
></ui-input>
```

**States (Basic, Active, Data, Error, Success, Disabled)**

```html
<!-- Basic/Default: purple border, placeholder -->
<ui-input placeholder="Placeholder"></ui-input>

<!-- Data: grey border when value present (set value and blur to see) -->
<ui-input value="Text" placeholder="Placeholder"></ui-input>

<!-- Error: red border + exclamation icon -->
<ui-input validationstate="error" value="Text" placeholder="Placeholder"></ui-input>

<!-- Success: green border + checkmark icon -->
<ui-input validationstate="success" value="Text" placeholder="Placeholder"></ui-input>

<!-- Disabled: grey border + padlock icon -->
<ui-input disabled value="Disabled" placeholder="Placeholder"></ui-input>
```

**Search variant (default and active)**

```html
<ui-input variant="search" placeholder="Search"></ui-input>
<ui-input variant="search" value="Keyword" placeholder="Search"></ui-input>
```
