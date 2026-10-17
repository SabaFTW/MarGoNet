#!/bin/bash
cd "$(dirname "$0")"
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"

if ! command -v node >/dev/null 2>&1; then
  osascript -e 'display dialog "Najprej namesti Node.js s https://nodejs.org, potem še enkrat klikni start-aera." buttons {"OK"} with title "AERA"'
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Prvič nameščam knjižnice. To traja minuto..."
  npm install || {
    echo "npm install ni uspel."
    read -r -p "Enter za izhod..."
    exit 1
  }
fi

echo "AERA teče. Brskalnik: http://localhost:8080"
echo "Okno pusti odprto. Ustaviš s Ctrl+C."
(sleep 2 && open "http://localhost:8080") &
npm run dev
