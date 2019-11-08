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

Builds the Gatsby project and pushes it to GitHub Pages. This must be only done from `master` branch on no other!

```bash
git fetch
git checkout origin/master
npm run deploy:gh
```

You can test the release Gatsby build using `npm run-script build`, and to preview the website locally, follow instructions in [Local Deployment](#local-development).

## Cut a new major/minor version and publish (maintainers only)

To create a new version of documentation (usually for new major release), we need to first update the npm package version and then create a new version of the documentation.
Note that the staging documentation in `content/docs/next` will be used to create the new version.
If there are any fixed in the previous documentation, it is advisable to propagate them into the staging documentation first before proceeding.

```bash
npm version 1.2.0 --no-git-tag-version
node scripts/copy-docs.js 1.2.0
```

After this you are ready to checkin the new version.

## Serving static files

If you need to serve arbitrary static files from the site (e.g. images, zips, etc), place them in the `static/` directory. Anything placed in there will be served, as-is from the root of the domain. e.g. `static/my-file.txt` will be available at `https://iofog.org/my-file.txt`.

## Known Issues

During `npm start` the followin issue may occur:

```text
Module build failed (from ./node_modules/sass-loader/lib/loader.js):
Error: ENOENT: no such file or directory, scandir '/home/lkrcal/edgeworx/iofog.org/node_modules/node-sass/vendor'
```

Workaround is to run `npm rebuild node-sass`
## Staging deployment of iofog.org

The staging deployment and update is done automatically in Azure pipeline. The cluster for the deployment is defined in azure-pipelines.yaml using `stagingCluster` and `stagingClusterRegion` variables. The deployment itself is specified in deploy/staging.yaml.
