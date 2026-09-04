import json, sys, openpyxl
from copy import copy
WB='/home/user/Hard-Knox-/leads/Hamilton_County_Auto_Glass_Leads_verified.xlsx'
LOG='/home/user/Hard-Knox-/leads/verification_log.json'
wb=openpyxl.load_workbook(WB); ws=wb['Leads']
hdr=[c.value for c in ws[1]]; col={h:i+1 for i,h in enumerate(hdr)}
rows=[[c.value for c in r] for r in ws.iter_rows(min_row=2)]
existing={str(r[0]).strip().lower() for r in rows}
# template rows to copy style from, one per priority
tmpl={}
for i,r in enumerate(rows):
    p=str(r[2]).strip()
    if p and p[0] in 'ABC' and p[0] not in tmpl: tmpl[p[0]]=i+2
new=json.load(sys.stdin)
log=json.load(open(LOG))
added=[]; skipped=[]
for e in new:
    if e['Business Name'].strip().lower() in existing:
        skipped.append(e['Business Name']); continue
    src=tmpl[e['Lead Priority'].strip()[0]]
    r=ws.max_row+1
    for c in range(1,len(hdr)+1):
        s=ws.cell(row=src,column=c); d=ws.cell(row=r,column=c)
        d._style=copy(s._style)
        d.value=e.get(hdr[c-1],'Not publicly available')
    log[str(r-2)]={'i':r-2,'status':'keep','note':e.get('Verification Notes',''),
                   'evidence':e.get('Active Business Evidence',''),'new_lead':True}
    added.append((r,e['Business Name']))
    existing.add(e['Business Name'].strip().lower())
n=ws.max_row
ws.auto_filter.ref=f'A1:N{n}'
wb.save(WB); json.dump(log,open(LOG,'w'),indent=0)
for r,nm in added: print('added row',r,'|',nm)
if skipped: print('SKIPPED as duplicates:',skipped)
print(f'sheet now has {n-1} data rows')
