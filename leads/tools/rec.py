# Records verification decisions for the Vibe queue.
# Reads a JSON list on stdin; refuses the batch if any name is not in the queue.
import json, sys, os
L = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
RES = os.path.join(L, 'vibe_verification_results.json')
Q   = os.path.join(L, 'vibe_queue.json')
res = json.load(open(RES))
q = {r['Business Name']: r for r in json.load(open(Q))}
new = json.load(sys.stdin)
bad = [e['name'] for e in new if e['name'] not in q]
if bad:
    print('REFUSED - not in queue:', bad); sys.exit(1)
for e in new:
    res[e['name']] = e
json.dump(res, open(RES, 'w'), indent=0)
ok   = sum(1 for v in res.values() if v['status'] == 'confirmed')
dead = sum(1 for v in res.values() if v['status'] == 'dead')
nc   = sum(1 for v in res.values() if v['status'] == 'nocontact')
print(f'recorded {len(new)} | total done {len(res)}/{len(q)} | confirmed {ok} dead {dead} no-contact {nc}')
