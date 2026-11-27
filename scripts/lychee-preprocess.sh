#!/usr/bin/env bash
# lychee --preprocess hook (lychee.toml): blanks out inline <script> bodies before link extraction.
# lychee's HTML tokenizer reads `a<b` inside a script as a tag and stops finding links for the rest
# of the page, and every page has inline analytics scripts in its <head>.
# Newlines are kept so reported line numbers still match the file.
exec perl -0777 -pe 's{(<script\b[^>]*>)(.*?)(</script>)}{$1 . ($2 =~ s/[^\n]//gr) . $3}gise' "$1"
