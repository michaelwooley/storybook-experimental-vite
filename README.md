# storybook-experimental-vite

- **Goal:** Easy storybook setup for sveltekit apps.
- **What should make this work now?** Use `vite.config.js` instead of specifying vite config as part of `svelte.config.js` (https://github.com/sveltejs/kit/issues/5184).

What works, what doesn't, and what hasn't been attempted:

- 🟢 Basic storybook init/demo stories. (Requires minor tweaks to filenames.)
- 🟢 Typescript (components and stories)
- 🟡 Aliased imports. E.g. `$app/stores`. _Once the aliases are added,_ then some of these will work.
  - 🟢 `$app/env` Variables _are_ set. Notable because they make use of `import.meta.env`.
  - 🟢 `$app/paths` Can be imported but these are unset. (Need to call `set_paths` fn.)
  - 🔴 `$app/navigation`. Closely linked to app state. I think it makes sense that these don't work. Nothing has been done to initialize them. Quick check uncommenting [some lines in `Header.svelte`](https://github.com/michaelwooley/storybook-experimental-vite/blob/a4abb8ca37b70f861ef5cb6e524a60811b6dc4fe/src/lib/header/Header.svelte#L5-L13). Probably need to pursue some version of a [mocking strategy](https://github.com/storybookjs/storybook/issues/14952#issuecomment-1023188255).
  - 🔴 `$app/stores` Similar story. `$app/stores` will import okay but it will throw an error if you try to fetch the store values. This lack of functionality can actually help devs to be deliberate about application state.
- ❓ Tailwind, etc. (I don't think this should be much of a problem.)
- 🟢 Stories that are `*.stories.svelte` files (via `@storybook/addon-svelte-csf`). This appears to work just fine. I did swap out these stories for less-fancy stories just to see if this package was introducing any additional complications/limitations. (Related: https://github.com/storybookjs/storybook/issues/14952#issuecomment-862043558)

Open questions:

- Vite 3 support? Is it important? Do we need to pin to vite 2 for now? (https://github.com/storybookjs/builder-vite/pull/394)
- Importance of adapters? I don't think that adapters matter at all for what shows up in the `.svelte-kit/runtime` dir, right? Only the contents of the `.svelte-kit/build` dir are affected?

# Quick start

To try to run storybook with the current repo:

```bash
git clone git@github.com:michaelwooley/storybook-experimental-vite.git
cd storybook-experimental-vite
npm i
npm run storybook
```

See below for steps taken to create repo from scratch.


# Init steps

## Project init

```bash
npm create svelte@latest storybook-experimental-vite
cd storybook-experimental-vite
npm i
git init && git add -A && git commit -m "Initial commit"
```

Creation option choices:

- _Which Svelte app template?_ › SvelteKit demo app
- _Add type checking with TypeScript?_ Yes, using TypeScript syntax
- _Add ESLint for code linting?_ … Yes
- _Add Prettier for code formatting?_ … Yes
- _Add Playwright for browser testing?_ … Yes

```bash
❯ npm create svelte@latest storybook-experimental-vite
Need to install the following packages:
  create-svelte@latest
Ok to proceed? (y) y

create-svelte version 2.0.0-next.144

Welcome to SvelteKit!

This is beta software; expect bugs and missing features.

Problems? Open an issue on https://github.com/sveltejs/kit/issues if none exists already.

✔ Which Svelte app template? › SvelteKit demo app
✔ Add type checking with TypeScript? › Yes, using TypeScript syntax
✔ Add ESLint for code linting? … No / Yes
✔ Add Prettier for code formatting? … No / Yes
✔ Add Playwright for browser testing? … No / Yes

Your project is ready!
✔ Typescript
  Inside Svelte components, use <script lang="ts">
✔ ESLint
  https://github.com/sveltejs/eslint-plugin-svelte3
✔ Prettier
  https://prettier.io/docs/en/options.html
  https://github.com/sveltejs/prettier-plugin-svelte#options
✔ Playwright
  https://playwright.dev

Install community-maintained integrations:
  https://github.com/svelte-add/svelte-adders

Next steps:
  1: cd storybook-experimental-vite
  2: npm install (or pnpm install, etc)
  3: git init && git add -A && git commit -m "Initial commit" (optional)
  4: npm run dev -- --open

To close the dev server, hit Ctrl-C

Stuck? Visit us at https://svelte.dev/chat

❯ cd storybook-experimental-vite
❯ npm i

> storybook-experimental-vite@0.0.1 prepare
> svelte-kit sync


added 240 packages, and audited 241 packages in 32s

33 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
❯ git init && git add -A && git commit -m "Initial commit"
Initialized empty Git repository in /home/michael/Documents/misc/storybook-experimental-vite/.git/
[main (root-commit) be74196] Initial commit
 31 files changed, 6448 insertions(+)
 create mode 100644 .eslintignore
 create mode 100644 .eslintrc.cjs
 create mode 100644 .gitignore
 create mode 100644 .npmrc
 create mode 100644 .prettierignore
 create mode 100644 .prettierrc
 create mode 100644 README.md
 create mode 100644 package-lock.json
 create mode 100644 package.json
 create mode 100644 playwright.config.ts
 create mode 100644 src/app.css
 create mode 100644 src/app.d.ts
 create mode 100644 src/app.html
 create mode 100644 src/hooks.ts
 create mode 100644 src/lib/Counter.svelte
 create mode 100644 src/lib/form.ts
 create mode 100644 src/lib/header/Header.svelte
 create mode 100644 src/lib/header/svelte-logo.svg
 create mode 100644 src/routes/__layout.svelte
 create mode 100644 src/routes/about.svelte
 create mode 100644 src/routes/index.svelte
 create mode 100644 src/routes/todos/_api.ts
 create mode 100644 src/routes/todos/index.svelte
 create mode 100644 src/routes/todos/index.ts
 create mode 100644 static/favicon.png
 create mode 100644 static/robots.txt
 create mode 100644 static/svelte-welcome.png
 create mode 100644 static/svelte-welcome.webp
 create mode 100644 svelte.config.js
 create mode 100644 tests/test.ts
 create mode 100644 tsconfig.json
```

## Add storybook

```bash
npx sb@next init
```

## Vite 3?

Using Vite 2 until: https://github.com/storybookjs/builder-vite/pull/394

```bash
npm install --save vite
```

## Adapter static?

...try it? 🤷

# Local system info

```bash
date
npx envinfo --system --binaries --browsers --npmPackages "{svelte,@sveltejs/*,vite}"
```

```bash
❯ date
Thu Jun 30 02:52:07 AM EDT 2022
❯ npx envinfo --system --binaries --browsers --npmPackages "{svelte,@sveltejs/*,vite}"

  System:
    OS: Linux 5.10 Manjaro Linux
    CPU: (8) x64 11th Gen Intel(R) Core(TM) i7-1165G7 @ 2.80GHz
    Memory: 1.87 GB / 15.34 GB
    Container: Yes
    Shell: 5.9 - /usr/bin/zsh
  Binaries:
    Node: 16.13.0 - ~/.nvm/versions/node/v16.13.0/bin/node
    Yarn: 1.22.15 - ~/.nvm/versions/node/v16.13.0/bin/yarn
    npm: 8.6.0 - ~/.nvm/versions/node/v16.13.0/bin/npm
  Browsers:
    Brave Browser: 103.1.40.107
    Chromium: 103.0.5060.53
    Firefox: 101.0.1
  npmPackages:
    @sveltejs/adapter-auto: next => 1.0.0-next.53
    @sveltejs/adapter-static: ^1.0.0-next.34 => 1.0.0-next.34
    @sveltejs/kit: next => 1.0.0-next.357
    svelte: ^3.48.0 => 3.48.0
    vite: 2.9.6 => 2.9.6
```

# Links

- https://github.com/sveltejs/kit/issues/5184
- https://github.com/madeleineostoja/sveltekit-boilerplate
- https://github.com/storybookjs/storybook/issues/14952
- https://storybook.js.org/docs/react/builders/vite
