# Rewrites the two derived CSVs from the queue and the recorded decisions, so
# VIBE_REMAINING_TO_VERIFY.csv and VIBE_REJECTED_*.csv always match results.
import json, csv, os
L = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
q = json.load(open(os.path.join(L, 'vibe_queue.json')))
res = json.load(open(os.path.join(L, 'vibe_verification_results.json')))
remaining = [r for r in q if r['Business Name'] not in res]
with open(os.path.join(L, 'VIBE_REMAINING_TO_VERIFY.csv'), 'w', newline='') as f:
    w = csv.DictWriter(f, fieldnames=list(q[0].keys()))
    w.writeheader()
    w.writerows(remaining)
LABEL = {'dead': 'BAD RECORD - wrong company or gone',
         'nocontact': 'NO CONTACT PUBLISHED - own site gives nothing',
         'dup': 'DUPLICATE - already on the list',
         'update-existing': 'MERGED into an existing row'}
rej = [v for v in res.values() if v['status'] != 'confirmed']
with open(os.path.join(L, 'VIBE_REJECTED_2026-09-04.csv'), 'w', newline='') as f:
    w = csv.writer(f)
    w.writerow(['Business Name', 'Outcome', 'Why'])
    for v in sorted(rej, key=lambda v: v['name'].lower()):
        w.writerow([v['name'], LABEL.get(v['status'], v['status']), v.get('note', '')])
print(f'remaining {len(remaining)} | decided {len(res)}/{len(q)} | rejected file {len(rej)}')
