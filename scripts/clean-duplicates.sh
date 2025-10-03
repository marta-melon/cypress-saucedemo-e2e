\
#!/usr/bin/env bash
set -euo pipefail
shopt -s nullglob
files=(cypress/e2e/ref-*.cy.js)
if [ ${#files[@]} -gt 0 ]; then
  for f in "${files[@]}"; do
    echo "Removing $f"
    rm -f "$f"
  done
else
  echo "No ref-* spec files found."
fi
