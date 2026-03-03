<svelte:options customElement="ui-accordion-item" />

<script lang="ts">
  import { onMount } from 'svelte';

  let rootEl: HTMLDivElement;
  /** Label for the trigger when not using slot="header". Use slot="header" for custom header markup. */
  let { title = 'Header' }: { title?: string } = $props();
  /** Synced from parent via attribute; use MutationObserver so we react to external changes. */
  let open = $state(false);
  let index = $state<string | null>(null);

  function getHost(): Element | null {
    return rootEl?.parentElement ?? null;
  }

  function updateFromHost() {
    const host = getHost();
    if (!host) return;
    open = host.hasAttribute('open');
    const idx = host.getAttribute('data-accordion-index');
    if (idx !== null) index = idx;
  }

  function handleTriggerClick() {
    const host = getHost();
    if (!host) return;
    host.dispatchEvent(
      new CustomEvent('accordion-toggle', { bubbles: true, composed: true })
    );
  }

  onMount(() => {
    updateFromHost();
    const host = getHost();
    if (!host) return;
    const observer = new MutationObserver(() => {
      updateFromHost();
    });
    observer.observe(host, { attributes: true, attributeFilter: ['open', 'data-accordion-index'] });
    return () => observer.disconnect();
  });
</script>

<div class="item" class:open bind:this={rootEl} data-accordion-item>
  <div
    class="trigger"
    role="button"
    tabindex="0"
    aria-expanded={open}
    aria-controls="accordion-panel-{index}"
    id="accordion-trigger-{index}"
    onkeydown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleTriggerClick();
      }
    }}
    onclick={handleTriggerClick}
  >
    <span class="trigger-inner">
      <slot name="header">{title}</slot>
      <span class="chevron" aria-hidden="true">▼</span>
    </span>
  </div>
  <div
    class="panel"
    class:open
    id="accordion-panel-{index}"
    role="region"
    aria-labelledby="accordion-trigger-{index}"
    aria-hidden={!open}
  >
    <div class="panel-inner">
      <slot name="content">
        <slot>Content</slot>
      </slot>
    </div>
  </div>
</div>

<style>
  .item {
    border-radius: var(--ui-radius-md, 10px);
    background: var(--ui-accordion-bg, #f5f5f5);
    border: 1px solid var(--ui-accordion-border, #e0e0e0);
    overflow: hidden;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .item:hover {
    background: var(--ui-accordion-bg-hover, #eeeeee);
  }

  .item.open {
    border-color: var(--ui-primary, #474bff);
    background: var(--ui-accordion-bg-open, #fafaff);
  }

  .trigger {
    cursor: pointer;
    user-select: none;
  }

  .trigger-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px;
    font-weight: 500;
    color: var(--ui-accordion-title, #1a1a1a);
    transition: color 0.2s ease;
  }

  .item.open .trigger-inner {
    color: var(--ui-primary, #474bff);
  }

  .trigger-inner ::slotted(*) {
    flex: 1;
    text-align: left;
  }

  .chevron {
    font-size: 0.7em;
    opacity: 0.7;
    transition: transform 0.25s ease;
    flex-shrink: 0;
    margin-left: 8px;
  }

  .item.open .chevron {
    transform: rotate(180deg);
  }

  .panel {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.25s ease-out;
  }

  .panel.open {
    grid-template-rows: 1fr;
  }

  .panel-inner {
    min-height: 0;
    overflow: hidden;
    padding: 0 18px 14px 18px;
    border-top: 1px solid var(--ui-accordion-border, #e0e0e0);
  }

  .panel-inner ::slotted(*) {
    color: var(--ui-accordion-content, #444);
    font-size: 14px;
    line-height: 1.5;
  }

  .panel-inner ::slotted(img),
  .panel-inner ::slotted(video),
  .panel-inner ::slotted(audio) {
    max-width: 100%;
    height: auto;
    display: block;
  }
</style>
