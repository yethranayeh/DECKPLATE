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

> [!NOTE]
> It should be noted that the project must have `shadcn` initialized beforehand. The official [installation guide](https://ui.shadcn.com/docs/installation) can be used as reference.

To install **DECKPLATE** to an existing project, you will first need to update **component.json** so that `shadcn add` recognizes this library's registry:

```diff
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "registries": {
+    "@deckplate": "https://deckplate.netlify.app/r/{name}.json"
  }
}
```

Then, to add a specific component to your project, for example a badge, `npx shadcn@latest add @deckplate/badge` can be run.

If you prefer to, instead, install the _whole_ registry content at once, you can run `npx shadcn@latest add @deckplate/full`

To see all the available components, you can visit the documentation page for [Components](https://deckplate.netlify.app/components/) or the [/ui/](./registry/ui/) directory for the source code files

### Theme

When you install any **DECKPLATE** component, the Shadcn CLI will also resolve the custom colors, fonts, keyframe animations, and utility classes that are needed. These will copied and stored in `styles/deckplate-base.css` in your project. Then, the CSS will be automatically injected to you main CSS with `@import "@/styles/deckplate-base.css";` line by Shadcn CLI.

This separate file exists because there are some limitation with the way CSS is distributed through Shadcn:

- **KEYFRAMES**: The recommended way of using `registry:theme` definition for CSS rules causes the keyframe definitions to be placed inside `@theme inline {}` which is not the desired outcome for these to work properly.
- **FONT**: Shadcn CLI knows integrate these fonts as dependencies to the project and injects the necessary CSS imports, but it only handles the default _400_ weight, and per-weight imports do not seem to be supported. The `text-display` class requires the _900_ weight to achieve the extra bold look for headers.

> [!NOTE]
> You may also notice that Shadcn injects `@import "@fontsource/barlow-condensed"` and `@import "@fontsource/share-tech-mono"` lines into your CSS even though **deckplate-base.css** already has these.
> These are generated because of our `registry:font` definitions, which are necessary to have Shadcn regard the fonts as project dependencies. You can safely remove them if you prefer a cleaner file.

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
