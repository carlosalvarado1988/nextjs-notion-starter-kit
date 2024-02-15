# [Live Site - Carlos Alvarado portfolio](https://carlos-alvarado-portfolio.vercel.app/)

<p align="center">
  <a href="https://transitivebullsh.it/nextjs-notion-starter-kit">
    <img alt="Example article page" src="https://user-images.githubusercontent.com/552829/160132094-12875e09-41ec-450a-80fc-ae8cd488129d.jpg" width="689">
  </a>
</p>

# Next.js Notion Starter Kit

> The perfect starter kit for building websites with Next.js and Notion.

[![Build Status](https://github.com/transitive-bullshit/nextjs-notion-starter-kit/actions/workflows/build.yml/badge.svg)](https://github.com/transitive-bullshit/nextjs-notion-starter-kit/actions/workflows/build.yml) [![Prettier Code Formatting](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)

## Intro

This repo is what I use to power my personal blog and portfolio site [transitivebullsh.it](https://transitivebullsh.it).

It uses Notion as a CMS, [react-notion-x](https://github.com/NotionX/react-notion-x), [Next.js](https://nextjs.org/), and [Vercel](https://vercel.com).

## Features

- Setup only takes a few minutes ([single config file](./site.config.ts)) 💪
- Robust support for Notion content via [react-notion-x](https://github.com/NotionX/react-notion-x)
- Built using Next.js, TS, and React
- Excellent page speeds
- Smooth image previews
- Automatic social images
- Automatic pretty URLs
- Automatic table of contents
- Full support for dark mode
- Quick search via CMD+K / CMD+P
- Responsive for different devices
- Optimized for Next.js and Vercel

## Demos

- [Default demo](https://nextjs-notion-starter-kit.transitivebullsh.it) - Deployed from the `main` branch
- [My site](https://transitivebullsh.it) - Deployed from the `transitive-bullshit` branch

## Setup

**All config is defined in [site.config.ts](./site.config.ts).**

This project requires a recent version of Node.js (we recommend >= 16).

1. Fork / clone this repo
2. Change a few values in [site.config.ts](./site.config.ts)
3. `npm install`
4. `npm run dev` to test locally
5. `npm run deploy` to deploy to vercel 💪

I tried to make configuration as easy as possible — All you really need to do to get started is edit `rootNotionPageId`.

We recommend duplicating the [default page](https://notion.so/7875426197cf461698809def95960ebf) as a starting point, but you can use any public notion page you want.

Make sure your root Notion page is **public** and then copy the link to your clipboard. Extract the last part of the URL that looks like `7875426197cf461698809def95960ebf`, which is your page's Notion ID.

In order to find your Notion workspace ID (optional), just load any of your site's pages into your browser and open up the developer console. There will be a global variable that you can access called `block` which is the Notion data for the current page. If you enter `block.space_id`, it will print out your page's workspace ID.

I recommend setting up a collection on your home page that contains all of your articles / projects / content. There are no structural constraints on your Notion workspace, however, so feel free to add content as you normally would in Notion.

## URL Paths

The app defaults to slightly different URL paths in dev vs prod (though pasting any dev pathname into prod will work and vice-versa).

In development, it will use `/nextjs-notion-blog-d1b5dcf8b9ff425b8aef5ce6f0730202` which is a slugified version of the page's title suffixed with its Notion ID. I've found that it's really useful to always have the Notion Page ID front and center during local development.

In production, it will use `/nextjs-notion-blog` which is a bit nicer as it gets rid of the extra ID clutter.

The mapping of Notion ID to slugified page titles is done automatically as part of the build process. Just keep in mind that if you plan on changing page titles over time, you probably want to make sure old links will still work, and we don't currently provide a solution for detecting old links aside from Next.js's built-in [support for redirects](https://nextjs.org/docs/api-reference/next.config.js/redirects).

See [mapPageUrl](./lib/map-page-url.ts) and [getCanonicalPageId](https://github.com/NotionX/react-notion-x/blob/master/packages/notion-utils/src/get-canonical-page-id.ts) for more details.

You can override the default slug generation on a per-page basis by adding a `Slug` text property to your database. Any page which has a `Slug` property will use that as its slug.

NOTE: if you have multiple pages in your workspace with the same slugified name, the app will throw an error letting you know that there are duplicate URL pathnames.

## Preview Images

<p align="center">
  <img alt="Example preview image" src="https://user-images.githubusercontent.com/552829/160142320-35343317-aa9e-4710-bcf7-67e5cdec586d.gif" width="458">
</p>

We use [next/image](https://nextjs.org/docs/api-reference/next/image) to serve images efficiently, with preview images optionally generated via [lqip-modern](https://github.com/transitive-bullshit/lqip-modern). This gives us extremely optimized image support for sexy smooth images.

Preview images are **enabled by default**, but they can be slow to generate, so if you want to disable them, set `isPreviewImageSupportEnabled` to `false` in `site.config.ts`.

### Redis

If you want to cache generated preview images to speed up subsequent builds, you'll need to first set up an external [Redis](https://redis.io) data store. To enable redis caching, set `isRedisEnabled` to `true` in `site.config.ts` and then set `REDIS_HOST` and `REDIS_PASSWORD` environment variables to point to your redis instance.

You can do this locally by adding a `.env` file:

```bash
REDIS_HOST='TODO'
REDIS_PASSWORD='TODO'
```

If you're not sure which Redis provider to use, we recommend [Redis Labs](https://redis.com), which provides a free plan.

Note that preview images and redis caching are both optional features. If you’d rather not deal with them, just disable them in your site config.

## Styles

All CSS styles that customize Notion content are located in [styles/notion.css](./styles/notion.css). They mainly target global CSS classes exported by react-notion-x [styles.css](https://github.com/NotionX/react-notion-x/blob/master/packages/react-notion-x/src/styles.css).

Every notion block gets its own unique classname, so you can target individual blocks like this:

```css
.notion-block-260baa77f1e1428b97fb14ac99c7c385 {
  display: none;
}
```

## Dark Mode

<p align="center">
  <img alt="Light Mode" src="https://transitive-bs.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F83ea9f0f-4761-4c0b-b53e-1913627975fc%2Ftransitivebullsh.it_-opt.jpg?table=block&id=ed7e8f60-c6d1-449e-840b-5c7762505c44&spaceId=fde5ac74-eea3-4527-8f00-4482710e1af3&width=2000&userId=&cache=v2" width="45%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="Dark Mode" src="https://transitive-bs.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fc0839d6c-7141-48df-8afd-69b27fed84aa%2Ftransitivebullsh.it__(1)-opt.jpg?table=block&id=23b11fe5-d6df-422d-9674-39cf7f547523&spaceId=fde5ac74-eea3-4527-8f00-4482710e1af3&width=2000&userId=&cache=v2" width="45%">
</p>

Dark mode is fully supported and can be toggled via the sun / moon icon in the footer.

## Automatic Social Images

<p align="center">
  <img alt="Example social image" src="https://user-images.githubusercontent.com/552829/162001133-34d4cf24-123a-4569-a540-f683b22830d1.jpeg" width="600">
</p>

All Open Graph and social meta tags are generated from your Notion content, which makes social sharing look professional by default.

Social images are generated automatically using [Vercel OG Image Generation](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation). You can tweak the default React template for social images by editing [api/social-images.tsx](./pages/api/social-image.tsx).

You can view an example social image live in production [here](https://transitivebullsh.it/api/social-image?id=dfc7f709-ae3e-42c6-9292-f6543d5586f0).

## Automatic Table of Contents

<p align="center">
  <img alt="Smooth ToC Scrollspy" src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fcb2df62d-9028-440b-964b-117711450921%2Ftoc2.gif?table=block&id=d7e9951b-289c-4ff2-8b82-b0a61fe260b1&cache=v2" width="240">
</p>

By default, every article page will have a table of contents displayed as an `aside` on desktop. It uses **scrollspy** logic to automatically update the current section as the user scrolls through your document, and makes it really easy to jump between different sections.

If a page has less than `minTableOfContentsItems` (default 3), the table of contents will be hidden. It is also hidden on the index page and if the browser window is too small.

This table of contents uses the same logic that Notion uses for its built-in Table of Contents block (see [getPageTableOfContents](https://github.com/NotionX/react-notion-x/blob/master/packages/notion-utils/src/get-page-table-of-contents.ts) for the underlying logic).

## Responsive

<p align="center">
  <img alt="Mobile article page" src="https://user-images.githubusercontent.com/552829/160132983-c2dd5830-80b3-4a0e-a8f1-abab5dbeed11.jpg" width="300">
</p>

All pages are designed to be responsive across common device sizes.

## Analytics

Analytics are an optional feature that are easy to enable if you want.

### Fathom Analytics

[Fathom](https://usefathom.com/ref/42TFOZ) provides a lightweight alternative to Google Analytics.

To enable, just add a `NEXT_PUBLIC_FATHOM_ID` environment variable, which will only be used in production.

### PostHog Analytics

[PostHog](https://posthog.com/) provides a lightweight, **open source** alternative to Google Analytics.

To enable, just add a `NEXT_PUBLIC_POSTHOG_ID` environment variable, which will only be used in production.

## Environment Variables

If you're using Redis, analytics, or any other feature which requires environment variables, then you'll need to [add them to your Vercel project](https://vercel.com/docs/concepts/projects/environment-variables).

If you want to test your redis builds with GitHub Actions, then you'll need to edit the [default build action](./.github/workflows/build.yml) to add `REDIS_HOST` and `REDIS_PASSWORD`. Here is an [example from my personal branch](https://github.com/transitive-bullshit/nextjs-notion-starter-kit/blob/transitive-bullshit/.github/workflows/build.yml#L17-L21). You'll also need to add these environment variables to your GitHub repo as [repository secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets).

## Contributing

See the [contribution guide](contributing.md) and join our amazing list of [contributors](https://github.com/transitive-bullshit/nextjs-notion-starter-kit/graphs/contributors)!

## License

MIT © [Travis Fischer](https://transitivebullsh.it)

Support my open source work by <a href="https://twitter.com/transitive_bs">following me on twitter <img src="https://storage.googleapis.com/saasify-assets/twitter-logo.svg" alt="twitter" height="24px" align="center"></a>

# Integration notes

Original Repo: https://github.com/transitive-bullshit/nextjs-notion-starter-kit

#### Initial error because node v14 was under the nextjs requirement >18

- Attempo to install repo: `npm i`, installation fails,
- running: `npm audit fix --force` it fails - error socket with yarn and other error related with npm.
- you have to install sharp separately: `npm install --arch=x64 --platform=darwing sharp`
  -- got the error: `Error: 'darwin-x64' binaries cannot be used on the 'darwin-arm64v8' platform. Please remove the 'node_modules/sharp' directory and run 'npm install' on the 'darwin-arm64v8' platform.`
  -- so then tried: `npm uninstall sharp && npm install --platform=darwing --arch=arm64 --arm-version=8 sharp`
  11/7/23 -- Error: `sharp: Installation error: Prebuilt libvips 8.14.5 binaries are not yet available for darwing-arm64v8`

  - Node v18 was giving issues, switched to v14.20 to see:
  - permission error found: ran: `sudo chown -R 501:20 "/Users/carlosalvarado/.npm"`
  -

#### Learned about arch swith methods to x64 and arm64

With Mac/M1 I have installed node via nvm. When running via console to determine the architecture it printed what I expected it should be:

`node -p 'process.arch'`
`arm64`
But the conflict was when the sharp dependency was running/ installed. To overcome this I resulted in installing node as x64 rather than the arm64. This seemed to correct my dependency woes:

1. Start a new iTerm console and change the terminals architecture version to `arch -x86_64 zsh`
2. Uninstall / reinstall node version 18 `nvm uninstall 18 && nvm install 18`.
   Now see the architecture version of x64 `node -p 'process.arch'` === x64
3. Reinstall dependencies `rm -rf node_modules && npm install`
4. run `npm audit fix`

#### Tracked down Node Errors by version

- run: `nvm use v1x`
- run: `rm package-lock.json && rm -rf node_modules && npm install`
- ERROR: node v14, v15, /node_modules/next/dist/bin/next:57 --> performance.mark("next-start")
  #ReferenceError: performance is not defined
  v16 --> Unsupported engine {
  npm WARN EBADENGINE package: 'next@14.0.3',
  npm WARN EBADENGINE required: { node: '>=18.17.0' },
  npm WARN EBADENGINE current: { node: 'v16.20.1', npm: '8.19.4' }
  npm WARN EBADENGINE }

- installed node v18.17 --> running on x64
- packages installed and server running with lots of deprication errors n images
- updated next.config.js, domains to remotePatterns:
  ```{
      protocol: 'https',
      hostname: 'www.notion.so'
    }
  ```
- ERROR: `dyld[42490]: missing symbol called`, found `node -p 'process.arch'` is running on `x64`,

- switched to a new terminal running arm64, as M1 ship, installed v19.9 -> no packages installed because sharp
- gyp info using node-gyp@9.3.1 ---> gyp info using node@19.9.0 | darwin | arm64

#### Important issue with node-gyp, it does not find dir(s) if dir names have spaces.

- sharp v0.28 introduced this error and reverted in v0.29, this project uses the v0.28 dependency so it fall into this error. [link to issue](https://github.com/lovell/sharp/issues/2994)
- now facing new error: `dyld[3702]: missing symbol called`
- tried with yarn, clean all npm: `rm package-lock.json && rm -rf node_modules` and install with yarn `rm yarn.lock && rm -rf .yarn && yarn`
- it didnt install packages, neither react

#### fix on the image import Image from "next/image" to "next/legacy/image"

- run `npx @next/codemod next-image-to-legacy-image . `

#### fix `dyld[3702]: missing symbol called` while loading preview images.

- Went to the site.config.ts and changes this property to false
  // whether or not to enable support for LQIP preview images (optional)
  isPreviewImageSupportEnabled: false,

#### Adjustments to allow deployment to vercel.

- I had to remove local font load to social-image endpoint to overcome the 1M edge function size limit
- To deploy the project: `npm run deploy`, this will trigger a pull of new content. it creates a project if not yet or link an existing project in vercel platform.
- if you want automatic updates, you can link the project in vercel, to the git repo, enter the build branch: main and every update to the repo will result in a new build and deploy
- However, manual deploys are important so that it fetches new data from Notion and automatic deployment to a branch ensure code changes are updated

# Deploy Updates

> npm run deploy
