# AccordionItem — Usage

> **Keep in sync:** When you change `src/lib/components/accordion-item/AccordionItem.svelte`, update this document to match (slots, attributes, events, CSS variables, examples).

## Overview

`ui-accordion-item` is a single accordion panel with a clickable header and a collapsible content area. It is designed to be used **inside** `ui-accordion`. The accordion controls which item is open via the `open` and `data-accordion-index` attributes it sets on each item.

You can use **named slots** (`header`, `content`) for full control, or **free-flow**: set the `title` attribute for the trigger and put any markup as direct children; that content is shown in the panel (no `slot="content"` needed).

## Custom element

- **Tag:** `ui-accordion-item`

## Attributes

| Attribute             | Description |
|-----------------------|-------------|
| `title`               | Label for the trigger when you are **not** using `slot="header"`. Default: `"Header"`. |
| `data-accordion-index`| Set by `ui-accordion`; zero-based index. Do not set yourself. |
| `open`                | Set by `ui-accordion` when this item is expanded. Do not set yourself. |

## Slots

| Slot      | Description |
|----------|-------------|
| `header` | Content for the clickable trigger (text, icon, image, MathML, etc.). If not used, the `title` attribute is shown. |
| `content`| Content for the expandable panel. If not used, the **default slot** (any child without a slot name) is shown in the panel — so you can free-flow content without naming slots. |

## Events

- **`accordion-toggle`** — Dispatched (bubbles, composed) when the header is clicked. `ui-accordion` listens and updates which item is open. You rarely need to listen to this.

## Keyboard

- **Enter** / **Space** on the trigger toggles the panel.

## CSS variables (design tokens)

Same as Accordion; items use:

- `--ui-radius-md`, `--ui-primary`, `--ui-accordion-bg`, `--ui-accordion-border`, `--ui-accordion-bg-hover`, `--ui-accordion-bg-open`, `--ui-accordion-title`, `--ui-accordion-content`.

Slotted `img`, `video`, and `audio` get `max-width: 100%` and `height: auto` so they don’t overflow.

## Examples

**Free-flow (no named slots)**

```html
<ui-accordion-item title="FAQ item">
  <p>Answer text here. Any markup goes in the panel.</p>
</ui-accordion-item>
```

**Named slots (header + content)**

```html
<ui-accordion-item>
  <span slot="header">FAQ item</span>
  <div slot="content">Answer text here.</div>
</ui-accordion-item>
```

**Image in header, video in content**

```html
<ui-accordion-item>
  <span slot="header">
    <img src="thumb.jpg" alt="Thumb" />
  </span>
  <div slot="content">
    <video controls src="clip.mp4"></video>
  </div>
</ui-accordion-item>
```

**MathML in content**

```html
<ui-accordion-item>
  <span slot="header">Formula</span>
  <div slot="content">
    <math xmlns="http://www.w3.org/1998/Math/MathML">
      <mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><msup><mi>y</mi><mn>2</mn></msup></mrow>
    </math>
  </div>
</ui-accordion-item>
```

**Always inside ui-accordion**

```html
<ui-accordion>
  <ui-accordion-item>
    <span slot="header">One</span>
    <div slot="content">Content one.</div>
  </ui-accordion-item>
  <ui-accordion-item>
    <span slot="header">Two</span>
    <div slot="content">Content two.</div>
  </ui-accordion-item>
</ui-accordion>
```

## Related

- **Accordion** — Parent component; see [Accordion.md](./Accordion.md).
