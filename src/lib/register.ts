// SSR-safe: only register custom elements in the browser.
// Each import causes the Svelte compiler output to call customElements.define(...).
if (typeof window !== 'undefined' && 'customElements' in window) {
  void import('./components/button/Button.svelte');
  void import('./components/accordion/Accordion.svelte');
  void import('./components/accordion-item/AccordionItem.svelte');
  void import('./components/input/Input.svelte');
  void import('./components/textarea/Textarea.svelte');
  void import('./components/form-select/FormSelect.svelte');
}
