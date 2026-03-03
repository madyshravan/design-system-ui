# Button — Usage

> **Keep in sync:** When you change `src/lib/components/button/Button.svelte`, update this document to match (props, slots, events, CSS variables, examples).

## Overview

`ui-button` is a button component with variants, sizes, optional loading state, and optional custom color. Content is provided via the default slot.

## Custom element

- **Tag:** `ui-button`

## Props (attributes)

| Prop              | Type        | Default | Description                                                                 |
| ----------------- | ----------- | ------- | --------------------------------------------------------------------------- |
| `variant`         | `"primary"` \| `"secondary"` \| `"danger"` \| `"success"` \| `"white"` \| `"outline"` \| `"ghost"` | `"primary"` | Button variant. |
| `size`            | `"sm"` \| `"md"` \| `"lg"` | `"md"` | Size.                                                                       |
| `disabled`        | `boolean`   | `false` | Disables the button and prevents click.                                     |
| `loading`         | `boolean`   | `false` | Shows a spinner and prevents click.                                        |
| `color`           | `string`    | —       | Overrides text color via `--ui-button-bg`.                                  |
| `type`            | `"button"` \| `"submit"` \| `"reset"` | `"button"` | Native button type.                          |
| `backgroundColor` | `string`    | —       | Overrides background color; e.g. `#10b981`.                                 |
| `fontSize`        | `string`    | —       | Overrides font size; e.g. `16px`, `1rem`.                                  |
| `borderRadius`    | `string`    | —       | Overrides border radius; e.g. `8px`, `999px`.                              |
| `borderWidth`     | `string`    | —       | Overrides border width; e.g. `2px` (useful with `outline` variant).        |
| `fontWeight`      | `string`    | —       | Overrides font weight; e.g. `600`, `bold`.                                 |
| `padding`         | `string`    | —       | Overrides padding; e.g. `12px 20px`.                                       |


## Slots


| Slot        | Description                            |
| ----------- | -------------------------------------- |
| *(default)* | Button label (text or inline content). |


## Events

- `**ui-click`** — Fired when the button is clicked (not when `disabled` or `loading`). The event `detail` is the native `MouseEvent`.
- `**click`** — Native click on the host; may also fire depending on shadow DOM. Clicks are ignored when `disabled` or `loading` is true.

## Usage in frameworks

`ui-button` is a custom element, so the same `ui-click` event works in any framework; only how you attach the listener differs.

**Svelte**

```svelte
<ui-button on:ui-click={() => alert('Clicked!')}>Click Me</ui-button>
```

**React**

```jsx
const buttonRef = useRef(null);
useEffect(() => {
  const el = buttonRef.current;
  if (!el) return;
  const handler = () => alert('Clicked!');
  el.addEventListener('ui-click', handler);
  return () => el.removeEventListener('ui-click', handler);
}, []);

return <ui-button ref={buttonRef}>Click Me</ui-button>;
```

**Angular**

```html
<ui-button #btn>Click Me</ui-button>
```

```ts
@ViewChild('btn') uiButton!: ElementRef<HTMLElement>;

ngAfterViewInit() {
  this.uiButton.nativeElement.addEventListener('ui-click', () => alert('Clicked!'));
}
```

Or with `(ui-click)` if your Angular version supports binding to custom events:

```html
<ui-button (ui-click)="onClick()">Click Me</ui-button>
```

## CSS variables (design tokens)

- `--ui-radius-md` — Border radius (default fallback: `10px`).
- `--ui-primary` — Primary background (default: `#474bff`).
- `--ui-primary-hover` — Primary hover background (default: `#2b2399`).
- `--ui-secondary` — Secondary background (default: `#222121`).
- `--ui-secondary-hover` — Secondary hover background.
- `--ui-danger` — Danger background (default: `#E03E52`).
- `--ui-danger-hover` — Danger hover background.
- `--ui-success` — Success background (default: `#22c55e`).
- `--ui-success-hover` — Success hover background.
- `--ui-outline` — Outline border/color (default: `#222121`).
- `--ui-outline-hover` — Outline hover state.
- `--ui-white` — White variant background (default: `#ffffff`).
- `--ui-white-hover` — White variant hover background.
- `--ui-text-on-light` — Text on light backgrounds (white variant).
- `--ui-border-light` — Border for white variant.
- `--ui-ghost-text` — Ghost variant text color (default: `#616061`).
- `--ui-ghost-text-hover` — Ghost variant hover text color.
- `--ui-ghost-hover` — Ghost variant hover background.
- `--ui-button-bg` — Overridden by the `color` prop when set (text color).
- `--ui-button-custom-bg` — Overridden by the `backgroundColor` prop when set.
- `--ui-button-custom-bg-hover` — Optional hover background when using custom `backgroundColor`.

## Examples

**Basic**

```html
<ui-button>Click Me</ui-button>
<ui-button variant="secondary">Secondary</ui-button>
<ui-button variant="danger" size="sm">Delete</ui-button>
<ui-button variant="success">Success</ui-button>
<ui-button variant="white">White</ui-button>
<ui-button variant="outline">Outline</ui-button>
<ui-button variant="ghost">Ghost</ui-button>
```

**With loading**

```html
<ui-button loading>Saving…</ui-button>
```

**Custom color**

```html
<ui-button color="#10b981">Custom green</ui-button>
<ui-button backgroundColor="#10b981">Custom background</ui-button>
```

**Custom size / shape**

```html
<ui-button fontSize="18px" borderRadius="12px">Larger, rounder</ui-button>
<ui-button borderRadius="999px">Pill shape</ui-button>
<ui-button variant="outline" borderWidth="2px">Thick outline</ui-button>
<ui-button padding="14px 28px" fontWeight="600">Custom padding and weight</ui-button>
```

**Submit**

```html
<ui-button type="submit">Submit</ui-button>
```

**Disabled**

```html
<ui-button disabled>Disabled</ui-button>
```

**Listening for click**

```html
<ui-button id="my-btn">Click Me</ui-button>
<script>
  document.getElementById("my-btn").addEventListener("ui-click", () => {
    console.log("Button clicked!");
  });
</script>
```

