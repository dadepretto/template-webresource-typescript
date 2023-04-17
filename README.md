# TypeScript Web Resource Template
This project is a template to create JavaScript Web Resources for Dataverse using TypeScript, Webpack and Babel.

## Changelog

| Version | Date       | Changes | Notes           |
| ------- | ---------- | ------- | --------------- |
| 0.0.1   | 2023-04-17 | -       | Initial version |

# Usage
1. 📑 Clone or download this repository.
2. 📦 Change properties of `package.json` (e.g., `name` and the `author`), according to your project configuration.
3. 📥 Run `npm install` in the project terminal, ensuring you're on the project's root folder (where `package.json` is).
4. 📝 Create new files inside `src/`, where each represents a different Web Resource.
   * 📌 You can use `SampleWebResource.ts` as a template, and delete it afterward.
5. 🔨 Run `npm run build` in the project terminal, from the project's root folder.
   * 📌 By default only files directly inside `src/` will have a direct correspondence with a JavaScript file in `dist/`. Files inside sub-folders and the file `src/global.d.ts`  will be directly bundled, if and where required, with the root-level files. To change this behavior, please edit `webpack.config.js`.
6. 💾 Upload your JavaScript Web Resources from `dist/`.
   * ❗️ You can pick `*.js` files for development purposes, but using `*.min.js` is recommended before going to production.
7. ✨ Enjoy!

# FAQ

## What about types?
This project comes pre-configured with `@types/xrm`, a package that includes most of the types you'll need to develop using [Dataverse's `Xrm` API](https://learn.microsoft.com/en-us/dynamics365/customerengagement/on-premises/developer/overview?view=op-9-2).
For more information on how to use this package, please refer to the [official npm page](https://www.npmjs.com/package/@types/xrm).

## What is bundling?
In a nutshell, bundling is the process of combining multiple files and libraries in a single, usually optimized one.
This practice can be useful, especially in a context like Dataverse Web Resources, where you would have to manually upload each file otherwise. Also, this practice completely gets rid of the need to maintain file references.

For example, consider this scenario:

- `src/`
   - `MyFirstWebResource.ts` (references `Utils.ts` and `Service1.ts`)
   - `MySecondWebResource.ts` (references `Utils.ts` and `Service2.ts`)
   - `utils/`
      - `Utils.ts` (references two different npm packages, `NPMA` and `NPMB`)
   - `services/`
      - `Service1.ts` (references one npm package, `NPMC`)
      - `Service2.ts` (references two npm packages, `NPMD` and `NPME`)

Building this project will result in:

- `dist/`
   - `MyFirstWebResource.js` (contains all the transpiled code from MyFirstWebResource.ts, and also `Utils.ts`, `Service1.ts`, `NPMA`, `NPMB`, and `NPMC`).
   - `MySecondWebResource.js` (contains all the transpiled code from MySecondWebResource.ts, and also `Utils.ts`, `Service2.ts`, `NPMA`, `NPMB`, `NPMD`, and `NPME`).

You can upload each `*.js` file as a completely independent, self-contained Web Resource.

## Shouldn't I reuse common code?
Reusing common code is generally a good practice, but it can be somewhat hard to manage in the context of Dataverse Web Resources.

For example, if you upgrade one dependency, and you haven't been careful to mark other Web Resources as dependent on it, you could easily forget to test them before going live, inadvertently breaking them. <br/>
Also, you could be in a situation where you have many existing web resources that relies on a particular version of the dependency, but you need a hotfix from a new, non-backward-compatible version for a specific Web Resource, with no time capacity to update all the other ones. <br/>
In both these scenarios, bundling dependencies can be extremely helpful.

## The Solution Checker is complaining. What should I do?
You should expect some minor complaints from Solution Checker. So far I've encountered only three classes of medium-severity issues:
- `web-remove-console`
- `web-use-strict-equality-operators`
- `web-use-strict-mode`

They are probably related to how Webpack processes and optimizes code, and can be safely ignored. If you *really* want to get rid of them and find a better Webpack configuration, please open a PR and submit your changes! 🙏😊

If you get other issue classes reported, especially of higher severity, please ensure you're using the production builds (`*.min.js` files), and then check your code and dependencies for those specific problems.