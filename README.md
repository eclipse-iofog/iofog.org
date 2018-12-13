# iofog.org

## Setup

```sh
npm install
```

## Local development

```sh
npm start

# http://localhost:8000/
```

## Publish updates to GitHub Pages (maintainers only)

Builds the Gatsby project and pushes it to GitHub Pages. Should only be used when updating the existing versions of the docs, not when releasing a new version.

```sh
npm run deploy:gh
```

## Cut a new major/minor version and publish (maintainers only)

Will ask you for the new version number of ioFog and then handle everything to bump it, including copying `content/docs/next` to a new directory with that number, and then doing a build/deploy to GitHub Pages.

Use this when a new release of major or minor ioFog happens.

```sh
npm run bump-version
```

## Serving static files

If you need to serve arbitrary static files from the site (e.g. images, zips, etc), place them in the `static/` directory. Anything placed in there will be served, as-is from the root of the domain. e.g. `static/my-file.txt` will be available at `https://iofog.org/my-file.txt`.
