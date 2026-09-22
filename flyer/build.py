#!/usr/bin/env python3
"""
Build the Hard Knox Auto Glass chip-repair flyer.

Takes src/flyer.template.html and inlines the web fonts and the logo so the
result is one self-contained .html file that prints identically on any
machine, online or off. Then renders it to a print-ready PDF and a PNG
preview with headless Chromium.

    python3 flyer/build.py
"""

import base64
import pathlib
import shutil
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent
TEMPLATE = ROOT / "src" / "flyer.template.html"
FONTS = ROOT / "src" / "fonts.embedded.css"
LOGO = ROOT / "assets" / "hard-knox-logo.png"
DIST = ROOT / "dist"

HTML_OUT = DIST / "hard-knox-chip-repair-flyer.html"
PDF_OUT = DIST / "hard-knox-chip-repair-flyer.pdf"
PNG_OUT = DIST / "hard-knox-chip-repair-flyer-preview.png"

CHROME_CANDIDATES = [
    "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "/usr/bin/chromium",
    "/usr/bin/google-chrome",
]


def find_chrome():
    for path in CHROME_CANDIDATES:
        if pathlib.Path(path).exists():
            return path
    return shutil.which("chromium") or shutil.which("google-chrome")


def build_html():
    html = TEMPLATE.read_text(encoding="utf-8")
    html = html.replace("/*@FONTS@*/", FONTS.read_text(encoding="utf-8"))
    logo_uri = "data:image/png;base64," + base64.b64encode(LOGO.read_bytes()).decode()
    html = html.replace("@LOGO@", logo_uri)

    DIST.mkdir(exist_ok=True)
    HTML_OUT.write_text(html, encoding="utf-8")
    print(f"html  -> {HTML_OUT.relative_to(ROOT)}  ({HTML_OUT.stat().st_size / 1024:.0f} KB)")


def render(chrome):
    url = HTML_OUT.as_uri()
    common = [chrome, "--headless", "--no-sandbox", "--disable-gpu",
              "--force-color-profile=srgb", "--font-render-hinting=none"]

    subprocess.run(
        common + ["--no-pdf-header-footer", f"--print-to-pdf={PDF_OUT}", url],
        check=True, capture_output=True,
    )
    print(f"pdf   -> {PDF_OUT.relative_to(ROOT)}  ({PDF_OUT.stat().st_size / 1024:.0f} KB)")

def preview(dpi=200):
    """Rasterize the PDF itself, so the preview is exactly what prints."""
    import pypdfium2 as pdfium

    pdf = pdfium.PdfDocument(str(PDF_OUT))
    if len(pdf) != 1:
        print(f"  !! WARNING: PDF has {len(pdf)} pages, expected 1")
    page = pdf[0]
    w_pt, h_pt = page.get_size()
    print(f"  page size: {w_pt/72:.2f}in x {h_pt/72:.2f}in ({len(pdf)} page)")
    page.render(scale=dpi / 72).to_pil().save(PNG_OUT)
    print(f"png   -> {PNG_OUT.relative_to(ROOT)}  ({PNG_OUT.stat().st_size / 1024:.0f} KB)")


if __name__ == "__main__":
    build_html()
    chrome = find_chrome()
    if not chrome:
        sys.exit("No Chromium/Chrome found — open the HTML and print to PDF manually.")
    render(chrome)
    preview()
