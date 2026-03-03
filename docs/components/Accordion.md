# Accordion — Usage

> **Keep in sync:** When you change `src/lib/components/accordion/Accordion.svelte`, update this document to match (props, slots, events, behavior, CSS variables, examples).

## Overview

`ui-accordion` is a container that coordinates one or more panels. By default only one panel is open at a time (opening one closes the others). It supports two modes:

1. **Simple mode** — Pass an `items` array of `{ title, content }` strings.
2. **Slotted mode** — Put `<ui-accordion-item>` children inside; use slots on each item for header and content (e.g. images, video, MathML).

## Custom element

- **Tag:** `ui-accordion`

## Props (attributes)

| Prop            | Type                                   | Default | Description |
|-----------------|----------------------------------------|--------|-------------|
| `items`         | `Array<{ title: string; content: string }>` | `[]`   | Simple mode: list of title/content. If the default slot has no children, this is used. |
| `allowMultiple` | `boolean`                              | `false`| If `true`, multiple panels can be open at once. |

## Slots

| Slot            | Description |
|-----------------|-------------|
| *(default)*     | Slotted mode: place `<ui-accordion-item>` elements here. If any are present, `items` is ignored. |

## Events

- **`accordion-toggle`** — Fired by a child `ui-accordion-item` when its header is clicked (bubbles). The accordion uses it to update which item is open. You typically do not listen to this; use slotted content or `items` instead.

## Behavior

- **Single open (default):** Opening one item closes the currently open item.
- **Multiple open:** Set `allowMultiple` to allow several items to be open.
- **Index sync:** In slotted mode, the accordion sets `data-accordion-index` and `open` on each `ui-accordion-item`.

## CSS variables (design tokens)

- `--ui-radius-md` — Item border radius (default: `10px`).
- `--ui-primary` — Border/trigger color when item is open (default: `#474bff`).
- `--ui-accordion-bg` — Item background (default: `#f5f5f5`).
- `--ui-accordion-border` — Item border (default: `#e0e0e0`).
- `--ui-accordion-bg-hover` — Item hover background (default: `#eeeeee`).
- `--ui-accordion-bg-open` — Item background when open (default: `#fafaff`).
- `--ui-accordion-title` — Trigger text color (default: `#1a1a1a`).
- `--ui-accordion-content` — Panel text color (default: `#444`).

## Examples

**Simple mode (items prop)**

```html
<ui-accordion items='[{"title":"Section 1","content":"First panel content."},{"title":"Section 2","content":"Second panel."}]'></ui-accordion>
```

In Svelte/JS (items as data):

```svelte
<script>
  const faqs = [
    { title: 'What is this?', content: 'This is the first section.' },
    { title: 'How does it work?', content: 'Only one section stays open at a time.' }
  ];
</script>
<ui-accordion items={faqs} />
```

**Slotted mode (rich content)**

Use `<ui-accordion-item>` with `slot="header"` and `slot="content"` for images, video, audio, MathML, or any HTML:

```html
<ui-accordion>
  <ui-accordion-item>
    <span slot="header">Section with image</span>
    <div slot="content">
      <img src="photo.jpg" alt="Photo" />
    </div>
  </ui-accordion-item>
  <ui-accordion-item>
    <span slot="header">Video</span>
    <div slot="content">
      <video controls src="demo.mp4"></video>
    </div>
  </ui-accordion-item>
</ui-accordion>
```

**Multiple panels open**

```html
<ui-accordion allowMultiple>
  <!-- items or ui-accordion-item children -->
</ui-accordion>
```

## Related

- **AccordionItem** — Used inside `ui-accordion` for slotted mode. See [AccordionItem.md](./AccordionItem.md).
