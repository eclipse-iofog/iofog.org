#!/bin/bash
set -e

if [ ! -d "content/docs/next" ]; then
  echo "The first time you do a release, you need to first manually copy content/docs/1.0.0 to content/docs/next";
  exit 1;
fi

if [[ -z $(git status -uno --porcelain) ]]; then
  CHANGELOG_PATH=content/releases/CHANGELOG.md
  read -p "Enter the new version number: " BUMP;
  VERSION="$(npm version $BUMP --no-git-tag-version)";
  echo -e "## $VERSION\n\n" | cat - $CHANGELOG_PATH > /tmp/out && mv /tmp/out $CHANGELOG_PATH
  vi $CHANGELOG_PATH;
  git diff;
  read -p "Look good? (y/n) " CONDITION;

  if [ "$CONDITION" == "y" ]; then
    node $(dirname "$0")/copy-docs.js $BUMP;
    git add .;
    git commit -m "Docs ${VERSION}";
    git tag "${VERSION}";
    git push origin versioning;
    git push origin "${VERSION}";
    npm run deploy:gh
  else
    git checkout -f package.json $CHANGELOG_PATH
    echo "Cancelled release by your request!";
    exit 1;
  fi

else
  echo "You cannot release a new version with uncommited changes";
  exit 1;
fi