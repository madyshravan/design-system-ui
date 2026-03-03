<svelte:options customElement="ui-input" />

<script lang="ts">
  export let value: string = "";
  export let type: string = "text";
  export let placeholder: string = "";
  export let name: string | undefined = undefined;
  export let id: string | undefined = undefined;
  export let size: "sm" | "md" | "lg" = "md";
  export let disabled: boolean = false;
  export let readonly: boolean = false;
  export let required: boolean = false;
  /** Visual variant: default (basic) or search (with leading magnifying glass). */
  export let variant: "default" | "search" = "default";
  /** Validation state: error (red + exclamation) or success (green + checkmark). When set, overrides border/icon. */
  export let validationState: "error" | "success" | undefined = undefined;
  export let autocomplete: string | undefined = undefined;
  export let min: string | undefined = undefined;
  export let max: string | undefined = undefined;
  export let step: string | undefined = undefined;
  export let maxlength: number | undefined = undefined;
  export let minlength: number | undefined = undefined;
  export let pattern: string | undefined = undefined;
  export let ariaLabel: string | undefined = undefined;
  export let ariaDescribedby: string | undefined = undefined;
  /** Callback when value changes on input (Svelte 5 replacement for deprecated createEventDispatcher). */
  export let oninput: ((detail: { value: string }) => void) | undefined = undefined;
  /** Callback when value is committed on change (Svelte 5 replacement for deprecated createEventDispatcher). */
  export let onchange: ((detail: { value: string }) => void) | undefined = undefined;

  $: hasValue = value !== "";
  $: inputType = variant === "search" ? "search" : type;

  function getHost(el: HTMLElement): Element | null {
    const root = el.getRootNode();
    return root instanceof ShadowRoot ? root.host : null;
  }

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
    const detail = { value };
    oninput?.(detail);
    const host = getHost(target);
    host?.dispatchEvent(new CustomEvent("input", { detail, bubbles: true }));
  }

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
    const detail = { value };
    onchange?.(detail);
    const host = getHost(target);
    host?.dispatchEvent(new CustomEvent("change", { detail, bubbles: true }));
  }
</script>

<div
  class="input-wrapper {size} variant-{variant} {validationState ? `state-${validationState}` : ''} {hasValue ? 'has-value' : ''}"
  role="presentation"
