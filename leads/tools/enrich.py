# Patches existing workbook rows with details found in the gap-filling pass.
# Same safety guard as apply.py: every entry names the business it describes and
# the applier refuses the whole batch if a name does not match the row it targets.
# Only the fields present in an entry are written; everything else is left alone.
import json, sys, os, datetime, openpyxl
L = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
WB = os.path.join(L, 'Hamilton_County_Auto_Glass_Leads_verified.xlsx')
LOG = os.path.join(L, 'verification_log.json')
FIELD = {'email': 'Email', 'website': 'Website', 'phone': 'Phone',
         'address': 'Physical Address', 'city': 'City', 'zip': 'ZIP',
         'industry': 'Industry', 'priority': 'Lead Priority',
         'evidence': 'Active Business Evidence'}
TODAY = datetime.date.today().isoformat()
log = json.load(open(LOG)) if os.path.exists(LOG) else {}
new = json.load(sys.stdin)
wb = openpyxl.load_workbook(WB); ws = wb['Leads']
hdr = [c.value for c in ws[1]]; col = {h: i + 1 for i, h in enumerate(hdr)}

errs = []
for e in new:
    if 'name' not in e or 'row' not in e:
        errs.append(f"entry needs both 'row' and 'name': {e!r}"); continue
    actual = str(ws.cell(row=e['row'], column=1).value).strip().lower()
    want = str(e['name']).strip().lower()
    n = min(len(actual), len(want))
    if n < 6 or actual[:n] != want[:n]:
        errs.append(f"row {e['row']}: expected {e['name']!r} but row holds {actual!r}")
if errs:
    print('REFUSED - nothing written:'); [print(' ', x) for x in errs]; sys.exit(1)

wrote = []
for e in new:
    r = e['row']; changed = []
    for k, cn in FIELD.items():
        if e.get(k):
            before = ws.cell(row=r, column=col[cn]).value
            if str(before).strip() != str(e[k]).strip():
                ws.cell(row=r, column=col[cn]).value = e[k]
                changed.append(cn)
    ws.cell(row=r, column=col['Verification Date']).value = TODAY
    ws.cell(row=r, column=col['Verification Status']).value = f'Re-verified {TODAY}'
    if e.get('note'):
        ws.cell(row=r, column=col['Verification Notes']).value = e['note']
    log[str(r - 2)] = {'i': r - 2, 'status': 'keep', 'name': e['name'],
                       'note': e.get('note', ''), 'evidence': e.get('evidence', ''),
                       'gapfill': TODAY}
    wrote.append((r, e['name'], changed))
wb.save(WB); json.dump(log, open(LOG, 'w'), indent=0)
for r, nm, ch in wrote:
    print(f'row {r:4} | {nm[:44]:44} | {", ".join(ch) if ch else "no field change"}')
print(f'{len(wrote)} rows updated')
