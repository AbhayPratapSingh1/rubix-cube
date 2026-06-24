#!/usr/bin/env python3
"""
Apply the URL from site.json to README.md and index.html.

Usage:
    python3 set-url.py [--restore]

Without arguments, reads the URL from site.json and applies it.
With --restore, puts the https://rubix-cube.onrender.com placeholder back in all files.
"""

import sys
import json
from pathlib import Path

ROOT = Path(__file__).parent
FILES = ["README.md", "index.html", "set-url.py"]
PLACEHOLDER = "https://rubix-cube.onrender.com"

def apply(url: str) -> None:
    url = url.rstrip("/")
    total = 0
    for name in FILES:
        path = ROOT / name
        content = path.read_text()
        count = content.count(PLACEHOLDER)
        if count:
            content = content.replace(PLACEHOLDER, url)
            path.write_text(content)
            total += count
            print(f"  {name}: {count} replacement(s)")
    print(f"✅ Done — {total} placeholder(s) replaced with {url}")

def restore() -> None:
    pass  # not needed, just re-run after editing site.json

if __name__ == "__main__":
    if len(sys.argv) == 2 and sys.argv[1] == "--restore":
        apply(PLACEHOLDER)
    else:
        cfg = json.loads((ROOT / "site.json").read_text())
        apply(cfg["url"])
