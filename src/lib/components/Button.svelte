<svelte:options customElement="ui-button" />

<script lang="ts">
  export let variant: "primary" | "secondary" | "danger" = "primary";
  export let size: "sm" | "md" | "lg" = "md";
  export let disabled: boolean = false;
  export let loading: boolean = false;
  export let color: string | undefined = undefined;
  export let type: "button" | "submit" | "reset" = "button";

  function handleClick(this: HTMLElement, event: MouseEvent) {
    if (disabled || loading) return;

    const customEvent = new CustomEvent("ui-click", {
      detail: { originalEvent: event },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(customEvent);
  }
</script>

<button
  {type}
  class={`${variant} ${size}`}
  {disabled}
  style={color ? `--ui-button-bg:${color}` : undefined}
  onclick={handleClick}
>
  {#if loading}
    <span class="spinner"></span>
  {/if}
  <slot />
</button>

<style>
  button {
    border: none;
    border-radius: var(--ui-radius-md, 6px);
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  /* Sizes */
  .sm {
    padding: 6px 12px;
    font-size: 12px;
  }

  .md {
    padding: 10px 16px;
    font-size: 14px;
  }

  .lg {
    padding: 14px 20px;
    font-size: 16px;
  }

  /* Variants */
  .primary {
    background: var(--ui-primary, #6366f1);
    color: white;
  }

  .secondary {
    background: var(--ui-secondary, #0ea5e9);
    color: white;
  }

  .danger {
    background: var(--ui-danger, #ef4444);
    color: white;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .spinner {
    width: 14px;
    height: 14px;
    border: 2px solid white;
    border-top-color: transparent;
    border-radius: 50%;
    display: inline-block;
    margin-right: 6px;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
