#!/usr/bin/env python3
"""
Add images from a folder into the README screenshot section.
If no images are found, the section is left empty.

Usage:
    python3 add-screenshots.py [--dir screenshots]
"""

import argparse
from pathlib import Path

ROOT = Path(__file__).parent
README = ROOT / "README.md"
IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"}

SECTION_START = "## 📸 Screenshots\n"
SECTION_END = "---"


def find_images(folder: Path) -> list[Path]:
    if not folder.exists():
        return []
    return sorted(
        [f for f in folder.iterdir() if f.suffix.lower() in IMAGE_EXTENSIONS]
    )


def build_markdown(images: list[Path], folder: Path) -> str:
    if not images:
        return ""
    lines = []
    for img in images:
        rel = img.relative_to(ROOT)
        lines.append(f"![Screenshot]({rel})")
    return "\n\n" + "\n\n".join(lines) + "\n\n"


def main() -> None:
    parser = argparse.ArgumentParser(description="Add screenshots to README.md")
    parser.add_argument("--dir", default="screenshots", help="Folder containing images")
    args = parser.parse_args()

    folder = ROOT / args.dir
    images = find_images(folder)
    content = README.read_text()

    start_idx = content.find(SECTION_START)
    if start_idx == -1:
        print("❌ Screenshots section not found in README.md")
        return

    start_idx += len(SECTION_START)
    end_idx = content.find(SECTION_END, start_idx)
    if end_idx == -1:
        end_idx = len(content)

    old_section = content[start_idx:end_idx]
    new_section = build_markdown(images, folder)

    if new_section == old_section:
        print("ℹ️  Screenshot section is already up to date")
        return

    content = content[:start_idx] + new_section + content[end_idx:]
    README.write_text(content)

    count = len(images)
    if count:
        print(f"✅ Added {count} screenshot(s) to README.md")
    else:
        print("ℹ️  No images found — screenshot section left empty")


if __name__ == "__main__":
    main()
