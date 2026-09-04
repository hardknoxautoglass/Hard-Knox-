# Converts a verification batch (the same JSON fed to rec.py) into the row
# format addleads.py expects, keeping only the entries marked confirmed.
# Usage:  python3 leads/tools/tolead.py < batch.json | python3 leads/tools/addleads.py
import json, sys, datetime
NA = 'Not publicly available'
out = []
for e in json.load(sys.stdin):
    if e.get('status') != 'confirmed':
        continue
    out.append({
        'Business Name': e['name'],
        'Industry': e.get('industry', NA),
        'Lead Priority': e.get('priority', 'B'),
        'Physical Address': e.get('address', NA),
        'City': e.get('city', NA),
        'State': e.get('state', 'TN'),
        'ZIP': e.get('zip', NA),
        'Phone': e.get('phone', NA),
        'Email': e.get('email', NA),
        'Website': e.get('website', NA),
        'Active Business Evidence': e.get('evidence', ''),
        'Verification Date': datetime.date.today().isoformat(),
        'Verification Status': 'Verified ' + datetime.date.today().isoformat(),
        'Verification Notes': e.get('note', ''),
    })
json.dump(out, sys.stdout)
