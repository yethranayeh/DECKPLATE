#!/usr/bin/env bash
set -euo pipefail

# SYNTAX: ./scripts/release.sh <cli|theme> <patch|minor|major>
#
# For the specified package, adjust the version,
#   and pushes both the commit and the tag to origin.

PACKAGE="${1:?SYNTAX: release.sh <cli|theme> <patch|minor|major>}"
BUMP="${2:?SYNTAX: release.sh <cli|theme> <patch|minor|major>}"

case "$PACKAGE" in
  cli)   DIR="packages/cli"   ;;
  theme) DIR="packages/theme" ;;
  *)     echo "ERROR: package must be 'cli' or 'theme'" >&2; exit 1 ;;
esac

case "$BUMP" in
  patch|minor|major) ;;
  *) echo "ERROR: bump must be 'patch', 'minor', or 'major'" >&2; exit 1 ;;
esac

# Nothing should be *staged* at the moment of script run
#   otherwise unexpected changes might be mixed to the commit
if ! git diff --cached --quiet; then
  echo "ERROR: There are staged changes! 'Staged' must be clear so that the release commit only contains the version bump" >&2
  exit 1
fi

cd "$DIR"
NEW_VERSION=$(npm version "$BUMP" --no-git-tag-version)
NEW_VERSION="${NEW_VERSION#v}"
cd - > /dev/null

TAG="${PACKAGE}@${NEW_VERSION}"

echo "ALLOCATING @deckplate/${PACKAGE} to ${NEW_VERSION}"
echo "TAG // ${TAG}"

# Commit and tag
git add "$DIR/package.json"
git commit -m "release: @deckplate/${PACKAGE}@${NEW_VERSION}"
git tag "$TAG"

git push && git push origin "$TAG"

echo ""
echo "DONE // @deckplate/${PACKAGE}@${NEW_VERSION} released"
