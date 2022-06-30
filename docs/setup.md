# Setup details

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


## Substitute `vite.config.js` for `svelte.config.js`

```bash
cat << EOF > vite.config.js
import { sveltekit } from '@sveltejs/kit/experimental/vite';

/** @type {import('vite').UserConfig} */
export default {
	plugins: [sveltekit()],

	server: {
		port: 5000 // For demo purposes only
	}
};
EOF
```

**Notice** that the default port has been changed to 5000 in order to see if the normal `svelte-kit dev` command picks up on the separate vite config file.


# Local system info

```bash
date
npx envinfo --system --binaries --browsers --npmPackages "{svelte,@sveltejs/*,vite}"
```

```bash
❯ date
Wed Jun 29 11:01:36 PM EDT 2022
❯ npx envinfo --system --binaries --browsers --npmPackages "{svelte,@sveltejs/*,vite}"

  System:
    OS: Linux 5.10 Manjaro Linux
    CPU: (8) x64 11th Gen Intel(R) Core(TM) i7-1165G7 @ 2.80GHz
    Memory: 2.71 GB / 15.34 GB
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
    @sveltejs/kit: next => 1.0.0-next.357
    svelte: ^3.46.0 => 3.48.0
```
