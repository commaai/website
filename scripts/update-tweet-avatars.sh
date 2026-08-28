#!/usr/bin/env bash
# Re-download the profile pictures for the tweets in src/lib/constants/social-proof.js.
#
# Run this when a tweet is added to that file, or when someone's picture or handle
# goes stale. Avatars are saved as <handle>.jpg and matched by handle in
# FeaturedTweets.svelte, so a renamed handle needs updating in social-proof.js too —
# this script prints the handle X currently reports for each tweet id.
#
#   ./scripts/update-tweet-avatars.sh
#
# Uses X's public syndication endpoint, which needs no API key or login.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE="$ROOT/src/lib/constants/social-proof.js"
OUT="$ROOT/src/lib/images/featured-tweets"

mkdir -p "$OUT"

grep -o 'id: "[0-9]*"' "$SOURCE" | grep -o '[0-9]*' | while read -r id; do
  json="$(curl -sf "https://cdn.syndication.twimg.com/tweet-result?id=$id&lang=en&token=a" \
    -H "User-Agent: Mozilla/5.0")" || { echo "!! $id — could not fetch"; continue; }

  # _400x400 is the largest square X serves for profile pictures
  read -r handle img < <(printf '%s' "$json" | python3 -c "
import sys, json
u = json.load(sys.stdin)['user']
print(u['screen_name'], u['profile_image_url_https'].replace('_normal', '_400x400'))
")

  curl -sf -o "$OUT/$handle.jpg" "$img" -H "User-Agent: Mozilla/5.0"
  echo "ok  $id -> @$handle"
done

echo
echo "Saved to $OUT"
echo "Any handle above that differs from social-proof.js needs updating there."
