#!/bin/bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $DIR

HUGO_VERSION=0.147.8
if ! command -v hugo >/dev/null || ! hugo version | grep -q extended; then
  echo "installing hugo ${HUGO_VERSION} (extended) to ~/.local/bin"
  mkdir -p ~/.local/bin
  curl -sL "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_$(uname -s | tr A-Z a-z)-$([ "$(uname -m)" = "arm64" ] || [ "$(uname -m)" = "aarch64" ] && echo arm64 || echo amd64).tar.gz" | tar xz -C ~/.local/bin hugo
  export PATH="$HOME/.local/bin:$PATH"
fi

hugo server --open
