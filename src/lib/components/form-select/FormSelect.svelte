<svelte:options customElement="ui-form-select" />

<script lang="ts">
  export let value: string = "";
  export let name: string | undefined = undefined;
  export let id: string | undefined = undefined;
  export let size: "sm" | "md" | "lg" = "md";
  export let disabled: boolean = false;
  export let required: boolean = false;
  export let multiple: boolean = false;
  export let selectSize: number | undefined = undefined;
  export let ariaLabel: string | undefined = undefined;
  export let ariaDescribedby: string | undefined = undefined;
  /** Callback when selection changes (Svelte 5 replacement for deprecated createEventDispatcher). */
  export let onchange: ((detail: { value: string }) => void) | undefined = undefined;

  function getHost(el: HTMLElement): Element | null {
    const root = el.getRootNode();
    return root instanceof ShadowRoot ? root.host : null;
  }

  function handleChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    value = target.value;
    const detail = { value };
    onchange?.(detail);
    const host = getHost(target);
    host?.dispatchEvent(new CustomEvent("change", { detail, bubbles: true }));
  }
</script>

<select
  {name}
  {id}
  {disabled}
  {required}
  {multiple}
  size={selectSize}
  class={size}
  aria-label={ariaLabel}
  aria-describedby={ariaDescribedby}
  onchange={handleChange}
  {value}
>
  <slot />
</select>

<style>
  select {
    display: block;
    width: 100%;
    padding: var(--ui-select-padding-y, 0.375rem) var(--ui-select-indicator-padding, 2.25rem) var(--ui-select-padding-y, 0.375rem) var(--ui-select-padding-x, 0.75rem);
    font-family: inherit;
    font-size: var(--ui-select-font-size, 1rem);
    font-weight: 400;
    line-height: 1.5;
    color: var(--ui-input-color, #212529);
    background-color: var(--ui-input-bg, #fff);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 16px 12px;
    border: var(--ui-input-border-width, 1px) solid var(--ui-input-border-color, #dee2e6);
    border-radius: var(--ui-input-border-radius, 0.375rem);
    box-shadow: var(--ui-input-box-shadow, inset 0 1px 2px rgba(0, 0, 0, 0.075));
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    box-sizing: border-box;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  select:hover:not(:disabled) {
    border-color: var(--ui-input-hover-border-color, #adb5bd);
  }

  select:focus {
    outline: 0;
    border-color: var(--ui-input-focus-border-color, #86b7fe);
    box-shadow: 0 0 0 0.25rem var(--ui-input-focus-ring, rgba(13, 110, 253, 0.25));
  }

  select:disabled {
    background-color: var(--ui-input-disabled-bg, #e9ecef);
    color: var(--ui-input-disabled-color, #6c757d);
    cursor: not-allowed;
    opacity: 1;
  }

  /* Sizes */
  .sm {
    padding: var(--ui-select-padding-y-sm, 0.25rem) var(--ui-select-indicator-padding, 2rem) var(--ui-select-padding-y-sm, 0.25rem) var(--ui-select-padding-x-sm, 0.5rem);
    font-size: var(--ui-input-font-size-sm, 0.875rem);
    border-radius: var(--ui-input-border-radius-sm, 0.25rem);
  }

  .md {
    padding: var(--ui-select-padding-y, 0.375rem) var(--ui-select-indicator-padding, 2.25rem) var(--ui-select-padding-y, 0.375rem) var(--ui-select-padding-x, 0.75rem);
    font-size: var(--ui-select-font-size, 1rem);
    border-radius: var(--ui-input-border-radius, 0.375rem);
  }

  .lg {
    padding: var(--ui-select-padding-y-lg, 0.5rem) var(--ui-select-indicator-padding, 2.5rem) var(--ui-select-padding-y-lg, 0.5rem) var(--ui-select-padding-x-lg, 1rem);
    font-size: var(--ui-input-font-size-lg, 1.25rem);
    border-radius: var(--ui-input-border-radius-lg, 0.5rem);
  }
</style>
