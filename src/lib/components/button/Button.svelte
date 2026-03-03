<svelte:options customElement="ui-button" />

<script lang="ts">
  export let variant: "primary" | "secondary" | "danger" | "success" | "white" | "outline" | "ghost" = "primary";
  export let size: "sm" | "md" | "lg" = "md";
  export let disabled: boolean = false;
  export let loading: boolean = false;
  export let color: string | undefined = undefined;
  export let type: "button" | "submit" | "reset" = "button";
  /** Override background (and text contrast) for variant; e.g. "#10b981" */
  export let backgroundColor: string | undefined = undefined;
  /** Override font size; e.g. "16px", "1rem" */
  export let fontSize: string | undefined = undefined;
  /** Override border radius; e.g. "8px", "999px" */
  export let borderRadius: string | undefined = undefined;
  /** Override border width; e.g. "2px" (useful with outline variant) */
  export let borderWidth: string | undefined = undefined;
  /** Override font weight; e.g. "600", "bold" */
  export let fontWeight: string | undefined = undefined;
  /** Override padding; e.g. "12px 20px" */
  export let padding: string | undefined = undefined;

  $: styleParts = [
    color != null && `--ui-button-bg:${color}`,
    backgroundColor != null && `--ui-button-custom-bg:${backgroundColor}`,
    fontSize != null && `font-size:${fontSize}`,
    borderRadius != null && `border-radius:${borderRadius}`,
    borderWidth != null && `border-width:${borderWidth}`,
    fontWeight != null && `font-weight:${fontWeight}`,
    padding != null && `padding:${padding}`,
  ].filter(Boolean);
  $: buttonStyle = styleParts.length > 0 ? styleParts.join("; ") : undefined;

  function handleClick(event: MouseEvent) {
    if (disabled || loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
</script>

<button
  {type}
  class={`${variant} ${size}`}
  {disabled}
  style={buttonStyle}
  on:click={handleClick}
>
  {#if loading}
    <span class="spinner"></span>
  {/if}
  <slot />
</button>

<style>
  button {
    border: none;
    border-radius: var(--ui-radius-md, 10px);
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
    padding: 10px 24px;
    font-size: 14px;
  }

  .lg {
    padding: 14px 32px;
    font-size: 16px;
  }

  /* Variants — respect --ui-button-custom-bg when set via backgroundColor prop */
  .primary {
    background: var(--ui-button-custom-bg, var(--ui-primary, #474bff));
    color: var(--ui-button-bg, #fefeff);
  }

  .primary:hover {
    background: var(--ui-button-custom-bg-hover, var(--ui-primary-hover, #2b2399));
    color: #fefeff;
  }

  .secondary {
    background: var(--ui-button-custom-bg, var(--ui-secondary, #222121));
    color: #fefeff;
  }

  .secondary:hover {
    background: var(--ui-button-custom-bg-hover, var(--ui-secondary-hover, #616061));
    color: #fefeff;
  }

  .outline {
    background: var(--ui-outline, transparent);
    border: 1px solid var(--ui-outline, #222121);
    color: #616061;
  }

  .outline:hover {
    background: var(--ui-outline-hover, transparent);
    border: 1px solid var(--ui-outline, #222121);
    color: #222121;
  }

  .danger {
    background: var(--ui-button-custom-bg, var(--ui-danger, #E03E52));
    color: #fefeff;
  }

  .danger:hover {
    background: var(--ui-button-custom-bg-hover, var(--ui-danger-hover, #c23445));
    color: #fefeff;
  }

  .success {
    background: var(--ui-button-custom-bg, var(--ui-success, #2CC84D));
    color: #fefeff;
  }

  .success:hover {
    background: var(--ui-button-custom-bg-hover, var(--ui-success-hover, #2CC84D));
    color: #fefeff;
  }

  .white {
    background: var(--ui-button-custom-bg, var(--ui-white, #ffffff));
    color: var(--ui-text-on-light, #222121);
    border: 1px solid var(--ui-border-light, #e0e0e0);
  }

  .white:hover {
    background: var(--ui-button-custom-bg-hover, var(--ui-white-hover, #f5f5f5));
    color: var(--ui-text-on-light, #222121);
    border-color: var(--ui-border-light-hover, #c0c0c0);
  }

  .ghost {
    background: transparent;
    color: var(--ui-ghost-text, #616061);
  }

  .ghost:hover {
    background: var(--ui-ghost-hover, rgba(0, 0, 0, 0.06));
    color: var(--ui-ghost-text-hover, #222121);
  }

  button:disabled {
    background: #E0E0E0;
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