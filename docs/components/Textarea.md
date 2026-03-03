# Textarea — Usage

> **Keep in sync:** When you change `src/lib/components/textarea/Textarea.svelte`, update this document to match (props, slots, events, CSS variables, examples).

## Overview

`ui-textarea` is a multi-line text area styled like Bootstrap’s form control. It supports sizes (sm, md, lg), disabled/readonly, and common attributes. Use the `value` property and `input`/`change` events for two-way binding.

## Custom element

- **Tag:** `ui-textarea`

## Props (attributes)

| Prop              | Type                       | Default | Description |
|-------------------|----------------------------|--------|-------------|
| `value`           | `string`                   | `""`   | Current value. |
| `placeholder`     | `string`                   | `""`   | Placeholder text. |
| `name`            | `string`                   | —      | Form field name. |
| `id`              | `string`                   | —      | ID for labels. |
| `rows`            | `number`                   | `3`    | Number of visible rows. |
| `size`            | `"sm"` \| `"md"` \| `"lg"` | `"md"` | Visual size. |
| `disabled`        | `boolean`                  | `false`| Disables the textarea. |
| `readonly`        | `boolean`                  | `false`| Read-only. |
| `required`        | `boolean`                  | `false`| Required for validation. |
| `maxlength`       | `number`                   | —      | Max length. |
| `minlength`       | `number`                   | —      | Min length. |
| `ariaLabel`       | `string`                   | —      | Accessible name. |
| `ariaDescribedby` | `string`                   | —      | ID of description element. |
| `oninput`         | `(detail: { value: string }) => void` | — | Callback when value changes (Svelte 5; alternative to `input` event). |
| `onchange`        | `(detail: { value: string }) => void` | — | Callback when value is committed (Svelte 5; alternative to `change` event). |

## Slots

None.

## Events

- **`input`** — Fired on user input. `event.detail.value` is the new value. You can also use the `oninput` callback prop (Svelte 5; `createEventDispatcher` is deprecated).
- **`change`** — Fired on blur/commit. `event.detail.value` is the new value. You can also use the `onchange` callback prop.

## CSS variables (design tokens)

Uses the same input tokens as `ui-input` (e.g. `--ui-input-padding-y`, `--ui-input-border-color`, `--ui-input-focus-ring`, etc.). See [Input.md](Input.md#css-variables-design-tokens) for the full list.

## Examples

**Basic**

```html
<label for="msg">Message</label>
<ui-textarea id="msg" name="message" rows="4" placeholder="Your message..."></ui-textarea>
```

**Sizes**

```html
<ui-textarea size="sm" rows="2" placeholder="Small"></ui-textarea>
<ui-textarea size="lg" rows="5" placeholder="Large"></ui-textarea>
```

**Disabled / Readonly**

```html
<ui-textarea disabled placeholder="Disabled"></ui-textarea>
<ui-textarea readonly value="Read only content"></ui-textarea>
```

**With value and events**

```html
<ui-textarea
  value={message}
  oninput={(e) => message = e.detail.value}
  rows="4"
></ui-textarea>
```
