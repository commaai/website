#!/bin/bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $DIR

HUGO_VERSION=0.147.8
if ! command -v hugo >/dev/null || ! hugo version | grep -q extended; then
  echo "installing hugo ${HUGO_VERSION} (extended) to ~/.local/bin"
  mkdir -p ~/.local/bin
  OS=$(uname -s | tr A-Z a-z)
  if [ "$OS" = "darwin" ]; then ARCH=universal; elif [ "$(uname -m)" = "aarch64" ] || [ "$(uname -m)" = "arm64" ]; then ARCH=arm64; else ARCH=amd64; fi
  curl -sL "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_${OS}-${ARCH}.tar.gz" | tar xz -C ~/.local/bin hugo
  export PATH="$HOME/.local/bin:$PATH"
fi

hugo server --open
