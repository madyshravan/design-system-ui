<svelte:options customElement="ui-textarea" />

<script lang="ts">
  export let value: string = "";
  export let placeholder: string = "";
  export let name: string | undefined = undefined;
  export let id: string | undefined = undefined;
  export let rows: number = 3;
  export let size: "sm" | "md" | "lg" = "md";
  export let disabled: boolean = false;
  export let readonly: boolean = false;
  export let required: boolean = false;
  export let maxlength: number | undefined = undefined;
  export let minlength: number | undefined = undefined;
  export let ariaLabel: string | undefined = undefined;
  export let ariaDescribedby: string | undefined = undefined;
  /** Callback when value changes on input (Svelte 5 replacement for deprecated createEventDispatcher). */
  export let oninput: ((detail: { value: string }) => void) | undefined = undefined;
  /** Callback when value is committed on change (Svelte 5 replacement for deprecated createEventDispatcher). */
  export let onchange: ((detail: { value: string }) => void) | undefined = undefined;

  function getHost(el: HTMLElement): Element | null {
    const root = el.getRootNode();
    return root instanceof ShadowRoot ? root.host : null;
  }

  function handleInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    value = target.value;
    const detail = { value };
    oninput?.(detail);
    const host = getHost(target);
    host?.dispatchEvent(new CustomEvent("input", { detail, bubbles: true }));
  }

  function handleChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    value = target.value;
    const detail = { value };
    onchange?.(detail);
    const host = getHost(target);
    host?.dispatchEvent(new CustomEvent("change", { detail, bubbles: true }));
  }
</script>

<textarea
  {value}
  {placeholder}
  {name}
  {id}
  {rows}
  {disabled}
  {readonly}
  {required}
  {maxlength}
  {minlength}
  class={size}
  aria-label={ariaLabel}
  aria-describedby={ariaDescribedby}
  oninput={handleInput}
  onchange={handleChange}
></textarea>

<style>
  textarea {
    display: block;
    width: 100%;
    padding: var(--ui-input-padding-y, 0.375rem) var(--ui-input-padding-x, 0.75rem);
    font-family: inherit;
    font-size: var(--ui-input-font-size, 1rem);
    font-weight: 400;
    line-height: 1.5;
    color: var(--ui-input-color, #212529);
    background-color: var(--ui-input-bg, #fff);
    border: var(--ui-input-border-width, 1px) solid var(--ui-input-border-color, #dee2e6);
    border-radius: var(--ui-input-border-radius, 0.375rem);
    box-shadow: var(--ui-input-box-shadow, inset 0 1px 2px rgba(0, 0, 0, 0.075));
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    box-sizing: border-box;
    resize: vertical;
    min-height: calc(1.5em + 0.75rem + 2px);
  }

  textarea::placeholder {
    color: var(--ui-input-placeholder-color, #6c757d);
  }

  textarea:hover:not(:disabled):not(:read-only) {
    border-color: var(--ui-input-hover-border-color, #adb5bd);
  }

  textarea:focus {
    outline: 0;
    border-color: var(--ui-input-focus-border-color, #86b7fe);
    box-shadow: 0 0 0 0.25rem var(--ui-input-focus-ring, rgba(13, 110, 253, 0.25));
  }

  textarea:disabled {
    background-color: var(--ui-input-disabled-bg, #e9ecef);
    color: var(--ui-input-disabled-color, #6c757d);
    cursor: not-allowed;
    opacity: 1;
  }

  textarea:read-only {
    background-color: var(--ui-input-bg, #fff);
  }

  /* Sizes */
  .sm {
    padding: var(--ui-input-padding-y-sm, 0.25rem) var(--ui-input-padding-x-sm, 0.5rem);
    font-size: var(--ui-input-font-size-sm, 0.875rem);
    border-radius: var(--ui-input-border-radius-sm, 0.25rem);
  }

  .md {
    padding: var(--ui-input-padding-y, 0.375rem) var(--ui-input-padding-x, 0.75rem);
    font-size: var(--ui-input-font-size, 1rem);
    border-radius: var(--ui-input-border-radius, 0.375rem);
  }

  .lg {
    padding: var(--ui-input-padding-y-lg, 0.5rem) var(--ui-input-padding-x-lg, 1rem);
    font-size: var(--ui-input-font-size-lg, 1.25rem);
    border-radius: var(--ui-input-border-radius-lg, 0.5rem);
  }
</style>
