<svelte:options customElement="ui-accordion" />

<script lang="ts">
  /** Simple mode: array of title/content. When empty, use slotted ui-accordion-item children instead. */
  /** When true, multiple items can be open at once. Default false = only one open at a time. */
  let { items = [], allowMultiple = false }: {
    items?: Array<{ title: string; content: string }>;
    allowMultiple?: boolean;
  } = $props();

  let accordionRoot: HTMLDivElement;
  let slotEl: HTMLSlotElement | undefined;
  let useSlots = $state(false);

  /** Index of the open item (single mode). */
  let openIndex = $state<number | null>(null);
  /** Open indices when allowMultiple is true. */
  let openIndices = $state(new Set<number>());

  function toggle(index: number) {
    if (allowMultiple) {
      const next = new Set(openIndices);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      openIndices = next;
    } else {
      openIndex = openIndex === index ? null : index;
    }
    if (useSlots) syncSlottedItems();
  }

  function isOpen(index: number): boolean {
    if (allowMultiple) {
      return openIndices.has(index);
    }
    return openIndex === index;
  }

  function syncSlottedItems() {
    if (!slotEl) return;
    const nodes = slotEl.assignedElements();
    nodes.forEach((el, i) => {
      el.setAttribute('data-accordion-index', String(i));
      if (isOpen(i)) {
        el.setAttribute('open', '');
      } else {
        el.removeAttribute('open');
      }
    });
  }

  function handleSlotChange(e?: Event) {
    const slot = (e?.target as HTMLSlotElement) ?? slotEl;
    if (slot) slotEl = slot;
    const nodes = slot?.assignedElements() ?? [];
    useSlots = nodes.length > 0;
    if (useSlots) syncSlottedItems();
  }

  function handleAccordionToggle(e: CustomEvent) {
    const item = (e.target as Element)?.closest?.('ui-accordion-item');
    if (!item) return;
    const idx = item.getAttribute('data-accordion-index');
    if (idx === null) return;
    const index = parseInt(idx, 10);
    if (Number.isNaN(index)) return;
    toggle(index);
  }

  $effect(() => {
    openIndex;
    openIndices;
    if (useSlots) syncSlottedItems();
  });

  $effect(() => {
    if (accordionRoot) {
      slotEl = accordionRoot.querySelector('slot') as HTMLSlotElement;
      if (slotEl) handleSlotChange();
    }
  });
</script>

<div
  bind:this={accordionRoot}
  class="accordion"
  role="region"
  aria-label="Accordion"
  onaccordion-toggle={handleAccordionToggle}
>
  <slot
    onslotchange={(e) => handleSlotChange(e)}
    style={useSlots ? '' : 'display: none'}
  ></slot>
  {#if !useSlots}
    <!-- Simple mode: render from items prop -->
    {#each items as item, i}
      <div
        class="item"
        class:open={isOpen(i)}
        role="button"
        tabindex="0"
        aria-expanded={isOpen(i)}
        aria-controls="accordion-panel-{i}"
        id="accordion-trigger-{i}"
        onkeydown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle(i);
          }
        }}
        onclick={() => toggle(i)}
      >
        <span class="trigger">
          <span class="title">{item.title}</span>
          <span class="chevron" aria-hidden="true">▼</span>
        </span>
        <div
          class="panel"
          class:open={isOpen(i)}
          id="accordion-panel-{i}"
          role="region"
          aria-labelledby="accordion-trigger-{i}"
          aria-hidden={!isOpen(i)}
        >
          <div class="panel-inner">{item.content}</div>
        </div>
      </div>
    {/each}
  {/if}
</div>

<style>
  .accordion {
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 100%;
  }

  .accordion ::slotted(ui-accordion-item) {
    display: block;
  }

  /* Simple mode (items prop) styles */
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px;
    cursor: pointer;
    user-select: none;
    font-weight: 500;
    color: var(--ui-accordion-title, #1a1a1a);
    transition: color 0.2s ease;
  }

  .item.open .trigger {
    color: var(--ui-primary, #474bff);
  }

  .title {
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
    padding-top: 0;
    color: var(--ui-accordion-content, #444);
    font-size: 14px;
    line-height: 1.5;
    border-top: 1px solid var(--ui-accordion-border, #e0e0e0);
  }
</style>
