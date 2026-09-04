import json, sys, os, openpyxl
WB='/home/user/Hard-Knox-/leads/Hamilton_County_Auto_Glass_Leads_verified.xlsx'
LOG='/home/user/Hard-Knox-/leads/verification_log.json'
FIELD={'email':'Email','website':'Website','phone':'Phone','address':'Physical Address',
       'city':'City','zip':'ZIP','industry':'Industry','priority':'Lead Priority',
       'evidence':'Active Business Evidence'}
log=json.load(open(LOG)) if os.path.exists(LOG) else {}
new=json.load(sys.stdin)
wb=openpyxl.load_workbook(WB); ws=wb['Leads']
hdr=[c.value for c in ws[1]]; col={h:i+1 for i,h in enumerate(hdr)}

# Guard: every entry must name the business it describes, and that name must
# match the row it targets. This is what stops a whole batch landing one row
# off, which has happened before.
errs=[]
for e in new:
    if 'name' not in e:
        errs.append(f"i={e.get('i')}: entry has no 'name'"); continue
    actual=str(ws.cell(row=e['i']+2, column=1).value).strip().lower()
    want=str(e['name']).strip().lower()
    n=min(len(actual), len(want))
    if n < 8 or actual[:n] != want[:n]:
        errs.append(f"i={e['i']}: expected {e['name']!r} but row holds {actual!r}")
if errs:
    print('REFUSED - nothing written:'); [print(' ', x) for x in errs]; sys.exit(1)

dels=[]
for e in new:
    i=e['i']; r=i+2
    log[str(i)]=e
    if e['status']=='delete':
        dels.append(r); continue
    for k,cn in FIELD.items():
        if e.get(k): ws.cell(row=r,column=col[cn]).value=e[k]
    if e.get('priority'):
        from copy import copy as _c
        want=str(e['priority']).strip()[0]
        for j,rr in enumerate(ws.iter_rows(min_row=2), start=2):
            if str(ws.cell(row=j,column=col['Lead Priority']).value).strip()[:1]==want and j!=r:
                ws.cell(row=r,column=col['Lead Priority'])._style=_c(ws.cell(row=j,column=col['Lead Priority'])._style)
                break
    ws.cell(row=r,column=col['Verification Date']).value='2026-09-03'
    ws.cell(row=r,column=col['Verification Status']).value=(
        'Needs recheck' if e['status']=='recheck' else 'Re-verified 2026-09-03')
    ws.cell(row=r,column=col['Verification Notes']).value=e.get('note','')
# descending, so earlier deletions never shift later row numbers
for r in sorted(dels,reverse=True): ws.delete_rows(r)
# a deletion invalidates every log key below it; re-key so the log keeps matching
if dels:
    shift=sorted(d-2 for d in dels)
    rk={}
    for k,e in log.items():
        i=int(float(k))
        if i in shift: continue
        ni=i-sum(1 for d in shift if d<i); e['i']=ni; rk[str(ni)]=e
    log=rk
wb.save(WB); json.dump(log,open(LOG,'w'),indent=0)
rows=[[c.value for c in x] for x in ws.iter_rows(min_row=2)]
st=col['Verification Status']-1
done=sum(1 for x in rows if x[st]=='Re-verified 2026-09-03')
todo=sum(1 for x in rows if x[st]=='NOT YET RE-VERIFIED')
print(f'log={len(log)} rows={len(rows)} verified={done} remaining={todo} deleted_now={len(dels)}')