>
  {#if variant === "search"}
    <span class="input-icon input-icon-leading" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
    </span>
  {/if}
  <input
    type={inputType}
    {value}
    {placeholder}
    {name}
    {id}
    {disabled}
    {readonly}
    {required}
    autocomplete={autocomplete as HTMLInputElement["autocomplete"]}
    {min}
    {max}
    {step}
    {maxlength}
    {minlength}
    {pattern}
    class="input-el {variant === 'search' ? 'has-leading-icon' : ''} {(validationState || disabled) ? 'has-trailing-icon' : ''}"
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedby}
    aria-invalid={validationState === "error" ? "true" : undefined}
    oninput={handleInput}
    onchange={handleChange}
  />
  {#if disabled}
    <span class="input-icon input-icon-trailing input-icon-disabled" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9973 4.5167C11.9184 2.37704 10.159 0.666656 8.00004 0.666656C5.7909 0.666656 4.00004 2.45752 4.00004 4.66666V6.66666H3.33337C2.2288 6.66666 1.33337 7.56209 1.33337 8.66666V13.3333C1.33337 14.4379 2.2288 15.3333 3.33337 15.3333H12.6667C13.7713 15.3333 14.6667 14.4379 14.6667 13.3333V8.66666C14.6667 7.56209 13.7713 6.66666 12.6667 6.66666H12V4.66666L11.9973 4.5167ZM11.3342 7.99999C11.3339 7.99999 11.3336 7.99999 11.3334 7.99999C11.3331 7.99999 11.3328 7.99999 11.3326 7.99999H4.66751C4.66724 7.99999 4.66698 7.99999 4.66671 7.99999C4.66644 7.99999 4.66617 7.99999 4.6659 7.99999H3.33337C2.96518 7.99999 2.66671 8.29847 2.66671 8.66666V13.3333C2.66671 13.7015 2.96518 14 3.33337 14H12.6667C13.0349 14 13.3334 13.7015 13.3334 13.3333V8.66666C13.3334 8.29847 13.0349 7.99999 12.6667 7.99999H11.3342ZM5.33337 6.66666H10.6667V4.66666C10.6667 3.1939 9.4728 1.99999 8.00004 1.99999C6.57191 1.99999 5.40599 3.12264 5.33664 4.53356L5.33337 4.66666V6.66666Z" fill="#BDBDBC"/>
</svg>
    </span>
  {:else if validationState === "error"}
    <span class="input-icon input-icon-trailing input-icon-error" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99996 0.666672C3.94987 0.666672 0.666626 3.94992 0.666626 8C0.666626 12.0501 3.94987 15.3333 7.99996 15.3333C12.05 15.3333 15.3333 12.0501 15.3333 8C15.3333 3.94992 12.05 0.666672 7.99996 0.666672ZM7.99996 2.00001C11.3137 2.00001 14 4.6863 14 8.00001C14 11.3137 11.3137 14 7.99996 14C4.68625 14 1.99996 11.3137 1.99996 8.00001C1.99996 4.6863 4.68625 2.00001 7.99996 2.00001ZM7.99996 4.66667C8.34185 4.66667 8.62363 4.92403 8.66214 5.25559L8.66663 5.33334V8.00001C8.66663 8.3682 8.36815 8.66667 7.99996 8.66667C7.65807 8.66667 7.37629 8.40931 7.33778 8.07775L7.33329 8.00001V5.33334C7.33329 4.96515 7.63177 4.66667 7.99996 4.66667ZM8.67329 10.6667C8.67329 10.2985 8.37482 10 8.00663 10L7.92221 10.0045C7.59065 10.043 7.33329 10.3248 7.33329 10.6667C7.33329 11.0349 7.63177 11.3333 7.99996 11.3333L8.08437 11.3289C8.41593 11.2903 8.67329 11.0086 8.67329 10.6667Z" fill="#E03E52"/>
</svg>
    </span>
  {:else if validationState === "success"}
    <span class="input-icon input-icon-trailing input-icon-success" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.8619 4.19526C13.1223 3.93491 13.5444 3.93491 13.8047 4.19526C14.0451 4.43558 14.0635 4.81374 13.8602 5.07527L13.8047 5.13807L6.4714 12.4714C6.23108 12.7117 5.85293 12.7302 5.5914 12.5269L5.5286 12.4714L2.19526 9.13807C1.93491 8.87772 1.93491 8.45561 2.19526 8.19526C2.43558 7.95494 2.81374 7.93645 3.07527 8.1398L3.13807 8.19526L6 11.0567L12.8619 4.19526Z" fill="#222121"/>
</svg>
    </span>
  {/if}
</div>

<style>
  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: var(--ui-input-border-radius, 8px);
    border: var(--ui-input-border-width, 1px) solid var(--ui-input-border-color-default, #7c3aed);
    background-color: var(--ui-input-bg, #feffff);
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    box-sizing: border-box;
  }

  /* Basic/Default: purple border when empty */
  .input-wrapper:not(.has-value):not(.state-error):not(.state-success) {
    border-color: var(--ui-input-border-color-default, #7c3aed);
  }

  /* Data: grey border when has value, not focused */
  .input-wrapper.has-value:not(.state-error):not(.state-success):focus-within {
    border-color: var(--ui-input-focus-border-color, #2563eb);
  }

  .input-wrapper.has-value:not(.state-error):not(.state-success):not(:focus-within) {
    border-color: var(--ui-input-border-color-data, #e0e0e0);
  }

  /* Active (focus): blue border */
  .input-wrapper:focus-within:not(.state-error):not(.state-success) {
    border-color: var(--ui-input-focus-border-color, #2563eb);
    box-shadow: 0 0 0 0.2rem var(--ui-input-focus-ring, rgba(37, 99, 235, 0.25));
  }

  /* Error state */
  .input-wrapper.state-error {
    border-color: var(--ui-input-error-border-color, #dc2626);
  }

  .input-wrapper.state-error:focus-within {
    box-shadow: 0 0 0 0.2rem var(--ui-input-error-ring, rgba(220, 38, 38, 0.25));
  }

  /* Success state */
  .input-wrapper.state-success {
    border-color: var(--ui-input-success-border-color, #16a34a);
  }

  .input-wrapper.state-success:focus-within {
    box-shadow: 0 0 0 0.2rem var(--ui-input-success-ring, rgba(22, 163, 74, 0.25));
  }

  /* Disabled: light grey border and bg */
  .input-el:disabled {
    background-color: var(--ui-input-disabled-bg, #e9ecef);
    color: var(--ui-input-disabled-color, #6c757d);
    cursor: not-allowed;
  }

  .input-wrapper:has(:disabled) {
    border-color: var(--ui-input-disabled-border-color, #dee2e6);
    background-color: var(--ui-input-disabled-bg, #e9ecef);
  }

  .input-el {
    display: block;
    flex: 1;
    min-width: 0;
    padding: var(--ui-input-padding-y, 13px) var(--ui-input-padding-x, 16px);
    font-family: inherit;
    font-size: var(--ui-input-font-size, 14px);
    line-height: 1.5;
    color: var(--ui-input-color, #222121);
    background: transparent;
    border: none;
    outline: 0;
    box-shadow: none;
    box-sizing: border-box;
  }

  .input-el::placeholder {
    color: var(--ui-input-placeholder-color, #bdbdbc);
  }

  .input-el.has-leading-icon {
    padding-left: 2.5rem !important;
  }

  .input-el.has-trailing-icon {
    padding-right: 2.5rem !important;
  }

  .input-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    color: var(--ui-input-icon-color, #6b7280);
  }

  .input-icon-leading {
    left: var(--ui-input-padding-x, 16px);
    color: var(--ui-input-search-icon-color, #6b7280);
  }

  .input-wrapper.variant-search:focus-within .input-icon-leading {
    color: var(--ui-input-focus-border-color, #2563eb);
  }

  .input-wrapper:has(:disabled) .input-icon-leading {
    color: var(--ui-input-disabled-color, #6c757d);
  }

  .input-icon-trailing {
    right: var(--ui-input-padding-x, 16px);
  }

  .input-icon-error {
    color: var(--ui-input-error-icon-color, #dc2626);
  }

  .input-icon-success {
    color: var(--ui-input-success-icon-color, #16a34a);
  }

  .input-icon-disabled {
    color: var(--ui-input-disabled-color, #6c757d);
  }

  /* Sizes */
  .input-wrapper.sm .input-el {
    padding: var(--ui-input-padding-y-sm, 0.25rem) var(--ui-input-padding-x-sm, 0.5rem);
    font-size: var(--ui-input-font-size-sm, 0.875rem);
  }

  .input-wrapper.sm {
    border-radius: var(--ui-input-border-radius-sm, 0.25rem);
  }

  .input-wrapper.sm .input-el.has-leading-icon {
    padding-left: 1.75rem;
  }

  .input-wrapper.sm .input-el.has-trailing-icon {
    padding-right: 1.75rem;
  }

  .input-wrapper.sm .input-icon-leading {
    left: 0.5rem;
  }

  .input-wrapper.sm .input-icon-trailing {
    right: 0.5rem;
  }

  .input-wrapper.md .input-el {
    padding: var(--ui-input-padding-y, 13px) var(--ui-input-padding-x, 16px);
    font-size: var(--ui-input-font-size, 14px);
  }

  .input-wrapper.md {
    border-radius: var(--ui-input-border-radius, 8px);
  }

  .input-wrapper.lg .input-el {
    padding: var(--ui-input-padding-y-lg, 0.5rem) var(--ui-input-padding-x-lg, 1rem);
    font-size: var(--ui-input-font-size-lg, 1.25rem);
  }

  .input-wrapper.lg {
    border-radius: var(--ui-input-border-radius-lg, 0.5rem);
  }

  .input-wrapper.lg .input-el.has-leading-icon {
    padding-left: 2.75rem;
  }

  .input-wrapper.lg .input-el.has-trailing-icon {
    padding-right: 2.75rem;
  }
</style>
