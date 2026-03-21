# DECKPLATE

[[HOMEPAGE](https://deckplate.netlify.app)]

A high contrast industrial design system heavily influenced by system monitoring terminals and industrial signage designs created for factories and machines.

The registry [registry](./registry/) directory contains a component library primarily built for React.

The project aims to follow the standards set by the well established [Shadcn](https://github.com/shadcn-ui/ui) project.

## Stack

- Tailwind v4
- Radix UI
- Typescript

## Install

To install DECKPLATE to an existing project, running `npx deckplate init` should be enough to get started.

To add a specific component to the project, for example a button, `npx deckplate add button` can be run.

To see all the available components, you can visit the [Components](https://deckplate.netlify.app/components/) page for documentation or the [/ui/](./registry/ui/) directory for the source code.

### Theme

DECKPLATE has custom color variables and Tailwind utility definitions, which is published as a _separate_ npm package. The `init` command automatically downloads the package to the project. However, the user is expected to actually _include_ the theme by adding `@import "@deckplate/theme";` to the main CSS file.

## Development

### Oxc

The project depends on [Oxc](https://github.com/oxc-project/oxc) tooling for development workflows:

- oxlint
- oxfmt

#### Suppression

When you need to suppress a specific lint rule on a line or block:

```ts
// oxlint-ignore-next-line no-console
console.log("debug");

// oxlint-ignore no-console -- reason goes here
console.log("debug");
```

For entire files, adding `// oxlint-ignore-file no-console` at the top of the file should be enough

#### VSCode

It is recommended to replace **ESLint** and **Prettier** with **Oxc** in your VSCode environment.

> [!TIP]
> The necessary configurations are already available in [.vscode](./.vscode/) directory and will be picked up by your VSCode Editor automatically.

However, the **Oxc** extension (`oxc.oxc-vscode`) still must be downloaded manually to make use of it. It is enough to get both linting and formatting support on the Editor.

> [!CAUTION]
> Pre-existing extensions like `dbaeumer.vscode-eslint` and `esbenp.prettier-vscode` can lead to conflcits with **Oxc**. So, you might need to disable them.

### Release

`./scripts/release.sh cli patch`
`./scripts/release.sh cli minor`
`./scripts/release.sh cli major`

## License

[MIT](LICENSE.md)
