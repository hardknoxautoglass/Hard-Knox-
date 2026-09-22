# Hard Knox Auto Glass — Rock Chip Repair Flyer

A one-page, print-ready flyer for the rock chip repair service, branded to match
the Hard Knox Auto Glass business cards.

**Size:** 8.5" × 11" (US Letter), portrait, full-bleed colour, single page.

## What to print

| File | Use it for |
| --- | --- |
| `dist/hard-knox-chip-repair-flyer.pdf` | **Print this one.** Hand to a print shop, or print at home. |
| `dist/hard-knox-chip-repair-flyer.html` | Open in any browser to view or print yourself. Fully self-contained. |
| `dist/hard-knox-chip-repair-flyer-preview.png` | Quick preview for texting, email, or social. |

### Printing at home or at the shop

The design runs colour to all four edges. To keep it edge-to-edge:

- In the print dialog choose **Scale: 100%** (not "Fit to page" / "Shrink to fit").
- Turn **on** background graphics / "Print backgrounds".
- Set margins to **None**.
- Most desktop printers cannot print to the very edge and will leave a thin white
  border. That is normal and still looks fine.

### Sending it to a commercial printer

Send the PDF. It is exactly 8.5" × 11" with all four fonts embedded as subsets,
so nothing will reflow or substitute. Two things worth telling them:

- There is **no bleed allowance** in this file. If they want the colour trimmed
  flush to the edge, ask them to scale it up to an 8.75" × 11.25" sheet (a 0.125"
  bleed on each side) and trim back to Letter. Everything important sits well
  inside a 0.4" safe margin, so nothing gets cut.
- Colour is **RGB**. A printer doing offset work may ask for CMYK — they can
  convert it. The deep green and gold will shift very slightly darker in CMYK,
  which matches how the business cards already print.

## Changing the wording

Edit `src/flyer.template.html` — the copy is plain HTML near the bottom of the
file, with each section commented. Then rebuild:

```sh
python3 flyer/build.py
```

That regenerates all three files in `dist/`. The build inlines the fonts and the
logo so the HTML stays a single portable file, then renders the PDF and preview
with headless Chromium.

Requires `pypdfium2` (`pip install pypdfium2`) for the preview image; the HTML and
PDF build without it.

### Keeping it on one page

`.page` uses a fixed CSS grid whose six row heights add up to exactly 1056px
(11 inches at 96dpi). If you add copy, shorten something else or the text will
run over the band below it rather than pushing onto a second page.

## Brand reference

Colours and type were matched to the business cards.

| Token | Value | Where it came from |
| --- | --- | --- |
| Deep glass green | `#002A1E` → `#001812` | Logo badge / card back |
| Brand gold | `#C69036` | Logo trim, sampled from the artwork |
| Gold sweep | `#7E5C1E` → `#F0D98C` → `#C69036` | The gold swoosh on the cards |
| Brushed silver | `#FDFDFB` → `#DCDCD4` | The "HARD KNOX" name plate |
| Alert red | `#8A1A10` | Added, for the word "CRACK" only |

**Type:** Archivo Black for headlines (closest match to the heavy logo
lettering), Barlow for body copy, Barlow Condensed for the phone number and
labels. All four weights are embedded in the HTML and the PDF.

**Logo:** `assets/hard-knox-logo.png` — extracted from the supplied card artwork
at 1153 × 819 with a transparent background, reusable for other materials.

## Details on the flyer

All contact details come straight from the business cards:

- (423) 227-5964
- hardknoxautoglass@gmail.com
- www.hardknoxautoglass.com
- 5904 Alabama Hwy, Ringgold, GA 30736
- Brandon Layne, Owner — Veteran Owned & Operated

The cards list no social handles, so none appear on the flyer. The service area
line reads "Ringgold, GA", taken from the shop address. No prices, turnaround
times, or insurance claims are stated anywhere, since none were given — if you
want to add "free with most insurance" or a price point, the eyebrow bar under
the logo is the natural spot for it.
