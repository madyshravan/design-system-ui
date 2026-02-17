# Svelte library

Everything you need to build a Svelte library, powered by [`sv`](https://npmjs.com/package/sv).

Read more about creating a library [in the docs](https://svelte.dev/docs/kit/packaging).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv create --template library --types ts --no-install design-system-ui
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Everything inside `src/lib` is part of your library, everything inside `src/routes` can be used as a showcase or preview app.

## Building

To build your library:

```sh
npm pack
```

To create a production version of your showcase app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Publishing

Go into the `package.json` and give your package the desired name through the `"name"` option. Also consider adding a `"license"` field and point it to a `LICENSE` file which you can create from a template (one popular option is the [MIT license](https://opensource.org/license/mit/)).

To publish your library to [npm](https://www.npmjs.com):

```sh
npm publish
```


# Design System UI

A reusable Design System built using **Svelte 5 + Web Components**, packaged for use in:

* Plain HTML
* SvelteKit
* React
* Angular
* Vue
* Any browser-based framework

This package provides framework-independent UI components such as:

```
<ui-button></ui-button>
```

---

# Architecture Overview

The design system is built using:

* Svelte 5
* Web Components (customElements)
* Vite
* SvelteKit (library mode)

Outputs:

```
dist/               → Library build (types, Svelte exports)
dist-browser/      → Browser bundle (registers custom elements)
```

The browser bundle is the main runtime entry.

---

# Project Structure

```
design-system-ui/

src/
  lib/
    components/
      Button.svelte
    index.ts

  register.ts              ← SSR-safe registration entry

vite.config.ts             ← library build config
vite.browser.config.ts     ← browser bundle config

package.json


dist/
dist-browser/
```

---

# Component Example

Button component:

```
<ui-button variant="primary">
  Click Me
</ui-button>
```

Supports:

* variants
* sizes
* disabled
* loading
* custom color
* click events

---

# Build Commands

## Build library

```
npm run build
```

Output:

```
dist/
```

## Build browser bundle

```
npm run build:browser
```

Output:

```
dist-browser/bundle.js
```

---

# Local npm Packaging

Create installable package:

```
npm pack
```

Produces:

```
design-system-ui-0.0.1.tgz
```

Install in another project:

```
npm install ../design-system-ui/design-system-ui-0.0.1.tgz
```

---

# Usage — Plain HTML

```
<script type="module">
  import 'design-system-ui';
</script>

<ui-button variant="primary">
  Click Me
</ui-button>
```

Optional click event:

```
document.querySelector('ui-button')
  .addEventListener('ui-click', () => alert('Clicked'));
```

Run using local server:

```
npx serve .
```

---

# Usage — SvelteKit

## Step 1 — Install

```
npm install design-system-ui
```

(or local .tgz file)

## Step 2 — Register globally

File:

```
src/routes/+layout.svelte
```

```
<script>
  import 'design-system-ui';
</script>

<slot />
```

## Step 3 — Use component

```
<ui-button variant="primary">
  Click Me
</ui-button>
```

---

# Usage — React / Angular / Other Frameworks

Register once in entry file:

```
import 'design-system-ui';
```

Use component:

```
<ui-button>Click</ui-button>
```

---

# SSR-safe Registration

File:

```
src/register.ts
```

```
if (typeof window !== 'undefined' && 'customElements' in window) {
  import('./lib/components/Button.svelte');
}
```

Prevents server-side rendering errors.

---

# package.json (important fields)

```
{
  "main": "./dist-browser/bundle.js",
  "types": "./dist/index.d.ts",

  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist-browser/bundle.js"
    }
  },

  "files": [
    "dist",
    "dist-browser"
  ]
}
```

Ensures correct runtime entry.

---

# Development

Run dev server:

```
npm run dev
```

Build everything:

```
npm run build
npm run build:browser
```

---

# How It Works

When imported:

```
import 'design-system-ui'
```

The browser bundle executes:

```
customElements.define('ui-button', ...)
```

Registers the component globally.

---

# Supported Environments

Works in:

* Plain HTML
* SvelteKit
* React
* Angular
* Vue
* Any browser-based framework

---

# Next Steps

Add more components:

* Input
* Card
* Modal
* Select

Optional:

* Storybook
* Private npm publish
* Design tokens

---

# Summary

This design system:

* Uses Web Components
* Framework independent
* npm installable
* SSR-safe
* Production ready foundation

---

End of README
