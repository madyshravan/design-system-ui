// SSR-safe: only register custom elements in the browser.
// Each import causes the Svelte compiler output to call customElements.define(...).
if (typeof window !== 'undefined' && 'customElements' in window) {
  void import('./lib/components/button/Button.svelte');
  void import('./lib/components/accordion/Accordion.svelte');
  void import('./lib/components/accordion-item/AccordionItem.svelte');
  void import('./lib/components/input/Input.svelte');
  void import('./lib/components/textarea/Textarea.svelte');
  void import('./lib/components/form-select/FormSelect.svelte');
}