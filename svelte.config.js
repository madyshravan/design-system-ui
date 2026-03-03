import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    customElement: true,
    runes: false
  },
  kit: {
    adapter: adapter()
  }
};

export default config;
