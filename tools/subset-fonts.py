#!/usr/bin/env python3
"""Instantiate Montserrat 700/800 from the variable font and subset to Latin as WOFF2.

Input : tools/vendor/fonts/Montserrat.ttf (SIL OFL 1.1, downloaded from google/fonts)
Output: tools/build-cache/fonts/montserrat-700.woff2, montserrat-800.woff2
The build script (tools/build.js) hashes and copies these into site/assets/fonts/.
"""
import os
import sys

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "tools", "vendor", "fonts", "Montserrat.ttf")
OUT_DIR = os.path.join(ROOT, "tools", "build-cache", "fonts")
os.makedirs(OUT_DIR, exist_ok=True)

# Basic Latin, Latin-1 Supplement, general punctuation used in the copy.
UNICODES = "U+0020-007E,U+00A0-00FF,U+2013-2014,U+2018-201A,U+201C-201E,U+2022,U+2026,U+2122,U+00D7"

for weight in (700, 800):
    vf = TTFont(SRC)
    static = instancer.instantiateVariableFont(vf, {"wght": weight}, inplace=False)
    tmp = os.path.join(OUT_DIR, f"montserrat-{weight}.static.ttf")
    static.save(tmp)
    out = os.path.join(OUT_DIR, f"montserrat-{weight}.woff2")
    subset.main([
        tmp,
        f"--unicodes={UNICODES}",
        "--flavor=woff2",
        "--layout-features=kern,liga,ccmp,locl",
        "--no-hinting",
        "--desubroutinize",
        f"--output-file={out}",
    ])
    os.remove(tmp)
    print(weight, os.path.getsize(out), "bytes ->", os.path.relpath(out, ROOT))
