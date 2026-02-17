import Button from './lib/components/Button.svelte';

// Explicitly register the custom element
if (!customElements.get('ui-button')) {
  customElements.define('ui-button', Button as unknown as CustomElementConstructor);
}

// Prevent tree-shaking
export {};
