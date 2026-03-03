# Component usage docs

Each component has a usage document that describes its API, slots, events, CSS variables, and examples.

| Component       | Doc                    | Source file                    |
|----------------|------------------------|--------------------------------|
| Button         | [Button.md](components/Button.md) | `src/lib/components/button/Button.svelte` |
| Accordion      | [Accordion.md](components/Accordion.md) | `src/lib/components/accordion/Accordion.svelte` |
| AccordionItem  | [AccordionItem.md](components/AccordionItem.md) | `src/lib/components/accordion-item/AccordionItem.svelte` |
| Input          | [Input.md](components/Input.md) | `src/lib/components/input/Input.svelte` |
| Textarea       | [Textarea.md](components/Textarea.md) | `src/lib/components/textarea/Textarea.svelte` |
| FormSelect     | [FormSelect.md](components/FormSelect.md) | `src/lib/components/form-select/FormSelect.svelte` |

**Rule:** When you change any component in `src/lib/components/**/*.svelte`, update the corresponding usage document in `docs/components/<ComponentName>.md` so the docs stay in sync (see `.cursor/rules/component-docs.mdc`).
