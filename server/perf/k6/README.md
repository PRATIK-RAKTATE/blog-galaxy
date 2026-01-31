# k6 performance tests

Folder: `perf/k6`

## Prerequisites
Install k6: https://k6.io/docs/get-started/installation/

## Target URL
All scripts use:
- `BASE_URL` env var if provided
- otherwise default: `http://localhost:3000`

Example:
```bash
BASE_URL="https://your-staging-url.com" k6 run perf/k6/baseline.js
```

# Perfomance result 
k6 run --out json=results.json filename.js
