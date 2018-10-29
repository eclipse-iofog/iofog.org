---
title: "Guidelines"
category: "Contributing"
type: "documentation"
version: "1.0.0"
---

# Contributing Guidelines
We are open to, and grateful for, any contributions made by the community.

**By contributing to ioFog, you agree to abide by our [Code of Conduct](code-of-conduct).**

### Bugs and Improvements
Before opening an issue, please search the issue tracker to make sure your issue hasn’t already been reported.

We use different issue trackers for individual pieces of the ioFog community.

  - [Agent](https://github.com/ioFog/Agent/issues)
  - [Controller](https://github.com/ioFog/Controller/issues)
  - [Connector](https://github.com/ioFog/Connector/issues)
  - [iofog.org documentation](https://github.com/ioFog/iofog.org/issues) (this site)

### Getting Help
Need some help? Check out the [Community](/community) page for resources like our discussion forums and meetups.

### Sending a Pull Request
For non-trivial changes, we suggest you open an issue with a proposal for a new feature or refactoring before starting on the work. That way you can get better insight into whether or not your hard work is likely to be accepted.

On the other hand, sometimes the best way to start a conversation *is* to send a pull request. Use your best judgment!

In general, the contribution workflow looks like this:

  - Open a new issue in the issue tracker.
  - Fork the repo.
  - Create a new feature branch based off the `master` branch.
  - Make sure all tests pass and there are no linting errors.
  - Submit a pull request, referencing any issues it addresses.

Please try to keep your pull request focused in scope and avoid including unrelated commits.

After you have submitted your pull request, we’ll try to get back to you as soon as possible. We may suggest some changes or improvements.

Thank you for contributing!

### Docs

You can find the source code for iofog.org (this site) here: <https://github.com/ioFog/iofog.org>

Improvements to the documentation are always welcome. Currently it is powered by Gatsby, which is a static site builder that uses React.

We use [yarn](https://yarnpkg.com), rather than npm, as our package manager. Subtle differences between the two sometimes makes them incompatible, so it's important you use yarn.

#### Building the Docs

After running `yarn install`, to build the documentation run the following:

```sh
yarn run build
```

To watch and rebuild documentation when changes occur, run the following:

```sh
yarn run start
```

The docs will be served at http://localhost:8000/.

#### Publishing the Docs

To publish the documentation, run the following:

```sh
yarn run publish
```

:shipit:
